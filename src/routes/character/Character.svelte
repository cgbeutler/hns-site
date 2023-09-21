<script lang="ts">
    import { localCharacter, getHnsCharacter } from '../../lib/stores'
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-routing';
    import { NIL, validate } from 'uuid';
    import type { Writable } from 'svelte/store';
    import type { HnsCharacter } from '../../lib/HnsCharacter';
    import SocialSkills from '../../lib/CharacterSheet/Skills.svelte';
    import Builder from '../../lib/CharacterSheet/Builder.svelte';

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

    let page = 1;
</script>

{#if !character || $character == null}
    <div class="page">
        <h2>Loading...</h2>
    </div>
{:else}

    <div class="page">
        <p id="name-label">{$character.name && $character.name.length>0 ? $character.name : "Unnamed Character"}</p>
        <div>
            <button on:click={()=>page=0}>Builder</button>
            <button on:click={()=>page=0}>Background</button>
            <button on:click={()=>page=0}>Feats</button>
        </div>
        <div>
            <button on:click={()=>page=1}>Skills</button>
            <button on:click={()=>page=1}>Actitons</button>
            <button on:click={()=>page=1}>Inventory</button>
        </div>
    </div>
    {#if page == 0}
        <Builder bind:character={character}></Builder>
    {:else if page == 1}
        <SocialSkills bind:character={character}></SocialSkills>
    {/if}
{/if}

<style>

h2 { font-size: 18pt; margin-top: 6pt; margin-bottom: 2pt; }
h3 { font-size: 16pt; margin-top: 6pt; margin-bottom: 2pt; }
h4 { font-size: 14pt; margin-top: 6pt; margin-bottom: 2pt; }
p { font-size: 12pt; margin-top: 6pt; margin-bottom: 2pt; }

#name-label {
    font-size: x-large;
    text-align: center;
    min-width: 10px;
    border: 0px;
    background-color: transparent;
}
</style>