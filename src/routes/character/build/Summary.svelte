<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { PlayerCharacter } from "../../../lib/Character/PlayerCharacter";

  export let id: string;
  export let character: Writable<PlayerCharacter>;

  //inclusive
  function clamp( n: number, min: number, max: number ) {
    if (isNaN(n)) return 1;
    return Math.max(min, Math.min(max, n), 0);
  }

  let expInput: HTMLInputElement;
  let expInputInvalid: boolean = false;
  function expInputChanged() {
    console.log(expInput.value);
    var raw = Number.parseInt( expInput.value );
    console.log(raw);
    if (raw == null || isNaN(raw) || raw < 0 || raw > 10) { expInputInvalid = true; return; }
    expInputInvalid = false;
    $character.experience = raw;
  }
  function addExp() { $character.experience = clamp($character.experience + 1, 0, 10); }
  function removeExp() { $character.experience = clamp($character.experience - 1, 0, 10); }
  $: if (!!expInput && $character.experience !== expInput.valueAsNumber) {
    expInput.value = $character.experience.toString();
  }


  let levelInput: HTMLInputElement;
  let levelInputInvalid: boolean = false;
  function levelInputChanged() {
    var raw = levelInput.valueAsNumber;
    if (isNaN(raw) || raw < 1 || raw > 20) { levelInputInvalid = true; return; }
    levelInputInvalid = false;
    $character.level = raw;
  }
  function addLevel() { $character.level = clamp($character.level + 1, 1, 20); }
  function removeLevel() { $character.level = clamp($character.level - 1, 1, 20); }
  function levelUp() {
    if ($character.experience < 10 || $character.level >= 20) { return; }
    $character.experience = clamp($character.experience - 10,0,10);
    $character.level = clamp($character.level + 1, 1, 20);
  }
  $: if (!!levelInput && $character.level !== levelInput.valueAsNumber) {
    levelInput.value = $character.level.toString();
  }
  

  let archetypeLevelsLeft: number = 0;
  $: if (!!levelInput) {
    archetypeLevelsLeft = $character.level + 5 - $character.warriorLevel - $character.specialistLevel - $character.casterLevel
  }

  
  let warriorInput: HTMLInputElement;
  let warriorInputInvalid: boolean = false;
  function warriorInputChanged() {
    var raw = warriorInput.valueAsNumber;
    if (isNaN(raw) || raw < 0 || raw > 15 || raw > $character.level+3) { warriorInputInvalid = true; return; }
    warriorInputInvalid = false;
    $character.warriorLevel = warriorInput.valueAsNumber;
  }
  $: if (!!character && !!warriorInput && $character != null && $character.warriorLevel !== warriorInput.valueAsNumber) {
    warriorInput.value = $character.warriorLevel.toString();
  }
  
  let specialistInput: HTMLInputElement;
  let specialistInputInvalid: boolean = false;
  function specialistInputChanged() {
    var raw = specialistInput.valueAsNumber;
    if (isNaN(raw) || raw < 0 || raw > 15 || raw > $character.level+3) { specialistInputInvalid = true; return; }
    specialistInputInvalid = false;
    $character.specialistLevel = specialistInput.valueAsNumber;
  }
  $: if (!!character && !!specialistInput && $character != null && $character.specialistLevel !== specialistInput.valueAsNumber) {
    specialistInput.value = $character.specialistLevel.toString();
  }
  
  let casterInput: HTMLInputElement;
  let casterInputInvalid: boolean = false;
  function casterInputChanged() {
    var raw = casterInput.valueAsNumber;
    if (isNaN(raw) || raw < 0 || raw > 15 || raw > $character.level+3) { casterInputInvalid = true; return; }
    casterInputInvalid = false;
    $character.casterLevel = casterInput.valueAsNumber;
  }
  $: if (!!character && !!casterInput && $character != null && $character.casterLevel !== casterInput.valueAsNumber) {
    casterInput.value = $character.casterLevel.toString();
  }

</script>

