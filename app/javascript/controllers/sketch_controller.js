import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="sketch"
export default class extends Controller {

  static values = {
    font: String,
    tags: Array,
  }

  connect() {
    console.log("connected to P5 controller");
    console.log(this.tagsValue)
    this._setupAll();
    this.randomPositions();
  }


  randomPositions() {
    let i = 0;
    let positions = this.tagsValue.length
    this.shapesPositions = [];
    while (i < positions) {
      let randomPositionX = this.between(100, window.innerWidth-250);
      let randomPositionY = this.between(100, window.innerHeight-250);
      let position = [randomPositionX, randomPositionY];
      this.shapesPositions.push(position);
      i++
    }
    //console.log(this.shapesPositions)
  }

  between(min, max) {
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
  }

  _setupAll() {
    this._setupPreload()
    this._setupWindow()
    this._drawCanvas()
  }

  _setupPreload() {
    window.preload = () => {
      this.myFont = loadFont(this.fontValue);
    }
  }

  _setupWindow() {

    window.setup = () => {
      this.canvas = createCanvas(windowWidth*0.955, windowHeight*0.88);
      this.canvas.parent("p5-canva");
      colorMode(HSL);
      frameRate(60);
      pixelDensity(1);
      smooth();

      this.keyHue = [0, 36, 72, 108, 144, 180, 216, 252, 288, 224]

      textFont(this.myFont);

      // Initialise les particules après création du canvas
      this._createParticles();

    }
  }

  _createParticles() {
    // Prépare un index par catégorie pour avoir des couleurs bien distinctes
    const rawCategories = this.tagsValue.map((w) => w.category || "uncategorized");
    const uniqueCategories = Array.from(new Set(rawCategories));
    this.categoriesForLegend = uniqueCategories;

    // À chaque chargement de page, on mélange l'ordre des teintes
    // pour que les couleurs de catégories changent à chaque refresh
    this.categoryHueOrder = [...this.keyHue];
    for (let i = this.categoryHueOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = this.categoryHueOrder[i];
      this.categoryHueOrder[i] = this.categoryHueOrder[j];
      this.categoryHueOrder[j] = tmp;
    }

    this.categoryIndexMap = {};
    uniqueCategories.forEach((cat, idx) => {
      this.categoryIndexMap[cat] = idx;
    });

    // Une particule par skill/tag
    this.particles = this.tagsValue.map((word, index) => {
      const fallbackPosition = [
        this.between(100, windowWidth - 250),
        this.between(100, windowHeight - 250)
      ];
      const [x, y] = (this.shapesPositions && this.shapesPositions[index]) || fallbackPosition;

      const rate = word.rate || 5; // valeur par défaut si manquante
      const radius = rate * 10;    // taille globale de la forme (augmentée)

      // Vitesse aléatoire douce
      const vx = (Math.random() * 2 - 1) * 1.5;
      const vy = (Math.random() * 2 - 1) * 1.5;

      const category = word.category || null;
      const hue = this._hueForCategory(category);
      const sides = this._sidesForRate(rate);

      // Rayons légèrement différents par sommet pour créer des formes irrégulières
      const vertexRadii = Array.from({ length: sides }, () => {
        const factor = 0.7 + Math.random() * 0.6; // entre 0.7 et 1.3
        return radius * factor;
      });

      return {
        word,
        names: [word.name],      // liste de noms à afficher (utile lors des fusions)
        x,
        y,
        vx,
        vy,
        radius,
        hue,
        sides,
        vertexRadii,
        combinedRate: rate,      // taille de référence pour le texte après fusion
      };
    });
  }

  _hueForCategory(category) {
    // Couleurs bien contrastées par catégorie, sans dépendre des noms exacts
    const key = category || "uncategorized";

    if (this.categoryIndexMap && Object.prototype.hasOwnProperty.call(this.categoryIndexMap, key)) {
      const idx = this.categoryIndexMap[key];
      const palette = this.categoryHueOrder || this.keyHue;
      return palette[idx % palette.length];
    }

    // Fallback au cas où : hue aléatoire dans la palette
    return this.keyHue[this.between(0, this.keyHue.length - 1)];
  }

  _sidesForRate(rate) {
    // Nombre d'angles / côtés basé sur le rate : min 3, max 10
    const r = Math.max(1, Math.min(10, rate || 5));
    return Math.max(3, Math.min(10, r + 2));
  }

  _drawCanvas() {

    window.draw = () => {

      // Toutes les particules animées + collisions
      if (!this.particles || this.particles.length === 0) return;

      // Canvas transparent (pas de fond noir)
      clear();

      // Mise à jour de la physique
      this._updateParticles();
      this._handleCollisions();

      // Dessin des formes + textes
      this._drawParticles();

       // Dessin de la légende en haut à droite
      this._drawLegend();
    }
  }

