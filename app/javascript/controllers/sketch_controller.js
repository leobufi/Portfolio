import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="sketch"
export default class extends Controller {

  connect() {
    console.log("connected to P5 controller");
    this._setupAll();
  }

  _setupAll() {
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
    }
  }

  _drawCanvas() {
    window.draw = () => {

      background(0, 0, 0);

      // Cercle

      push();
        rotateX(frameCount * 0.1);
        rotateY(frameCount * 0.05);
        rotateZ(frameCount * 0.1);
        stroke(0, 0, 100);
        let c = color(0, 0, 0);
        fill(c);
        sphere(150);
      pop();
    }
  }
}
