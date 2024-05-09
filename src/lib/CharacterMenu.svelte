<script lang="ts">
  import { Link, Route, Router } from 'svelte-routing';
  import type { GetPropsParams } from './Helpers/SvelteRoutingTypes';
  import { NIL } from 'uuid';
  
  export let id: string = NIL;
  $: console.log( "id = '" + id + "'" )

  let expanded = false;

  function getLinkProps( p: GetPropsParams ): Record<string, any> {
    if (p.isCurrent || p.isPartiallyCurrent) return { class: "active" };
    return { class: "" }
  }
  function getSubLinkProps( p: GetPropsParams ): Record<string, any> {
    return p.isCurrent ? { class: "active" } : { class: "" };
  }

</script>

<div class="contents" class:slim={!expanded}>
  <nav id="character-menu">
    <div class="toggle-bg-v slim" style="margin-bottom:12px;">
      <button on:click={() => expanded = !expanded}><img class="expand-icon" class:rotated={expanded} src="/img/icons/ExpandRightIcon.svg" alt={expanded?"Collapse":"Expand"}/></button>
    </div>

    <div class="toggle-bg-v" class:slim={!expanded} style="margin-bottom:12px;">
      <Link to="/character/{id}/build" getProps={getLinkProps}><img src="/img/icons/HammerIcon.svg" alt={expanded?"":"Build"}/>{#if expanded}&nbsp;Build{/if}</Link>
      <Link to="/character/{id}/play" getProps={getLinkProps}><img src="/img/icons/SwordIcon30.svg" alt={expanded?"":"Play"}/>{#if expanded}&nbsp;Play{/if}</Link>
    </div>
    
    <Router>
      <Route path="/build/*">
        <div class="toggle-bg-v" class:slim={!expanded}>
          <Link to="/character/{id}/build" getProps={getSubLinkProps}><img src="/img/icons/PromotionIcon.svg" alt={expanded?"":"Level"}/>{#if expanded}&nbsp;Level{/if}</Link>
          <Link to="/character/{id}/build/stats" getProps={getSubLinkProps}><img src="/img/icons/PlusPlusIcon.svg" alt={expanded?"":"Stats & Skills"}/>{#if expanded}&nbsp;Stats & Skills{/if}</Link>
          <Link to="/character/{id}/build/feats" getProps={getSubLinkProps}><img src="/img/icons/StarIcon.svg" alt={expanded?"":"Feats"}/>{#if expanded}&nbsp;Feats{/if}</Link>
          <Link to="/character/{id}/build/abilities" getProps={getSubLinkProps}><img src="/img/icons/AbilitiesIcon.svg" alt={expanded?"":"Abilities"}/>{#if expanded}&nbsp;Abilities{/if}</Link>
          <Link to="/character/{id}/build/persona" getProps={getSubLinkProps}><img src="/img/icons/PersonaIcon.svg" alt={expanded?"":"Persona"}/>{#if expanded}&nbsp;Persona{/if}</Link>
        </div>
      </Route>
      <Route path="/play/*">
        <div class="toggle-bg-v" class:slim={!expanded}>
          <Link to="/character/{id}/play" getProps={getSubLinkProps}><img src="/img/icons/HeartIcon.svg" alt={expanded?"":"Status"}/>{#if expanded}&nbsp;Status{/if}</Link>
          <Link to="/character/{id}/play/social" getProps={getSubLinkProps}><img src="/img/icons/SocialIcon.svg" alt={expanded?"":"Social"}/>{#if expanded}&nbsp;Social{/if}</Link>
          <Link to="/character/{id}/play/exploration" getProps={getSubLinkProps}><img src="/img/icons/MapIcon.svg" alt={expanded?"":"Exploration"}/>{#if expanded}&nbsp;Exploration{/if}</Link>
          <Link to="/character/{id}/play/abilities" getProps={getSubLinkProps}><img src="/img/icons/AbilitiesIcon.svg" alt={expanded?"":"Abilities"}/>{#if expanded}&nbsp;Abilities{/if}</Link>
          <Link to="/character/{id}/play/inventory" getProps={getSubLinkProps}><img src="/img/icons/InventoryIcon.svg" alt={expanded?"":"Exploration"}/>{#if expanded}&nbsp;Inventory{/if}</Link>
        </div>
      </Route>
    </Router>
  </nav>
</div>

<style>
  .contents {
    display: flex;
    position: sticky;
    top: 0;
    flex: 0 0 auto;
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


  #character-menu {
    min-width: 50px;
  }

  .expand-icon {
    transition: all 0.1s ease;
  }
  .expand-icon.rotated {
    transform: rotate(180deg);
  }

</style>
