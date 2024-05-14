<script lang="ts">
  import '../../../../lib/css/SkillGrid.css';
  import type { Writable } from 'svelte/store';
  import type { PlayerCharacter } from '../../../../lib/Character/PlayerCharacter';
  import { MajorExplorationSkills, MinorExplorationSkills, ExplorationStats } from '../../../../lib/Character/CharacterEnums';
  import { diceCheck } from '../../../../lib/Toast/DiceCheck.svelte'

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
      <button class="passive-button" on:click={diceCheck(stat, $character.GetStat(stat), [20])}>{formatMod($character.GetStat(stat))}</button>
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
        <button class="skill-button" on:click={diceCheck(skill, $character.GetSkill(skill), [20])}>{formatMod($character.GetSkill(skill))}</button>
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
        <button class="skill-button" on:click={diceCheck(skill, $character.GetSkill(skill), [20])}>{formatMod($character.GetSkill(skill))}</button>
      </div>
      <p>{skill}{"+".repeat($character.explorationSkills[skill].points)}</p>
    </div>
  {/each}
</div>
