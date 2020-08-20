<script>
  import { Swiper, SwiperSlide } from "svelte-swiper";
  import { onMount } from "svelte";
  import { router } from "tinro";

  import { db, publicstorage } from "../../firebase/firebase.js";

  var carouselData = [];
  var loading = false;
  const options = {
    preventClicksPropagation: true,
    preventClicks: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    onClick: function(sw, e) {
      e.preventDefault();
      console.log(sw);
      alert("clickSlide");
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  };
  onMount(async () => {
    const snapshot = db
      .collection("carousel")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          var carouselItem = doc.data();
          publicstorage
            .ref()
            .child(`HomeCarousel/${carouselItem.image}`)
            .getDownloadURL()
            .then(function(url) {
              carouselItem.src = url;
              console.log(carouselItem);
              carouselData = [...carouselData, carouselItem];
              if (carouselData.length == 3) {
                loading = false;
              }
            });
        });
      });
  });
</script>

<style>
  .swiper-button-next {
    display: none;
  }
  .swiper-button-prev {
    display: none;
  }
  .display-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: hand;
  }
</style>

{#if !loading}

  <Swiper {options}>
    {#each carouselData as item}
      <SwiperSlide>
        //router.goto(`/showGallery/{item.galleryId}`)
        <a href={`/showGallery/${item.galleryId}`}>
          <!-- <button class="has-pointer-event"> -->
          <img src={item.src} class="display-image" alt="" />
          <!-- </button> -->
        </a>
      </SwiperSlide>
    {/each}

    <div class="swiper-pagination" slot="pagination" />
    <div class="swiper-button-next" slot="button-next" />
    <div class="swiper-button-prev" slot="button-prev" />
  </Swiper>
{/if}
