<script lang="ts">
    import { onMount } from 'svelte';
    import type { Writable } from 'svelte/store';
    import { type PlayerCharacter } from '../PlayerCharacter';

    let error: string|undefined = undefined;
    export let character: Writable<PlayerCharacter>;
    onMount(async () => {
        if (!character) { 
            error = `Failed to load character`
            return;
        }
    });

    function toModString( n: number ): string {
        return (n < 0 ? "" : "+") + n;
    }
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
        <div>
            <div class="roll-grid">
                <h2>Social Skills</h2>
                {#each Object.entries($character.stats).slice(0,3) as [stat, {mod}] }
                    <div class="grid-stat">
                        <p style="text-align: center;">{stat}</p>
                        <button class="passive-button">{toModString(mod)}</button>
                    </div>
                {/each}
                <h4>Major Skills</h4>
                {#each Object.keys($character.socialSkills).slice(0,3) as skill }
                    <div class="grid-stat">
                        <p>{skill}</p>
                        <button class="skill-button">{toModString($character.GetSocialSkill(skill))}</button>
                    </div>
                {/each}
                <h4>Minor Skills</h4>
                {#each Object.keys($character.socialSkills).slice(3) as skill }
                    <div class="grid-stat">
                        <p>{skill}</p>
                        <button class="skill-button">{toModString($character.GetSocialSkill(skill))}</button>
                    </div>
                {/each}
            </div>
            <p>Social ability listed here</p>
        </div>
    </div>
    <div class="sheet-block">
        <div>
            <div class="roll-grid">
                <h2>Exploration Skills</h2>
                {#each Object.entries($character.stats).slice(3) as [stat, {mod}] }
                    <div class="grid-stat">
                        <p style="text-align: center;">{stat}</p>
                        <button class="passive-button">{toModString(mod)}</button>
                    </div>
                {/each}
                <h4>Major Skills</h4>
                {#each Object.keys($character.explorationSkills).slice(0,6) as skill }
                    <div class="grid-stat">
                        <p>{skill}</p>
                        <button class="skill-button">{toModString($character.GetExplorationSkill(skill))}</button>
                    </div>
                {/each}
                <h4>Minor Skills</h4>
                {#each Object.keys($character.explorationSkills).slice(6) as skill }
                    <div class="grid-stat">
                        <p>{skill}</p>
                        <button class="skill-button">{toModString($character.GetExplorationSkill(skill))}</button>
                    </div>
                {/each}
            </div>
        </div>
    </div>
{/if}

<style>

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

.roll-grid > h2 {
    background-color: #111111;
    color: #99998f;
    width: auto;
    font-size: 30px;
    line-height: 40px;
    text-align: center;
    margin: 0px;
    padding-bottom: 5px;
    grid-column-start: 1;
    grid-column-end: 4;
    border-top: 2px solid #181818;
    border-radius: 14px 14px 2px 2px;
}

.roll-grid > h2:first-child {
    margin-top: 0px;
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
    padding: 4px;
    border-radius: 1px;
}

.grid-stat p {
    flex-grow: 1;
    text-align: left;
    margin: auto 0px;
    padding: 0px 6px;
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
        padding: 10px 0px;
    }
}

</style>