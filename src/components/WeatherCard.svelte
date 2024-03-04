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

<div transition:fade={{ delay: 500, duration: 500 }} class="weather-card">
  <div class="mid-section">
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
  <div class="bottom-section">
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
</style>
