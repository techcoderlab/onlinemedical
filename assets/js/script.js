import { navigation } from "./_navigation.js";
import { scrollUp, scrollActive, scrollToSection } from "./_scrollup.js";
import { accordion } from "./_accordion.js";

let userInteracted = false;

function firstUserInteraction() {
  if (!userInteracted) {
    userInteracted = true;

    /* Uncomment if you want hero bg image delay functionality */
    // loadHeroBgImageOnFirstInteraction();

    import("./_lazy_load_image.js").then(({ lazyloadPictureTag }) => {
      lazyloadPictureTag();
    });
  }
}

/* Uncomment if you want hero bg image delay functionality */
// function loadHeroBgImageOnFirstInteraction() {
//   document.querySelector("#header-hero").classList.add("set-hero-bg-image");
// }

document.addEventListener("DOMContentLoaded", (event) => {
  // document.addEventListener("scroll", firstUserInteraction);
  // document.addEventListener("touchstart", firstUserInteraction);

  ["click", "scroll", "mousemove", "touchstart"].forEach(function (e) {
    window.addEventListener(e, firstUserInteraction, {
      once: true,
    });
  });

  navigation();
  scrollActive();
  scrollToSection();
  scrollUp();
  accordion();
});
/* ======== The Main Script ENDS HERE ======== */
