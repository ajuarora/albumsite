<script>
  import Cropper from "svelte-easy-crop";
  import jimp from "jimp";
  import Icon from "fa-svelte";
  import { faPlusCircle } from "@fortawesome/free-solid-svg-icons/faPlusCircle";
  import { faMinusCircle } from "@fortawesome/free-solid-svg-icons/faMinusCircle";
  import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
  import Session from "../stores/Session";
  import { db, storage } from "../firebase/firebase";

  export let image;
  export let triggerSaveImage;
  let crop = { x: 0, y: 0 };
  let zoom = 1;
  let aspect = 3 / 3;
  let minZoom = 1;
  let maxZoom = 3;
  let showGrid = true;
  let cropShape = "rect";
  let cropSize = { width: 171, height: 171 };
  let userSelection;
  let isDirty = false;
  let isSubmitting = false;
  $: if (triggerSaveImage) saveImage();
  const saveImage = async () => {
    var corped;
    if (!isDirty) return;
    await jimp.read(image, (err, img) => {
      if (err) throw err;
      else {
        console.log(userSelection);
        console.log(cropSize);
        isSubmitting = true;
        img
          .crop(
            userSelection.pixels.x,
            userSelection.pixels.y,
            userSelection.pixels.width,
            userSelection.pixels.height
          )
          .quality(100)
          .getBase64(jimp.MIME_JPEG, function(err, src) {
            corped = src; //.replace(/^data:image\/[a-z]+;base64,/, "");
            jimp.read(corped, (err, img) => {
              if (err) throw err;
              else {
                img
                  .resize(171, 171, Jimp.RESIZE_BEZIER)
                  .quality(100)
                  .getBase64(jimp.MIME_JPEG, function(err, src) {
                    if (err) {
                      isSubmitting = true;
                      console.log(err);
                    }
                    var uploadTask = storage
                      .ref(`profilePics/${$Session.userId}/`)
                      .child("profile.jpg")
                      .putString(
                        src.replace(/^data:image\/[a-z]+;base64,/, ""),
                        "base64"
                      );
                    uploadTask.on(
                      "state_changed",
                      function(snapshot) {},
                      function(error) {
                        window.pushToast("Error uploading thumb images", false);
                        console.log(error);
                      },
                      function() {
                        isSubmitting = false;
                        isDirty = false;
                        db.collection("profile")
                          .doc($Session.userId)
                          .update({
                            profilePic: `profilePics/${$Session.userId}/profile.jpg`,
                            defaultProfilePic: false
                          })
                          .then(function() {
                            window.pushToast("Profile pic saved ", true);
                          })
                          .catch(function(error) {
                            console.log("Error writing document: " + error);
                            window.pushToast("Oops!!! " + error, false);
                          });
                      }
                    );
                  });
              }
            });
          });
      }
    });
    triggerSaveImage = false;
  };
</script>

<style>
  .dropdown .dropbtn {
    font-size: 14px;
    border: none;
    border-radius: 5px 5px 0px 0px;

    outline: none;
    /* color: blueviolet; */
    padding: 10px 10px;
    background-color: inherit;
    font-family: inherit;
    margin: 0;
  }

  .wrapper {
    position: relative;
    max-width: 100%;
    height: 100%;
    background-color: rgb(95, 95, 95);
    border: 0px none;
  }
</style>

<div class="wrapper">
  <Cropper
    {image}
    bind:crop
    bind:zoom
    bind:aspect
    bind:minZoom
    bind:maxZoom
    bind:cropShape
    bind:cropSize
    bind:showGrid
    on:cropcomplete={e => {
      userSelection = e.detail;
      isDirty = true;
    }} />
</div>
<div class="dropdown">
  <button
    class="dropbtn"
    on:click|preventDefault={e => {
      zoom > 0.5 ? (zoom -= 0.25) : (zoom = zoom);
    }}>
    <i class="fa fa-minus-circle" />
    <Icon icon={faMinusCircle} />
  </button>
  <button class="dropbtn" on:click|preventDefault={saveImage}>
    <i class="fa fa-save" />
    <Icon icon={faSave} />
  </button>
  <button
    class="dropbtn"
    disabled={isSubmitting}
    on:click|preventDefault={() => (zoom < 5 ? (zoom += 0.25) : (zoom = zoom))}>
    <i class="fa fa-plus-circle" />
    <Icon icon={faPlusCircle} />
  </button>

</div>
