function setImageSrc(a) {
  const e = a.dataset.src ? a.dataset.src : a.dataset.iesrc;
  a.setAttribute("src", e), (a.onload = () => a.classList.add("image-fade"));
}

const lazyloadImgTag = () => {
  lozad(".img-lozad", { load: setImageSrc }).observe();
};

const lazyloadPictureTag = (event) => {
  lozad(".picture-lozad", {
    load: (a) => {
      a
        .querySelectorAll("source")
        .forEach((a) => a.setAttribute("srcset", a.dataset.srcset)),
        setImageSrc(a.querySelector("img"));
    },
  }).observe();
};

document.addEventListener("DOMContentLoaded", lazyloadPictureTag);

// export { lazyloadPictureTag };
