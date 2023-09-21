<script lang="ts">
    import { localCharacter, getHnsCharacter } from '../../lib/stores'
    import { onMount } from 'svelte';
    import { NIL, validate } from 'uuid';
    import type { Writable } from 'svelte/store';
    import type { HnsCharacter } from '../../lib/HnsCharacter';

    export let id: string = NIL;
    $: console.log( "id = '" + id + "'" )

    let error: string|undefined = undefined;

    let character: Writable<HnsCharacter>;
    $: character = id == "local" ? localCharacter : getHnsCharacter(id)

    // TODO: Figure out how to nav back when in invalid id
    onMount(async () => {
        if (id !== "local" && !validate(id)) { 
            console.error( `Failed to load character with id '${id}'` );
            error = `Failed to load character with id '${id}'`
            return;
        }
    });
</script>

{#if error}
    <div>
        <h2>Error: {error}</h2>
    </div>
{:else if !character || $character == null}
    <div>
        <h2>Loading...</h2>
    </div>
{:else}
    <div>
        <h2>Social Stats</h2>
        <div>
            <div class="roll-grid">
                {#each Object.entries($character.socialProfile.stats) as [stat, {mod}] }
                    <div class="grid-stat">
                        <h3>{stat}</h3>
                        <button><img src="/img/dice/d20.png" width="74" alt="">+{mod}</button>
                    </div>
                {/each}
            </div>
        </div>
        <h2>Social Passives</h2>
        <div>
            <div class="roll-grid">
                {#each Object.entries($character.socialProfile.stats) as [stat, {mod}] }
                    <div class="grid-stat">
                        <h3>{stat}</h3>
                        <button><img src="/img/dice/d20.png" width="74" alt="">+{mod}</button>
                    </div>
                {/each}
            </div>
        </div>
    </div>
{/if}

<style src="CharacterSheet.css">

h2 { font-size: 18pt; margin-top: 6pt; margin-bottom: 2pt; }
h3 { font-size: 16pt; margin-top: 6pt; margin-bottom: 2pt; }
h4 { font-size: 14pt; margin-top: 6pt; margin-bottom: 2pt; }
p { font-size: 12pt; margin-top: 6pt; margin-bottom: 2pt; }

.roll-grid {
    display: grid;
    background-color: #000000;
    color: #FDF6E3;
    grid-template-columns: auto auto auto auto;
    gap: 10px;
    margin: 0px;
    padding: 0px;
}

.roll-grid2 {
    display: grid;
    background-color: #000000;
    color: #FDF6E3;
    grid-template-columns: auto auto auto auto auto;
    gap: 10px;
    margin: 0px;
    padding: 0px;
}

.roll-grid-header {
    background-color: black;
    font-size: 14pt;
    writing-mode: vertical-lr;
    transform: rotate(-180deg);
    position: sticky;
    left: 0px;
    margin: -6px 0px;
    padding: 5px 0px;
    border: solid rgb(68, 68, 68);
}

.roll-grid > h2,
.roll-grid > h3,
.roll-grid > h4,
.roll-grid > p {
    width: calc( 84vw - 10px - 16px - 30px );
    max-width: calc( 550pt - 10px - 16px - 30px );
    text-align: left;
    margin: 0px;
}

.grid-header {
    position: sticky;
    left: 0px;
    width: auto;
    max-width: none;
    background-color: black;
    grid-column-start: 1;
    grid-column-end: 5;
    margin: 0px;
    padding: 0px 10px;
    text-align: left;
}

.grid-stat {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    background-color: black;
    margin: 0px -5px;
    padding: 10px;
}

.grid-stat button {
    width: 84px;
    height: 84px;
    padding: 0px;
    align-self: center;
    justify-self: center;
}

</style>