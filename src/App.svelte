<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition'
  import { Router, Link, link, Route, links } from 'svelte-routing';
  import { Modals, closeModal, openModal, modals } from 'svelte-modals'
  import NavModal from './lib/NavModal.svelte';
  import NavMenu from "./lib/NavMenu.svelte";

  import Account from './routes/account/Account.svelte';
  import AgeRoller from "./routes/dice/ageroller/AgeRoller.svelte";
  import Character from './routes/character/Character.svelte';
  import Characters from './routes/characters/Characters.svelte';
  import Dice from "./routes/dice/Dice.svelte";
  import EyeRoller from "./routes/dice/eyeroller/EyeRoller.svelte";
  import Home from "./routes/Home.svelte";
  import NotFound from './routes/NotFound.svelte';
  import Srd from './routes/srd/Srd.svelte';

  let viewWidth = 0;

  function onKeyPress(event: KeyboardEvent) {
    if (event.repeat) return;
    if (event.key === "Escape") {
      closeModal();
      event.preventDefault();
    }
  }
</script>


<svelte:window bind:innerWidth={viewWidth} />

<Router>
  <Modals>
    <div slot="backdrop" class="backdrop" transition:fade on:click={closeModal} on:keypress={onKeyPress} />
  </Modals>

  {#if viewWidth >= 1000}
    <NavMenu />
  {:else}
    <button id="nav-button" on:click={()=>openModal(NavModal)}><img src="/img/HnsSmall.svg" alt="H&S"></button>
  {/if}
    
  <Route component={NotFound} />
  <Route path="/" component={Home} />
  <Route path="/character" component={Characters} />
  <Route path="/character/:id" component={Character} />
  <Route path="/dice" component={Dice} />
  <Route path="/dice/ageroller" component={AgeRoller} />
  <Route path="/dice/eyeroller" component={EyeRoller} />
  <Route path="/srd" component={Srd} />
  <Route path="/account" component={Account} />
</Router>

<style>
  .backdrop {
    position: fixed;
    z-index: 9;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0,0,0,0.50)
  }
</style>