<svelte:head>
  {#each [
    '/img/dice/d2.svg', '/img/dice/d4.svg', '/img/dice/d6.svg', '/img/dice/d8.svg', '/img/dice/d10.svg', '/img/dice/d12.svg', '/img/dice/d20.svg',
    '/img/dice/d4-inverted.svg', '/img/dice/d6-inverted.svg', '/img/dice/d20-inverted.svg',
    '/img/dice/roll-0.svg', '/img/dice/roll-2.svg', '/img/dice/roll-1.svg', '/img/dice/roll-3.svg', '/img/dice/roll-5.svg', '/img/dice/roll-4.svg', '/img/dice/roll-shine.svg'
  ] as image}
  <link rel="preload" as="image" href={image} />
  {/each}
</svelte:head>

<script lang="ts">
  import { onMount } from "svelte";

  export let faces: number = 20;
  export let result: number | undefined = undefined;
  export let invert: boolean = false;
  export let height: string = "48px";

  let die: HTMLDivElement;
  let overlayAnim: HTMLDivElement;
  
  let hideDie: boolean = false;
  let timeout: number | undefined;
  export function roll() {
    if (!die || !overlayAnim) return;
    // Clear the animation
    overlayAnim.style.animation = 'none';
    overlayAnim.offsetHeight; //needed hack

    // Start animations
    const duration = 1.5;
    const rollPortion = 0.42;
    let delay = Math.random() * 0.1;
    overlayAnim.style.animation = null!;
    overlayAnim.style.animationDuration = `${duration}s`;
    overlayAnim.style.animationDelay = `-${delay}s`;
    overlayAnim.offsetHeight; //needed hack
    
    if (timeout) { clearTimeout(timeout); timeout = undefined; }
    hideDie = true;
    timeout = setTimeout(()=> {
      die.style.animation = 'none';
      die.offsetHeight; //needed hack
      die.style.animation = null!;
      die.offsetHeight; //needed hack
      hideDie = false;

      // Roll the Die
      if (faces > 0) result = Math.floor( Math.random() * faces ) + 1;
      else if (faces < 0) result = Math.floor( Math.random() * faces ) - 1;
      else result = 0;
    }, ((duration*rollPortion) - delay)*1000)
  }

  onMount(() => {
    roll();
  })
</script>

<div>
  <div bind:this={die}
    style="--height: {height}; {hideDie ? "background-size: 0;" : ""}"
    class="die
      faces-{faces}{faces == 6 && invert ? "-inverted" : "" }
      result-{result}
    "
    >
    {hideDie ? "" : result == null || result == Infinity ? "?" : result}
    <div bind:this={overlayAnim} class="overlay-anim" on:animationstart={()=>{console.log("start")}} on:animationend={()=>{console.log("end")}} />
  </div>
</div>

<style>

  .die {
    display: inline-flex;
    position: relative;
    background-image: url('/img/dice/d6.svg');
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    color: black;
    width: var(--height);
    height: var(--height);
    margin: 0px;
    border: 0px;
    padding: 0px;
    align-items: center;
    justify-content: center;
    font-size: calc(0.375 * var(--height));
    font-weight: bold;
    text-align: center;
    animation-name: shake;
    animation-duration: 0.2s;
    animation-iteration-count: 1;
    transform-origin: 50% 50%;
  }

  .die.faces-2 { background-image: url('/img/dice/d2.svg'); }
  .die.faces-2-inverted { background-image: url('/img/dice/d2-inverted.svg'); }
  .die.faces-4 { background-image: url('/img/dice/d4.svg'); }
  .die.faces-4-inverted { background-image: url('/img/dice/d4-inverted.svg'); }
  .die.faces-6 { background-image: url('/img/dice/d6.svg'); }
  .die.faces-6-inverted { background-image: url('/img/dice/d6-inverted.svg'); }
  .die.faces-8 { background-image: url('/img/dice/d8.svg'); }
  .die.faces-8-inverted { background-image: url('/img/dice/d8-inverted.svg'); }
  .die.faces-10 { background-image: url('/img/dice/d10.svg'); }
  .die.faces-10-inverted { background-image: url('/img/dice/d10-inverted.svg'); }
  .die.faces-12 { background-image: url('/img/dice/d12.svg'); }
  .die.faces-12-inverted { background-image: url('/img/dice/d12-inverted.svg'); }
  .die.faces-20 { background-image: url('/img/dice/d20.svg'); }
  .die.faces-20-inverted { background-image: url('/img/dice/d20-inverted.svg'); }
  .die.faces-30 { background-image: url('/img/dice/d30.svg'); }
  .die.faces-30-inverted { background-image: url('/img/dice/d30-inverted.svg'); }
  .die.faces-100 { background-image: url('/img/dice/d100.svg'); }
  .die.faces-100-inverted { background-image: url('/img/dice/d100-inverted.svg'); }

  .overlay-anim {
    position: absolute;
    padding: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: none;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    animation-name: roll;
    animation-duration: 0s;
    animation-iteration-count: 1;
  }

  @keyframes momentary-hide {
    0% { background-size: 1%; font-size: 0; }
    99% { background-size: 1%; font-size: 0; }
    100% { background-size: 100%; font-size: calc(0.375 * var(--height)); }
  }

  @keyframes roll {
    0% { background-image: url('/img/dice/roll-0.svg'); }
    8% { background-image: url('/img/dice/roll-2.svg'); }
    16% { background-image: url('/img/dice/roll-1.svg'); }
    24% { background-image: url('/img/dice/roll-3.svg'); }
    32% { background-image: url('/img/dice/roll-5.svg'); }
    40% { background-image: url('/img/dice/roll-4.svg'); background-size: 100%; }
    48% { background-image: url('/img/dice/roll-shine.svg'); }
    100% { background-image: none; background-size: 130%; }
  }

</style>