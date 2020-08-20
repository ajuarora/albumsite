<script>
  import Session from "../stores/Session";
  import { auth } from "../firebase/firebase";

  //   import Home from "../pages/Home.svelte";
  import Login from "../pages/Login.svelte";
  // import UploadGallery from "../pages/UploadGallery.svelte";
  import GalleryUpload from "../pages/GalleryUpload.svelte";
  import NewGalleryList from "../pages/NewGalleryList.svelte";

  import MyProfile from "../pages/MyProfile.svelte";
  import ShowGallery from "../pages/ShowGallery.svelte";
  import Home from "../pages/Home.svelte";
  import AuthGuard from "./auth/AuthGuard.svelte";

  let responsive = false;
  let toggle = true;
  /* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
  function closeExpanded() {
    responsive = !responsive;
  }

  import Icon from "fa-svelte";
  import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
  import { Route } from "tinro";

  let icon = faCaretDown;

  const sveltelogo = "/images/svelte-logo.svg";

  const logout = event => {
    event.preventDefault();
    auth
      .signOut()
      .then(response => {
        console.log("user Logged out");
      })
      .catch(err => console.log("user logged out"));
  };
  var galleryId;
</script>

<style>
  /* Add a black background color to the top navigation */
  .topnav {
    background-color: #36005e;

    overflow: hidden;
  }
  .toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .svelte-logo {
    width: 200px;
    /* margin-top: 5px; */
  }
  /* Style the links inside the navigation bar */
  .topnav a {
    float: left;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 10px 10px;
    text-decoration: none;
    font-size: 14px;
  }

  /* Hide the link that should open and close the topnav on small screens */
  .topnav .icon {
    display: none;
    float: right;
  }

  /* Dropdown container - needed to position the dropdown content */
  .dropdown {
    float: left;
    overflow: hidden;
  }

  /* Style the dropdown button to fit inside the topnav */
  .dropdown .dropbtn {
    font-size: 14px;
    border: none;
    border-radius: 5px 5px 0px 0px;

    outline: none;
    color: white;
    padding: 10px 10px;
    background-color: inherit;
    font-family: inherit;
    margin: 0;
  }

  /* Style the dropdown content (hidden by default) */
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #36005e;
    border-radius: 0px 5px 5px 5px;

    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  /* Style the links inside the dropdown */
  .dropdown-content a {
    float: none;
    color: white;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
  }

  /* Add a dark background on topnav links and the dropdown button on hover */
  .topnav a:hover,
  .dropdown:hover .dropbtn {
    background-color: #36005e;
    color: white;
  }

  /* Add a grey background to dropdown links on hover */
  .dropdown-content a:hover {
    background-color: rgb(147, 112, 219);
    border-radius: 0px 5px 5px 5px;
    color: white;
  }

  /* Show the dropdown menu when the user moves the mouse over the dropdown button */
  .dropdown:hover .dropdown-content {
    display: block;
  }

  /* When the screen is less than 600 pixels wide, hide all links, except for the first one ("Home"). Show the link that contains should open and close the topnav (.icon) */
  @media screen and (max-width: 768px) {
    .topnav a:not(:first-child),
    .dropdown .dropbtn {
      display: none;
    }
    .topnav a.icon {
      float: right;
      display: block;
    }
  }

  /* The "responsive" class is added to the topnav with JavaScript when the user clicks on the icon. This class makes the topnav look good on small screens (display the links vertically instead of horizontally) */
  @media screen and (max-width: 768px) {
    .topnav.responsive {
      position: relative;
    }
    .topnav.responsive a.icon {
      position: absolute;
      right: 0;
      top: 0;
    }
    .topnav.responsive a {
      float: none;
      display: block;
      text-align: left;
    }
    .topnav.responsive .dropdown {
      float: none;
    }
    .topnav.responsive .dropdown-content {
      position: relative;
    }
    .topnav.responsive .dropdown .dropbtn {
      display: block;
      width: 100%;
      text-align: left;
    }
    .topnav.toggle {
      display: block;
      align-items: center;
    }
  }
  .avatar {
    vertical-align: middle;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    text-align: center;
  }
</style>

<div class="topnav" class:toggle class:responsive id="myTopnav">
  <!-- content here -->

  <a href="/">
    <img class="svelte-logo" src={sveltelogo} alt="" />
  </a>
  <!-- content here -->
  <div style="display:block">
    <div />
    {#if $Session.loggedIn}
      <div class="dropdown">
        <button class="dropbtn">
          Dashboard
          <i class="fa fa-caret-down" />
          <Icon icon={faCaretDown} />
        </button>
        <div on:click={closeExpanded} class="dropdown-content">
          <a href="/myProfile">My Profile</a>
          <a href="#">Inbox</a>
          <a href="#">Manage Galleries</a>
          <a href="/uploadGallery">Upload Gallery</a>
        </div>
      </div>
      <div class="dropdown">
        <button class="dropbtn">
          Galleries
          <!-- <i class="fa fa-caret-down" /> -->
          <Icon icon={faCaretDown} />
        </button>
        <div on:click={closeExpanded} class="dropdown-content">
          <a href="/newGalleries">New Galleries</a>

        </div>
      </div>

      <div class="dropdown">
        <button class="dropbtn">
          Community
          <i class="fa fa-caret-down" />
          <Icon icon={faCaretDown} />
        </button>
        <div on:click={closeExpanded} class="dropdown-content">
          <a href="/login">Members</a>
        </div>
      </div>
    {/if}

  </div>
  <div style=" margin-right: 100px; ">
    <div />
    {#if !$Session.loggedIn}
      <a href="/login/register">Register</a>
      <a href="/login">Login</a>
    {:else}
      <!-- <img src="/images/profile/girldefault.jpg" alt="Avatar" class="avatar" /> -->

      <a href="/myProfile">
        {#if $Session.profilePic}
          <img src={$Session.profilePic} alt="Avatar" class="avatar" />
        {/if}
        {`Hi ${$Session.userName}`}
      </a>
      <a href="#" on:click={logout}>Logout</a>
    {/if}

  </div>

  <a href="javascript:void(0);" class="icon" on:click={closeExpanded}>
    &#9776;
  </a>

</div>

<Route path="/login">
  <Login mode="Login" />
</Route>
<Route path="/login/register">
  <Login mode="Register" />
</Route>
<Route path="/">
  <Home />
</Route>
<AuthGuard>

  <div slot="authed">
    <Route path="/uploadGallery">
      <GalleryUpload {galleryId} />
    </Route>
    <Route path="/myProfile">
      <MyProfile />
    </Route>

    <Route path="/showGallery/:galleryId">
      <ShowGallery />
    </Route>

    <Route path="/newGalleries">
      <NewGalleryList />
    </Route>
  </div>
</AuthGuard>
<AuthGuard>

  <div slot="not_authed">
    <Route path="/uploadGallery" redirect="/login" />

    <Route path="/myProfile" redirect="/login" />

    <Route path="/showGallery/:galleryId" redirect="/login" />

    <Route path="/newGalleries" redirect="/login" />
    <Route path="/login">
      <Login mode="Login" />
    </Route>
  </div>
</AuthGuard>
