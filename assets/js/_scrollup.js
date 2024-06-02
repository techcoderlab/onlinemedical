import { _, __, jump } from "./_helpers.js";

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = _("#scroll-up");
  window.addEventListener("scroll", (event) => {
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
    window.scrollY >= 350
      ? scrollUp.classList.add("show-scroll")
      : scrollUp.classList.remove("show-scroll");
  });
  scrollUp.addEventListener("click", (event) => {
    // Prevent default anchor behaviour
    event.preventDefault();
    jump();
  });
};

/*=============== SCROLL To Section ===============*/
const scrollToSection = (selector = ".scroll", smoothly = true) => {
  const jumpToSection = (event) => {
    // Prevent default anchor behaviour
    event.preventDefault();

    let offsetTop = undefined;
    try {
      // Get clicked links href attribute
      const link = event.target.getAttribute("href");
      // console.log(link);
      // Get the targets position

      if (link !== "#") offsetTop = _(link).offsetTop;
    } catch (error) {
      return;
    }

    // Finally scroll to target
    jump(offsetTop, smoothly);
  };

  const sections = __(selector);
  sections.forEach((link) => link.addEventListener("click", jumpToSection));
};

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

const scrollActive = (event) => {
  const sections = Array.from(__("section[id]"));
  const navLinks = Array.from(__(".nav__menu a"));

  const toggleActiveLink = () => {
    const scrollPosition = window.scrollY;

    sections.forEach((section) => {
      const { offsetHeight, offsetTop, id } = section;
      const link = navLinks.find(
        (navLink) => navLink.getAttribute("href") === `#${id}`
      );

      if (link === undefined) return;
      scrollPosition > offsetTop - 50 &&
      scrollPosition <= offsetTop + offsetHeight - 50
        ? link.classList.add("active-link")
        : link.classList.remove("active-link");
    });
  };

  toggleActiveLink();
  window.addEventListener("scroll", toggleActiveLink);
};

export { scrollUp, scrollActive, scrollToSection };
