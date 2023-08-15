<script lang="ts">
    import { onDestroy } from 'svelte';
    import { hnsCharacters } from "../../lib/stores";
    import { navigate, link } from "svelte-routing";
    import { get } from "svelte/store";
    import { NIL } from "uuid";

    let charList = $hnsCharacters; // read value with automatic subscription

    function goToNewCharacter() {
        var id = hnsCharacters.create();
        if (id == NIL) {
            console.log("Got nil from create character");
            return;
        }
        console.log("Navigating to '/character/" + id + "'");
        navigate("/character/" + id);
    }
</script>

<div class="page">
    <h1>Characters:</h1>
    {#if Object.keys(charList).length == 0}
        No characters exist yet.
    {:else}
        <div class="char-list">
        {#each Object.entries(charList) as [id, character], i}
            <a href={"/character/"+id} class="button-outlined char-button" use:link>{get(character).name}</a>
        {/each}
        </div>
    {/if}
    
    <br />
    <button class="button" on:click={goToNewCharacter}>
        +
    </button>
    <br />
</div>

<style>
    .char-list {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }
    .char-button {
        min-width: 50px;
        max-width: 400px;
        padding-left: 20px;
        padding-right: 20px;
    }
</style>
