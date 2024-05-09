<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { PlayerCharacter } from "../../../../lib/Character/PlayerCharacter";
  
  export let character: Writable<PlayerCharacter>;
</script>

<div class="sheet-block-v align-left">
  <h2>Background</h2>
  Constitution, Class, and Lineage<br>selection here?
</div>