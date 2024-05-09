<script lang="ts">
  import type { Writable } from 'svelte/store';
  import type { PlayerCharacter } from '../../../lib/Character/PlayerCharacter';

  export let id: string;
  export let character: Writable<PlayerCharacter>;
</script>

Summary goes here

<style>
</style>