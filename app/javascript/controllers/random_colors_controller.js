import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="random-colors"
export default class extends Controller {
  connect() {
    // console.log('Hi from RandomColors');
    this.randomColors();
  }

  between(min, max) {
    return Math.floor(
      Math.random() * (max - min + 1) + min
      )
  };

  randomColors() {

    this.keyHue = [0, 36, 72, 108, 144, 180, 216, 252, 288, 224];

    window.onload = () => {


      let color1 = `hsl(${this.keyHue[this.between(0, 9)]}, 100%, 75%)`
      let color2 = `hsl(${this.keyHue[this.between(0, 9)]}, 100%, 33%)`
      let color3 = `hsl(${this.keyHue[this.between(0, 9)]}, 100%, 33%)`

      let colored = document.getElementsByClassName("colored");
      Array.from(colored).forEach((color) => {
        color.style.color = `${color1}`
      })

      // let nav = document.getElementsByClassName("navbar");
      // Array.from(nav).forEach((color) => {
      //   color.style.backgroundColor = `${color2}`
      // })

      // let baseline = document.getElementsByClassName("baseline");
      // Array.from(baseline).forEach((color) => {
      //   color.style.backgroundColor = `${color3}`
      // })

      // let sheet = Array.from(document.styleSheets).filter(
      // (styleSheet) => !styleSheet.href || styleSheet.href.startsWith(window.location.origin)
      // );

      // let sheet = document.styleSheets[document.styleSheets.length-1].cssRules;
      // // console.log(sheet);
      // sheet[0].insertRule(`:root{--blue:${blue}}`, 0);
      // sheet[0].insertRule(`:root{--green:${green}}`, 0);
      // sheet[0].insertRule(`:root{--salmon:${salmon}}`, 0);

    }
  }

}
