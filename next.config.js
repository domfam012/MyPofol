const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  distDir: "_next",
  pageExtensions: ["jsx", "js"],
  exportPathMap: function() {
    return {
      "/": { page: "/" }
    };
  }
});
