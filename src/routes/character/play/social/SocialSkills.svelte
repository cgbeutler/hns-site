<script lang="ts">
  import '../../../../lib/css/SkillGrid.css';
  import type { Writable } from 'svelte/store';
  import type { PlayerCharacter } from '../../../../lib/Character/PlayerCharacter';
  import { MajorSocialSkills, MinorSocialSkills, SocialStats } from '../../../../lib/Character/CharacterEnums';
  import { diceCheck } from '../../../../lib/Toast/DiceCheck.svelte';

  export let character: Writable<PlayerCharacter>;
  function formatMod( mod: number ): string {
    if (mod < -1) return "--";
    return (mod < 0 ? "" : "+") + mod;
  }
</script>

<div class="skill-grid">
  <h4>Social Stats</h4>
  {#each SocialStats as stat }
    <div class="skill-cell">
      <button class="passive-button" on:click={diceCheck(stat, $character.GetStat(stat), [20])}>{formatMod($character.GetStat(stat))}</button>
      <p style="text-align: center;"><b>{stat}</b></p>
    </div>
  {/each}
  <h4>Social Skills</h4>
  {#each MajorSocialSkills as skill }
    <div class="skill-cell">
      <div class="skill-cell-row">
        <label class="inspiration-check" class:checked={$character.socialSkills[skill].inspiration}>
          <input type="checkbox" bind:checked={$character.socialSkills[skill].inspiration}>
        </label>
        <button class="skill-button" on:click={diceCheck(skill, $character.GetSkill(skill), [20])}>{formatMod($character.GetSkill(skill))}</button>
      </div>
      <p>{skill}{"+".repeat($character.socialSkills[skill].points)}</p>
    </div>
  {/each}
  <div class="grid-divider"/>
  {#each MinorSocialSkills as skill }
    <div class="skill-cell">
      <div class="skill-cell-row">
        <label class="inspiration-check" class:checked={$character.socialSkills[skill].inspiration}>
          <input type="checkbox" bind:checked={$character.socialSkills[skill].inspiration}>
        </label>
        <button class="skill-button" on:click={diceCheck(skill, $character.GetSkill(skill), [20])}>{formatMod($character.GetSkill(skill))}</button>
      </div>
      <p>{skill}{"+".repeat($character.socialSkills[skill].points)}</p>
    </div>
  {/each}
</div>
