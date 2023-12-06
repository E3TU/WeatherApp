import fetch from "node-fetch";
import * as cheerio from 'cheerio';

const weatherUrl = "https://search.brave.com/search?q=weather+helsinki";

async function getWeatherData() {
  try {
    const response = await fetch(weatherUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const currentTemp = $("#weather-temp").text().trim();
    const maxTemp = $(".max").text().trim();
    const minTemp = $(".min.svelte-13bx4fj").text().trim();


    console.log("Current temperature: " + currentTemp);
    console.log("Max temperature: " + maxTemp);
    console.log("Min temperature: " + minTemp);


  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

getWeatherData();
