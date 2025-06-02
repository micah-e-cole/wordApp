/*
 * Name: MB
<<<<<<<< HEAD:helpers/wordScraper.js
 * File: ./helpers/wordScraper.js
========
 * File: ./randomWordScraper.js
>>>>>>>> e88c96f (containerized and optimized for terraform):public/randomWordScraper.js
 */

// code to scrape words from URL
// using puppeteer elements
const puppeteer = require('puppeteer');
const fs = require('fs');

// async function to get DOM elements
(async () => {
    // variable to store browser options
    const launchOptions = { headless: true, }
    // variable to store browser element
    const browser = await puppeteer.launch(launchOptions);
    // variable to store new page element
    const page = await browser.newPage();
    // go to URL with random words, wait until DOM is loaded
    await page.goto('https://www.randomlists.com/random-words?dup=false&qty=100', {
        waitUntil: 'domcontentloaded',});
    let resultRandomWords = await page.$$eval('.rand_large', words => words.map(word => word.textContent));
    arrayToCSV(resultRandomWords);
    // wordArr = wordArr.concat(resultRandomWords);
    await browser.close();
})();

// pushes data from URL-to-csv
function arrayToCSV(arr){
    // const fs = require('fs');
    const writeToFile = arr;
    const writeStream = fs.createWriteStream('random.csv');
    writeStream.write(writeToFile.join(','));
    writeStream.close();
};




