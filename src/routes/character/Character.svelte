<script lang="ts">
  import { localCharacter, getHnsCharacter } from '../../lib/stores'
  import { onMount } from 'svelte';
  import { Route, Router, navigate } from 'svelte-routing';
  import { NIL, validate } from 'uuid';
  import type { Writable } from 'svelte/store';
  import type { PlayerCharacter } from '../../lib/PlayerCharacter';
  import type { GetPropsParams } from 'svelte-routing/types/Link';
  import Build from './build/Build.svelte';
  import CharacterMenu from '../../lib/CharacterMenu.svelte';
  import Play from './play/Play.svelte';

  export let id: string = NIL;
  $: console.log( "id = '" + id + "'" )

  let character: Writable<PlayerCharacter>;
  $: character = id == "local" ? localCharacter : getHnsCharacter(id)

  onMount(async () => {
    if (window.location.pathname.endsWith(`/character/${id}`) || window.location.pathname.endsWith(`/character/${id}/`)) {
      console.log("redirecting to play view")
      navigate( `/character/${id}/play`, {replace:true} );
      return;
    }
    if (id !== "local" && !validate(id)) { 
      console.error( "Failed to load character with id '" + id + "'" );
      navigate( "/characters" );
      return;
    }
  });

  function getLinkProps( params: GetPropsParams ): Record<string, any> {
    let { location, href, isPartiallyCurrent, isCurrent } = params;
    if (isCurrent || isPartiallyCurrent) return { class: "active" };
    return { class: "" }
  }
</script>

<div id="character-page">
  <CharacterMenu bind:id={id} />

  <div id="character-page-content">
    {#if !character || $character == null}
      <h2>Loading...</h2>
    {:else}
      <Router>
        <Route path="/build/*"> <Build bind:id={id} bind:character={character}/> </Route>
        <Route path="/play/*"> <Play bind:id={id} bind:character={character}/> </Route>
      </Router>
    {/if}
  </div>
</div>

<style>

  #character-page {
    display: flex;
    flex-direction: row;
    justify-content: start;
    min-width: 100%;
    min-height: 100%;
    width: 100%;
  }

  #character-page-content {
    display: flex;
    flex-direction: column;
    width: auto;
    align-items: center;
    flex: 1 1 auto;
    overflow: scroll;
  }

  h2 { font-size: 18pt; margin-top: 6pt; margin-bottom: 2pt; }

</style>