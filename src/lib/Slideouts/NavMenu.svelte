<script lang="ts">
  import { Link } from 'svelte-routing';
  import { hnsCharacterSummaries } from "../stores";
  import LoginBox from './LoginBox.svelte';
  import type { GetPropsParams } from 'svelte-routing/types/Link';
  import { closeAllModals } from 'svelte-modals';
    
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
    <a href="/" id="home-button">KLEPTONOMICON</a>

    <Link to="/srd" getProps={getMainLinkProps} on:click={closeAllModals}>Rulebook</Link>
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
  #home-button {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    background: #000;
    line-height: 2.8em;
    font-variant-caps: titling-caps;
  }

  .contents {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
    min-height: min-content;
    height: 100%;
    pointer-events: auto;
    background-color: black;
    margin-left: auto;
    padding: 0px;
    border-left: 2px solid;
    border-color: rgb(44, 44, 44);
  }

</style>
