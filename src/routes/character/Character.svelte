<script lang="ts">
    import { localCharacter, getHnsCharacter } from '../../lib/stores'
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-routing';
    import { NIL, validate } from 'uuid';
    import type { Writable } from 'svelte/store';
    import type { HnsCharacter } from '../../lib/HnsCharacter';

    export let id: string = NIL;
    $: console.log( "id = '" + id + "'" )

    let character: Writable<HnsCharacter>;
    $: character = id == "local" ? localCharacter : getHnsCharacter(id)

    // TODO: Figure out how to nav back when in invalid id
    onMount(async () => {
        if (id !== "local" && !validate(id)) { 
            console.error( "Failed to load character iwht id '" + id + "'" );
            navigate( "/characters" );
            return;
        }
        // if (!character) {
        //     console.error( "Failed to load character with id '" + id + "' or character was deleted" );
        //     navigate( "/characters", { replace: true } );
        // }
    });

    let nameInput: HTMLInputElement;
    $: if (nameInput) {
        let name = $character.name;
        if (name.length == 0) { nameInput.style.width = "Unnamed Character".length + "ch"; }
        else { nameInput.style.width = name.length + "em"; }
    }
</script>

{#if !character || $character == null}
    <div class="page">
        <h2>Loading...</h2>
    </div>
{:else}
    <div class="page">
        <input id="name-input" placeholder="Unnamed Character" bind:this={nameInput} bind:value={$character.name}><button class="edit-button" on:click={()=>nameInput.focus()}></button>
        <br/>
        <hr>
        Description
        {$character.background.description}
    </div>
    <div class="page">
        <h2>Sways</h2>
        <div class="scrollbox">
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
    <div class="page">
        <div class="">
            <div class="roll-grid2 scrollbox">
                <!--Headers-->
                <h2 class="roll-grid-header" style="top: 0px; grid-row: 1; grid-column: 1; z-index:1;">Aptitudes</h2>
                <h2 class="roll-grid-header" style="grid-row: 2; grid-column: 1;">Saves</h2>
                <h2 class="roll-grid-header" style="grid-row: 3 / 5; grid-column: 1;">Exploration</h2>
                <h2 class="roll-grid-header" style="grid-row: 5 / 7; grid-column: 1;">Knowledge</h2>
                <h2 class="roll-grid-header" style="grid-row: 7 / 9; grid-column: 1;">Equipment</h2>

                <div class="grid-stat grid-stat-sticky-top">
                    <h3>Might</h3>
                    <button><img src="/img/d6-char-sheet/d6-white-{$character.baseMight}.png" width="74" alt="[{$character.baseMight} white]"></button>
                </div>
                <div class="grid-stat grid-stat-sticky-top">
                    <h3>Finesse</h3>
                    <button><img src="/img/d6-char-sheet/d6-white-{$character.baseFinesse}.png" width="74" alt="[{$character.baseFinesse} white]"></button>
                </div>
                <div class="grid-stat grid-stat-sticky-top">
                    <h3>Artifice</h3>
                    <button><img src="/img/d6-char-sheet/d6-white-{$character.art}.png" width="74" alt="[{$character.art} white]"></button>
                </div>
                <div class="grid-stat grid-stat-sticky-top">
                    <h3>Tuning</h3>
                    <button><img src="/img/d6-char-sheet/d6-white-{$character.baseTuning}.png" width="74" alt="[{$character.baseTuning} white]"></button>
                </div>

                
                <!-- <h4 class="grid-header grid-sticky-subheader">Saves</h4> -->

                {#each $character.skills.filter( s => s.category == "Save" ) as skill }
                    <div class="grid-skill">
                        <p>{skill.name}</p>
                        <button>
                            {#if skill.level > 0}
                                <img src="/img/d6-char-sheet/d6-black-{skill.level}.png" width="50" alt="[{skill.level} black]">
                            {:else}
                                <div style="width: 50px; height: 50px"> </div>
                            {/if}
                        </button>
                    </div>
                {/each}


                <!-- <h4 class="grid-header grid-sticky-subheader">Exploration</h4> -->

                {#each $character.skills.filter( s => s.category == "Exploration" ) as skill }
                    <div class="grid-skill">
                        <p>{skill.name}</p>
                        <button>
                            {#if skill.level > 0}
                                <img src="/img/d6-char-sheet/d6-black-{skill.level}.png" width="50" alt="[{skill.level} black]">
                            {:else}
                                <div style="width: 50px; height: 50px"> </div>
                            {/if}
                        </button>
                    </div>
                {/each}


                <!-- <h4 class="grid-header grid-sticky-subheader">Knowledge</h4> -->

                {#each $character.skills.filter( s => s.category == "Knowledge" ) as skill }
                    <div class="grid-skill">
                        <p>{skill.name}</p>
                        <button>
                            {#if skill.level > 0}
                                <img src="/img/d6-char-sheet/d6-black-{skill.level}.png" width="50" alt="[{skill.level} black]">
                            {:else}
                                <div style="width: 50px; height: 50px"> </div>
                            {/if}
                        </button>
                    </div>
                {/each}

                
                <!-- <h4 class="grid-header grid-sticky-subheader">Equipment</h4> -->

                {#each $character.skills.filter( s => s.category == "Equipment" ) as skill }
                    <div class="grid-skill">
                        <p>{skill.name}</p>
                        <button>
                            {#if skill.level > 0}
                                <img src="/img/d6-char-sheet/d6-black-{skill.level}.png" width="50" alt="[{skill.level} black]">
                            {:else}
                                <div style="width: 50px; height: 50px"> </div>
                            {/if}
                        </button>
                    </div>
                {/each}

            </div>
        </div>
    </div>
{/if}

<style>

h2 { font-size: 18pt; margin-top: 6pt; margin-bottom: 2pt; }
h3 { font-size: 16pt; margin-top: 6pt; margin-bottom: 2pt; }
h4 { font-size: 14pt; margin-top: 6pt; margin-bottom: 2pt; }
p { font-size: 12pt; margin-top: 6pt; margin-bottom: 2pt; }

.scrollbox {
    overflow: scroll;
    max-height: 80vh;
}
.scrollbox-x {
    overflow-x: scroll;
}
.scrollbox-y {
    overflow-y: scroll;
    max-height: 80vh;
}

#name-input {
    font-size: x-large;
    text-align: center;
    min-width: 10px;
    max-width: 90%;
    border: 0;
    background-color: transparent;
}
#name-input {
    font-size: x-large;
    min-width: 10px;
}

.edit-button {
    width: 1em;
    height: 1em;
    padding: 0;
    background-color: transparent;
    background-image: url("/img/pencil.svg");
    background-repeat: no-repeat;
    background-position: center;
}

.roll-grid {
    display: grid;
    /* overflow: scroll; */
    /* height: 90vh;  */
    background-color: #000000;
    color: #FDF6E3;
    grid-template-columns: auto auto auto auto;
    gap: 10px;
    margin: 0px;
    padding: 0px;
}

.roll-grid2 {
    display: grid;
    /* overflow: scroll; */
    /* height: 90vh;  */
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

.grid-stat-sticky-top {
    position: sticky;
    top: 0px;
}
.grid-sticky-subheader {
    top: calc(16pt + 6pt + 2pt + 84px + 20px + 6px);
}


</style>