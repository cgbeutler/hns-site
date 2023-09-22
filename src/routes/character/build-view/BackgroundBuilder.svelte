<script lang="ts">
    import { onMount } from "svelte";
    import type { Writable } from "svelte/store";
    import type { HnsCharacter } from "../../../lib/HnsCharacter";

    let error: string|undefined = undefined;
    export let character: Writable<HnsCharacter>;
    onMount(async () => {
        if (!character) { 
            error = `Failed to load character`
            return;
        }
    });
    
</script>

{#if error}
    <div class="sheet-block">
        <h2>Cannot Load Social Stats</h2>
        <p>Error: {error}</p>
    </div>
{:else if !character || $character == null}
    <div class="sheet-block">
        <h2>Loading...</h2>
    </div>
{:else}
    <div class="sheet-block">
        <label>
            <h4 style="display:inline-block">Character Name:</h4> <input placeholder="Unnamed Character" bind:value={$character.name}>
        </label>
        <br>
        <label for="description"><h4>Description:</h4></label>
        <p id="description" bind:innerHTML={$character.background.description} contenteditable></p>
    </div>
{/if}

<style src="CharacterSheet.css">

.sheet-block {
    text-align: left;
}

p[contenteditable] {
    margin: 0px 0px 0px 24px;
    flex-grow: 1;
    width: calc(100% - 34px);
    max-width: none;
    
    font-family: monospace;
    text-rendering: auto;
    color: fieldtext;
    letter-spacing: normal;
    word-spacing: normal;
    line-height: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    appearance: auto;
    -webkit-rtl-ordering: logical;
    resize: auto;
    cursor: text;
    white-space-collapse: preserve;
    text-wrap: wrap;
    overflow-wrap: break-word;
    background-color: field;
    column-count: initial !important;
    writing-mode: horizontal-tb !important;
    border-width: 1px;
    border-style: solid;
    border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
    border-image: initial;
    padding: 2px;
}
</style>