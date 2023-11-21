<script>
  import "@fontsource/ubuntu";
  import Icon from "@iconify/svelte";
</script>

<body>
  <div class="container">
    <div class="weather-card">
      <div class="top-section">
        <form>
          <input type="text" placeholder="Search for a city..." />
          <button id="searchbtn"
            ><Icon icon="heroicons:magnifying-glass" /></button
          >
        </form>
      </div>
      <div class="mid-section">
        <h1 class="location">Finland, Helsinki</h1>
        <h3 class="date">Monday, December 1, 2023 at 3:30 AM</h3>
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
          <div class="grid-item" />
          <div class="grid-item" />
          <div class="grid-item" />
          <div class="grid-item" />
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
    background: rgba(
      255,
      255,
      255,
      0.2
    ); /* Adjust the alpha value to control the frosted effect */
    backdrop-filter: blur(
      50px
    ); /* Adjust the blur value to control the frosted effect */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Add a subtle box shadow for depth */
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
      background-color: $dark-background-color;
      text-align: center;
      border-radius: 6px;
    }
  }
</style>
