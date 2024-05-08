<script lang="ts">
  import { onMount } from "svelte";
  import { derived, type Writable } from "svelte/store";
  import type { PlayerCharacter } from "../../../lib/PlayerCharacter";
  import Link from "../../../lib/Link.svelte";

  export let id: string;
  export let character: Writable<PlayerCharacter>;
  let error: string | undefined;
  onMount(async () => { error = !!character || $character == null ? undefined : `Failed to load character`; });
  
  function getLinkProps(params: GetPropsParams) {
    if (params.isCurrent) return { class: "active" };
    return { class: "" }
  }

  //inclusive
  function clamp( n: number, min: number, max: number ) {
    if (isNaN(n)) return 1;
    return Math.max(min, Math.min(max, n), 0);
  }

  let experienceRaw: number = 0;
  function updateExp( n?: number ) {
    if (n != null) experienceRaw += n;
    if (experienceRaw < 0) experienceRaw = 0;
    
    $character.experience = experienceRaw;
  }
  function addExp() { updateExp(1) }
  function removeExp() { updateExp(-1) }

  let levelInput: HTMLInputElement;
  let levelInputInvalid: boolean = false;
  function levelInputChanged() {
    var raw = levelInput.valueAsNumber;
    if (isNaN(raw) || raw < 1 || raw > 20) { levelInputInvalid = true; return; }
    levelInputInvalid = false;
    $character.level = levelInput.valueAsNumber;
  }
  $: if (!!character && !!levelInput && $character != null && $character.level !== levelInput.valueAsNumber) {
    levelInput.value = $character.level.toString();
  }

  let archetypeLevelsLeft: number = 0;
  $: if (!!character && !!levelInput && $character != null) {
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

{#if error}
  <div class="sheet-block">
    <h2>Cannot Load Social Stats</h2>
    <p>Error: {error}</p>
  </div>
{:else if !character || $character == null}
  <div class="sheet-block">
    <h2>Loading...</h2>
  </div>
{:else}
  <div class="sheet-block-v">
    <div class="sheet-block-h">
      <div class="sheet-block-v">
        <h2>Character</h2>
        <label for="character-name"> <h4 style="display:inline-block">Character Name:</h4> </label>
        <input id="character-name" placeholder="Unnamed Character" bind:value={$character.name}>
        <label for="character-description"> <h4 style="display:inline-block">Character Description:</h4> </label>
        <textarea id="character-description" style="flex-grow: 1" placeholder="" bind:value={$character.description} />
      </div>
      <div class="sheet-block-v">
        <h2>Background</h2>
        Constitution, Class, and Lineage<br>selection here?
      </div>
    </div>
    
    <h2>Experience</h2>
    <div class="sheet-block-h">
      <button disabled={experienceRaw<10} style="flex-basis:25%">Level Up</button>
      <div class="sheet-block-h" style="flex-grow: 0;">
        <button on:click={removeExp}>-</button>
        {#each {length: experienceRaw%10} as _,i }(x){/each}{#each {length: 9-(experienceRaw%10)} as _,i }(_){/each}
        <button on:click={addExp}>+</button>
      </div>
      <label class="label-h" style="flex-basis:25%">
        <h4>Total</h4> 
        <input class="number-input-small" type="number" min=0 bind:value={experienceRaw} on:change={()=>updateExp(0)}/>
      </label>
    </div>

    <h2>Level Tracker</h2>
    <div id="level-tracker">
      <label class="tracker-cell-label label-h">
        <h4>Level</h4>
        <input class="number-input-small" class:invalid-input={levelInputInvalid} type="number" min=1 max=20 bind:this={levelInput} on:change={levelInputChanged}/>
      </label>
      
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

    <h2>Archetypes</h2>
    <label class="label-h" style="justify-content: center;">
      Archetype Levels To Assign
      <input class="number-input-small" class:invalid-input={archetypeLevelsLeft < 0} value={archetypeLevelsLeft} disabled>
    </label>

    <h2>Warrior Tracker</h2>
    <div id="arch-level-tracker">
      <label class="tracker-cell-label label-h">
        <h4>Level</h4>
        <input class="number-input-small" class:invalid-input={warriorInputInvalid} type="number" min=0 max=15 bind:this={warriorInput} on:change={warriorInputChanged}/>
      </label>
      
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

    <h2>Specialist Tracker</h2>
    <div id="arch-level-tracker">
      <label class="tracker-cell-label label-h">
        <h4>Level</h4>
        <input class="number-input-small" class:invalid-input={specialistInputInvalid} type="number" min=0 max=15 bind:this={specialistInput} on:change={specialistInputChanged}/>
      </label>
      
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

    <h2>Caster Tracker</h2>
    <div id="arch-level-tracker">
      <label class="tracker-cell-label label-h">
        <h4>Level</h4>
        <input class="number-input-small" class:invalid-input={casterInputInvalid} type="number" min=0 max=15 bind:this={casterInput} on:change={casterInputChanged}/>
      </label>
      
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
{/if}

<style src="CharacterSheet.css">

#level-tracker {
  background-color: rgb(0, 0, 0);
  display: grid;
  grid-template-columns: auto repeat(20, auto) auto;
  row-gap: 1px;
  column-gap: 1px;
  flex: 0 0 auto;
}
#level-tracker > label,
#level-tracker > div {
  min-width: 1.75em;
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
}
#arch-level-tracker > label,
#arch-level-tracker > div {
  min-width: 1.75em;
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
}
.tracker-cell-level {
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
}
.tracker-cell-reward {
  background-color: rgb(12, 12, 12);
  color: rgb(192,192,192);
  padding: 2px;
  text-align: center;
}
.tracker-cell-reward.level-reached {
  background-color: rgb(24, 24, 24);
  color: rgb(200,200,200);
}

.sheet-block {
  display: flex;
  align-items: flex-start;
  text-align: left;
}

:is(h1, h2, h3, h4, h5, h6) {
  text-align: center;
}

.sheet-block-h {
  display: flex;
  justify-content: space-evenly;
  flex: 0 0 auto;
  flex-direction: row;
  flex-wrap: wrap;
  /* width: 100%; */
}

.sheet-block-v {
  display: flex;
  flex-direction: column;
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