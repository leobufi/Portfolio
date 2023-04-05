import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="swiper"
export default class extends Controller {
  connect() {

    console.log('Hi from swiper controller')

    new Swiper('.swiper', {
      // Optional parameters
      direction: 'horizontal',
      slidesPerView: 1,
      centeredSlides: true,
      allowSlideNext: true,
      allowSlidePrev: true,
      loop: true,
      autoplay: {
        delay: 2000,
      },
      keyboard: {
        enabled: true,
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },

    });
  }
}
