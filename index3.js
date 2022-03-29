// //config contains the script configuration constants, to scrap another page change the config file in url:path
// var config = require('./config.json'); //asd

// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth')
// puppeteer.use(StealthPlugin());

// async function scrap(){
//     //Open browser
//     const browser = await puppeteer.launch({headless: false})

//     //Create new page
//     const page = await browser.newPage();
    
//     //Url direction
//     await page.goto('https://www.magazineluiza.com.br/');

    
// async function autoScroll(page){
//     await page.evaluate(async () => {
//         await new Promise((resolve, reject) => {
//             var totalHeight = 0;
//             var distance = 50;
//             var timer = setInterval(() => {
//                 var scrollHeight = document.body.scrollHeight;
//                 window.scrollBy(0, distance);
//                 totalHeight += distance;

//                 if(totalHeight >= scrollHeight){
//                     clearInterval(timer);
//                     resolve();
//                 }
//             }, 800);
//         });
//     });
// }

//     await autoScroll(page);
//     console.log('foi')

//     //Carga
//     const data = await page.evaluate(() => {
    
//         //list to filter the page context data
//         const listData = []
        
//         //items receives an array with the selector data
//         let items = document.querySelectorAll('a[class="sc-kfPuZi drjXQk sc-cAUCVt dlDDyx"]')
//         for (const item of items) {
//             listData.push({descricao: item.innerText})
//         }
//           return listData
//         })


//     console.log('1111')
//     return data
// }


// async function run(){
//     let data = await scrap();

//     console.log('asddas')
//     console.log(data)
// }

// run()


let a = 
"var jscheckoutUrl = 'https://www.mobcomstore.com.br/checkout/#/cart';var jscheckoutAddUrl = 'https://www.mobcomstore.com.br/checkout/cart/add';var jscheckoutGiftListId = '';var jsnomeSite = 'allied';var jsnomeLoja = 'mobcom';var jssalesChannel = '1';var defaultStoreCurrency = 'R$';var localeInfo = {\"CountryCode\":\"BRA\",\"CultureCode\":\"pt-BR\",\"CurrencyLocale\":{\"RegionDisplayName\":\"Brazil\",\"RegionName\":\"BR\",\"RegionNativeName\":\"Brasil\",\"TwoLetterIsoRegionName\":\"BR\",\"CurrencyEnglishName\":\"Real\",\"CurrencyNativeName\":\"Real\",\"CurrencySymbol\":\"R$\",\"ISOCurrencySymbol\":\"BRL\",\"Locale\":1046,\"Format\":{\"CurrencyDecimalDigits\":2,\"CurrencyDecimalSeparator\":\",\",\"CurrencyGroupSeparator\":\".\",\"CurrencyGroupSize\":3,\"StartsWithCurrencySymbol\":true},\"FlagUrl\":\"http://www.geonames.org/flags/x/br.gif\"}}"
let a1 = 

let obj = JSON.parse(a1)
console.log(obj)


