<script>
  import Icon from "@iconify/svelte";

  let location = "";

  function form() {
    console.log("Location:", location);
  }
</script>

<form>
  <input bind:value={location} type="text" id="location" placeholder="Search for a city..." />
  <button on:click={form} id="searchbtn"><Icon icon="carbon:search" /></button>
</form>

<style lang="scss">
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
</style>
