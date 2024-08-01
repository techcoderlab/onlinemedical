const settings = require("./settings");
const gulp = require("gulp");
const webpack = require("webpack");

// const sass = require("gulp-sass");
const sass = require("gulp-sass")(require("sass"));

// const autoprefixer = require("gulp-autoprefixer");

const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();

const penthouse = require("penthouse");
const fs = require("fs");
// Run:
// gulp critical
//
gulp.task("critical", async function () {
  await penthouse({
    url: settings.index, // can also use file:/// protocol for local files
    css: settings.themeLocation + "assets/css/style-bundled.min.css", // path to original css file on disk
    // OPTIONAL params
    width: 1300, // viewport width
    height: 900, // viewport height
    forceInclude: [
      // selectors to keep
      ".keepMeEvenIfNotSeenInDom",
      /^\.regexWorksToo/,
    ],
    propertiesToRemove: [
      "(.*)transition(.*)",
      "cursor",
      "pointer-events",
      "(-webkit-)?tap-highlight-color",
      "(.*)user-select",
    ],
    timeout: 30000, // ms; abort critical CSS generation after this timeout
    pageLoadSkipTimeout: 0, // ms; stop waiting for page load after this timeout (for sites with broken page load event timings)
    maxEmbeddedBase64Length: 1000, // characters; strip out inline base64 encoded resources larger than this
    userAgent: "Penthouse Critical Path CSS Generator", // specify which user agent string when loading the page

    // customPageHeaders: {
    //   "Accept-Encoding": "identity", // add if getting compression errors like 'Data corrupted'
    // },
    // strict: false, // set to true to throw on CSS errors
    // screenshots: {
    //   // turned off by default
    //   // basePath: 'homepage', // absolute or relative; excluding file extension
    //   // type: 'jpeg', // jpeg or png, png default
    //   // quality: 20 // only applies for jpeg type
    //   // -> these settings will produce homepage-before.jpg and homepage-after.jpg
    // },
    puppeteer: {
      getBrowser: undefined, // A function that resolves with a puppeteer browser to use instead of launching a new browser session
    },
  })
    .then((criticalCss) => {
      // use the critical css
      fs.writeFileSync(
        settings.themeLocation + "assets/css/critical-style.min.css",
        criticalCss
      );
    })
    .catch((err) => {
      console.error(err);
      // handle the error
    });
});

gulp.task("styles", function () {
  return (
    gulp
      // .src(settings.themeLocation + "assets/sass/**/*.scss")
      .src(settings.themeLocation + "assets/sass/style.scss")
      .pipe(concat("style-bundled.css"))
      .pipe(sass().on("error", sass.logError))
      // .pipe(autoprefixer("last 2 versions"))
      .pipe(cleanCSS())
      .pipe(rename({ suffix: ".min" }))
      .pipe(gulp.dest(settings.themeLocation + "assets/css"))
      .pipe(
        browserSync.reload({
          stream: true,
        })
      )
  );
});

gulp.task("scripts", function (callback) {
  webpack(require("./webpack.config.js"), function (err, stats) {
    if (err) {
      console.log(err.toString());
    }

    console.log(stats.toString());
    callback();
  });

  // return gulp
  //   .src(settings.themeLocation + "assets/js/**/*.js")
  //   .pipe(concat("script-bundled.js"))
  //   // .pipe(uglify())
  //   .pipe(rename({ suffix: ".min" }))
  //   .pipe(gulp.dest(settings.themeLocation + "assets/js"))
  //   .pipe(
  //     browserSync.reload({
  //       stream: true,
  //     })
  //   );
});
gulp.task("watch", function () {
  browserSync.init({
    watch: true, // <-- Adding this line solved my reload problem

    server: {
      baseDir: "./",
    },
    port: 3000, // <-- If you have problems with port 3000 try changing it like this
  });

  gulp.watch(
    // settings.themeLocation + "assets/sass/style.scss",
    settings.themeLocation + "assets/sass/**/*.scss",
    gulp.series("styles")
  );
  gulp.watch(settings.themeLocation + "assets/js/*.js", gulp.series("scripts"));
  gulp.watch("**/*.html").on("change", browserSync.reload);
});
gulp.task("default", gulp.parallel("styles", "scripts", "watch"));
