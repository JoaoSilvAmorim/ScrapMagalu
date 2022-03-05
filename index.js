const puppeteer = require('puppeteer');


//config contains the script configuration constants, to scrap another page change the config file in url:path
var config = require('./config.json');

async function scrap(){
    //setting pp, headless: false displays chromium 
    const browser = await puppeteer.launch({ headless: config.headless })

    //Create new page chromium
    const page = await browser.newPage()

    //access website url
    await page.goto(config.url.path)

    //Rate context page
    const data = await page.evaluate(() => {
    
    //list to filter the page context data
		const listData = []
    
    //items receives an array with the selector data
    const items = document.querySelectorAll('body > div[class="wrapper__main"] > div[class="wrapper__content js-wrapper-content"] > div[class="wrapper__control"] > div[class="method-payment"] > div[class="method-payment__card-box"] > ul[class="method-payment__values--general-cards"] > li > p')
      for (const item of items) {
        listData.push({
          data: item.textContent
        })
		  }
      return listData
    })

    //contains the list of selected items 
    return data
}


//running scrap and organizing the information
async function run(){
  let arrayScrap = await scrap()

  arrayScrap = arrayScrap.map((element, index)=> {
    let arrayInfo = element.data.split(' ');
    return {
      type: arrayInfo.includes('vista') ? 'À vista' : 'À prazo',
      parcels: index + 1,
      value: arrayInfo.includes('vista') ? arrayInfo[1] : arrayInfo[2]
    };
  });


  console.log(arrayScrap)
}
run()

