import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="list"
export default class extends Controller {
 static targets = [ "name", "panel" ]

  connect() {
    console.log('Hi from List Controller')
    console.log(this.nameTargets)
    console.log(this.panelTargets)
  }

  activate(event) {
    event.preventDefault()
    const name = event.target
    console.log(name.dataset.tabName)
    this.nameTargets.forEach((nameTarget) => {
      nameTarget.classList.toggle("active", nameTarget == name)
    })

    this.panelTargets.forEach((panel) => {
      console.log(panel.dataset.tabName)
      if (panel.dataset.tabName == name.dataset.tabName) {
        panel.classList.toggle("active")
      } else {
        panel.classList.remove("active")
      }
    })
  }
}
