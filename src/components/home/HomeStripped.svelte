<script>
  import { Swipeable, Preload, Screen, Controls } from "buhrmi";
  import { onMount } from "svelte";
  import { Swipe, SwipeItem } from "svelte-swipe";
  import { router } from "tinro";
  import { db, publicstorage } from "../../firebase/firebase.js";

  let loading = true;

  var carouselData = [];

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
              carouselItem.url = url;
              carouselData = [...carouselData, carouselItem];
              if (carouselData.length == 3) {
                loading = false;
              }
            });
        });
      });
  });
  let current = 1;
</script>

<style>
  .images {
    width: 100%;
    height: 100%;
    perspective: 800px;
    transform: translateZ(-100px);
    transform-style: preserve-3d;
  }
  .container {
    position: relative;
    padding-top: 60%;
    width: 100%;
    height: auto;
    user-select: none;
    overflow: hidden;
  }
  .container :global(.swipeable) {
    position: absolute;
    top: 0;
    left: 0;
  }
  .img {
    background-size: cover;
    background-position: center;
    height: 100%;
    width: 100%;
    cursor: hand;
  }
</style>

<div class="container">
  <Swipeable>
    <div class="images">
      {#each carouselData as image}
        <Screen>
          <Preload url={image.url} let:src>
            <a
              href="#"
              on:click={() => router.goto(`showGallery/${image.galleryId}`)}>
              <div class="img" style="background-image: url({src})" />
            </a>
          </Preload>
        </Screen>
      {/each}
    </div>
    <Controls />
  </Swipeable>
</div>
