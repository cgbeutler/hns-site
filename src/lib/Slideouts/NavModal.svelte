<script lang="ts">
  import { fly } from "svelte/transition";
  import NavMenu from "./NavMenu.svelte";

  export let isOpen = false;

</script>

{#if isOpen}
  <!-- on:introstart and on:outroend are required to transition 1 at a time between modals -->
  <div role="dialog" class="modal" transition:fly|global={{ duration: 100, x: 100 }} on:introstart on:outroend>
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
    display: flex;
    justify-content: left;
    align-items: flex-start;

    /* allow click-through to backdrop */
    pointer-events: none;
    overflow: scroll;
  }
</style>
