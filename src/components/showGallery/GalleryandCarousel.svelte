<script>
  import { Images } from "svelte-images";
  export let images = [];
</script>

<style>
  main {
    height: 75vh;
  }
</style>

<main>
  <Images {images} gutter={5} />
</main>
