import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="tabs"
export default class extends Controller {
  static targets = [ "tab", "panel", "title", "project" ]

  connect() {
    // console.log('Hi from Tab Controller')
  }


  activate(event) {

    event.preventDefault()
    const tab = event.target
    this.tabTargets.forEach((tabTarget) => {
      // console.log(tab.dataset.tabName)
      tabTarget.classList.toggle("active", tabTarget == tab)
    })

    this.panelTargets.forEach((panel) => {
      // console.log(panel.dataset.tabName)
      if (panel.dataset.tabName == tab.dataset.tabName) {
        panel.classList.toggle("active")
      } else {
        panel.classList.remove("active")
      }
    })
  }

  show(event) {
    event.preventDefault()
    const title = event.target
    this.titleTargets.forEach((titleTarget) => {
      // console.log(title.dataset.tabName)
      titleTarget.classList.toggle("show", titleTarget == title)
    })

    this.projectTargets.forEach((project) => {
      // console.log(project.dataset.tabName)
      if (project.dataset.tabName == title.dataset.tabName) {
        project.classList.toggle("show")
      } else {
        project.classList.remove("show")
      }
    })
  }
}
