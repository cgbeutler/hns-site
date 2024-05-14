<script lang="ts">
  import ToastDie from "./ToastDie.svelte";

  export let modName: string;
  export let mod: number;
  export let dice: number[];

  $: console.log(`dice: ${dice}`)
  $: console.log(`mod: ${mod}`)

  let dieResults: (number|undefined)[] = Array.from(dice, () => undefined);

  let quality: number | undefined = undefined;
  let equation: string = `${mod} + ${Array.from(dice, () => "?").join(" + ")} = ?`;

  function updateDisplays( mod: number, dieResults: (number|undefined)[] ): void {
    let partial = dieResults.reduce((a, b) => (b != null ? a!+b : undefined), 0);
    if (partial != null) { quality = mod + partial; }
    else quality = undefined;
    equation = `${mod} + ${dieResults.map(r => r!=null?r:"?").join(" + ")}`;
  }

  $: updateDisplays(mod, dieResults);
</script>

<div style="display: flex; flex-direction: row; flex-wrap: nowrap;">
  {#each dice as die, i}
    <ToastDie faces={die} bind:result={dieResults[i]} />
  {/each}

  <div style="display: flex; flex-direction: column; flex-wrap: nowrap;">
    <p>
      Rolling {modName}:<br>
      {equation} = <b>{quality!=null?quality:"?"}</b>
    </p>
    {#if quality != null && (dice[0] === 20 || dice[0] === 12)}
      {#if dieResults[0] === 1}
        CRITICAL FAILURE!
      {:else if dice[0] === dieResults[0]}
        CRITICAL SUCCESS!
      {/if}
    {/if}
  </div>
</div>