  _updateParticles() {
    const w = width;
    const h = height;

    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      // Rebond sur les bords
      if (p.x - p.radius < 0) {
        p.x = p.radius;
        p.vx *= -1;
      } else if (p.x + p.radius > w) {
        p.x = w - p.radius;
        p.vx *= -1;
      }

      if (p.y - p.radius < 0) {
        p.y = p.radius;
        p.vy *= -1;
      } else if (p.y + p.radius > h) {
        p.y = h - p.radius;
        p.vy *= -1;
      }
    });
  }

  _handleCollisions() {
    const n = this.particles.length;

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const a = this.particles[i];
        const b = this.particles[j];

        if (!a || !b || a._remove || b._remove) continue;

        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = a.radius + b.radius;

        if (dist > 0 && dist < minDist) {
          const catA = a.word.category || "uncategorized";
          const catB = b.word.category || "uncategorized";

          if (catA === catB) {
            // Même catégorie → fusion en une seule forme

            // Nouvelle position : milieu entre les deux
            const newX = (a.x + b.x) / 2;
            const newY = (a.y + b.y) / 2;

            // Nouvelle vitesse : moyenne
            const newVx = (a.vx + b.vx) / 2;
            const newVy = (a.vy + b.vy) / 2;

            // Rayon combiné (on approxime l'aire totale)
            const newRadius = Math.sqrt(a.radius * a.radius + b.radius * b.radius);

            a.x = newX;
            a.y = newY;
            a.vx = newVx;
            a.vy = newVy;
            a.radius = newRadius;

            // Fusion des noms pour l'affichage
            a.names = [
              ...(a.names || [a.word.name]),
              ...(b.names || [b.word.name])
            ];

            // On conserve une taille de texte basée sur le plus grand rate
            const rateA = a.combinedRate || a.word.rate || 5;
            const rateB = b.combinedRate || b.word.rate || 5;
            a.combinedRate = Math.max(rateA, rateB);

            // On recalcule un motif de sommets irrégulier pour la nouvelle forme
            const sides = a.sides;
            a.vertexRadii = Array.from({ length: sides }, () => {
              const factor = 0.7 + Math.random() * 0.6; // entre 0.7 et 1.3
              return newRadius * factor;
            });

            // On garde "a" et on marque "b" pour suppression
            b._remove = true;
          } else {
            // Catégories différentes → rebond classique

            // Elles se touchent → on les sépare un peu
            const overlap = (minDist - dist) / 2;
            const nx = dx / dist;
            const ny = dy / dist;

            a.x -= nx * overlap;
            a.y -= ny * overlap;
            b.x += nx * overlap;
            b.y += ny * overlap;

            // Simple rebond : échange des vitesses
            const tempVx = a.vx;
            const tempVy = a.vy;
            a.vx = b.vx;
            a.vy = b.vy;
            b.vx = tempVx;
            b.vy = tempVy;

            // Un peu de random pour casser les patterns trop mécaniques
            a.vx += (Math.random() * 0.4 - 0.2);
            a.vy += (Math.random() * 0.4 - 0.2);
            b.vx += (Math.random() * 0.4 - 0.2);
            b.vy += (Math.random() * 0.4 - 0.2);
          }
        }
      }
    }

    // On supprime les particules fusionnées (marquées _remove)
    this.particles = this.particles.filter(p => !p._remove);
  }

  _drawParticles() {
    this.particles.forEach(p => {
      const { word, x, y, radius, hue, sides, vertexRadii } = p;

      // Couleurs un peu plus douces (moins de contraste)
      const hasCategory = !!word.category;
      const c = hasCategory ? color(hue, 65, 60) : color(0, 0, 78);   // catégories nulles en gris légèrement doux
      const bright = hasCategory ? color(hue, 65, 82) : color(0, 0, 96);

      push();
        fill(c);
        stroke(bright);
        strokeWeight(2);

        if (sides <= 2) {
          circle(x, y, radius * 2);
        } else {
          this._polygon(x, y, radius, sides, vertexRadii);
        }

        // Texte du skill au centre
        fill(bright);
        noStroke();
        const baseRate = p.combinedRate || word.rate || 5;
        textSize(baseRate * 3);
        textAlign(CENTER, CENTER);
        const label = p.names && p.names.length > 0 ? p.names.join(" • ") : word.name;
        text(label, x, y);
      pop();
    });
  }

  _drawLegend() {
    if (!this.categoriesForLegend || this.categoriesForLegend.length === 0) return;

    const padding = 18;
    const lineHeight = 22;
    const swatchSize = 16;

    const legendWidth = 210;
    const legendHeight = padding * 2 + this.categoriesForLegend.length * lineHeight;

    const x = width - legendWidth - 20;
    const y = 20;

    push();
      // Fond semi-transparent pour la lisibilité
      fill(0, 0, 0, 150);
      noStroke();
      rect(x, y, legendWidth, legendHeight, 8);

      textAlign(LEFT, CENTER);
      textSize(13);

      this.categoriesForLegend.forEach((cat, index) => {
        const labelY = y + padding + index * lineHeight + lineHeight / 2;

        const hue = this._hueForCategory(cat);
        const hasCategory = cat !== "uncategorized";
        const c = hasCategory ? color(hue, 65, 60) : color(0, 0, 78);

        // Pastille de couleur
        fill(c);
        noStroke();
        circle(x + padding + swatchSize / 2, labelY, swatchSize);

        // Texte
        fill(0, 0, 98);
        const label = hasCategory ? String(cat) : "Sans catégorie";
        text(label, x + padding + swatchSize + 8, labelY);
      });
    pop();
  }

  _polygon(x, y, radius, sides, vertexRadii) {
    const angleStep = TWO_PI / sides;
    beginShape();
    for (let i = 0; i < sides; i++) {
      const a = i * angleStep;
      const r = (vertexRadii && vertexRadii[i]) ? vertexRadii[i] : radius;
      const sx = x + Math.cos(a) * r;
      const sy = y + Math.sin(a) * r;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
}
