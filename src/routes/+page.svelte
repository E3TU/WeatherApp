<script>
  import "@fontsource/ubuntu";
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";

  //Components
  import Form from "../components/Form.svelte";

  let country = "Japan";
  let city = "Tokyo";
  let newUrl = "https://www.foreca.fi/" + country + "/" + city;

  onMount(async () => {
    await fetchData();
    await updateUrl(newUrl);
  });

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3001/weather");
      const data = await res.json();
      console.log(data.weatherData);
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  async function updateUrl(newUrl) {
  try {
    const response = await fetch('http://localhost:3001/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newUrl }),
    });

    const data = await response.json();
    console.log(data.message); // Log the server response
  } catch (error) {
    console.error('Error updating URL:', error);
  }
}
</script>

<body>
  <div class="container">
    <div class="weather-card">
      <div class="top-section">
        <Form />
      </div>
      <div class="mid-section">
        <h1 class="location">Finland, Helsinki</h1>
        <h3 class="weather-forecast">Cloudy</h3>
        <!-- Icon -->
        <Icon icon="carbon:cloudy" width="100" height="100" />

        <h2 class="tempnow">11°C</h2>
        <div class="temps">
          <h3 class="templow">Min -2°C</h3>
          <h3 class="temphigh">Max 15°C</h3>
        </div>
      </div>
      <div class="bottom-section">
        <div class="grid-container">
          <div class="grid-item">
            <Icon icon="carbon:temperature-celsius" width="30" height="30" />
            <div class="item-data">
              <h4>Real Feel</h4>
              <h4>15°</h4>
            </div>
          </div>
          <div class="grid-item">
            <Icon icon="carbon:humidity" width="30" height="30" />
            <div class="item-data">
              <h4>humidity</h4>
              <h4>75%</h4>
            </div>
          </div>
          <div class="grid-item">
            <Icon icon="carbon:windy" width="30" height="30" />
            <div class="item-data">
              <h4>Wind</h4>
              <h4>5 m/s</h4>
            </div>
          </div>
          <div class="grid-item">
            <Icon icon="carbon:meter" />
            <div class="item-data">
              <h4>Pressure</h4>
              <h4>534 hPa</h4>
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
