const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');
require('dotenv').config();
const url = "https://www.coinbase.com/price/the-graph";

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.setViewport({ width: 1900, height: 1080 });
    
    
    let data = await page.evaluate(()=>{
        return document.querySelector('div[class="cds-typographyResets-t1xhpuq2 cds-display3-doujgnf cds-foreground-f1yzxzgu cds-transition-txjiwsi cds-start-s1muvu8a cds-tabularNumbers-t11sqpt cds-1-_7ojgr9"]').innerText;
    })
    let numericPrice = parseFloat(data.replace(/[^\d.,]/g, "").replace(',', '.')); 
    console.log("le prix est actuellement de : " + numericPrice);
    
    if (numericPrice <= 0.15) { 
        sendNotification(numericPrice);
    }else {
        console.log("aucun message envoye");
    }
    


    async function sendNotification(price){
        let transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                type:'OAUTH2',
                user: "puppeteerromeo@gmail.com",
                pass: process.env.MAIL_PASS,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken:"1//04TSTk86HFhH6CgYIARAAGAQSNwF-L9IrGPPa9rpuWXtYDySW89q4oKRpWq2ywBDmOGx1-_jiadQrJiKNJgqghkBsg8-3-E00Y1I"
            }
        });
        let info = await transporter.sendMail({
            from :'"PRIX THE GRAPH COINBASE" <puppeteerromeo@gmail.com>',
            to : "romeoago004@gmail",
            suject:"PRIX SOUS LES "+price+" EUROS",
            html: "le prix de la crypto the graph est de "+ price +" euro"
        }).then(()=> console.log("message envoye"))
    } 

    // let bodyHTML = await page.evaluate(()=> document.body.innerHTML);
    // console.log(bodyHTML);

    // await page.screenshot({ path: "screenshot.png" });
    await browser.close();
})();