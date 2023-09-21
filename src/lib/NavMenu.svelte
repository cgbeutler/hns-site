<script lang="ts">
  import { get } from 'svelte/store';
  import { Link } from 'svelte-routing';
  import { account, hnsCharacterSummaries } from "./stores";
  import LoginBox from './LoginBox.svelte';
  import type { GetPropsParams } from 'svelte-routing/types/Link';
    
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

    <Link to="/srd" getProps={getMainLinkProps}>Rulebook</Link>
    <Link to="/dice" getProps={getMainLinkProps}>Dice Roller</Link>
    <Link to="/dice/ageroller" getProps={getSubLinkProps}>AGE Roller</Link>
    <Link to="/dice/eyeroller" getProps={getSubLinkProps}>Eye Roller</Link>
    <span style="text-align: center;">---</span>
    <Link to="/account" getProps={getMainLinkProps}>My Account</Link>
    <Link to="/character" getProps={getMainLinkProps}>Characters</Link>
    {#each Object.entries(charList) as [id, character]}
      <Link to={"/character/"+id} getProps={getSubLinkProps}>{character.name}</Link>
    {/each}
  </nav>
  <LoginBox />
</div>

<style>
  .contents {
    display: flex; 
    position: sticky;
    top: 0;
    float: left;
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
    margin-right: 20px;
    padding: 0px;
    border-right: 2px solid;
    border-color: rgb(44, 44, 44);
  }

  .title {
    text-align: center;
    margin: -15px 0px 10px 0px;
    padding: 0;
  }

</style>
