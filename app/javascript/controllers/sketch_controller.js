import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="sketch"
export default class extends Controller {

  static values = {
    font: String,
    tags: Array,
  }

  connect() {
    console.log("connected to P5 controller");
    //console.log(this.tagsValue.length)
    const name = this.tagsValue.map(stack => stack.name);
    const rate = this.tagsValue.map(stack => stack.rate);
    const category = this.tagsValue.map(stack => stack.category);
    // console.log(category);
    // console.log(rate);
    this._setupAll();
    this.randomPositions()
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
      frameRate(75);
      pixelDensity(1);
      smooth();

      this.keyHue = [0, 36, 72, 108, 144, 180, 216, 252, 288, 224]

      textFont(this.myFont);

    }
  }

  _drawCanvas() {

    window.draw = () => {

      this.nulCategory = [];
      this.nulCategory.push(this.tagsValue.filter((w) => w.category === null));
      this.nulPosition = [];
      this.nulPosition = this.shapesPositions.slice(0, this.nulCategory[0].length);
      console.log(this.nulPosition);
      console.log(this.nulCategory);
      this.nulPosition.forEach(position=> {
        this.nulCategory[0].forEach(word => {
          this.c = color(this.keyHue[this.between(0, 9)], 75, 75);
          let bright = alpha(this.c);

          push();
            fill(this.c);
            textSize(word.rate*10);
            textAlign(CENTER, CENTER)
            text(word.name, position[0] + word.rate*(35/2), position[1] + word.rate*(35/2));
          pop();
        })

      })

      this.tagsValue.forEach(word => {


        if (word.category === null) {
          console.log(word.name);
          this.nulPosition = [];
          let position = this.shapesPositions.slice(0, word.length)
          this.nulPosition.push(position);

          this.c = color(this.keyHue[this.between(0, 9)], 75, 75);
          let bright = alpha(this.c);

          push();
            fill(this.c);
            textSize(word.rate*10);
            textAlign(CENTER, CENTER)
            text(word.name, this.nulPosition[0] + word.rate*(35/2), this.nulPosition[1] + word.rate*(35/2));
          pop();
        }

        else if (word.category.includes("Frameworks")) {
          let randomPositionX = this.between(100, windowWidth-250);
          let randomPositionY = this.between(100, windowHeight-250);
          let position = [randomPositionX, randomPositionY];

          this.c = color(this.keyHue[this.between(0, 9)], 75, 75);
          let bright = alpha(this.c);


          push();
            fill(this.c);
            stroke(bright);
            square(position[0], position[1], word.rate*35,);

            fill(bright);
            textSize(word.rate*5);
            textAlign(CENTER, CENTER)
            text(word.name, position[0] + word.rate*(35/2), position[1] + word.rate*(35/2));
          pop();
        }

        else if (word.category.includes("Languages")) {
          let randomPositionX = this.between(100, windowWidth-250);
          let randomPositionY = this.between(100, windowHeight-250);
          let position = [randomPositionX, randomPositionY];

          this.c = color(this.keyHue[this.between(0, 9)], 75, 75);
          let bright = alpha(this.c);


          push();
            fill(this.c);
            stroke(bright);
            circle(position[0], position[1], word.rate*35,);

            fill(bright);
            textSize(word.rate*5);
            textAlign(CENTER, CENTER)
            text(word.name, position[0], position[1]);
          pop();
        }

        else if (word.category.includes("CMS")) {
          let randomPositionX = this.between(100, windowWidth-250);
          let randomPositionY = this.between(100, windowHeight-250);
          let position = [randomPositionX, randomPositionY];

          this.c = color(this.keyHue[this.between(0, 9)], 75, 75);
          let bright = alpha(this.c);


          push();
            fill(this.c);
            stroke(bright);
            rect(position[0], position[1], word.rate*35, word.rate*35, 75, 75, 75,75);

            fill(bright);
            textSize(word.rate*5);
            textAlign(CENTER, CENTER)
            text(word.name, position[0] + word.rate*(35/2), position[1] + word.rate*(35/2));
          pop();
        }

        else if (word.category.includes("JS Library")) {
          let randomPositionX = this.between(100, windowWidth-250);
          let randomPositionY = this.between(100, windowHeight-250);
          let position = [randomPositionX, randomPositionY];

          this.c = color(this.keyHue[this.between(0, 9)], 75, 75);
          let bright = alpha(this.c);

          push();
            fill(this.c);
            stroke(bright);
            ellipse(position[0], position[1], word.rate*50, word.rate*35);

            fill(bright);
            textSize(word.rate*5);
            textAlign(CENTER, CENTER)
            text(word.name, position[0], position[1]);
          pop();
        }

        else if (word.category.includes("Design")) {
          let randomPositionX = this.between(100, windowWidth-250);
          let randomPositionY = this.between(100, windowHeight-250);
          let randomPositionX2 = randomPositionX + (word.rate*20);
          let randomPositionY2 = randomPositionY + (word.rate*20);
          let randomPositionX3 = randomPositionX - (word.rate*20);
          let randomPositionY3 = randomPositionY2 + (word.rate*20);
          let position = [randomPositionX, randomPositionY, randomPositionX2, randomPositionY2, randomPositionX3, randomPositionY3];

          this.c = color(this.keyHue[this.between(0, 9)], 75, 75);
          let bright = alpha(this.c);
          push();
            fill(this.c);
            stroke(bright);
            // triangle(100, 200, 300, 400, 100, 500);
            triangle(position[0], position[1], position[2], position[3],position[4], position[5]);

            fill(bright);
            textSize(word.rate*4);
            textAlign(CENTER, CENTER)
            text(word.name, position[0] + word.rate, position[1] + word.rate*20);
          pop();
        }
      })
      noLoop();
    }
  }
}
