<script lang="ts">
  import type { Writable } from 'svelte/store';
  import type { PlayerCharacter } from '../../../../lib/Character/PlayerCharacter';
  import { MajorExplorationSkills, MinorExplorationSkills, ExplorationStats } from '../../../../lib/Character/CharacterEnums';

  export let character: Writable<PlayerCharacter>;
  function formatMod( mod: number ): string {
    if (mod < -1) return "--";
    return (mod < 0 ? "" : "+") + mod;
  }
</script>

<div class="skill-grid">
  <h4>Exploration Stats</h4>
  {#each ExplorationStats as stat }
    <div class="skill-cell">
      <button class="passive-button">{formatMod($character.GetStat(stat))}</button>
      <p style="text-align: center;"><b>{stat}</b></p>
    </div>
  {/each}
  <h4>Exploration Skills</h4>
  {#each MajorExplorationSkills as skill }
    <div class="skill-cell">
      <div class="skill-cell-row">
        <label class="inspiration-check" class:checked={$character.explorationSkills[skill].inspiration}>
          <input type="checkbox" bind:checked={$character.explorationSkills[skill].inspiration}>
        </label>
        <button class="skill-button">{formatMod($character.GetSkill(skill))}</button>
      </div>
      <p>{skill}{"+".repeat($character.explorationSkills[skill].points)}</p>
    </div>
  {/each}
  <div class="grid-divider"/>
  {#each MinorExplorationSkills as skill }
    <div class="skill-cell">
      <div class="skill-cell-row">
        <label class="inspiration-check" class:checked={$character.explorationSkills[skill].inspiration}>
          <input type="checkbox" bind:checked={$character.explorationSkills[skill].inspiration}>
        </label>
        <button class="skill-button">{formatMod($character.GetSkill(skill))}</button>
      </div>
      <p>{skill}{"+".repeat($character.explorationSkills[skill].points)}</p>
    </div>
  {/each}
</div>

<style>
.skill-grid {
  display: grid;
  background-color: black;
  color: #FDF6E3;
  border: 3px solid #111111;
  border-radius: 4px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  row-gap: 4px;
  column-gap: 4px;
  margin: 0px;
  padding: 2px;
  box-shadow: 0 0 0 4px black;
}

.skill-grid > h4 {
  background-color: #111111;
  color: #99998f;
  width: auto;
  font-size: 16px;
  text-align: center;
  margin: 0px;
  grid-column-start: 1;
  grid-column-end: 4;
  border-top: 2px solid #181818;
  border-radius: 14px 14px 2px 2px;
}

.skill-grid > h4:first-child {
  margin-top: 0px;
}

.skill-grid > .grid-divider {
  background-color: #111111;
  color: #99998f;
  width: auto;
  font-size: 16px;
  text-align: center;
  margin: 0px;
  grid-column-start: 1;
  grid-column-end: 4;
  border-top: 2px solid #181818;
  border-radius: 14px 14px 2px 2px;
}


.skill-cell {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: flex-start;
  background-color: #222222;
  margin: 0px;
  padding: 4px;
  border-radius: 1px;
}

.skill-cell p {
  flex-grow: 1;
  text-align: left;
  margin: auto 0px;
  padding: 0px 10px;
}


.skill-cell-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: flex-start;
}


.inspiration-check {
  background-image: url("/img/icons/inspiration.svg");
  background-size: cover;
  background-repeat: no-repeat;
  display: block;
  position: relative;
  width: 28px;
  height: 28px;
  margin: auto 3px auto auto;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  filter: opacity(60%);
}
/* Hide the browser's default checkbox */
.inspiration-check input {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* On mouse-over, add a grey background color */
.inspiration-check:hover {
  background-image: url("/img/icons/inspiration_hover.svg");
}
/* When the checkbox is checked, add a blue background */
.inspiration-check.checked {
  background-image: url("/img/icons/inspiration_filled.svg");
}
/* On mouse-over, add a grey background color */
.inspiration-check.checked:hover {
  background-image: url("/img/icons/inspiration_hover.svg");
}


.skill-button {
  background-size: 100% 100%;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 18px;
  width: 45px;
  height: 40px;
  padding: 0px;
  border-top: 2px solid #3b3b3b;
  background-color: #2b2b2b;
  border-bottom: 2px solid #111111;
  font-variant-ligatures: no-common-ligatures;
}
.passive-button {
  background-size: 100% 100%;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 18px;
  width: 45px;
  height: 40px;
  padding: 0px;
  border-top: 2px solid  #111111;
  background-color: #1b1b1b;
  border-bottom: 2px solid #333333;
  color: #ccccc5;
  font-variant-ligatures: no-common-ligatures;
}

@media (max-width: 660px) {
  .skill-cell {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-content: flex-end;
    padding: 10px 0px;
  }
}

</style>