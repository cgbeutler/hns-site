<script lang="ts">
    import { onMount } from 'svelte';
    import type { Writable } from 'svelte/store';
    import type { HnsCharacter } from '../../../lib/HnsCharacter';
    import { Link, Route, Router } from 'svelte-routing';
    import type { GetPropsParams } from 'svelte-routing/types/Link';
    import BackgroundBuilder from './BackgroundBuilder.svelte';
    import StatBuilder from './StatBuilder.svelte';

    export let id: string;
    export let character: Writable<HnsCharacter>;
    let error: string | undefined;

    onMount(async () => { error = !!character || $character == null ? undefined : `Failed to load character`; });

    function getLinkProps(params: GetPropsParams) {
        if (params.isCurrent) return { class: "active" };
        return { class: "" }
    }
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

    <div class="sheet-block" style="text-align:center;">
        <h4>Build Steps:</h4>
        <div class="toggle-bg">
            <Link to="/character/{id}/build/background" getProps={getLinkProps}>1. Background</Link>
            <Link to="/character/{id}/build/class" getProps={getLinkProps}>2. Class</Link>
            <Link to="/character/{id}/build/stats" getProps={getLinkProps}>3. Stats</Link>
        </div>
    </div>
    
    <Router>
        <Route path="/background"> <BackgroundBuilder bind:character={character}/> </Route>
        <Route path="/stats"> <StatBuilder bind:character={character}/> </Route>
    </Router>
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