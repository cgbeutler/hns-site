<script lang="ts">
  import { onMount } from 'svelte';
  import type { Writable } from 'svelte/store';
  import type { PlayerCharacter } from '../../../lib/Character/PlayerCharacter';
  import { Link, Route, Router } from 'svelte-routing'
  import Summary from './Summary.svelte';
  import Stats from './stats/Stats.svelte';
  import Feats from './feats/Feats.svelte';

  export let id: string;
  export let character: Writable<PlayerCharacter>;
  let error: string | undefined;
  onMount(async () => { error = !!character || $character == null ? undefined : `Failed to load character`; });
</script>

{#if error}
  <div class="sheet-block">
    <h2>Cannot Load Social Stats</h2>
    <p>Error: {error}</p>
  </div>
{:else if !character || $character == null}
  <div class="sheet-block">
    <h2>Loading...</h2>
  </div>
{:else}
  <Router>
    <Route path="/"> <Summary bind:id={id} bind:character={character}/> </Route>
    <Route path="/stats"> <Stats bind:character={character}/> </Route>
    <Route path="/feats"> <Feats bind:character={character}/> </Route>
  </Router>
{/if}

<style src="CharacterSheet.css">
.sheet-block {
  display: flex;
  text-align: left;
}

p[contenteditable] {
  margin: 0px 0px 0px 24px;
  flex-grow: 1;
  width: calc(100% - 34px);
  max-width: none;
  
  font-family: monospace;
  text-rendering: auto;
  color: fieldtext;
  letter-spacing: normal;
  word-spacing: normal;
  line-height: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  appearance: auto;
  -webkit-rtl-ordering: logical;
  resize: auto;
  cursor: text;
  white-space-collapse: preserve;
  text-wrap: wrap;
  overflow-wrap: break-word;
  background-color: field;
  column-count: initial !important;
  writing-mode: horizontal-tb !important;
  border-width: 1px;
  border-style: solid;
  border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
  border-image: initial;
  padding: 2px;
}
</style>