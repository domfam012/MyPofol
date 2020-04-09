const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);

const express = require("express")();
const helmet = require("helmet");
const bodyParser = require("body-parser");

const { option } = require("./config.js");

const port = dev ? option.port.dev : option.port.production;
const ip = dev ? option.ip.dev : option.ip.production;

app.prepare().then(() => {
    createServer((req, res) => {
        // Be sure to pass `true` as the second argument to `url.parse`.
        // This tells it to parse the query portion of the URL.
        const parsedUrl = parse(req.url, true);

        express.set("trust proxy", 1);
        express.use(
            helmet(),
            bodyParser.urlencoded({ extended: true }),
            bodyParser.json()
        );

        handle(req, res, parsedUrl);

    }).listen(port, err => {
        if (err) throw err;

        console.log(`> NODE_ENV: ${process.env.NODE_ENV}`);
        console.log(`> [MyUI-react] Ready on http://${ip}:${port}`);
        console.log(`>>> __IP: [${ip}] __PORT: [${port}]`);
        console.log(`\n`);
    });
});
