<script lang="ts">
  import ExternalNav from "../lib/ExternalNav.svelte";
  import { account } from "../lib/stores";
  import { link } from "svelte-routing";

  export let location: string = "/";
  $: console.log(location);

  let picture = `\
                              \n
You pick up the Kleptonomicon.
  |\\'""""""""""""""""""".
  | \\ __________________\\
  | |":      ______      |
  | | :    ."      ".    |
  |\\| :   /__________\\   |
  | |-:--""___    ___""--|
  |\\|_:_  (_O_)__(_O_)  _|
  | | : '-____(..)____-' |
  |\\| :  |   .====.   |  |
  |\\|-------|| () ||-----|
  | |-------|| || ||-----|
  | | :    \\ '====' /    |
  \\ | :   Kleptonomicon  |
   \\|,:__________________/

 The masked face on the cover
   stares at you lifelessly.
 A large lock binds the book.
You can tell the book contains
 a Tabletop Roleplaying Game.

        What do you do?`

  let pictureOut = ``

  let cursor = 0;
  let grab = 4;
  let done = false;
  let interval = setInterval(() => {
    if (cursor >= picture.length) { done = true; clearInterval(interval); return; }
    pictureOut += picture.slice(cursor,Math.min(cursor+grab, picture.length));
    cursor += grab;
    if (cursor > 60 && cursor < 460) { grab = 10; }
    else if (cursor >= 460 && cursor < 590) { grab = 4; }
    else if (cursor >= 590) { grab = 1; }
  }, 2);


</script>


<div id="home-page">
  <h1>The Kleptonomicon</h1>

  {#if !$account}
    <pre style="height: 25lh;">{pictureOut}{done? "" : "█"}</pre>
    <div class="v-button-box">
      <div class="h-button-box">
        <a href="/login" class="button" use:link>Login</a><a href="/account" class="button" use:link>Create Account</a><br>
      </div>
      <a href="/character/local/build" class="button" use:link>Try the Character Builder</a>
    </div>
  {/if}
</div>
<div id="end-matter">
  <ExternalNav></ExternalNav>
</div>

<style>
  pre {
    line-height: 16pt;
    font-size: 14pt;
    font-family: 'Courier New', Courier, monospace;
  }

  p {
    font-family: 'Courier New', Courier, monospace;
    text-align: center;
    margin: 0;
  }

  #home-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  
  .v-button-box {
    display: flex;
    align-self: stretch;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    gap: 4px
  }

  .h-button-box {
    display: flex;
    align-self: stretch;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    gap: 4px
  }

  .hidden {
    display: none;
    opacity: 0;
    filter: opacity(0);
  }

  #end-matter {
    margin-top: auto;
  }

  /* Small Screens */
  @media only screen and (min-width: 768px) {
    
  }
</style>