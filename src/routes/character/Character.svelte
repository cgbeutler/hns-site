<script lang="ts">
    import { localCharacter, getHnsCharacter } from '../../lib/stores'
    import { onMount } from 'svelte';
    import { Link, Route, Router, navigate } from 'svelte-routing';
    import { NIL, validate } from 'uuid';
    import type { Writable } from 'svelte/store';
    import type { HnsCharacter } from '../../lib/HnsCharacter';
    import type { GetPropsParams } from 'svelte-routing/types/Link';
    import BuildView from './build-view/BuildView.svelte';
    import PlayView from './play-view/PlayView.svelte';

    export let id: string = NIL;
    $: console.log( "id = '" + id + "'" )

    let character: Writable<HnsCharacter>;
    $: character = id == "local" ? localCharacter : getHnsCharacter(id)

    onMount(async () => {
        if (window.location.pathname.endsWith(`/character/${id}`) || window.location.pathname.endsWith(`/character/${id}/`)) {
            console.log("redirecting to play view")
            navigate( `/character/${id}/play`, {replace:true} );
            return;
        }
        if (id !== "local" && !validate(id)) { 
            console.error( "Failed to load character iwht id '" + id + "'" );
            navigate( "/characters" );
            return;
        }
    });

    function getLinkProps(params: GetPropsParams) {
        let { location, href, isPartiallyCurrent, isCurrent } = params;
        if (isCurrent || isPartiallyCurrent) return { class: "active" };
        return { class: "" }
    }
</script>

{#if !character || $character == null}
    <div class="page">
        <h2>Loading...</h2>
    </div>
{:else}

    <div class="sheet-block" style="display: flex; flex-direction: row; flex-wrap: nowrap;">
        <div style="display:flex; flex-direction: column;">
            <p id="name-label">{$character.name && $character.name.length>0 ? $character.name : "Unnamed Character"}</p>
            <div class="toggle-bg">
                <Link to="/character/{id}/build" getProps={getLinkProps}>Build</Link>
                <Link to="/character/{id}/play" getProps={getLinkProps}>Play</Link>
            </div>
        </div>
        <div>
            HP Display
        </div>
    </div>
    
    <Router>
        <Route path="/build/*"> <BuildView bind:id={id} bind:character={character}/> </Route>
        <Route path="/play/*"> <PlayView bind:id={id} bind:character={character}/> </Route>
    </Router>
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