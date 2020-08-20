<script>

</script>

<style>
  .content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    grid-gap: 5px; /* align-items: flex-start; */
  }

  @media screen and (min-width: 375px) {
    .content {
      grid-template-columns: repeat(3, minmax(100px, 1fr));
    }
  }

  @media screen and (min-width: 600px) {
    .content {
      grid-template-columns: repeat(4, minmax(100px, 1fr));
    }
  }

  @media screen and (min-width: 768px) {
    .content {
      grid-template-columns: repeat(5, minmax(100px, 1fr));
    }

    h1 {
      font-size: 42px;
    }
  }

  @media screen and (min-width: 1024px) {
    .content {
      grid-template-columns: repeat(6, minmax(100px, 1fr));
    }
  }
</style>

<!-- <div class="wrapper"> -->
<div class="content">
  <slot />
</div>
<!-- </div> -->
