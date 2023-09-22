<script lang="ts">
    import { onMount } from 'svelte';
    import type { Writable } from 'svelte/store';
    import type { HnsCharacter } from '../../../lib/HnsCharacter';
    import SocialSkills from '../../../lib/CharacterSheet/Skills.svelte';
    import Builder from '../build-view/BackgroundBuilder.svelte';
    import type { GetPropsParams } from 'svelte-routing/types/Link';

    export let id: string;
    export let character: Writable<HnsCharacter>;
    let error: string | undefined;

    onMount(async () => { error = !!character || $character == null ? undefined : `Failed to load character`; });

    let view = 1;
    function getLinkProps(params: GetPropsParams) {
        let { location, href, isPartiallyCurrent, isCurrent } = params;
        if (isCurrent || isPartiallyCurrent) return { class: "active" };
        return { class: "" }
    }
</script>

{#if error}
    <div class="sheet-block">{error}</div>
{:else if !character || $character == null}
    <div class="page">
        <h2>Loading...</h2>
    </div>
{:else}
    <div class="sheet-block" style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: center;">
        <div style="display: flex; flex-wrap:wrap; justify-content: center; border: 2px solid #222222; padding: 2px; border-radius: 5px">
            <button on:click={()=>view=1}>Skills</button>
            <button on:click={()=>view=1}>Actitons</button>
            <button on:click={()=>view=1}>Inventory</button>
            <button on:click={()=>view=1}>Inventory</button>
        </div>
    </div>
    {#if view == 0}
        <Builder bind:character={character}></Builder>
    {:else if view == 1}
        <SocialSkills bind:character={character}></SocialSkills>
    {/if}
{/if}

<style>
</style>