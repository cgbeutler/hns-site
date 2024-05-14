<script lang="ts">
	import { fade } from 'svelte/transition'
  import { Router, Route } from 'svelte-routing';
  import { Modals, closeModal, openModal } from 'svelte-modals'
  import { SvelteToast } from '@zerodevx/svelte-toast'
  import NavModal from './lib/NavModal.svelte';

  import Account from './routes/account/Account.svelte';
  import Character from './routes/character/Character.svelte';
  import Characters from './routes/characters/Characters.svelte';
  import Home from "./routes/Home.svelte";
  import NotFound from './routes/NotFound.svelte';
  import Srd from './routes/srd/Srd.svelte';
  import Login from './routes/login/Login.svelte';

  let viewWidth = 0;

  function onKeyPress(event: KeyboardEvent) {
    if (event.repeat) return;
    if (event.key === "Escape") {
      closeModal();
      event.preventDefault();
    }
  }

  const toastOptions = {
    duration: 6000,    // duration of progress bar tween to the `next` value
    pausable: true,    // pause progress bar tween on mouse hover
    reversed: true,   // insert new toast to bottom of stack
    // theme: {},         // css var overrides
  }
</script>


<svelte:window bind:innerWidth={viewWidth} />

<Router>
  <Modals>
    <div slot="backdrop" class="backdrop" transition:fade on:click={closeModal} on:keypress={onKeyPress} role="none" />
  </Modals>

  <button id="nav-button" on:click={()=>openModal(NavModal)}><img src="/img/HnsSmall.svg" alt="H&S"></button>
    
  <Route component={NotFound} />
  <Route path="/" component={Home} />
  <Route path="/character" component={Characters} />
  <Route path="/character/:id/*" component={Character} />
  <Route path="/srd" component={Srd} />
  <Route path="/account" component={Account} />
  <Route path="/login" component={Login} />

  <SvelteToast options={toastOptions} />
</Router>

<style>
  #nav-button {
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    width: 50px;
    height: 50px;
    background-color: transparent;
    margin: 5px;
    padding: 0px;
  }

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