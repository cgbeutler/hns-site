<script lang="ts">
    import { onMount } from 'svelte';
    import type { Writable } from 'svelte/store';
    import type { HnsCharacter } from '../HnsCharacter';

    let error: string|undefined = undefined;
    export let character: Writable<HnsCharacter>;
    onMount(async () => {
        if (!character) { 
            error = `Failed to load character`
            return;
        }
    });
</script>

{#if error}
    <div class="sheet-block">
        <h2>Cannot Load Social Stats</h2>
        <p>Error: {error}</p>
    </div>
{:else if !character || $character == null}
    <div class="sheet-block">
        <h2>Loading...</h2>
    </div>
{:else}
    <div class="sheet-block">
        <h2>Social Skills</h2>
        <div>
            <div class="roll-grid">
                {#each Object.entries($character.socialProfile.stats) as [stat, {mod}] }
                    <div class="grid-stat">
                        <p style="text-align: center;">{stat}</p>
                        <button class="passive-button">+{mod}</button>
                    </div>
                {/each}
                <h4>Passives</h4>
                {#each Object.entries($character.socialProfile.passives) as [skill, {mod, stat}] }
                    <div class="grid-stat">
                        <p>{skill}</p>
                        <button class="passive-button">&gt;{8 + mod + $character.socialProfile.stats[stat].mod}</button>
                    </div>
                {/each}
                <h4>Sways</h4>
                {#each Object.entries($character.socialProfile.sways) as [skill, {mod, stat}] }
                    <div class="grid-stat">
                        <p>{skill}</p>
                        <button class="skill-button">+{mod + $character.socialProfile.stats[stat].mod}</button>
                    </div>
                {/each}
            </div>
            <p>Social ability listed here</p>
        </div>
        <br>
        <h2>Exploration Skills</h2>
        <div>
            <div class="roll-grid">
                {#each Object.entries($character.explorerProfile.stats) as [stat, {mod}] }
                    <div class="grid-stat">
                        <p style="text-align: center;">{stat}</p>
                        <button class="passive-button">+{mod}</button>
                    </div>
                {/each}
                <h4>Saves</h4>
                {#each Object.entries($character.explorerProfile.saves) as [skill, {mod, stat}] }
                    <div class="grid-stat">
                        <p>{skill}</p>
                        <button class="passive-button">&gt;{8 + mod + $character.explorerProfile.stats[stat].mod}</button>
                    </div>
                {/each}
                <h4>Perceptions</h4>
                {#each Object.entries($character.explorerProfile.perceptions) as [skill, {mod, stat}] }
                    <div class="grid-stat">
                        <p>{skill}</p>
                        <button class="passive-button">&gt;{8 + mod + $character.explorerProfile.stats[stat].mod}</button>
                    </div>
                {/each}
                <h4>Exploration</h4>
                {#each Object.entries($character.explorerProfile.explorations) as [skill, {mod, stat}] }
                    <div class="grid-stat">
                        <p>{skill}</p>
                        <button class="skill-button">+{mod + $character.explorerProfile.stats[stat].mod}</button>
                    </div>
                {/each}
                <h4>Knowledge</h4>
                {#each Object.entries($character.explorerProfile.knowledges) as [skill, {mod, stat}] }
                    <div class="grid-stat">
                        <p>{skill}</p>
                        <button class="skill-button">+{mod + $character.explorerProfile.stats[stat].mod}</button>
                    </div>
                {/each}
                <h4>Equipment</h4>
                {#each Object.entries($character.explorerProfile.equipments) as [skill, {mod, stat}] }
                    <div class="grid-stat">
                        <p>{skill}</p>
                        <button class="skill-button">+{mod + $character.explorerProfile.stats[stat].mod}</button>
                    </div>
                {/each}
            </div>
        </div>
    </div>
{/if}

<style>


h1,
h2,
h3,
h4 {
    margin-top: 6pt; margin-bottom: 2pt;
    font-weight: normal; font-variant-caps: all-small-caps;
}

h1 { font-size: 20pt; }
h2 { font-size: 18pt; }
h3 { font-size: 16pt; }
h4 { font-size: 14pt; }
p { font-size: 12pt; margin-top: 6pt; margin-bottom: 2pt; }

.roll-grid {
    display: grid;
    background-color: black;
    color: #FDF6E3;
    border: 3px solid #111111;
    border-radius: 4px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    row-gap: 4px;
    column-gap: 4px;
    margin: 0px;
    padding: 2px;
}

.roll-grid > h4 {
    background-color: #111111;
    color: #99998f;
    width: auto;
    font-size: 16px;
    text-align: center;
    margin: 0px;
    grid-column-start: 1;
    grid-column-end: 4;
    border-top: 2px solid #181818;
    border-radius: 14px 14px 2px 2px;
}

.roll-grid > h4:first-child {
    margin-top: 0px;
}


.grid-stat {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: stretch;
    align-content: flex-start;
    background-color: #222222;
    margin: 0px;
    padding: 4px 4px 4px 10px;
    border-radius: 1px;
}

.grid-stat p {
    flex-grow: 1;
    text-align: left;
}


.skill-button {
    background-size: 100% 100%;
    font-size: 18px;
    width: 45px;
    height: 40px;
    padding: 0px;
    border-top: 2px solid #3b3b3b;
    background-color: #2b2b2b;
    border-bottom: 2px solid #111111;
}
.passive-button {
    background-size: 100% 100%;
    font-size: 18px;
    width: 45px;
    height: 40px;
    padding: 0px;
    border-top: 2px solid  #111111;
    background-color: #1b1b1b;
    border-bottom: 2px solid #333333;
    color: #ccccc5
}

.skill-button::first-letter {
    font-family: Georgia, serif;
    font-size: 14px;
    line-height: 18px;
    vertical-align: text-top;
}

@media (max-width: 550px) {
    .grid-stat {
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        align-content: flex-end;
    }
}

</style>