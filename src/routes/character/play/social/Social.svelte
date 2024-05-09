<script lang="ts">
  import { onMount } from 'svelte';
  import type { Writable } from 'svelte/store';
  import type { PlayerCharacter } from '../../../../lib/Character/PlayerCharacter';
  import SocialSkills from './SocialSkills.svelte';

  export let character: Writable<PlayerCharacter>;
  let error: string | undefined;

  onMount(async () => { error = !!character || $character == null ? undefined : `Failed to load character`; });
</script>

{#if error}
  <div class="sheet-block">{error}</div>
{:else if !character || $character == null}
  <div class="page">
    <h2>Loading...</h2>
  </div>
{:else}
  <SocialSkills bind:character={character} />

  Social Feat/Abilities Here.
{/if}

<style>
</style>