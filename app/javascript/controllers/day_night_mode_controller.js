import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="day-night-mode"
export default class extends Controller {
  connect() {
    console.log('hi from day night mode');
    this.switchMode();
  }

  switchMode() {
    const switchButton = document.getElementById("switchButton");
    const heroHome = document.querySelector(".hero-home");
    switchButton.addEventListener("change", function() {
        // Handle the switch change here
        if (switchButton.checked) {
            // Switch is ON
            heroHome.classList.toggle("day-mode")

        } else {
            // Switch is OFF
            heroHome.classList.remove("day-mode")

        }
    });
  }
}
