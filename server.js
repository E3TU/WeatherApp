import puppeteer from "puppeteer";

async function getWeatherData() {

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
  
    try {
      // Navigate to the weather page
      await page.goto('https://www.foreca.fi/Finland/Helsinki');
  
      // Extract the weather data from the page
      const weatherData = await page.evaluate(() => {
        // Customize this based on the actual structure of the website
        const temperature = document.querySelector('.temp').innerText;
  
        return {
          temperature
        };
      });
  
      console.log('Weather Data:', weatherData);
    } catch (error) {
      console.error('Error scraping data:', error.message);
    } finally {
      // Close the browser
      await browser.close();
    }
}
  
getWeatherData();
