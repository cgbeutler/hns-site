<script lang="ts">
    import { onMount } from "svelte";
    import type { Writable } from "svelte/store";
    import { StatEnum, StatGenMethodEnum, type PlayerCharacter } from "../../../lib/PlayerCharacter";

    let error: string|undefined = undefined;
    export let character: Writable<PlayerCharacter> | undefined;
    onMount(async () => {
        if (!character) { 
            error = `Failed to load character`
            return;
        }
    });
    
    let rawSocialRolls: Array<number> | undefined;
    let rawSocialRollsString: string = "";
    function rollSocialStats() {
        rawSocialRolls = Array.from( { length:5 }, () => Math.floor( Math.random() * 3 ) + 1 );
    }
    $: if (rawSocialRolls && rawSocialRolls.length == 5 && $character) {
        $character.statGen_Roll[StatEnum.Candor] = -1 + rawSocialRolls.filter(r => r == 1).length;
        $character.statGen_Roll[StatEnum.Conscious] = -1 + rawSocialRolls.filter(r => r == 2).length;
        $character.statGen_Roll[StatEnum.Cunning] = -1 + rawSocialRolls.filter(r => r == 3).length;
        rawSocialRollsString = rawSocialRolls?.join((", ")) ?? "";
    }
    let socialPointSum = 0;
    $: if (!$character) { //wait
    } else if($character.socialStatGenMethod === StatGenMethodEnum.Manual) {
        if ($character.statGen_Manual[StatEnum.Candor] == null) $character.statGen_Manual[StatEnum.Candor] = -1;
        if ($character.statGen_Manual[StatEnum.Conscious] == null) $character.statGen_Manual[StatEnum.Conscious] = -1;
        if ($character.statGen_Manual[StatEnum.Cunning] == null) $character.statGen_Manual[StatEnum.Cunning] = -1;
        socialPointSum = 3 + ($character.statGen_Manual[StatEnum.Candor]??-1) + ($character.statGen_Manual[StatEnum.Conscious]??-1) + ($character.statGen_Manual[StatEnum.Cunning]??-1);
    } else if ($character?.socialStatGenMethod === StatGenMethodEnum.Roll) {
        socialPointSum = 3 + ($character?.statGen_Roll[StatEnum.Candor]??-1) + ($character?.statGen_Roll[StatEnum.Conscious]??-1) + ($character?.statGen_Roll[StatEnum.Cunning]??-1);
    }

    let rawExplorationRolls: Array<number> | undefined;
    let rawExplorationRollsString: string = "";
    function rollExplorationStats() {
        rawExplorationRolls = Array.from( { length:5 }, () => Math.floor( Math.random() * 3 ) + 1 );
    }
    $: if (rawExplorationRolls && rawExplorationRolls.length == 5 && $character) {
        $character.statGen_Roll[StatEnum.Might] = -1 + rawExplorationRolls.filter(r => r == 1).length;
        $character.statGen_Roll[StatEnum.Artifice] = -1 + rawExplorationRolls.filter(r => r == 2).length;
        $character.statGen_Roll[StatEnum.Tuning] = -1 + rawExplorationRolls.filter(r => r == 3).length;
        rawExplorationRollsString = rawExplorationRolls?.join((", ")) ?? "";
    }
    let explorationPointSum = 0;
    $: if (!$character) { //wait
    } else if ($character.socialStatGenMethod === StatGenMethodEnum.Manual) {
        if ($character.statGen_Manual[StatEnum.Might] == null) $character.statGen_Manual[StatEnum.Might] = -1;
        if ($character.statGen_Manual[StatEnum.Artifice] == null) $character.statGen_Manual[StatEnum.Artifice] = -1;
        if ($character.statGen_Manual[StatEnum.Tuning] == null) $character.statGen_Manual[StatEnum.Tuning] = -1;
        explorationPointSum = 3 + ($character.statGen_Manual[StatEnum.Might]??-1) + ($character.statGen_Manual[StatEnum.Artifice]??-1) + ($character.statGen_Manual[StatEnum.Tuning]??-1);
    } else if ($character?.socialStatGenMethod === StatGenMethodEnum.Roll) {
        explorationPointSum = 3 + ($character.statGen_Roll[StatEnum.Might]??-1) + ($character.statGen_Roll[StatEnum.Artifice]??-1) + ($character.statGen_Roll[StatEnum.Tuning]??-1);
    }

    
</script>

