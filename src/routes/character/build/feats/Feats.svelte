<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { PlayerCharacter } from "../../../../lib/Character/PlayerCharacter";
  
  export let character: Writable<PlayerCharacter>;
</script>

<div class="sheet-block">
  <h1><img src="/img/icons/StarIcon.svg" alt=""/> Feats & Abilities <img src="/img/icons/StarIcon.svg" alt=""/></h1>
  
  <div class="sheet-block-v">
    <h2>Social Features</h2>
    <p>Points Spent: 0/{$character.SocialFeatPoints}</p>
    <p>Coming Soon</p>
  </div>

  <div class="sheet-block-h">
    <div class="sheet-block-v">
      <h2>Lineage</h2>
      <p>Optional. Lineages serve as easy recipes of Trait Features.</p>
      <p>Coming Soon</p>

      <h2>Class</h2>
      <p>Optional. Classes serve as easy recipes of Class Features.</p>
      <p>Coming Soon</p>
    </div>

    <div class="sheet-block-v">
      <h2>Constitution</h2>
      <p>Your Constitution will make some features cheaper.</p>
      <p>Coming Soon</p>
    </div>
  </div>
  
  <div class="sheet-block-v">
    <h2>Trait Feats</h2>
    <p>Points Spent: 0/{$character.TraitFeatPoints}</p>
    <p>Prestige Points Spent: 0/{$character.PrestigeFeatPoints}</p>
    <p>Coming Soon</p>
  </div>

  <div class="sheet-block-v">
    <h2>Class Feats</h2>
    <p>Points Spent: 0/{$character.ClassFeatPoints}</p>
    <p>Prestige Points Spent: 0/{$character.PrestigeFeatPoints}</p>
    <p>Coming Soon</p>
  </div>
</div>