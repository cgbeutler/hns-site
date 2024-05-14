<script context="module" lang="ts">
  import { toast } from "@zerodevx/svelte-toast";
  import RollToast from "./RollToast.svelte";

  export function diceCheck(modName: string, mod: number, dice: number[]) {
    return () => toast.push({
      duration: 8000,
      component: {
        src: RollToast,
        props: { modName, mod, dice },
      }
    });
  }
</script>