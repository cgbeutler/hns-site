<script lang="ts">
    import { onMount } from "svelte";
    import type { Writable } from "svelte/store";
    import { SocialProfile, type HnsCharacter, type Stat } from "../../../lib/HnsCharacter";

    let error: string|undefined = undefined;
    export let character: Writable<HnsCharacter>;
    $: socialProfile = $character.socialProfile
    $: socialStats = Object.entries(socialProfile.stats)
    $: explorerProfile = $character.explorerProfile
    $: explorerStats = Object.entries(explorerProfile.stats)
    onMount(async () => {
        if (!character) { 
            error = `Failed to load character`
            return;
        }
    });
    
    let statMode: "manual" | "rand" | "buy" = "manual";
    
    const rollArrayOptions = [
        [-1, +2, +3],
        [+0, +1, +3],
        [+0, +2, +2],
        [+1, +1, +2],
        [+1, +1, +3],
        [+1, +2, +2],
        [+1, +1, +3],
        [+0, +2, +3]
    ]
    let rollArray: Array<number> | undefined;
    let rollArrayAssigned: Array<Boolean> | undefined;
    let rollArrayPicks: Array<string> | undefined;
    
    function pair<T>([ x, ...xs ]:Array<T>, [ y, ...ys ]:Array<T> = []): Array<Array<T>> { return [ [x,y], ...pair(xs, ys) ] }
    function interleave<T>([ x, ...xs ]:Array<T>, ys:Array<T> = []): Array<T> { return x === undefined ? ys : [ x, ...interleave (ys, xs) ] }
</script>

{#if error}
    <div class="sheet-block">
        <h2>Cannot Load Stats</h2>
        <p>Error: {error}</p>
    </div>
{:else if !character || $character == null}
    <div class="sheet-block">
        <h2>Loading...</h2>
    </div>
{:else}
    <div class="sheet-block">
        Current stats:
        <table>
            <tr>
                {#each Object.entries(socialProfile.stats) as [name,{mod}] }
                    <td>{name}</td><td>{mod >= 0 ? "+" : ""}{mod ?? 0}</td>
                {/each}
            </tr>
            <tr>
                {#each Object.entries(explorerProfile.stats) as [name,{mod}] }
                    <td>{name}</td><td>{mod >= 0 ? "+" : ""}{mod ?? 0}</td>
                {/each}
            </tr>
        </table>
        <br>
        <div>
            Stat creation mode:
            <div class="toggle-bg">
                <button class:active={statMode==="manual"} on:click={()=>{statMode="manual"}}>Manual</button>
                <button class:active={statMode==="rand"} on:click={()=>{statMode="rand"}}>Randomize</button>
                <button class:active={statMode==="buy"} on:click={()=>{statMode="buy"}}>Buy</button>
            </div>
        </div>
        {#if statMode==="manual"}
            <div>
                <h3>Manual Stat Entry</h3>
                
                <table>
                    <tr><td colspan="2"><h4>Social Stats</h4></td></tr>
                    {#each socialStats as [name,{mod}], i }
                        <tr>
                            <td><label for="stat-{name}-input">{name}</label></td><td><input id="stat-{name}-input" type="number" min="-10" max="10" bind:value={mod}/></td>
                        </tr>
                    {/each}
                </table>

                <table>
                    <tr><td colspan="2"><h4>Adventure Stats</h4></td></tr>
                    {#each Object.entries(explorerProfile.stats) as [name,{mod}] }
                        <tr>
                            <td><label for="stat-{name}-input">{name}</label></td><td><input id="stat-{name}-input" type="number" min="-10" max="10" bind:value={mod}/></td>
                        </tr>
                    {/each}
                </table>
            </div>
        {:else if statMode==="rand"}
            <div>
                <h3>Randomize Method</h3>
                <p> 1. Randomize which array is used by rolling a <span class="calc">d8</span> or pressing 'Roll':</p>
                <table>
                    <tr><td>1</td><td>[-1, +2, +3]</td><td>5</td><td>[+1, +1, +3]</td></tr>
                    <tr><td>2</td><td>[+0, +1, +3]</td><td>6</td><td>[+1, +2, +2]</td></tr>
                    <tr><td>3</td><td>[+0, +2, +2]</td><td>7</td><td>[+1, +1, +3]</td></tr>
                    <tr><td>4</td><td>[+1, +1, +2]</td><td>8</td><td>[+0, +2, +3]</td></tr>
                </table>
                <button on:click={() => {rollArray=rollArrayOptions[Math.floor(Math.random()*rollArrayOptions.length)]}}>Roll</button><br/>
                {#if rollArray}
                <label>Result: <input type="number" value={rollArray?.[0]??0}/><input type="number" value={rollArray?.[1]??0}/><input type="number" value={rollArray?.[2]??0}/></label>
                
                <p> 2. Select where each stat goes:</p>

                <input type="number" value={rollArray?.[0]??0}/><input type="number" value={rollArray?.[1]??0}/><input type="number" value={rollArray?.[2]??0}/>
                {/if}
            </div>
        {:else if statMode==="buy"}
            <div>
                <h3>Buy Method</h3>
                <p>TODO</p>
            </div>
        {/if}
    </div>
{/if}

<style>
table {
    margin-left: auto;
    margin-right: auto;
}
input {
    width: 2em;
    text-align: center;
}
</style>