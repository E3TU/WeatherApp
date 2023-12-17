import puppeteer from "puppeteer";

async function getWeatherData() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  try {
    await page.goto("https://www.foreca.fi/Finland/Helsinki");

    const coldTempEl = await page.$(".t.cold");
    const warmTempEl = await page.$(".t.warm");

    const weatherCondition = await page.$(".table .head");

    const maxTempElWarm = await page.$(".tx.warm");
    const maxTempElCold = await page.$(".tx.cold");
    const minTempElWarm = await page.$(".tn.warm");
    const minTempElCold = await page.$(".tn.cold");

    const realFeelEl = await page.$(".temp p:not([class])");

    const values = await page.$$(".value");
    const pressure = values[0];
    const humidity = values[1];

    const windspeed = await page.$(".ws");

    const weatherData = {};

    if (coldTempEl) {
      weatherData.temp = await page.evaluate((el) => el.innerText, coldTempEl);
    } else if (warmTempEl) {
      weatherData.temp = await page.evaluate((el) => el.innerText, warmTempEl);
    }

    if (maxTempElWarm) {
      weatherData.maxtemp = await page.evaluate(
        (el) => el.innerText,
        maxTempElWarm
      );
    } else if (maxTempElCold) {
        weatherData.maxtemp = await page.evaluate(
        (el) => el.innerText,
        maxTempElCold
      );
    }
      
    if (minTempElWarm) {
      weatherData.mintemp = await page.evaluate(
        (el) => el.innerText,
        minTempElWarm
      );
    } else if (minTempElCold) {
        weatherData.mintemp = await page.evaluate(
        (el) => el.innerText,
        minTempElCold
      );
    }

    weatherData.condition = await page.evaluate(
      (el) => el.innerText,
      weatherCondition
    );

    if (realFeelEl) {
      const realFeelText = await page.evaluate((el) => el.innerText, realFeelEl);

      const realFeelExtract = realFeelText.match(/(-?\d+\.?\d*)/);

      if (realFeelExtract) {
        weatherData.realfeel = realFeelExtract[0];
      }
    }


    weatherData.pressure = await page.evaluate(
      (el) => el.innerText,
      pressure
    )

    weatherData.humidity = await page.evaluate(
      (el) => el.innerText,
      humidity
    )

    weatherData.windspeed = await page.evaluate(
      (el) => el.innerText,
      windspeed
    )


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
