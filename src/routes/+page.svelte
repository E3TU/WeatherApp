<script>
  import "@fontsource/ubuntu";
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";

  let location = "";
  let country = "";
  let city = "";
  let newUrl = "";

  let temperature, maxtemperature, mintemperature, weatherCondition, realfeel, humidity, windspeed, airpressure = "";

  // Function to update the country and city names to the url
  function formInput(e) {
    e.preventDefault();
    // Split the country and city values and push them to array
    const locationArray = location.split(/[ ,]+/);
    country = capitalizeFirstLetter(locationArray[0]);
    city = capitalizeFirstLetter(locationArray[1]);

    // Update the url with new country and city names
    newUrl = "https://www.foreca.fi/" + country + "/" + city;
    // Run the updateUrl function to send the country and city names to backend

    //Clear the input after it has been submitted
    location = "";

    updateUrl(newUrl);
  }

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  onMount(async () => {
    await fetchData();
  });

  // Fetch the weather data
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3001/weather");
      const data = await res.json();
      temperature = data.weatherData.temp;
      maxtemperature = data.weatherData.maxtemp;
      mintemperature = data.weatherData.mintemp;
      weatherCondition = data.weatherData.condition;
      realfeel = data.weatherData.realfeel;
      humidity = data.weatherData.humidity;
      windspeed = data.weatherData.windspeed;
      airpressure = data.weatherData.pressure;
      console.log(data.weatherData);
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  // Update the URL and send the data to backend (this function is called when user inputs country and city name to the form)
  async function updateUrl(newUrl) {
    try {
      const response = await fetch("http://localhost:3001/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newUrl }),
      });

      const data = await response.json();
      console.log(data.message); // Log the server response
    } catch (error) {
      console.error("Error updating URL:", error);
    }
  }
</script>

<body>
  <div class="container">
    <div class="weather-card">
      <div class="top-section">
        <form>
          <input
            bind:value={location}
            type="text"
            id="location"
            name="location"
            placeholder="Input Countryname Cityname..."
            about
          />
          <button on:click={formInput} id="searchbtn"
            ><Icon icon="carbon:search" /></button
          >
        </form>
      </div>
      <div class="mid-section">
        <h1 class="location">{country} {city}</h1>
        <h3 class="weather-forecast">{weatherCondition}</h3>
        <!-- Icon -->
        <Icon icon="carbon:cloudy" width="100" height="100" />

        <h2 class="tempnow">{temperature}</h2>
        <div class="temps">
          <h3 class="templow">Min {mintemperature}</h3>
          <h3 class="temphigh">Max {maxtemperature}</h3>
        </div>
      </div>
      <div class="bottom-section">
        <div class="grid-container">
          <div class="grid-item">
            <Icon icon="carbon:temperature-celsius" width="30" height="30" />
            <div class="item-data">
              <h4>Real Feel</h4>
              <h4>{realfeel}</h4>
            </div>
          </div>
          <div class="grid-item">
            <Icon icon="carbon:humidity" width="30" height="30" />
            <div class="item-data">
              <h4>humidity</h4>
              <h4>{humidity}</h4>
            </div>
          </div>
          <div class="grid-item">
            <Icon icon="carbon:windy" width="30" height="30" />
            <div class="item-data">
              <h4>Wind</h4>
              <h4>{windspeed}</h4>
            </div>
          </div>
          <div class="grid-item">
            <Icon icon="carbon:meter" />
            <div class="item-data">
              <h4>Pressure</h4>
              <h4>{airpressure}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }
  body {
    margin: 0;
    padding: 0;
    // background-color: $dark-background-color;
    background: url("bg.svg");
    color: $dark-text-color;
    font-family: "Ubuntu", sans-serif;
  }

  .container {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .weather-card {
    display: flex;
    flex-direction: column;
    margin-top: 5rem;
    width: 45rem;
    height: 50rem;
    border-radius: 12px;
    background: #101010;
    box-shadow:
      rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px,
      rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px,
      rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
  .top-section {
    width: 100%;
    height: auto;
    padding: 1rem;
    input {
      font-size: 1rem;
      outline: none;
      border: none;
      padding: 0.75rem;
      min-width: 14rem;
      background-color: $dark-background-color;
      color: $white !important;
      margin-left: 1rem;
      margin-top: 1rem;
      border-radius: 6px;
      box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
    }
    #searchbtn {
      outline: none;
      border: none;
      color: #fff !important;
      border-radius: 6px;
      padding: 13px;
      margin-left: 0.25rem;
      background-color: $dark-background-color;
      box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
    }
    ::placeholder {
      color: $white;
    }
  }

  .mid-section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: auto;
    padding-top: 4rem;
    h3 {
      margin-top: 1rem;
    }
    .weather-forecast {
      margin-top: 2rem !important;
      background-color: $dark-background-color;
      padding: 12px;
      border-radius: 6px;
      margin-bottom: 2rem;
    }
    .tempnow {
      margin-top: 2rem;
    }
    .temps {
      display: flex;
      gap: 1rem;
    }
  }
  .bottom-section {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    .grid-container {
      display: grid;
      margin-top: 2rem;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      justify-content: center;
      gap: 20px;
      height: 100% - 20%;
      width: 100% - 10%;
    }
    .grid-item {
      display: flex;
      align-items: center;
      padding-left: 1rem;
      background-color: $dark-background-color;
      // text-align: center;
      border-radius: 6px;
      .item-data {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        margin-left: 1rem;
      }
    }
  }
</style>
