<script lang="ts">
    import type { SvelteComponent } from 'svelte';
    import Die from '../../lib/Die.svelte';
    
    export let location: string = "";

    let nextId = 0
    let diceData :Array<{id :number, faces :number, result :number, active :boolean}> = []
    let diceComps :Array<SvelteComponent> = []
    function addDie( sides :number ) {
        diceData = diceData.concat({
            id: nextId++,
            faces: sides,
            result: 0,
            active: false
        })
    }
    // Handle die removal with null scan
	$: diceComps = diceComps.filter( c => c );


    // Aggregate the current selection whenever it changes
    let diceAgg = { active: 0, sum: 0, activeSum: 0, low: Infinity, high: -Infinity, activeLow: Infinity, activeHigh: -Infinity }
    $: diceAgg = diceData.reduce( (agg, die) => {
        if (agg.hasOwnProperty( die.faces )) agg[die.faces] = agg[die.faces] + 1;
        else agg[die.faces] = 1;
        agg.sum += die.result;
        if (die.result < agg.low) agg.low = die.result;
        if (die.result > agg.high) agg.high = die.result;
        if (die.active) {
            agg.active = agg.active +1;
            agg.activeSum += die.result;
            if (die.result < agg.activeLow) agg.activeLow = die.result;
            if (die.result > agg.activeHigh) agg.activeHigh = die.result;
        }
        return agg;
    }, { active: 0, sum: 0, activeSum: 0, low: Infinity, high: -Infinity, activeLow: Infinity, activeHigh: -Infinity } )

    function toggleDice() {
        if (diceAgg.active == diceData.length) {
            diceData.forEach( d => d.active = false );
        }
        else {
            diceData.forEach( d => d.active = true );
        }
        diceData = diceData;
    }

    function rerollDice() {
        if (diceAgg.active == 0) diceComps.filter( d => d ).forEach( d => d.roll() )
        else diceComps.filter( d => d ).forEach( d => d.rollIfActive() )
    }

    function removeDice() {
        if (diceAgg.active == 0) diceData = [];
        else diceData = diceData.filter( d => !d.active );
    }

    let modifier = 1
</script>


