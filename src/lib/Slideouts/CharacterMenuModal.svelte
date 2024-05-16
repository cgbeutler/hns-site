<script lang="ts">
  import CharacterMenu from "./CharacterMenu.svelte";
  export let isOpen = false;
  export let id: string;
</script>

{#if isOpen}
  <!-- on:introstart and on:outroend are required to transition 1 at a time between modals -->
  <div role="dialog" class="modal">
    <CharacterMenu bind:id={id} />
  </div>
{/if}

<style>
  .modal {
    position: fixed;
    z-index: 10;
    top: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: left;
    align-items: flex-start;

    /* allow click-through to backdrop */
    pointer-events: none;
  }
</style>