{#if error}
    <div class="sheet-block">
        <h2>Cannot Load Stats</h2>
        <p>Error: {error}</p>
    </div>
{:else if !character || !$character }
    <div class="sheet-block">
        <h2>Loading...</h2>
    </div>
{:else}
    <div class="sheet-block">
        <h2>Social Stats</h2> <br>
        <div class="sheet-row">
            Generation mode:
            <div class="toggle-bg">
                <button class:active={$character.socialStatGenMethod === StatGenMethodEnum.Manual} on:click={()=>{ $character.socialStatGenMethod = StatGenMethodEnum.Manual }}>Manual</button>
                <button class:active={$character.socialStatGenMethod === StatGenMethodEnum.Roll} on:click={()=>{ $character.socialStatGenMethod = StatGenMethodEnum.Roll }}>Roll</button>
            </div>
        </div>

        {#if $character.socialStatGenMethod === StatGenMethodEnum.Manual}
            <div class="sheet-section">
                <div class="sheet-row">
                    Points remaining: <span class:red={socialPointSum>5}>{5 - socialPointSum}</span>
                </div>
                <table>
                    <tr><td><label for="stat-candor-input">Candor</label></td> <td><input id="stat-candor-input" type="number" bind:value={$character.statGen_Manual[StatEnum.Candor]}/></td></tr>
                    <tr><td><label for="stat-conscious-input">Conscious</label></td> <td><input id="stat-conscious-input" type="number" bind:value={$character.statGen_Manual[StatEnum.Conscious]}/></td></tr>
                    <tr><td><label for="stat-cunning-input">Cunning</label></td> <td><input id="stat-cunning-input" type="number" bind:value={$character.statGen_Manual[StatEnum.Cunning]}/></td></tr>
                </table>
            </div>
        {:else if $character.socialStatGenMethod === StatGenMethodEnum.Roll}
            <div class="sheet-section">
                <div class="sheet-row">
                    <button on:click={rollSocialStats}>Roll 5d3</button> =&gt; <input type="string" value={ rawSocialRollsString } disabled/>
                </div>
                <table>
                {#if (($character?.statGen_Roll[StatEnum.Candor]??-1) + ($character?.statGen_Roll[StatEnum.Conscious]??-1) + ($character?.statGen_Roll[StatEnum.Cunning]??-1)) === 2 }
                    <tr><td><label for="stat-candor-input">Candor</label></td> <td><input id="stat-candor-input" type="number" value={$character?.statGen_Roll[StatEnum.Candor]??-2}/></td></tr>
                    <tr><td><label for="stat-conscious-input">Conscious</label></td> <td><input id="stat-conscious-input" type="number" value={$character?.statGen_Roll[StatEnum.Conscious]??-2}/></td></tr>
                    <tr><td><label for="stat-cunning-input">Cunning</label></td> <td><input id="stat-cunning-input" type="number" value={$character?.statGen_Roll[StatEnum.Cunning]??-2}/></td></tr>
                {:else}
                    Stats Not Rolled Yet
                {/if}
                </table>
            </div>
        {/if}

    </div>
    <div class="sheet-block">

        <h2>Exploration Stats</h2>

        <div class="sheet-row">
            Generation mode:
            <div class="toggle-bg">
                <button class:active={$character.explorationStatGenMethod === StatGenMethodEnum.Manual} on:click={()=>{ $character.explorationStatGenMethod = StatGenMethodEnum.Manual }}>Manual</button>
                <button class:active={$character.explorationStatGenMethod === StatGenMethodEnum.Roll} on:click={()=>{ $character.explorationStatGenMethod = StatGenMethodEnum.Roll }}>Roll</button>
            </div>
        </div>
        
        {#if $character.explorationStatGenMethod === StatGenMethodEnum.Manual}
            <div class="sheet-section">
                <div class="sheet-row">
                    Points remaining: <span class:red={explorationPointSum>5}>{5 - explorationPointSum}</span>
                </div>
                <table>
                    <tr><td><label for="stat-might-input">Might</label></td> <td><input id="stat-might-input" type="number" bind:value={$character.statGen_Manual[StatEnum.Might]}/></td></tr>
                    <tr><td><label for="stat-artifice-input">Artifice</label></td> <td><input id="stat-artifice-input" type="number" bind:value={$character.statGen_Manual[StatEnum.Artifice]}/></td></tr>
                    <tr><td><label for="stat-tuning-input">Tuning</label></td> <td><input id="stat-tuning-input" type="number" bind:value={$character.statGen_Manual[StatEnum.Tuning]}/></td></tr>
            </div>
        {:else if $character.explorationStatGenMethod === StatGenMethodEnum.Roll}
            <div class="sheet-section">
                <div class="sheet-row">
                    <button on:click={rollExplorationStats}>Roll 5d3</button> =&gt; <input type="string" value={ rawExplorationRollsString } disabled/>
                </div>
                <table>
                {#if (($character?.statGen_Roll[StatEnum.Might]??-1) + ($character?.statGen_Roll[StatEnum.Artifice]??-1) + ($character?.statGen_Roll[StatEnum.Tuning]??-1)) === 2 }
                    <tr><td><label for="stat-might-input">Might</label></td><td><input id="stat-might-input" type="number" value={$character?.statGen_Roll[StatEnum.Might]??-2}/></td></tr>
                    <tr><td><label for="stat-artifice-input">Artifice</label></td><td><input id="stat-artifice-input" type="number" value={$character?.statGen_Roll[StatEnum.Artifice]??-2}/></td></tr>
                    <tr><td><label for="stat-tuning-input">Tuning</label></td><td><input id="stat-tuning-input" type="number" value={$character?.statGen_Roll[StatEnum.Tuning]??-2}/></td></tr>
                {:else}
                    Stats Not Rolled Yet
                {/if}
                </table>
            </div>
        {/if}
    </div>
    
    <div class="sheet-block">
        Including Level Improvements:
        <table>
            <tr>
                <td>Candor</td><td>{$character.GetStatString(StatEnum.Candor)}</td>
                <td>Conscious</td><td>{$character.GetStatString(StatEnum.Conscious)}</td>
                <td>Cunning</td><td>{$character.GetStatString(StatEnum.Cunning)}</td>
            </tr>
            <tr>
                <td>Might</td><td>{$character.GetStatString(StatEnum.Might)}</td>
                <td>Artifice</td><td>{$character.GetStatString(StatEnum.Artifice)}</td>
                <td>Tuning</td><td>{$character.GetStatString(StatEnum.Tuning)}</td>
            </tr>
        </table>
    </div>
{/if}

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

.sheet-block hr {
    width: 100%;
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
}
input[type="string"] {
    width: 8em;
    text-align: center;
}
input[type="number"] {
    width: 3em;
    text-align: center;
}
</style>