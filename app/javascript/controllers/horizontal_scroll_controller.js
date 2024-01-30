import { Controller } from "@hotwired/stimulus"
import Marquee3k from 'marquee3000';

// Connects to data-controller="horizontal-scroll"
export default class extends Controller {

  connect() {
    Marquee3k.init();
  }

}
