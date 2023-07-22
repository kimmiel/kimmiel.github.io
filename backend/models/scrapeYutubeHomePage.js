//1從拿要的function
const { By, Key, Builder } = require("selenium-webdriver");
const fs = require("fs");
//const scrapeVedieo = document.querySelector(".scrapeVedieo");
require("chromedriver");

async function scrape(url) {
  //2make selenium webdriver for chrome
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get(url);

  //3找要的那个element 找所有有a的element
  //let links = await driver.findElements(By.className("yt-simple-endpoint inline-block style-scope ytd-thumbnail")); //classname
  //let links = await driver.findElements(By.tagName("a")); //css=classname
  let objects = await driver.findElements(By.id("video-title-link")); //id

  //4把每個element用for loop print 出来
  for (let object of objects) {
    let href = await object.getAttribute("href");
    if (href != null) {//如果有video連結
      console.log(href);
      console.log(await object.getText());
      
      //console.log(await object.getAttribute("title"));
    }
  }

  //另外的方法 display a specific line in the page 拿有特定名字的影片
  // let lines= await driver.findElements(By.partialLinkText("G Group")); //css=classname
  // for (let line of lines) {
  //   console.log(await line.getText());
  // }

  driver.quit();
}

scrape("https://www.youtube.com/@UkiVioleta/streams");