<div class="page">
    <h1>Dice Roller</h1>
    
    <h3 style="margin-bottom:0;">ADD DICE</h3>
    <hr class="underule">
    <div class="dice-button-box">
        {#each [2,4,6,8,10,12,20] as s}
            <button type="button" class="die-button" on:click={()=>addDie(s)}
                style="background-image: url('/img/dice/d{s}-inverted.svg');">
                {#if (diceAgg[s] ?? 0) == 0} d{s}
                {:else if (diceAgg[s] > 9)} {diceAgg[s]}
                {:else} {diceAgg[s]}d{s}
                {/if}
            </button>
        {/each}
        <button type="button" class="die-button" on:click={()=>addDie(-1)}
            style="background-image: url('/img/dice/dF-inverted.svg');">
            {#if (diceAgg[-1] ?? 0) == 0} dF
            {:else if (diceAgg[-1] > 9)} {diceAgg[-1]}
            {:else} {diceAgg[-1]}dF
            {/if}
        </button>
    </div>
    
    <div class="total-readout"><span>Total:&nbsp;{diceComps.length}</span> <span>Selected:&nbsp;{diceAgg.active}</span></div>

    <div class="operation-button-box">
        <button class="button-outlined" disabled={diceData.length <= 0} on:click={removeDice}> {diceAgg.active == 0 ? "Clear All" : "Clear " + String(diceAgg.active) } </button>
        <button class="button-outlined" disabled={diceData.length <= 0} on:click={toggleDice}> {diceAgg.active == diceData.length ? "Select None" : "Select All"} </button>
        <button class="button-outlined" disabled={diceData.length <= 0} on:click={rerollDice}> {diceAgg.active == 0 ? "Reroll All" : "Reroll " + String(diceAgg.active) } </button>
    </div>
    
    <div class="dice-box">
        {#each diceData as die, i (die.id)}
            <Die bind:this={diceComps[i]} faces={die.faces} bind:result={die.result} bind:active={die.active} />
        {/each}
    </div>

    <h3 style="margin-bottom:0;">{#if diceAgg.active == 0} SUMMARY {:else} SELECTION SUMMARY {/if}</h3>
    <hr class="underule">
    <div class="result-summary">
        <div>
            <h4 class="text-center" style="margin:0;"> SUM </h4>
            <h3 class="result" style="width: 120px; margin: 0 auto 0 auto;">
                {#if diceAgg.active == 0}
                    {diceAgg.sum}
                {:else}
                    {diceAgg.activeSum}
                {/if}
            </h3>
        </div>
        <div class="result-summary">
            <div>
                <h4 class="text-center" style="margin:0;"> LOW </h4>
                <h3 class="result" style="width: 120px; margin: 0 auto 0 auto;">
                    {#if diceAgg.low != Infinity}
                        {#if diceAgg.active == 0}
                            {diceAgg.low}
                        {:else}
                            {diceAgg.activeLow}
                        {/if}
                    {:else}
                        0
                    {/if}
                </h3>
            </div>
            <div>
                <h4 class="text-center" style="margin:0;"> HIGH </h4>
                <h3 class="result" style="width: 120px; margin: 0 auto 0 auto;">
                    {#if diceAgg.low != Infinity}
                        {#if diceAgg.active == 0}
                            {diceAgg.high}
                        {:else}
                            {diceAgg.activeHigh}
                        {/if}
                    {:else}
                        0
                    {/if}
                </h3>
            </div>
        </div>
    </div>

    <h3 style="margin-top: 48px; margin-bottom:0;">MODIFIER</h3>
    <hr class="underule">
    <div class="result-modifier">
        <input bind:value={modifier} class="modifier-input" type=number>
        <input bind:value={modifier} class="modifier-range" type=range min=-15 max=15>
    </div>

    <div class="result-summary">
        <div>
            <h4 class="text-center" style="margin:0;"> SUM </h4>
            <h3 class="result" style="width: 120px; margin: 0 auto 0 auto;">
                {#if diceAgg.active == 0}
                    {diceAgg.sum + modifier}
                {:else}
                    {diceAgg.activeSum + modifier}
                {/if}
            </h3>
        </div>
        <div class="result-summary">
            <div>
                <h4 class="text-center" style="margin:0;"> LOW </h4>
                <h3 class="result" style="width: 120px; margin: 0 auto 0 auto;">
                    {#if diceAgg.low != Infinity}
                        {#if diceAgg.active == 0}
                            {diceAgg.low + modifier}
                        {:else}
                            {diceAgg.activeLow + modifier}
                        {/if}
                    {:else}
                        {modifier}
                    {/if}
                </h3>
            </div>
            <div>
                <h4 class="text-center" style="margin:0;"> HIGH </h4>
                <h3 class="result" style="width: 120px; margin: 0 auto 0 auto;">
                    {#if diceAgg.low != Infinity}
                        {#if diceAgg.active == 0}
                            {diceAgg.high + modifier}
                        {:else}
                            {diceAgg.activeHigh + modifier}
                        {/if}
                    {:else}
                        {modifier}
                    {/if}
                </h3>
            </div>
        </div>
    </div>
</div>

<style>

.dice-button-box {
    display: flex;
    flex-wrap: wrap;
    max-width: calc( 64px * 4 );
    margin: 10px auto;
    justify-content: center;
}
.die-button {
    display: inline-flex;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    color: rgb(210, 210, 210);
    width: 64px;
    height: 64px;
    margin: 0px;
    border: 0px;
    padding: 0px;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
}

.total-readout {
    font-size: 1em;
}
.total-readout > span {
    margin: 0 0.25em;
}

.operation-button-box {
    display: grid;
    min-height: 4em;
    max-width: calc( 1em*24 );
    grid-template-columns: 32% 32% 32%;
    justify-content: center;
    margin: 10px auto;
}

.dice-box {
    display: flex;
    flex-wrap: wrap;
    max-width: calc( 48px * 5 );
    min-height: 60px;
    margin: 10px auto 10px auto;
    justify-content: center;
}

.underule {
    max-width: 256px;
    border-color: rgb(88, 88, 88);
    margin: 0 auto 0 auto;
}

.result-summary {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
.result-summary > div {
    margin: 4px;
}
.result-summary > .result-summary {
    margin: 0;
}

.result {
    font-size: 1.17em;
    font-weight: bold;

    color: rgb(204, 204, 204);
    width: 120px;
    margin: 0 auto 0 auto;
    padding: 0;
    border: 1px solid rgb(204, 204, 204);
    justify-self: start;
}

.result-modifier {
    display: flex;
    justify-content: center;
}
.modifier-input {
    font-size: 1.17em;
    font-weight: bold;
    text-align: center;

    color: rgb(204, 204, 204);
    width: 3em;
    flex-basis: auto;
    margin: 8px;
    padding: 0;
    border: 1px solid rgb(204, 204, 204);
}
.modifier-range {
    width: 200px;
    flex-basis: auto;
    margin: 8px;
    padding: 0;
    border: 1px solid rgb(204, 204, 204);
}

</style>