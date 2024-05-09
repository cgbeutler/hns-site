<script lang="ts">
  import { onMount } from 'svelte';
  import type { Writable } from 'svelte/store';
  import type { PlayerCharacter } from '../../../lib/Character/PlayerCharacter';
  import { Route, Router } from 'svelte-routing';
  import Social from './social/Social.svelte';
  import Exploration from './exploration/Exploration.svelte';
  import Summary from './Summary.svelte';

  export let id: string;
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

  <div class="sheet-block" style="display: flex; flex-direction: row; flex-wrap: nowrap; flex-grow: 1;">
    <div style="display:flex; flex-direction: column;">
      <p id="name-label">{$character.name && $character.name.length>0 ? $character.name : "Unnamed Character"}</p>
    </div>
    <div>
      HP Display
    </div>
  </div>

  <Router>
    <Route path="/"> <Summary bind:id={id} bind:character={character}/> </Route>
    <Route path="/social"> <Social bind:character={character}/> </Route>
    <Route path="/exploration"> <Exploration bind:character={character}/> </Route>
  </Router>
{/if}

<style>
</style>