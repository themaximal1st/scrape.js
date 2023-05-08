const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on("error", () => { });

module.exports = function (html) {
    const dom = new JSDOM(html, { virtualConsole });
    const canonicalLink = dom.window.document.querySelector('link[rel="canonical"]');

    if (!canonicalLink) return null;

    const url = canonicalLink.getAttribute("href");
    if (!url) return null;

    return url;
}