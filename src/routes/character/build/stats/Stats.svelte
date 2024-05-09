<script lang="ts">
  import type { Writable } from "svelte/store";
  import { StatGenMethodEnum, type PlayerCharacter } from "../../../../lib/Character/PlayerCharacter";
  import { StatEnum } from "../../../../lib/Character/CharacterEnums";

  export let character: Writable<PlayerCharacter>;

  const baseStatPoints = $character.levelTrackerPerks.StatPoints[0];
  
  let rawSocialRolls: Array<number> | undefined;
  let rawSocialRollsString: string = "";
  function rollSocialStats() {
    rawSocialRolls = Array.from( { length:baseStatPoints }, () => Math.floor( Math.random() * 3 ) + 1 );
  }
  $: if (rawSocialRolls && rawSocialRolls.length == baseStatPoints) {
    $character.statGen_Roll[StatEnum.Candor] = -1 + rawSocialRolls.filter(r => r == 1).length;
    $character.statGen_Roll[StatEnum.Conscious] = -1 + rawSocialRolls.filter(r => r == 2).length;
    $character.statGen_Roll[StatEnum.Cunning] = -1 + rawSocialRolls.filter(r => r == 3).length;
    rawSocialRollsString = rawSocialRolls?.join((", ")) ?? "";
  }
  let socialPointSum = 0;
  $: if($character.socialStatGenMethod === StatGenMethodEnum.Manual) {
    if ($character.statGen_Manual[StatEnum.Candor] == null) $character.statGen_Manual[StatEnum.Candor] = -1;
    if ($character.statGen_Manual[StatEnum.Conscious] == null) $character.statGen_Manual[StatEnum.Conscious] = -1;
    if ($character.statGen_Manual[StatEnum.Cunning] == null) $character.statGen_Manual[StatEnum.Cunning] = -1;
    socialPointSum = 3 + ($character.statGen_Manual[StatEnum.Candor]??-1) + ($character.statGen_Manual[StatEnum.Conscious]??-1) + ($character.statGen_Manual[StatEnum.Cunning]??-1);
  } else {
    socialPointSum = 3 + ($character.statGen_Roll[StatEnum.Candor]??-1) + ($character.statGen_Roll[StatEnum.Conscious]??-1) + ($character.statGen_Roll[StatEnum.Cunning]??-1);
  }
  let socialImprovementSum = 0;
  $: socialImprovementSum = ($character.statImprovements.Candor??0) - ($character.statImprovements.Conscious??0) - ($character.statImprovements.Cunning??0);

  let rawExplorationRolls: Array<number> | undefined;
  let rawExplorationRollsString: string = "";
  function rollExplorationStats() {
    rawExplorationRolls = Array.from( { length:baseStatPoints }, () => Math.floor( Math.random() * 3 ) + 1 );
  }
  $: if (rawExplorationRolls && rawExplorationRolls.length == baseStatPoints) {
    $character.statGen_Roll[StatEnum.Might] = -1 + rawExplorationRolls.filter(r => r == 1).length;
    $character.statGen_Roll[StatEnum.Artifice] = -1 + rawExplorationRolls.filter(r => r == 2).length;
    $character.statGen_Roll[StatEnum.Tuning] = -1 + rawExplorationRolls.filter(r => r == 3).length;
    rawExplorationRollsString = rawExplorationRolls?.join((", ")) ?? "";
  }
  let explorationPointSum = 0;
  $: if ($character.explorationStatGenMethod === StatGenMethodEnum.Manual) {
    if ($character.statGen_Manual[StatEnum.Might] == null) $character.statGen_Manual[StatEnum.Might] = -1;
    if ($character.statGen_Manual[StatEnum.Artifice] == null) $character.statGen_Manual[StatEnum.Artifice] = -1;
    if ($character.statGen_Manual[StatEnum.Tuning] == null) $character.statGen_Manual[StatEnum.Tuning] = -1;
    explorationPointSum = 3 + ($character.statGen_Manual[StatEnum.Might]??-1) + ($character.statGen_Manual[StatEnum.Artifice]??-1) + ($character.statGen_Manual[StatEnum.Tuning]??-1);
  } else {
    explorationPointSum = 3 + ($character.statGen_Roll[StatEnum.Might]??-1) + ($character.statGen_Roll[StatEnum.Artifice]??-1) + ($character.statGen_Roll[StatEnum.Tuning]??-1);
  }
  let explorationImprovementSum = 0;
  $: explorationImprovementSum = ($character.statImprovements.Might??0) - ($character.statImprovements.Artifice??0) - ($character.statImprovements.Tuning??0);

    
