import puppeteer from "puppeteer";

async function getWeatherData() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  try {
    // Navigate to the weather page
    await page.goto('https://www.foreca.fi/Finland/Helsinki');

    // Extract the weather data from the page
    const coldElement = await page.$('.t.cold');
    const warmElement = await page.$('.t.warm');

    const weatherData = {};

    if (coldElement) {
      weatherData.cold = await page.evaluate(el => el.innerText, coldElement);
    }

    if (warmElement) {
      weatherData.warm = await page.evaluate(el => el.innerText, warmElement);
    }

    console.log('Weather Data:', weatherData);
  } catch (error) {
    console.error('Error scraping data:', error.message);
  } finally {
    // Close the browser
    await browser.close();
  }
}

// Call the function
getWeatherData();
