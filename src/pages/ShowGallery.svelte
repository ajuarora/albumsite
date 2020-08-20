<script>
  import GalleryTitle from "../components/showGallery/GalleryTitle.svelte";
  import GalleryIntroduction from "../components/showGallery/GalleryIntroduction.svelte";
  import GalleryGrid from "../components/showGallery/GalleryGrid.svelte";
  import GalleryImage from "../components/showGallery/GalleryImage.svelte";
  import GalleryandCarousel from "../components/showGallery/GalleryandCarousel.svelte";
  import PhotoModal from "../components/showGallery/PhotoModal.svelte";
  import { Modal, Button, Card } from "svelte-chota";

  import { router } from "tinro";

  import { storage, db, publicstorage } from "../firebase/firebase";
  import { onMount } from "svelte";
  let params = router.params();
  let open = false;

  let galleryId = params.galleryId;

  let loading = true;
  let imageList = [];
  let galleryTitle;
  let memberName;
  let introduction;
  // Now we get the references of these images
  onMount(async () => {
    var galleryRef = db.collection("galleries").doc(galleryId);

    galleryRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          var data = doc.data();
          galleryTitle = data.title.toString();
          introduction = data.introduction.toString();
          var ownerRef = db.collection("profile").doc(data.owner);
          ownerRef.get().then(owner => {
            memberName = owner.data().screenName.toString();
            console.log(memberName);
          });
          var storageRef = storage.ref(`galleries/${galleryId}/th`);
          storageRef
            .listAll()
            .then(function(result) {
              result.items.forEach(function(imageRef) {
                // And finally display them
                displayImage(imageRef);
              });
              loading = false;
            })
            .catch(function(error) {
              // Handle any errors
            });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });

    function displayImage(imageRef) {
      imageRef
        .getDownloadURL()
        .then(function(url) {
          var img = {};
          img.thumbnail = url;
          img.name = imageRef.location.path_.replace("/th/", "/");
          storage
            .ref()
            .child(img.name)
            .getDownloadURL()
            .then(function(url) {
              img.src = url;
              imageList = [...imageList, img];
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(function(error) {
          // Handle any errors
        });
    }
  });
</script>

<style>
  .title {
    background-color: #ccc;
    margin: 0;
    padding: 10px;
    font-weight: 500;
  }
</style>

{#if !loading}

  <div class="container title">
    <div class="row ">
      <div class="col-sm-1" />
      <div class="col-sm-11">
        <GalleryTitle {galleryTitle} {memberName} />
      </div>
    </div>
  </div>
  <div class="wrapper">
    <div class="row">
      <div class="col-sm-6 col-md-9">
        <GalleryIntroduction {introduction} />
      </div>
      <div class="col-sm-6 col-md-3" />
    </div>

    <div class="row">
      <div class="col-sm-12">
        <GalleryandCarousel images={imageList} />
      </div>
    </div>

  </div>

  <!-- content here -->
{/if}
