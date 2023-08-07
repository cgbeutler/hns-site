<script lang="ts">
  import Link from "../lib/Link.svelte";
  import ExternalNav from "../lib/ExternalNav.svelte";

  export let location;
  $: console.log(location);
</script>


<div class="page">
  <h1>Hammer and Steel</h1>

  <p>
    Try out my fancy <Link to="dice">Dice Roller</Link>!
  </p>
</div>

<ExternalNav></ExternalNav>

<style>
</style>