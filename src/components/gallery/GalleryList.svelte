<script>
  import { onMount } from "svelte";
  import { db, publicstorage } from "../../firebase/firebase.js";
  import GalleryListItem from "./GalleryListItem.svelte";
  import Grid from "./Grid.svelte";

  export let count;
  let galleriesData = [];
  let loading = true;
  let galleryItem;

  onMount(async () => {
    const snapshot = db
      .collection("galleries")
      .orderBy("created", "desc")
      // .orderBy(db.FieldPath.documentId())
      .limit(count)
      .get()
      .then(snapshot => {
        let snapshotSize = snapshot.size;

        snapshot.forEach(doc => {
          console.log();
          var galleryItem = doc.data();

          publicstorage
            .ref()
            .child(`galleries/${doc.id}/public/mainpic.jpg`)
            .getDownloadURL()
            .then(function(url) {
              galleryItem.galleryMainImage = url;
              galleryItem.id = doc.id;

              // get user name
              db.collection("profile")
                .doc(galleryItem.owner)
                .get()
                .then(profile => {
                  galleryItem.contributor = profile.data().screenName;
                  //   console.log(profile);
                  galleriesData = [...galleriesData, galleryItem];

                  if (galleriesData.length == snapshotSize) {
                    loading = false;
                  }
                });
            });
        });
      });
  });
</script>

{#if !loading}
  <Grid>

    {#each galleriesData as gallery}
      <GalleryListItem
        galleryMainImage={gallery.galleryMainImage}
        galleryTitle={gallery.title}
        galleryOwner={gallery.contributor}
        galleryId={gallery.id}
        galleryCreated={gallery.created} />
    {/each}
  </Grid>
{/if}
