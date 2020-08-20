<script lang="ts">
  import ImgCrop from "svelte-imgcrop";

  let img = "/images/profile/boydefault.jpg";

  function change(e) {
    console.log(e.detail);
  }
</script>

<ImgCrop src={img} width:500 height:200 on:change={change} />
