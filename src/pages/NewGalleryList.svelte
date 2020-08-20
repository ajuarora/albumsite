<script>
  import GalleryList from "../components/gallery/GalleryList.svelte";
  let galleryMainImage =
    "https://firebasestorage.googleapis.com/v0/b/nnroopsee-public/o/galleries%2F91d740be-038e-477b-b6c6-3cbf81294e47%2Fpublic%2Fmainpic.jpg?alt=media&token=4d9a383d-4c7e-4016-aff7-faa694ef2802";
  let galleryOwner = "Some One";
  let gelleryTitle = "Test Title of gallery";
  let published = "";
</script>

<div class="wrapper">
  <GalleryList count={50} />
</div>
