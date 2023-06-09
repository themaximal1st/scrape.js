require("dotenv").config();

const assert = require("assert");
const { readFileSync } = require("fs");

const scrape = require("../src/index");
const { shuffle } = require("../src/utils");

describe("Bulk Scraper", function () {
    this.slow(25000);
    this.timeout(150000);

    const urls = readFileSync("./test/urls.txt", "utf8").split("\n").filter(Boolean);

    it("should be able to scrape urls list", async function () {
        for (const url of shuffle(urls).slice(0, 10)) {
            const data = await scrape(url);
            assert(data);
            assert(data.html);
            assert(data.html.length > 100);
            assert(data.url);
        }
    });
});
