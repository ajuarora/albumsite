<script>
  import UploadGalleryDetails from "../components/UploadGalleryDetails.svelte";
  import UploadGalleryImages from "../components/UploadGalleryImages.svelte";
  import Session from "../stores/Session";
  import { onMount } from "svelte";
  import { v4 as uuidv4 } from "uuid";

  export let galleryId;
  let showImageUpload = false;
  onMount(async () => {
    if (!galleryId) {
      galleryId = uuidv4();
    }
    $Session.galleryId = galleryId;
  });
  console.log($Session.galleryId);

  const setImageUpload = value => {
    showImageUpload = value;
  };
</script>

<style>
  .pageContainer {
    display: grid;
    grid-template-columns: repeat(2, 600px);
    grid-gap: 1em;
  }

  @media screen and (max-width: 600px) {
    .content {
      grid-template-columns: repeat(1, 600px);
    }
  }
</style>

<div class=" pageContainer content wrapper">
  <div>
    <p>Step 1. Provide gallery details</p>
    <UploadGalleryDetails on:setImageUpload={setImageUpload} />
  </div>
  <div>
    {#if showImageUpload}
      <p>Step 2. Upload images</p>
      <UploadGalleryImages />
    {/if}

  </div>
</div>
