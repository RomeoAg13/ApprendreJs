const puppeteer = require('puppeteer');
require('dotenv').config();
const url = "https://www.instagram.com/";

(async () => {

    const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" });
    
    // cookie 
    await page.click('button[class="_a9-- _ap36 _a9_0"]');

    //login 
    await page.type('input[name="username"]','connexion insta', {delay : 100})
    await page.type('input[name="password"]','connexion insta', {delay : 100})
    await page.click('button[type="submit"]');
    //await browser.close();
})()