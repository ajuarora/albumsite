<script>
  import { writable } from "svelte/store";
  import Session from "../stores/Session";
  import { storage, db, publicstorage } from "../firebase/firebase";
  import { onMount } from "svelte";
  import jimp from "jimp";
  import Icon from "fa-svelte";
  import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
  import { Circle2 } from "svelte-loading-spinners";

  export let file;
  export let setMainImageName;
  let src;
  export let faceapi;
  let loading = true;
  const MODEL_URL = "/models";
  onMount(async () => {
    var img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    console.log("Loading file " + file.name);
    let fullFaceDescriptions = await faceapi
      .detectAllFaces(img)
      .withFaceLandmarks()
      .withFaceDescriptors();
    // fullFaceDescriptions = faceapi.resizeResults(fullFaceDescriptions);
    let startX = 0;
    let startY = 0;
    let maxEdge = img.width > img.height ? img.height : img.width;
    let delta = Math.abs(img.width - img.height);
    if (fullFaceDescriptions.length > 0) {
      let centerX =
        fullFaceDescriptions[0].detection._box._x +
        fullFaceDescriptions[0].detection._box._width / 2;

      let centerY =
        fullFaceDescriptions[0].detection._box._y +
        fullFaceDescriptions[0].detection._box._height / 2;
      if (img.width > img.height) {
        if (centerX > img.width / 2) {
          startX = delta;
        }
      } else {
        if (centerY > img.height / 2) {
          startX = delta;
        }
      }
    }
    const image = await jimp.read(URL.createObjectURL(file));
    image
      .crop(startX, startY, maxEdge, maxEdge)
      .quality(100)
      .getBase64(jimp.MIME_JPEG, function(err, srcCreated) {
        // src = srcCreated;
        let imageBuffer = Buffer.from(
          srcCreated.replace(/^data:image\/[a-z]+;base64,/, ""),
          "base64"
        );

        Jimp.read(imageBuffer, function(err, tn) {
          if (err) {
            console.log(err);
          }
          tn.cover(
            150,
            150,
            Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
          )
            .quality(100)
            .getBase64(jimp.MIME_JPEG, function(err, srcCreated) {
              src = srcCreated;
              storage
                .ref(`galleries/${$Session.galleryId}/th/`)
                .child(file.name)
                .putString(
                  src.replace(/^data:image\/[a-z]+;base64,/, ""),
                  "base64"
                )
                .then(response => {
                  console.log("DONE Loading..." + file.name);

                  if (setMainImageName == file.name) {
                    setMainImageForGallery(setMainImageName);
                    window.pushToast("Gallery Images saved!", true);
                  }
                  storage
                    .ref(`galleries/${$Session.galleryId}/` + file.name)
                    .put(file)
                    .then(() => {
                      loading = false;
                    })
                    .catch(err => {});
                });
            });
        });
      });
  });

  function setMainImageForGallery(imageName) {
    db.collection("galleries")
      .doc($Session.galleryId)
      .update({
        galleryPhoto: imageName
      });
    publicstorage
      .ref(`galleries/${$Session.galleryId}/public/`)
      .child("mainpic.jpg")
      .putString(src.replace(/^data:image\/[a-z]+;base64,/, ""), "base64")
      .then(response => {})
      .catch(error => {
        window.pushToast("Error setting gallery main  image", false);
        console.log(error);
      });
  }
  const deleteImage = () => {};
</script>

<style>
  /* Add some padding inside the card container */
  .loadingFile {
    display: flex;
    width: 191px;
    height: 191px;
    align-items: center;
    justify-content: center;
  }
  .actionButton {
    display: flex;
    justify-content: space-between;
  }
  .image {
    width: 191px;
  }
  button {
    border: none;
    vertical-align: middle;
    background-color: inherit;
  }
  button:focus {
    border: none;
  }

  label {
    font-size: x-small;
    vertical-align: middle;
    display: inline-block;
  }
  input[type="radio"] {
    margin-top: -1px;
    vertical-align: middle;
  }
</style>

<div class="card image">
  {#if loading}
    <div class="loadingFile">
      <Circle2 size="60" unit="px" />
    </div>
  {:else}
    <img {src} alt="" class="section media" />
  {/if}

  <div class="section actionButton">
    {#if !loading}
      <label for="usethis">

        <input
          type="radio"
          id="usethis"
          name="gender"
          checked={setMainImageName == file.name}
          on:click={e => setMainImageForGallery(file.name)}
          value={file.name} />
        Main picture
      </label>
      <button on:clicked={deleteImage} class="trash">
        <Icon icon={faTrash} />
      </button>
    {/if}

  </div>
</div>
