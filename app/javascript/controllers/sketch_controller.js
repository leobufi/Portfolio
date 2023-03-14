import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="sketch"
export default class extends Controller {

  static values = {
    font: String
  }

  connect() {
    console.log("connected to P5 controller");
    this._setupAll();
  }

   _setupPreload() {
    window.preload = () => {
      this.myFont = loadFont(this.fontValue);
    }
  }

  _setupAll() {
    this._setupPreload()
    this._setupWindow()
    this._drawCanvas()
  }

  _setupWindow() {
    window.setup = () => {
      const canvas = createCanvas(windowWidth*0.99, windowHeight*0.7, WEBGL);
      canvas.parent("p5-canva");
      colorMode(HSL);
      frameRate(75);
      pixelDensity(1);
      smooth();

      this.rails = createGraphics(200, 200)
      this.rails.textFont(this.myFont);
      this.rails.fill(0, 0, 100)
      this.rails.textSize(30);
      this.rails.textAlign(CENTER);
      this.rails.text('Ruby On Rails', 100, 100);
    }
  }

  _drawCanvas() {
    window.draw = () => {

      background(0, 0, 0);

      lights();

      push();
        rotateY(frameCount/50);
        noStroke();
        let c = color(225, 100, 50);
        fill(c);
        texture(this.rails);
        sphere(150, 12, 12);
      pop();
    }
  }
}
