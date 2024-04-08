<script>
  import Icon from "@iconify/svelte";
  import { fade } from "svelte/transition";

  export let location,
    weatherCondition,
    icon,
    temperature,
    mintemperature,
    maxtemperature,
    realfeel,
    humidity,
    windspeed,
    airpressure;
</script>

<div transition:fade={{ delay: 300, duration: 300 }} class="weather-card">
  <div class="weather-card-top">
    <h1 class="location">{location}</h1>
    <h3 class="weather-forecast">{weatherCondition}</h3>
    <!-- Icon -->
    <!-- <Icon icon="carbon:sun" width="100" height="100" /> -->
    {#if icon}
      <img
        alt="weathericon"
        src={`https://openweathermap.org/img/wn/${icon}.png`}
      />
    {:else}
      <p>No weather icon available</p>
    {/if}
    <h2 class="tempnow">{temperature} °C</h2>
    <div class="temps">
      <h3 class="templow">Min {mintemperature} °C</h3>
      <h3 class="temphigh">Max {maxtemperature} °C</h3>
    </div>
  </div>
  <div class="weather-card-bottom">
    <div class="grid-container">
      <div class="grid-item">
        <Icon icon="carbon:temperature-celsius" width="30" height="30" />
        <div class="item-data">
          <h4>Real Feel</h4>
          <h4>{realfeel} °C</h4>
        </div>
      </div>
      <div class="grid-item">
        <Icon icon="carbon:humidity" width="30" height="30" />
        <div class="item-data">
          <h4>humidity</h4>
          <h4>{humidity} %</h4>
        </div>
      </div>
      <div class="grid-item">
        <Icon icon="carbon:windy" width="30" height="30" />
        <div class="item-data">
          <h4>Wind</h4>
          <h4>{windspeed} m/s</h4>
        </div>
      </div>
      <div class="grid-item">
        <Icon icon="carbon:meter" />
        <div class="item-data">
          <h4>Pressure</h4>
          <h4>{airpressure} hPa</h4>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .weather-card {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    width: 40rem;
    height: 45rem;
    border-radius: 12px;
    background: $weathercard-background-color;
    box-shadow:
      rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px,
      rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px,
      rgba(0, 0, 0, 0.09) 0px -3px 5px;
    transition: 5s;
    h1 {
      font-size: 2rem;
    }
    h2 {
      font-size: 1.5rem;
    }
    h3 {
      font-size: 1.2rem;
      margin-top: 1rem;
    }
  }

  .weather-card-top {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: auto;
    padding-top: 4rem;
  }
  .weather-forecast {
    margin-top: 2rem;
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
  .weather-card-bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    .grid-container {
      display: grid;
      margin-top: 2rem;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      justify-content: center;
      gap: 20px;
      height: 100% - 30%;
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

  // Media queries(width)
  @media only screen and (max-width: 800px) {
    .weather-card {
      width: 35rem;
      height: 40rem;
    }
  }
  @media only screen and (max-width: 580px) {
    .weather-card {
      width: 30rem;
      height: 35rem;
      h3 {
        font-size: 1rem;
        margin-top: 1rem;
      }
      h4 {
        font-size: 0.8rem;
      }
    }
  }
  @media only screen and (max-width: 495px) {
    .weather-card {
      width: 25rem;
      height: 35rem;
    }
  }
  @media only screen and (max-width: 415px) {
    .weather-card {
      width: 22rem;
      h1 {
        font-size: 1.75rem;
      }
    }
    .weather-card-top {
      padding-top: 3rem;
    }
    .weather-forecast {
      margin-top: 1rem !important;
      margin-bottom: 1rem !important;
    }
    .tempnow {
      margin-top: 1rem;
    }
  }
  @media only screen and (max-width: 370px) {
    .weather-card{
      width: 20rem;
      height: 30rem;
      h1{
        font-size: 1.5rem;
      }
      h2{
        font-size: 1.25rem;
      }
      h3{
        font-size: 1rem;
      }
    }
    @media only screen and (max-width: 330px) {
      .weather-card{
        width: 18rem;
      }
    }
  }
  // Media queries(height)
  @media only screen and (max-height: 670px) {
    .weather-card {
      margin-bottom: 2rem;
    }
  }
</style>
