<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { PlayerCharacter } from "../../../../lib/Character/PlayerCharacter";
  
  export let character: Writable<PlayerCharacter>;
</script>