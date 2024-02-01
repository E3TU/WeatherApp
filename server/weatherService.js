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
      temp: parseFloat(data.main.temp.toFixed(1)),
      realfeel: parseFloat(data.main.feels_like.toFixed(1)),
      mintemp: parseFloat(data.main.temp_min.toFixed(1)),
      maxtemp: parseFloat(data.main.temp_max.toFixed(1)),
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      windspeed: parseFloat(data.wind.speed.toFixed(1)),
      weathercondition: data.weather[0].main
    };

    return weatherData;
    
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchWeatherData();

export { fetchWeatherData };
