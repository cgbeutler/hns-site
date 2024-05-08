<script lang="ts">
  import { Link, Route, Router } from 'svelte-routing';
  import type { GetPropsParams } from 'svelte-routing/types/Link';
  import { NIL } from 'uuid';
  import type { PlayerCharacter } from './PlayerCharacter';
  import type { Writable } from 'svelte/store';
  import { getHnsCharacter, localCharacter } from './stores';
  
  export let id: string = NIL;
  $: console.log( "id = '" + id + "'" )

  let character: Writable<PlayerCharacter>;
  $: character = id == "local" ? localCharacter : getHnsCharacter(id)
  
  let expanded = false;

  function getLinkProps( params: GetPropsParams ): Record<string, any> {
    let { location, href, isPartiallyCurrent, isCurrent } = params;
    if (isCurrent || isPartiallyCurrent) return { class: "active" };
    return { class: "" }
  }
  function getSubLinkProps( params: GetPropsParams ): Record<string, any> {
    let { location, href, isPartiallyCurrent, isCurrent } = params;
    if (isCurrent) return { class: "active" };
    return { class: "" }
  }

</script>

<div class="contents" class:slim={!expanded}>
  <nav id="character-menu">
    <div class="toggle-bg-v slim" style="margin-bottom:12px;">
      <button on:click={() => expanded = !expanded}>{expanded ? "<" : ">"}</button>
    </div>

    <div class="toggle-bg-v" class:slim={!expanded} style="margin-bottom:12px;">
      <Link to="/character/{id}/build" getProps={getLinkProps}><img src="/img/icons/HammerIcon.svg"/>{#if expanded}&nbsp;Build{/if}</Link>
      <Link to="/character/{id}/play" getProps={getLinkProps}><img src="/img/icons/SwordIcon30.svg"/>{#if expanded}&nbsp;Play{/if}</Link>
    </div>
    
    <Router>
      <Route path="/build/*">
        <div class="toggle-bg-v" class:slim={!expanded}>
          <Link to="/character/{id}/build" getProps={getSubLinkProps}>Summary</Link>
          <Link to="/character/{id}/build/stats" getProps={getSubLinkProps}>Stats</Link>
          <Link to="/character/{id}/build/archetype" getProps={getSubLinkProps}>Archetype</Link>
          <Link to="/character/{id}/build/background" getProps={getSubLinkProps}>Background</Link>
        </div>
      </Route>
      <Route path="/play/*">
        <div class="toggle-bg-v" class:slim={!expanded}>
          <Link to="/character/{id}/play" getProps={getSubLinkProps}><img src="/img/icons/HeartIcon.svg"/>{#if expanded}&nbsp;Status{/if}</Link>
          <Link to="/character/{id}/play/social" getProps={getSubLinkProps}><img src="/img/icons/SocialIcon.svg"/>{#if expanded}&nbsp;Social{/if}</Link>
          <Link to="/character/{id}/play/exploration" getProps={getSubLinkProps}><img src="/img/icons/MapIcon.svg"/>{#if expanded}&nbsp;Exploration{/if}</Link>
          <Link to="/character/{id}/play/skills" getProps={getSubLinkProps}>Actions</Link>
          <Link to="/character/{id}/play/inventory" getProps={getSubLinkProps}>Inventory</Link>
        </div>
      </Route>
    </Router>
  </nav>
</div>

<style>
  #character-menu {
    min-width: 50px;
  }

  .contents {
    display: flex;
    position: sticky;
    top: 0;
    float: top;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
    pointer-events: auto;
    background-color: black;
    height: 100vh;
    min-height: 100vh;
    max-height: 100vh;
    max-width: 30vw;
    padding: 0px;
    border-left: 2px solid;
    border-color: rgb(44, 44, 44);
  }
  .contents.slim {
    min-width: 50px;
    max-width: 50px;
    width: 50px;
  }
  .toggle-bg img {
    display: inline-block;
    width: 1.5em;
    height: 1.5em;
  }

  .title {
    text-align: center;
    margin: -15px 0px 10px 0px;
    padding: 0;
  }

</style>
