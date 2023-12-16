import puppeteer from "puppeteer";

async function getWeatherData() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  try {
    await page.goto("https://www.foreca.fi/Finland/Helsinki");

    const coldTempEl = await page.$(".t.cold");
    const warmTempEl = await page.$(".t.warm");
    const weatherCondition = await page.$(".table .head");

    if (!coldTempEl && !warmTempEl) {
      throw new Error("No results found.");
    }

    const weatherData = {};

    if (coldTempEl) {
      weatherData.temp = await page.evaluate((el) => el.innerText, coldTempEl);
    }

    if (warmTempEl) {
      weatherData.temp = await page.evaluate((el) => el.innerText, warmTempEl);
    }

    weatherData.Condition = await page.evaluate((el) => el.innerText, weatherCondition);

    console.log("Weather Data:", weatherData);
  } catch (error) {
    console.error("Error scraping data:", error.message);
  } finally {
    // Close the browser
    await browser.close();
  }
}

// Call the function
getWeatherData();
