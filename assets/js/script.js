import { navigation } from "./_navigation.js";
import { scrollUp, scrollActive, scrollToSection } from "./_scrollup.js";
import { accordion } from "./_accordion.js";
// import { lazyloadPictureTag } from "./_lazy_load_image.js";

document.addEventListener("readystatechange", (event) => {
  switch (document.readyState) {
    case "loading":
      break;
    case "interactive": {
      /* The document has finished loading and we can
        access DOM elements. Sub-resources such as 
        scripts, images, stylesheets and frames are still loading.*/
      break;
    }
    case "complete":
      console.log("complete Loading");
      // lazyloadPictureTag();
      navigation();
      scrollActive();
      scrollToSection();
      scrollUp();
      accordion();
      break;
  }
});
