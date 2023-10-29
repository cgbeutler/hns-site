<script lang="ts">
    import { closeModal } from 'svelte-modals'
    import type { FeatDescription } from '../HnsCompendium';
      
    export let isOpen: Boolean | undefined;
    export let options: Array<FeatDescription> = [];
    export let onSelected: (newFeat: FeatDescription) => void = (_) => {};

    function select(newFeat: FeatDescription) {
        closeModal();
        onSelected(newFeat);
    }
</script>

    {#if isOpen}
        <div role="dialog" class="modal">
            <div class="contents">
                <div class="heading">
                    <p>Select a feat</p>
                    <button on:click={closeModal}>cancel</button>
                </div>
                <br>
                <div class="feat-list">
                {#each options as option}
                    <button on:click={()=>select(option)}>
                        {option.name}
                        <p>{option.shortDescription}</p>
                    </button>
                {/each}
                </div>
            </div>
        </div>
    {/if}

<style>
    .modal {
        position: fixed;
        z-index: 10;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    
        /* allow click-through to backdrop */
        pointer-events: none;
    }

    .contents {
        min-width: 240px;
        max-width: 90%;
        max-height: 90%;
        border-radius: 6px;
        padding: 10px;
        background: #222222;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        pointer-events: auto;
    }

    p {
        text-align: center;
        margin: 10px;
    }

    .heading {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
    }

    .feat-list {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        overflow: scroll;
        gap: 5px;
    }

</style>