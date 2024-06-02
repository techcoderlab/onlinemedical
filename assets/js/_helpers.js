/**
 * Selects elements based on the provided selector.
 * @param {string} selector - The CSS selector.
 * @returns {NodeList|Element} - A single element or a NodeList of matching elements.
 */
const _ = (selector) => document.querySelector(selector);
const __ = (selector) => document.querySelectorAll(selector);

const jump = (offsetTop = 0, smoothly = true) => {
  scroll({
    top: offsetTop,
    behavior: smoothly === true ? "smooth" : "instant",
  });
};

const isMobile = {
  Android: () => {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: () => {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: () => {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: () => {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: () => {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: () => {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

const getViewportDimensions = () => {
  function width() {
    return (
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    );
  }

  function height() {
    return (
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    );
  }

  return [width, height];
};

export { _, __, getViewportDimensions, jump };
