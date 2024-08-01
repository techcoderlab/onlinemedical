const setImageSrc = (element) => {
  const src = element.dataset.src || element.dataset.iesrc;
  if (!src) return; // Early return if no source is provided

  element.setAttribute("src", src);

  element.addEventListener(
    "load",
    () => {
      element.classList.remove("image-skeleton");
      element.classList.add("image-fade");
    },
    { once: true }
  ); // Ensure event listener is removed after execution
};

const lazyload = (selector, loadCallback) => {
  const observer = lozad(selector, { load: loadCallback });
  observer.observe();
  return observer; // Return the observer for potential future use
};

const lazyloadPictureTag = () => {
  lazyload(".picture-lozad", (picture) => {
    picture.querySelectorAll("source").forEach((source) => {
      source.setAttribute("srcset", source.dataset.srcset);
    });

    setImageSrc(picture.querySelector("img"));
  });
};

export { lazyloadPictureTag };
