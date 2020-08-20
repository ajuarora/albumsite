<script>
  let src = "images/login/login.jpg";
  export let mode = "Login";
  import LoginComponent from "../components/LoginComponent.svelte";
  import RegisterComponent from "../components/RegisterComponent.svelte";

  const setMode = value => {
    mode = value;
  };
  let showModal = false;
</script>

<style>
  .page-container {
    position: fixed;
    left: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-radius: 0px;
    background-color: rgb(65, 65, 65);
    background-repeat: no-repeat;
    opacity: 0.85;

    height: 100%;
    width: 100%;
    background-image: url("../images/login/login.jpg");
  }
</style>

<div class="page-container">
  <div>

    {#if mode == 'Login'}
      <LoginComponent />
    {:else}
      <RegisterComponent />
    {/if}

  </div>
</div>
