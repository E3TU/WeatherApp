<script>
  // Import WeatherCard component
  import WeatherCard from "../components/WeatherCard.svelte";

  // Import font
  import "@fontsource/ubuntu";

  // Import icons
  import Icon from "@iconify/svelte";

  import { onMount } from "svelte";

  let isLoaded = false;
  let showWeatherContainer = false;
  let newCity = "";

  //Variables for weatherdata
  let temperature,
    maxtemperature,
    mintemperature,
    weatherCondition,
    realfeel,
    humidity,
    windspeed,
    location,
    airpressure,
    icon = "";

  onMount(async () => {
    isLoaded = true;
  });

  // Function to submit the form
  function submitForm(e) {
    e.preventDefault();
    updateLocation(newCity);
    newCity = "";
    fetchData().then(() => {
      // Show the weather container after fetching new data
      showWeatherContainer = true;
    });
  }
  // Function to fetch the weather data
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3001/weather");
      const data = await res.json();
      location = data.weatherData.location;
      temperature = data.weatherData.temp;
      maxtemperature = data.weatherData.maxtemp;
      mintemperature = data.weatherData.mintemp;
      realfeel = data.weatherData.realfeel;
      weatherCondition = data.weatherData.weathercondition;
      humidity = data.weatherData.humidity;
      windspeed = data.weatherData.windspeed;
      airpressure = data.weatherData.pressure;
      icon = data.weatherData.icon;
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  // Function to update the location when user inputs new city
  const updateLocation = async (newCity) => {
    try {
      const response = await fetch("http://localhost:3001/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newCity }),
      });

      const data = await response.json();
      console.log(data.message); // Log the server response
    } catch (error) {
      console.log("Error updating", error);
    }
  };
</script>

<body>
  {#if isLoaded}
    <div class="container">
      <h1 class="app-name-heading">Weather App</h1>
      <div class="top-section">
        <form>
          <input
            bind:value={newCity}
            type="text"
            id="location"
            name="location"
            placeholder="Search for city..."
          />
          <button on:click={submitForm} id="searchbtn"
            ><Icon icon="carbon:search" /></button
          >
        </form>
      </div>
      {#if showWeatherContainer}
        <WeatherCard {location} {weatherCondition} {icon} {temperature} {mintemperature} {maxtemperature} {realfeel} {humidity} {windspeed} {airpressure}/>
      {/if}
    </div>
  {/if}
</body>

<style lang="scss">
  @keyframes fadeInAnimation {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    animation: fadeInAnimation ease 1s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }
  .app-name-heading {
    margin-top: 2rem;
  }
  .top-section {
    height: auto;
    margin-top: 2rem;
    input {
      font-size: 1rem;
      outline: none;
      border: none;
      padding: 1rem 1rem;
      min-width: 20rem;
      background-color: $dark-background-color;
      color: $white !important;
      margin-top: 1rem;
      border-radius: 6px;
      box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
    }
    #searchbtn {
      font-size: 1rem;
      outline: none;
      border: none;
      color: #fff !important;
      border-radius: 6px;
      padding: 1rem 1rem;
      margin-left: 0.25rem;
      background-color: $dark-background-color;
      box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
    }
    ::placeholder {
      color: $white;
    }
  }

</style>
