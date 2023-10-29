<script lang="ts">
    import { closeModal, modals } from 'svelte-modals'
      
    export let isOpen: Boolean | undefined;
    export let question: string | undefined;
    export let no: string = "No";
    export let yes: string = "Yes";
    export let onConfirm: () => void = () => {};

    function confirm() {
        closeModal()
        onConfirm()
    }
</script>
  
    {#if isOpen}
        <div role="dialog" class="modal">
            <div class="contents">
                <p>{question}</p>
                <div class="actions">
                    <button on:click={closeModal}>{no}</button>
                    <button on:click={confirm}>{yes}</button>
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

    .actions {
        display: flex;
        justify-content: space-between;
        gap: 8px;
    }

    .actions button {
        background-color: #333333;
    }

</style>