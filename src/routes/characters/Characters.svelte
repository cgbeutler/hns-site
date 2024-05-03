<script lang="ts">
    import { account, hnsCharacterSummaries } from "../../lib/stores";
    import { navigate, link } from "svelte-routing";
    
    let charList = $hnsCharacterSummaries; // read value with automatic subscription

    function goToNewCharacter() {
        hnsCharacterSummaries.create( (id) => {
            console.log("Navigating to '/character/" + id + "'");
            navigate("/character/" + id);
        });
    }
</script>

{#if $account === null}
    <div class="page">
        <h1>Characters</h1>
        <p>You are not logged into an account.</p>
        <p style="text-align: left;">
            You can try Hammer and Steel's character sheet without an account.<br/>
            Creating a character sheet without an account means it is <b>not</b> stored on our servers.
            You will only be able to access it on this device and it will not be backed up or secured.<br/>
            To store a character on our server, to be accessed from anywhere, you'll need to create an account and save the character to your account.
        </p>
        <br>
        <a class="button" href="/character/local" use:link>
            Try the Character Forge
        </a>
    </div>
{/if}

<div class="page">
    <h1>Characters:</h1>
    {#if Object.keys(charList).length == 0}
        No characters exist yet.
    {:else}
        <div class="char-list">
        {#each Object.entries(charList) as [id, character], i}
            <a href={"/character/"+id} class="button-outlined char-button" use:link>{character.name}</a>
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
