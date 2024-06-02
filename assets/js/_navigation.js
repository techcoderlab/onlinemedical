import { _, __ } from "./_helpers.js";

function navigation() {
  const navBar = _("#navbar");
  const navBarInner = _("#navbar .navbar__container");
  const navMenu = _("#nav-menu");
  const navToggle = _("#nav-toggle");
  const navClose = _("#nav-close");

  const scrollToChangeActive = navbar.classList.contains(
    "navbar__scroll-to-change"
  );

  /* ============ MENU TOGGLE FUNCTIONALITY ============ */
  const toggleMenu = (open = navMenu.classList.contains("show-menu")) => {
    if (open) {
      navMenu.classList.add("show-menu");
      toggleScroll(false);
    } else {
      navMenu.classList.remove("show-menu");
      toggleScroll(true);
    }
  };

  /* ============ MENU TOGGLE (SHOW / HIDE) EVENTS ============ */

  /* Show Menu */
  if (navToggle)
    navToggle.addEventListener(
      "click",
      () => {
        toggleMenu(true);
      },
      false
    );

  /* Hide Menu */
  if (navClose)
    navClose.addEventListener(
      "click",
      () => {
        toggleMenu(false);
      },
      false
    );

  /*=============== REMOVE MENU ON LINK CLICK => MOBILE NAV ===============*/
  const navLink = __(".nav__link");

  const linkAction = () => {
    // When we click on each nav__link, we remove the show-menu class
    toggleMenu(false);
  };
  navLink.forEach((n) => n.addEventListener("click", linkAction, false));

  /*=============== CHANGE BACKGROUND NAVBAR ===============*/
  if (scrollToChangeActive) {
    navbar.classList.add("scroll-navbar-start");
    const scrollNavbar = (event) => {
      // Add a class if the bottom offset is greater than 100 of the viewport
      if (window.scrollY >= 100) {
        navBar.classList.add("scroll-navbar");
      } else {
        navBar.classList.remove("scroll-navbar");
      }
    };
    window.addEventListener("scroll", scrollNavbar);
    scrollNavbar();
  }

  /* ======= ON/OFF SCROLLING ON NAV SHOW/HIDE => MOBILE NAV ======= */
  const scrollDisabledActive = navbar.classList.contains(
    "navbar__scroll-disabled"
  );

  const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

  let supportsPassive = false;

  try {
    window.addEventListener("test", null, { passive: true });
    supportsPassive = true;
  } catch (e) {}

  const wheelOpt = supportsPassive ? { passive: false } : false;

  const wheelEvent =
    "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

  const preventDefault = (e) => {
    e.preventDefault();
  };

  const preventDefaultForScrollKeys = (e) => {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  };

  const toggleScroll = (enable) => {
    if (!scrollDisabledActive) return;

    const action = enable ? "removeEventListener" : "addEventListener";

    window[action]("DOMMouseScroll", preventDefault, false);
    window[action](wheelEvent, preventDefault, wheelOpt);
    window[action]("touchmove", preventDefault, wheelOpt);
    window[action]("keydown", preventDefaultForScrollKeys, false);
  };
}
export { navigation };
