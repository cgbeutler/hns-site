<script lang="ts">
    import type { SvelteComponent } from 'svelte';
    import Die from '../../../lib/Die.svelte';
    
    export let location: string = "";

    let diceData :Array<{id :number, result :number, active :boolean}> = [{
            id: 0,
            result: 0,
            active: false
        },{
            id: 1,
            result: 0,
            active: false
        },{
            id: 2,
            result: 0,
            active: false
        }]
    let diceComps :Array<SvelteComponent> = []

    // Aggregate the current selection whenever it changes
    let totalDice = { active: 0, sum: 0, hasPair: false, stunt: 0 }
    $: totalDice = diceData.reduce( (agg,dieData) => {
        if (!agg.hasOwnProperty( dieData.result )) agg[dieData.result] = 1;
        else { agg[dieData.result] += 1; agg.hasPair = true; }
        agg.sum += dieData.result;
        if (dieData.active) {
            agg.active = agg.active +1;
        }
        return agg;
    }, { active: 0, sum: 0, hasPair: Boolean(false), stunt: diceData[2].result } )

    function rerollDice() {
        if (totalDice.active == 0) diceComps.filter( d => d ).forEach( d => d.roll() )
        else diceComps.filter( d => d ).forEach( d => d.rollIfActive() )
    }

    let modifier = 0
</script>


<div class="page">
    <h1>Age Dice Roller</h1>
    <p>Roll 3d6 and sum them. One d6 is special and used for success quality and stunt points.</p>
    
    <div style="justify-content: center;">
        <button class="button-outlined" disabled={diceData.length <= 0} on:click={rerollDice}> {totalDice.active == 0 ? "Reroll All" : "Reroll " + String(totalDice.active) } </button>
    </div>
    
    <div class="dice-box">
        {#each diceData as die, i (die.id)}
            <Die bind:this={diceComps[i]} showPips={true} bind:result={die.result} bind:active={die.active} invert={i == 2} />
        {/each}
    </div>

    <div class="result-summary">
        <div>
            <h2 class="text-center" style="margin-bottom:0;">
                Sum
            </h2>
            <h3 class="result" style="width: 128px; margin: 0 auto 0 auto;">
                {totalDice.sum}
            </h3>
        </div>
        <div>
            <h2 class="text-center" style="margin-bottom:0;">
                {#if totalDice.hasPair}
                Stunt!
                {:else}
                Quality
                {/if}
            </h2>
            <h3 class="result" style="width: 100px; margin: 0 auto 0 auto;">
                {totalDice.stunt}
            </h3>
        </div>
    </div>

    <div class="result-mod">
        <div><h2 style="line-height:3em;">+</h2></div>
        <div>
            <h2 class="text-center" style="margin-bottom:0;">
                Mod
            </h2>
            <input type=number class="result" style="width: 100px; margin: 0 auto 0 auto;" bind:value={modifier}>
            <input type=range class="result" style="width: 100px; margin: 0 auto 0 auto;" bind:value={modifier} min=-10 max=10>
        </div>
        <div><h2 style="line-height:3em;">=</h2></div>
        <div>
            <h2 class="text-center" style="margin-bottom:0;">
                Result
            </h2>
            <h3 class="result" style="width: 100px; margin: 0 auto 0 auto;">
                {totalDice.sum + modifier}
            </h3>
        </div>
    </div>


    <p>Check out Fantasy Age and the other Age RPGs by <a href="https://greenronin.com/">Green&nbsp;Ronin</a>&nbsp;(Not&nbsp;affiliated)</p>

</div>

<style>

.dice-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    min-height: 60px;
    margin: 10px;
}

.result-summary {
    display: grid;
    margin: 1em 0 1em 0;
    grid-template-columns: 190px 150px;
    justify-content: center;
}
.result-mod {
    display: grid;
    margin: 1em 0 1em 0;
    grid-template-columns: 1em 150px 1em 150px;
    justify-content: center;
}

.result {
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;

    color: rgb(204, 204, 204);
    width: 4.2em;
    margin: 0;
    padding: 0;
    border: 1px solid rgb(204, 204, 204);
    justify-self: start;
    text-align: center;
}

</style>