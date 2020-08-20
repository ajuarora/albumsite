<script>
  import FileUpload from "sveltefileuploadcomponent";
  import CustomGrid from "../components/CustomGrid.svelte";
  import * as faceapi from "face-api.js";
  import { onMount } from "svelte";

  const MODEL_URL = "/models";

  onMount(async () => {
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
    await faceapi.loadFaceLandmarkModel(MODEL_URL);
    await faceapi.loadFaceRecognitionModel(MODEL_URL);
  });

  let files = [];
  let header = "";
  var needToSetImage = files.length == 0;
  let setMainImageName = "";
  import UploadImage from "../components/UploadImage.svelte";
  const handleUploads = uploadedFiles => {
    var addedFiles = [];
    var found = false;
    uploadedFiles.detail.files.forEach(file => {
      found = false;
      files.forEach(a => {
        if (a.name == file.name) {
          found = true;
        }
      });
      if (!found) {
        addedFiles.push(file);
        if (needToSetImage) {
          needToSetImage = false;
          setMainImageName = file.name;
        }
      }
    });
    files = [...files, ...addedFiles];
  };
</script>

<style>
  .divbutton {
    margin: 30px;
  }
  .imageGrid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
</style>

<FileUpload multiple={true} on:input={handleUploads}>
  <div class="button divbutton">Click to upload photos</div>
</FileUpload>

<!-- <CustomGrid {header}> -->
<div class="imageGrid">
  {#each files as file}
    <UploadImage {file} {setMainImageName} {faceapi} />
  {/each}
</div>
<!-- </CustomGrid> -->
