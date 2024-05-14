<script lang="ts">
  import { clamp } from "../Helpers/MathHelpers";

  export let id: string | undefined = undefined;
  export let value: number;

  export let min: number = Number.NEGATIVE_INFINITY;
  export let minAction: (() => void) | undefined = undefined;

  export let max: number = Number.POSITIVE_INFINITY;
  export let maxAction: (() => void) | undefined = undefined;

  export let step: number = 1;

  export let disabled: boolean | undefined = undefined;

  let input: HTMLInputElement;
  let inputValid: boolean = true;
  function inputChanged() {
    var raw = Number.parseInt( input.value );
    inputValid = raw === clamp(raw, min, max);
    if (inputValid) { value = raw; }
  }
  $: if (!!input && value !== Number.parseInt( input.value )) {
    input.value = value?.toString() ?? "?";
    inputValid = value === clamp(value, min, max);
  }

</script>

<div class="spinner">
  {#if value <= min && $$slots["min-icon"]}
    <button class="icon-button left-button" class:bright={minAction != undefined} disabled={disabled||minAction == undefined} on:click={minAction}><slot name="min-icon" /></button>
  {:else}
    <button disabled={disabled||value <= min} on:click={() => {value -= step}} class="icon-button left-button">-</button>
  {/if}

  <input id={id} class="number-input" class:invalid-input={!inputValid} type="text" inputmode="numeric" bind:this={input} on:change={inputChanged} disabled={disabled}/><br>

  {#if value >= max && $$slots["max-icon"]}
    <button class="icon-button right-button" class:bright={maxAction != undefined} disabled={disabled || maxAction == undefined} on:click={maxAction}><slot name="max-icon" /></button>
  {:else}
    <button disabled={disabled||value >= max} on:click={() => {value += step}} class="icon-button right-button">+</button>
  {/if}
</div>

<style>
  .spinner {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
  }
  
  button.icon-button.left-button {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    font-family: 'Courier New', Courier, monospace;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    min-width: calc(0.5em * 2 + 1em);
    min-height: calc(0.5em * 2 + 1em);
    z-index: 1;
  }
  
  button.icon-button.right-button {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    font-family: 'Courier New', Courier, monospace;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    min-width: calc(0.5em * 2 + 1em);
    min-height: calc(0.5em * 2 + 1em);
    z-index: 1;
  }

  .number-input {
    font-size: smaller;
    min-height: calc(0.5em * 2 + 1em);
    width: 3.5em;
    flex: 1 1 auto;
    text-align: center;
    border-width: 0px;
    z-index: 0;
  }

</style>