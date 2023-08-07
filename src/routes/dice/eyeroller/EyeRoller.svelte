<script lang="ts">
    import type { SvelteComponent } from 'svelte';
    import Die from '../../../lib/Die.svelte';

    let nextId = 0
    let diceData :Array<{id :number, result :number, active :boolean}> = []
    let diceComps :Array<SvelteComponent> = []
    function addDie() {
        diceData = diceData.concat({
            id: nextId++,
            result: 0,
            active: false
        })
    }
    // Handle die removal with null scan
	$: diceComps = diceComps.filter( c => c );


    // Aggregate the current selection whenever it changes
    let totalDice = { active: 0, snakes: 0, bats: 0, fish: 0, rings: 0, pips: 0 }
    $: totalDice = diceData.reduce( (agg, die) => {
        if (die.active) { agg.active += 1; }
        if (die.result == 1) { agg.snakes += 1; agg.pips += 1; }
        else if (die.result == 2) { agg.bats += 1; agg.rings += 1; }
        else if (die.result == 3) { agg.fish += 1; agg.pips += 1; agg.rings += 1; }
        return agg;
    }, { active: 0, snakes: 0, bats: 0, fish: 0, rings: 0, pips: 0 } )

    function toggleDice() {
        if (totalDice.active == diceData.length) {
            diceData.forEach( d => d.active = false );
        }
        else {
            diceData.forEach( d => d.active = true );
        }
        diceData = diceData;
    }

    function rerollDice() {
        if (totalDice.active == 0) diceComps.filter( d => d ).forEach( d => d.roll() )
        else diceComps.filter( d => d ).forEach( d => d.rollIfActive() )
    }

    function removeDice() {
        if (totalDice.active == 0) diceData = [];
        else diceData = diceData.filter( d => !d.active );
    }


    function buildResultText( dice ) :string {
        var parts = [];
        parts.push( `${dice.snakes}\xa0snake${dice.snakes == 1? "":"s"}` );
        parts.push( `${dice.bats}\xa0bat${dice.bats == 1? "":"s"}` );
        parts.push( `${dice.fish}\xa0fish` );
        var whole = [ parts.join( "\xa0\xa0" ) ];
        parts = [];
        parts.push( `${dice.pips}\xa0pip${dice.pips == 1? "":"s"}` );
        parts.push( `${dice.rings}\xa0ring${dice.rings == 1? "":"s"}` );
        whole.push( parts.join( "\xa0\xa0" ) );
        return whole.join( "\r\n" );
    }

    let resultText :string = "";
    $: resultText = buildResultText( totalDice );

</script>

<div class="page">
    <div class="content-box">
        <h1>Eye Roller</h1>

        <button class="button-outlined" on:click={()=>addDie()}>
            {#if diceData.length == 0} Add 1dE
            {:else} Add to {diceData.length}dE
            {/if}
        </button>

        <div style="display: grid; grid-template-columns: 32% 32% 32%; justify-content: center;">
            <button class="button-outlined" disabled={diceData.length <= 0} on:click={removeDice}> {totalDice.active == 0 ? "Clear All" : "Remove " + String(totalDice.active) } </button>
            <button class="button-outlined" disabled={diceData.length <= 0} on:click={toggleDice}> {totalDice.active == diceData.length ? "Select None" : "Select All"} </button>
            <button class="button-outlined" disabled={diceData.length <= 0} on:click={rerollDice}> {totalDice.active == 0 ? "Reroll All" : "Reroll " + String(totalDice.active) } </button>
        </div>

        <div class="dice-box">
            {#each diceData as die, i (die.id)}
                <Die bind:this={diceComps[i]} faces={-2} bind:result={die.result} bind:active={die.active} />
            {/each}
        </div>


        <div class="text-center" style="font-size: small; white-space: pre;" id="result-view"> {resultText} </div>
    </div>
</div>

<div class="page">
    <div class="content-box">
        <h2>What are Eye Dice?</h2>
        <p>
        Eye dice are 6-sided dice that have one circle side, two pip sides, and three pip-in-circle sides.
        </p>

        <div class="die-diagram">
            <div></div>
            <Die faces={-2} result={2} active={false} enabled={false} />
            <div></div>
            <div></div>
            <Die faces={-2} result={3} active={false} enabled={false} />
            <Die faces={-2} result={1} active={false} enabled={false} />
            <Die faces={-2} result={3} active={false} enabled={false} />
            <Die faces={-2} result={3} active={false} enabled={false} />
            <div></div>
            <Die faces={-2} result={2} active={false} enabled={false} />
            <div></div>
            <div></div>
        </div>
        <p>
        Each side type can be referred to individually or in groups, which each have their own, unique chances of occurring.<br><br>
        The chances of each are:
        </p>
        
        <div class="die-list">
            <div><Die faces={-2} result={1} active={false} enabled={false} /></div> <div>&frac16; Snake</div>
            <div><Die faces={-2} result={2} active={false} enabled={false} /></div> <div>&frac13; Bat</div>
            <div><Die faces={-2} result={3} active={false} enabled={false} /></div> <div>&frac12; Fish</div>
            <div><Die faces={-2} result={1} active={false} enabled={false} /> <Die faces={-2} result={3} active={false} enabled={false} /></div> <div>&frac23; Pips</div>
            <div><Die faces={-2} result={2} active={false} enabled={false} /> <Die faces={-2} result={3} active={false} enabled={false} /></div> <div>&frac56; Rings</div>
        </div>

        <p>Rolling multiple eye dice for the same thing multiplies that fraction by itself number-of-dice times. For example, rolling 2dE for fish gives you a 50% * 50% = 25% chance of rolling all fish.</p>
    </div>
</div>

<style>
.die-diagram {
    display: grid;
    margin: auto;
    padding: auto;
    grid-template-columns: 48px 48px 48px 48px;
    justify-content: center;
}
.die-diagram div {
    display: inline-block;
    width: 48px;
    min-width: 48px;
    height: 48px;
    margin: 0px;
}

.die-list {
    display: grid;
    margin: auto;
    padding: auto;
    grid-template-columns: 144px 144px;
    justify-content: center;
}
.die-list > div:nth-child(2n-1) {
    display: flex;
    justify-content: right;
    align-items: center;
    padding-right: 4px;
}
.die-list > div:nth-child(2n) {
    display: flex;
    justify-content: left;
    align-items: center;
    padding-left: 4px;
}
</style>