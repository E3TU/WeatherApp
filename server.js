import puppeteer from "puppeteer";

async function getWeatherData() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  try {
    await page.goto('https://www.foreca.fi/Finland/Helsinki');

    const coldEl = await page.$('.t.cold');
    const warmEl = await page.$('.t.warm');

    if (!coldEl && !warmEl) {
      throw new Error('No results found.');
    }

    const weatherData = {};

    if (coldEl) {
      weatherData.cold = await page.evaluate(el => el.innerText, coldEl);
    }

    if (warmEl) {
      weatherData.warm = await page.evaluate(el => el.innerText, warmEl);
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
