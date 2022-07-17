const { Given, Then, When, Before } = require('@cucumber/cucumber');

const inputBoxSelector = '#twotabsearchtextbox';
const inputSubmitSelector = '#nav-search-submit-button';
const filterMemorySelector = "li[aria-label='128 GB'] a"
var price1 = 0, price2 = 0
var check = 0
var ice = " "

Given(/^user navigates amazon page$/, function () {
  return browser.url('https://www.amazon.in/');
});

Then(/^Body contains "([^"]*)"$/, function (title) {
  console.log(title)
  return browser.assert.titleContains('Amazon')
});

Given(/^user on home page$/, function () {
  return browser.url('https://www.amazon.in/')
  //browser.assert.visible(inputBoxSelector)


});
When('user search {string}', function (string) {
  console.log(string)
  browser.assert.visible(inputBoxSelector)
  browser.setValue(inputBoxSelector, string)
  browser.assert.visible(inputSubmitSelector)
  return browser.click(inputSubmitSelector)


});
Then(/^apply filter 128GB memory$/, function () {
  return browser.moveToElement(filterMemorySelector, 0, 0)
    .waitForElementVisible(filterMemorySelector)
    .click(filterMemorySelector)
});

Given(/^Results are displayed$/, function () {
  return browser.url('https://www.amazon.in/');
});

Then('using for loop extract iphone13 pink 128GB', async function () {
  browser
    .waitForElementVisible('body')
    .assert.titleContains('Amazon')
    .assert.visible(inputBoxSelector)
    .setValue(inputBoxSelector, 'iphone 13')
    .assert.visible(inputSubmitSelector)
    .click(inputSubmitSelector)
    .moveToElement(filterMemorySelector, 0, 0)
    .waitForElementVisible(filterMemorySelector)
    .click(filterMemorySelector)
  for (let i = 1; i < 20; i++) {
    if (i == 4 | i == 6) {
      continue
    }

    browser
      .waitForElementPresent("div[cel_widget_id='MAIN-SEARCH_RESULTS-" + i + "'] h2 span")
    var title = await browser.getText('css selector', "div[cel_widget_id='MAIN-SEARCH_RESULTS-" + i + "'] h2 span")


    if (title == "Apple iPhone 13 (128GB) - Pink") {
      check = 1
      var sourcePrice = await browser.getText('css selector', "div[cel_widget_id='MAIN-SEARCH_RESULTS-" + i + "'] span[data-a-color='price'] span.a-price-whole")
      browser.click("div[cel_widget_id='MAIN-SEARCH_RESULTS-" + i + "'] h2 span")
      console.log(sourcePrice)
    }
    if (check == 1) {
      break
    }
  }

});

Given(/^redirected to product page$/, function () {
  return browser.url('https://www.amazon.in/');
});

Then('extract price to pay', async function () {
  browser
    .waitForElementVisible('body')
    .assert.titleContains('Amazon')
    .assert.visible(inputBoxSelector)
    .setValue(inputBoxSelector, 'iphone 13')
    .assert.visible(inputSubmitSelector)
    .click(inputSubmitSelector)
    .moveToElement(filterMemorySelector, 0, 0)
    .waitForElementVisible(filterMemorySelector)
    .click(filterMemorySelector)
  for (let i = 1; i < 20; i++) {
    if (i == 4 | i == 6) {
      continue
    }

    browser
      .waitForElementPresent("div[cel_widget_id='MAIN-SEARCH_RESULTS-" + i + "'] h2 span")
    var title = await browser.getText('css selector', "div[cel_widget_id='MAIN-SEARCH_RESULTS-" + i + "'] h2 span")


    if (title == "Apple iPhone 13 (128GB) - Pink") {
      check = 1
      var sourcePrice = await browser.getText('css selector', "div[cel_widget_id='MAIN-SEARCH_RESULTS-" + i + "'] span[data-a-color='price'] span.a-price-whole")
      browser.click("div[cel_widget_id='MAIN-SEARCH_RESULTS-" + i + "'] h2 span")
      console.log(sourcePrice)
    }
    if (check == 1) {
      break
    }
  }
  browser.windowHandles(function (result) {
    var handle = result.value[1];
    browser.switchWindow(handle)
  })
  price2 = await browser.getText('css selector', 'span.apexPriceToPay span[aria-hidden="true"]')
  console.log(price2);
  return title, sourcePrice
});

