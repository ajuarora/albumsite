<script>
  import Navbar from "./components/Navbar.svelte";
  import Session from "./stores/Session";
  import Toast from "./components/Toast.svelte";
  import { router } from "tinro";

  import { onMount } from "svelte";
  import { storage, auth, db } from "./firebase/firebase";

  onMount(async () => {});

  auth.onAuthStateChanged(user => {
    if (user) {
      $Session.loggedIn = true;
      $Session.userName = user.email;
      $Session.userId = user.uid;
      if (!user.defaultProfilePic) {
        storage
          .ref(`profilePics/${user.uid}/`)
          .child("profile.jpg")
          .getDownloadURL()
          .then(function(url) {
            console.log(url);
            $Session.profilePic = url;
          })
          .catch(function(err) {
            console.log(err);
            $Session.profilePic = "";
          });
      }
    } else {
      $Session.loggedIn = false;
      $Session.userName = "";
      $Session.profilePic = "";
    }
  });
</script>

<style>

</style>

<Navbar />
<Toast />
