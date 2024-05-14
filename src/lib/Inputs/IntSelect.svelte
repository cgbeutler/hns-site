<script context="module" lang="ts">
  export function formatMod( n: number ) { return n < 0 ? n.toString() : "+" + n };
</script>

<script lang="ts">
  import { clamp } from "../Helpers/MathHelpers";

  export let id: string | undefined = undefined;
  export let value: number;

  export let min: number = 0;
  export let max: number = 10;

  export let disabled: boolean | undefined = undefined;

  export let format: ((n:number)=>string) = (n) => n.toString();

  let input: HTMLSelectElement;
  let inputValid: boolean = true;
  let items: Array<{ value: number, label: string }> = []

  function refreshItems( min: number, max: number ): void {
    let result_Items: Array<{ value: number, label: string }>;
    if (min >= max) {
      result_Items = [{ value: min, label: format(min)}];
    } else {
      result_Items = Array.from({length: Math.floor(max+1-min)}, (_,i) => { let n = min+i; return { value: n, label: format(n) }});
    }
    items = result_Items;
    inputValid = value != null && value >= min && value <= max;
  }
  $: refreshItems(min, max);

  function valueChanged( value: number ) {
    if (!!input && value !== Number.parseInt( input.value )) {
      input.value = value?.toString();
      inputValid = value === clamp(value, min, max);
    }
  }
  $: valueChanged( value );

  function inputChanged() {
    var raw = Number.parseInt( input.value );
    inputValid = raw === clamp( raw, min, max );
    if (inputValid) { value = raw; }
  }
</script>

<select id={id} class="button" class:bright={value != 0} class:invalid-input={!inputValid} bind:this={input} on:change={inputChanged} disabled={disabled}>
  {#if value < min || value > max}
    <option style="color: var(--error-color);" value={value} selected> {format(value)} </option>
  {/if}
  {#each items as item}
    <option style="text-align: center;" value={item.value} selected={value === item.value}> {item.label} </option>
  {/each}
</select>

<style>

  select {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    font-size: smaller;
    min-width: calc(0.5em * 2 + 1em);
    min-height: calc(0.5em * 2 + 1em);
    width: 3.5em;
    flex: 1 1 auto;
    text-align: center;
    border-width: 0px;
    border-radius: 8px;
    padding: 0px;
    appearance: none;
    --webkit-appearance: none;
    --moz-appearance: none;
    text-overflow: '';
  }
  select::-ms-expand {
    display: none;
  }

  select.button.bright {
    padding: 0px;
  }
  
  .invalid-input {
    border: solid 1px var(--error-color);
  }

</style>