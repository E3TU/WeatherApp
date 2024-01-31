import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.API_KEY;
const city = "Helsinki";

if (!apiKey) {
  console.error("Api key is missing add it to the .env file");
  process.exit(1);
}

const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

const fetchWeatherData = async (req, res) => {
  try {
    // Make a GET request using fetch
    const response = await fetch(url);

    // Check if the request was successful (status code 200)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Access the weather data
    // console.log('Weather data:', data);

    const weatherData = {
      location: data.name,
      temp: data.main.temp,
      realfeel: data.main.feels_like,
      mintemp: data.main.temp_min,
      maxtemp: data.main.temp_max,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      windspeed: data.wind.speed,
    };

    return weatherData;
    
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchWeatherData();

export { fetchWeatherData };
