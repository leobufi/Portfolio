import { Controller } from "@hotwired/stimulus";
import { ArrayBuffer } from "@rails/activestorage";

// Connects to data-controller="sketch"
export default class extends Controller {

  static values = {
    font: String,
    tags: Array,
  }

  connect() {
    console.log("connected to P5 controller");
    console.log(this.tagsValue)
    const name = this.tagsValue.map(stack => stack.name);
    const rate = this.tagsValue.map(stack => stack.rate);
    const category = this.tagsValue.map(stack => stack.category);
    console.log(name);
    console.log(rate);
    console.log(category);
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
      this.rails.text(this.tagsValue[0].name, 100, 100);
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
        box(150);
      pop();
    }
  }
}
