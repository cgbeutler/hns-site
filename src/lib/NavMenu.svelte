<script lang="ts">
  import { Link } from 'svelte-routing';
  import { account, hnsCharacterSummaries } from "./stores";
  import LoginBox from './LoginBox.svelte';
  import type { GetPropsParams } from 'svelte-routing/types/Link';
    import { closeAllModals, closeModal } from 'svelte-modals';
    
  function getMainLinkProps(params: GetPropsParams) {
    if (params.isPartiallyCurrent) return { class: "curr-path" };
    return { class: "" }
  }
  function getSubLinkProps(params: GetPropsParams) {
    let { location, href, isPartiallyCurrent, isCurrent } = params;
    if (isCurrent) return { class: "ml20 active curr-path" };
    if (isPartiallyCurrent) return { class: "ml20 active" }

    let pathname = location.pathname;
    console.log( "pathname: " +pathname)
    if (pathname.length <= 1 || pathname[0] !== "/") return { class: "ml20 hidden" };
    const nextSlash = pathname.indexOf("/", 1);
    const rootPath = nextSlash > 0 ? pathname.slice(0, nextSlash) : pathname;
    console.log( "rootpath: " + rootPath)
    if (rootPath.length < 2) return { class: "ml20 hidden" };
    if (href.startsWith(rootPath)) return { class: "ml20 active" }
    if (href.startsWith("/" + rootPath)) return { class: "ml20 active" }
    return { class: "ml20 hidden" };
  }
  
  let charList = $hnsCharacterSummaries; // read value with automatic subscription

</script>

<div class="contents">
  <nav class="banded-menu">
    <a href="/" id="home-button"><img src="/img/HnsBig.svg" alt="H&S"></a>
    <h4 class="title">Hammer & Steel</h4>

    <Link to="/srd" getProps={getMainLinkProps} on:click={closeAllModals}>Rulebook</Link>
    <Link to="/dice" getProps={getMainLinkProps} on:click={closeAllModals}>Dice Roller</Link>
    <Link to="/dice/ageroller" getProps={getSubLinkProps} on:click={closeAllModals}>AGE Roller</Link>
    <Link to="/dice/eyeroller" getProps={getSubLinkProps} on:click={closeAllModals}>Eye Roller</Link>
    <span style="text-align: center;">---</span>
    <Link to="/account" getProps={getMainLinkProps} on:click={closeAllModals}>My Account</Link>
    <Link to="/character" getProps={getMainLinkProps} on:click={closeAllModals}>Characters</Link>
    {#each Object.entries(charList) as [id, character]}
      <Link to={"/character/"+id} getProps={getSubLinkProps} on:click={closeAllModals}>{character.name}</Link>
    {/each}
  </nav>
  <LoginBox />
</div>

<style>
  .contents {
    display: flex;
    position: sticky;
    top: 0;
    float: right;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
    pointer-events: auto;
    background-color: black;
    height: 100vh;
    min-height: 100vh;
    max-height: 100vh;
    min-width: 200px;
    max-width: 90vw;
    margin-left: auto;
    padding: 0px;
    border-left: 2px solid;
    border-color: rgb(44, 44, 44);
  }

  .title {
    text-align: center;
    margin: -15px 0px 10px 0px;
    padding: 0;
  }

</style>
