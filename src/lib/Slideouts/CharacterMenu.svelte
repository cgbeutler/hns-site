<script lang="ts">
  import { Link } from 'svelte-routing';
  import type { GetPropsParams } from '../Helpers/SvelteRoutingTypes';
  import { closeModal, openModal } from 'svelte-modals';
  import CharacterMenuModal from './CharacterMenuModal.svelte';
  
  export let id: string;
  $: console.log( "id = '" + id + "'" )
  export let slim: boolean | undefined = undefined;

  function getLinkProps( p: GetPropsParams ): Record<string, any> {
    return p.isCurrent ? { class: "active" } : { class: "" };
  }

  function toggleMenu() {
    if (slim) openModal(CharacterMenuModal, {id});
    else closeModal();
  }

</script>

{#if slim}
<div class="menu-placeholder" />
{/if}
<div class="side-menu" class:slim={slim}>
  <nav id="character-menu">
    <div class="toggle-bg-v" class:slim={slim} style="margin-bottom:12px;">
      <button on:click={toggleMenu}>
        <img  class="expand-icon" class:rotated={!slim} src="/img/icons/ExpandRightIcon.svg" alt={slim?"Expand":""}>{#if !slim}&nbsp;Collapse{/if}
      </button>
    </div>
    
    <div class="toggle-bg-v" class:slim={slim}>
      <div class="section-header"><img src="/img/icons/HammerIcon.svg" alt={slim?"Build":""}/>{#if !slim}&nbsp;Build{/if}</div>
      <Link to="/character/{id}/build" getProps={getLinkProps}><img src="/img/icons/PromotionIcon.svg" alt={slim?"Level":""}/>{#if !slim}&nbsp;Level{/if}</Link>
      <Link to="/character/{id}/build/stats" getProps={getLinkProps}><img src="/img/icons/PlusPlusIcon.svg" alt={slim?"Stats & Skills":""}/>{#if !slim}&nbsp;Stats & Skills{/if}</Link>
      <Link to="/character/{id}/build/feats" getProps={getLinkProps}><img src="/img/icons/StarIcon.svg" alt={slim?"Feats":""}/>{#if !slim}&nbsp;Feats & Abilities{/if}</Link>
    </div>
    <div class="toggle-bg-v" class:slim={slim}>
      <div class="section-header"><img src="/img/icons/SwordIcon30.svg" alt={slim?"Play":""}/>{#if !slim}&nbsp;Play{/if}</div>
      <Link to="/character/{id}/play" getProps={getLinkProps}><img src="/img/icons/HeartIcon.svg" alt={slim?"Status":""}/>{#if !slim}&nbsp;Status{/if}</Link>
      <Link to="/character/{id}/play/social" getProps={getLinkProps}><img src="/img/icons/SocialIcon.svg" alt={slim?"Social":""}/>{#if !slim}&nbsp;Social{/if}</Link>
      <Link to="/character/{id}/play/exploration" getProps={getLinkProps}><img src="/img/icons/MapIcon.svg" alt={slim?"Exploration":""}/>{#if !slim}&nbsp;Exploration{/if}</Link>
      <Link to="/character/{id}/play/abilities" getProps={getLinkProps}><img src="/img/icons/AbilitiesIcon.svg" alt={slim?"Abilities":""}/>{#if !slim}&nbsp;Abilities{/if}</Link>
      <Link to="/character/{id}/play/inventory" getProps={getLinkProps}><img src="/img/icons/InventoryIcon.svg" alt={slim?"Exploration":""}/>{#if !slim}&nbsp;Inventory{/if}</Link>
    </div>
    <!-- <div class="toggle-bg-v" class:slim={slim}>
      <div class="section-header"><img src="/img/icons/Pencil.svg" alt={slim?"Notes":""}/>{#if !slim}&nbsp;Notes{/if}</div>
      <Link to="/character/{id}/notes" getProps={getLinkProps}><img src="/img/icons/PersonaIcon.svg" alt={slim?"Persona":""}/>{#if !slim}&nbsp;Notes{/if}</Link>
      <Link to="/character/{id}/notes/persona" getProps={getLinkProps}><img src="/img/icons/PersonaIcon.svg" alt={slim?"Persona":""}/>{#if !slim}&nbsp;Persona{/if}</Link>
    </div> -->
  </nav>
</div>

<style>
  .menu-placeholder {
    display: block;
    height: 100%;
    min-width: 50px;
    width: 50px;
  }

  .section-header {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
  }
  .section-header > img {
    display: inline;
    height: calc( 1em + 8px );
    width: calc( 1em + 8px );
  }

  .side-menu {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    pointer-events: auto;
    background-color: black;
    padding: 0px;
    border-left: 2px solid;
    border-color: rgb(44, 44, 44);
    z-index: 8;
    overflow: scroll;
  }
  .side-menu.slim {
    min-width: 50px;
    max-width: 50px;
    width: 50px;
  }


  #character-menu {
    min-width: 50px;
  }

  .expand-icon {
    position: sticky;
    top: 0;
    transition: all 0.1s ease;
  }
  .expand-icon.rotated {
    transform: rotate(180deg);
  }

</style>
