<script>
  import { onMount } from "svelte";
  import { Swipe, SwipeItem } from "svelte-swipe";
  import { router } from "tinro";

  import { db, publicstorage } from "../../firebase/firebase.js";
  var carouselData = [];
  var loading = true;
  let autoplay = true;
  let delay = 2000; //ms
  let showIndicators = false;
  let transitionDuration = 1000; //ms
  let defaultIndex = 0; //start from 0

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
  .swipe-holder {
    height: auto;
    width: 100%;
    overflow: auto;
  }
  img {
    /* width: 100%;
    height: 100%;
    object-fit: cover; */
  }

  .has-pointer-event {
    pointer-events: fill;
  }

  button,
  button:active {
    outline: none;
    border: none;
    padding: 0px;
    margin: 0px;
  }
</style>

{#if !loading}

  <div class="swipe-holder">
    <Swipe
      {showIndicators}
      {autoplay}
      {delay}
      {transitionDuration}
      {defaultIndex}>
      {#each carouselData as item}
        <SwipeItem>
          <button
            class="has-pointer-event"
            on:click={() => router.goto(`showGallery/${item.galleryId}`)}>
            <img src={item.src} alt="" />
          </button>

        </SwipeItem>
      {/each}

    </Swipe>
  </div>

  <!-- <Carousel images={carouselData} /> -->
{/if}
