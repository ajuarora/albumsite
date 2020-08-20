<script>
  // import HomeSwiper from "../components/home/HomeSwiper.svelte";
  import { router } from "tinro";

  import HomeCarousel from "../components/home/HomeCarousel.svelte";
  import GalleryList from "../components/gallery/GalleryList.svelte";
  import HomeStripped from "../components/home/HomeStripped.svelte";
</script>

<style>
  .home-swiper {
    z-index: 0 !important;
  }

  a {
    cursor: pointer;
  }
</style>

<div class="wrapper">

  <div class="row">
    <div class="col-sm-8 home-swiper">
      <!-- <HomeCarousel /> -->
      <HomeStripped />
    </div>
    <div class="col-sm-4" />
  </div>
  <div class="row">
    <div class="col-sm-8 home-swiper">Featured Galleries</div>
    <div class="col-sm-4">
      <a on:click={() => router.goto('/newGalleries')}>See All</a>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-12">
      <GalleryList count={10} />

    </div>
  </div>
</div>
