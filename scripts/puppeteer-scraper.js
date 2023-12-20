import puppeteer from "puppeteer";

async function getWeatherData() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  try {
    // Go to page
    await page.goto("https://www.foreca.fi/Finland/Helsinki");
    // Temperature element classname changes based on the temperature so we need to have constants for both
    const coldTempEl = await page.$(".t.cold");
    const warmTempEl = await page.$(".t.warm");

    //Selecting the weather condition element to check if it's cloudy, sunny etc.
    const weatherCondition = await page.$(".table .head");

    // Retrieving elements for both minimum and maximum temperatures.
    // Constants are used to distinguish between warm and cold temperature variants.
    const maxTempElWarm = await page.$(".tx.warm");
    const maxTempElCold = await page.$(".tx.cold");
    const minTempElWarm = await page.$(".tn.warm");
    const minTempElCold = await page.$(".tn.cold");

    // Locating the real feel temperature element on the page.
    const realFeelEl = await page.$(".temp p:not([class])");

    //Retrieve all items with classname "value".
    const values = await page.$$(".value");
    // The first element with class "value" (e.g., pressure value)
    const pressure = values[0];
    // The second element with class "value" (e.g., humidity value)
    const humidity = values[1];

    // Retrieve the windspeed element
    const windspeed = await page.$(".ws");

    // Define weatherData object
    const weatherData = {};

    // Checking which of these elements exists then pushing the data to the weatherData object
    if (coldTempEl) {
      weatherData.temp = await page.evaluate((el) => el.innerText, coldTempEl);
    } else if (warmTempEl) {
      weatherData.temp = await page.evaluate((el) => el.innerText, warmTempEl);
    }

    // Checking which of these elements exists then pushing the data to the weatherData object
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

    // Checking which of these elements exists then pushing the data to the weatherData object
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

    // Pushing the weather condition data to the weatherData object
    weatherData.condition = await page.evaluate(
      (el) => el.innerText,
      weatherCondition
    );

    // Checking if the realfeel element exists
    if (realFeelEl) {
      // Extracting the inner text from the realfeel element
      const realFeelText = await page.evaluate(
        (el) => el.innerText,
        realFeelEl
      );

      // Extracting the numeric value from the string using regular expression
      const realFeelExtract = realFeelText.match(/(-?\d+\.?\d*)/);

      // Checking if a numeric value was successfully extracted and assigning it to weatherData.realfeel
      if (realFeelExtract) {
        weatherData.realfeel = realFeelExtract[0];
      }
    }

    // Pushing the airpressure data to the weatherData object
    weatherData.pressure = await page.evaluate(
      (el) => el.innerText,
      pressure
    );

    // Pushing the humidity data to the weatherData object
    weatherData.humidity = await page.evaluate(
      (el) => el.innerText,
      humidity
    );

    // Pushing the windspeed data to the weatherData object
    weatherData.windspeed = await page.evaluate(
      (el) => el.innerText,
      windspeed
    );

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

export default getWeatherData;