<script>
  export let header;
</script>

<style>
  /* .wrapper {
    max-width: 600px;
    margin: 0 auto;
    padding: 0 5px;
  } */

  .content {
    display: grid;
    grid-template-columns: repeat(3, minmax(200px, 1fr));
    grid-gap: 10px 10px;
  }

  h1 {
    font-size: 18px;
  }
  /* 
  @media screen and (min-width: 375px) {
    .content {
      grid-template-columns: repeat(2, minmax(100px, 1fr));
    }
  }

  @media screen and (min-width: 600px) {
    .content {
      grid-template-columns: repeat(2, minmax(100px, 1fr));
    }
  }

  @media screen and (min-width: 768px) {
    .content {
      grid-template-columns: repeat(2, minmax(100px, 1fr));
    }
  }

  @media screen and (min-width: 1024px) {
    .content {
      grid-template-columns: repeat(3, minmax(100px, 1fr));
    }
  } */
</style>

<div>
  <h1>{header}</h1>
  <div class="content">
    <slot />
  </div>
</div>
