<script lang="ts">
    import { fly } from "svelte/transition";
    import { closeModal } from 'svelte-modals'
    import NavMenu from "./NavMenu.svelte";

    export let isOpen = false;

    let viewWidth = 0;
    $: if (isOpen && viewWidth >= 1000) {
        closeModal()
    }
</script>

<svelte:window bind:innerWidth={viewWidth} />

{#if isOpen}
    <!-- on:introstart and on:outroend are required to transition 1 at a time between modals -->
    <div role="dialog" class="modal" transition:fly={{ x: -100 }} on:introstart on:outroend>
        <NavMenu />
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
        justify-content: left;
        align-items: flex-start;
        height: 100vh;
        min-height: 100vh;
        max-height: 100vh;

        /* allow click-through to backdrop */
        pointer-events: none;
    }
</style>
