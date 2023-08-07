<script>
  import { get } from 'svelte/store';
  import { Link } from 'svelte-routing';
  import { hnsCharacters } from "../lib/stores";
    
  function getMainLinkProps({ location, href, isPartiallyCurrent, isCurrent }) {
    if (isPartiallyCurrent) return { class: "curr-path" };
    return { class: "" }
  }
  function getSubLinkProps({ location, href, isPartiallyCurrent, isCurrent }) {
    if (isCurrent) return { class: "sub-link active curr-path" };
    if (isPartiallyCurrent) return { class: "sub-link active" }

    let pathname = location.pathname;
    console.log( "pathname: " +pathname)
    if (pathname.length <= 1 || pathname[0] !== "/") return { class: "sub-link hidden" };
    const nextSlash = pathname.indexOf("/", 1);
    const rootPath = nextSlash > 0 ? pathname.slice(0, nextSlash) : pathname;
    console.log( "rootpath: " + rootPath)
    if (rootPath.length < 2) return { class: "sub-link hidden" };
    if (href.startsWith(rootPath)) return { class: "sub-link active" }
    if (href.startsWith("/" + rootPath)) return { class: "sub-link active" }
    return { class: "sub-link hidden" };
  }
  
  let charList = $hnsCharacters; // read value with automatic subscription

</script>

<div class="contents">
  <nav>
    <a href="/" id="home-button"><img src="/img/HnsBig.svg" alt="H&S"></a>
    <h4 class="title">Hammer & Steel</h4>

    <Link to="/rules" getProps={getMainLinkProps}>Rulebook</Link>
    <Link to="/character" getProps={getMainLinkProps}>Characters</Link>
    {#each Object.entries(charList) as [id, character], i}
      <Link to={"/character/"+id} getProps={getSubLinkProps}>{get(character).name}</Link>
    {/each}
    <Link to="/dice" getProps={getMainLinkProps}>Dice Roller</Link>
    <Link to="/dice/ageroller" getProps={getSubLinkProps}>AGE Roller</Link>
    <Link to="/dice/eyeroller" getProps={getSubLinkProps}>Eye Roller</Link>
  </nav>
</div>

<style>
  .contents {
    display: flex; 
    position: sticky;
    top: 0;
    float: left;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    pointer-events: auto;
    overflow-y: scroll;
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
