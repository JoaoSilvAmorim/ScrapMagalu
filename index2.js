//config contains the script configuration constants, to scrap another page change the config file in url:path

//PRODUTO_seller
//sellers
var config = require('./config.json');

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin());
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};


const searchSeller = async (page, seller_name) => {
    seller_name = seller_name.replace(/ /g, "").toLowerCase().replace(/á/g, "a").replace(/à/g, "a").replace(/ô/g, "a").replace(/ã/g, "a");
    let sellers = await page.$eval('div[id="PRODUTO_seller--carrossel"]', el => {
        let list = []
        for(let i = 0; i < el.childNodes[0].childElementCount; i++){
            list.push(el.childNodes[0].childNodes[i].childNodes[0].childNodes[0].textContent);
        }
        return list
    })  
    sellers = sellers.map((item) => {
        item = item.replace(/ /g, "").toLowerCase().replace(/á/g, "a").replace(/à/g, "a").replace(/ô/g, "a").replace(/ã/g, "a");
        return item;
    })
    if(!sellers.includes(seller_name)) return {'findSeller': false, 'seller_index': sellers.indexOf(seller_name)};
  
    return {'findSeller': true, 'seller_index': sellers.indexOf(seller_name)}
  }
  
  const selectSeller = async (page, seller_index) => {
    await page.waitForSelector(`#PRODUTO_seller--carrossel > ul > li:nth-child(${seller_index + 1})`)
    await page.$eval(`#PRODUTO_seller--carrossel > ul > li:nth-child(${seller_index + 1}) > a`, el => el.click())
    await sleep(3000)
  }
  
  const get_name = () =>{
      if(window.PRODUTO_nome){
        return window.PRODUTO_nome;
      }
      return null;
  }
  
  const get_brand = () => {
    if(window.PRODUTO_catalogo["Marca"]){
        return window.PRODUTO_catalogo["Marca"][0];
    }
    return null;
  }
  
  const get_seller = () => {
    if(window.PRODUTO_sellerAtivo){
        return window.PRODUTO_sellerAtivo[1];
    }
    return null;
  }
  
  const get_category = () => {
    if(window.PRODUTO_departamento){
        return window.PRODUTO_departamento;
    }
    return null;
  }
  
  const get_images = () => {
    let list = [];
    if(window.$this_img.length > 0){
        window.$this_img.forEach((img) => {
            list.push(img.imageUrl);
        })
        return list;
    }
    return null;
  }
  
  const get_sku = () => {
    if(window.skuJson_0.skus[0].sku){
        return window.skuJson_0.skus[0].sku;
    }
    return null;
  }
  
  const get_main_image = () => {
    if(window.skuJson_0.skus[0].image){
        return window.skuJson_0.skus[0].image;
    }
    return null;
  }
  
  const get_regular_price = async () => {
    if(document.querySelector('div[id="PRODUTO_preco--precoPor"]')){
      return document.querySelector('div[id="PRODUTO_preco--precoPor"]').childNodes[0].childNodes[0].textContent.replace(/([^\d]*)/, '').replace('.', '').replace(',', '.');
    }
    return null;
  
  }
  
  const get_description = () => {
    if(window.PRODUTO_catalogo.metaTagDescription){
        return window.PRODUTO_catalogo.metaTagDescription;
    }
    return null;
  }
  
  const get_rating_value = () => {
    if(window.$this_avaliacao >= 0){
        return window.$this_avaliacao;
    }
    return null;
  }
  
  const get_rating_count = () => {
    if(window.$this_availableQuantity >= 0){
        return window.$this_availableQuantity;
    }
    return null;
  }
  
  const get_gtin = () => {
    if(document.querySelector('#PRODUTO_oculto > div.product-rich-snippets > div > meta:nth-child(7)')){
      return document.querySelector('#PRODUTO_oculto > div.product-rich-snippets > div > meta:nth-child(7)').content;
    }
    return null
  }
  
  const get_color = () => {
    if(window.PRODUTO_catalogo['Cor']){
        return window.PRODUTO_catalogo['Cor'][0];
    }
    return null;
  }
  
  const get_marketplace_name = () => {
    if(document.querySelector('head > meta:nth-child(7)').content){
        return document.querySelector('head > meta:nth-child(7)').content;
    }
    return null;
  }
  
  const get_high_price = () => {
    if(window.$this_listPrice){
      return $this_listPrice;
    }
    return null;
  }
  

async function scrap(){
    //Open browser
    const browser = await puppeteer.launch({headless: true})

    //Create new page
    const page = await browser.newPage();
    
    //Url direction
    await page.goto('https://www.novomundo.com.br/lavadora-de-roupas-brastemp-12kg-ciclo-tira-manchas-advanced-branca-bwk12ab/p');
    let {findSeller, seller_index} = await searchSeller(page, 'Brastemp');
    if(findSeller) await selectSeller(page, seller_index);

    const data =  {
        name: await page.evaluate(get_name),
        sku: await page.evaluate(get_sku),
        nsn: null,
        mpn: null,
        model: null,
        color: await page.evaluate(get_color),
        slogan: null,
        release_date: null,
        description: await page.evaluate(get_description),
        country_assembly: null,
        gtin: await page.evaluate(get_gtin),
        brand: await page.evaluate(get_brand),
        category: await page.evaluate(get_category),
        rating_value: await page.evaluate(get_rating_value),
        rating_count: await page.evaluate(get_rating_count),
        best_rating: null,
        worst_rating: null,
        review_count: null,
        low_price: null,
        high_price: await page.evaluate(get_high_price),
        price_currency: null,
        item_condition: null,
        availability: null,
        regular_price: await page.evaluate(get_regular_price),
        seller: await page.evaluate(get_seller),
        main_image: await page.evaluate(get_main_image),
        images: await page.evaluate(get_images),
        reviews: [],
        marketplace_name: await page.evaluate(get_marketplace_name)
      }
    return data
}


async function run(){
    let data = await scrap();

    console.log(data)
}

run()


