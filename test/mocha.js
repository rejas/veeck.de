const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const bs = require('browser-sync');

// helper functions to start/stop server before/after tests
let browserSync = null;
const startServer = () => {
    browserSync = bs.create();
    browserSync.init({
        open: false,
        server: __dirname + '/../dist'
    });
};
const stopServer = () => {
    browserSync.cleanup();
};

// puppeteer options
const opts = {
    headless: true,
    timeout: 2000
};

describe('my homepage', function () {

    let browser;
    let page;

    before(async function () {
        startServer();
        browser = await puppeteer.launch(opts);
        page = await browser.newPage();
    });

    beforeEach(async function () {
        page = await browser.newPage();
        await page.goto('http://localhost:3000',{ waitUntil: "load" });
    });

    afterEach(async function () {
        await page.close();
    });

    after(async function () {
        await browser.close();
        stopServer();
    });

    it('should have the correct page title', async function () {
        expect(await page.title()).to.eql('Veeck');
    });
});
