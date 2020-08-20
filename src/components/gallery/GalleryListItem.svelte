<script>
  import moment from "moment";
  export let galleryMainImage = "";
  export let galleryOwner = "";
  export let galleryTitle = "";
  export let galleryCreated;
  export let galleryId;
  let created = moment.utc(galleryCreated);
</script>

<style>
  @media screen and (min-width: 300px) {
    .small {
      width: 150px;
      /* height: 150px; */
    }
  }
  @media screen and (min-width: 375px) {
    .small {
      width: 200px;
      /* height: 150px; */
    }
  }
  /* .small {
    width: 200px;
    height: 150px;
  } */
  .section {
    background-color: #555;
    color: white;
    border: none;
    padding-left: 10px;
    padding-top: 0px;
    padding-bottom: 0px;
  }
  .Owner {
    font-size: small;
    text-transform: uppercase;
    letter-spacing: 0px;
  }
  .title {
    font-size: x-small;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .published {
    padding-top: 5px;
    padding-bottom: 5px;
    color: #aaa;
    font-size: x-small;
    text-transform: uppercase;
  }
</style>

<a href={`/showGallery/${galleryId}`}>

  <div class="card small">
    <img src={galleryMainImage} alt="gallery Image" class="section media" />
    <div class="section Owner">{galleryOwner}</div>
    <div class="section title">{galleryTitle}</div>
    <div class="section published">
      {moment.duration(created.diff(moment.utc())).humanize(true)}
    </div>

  </div>
</a>
