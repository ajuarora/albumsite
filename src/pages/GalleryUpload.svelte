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

<div class="container">
  <div class="row">
    <div class="col-sm-12 col-md-6 col-lg-4">
      <p>Step 1. Provide gallery details</p>
      <UploadGalleryDetails on:setImageUpload={setImageUpload} />
    </div>

    <div class="col-sm-12 col-md-6 col-lg-8">
      {#if showImageUpload}
        <p>Step 2. Upload images</p>
        <UploadGalleryImages />
      {/if}

    </div>
  </div>
</div>
