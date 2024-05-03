<script lang="ts">
    import { onMount } from 'svelte';
    import type { Writable } from 'svelte/store';
    import type { PlayerCharacter } from '../../../lib/PlayerCharacter';
    import SocialSkills from '../../../lib/CharacterSheet/Skills.svelte';
    import Builder from '../build-view/BackgroundBuilder.svelte';
    import type { GetPropsParams } from 'svelte-routing/types/Link';
    import Link from '../../../lib/Link.svelte';
    import { Route, Router } from 'svelte-routing';

    export let id: string;
    export let character: Writable<PlayerCharacter>;
    let error: string | undefined;

    onMount(async () => { error = !!character || $character == null ? undefined : `Failed to load character`; });

    function getLinkProps( params: GetPropsParams ): Record<string, any> {
        let { location, href, isPartiallyCurrent, isCurrent } = params;
        if (isCurrent && !isPartiallyCurrent) return { class: "active" };
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
        <div class="toggle-bg">
            <Link to="/character/{id}/play" getProps={getLinkProps}>Summary</Link>
            <Link to="/character/{id}/play/skills" getProps={getLinkProps}>Skills</Link>
            <Link to="/character/{id}/play/actions" getProps={getLinkProps}>Actions</Link>
            <Link to="/character/{id}/play/inventory" getProps={getLinkProps}>Inventory</Link>
        </div>
    </div>
    
    <Router>
        <Route path="/play"> <Builder bind:character={character}></Builder> </Route>
        <Route path="/play/skills/*"> <SocialSkills bind:character={character}></SocialSkills> </Route>
    </Router>
        
{/if}

<style>
</style>