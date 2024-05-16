<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { PlayerCharacter } from "../../../../lib/Character/PlayerCharacter";

  export let character: Writable<PlayerCharacter>;

</script>

<div class="sheet-block">
  <h1> <img src="/img/icons/PersonaIcon.svg" alt="" height="50px"/><br/>Persona Builder </h1>
  
  <div class="sheet-block-v align-left">
    <label for="character-name" class="no-grow"> <p>Character Name:</p> </label>
    <input id="character-name" class="no-grow" style="align-self: stretch;" placeholder="Unnamed Character" bind:value={$character.name}>
    <label for="character-description" style="no-grow"> <p>Character Description:</p> </label>
    <textarea id="character-description" placeholder="" bind:value={$character.description} />
  </div>
</div>

<style src="CharacterSheet.css">

  .no-grow {
    flex: 0 1 auto;
  }

  #character-description {
    align-self: stretch;
    flex: 1 1 auto;
    min-height: 4em;
  }

</style>