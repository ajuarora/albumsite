<script>
  export let image;
  export let number;
</script>

<style>
  .wrapper {
    height: 100%;
  }

  img {
    /* width: 100%; */
    /* height: 100%; */
    transition: all 0.3s;
    object-fit: cover;
    border-radius: 4px;
  }

  img:hover {
    opacity: 0.8;
  }
</style>

<!-- <script>
  export let image;
  export let number;
</script><style>
  .imageDimension {
    /* height: 171px;
    width: 171px; */
    max-width: 100%; 
  }

 
</style><div class="card imageDimension">

  <img src={image.thumbnail} alt="" />

</div> -->

<div class="wrapper">
  <img src={image.thumbnail} alt="model thumb" />

</div>
