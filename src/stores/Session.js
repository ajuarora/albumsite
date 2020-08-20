import { writable } from "svelte/store";

let session = writable({
  isAdmin: "false",
  loggedIn: false,
  userId: "",
  userName: "",
  token: "",
  galleryId: "",
});

export default session;
