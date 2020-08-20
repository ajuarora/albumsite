<script>
  import Session from "../../stores/Session";
</script>

{#if $Session.loggedIn}
  <slot name="authed" />
{:else}
  <slot name="not_authed" />
{/if}
