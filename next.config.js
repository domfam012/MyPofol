const withCSS = require("@zeit/next-css");
const { option } = require("./config.js");


const assetPrefix =
    process.env.NODE_ENV === `production`
        ? option.assetPrefix.aws
        : option.assetPrefix.dev;

module.exports = withCSS({
    distDir: "_next",
    pageExtensions: ["jsx", "js"],
    exportTrailingSlash: true,
    assetPrefix: assetPrefix,
    env: {
        ASSET_PREFIX: assetPrefix
    },
    exportPathMap: function() {
        return {
            "/": { page: "/" }
        };
    }
});
