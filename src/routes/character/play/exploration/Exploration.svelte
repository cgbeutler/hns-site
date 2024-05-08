<script lang="ts">
    import { onMount } from 'svelte';
    import type { Writable } from 'svelte/store';
    import type { PlayerCharacter } from '../../../../lib/PlayerCharacter';
    import ExplorationSkills from '../../../../lib/CharacterSheet/ExplorationSkills.svelte';

    export let id: string;
    export let character: Writable<PlayerCharacter>;
    let error: string | undefined;

    onMount(async () => { error = !!character || $character == null ? undefined : `Failed to load character`; });
</script>

{#if error}
    <div class="sheet-block">{error}</div>
{:else if !character || $character == null}
    <div class="page">
        <h2>Loading...</h2>
    </div>
{:else}
    <ExplorationSkills bind:character={character} />

    Exploration Abilities Here.
{/if}

<style>
</style>