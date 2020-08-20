<script>
  import { Swiper, SwiperSlide } from "svelte-swiper";

  export let carouselData = [];
  //   export let index = 0;

  const options = {
    // preventClicksPropagation: true,
    // preventClicks: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  };
</script>

<style>
  /* .swiper-button-next {
    display: none;
  }
  .swiper-button-prev {
    display: none;
  } */
  .display-image {
    object-fit: contain;
    cursor: hand;
  }
</style>

<Swiper {options}>
  {#each carouselData as item}
    <SwiperSlide>
      <img src={item.src} class="display-image" alt="" />
    </SwiperSlide>
  {/each}

  <div class="swiper-pagination" slot="pagination" />
  <div class="swiper-button-next" slot="button-next" />
  <div class="swiper-button-prev" slot="button-prev" />
</Swiper>