</script>

<img src="/img/icons/PlusPlusIcon.svg" alt="" height="50px"/>
<h1> Stats & Skills Builder </h1>

<div class="sheet-block">
  <h2>Social Stats</h2>
  
  <table>
    <tr>
      <td></td>
      <th>base</th>
      <th>level</th>
      <th>total</th>
    </tr>
    <tr>
      <td><label for="stat-candor-input">Candor</label></td>
      {#if $character.socialStatGenMethod === StatGenMethodEnum.Manual}
        <td><input id="stat-candor-input" type="number" bind:value={$character.statGen_Manual[StatEnum.Candor]}/></td>
      {:else}
        <td><input id="stat-candor-input" type="text" value={$character.statGen_Roll[StatEnum.Candor]} disabled/></td>
      {/if}
      <td><input type="number" bind:value={$character.statImprovements[StatEnum.Candor]}/></td>
      <td><input type="text" value={$character.GetStat(StatEnum.Candor)} disabled/></td>
    </tr>
    <tr>
      <td><label for="stat-conscious-input">Conscious</label></td>
      {#if $character.socialStatGenMethod === StatGenMethodEnum.Manual}
        <td><input id="stat-conscious-input" type="number" bind:value={$character.statGen_Manual[StatEnum.Conscious]}/></td>
      {:else}
        <td><input id="stat-candor-input" type="text" value={$character.statGen_Roll[StatEnum.Conscious]} disabled/></td>
      {/if}
      <td><input type="number" bind:value={$character.statImprovements[StatEnum.Conscious]}/></td>
      <td><input type="text" value={$character.GetStat(StatEnum.Conscious)} disabled/></td>
    </tr>
    <tr>
      <td><label for="stat-cunning-input">Cunning</label></td>
      {#if $character.socialStatGenMethod === StatGenMethodEnum.Manual}
        <td><input id="stat-cunning-input" type="number" bind:value={$character.statGen_Manual[StatEnum.Cunning]}/></td>
      {:else}
        <td><input id="stat-candor-input" type="text" value={$character.statGen_Roll[StatEnum.Cunning]} disabled/></td>
      {/if}
      <td><input type="number" bind:value={$character.statImprovements[StatEnum.Cunning]}/></td>
      <td><input type="text" value={$character.GetStat(StatEnum.Cunning)} disabled/></td>
    </tr>
    <tr>
      <td></td>
      {#if $character.socialStatGenMethod === StatGenMethodEnum.Manual}
        <th> <span class:red={socialPointSum != baseStatPoints}>{baseStatPoints - socialPointSum}</span>/{baseStatPoints} </th>
      {:else}
        <td></td>
      {/if}
      <th> <span class:red={baseStatPoints - $character.StatPoints != socialImprovementSum}>{baseStatPoints - $character.StatPoints - socialImprovementSum}</span>/{baseStatPoints - $character.StatPoints} </th>
      <td></td>
    </tr>
  </table>

  <div class="sheet-row">
    <div class="toggle-bg">
      <button class:active={$character.socialStatGenMethod === StatGenMethodEnum.Manual} on:click={()=>{ $character.socialStatGenMethod = StatGenMethodEnum.Manual }}>Manual</button>
      <button class:active={$character.socialStatGenMethod === StatGenMethodEnum.Roll} on:click={()=>{ $character.socialStatGenMethod = StatGenMethodEnum.Roll }}>Roll</button>
    </div>
  </div>

  <div class="sheet-section">
    {#if $character.socialStatGenMethod === StatGenMethodEnum.Roll}
      <div class="sheet-row">
        <button on:click={rollSocialStats}>{socialPointSum != baseStatPoints?"":"Re-"}Roll {baseStatPoints}d3</button> =&gt; <input type="string" style="width: {baseStatPoints*1.2}em;" value={ rawSocialRollsString } disabled/>
      </div>
    {/if}
  </div>
</div>

<div class="sheet-block">
  <h2>Exploration Stats</h2>
  
  <table>
    <tr>
      <td></td>
      <th>base</th>
      <th>level</th>
      <th>total</th>
    </tr>
    <tr>
      <td><label for="stat-might-input">Might</label></td>
      {#if $character.explorationStatGenMethod === StatGenMethodEnum.Manual}
        <td><input id="stat-might-input" type="number" bind:value={$character.statGen_Manual[StatEnum.Might]}/></td>
      {:else}
        <td><input id="stat-might-input" type="text" value={$character.statGen_Roll[StatEnum.Might]} disabled/></td>
      {/if}
      <td><input type="number" bind:value={$character.statImprovements[StatEnum.Might]}/></td>
      <td><input type="text" value={$character.GetStat(StatEnum.Might)} disabled/></td>
    </tr>
    <tr>
      <td><label for="stat-artifice-input">Artifice</label></td>
      {#if $character.explorationStatGenMethod === StatGenMethodEnum.Manual}
        <td><input id="stat-artifice-input" type="number" bind:value={$character.statGen_Manual[StatEnum.Artifice]}/></td>
      {:else}
        <td><input id="stat-artifice-input" type="text" value={$character.statGen_Roll[StatEnum.Artifice]} disabled/></td>
      {/if}
      <td><input type="number" bind:value={$character.statImprovements[StatEnum.Artifice]}/></td>
      <td><input type="text" value={$character.GetStat(StatEnum.Artifice)} disabled/></td>
    </tr>
    <tr>
      <td><label for="stat-tuning-input">Tuning</label></td>
      {#if $character.explorationStatGenMethod === StatGenMethodEnum.Manual}
        <td><input id="stat-tuning-input" type="number" bind:value={$character.statGen_Manual[StatEnum.Tuning]}/></td>
      {:else}
        <td><input id="stat-tuning-input" type="text" value={$character.statGen_Roll[StatEnum.Tuning]} disabled/></td>
      {/if}
      <td><input type="number" bind:value={$character.statImprovements[StatEnum.Tuning]}/></td>
      <td><input type="text" value={$character.GetStat(StatEnum.Tuning)} disabled/></td>
    </tr>
    <tr>
      <td></td>
      {#if $character.explorationStatGenMethod === StatGenMethodEnum.Manual}
        <th> <span class:red={baseStatPoints != explorationPointSum}>{baseStatPoints - explorationPointSum}</span>/{baseStatPoints} </th>
      {:else}
        <td></td>
      {/if}
      <th> <span class:red={baseStatPoints - $character.StatPoints != explorationImprovementSum}>{baseStatPoints - $character.StatPoints - explorationImprovementSum}</span>/{baseStatPoints - $character.StatPoints} </th>
      <td></td>
    </tr>
  </table>

  <div class="sheet-row">
    <div class="toggle-bg">
      <button class:active={$character.explorationStatGenMethod === StatGenMethodEnum.Manual} on:click={()=>{ $character.explorationStatGenMethod = StatGenMethodEnum.Manual }}>Manual</button>
      <button class:active={$character.explorationStatGenMethod === StatGenMethodEnum.Roll} on:click={()=>{ $character.explorationStatGenMethod = StatGenMethodEnum.Roll }}>Roll</button>
    </div>
  </div>
  
  <div class="sheet-section">
    {#if $character.explorationStatGenMethod === StatGenMethodEnum.Roll}
      <div class="sheet-row">
        <button on:click={rollExplorationStats}>{explorationPointSum != baseStatPoints?"":"Re-"}Roll {baseStatPoints}d3</button> =&gt; <input type="string" style="width: {baseStatPoints*1.2}em;" value={ rawExplorationRollsString } disabled/>
      </div>
    {/if}
  </div>
</div>

<style>
.red {
  color: red;
}

.sheet-block {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  justify-items: center;
  align-content: center;
  text-align: left;
}

.sheet-section {
  display: flex;
  flex-flow: column;
  align-items: center;
}

.sheet-row {
  display: flex;
  flex-flow: row;
  align-items: center;
}

table {
  margin-left: auto;
  margin-right: auto;
  padding: 8px;
}

table td {
  font-size: 12pt;
  line-height: 12pt;
  text-align: left;
}

table input {
  width: 3em;
  text-align: center;
}

table > tr:first-of-type > th {
  text-align: center;
  font-size: 10pt;
  line-height: 10pt;
  padding: 5px;
  border: solid 1px gray;
  border-bottom: 0px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

table > tr:last-of-type > th {
  text-align: center;
  font-size: 10pt;
  line-height: 10pt;
  padding: 5px;
  border: solid 1px gray;
  border-top: 0px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

</style>