<div class="sheet-block">
  <h1><img src="/img/icons/PromotionIcon.svg" alt=""/> Level Builder <img src="/img/icons/PromotionIcon.svg" alt=""/></h1>

  <div class="sheet-block-v">
    <div class="sheet-block-h">
      <label for="character-name" style="line-height: 1em;"> <p>Character Name:</p> </label>
      <input id="character-name" style="align-self: stretch;" placeholder="Unnamed Character" bind:value={$character.name}>
    </div>


    <h2 style="margin-bottom: 0;">Experience</h2>

    <p style="font-size:14pt">[{#each {length: $character.experience} as _,i }◈{/each}{#each {length: 10-($character.experience)} as _,i }◇{/each}]</p>
    <div class="sheet-block-h" style="gap: 5px; margin-top: 5px;">
      <button disabled={$character.experience <= 0} on:click={removeExp} class="icon-button">-</button>
      <p style="font-family: 'Courier New', Courier, monospace; text-align: center;">
        <input class="number-input-small" class:invalid-input={expInputInvalid} type="text" min=0 max=10 bind:this={expInput} on:change={expInputChanged}/><br>
      </p>
      {#if $character.experience <= 9}
      <button on:click={addExp} class="icon-button">+</button>
      {:else if $character.level < 20}
        <button class="icon-button bright" on:click={levelUp}><img src="/img/icons/PromotionIcon.svg" alt="Level Up"/></button>
      {:else}
        <p style="padding: 0; line-height: 1em; font-size: small;">max<br>level</p>
      {/if}
    </div>
    

    <h2 style="margin-bottom: 0;">Level</h2>

    <input class="number-input-small" class:invalid-input={levelInputInvalid} type="number" min=1 max=20 bind:this={levelInput} on:change={levelInputChanged}/>
    <label class="label-h" style="justify-content: center;">
      Archetype Levels To Assign
      <input class="number-input-small" class:invalid-input={archetypeLevelsLeft < 0} value={archetypeLevelsLeft} disabled>
    </label>
    Warrior
    <input class="number-input-small" class:invalid-input={warriorInputInvalid} type="number" min=0 max=15 bind:this={warriorInput} on:change={warriorInputChanged}/>
    Specialist
    <input class="number-input-small" class:invalid-input={specialistInputInvalid} type="number" min=0 max=15 bind:this={specialistInput} on:change={specialistInputChanged}/>
    Caster
    <input class="number-input-small" class:invalid-input={casterInputInvalid} type="number" min=0 max=15 bind:this={casterInput} on:change={casterInputChanged}/>


    <h2>Upcoming Perks</h2>

    <div id="level-tracker">
      <div class="tracker-cell-label"> Character Level </div>
      
      {#each {length: 20} as _,i }
        <div class="tracker-cell-level" class:level-reached={(i+1)<=$character.level}>{i+1}</div>
      {/each}
      <div class="tracker-cell-total">Total</div>
      
      {#each Object.entries($character.levelTrackerPerks) as [reward, levelArray]}
        <div class="tracker-cell-label">{reward}</div>
        {#each levelArray as n, i }
          <div class="tracker-cell-reward" class:level-reached={(i+1)<=$character.level}>{n > 0 ? n : ""}</div>
        {/each}
        <div class="tracker-cell-total">{$character.lookup(reward)}</div>
      {/each}
    </div>


    <h4>Warrior</h4>

    <div id="arch-level-tracker">
      <div class="tracker-cell-label"> Warrior Level </div>
      
      {#each {length: 16} as _,i }
        <div class="tracker-cell-level" class:level-reached={i<=$character.warriorLevel}>{i}</div>
      {/each}
      <div class="tracker-cell-total">Total</div>
      
      {#each Object.entries($character.warriorTrackerPerks) as [reward, arr]}
        <div class="tracker-cell-label">{reward}</div>
        {#each arr as n, i }
          <div class="tracker-cell-reward" class:level-reached={i<=$character.warriorLevel}>{
            i == 0 ? ($character.lookup("Starting" + reward)??0) + n : n > 0 ? n : ""
          }</div>
        {/each}
        <div class="tracker-cell-total">{$character.lookup(reward)}</div>
      {/each}
    </div>


    <h4>Specialist</h4>

    <div id="arch-level-tracker">
      <div class="tracker-cell-label"> Specialist Level </div>
      
      {#each {length: 16} as _,i }
        <div class="tracker-cell-level" class:level-reached={i<=$character.specialistLevel}>{i}</div>
      {/each}
      <div class="tracker-cell-total">Total</div>
      
      {#each Object.entries($character.specialistTrackerPerks) as [reward, arr]}
        <div class="tracker-cell-label">{reward}</div>
        {#each arr as n, i }
          <div class="tracker-cell-reward" class:level-reached={i<=$character.specialistLevel}>{
            i == 0 ? ($character.lookup("Starting" + reward)??0) + n : n > 0 ? n : ""
          }</div>
        {/each}
        <div class="tracker-cell-total">{$character.lookup(reward)}</div>
      {/each}
    </div>


    <h4>Caster</h4>

    <div id="arch-level-tracker">
      <div class="tracker-cell-label"> Caster Level </div>
      
      {#each {length: 16} as _,i }
        <div class="tracker-cell-level" class:level-reached={i<=$character.casterLevel}>{i}</div>
      {/each}
      <div class="tracker-cell-total">Total</div>
      
      {#each Object.entries($character.casterTrackerPerks) as [reward, arr]}
        <div class="tracker-cell-label">{reward}</div>
        {#each arr as n, i }
          <div class="tracker-cell-reward" class:level-reached={i<=$character.casterLevel}>{
            i == 0 ? ($character.lookup("Starting" + reward)??0) + n : n > 0 ? n : ""
          }</div>
        {/each}
        <div class="tracker-cell-total">{$character.lookup(reward)}</div>
      {/each}
    </div>
  </div>
</div>

<style src="CharacterSheet.css">

  #level-tracker {
    background-color: rgb(0, 0, 0);
    display: grid;
    grid-template-columns: auto repeat(20, auto) auto;
    row-gap: 1px;
    column-gap: 1px;
    flex: 0 0 auto;
    max-width: 100%;
    overflow: scroll;
  }
  #level-tracker > :nth-child(22n+1),
  #level-tracker > :nth-child(22n+6),
  #level-tracker > :nth-child(22n+11),
  #level-tracker > :nth-child(22n+16),
  #level-tracker > :nth-child(22n+21) {
    margin-right: 3px;
  }
  #level-tracker > :nth-child(n+1):nth-child(-n+22),
  #level-tracker > :nth-child(n+67):nth-child(-n+88) {
    margin-bottom: 3px;
  }

  #arch-level-tracker {
    background-color: rgb(0, 0, 0);
    display: grid;
    grid-template-columns: auto repeat(16, auto) auto;
    row-gap: 1px;
    column-gap: 1px;
    flex: 0 0 auto;
    max-width: 100%;
    overflow: scroll;
  }
  #arch-level-tracker > :nth-child(18n+1),
  #arch-level-tracker > :nth-child(18n+2),
  #arch-level-tracker > :nth-child(18n+7),
  #arch-level-tracker > :nth-child(18n+12),
  #arch-level-tracker > :nth-child(18n+17) {
    margin-right: 3px;
  }
  #arch-level-tracker > :nth-child(n+1):nth-child(-n+18),
  #arch-level-tracker > :nth-child(n+55):nth-child(-n+72) {
    margin-bottom: 3px;
  }

  .tracker-cell-label {
    background-color: rgb(48, 48, 48);
    padding: 2px 4px;
    min-width: max-content;
    width: auto;
    position: sticky;
    left: 0;
  }
  .tracker-cell-level {
    min-width: 1.75em;
    width: 1.75em;
    background-color: rgb(24, 24, 24);
    color: rgb(200,200,200);
    padding: 2px;
    text-align: center;
  }
  .tracker-cell-level.level-reached {
    background-color: rgb(48, 48, 48);
    color: rgb(255,255,240);
  }
  .tracker-cell-total {
    background-color: rgb(48, 48, 48);
    padding: 2px;
    text-align: center;
    padding: 0px 8px;
    position: sticky;
    right: 0;
  }
  .tracker-cell-reward {
    min-width: 1.75em;
    width: 1.75em;
    background-color: rgb(12, 12, 12);
    color: rgb(192,192,192);
    padding: 2px;
    text-align: center;
  }
  .tracker-cell-reward.level-reached {
    background-color: rgb(24, 24, 24);
    color: rgb(200,200,200);
  }

  .label-h {
    display: flex;
    flex-direction: row;
    gap: 0px 10px;
  }

  .number-input-small {
    width: 4em;
    justify-self: center;
    align-self: center;
    text-align: center;
  }

  .invalid-input {
    border: solid 1px red;
  }

  /* This worked okay as a cool display that doubled as an expanding textbox
  p[contenteditable] {
    margin: 0px 0px 0px 24px;
    flex-grow: 1;
    width: calc(100% - 34px);
    max-width: none;
    
    font-family: monospace;
    text-rendering: auto;
    letter-spacing: normal;
    word-spacing: normal;
    line-height: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    appearance: auto;
    -webkit-rtl-ordering: logical;
    resize: auto;
    cursor: text;
    white-space-collapse: preserve;
    text-wrap: wrap;
    overflow-wrap: break-word;
    background-color: field;
    column-count: initial !important;
    writing-mode: horizontal-tb !important;
    border-width: 1px;
    border-style: solid;
    border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
    border-image: initial;
    padding: 2px;
  } */
</style>