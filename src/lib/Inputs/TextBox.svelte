<script lang="ts">
  export let id: string | undefined = undefined;
  export let value: any;

  export let isValid: ((value: string) => boolean) | undefined = undefined;
  export let sanitizer: ((value: string) => any) | undefined = undefined;

  export let disabled: boolean | undefined = undefined;

  let inputElement: HTMLInputElement;
  let inputValid: boolean = true;
  function inputChanged() {
    var raw = inputElement.value;
    inputValid = isValid == null || isValid( raw );
    if (inputValid) { value = sanitizer != null ? sanitizer( raw ) : raw; }
  }
  $: if (!!inputElement && value !== inputElement.value) {
    inputElement.value = value?.toString() ?? "";
    inputValid = isValid == null || isValid(value);
  }

</script>

<div class="text-box">
  <input id={id} class="text-input" class:invalid-input={!inputValid} type="text" inputmode="numeric" bind:this={inputElement} on:change={inputChanged} disabled={disabled}/><br>
</div>

<style>
  .text-box {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
  }

  .text-input {
    font-size: smaller;
    min-height: calc(0.5em * 2 + 1em);
    width: 3em;
    flex: 1 1 auto;
    text-align: center;
    border-width: 0px;
    z-index: 0;
  }

</style>