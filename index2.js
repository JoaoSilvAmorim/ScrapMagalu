//config contains the script configuration constants, to scrap another page change the config file in url:path
var config = require('./config.json');

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin());

async function scrap(){
    //Open browser
    const browser = await puppeteer.launch({headless: false})

    //Create new page
    const page = await browser.newPage();
    
    //Url direction
    await page.goto('https://www.instagram.com/accounts/login/');

    //Login
    await page.waitForSelector('input[name="username"]');
    await page.type('input[name="username"]', 'jvsamorim_');
    await page.type('input[name="password"]', '87556139');
    await page.click('button[type="submit"]');

    // //Route message
    // await page.waitForSelector('a[class="xWeGp"]');
    // await page.click('a[class="xWeGp"]');

    // //close alert
    // await page.waitForSelector('button[class="aOOlW   HoLwm"]');
    // await page.click('button[class="aOOlW   HoLwm"]'); 

    // //click search
    // await page.waitForSelector('input[class="wpO6b ZQScA"]');
    // await page.type('input[class="wpO6b ZQScA"]', 'MATHEUSNAS');

    // //search
    // await page.waitForSelector('input[class="j_2Hd     uMkC7 M5V28"]');
    // await page.type('input[class="j_2Hd     uMkC7 M5V28"]', 'MATHEUSNAS');

    await page.waitForSelector('button[class="sqdOP yWX7d    y3zKF     "]')
    await page.click('button[class="sqdOP yWX7d    y3zKF     "]')

    await page.waitForSelector('div[class="_7UhW9   xLCgt      MMzan    _0PwGv         uL8Hv        T0kll "]');
    await page.click('div[class="_7UhW9   xLCgt      MMzan    _0PwGv         uL8Hv        T0kll');


    const data = await page.evaluate(async() => {
        let arrayComents = document.querySelectorAll('span[class="_7UhW9   xLCgt      MMzan   KV-D4           se6yk       T0kll "]');

        return arrayComents
    
    })
    return data
}


async function run(){
    let data = await scrap();

    console.log(data)
}

run()


