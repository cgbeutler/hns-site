<script lang="ts">
    import { hnsCharacters } from '../../lib/stores'
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-routing';
    import { NIL, validate } from 'uuid';
    import { get } from 'svelte/store';

    export let id: string = NIL;
    $: console.log( "id = '" + id + "'" )

    let charList = $hnsCharacters
    $: character = charList[id]
    // characters.subscribe( chars => {
    //     character = chars[id]
    //     if (!validate(id) || id == NIL || !chars.hasOwnProperty(id)) {
    //         console.log( "Failed to load character with id '" + id + "' or character was deleted" );
    //         navigate( "/hns", { replace: true } );
    //         return;
    //     }
    //     console.log( "Updated char '" + character + "' that has id '" + character.id + "' and name '" + character.name + "'" )
    // })

    // TODO: Figure out how to nav back when in invalid id
    // onMount(async () => {
    //     if (!validate(id) || id == NIL) {
    //         console.log( "Failed to load character with id '" + id + "'" );
    //         navigate( "/hns" );
    //         return;
    //     }
    //     if (!(get(character)) || !(get(characters)[id])) {
    //         console.log( "Failed to load character with id '" + id + "' or character was deleted" );
    //         navigate( "/hns", { replace: true } );
    //     }


    //     // character = get(characters)[id];
    //     // console.log( "Updated char '" + character + "'" )
    //     // // if (!validate(id) || id == NIL || !chars.hasOwnProperty(id)) {
    //     // //     console.log( "Failed to load character with id '" + id + "'" );
    //     // //     navigate( "/hns" );
    //     // //     return;
    //     // // }
    // });
    let nameInput;
    $: if (nameInput) {
        let name = $character.name;
        if (name.length == 0) { nameInput.style.width = "Unnamed Character".length + "ch"; }
        else { nameInput.style.width = name.length + "em"; }
    }
</script>


<div class="page">
    <input id="name-input" placeholder="Unnamed Character" bind:this={nameInput} bind:value={$character.name}><button class="edit-button" on:click={()=>nameInput.focus()}></button>
    <br/>
    <hr>
    summary info here
</div>
<div class="page">
    <div class="main-grid">
        <h2 class="grid-header">Sways</h2>

        <div class="grid-stat">
            <h3>Pressure</h3>
            <button><img src="/img/d6-char-sheet/d6-white-{$character.pres}.png" width="74" alt="[{$character.pres} white]"></button>
            <p>+<img src="/img/d6-char-sheet/d6-black-small-icon.png" width="15em" alt="black"> /Standing</p>
        </div>
        <div class="grid-stat">
            <h3>Theatrics</h3>
            <button class="button-white-dice"><img src="/img/d6-char-sheet/d6-white-{$character.thea}.png" width="74" alt="[{$character.thea} white]"></button>
            <p>+<img src="/img/d6-char-sheet/d6-black-small-icon.png" width="15em" alt="black"> /Standing</p>
        </div>
        <div class="grid-stat">
            <h3>Credibility</h3>
            <button class="button-white-dice"><img src="/img/d6-char-sheet/d6-white-{$character.cred}.png" width="74" alt="[{$character.cred} white]"></button>
            <p>+<img src="/img/d6-char-sheet/d6-black-small-icon.png" width="15em" alt="black"> /Standing</p>
        </div>
        <div class="grid-stat">
            <h3>Insight</h3>
            <button class="button-white-dice"><img src="/img/d6-char-sheet/d6-white-{$character.insi}.png" width="74" alt="[{$character.insi} white]"></button>
            <p>+<img src="/img/d6-char-sheet/d6-black-small-icon.png" width="15em" alt="black"> /Standing</p>
        </div>

        <hr class="grid-hr">

        <h2 class="grid-header">Perceptions</h2>

        <div class="grid-stat">
            <h3>Tracking</h3>
            <button><img src="/img/d6-char-sheet/d6-white-{$character.trac}.png" width="74" alt="[{$character.trac} white]"></button>
            <p>+<img src="/img/d6-char-sheet/d6-black-small-icon.png" width="15em" alt="black"> /6s</p>
        </div>
        <div class="grid-stat">
            <h3>Inventory</h3>
            <button><img src="/img/d6-char-sheet/d6-white-{$character.inve}.png" width="74" alt="[{$character.inve} white]"></button>
            <p>+<img src="/img/d6-char-sheet/d6-black-small-icon.png" width="15em" alt="black"> /30s</p>
        </div>
        <div class="grid-stat">
            <h3>Examination</h3>
            <button><img src="/img/d6-char-sheet/d6-white-{$character.exam}.png" width="74" alt="[{$character.exam} white]"></button>
            <p>+<img src="/img/d6-char-sheet/d6-black-small-icon.png" width="15em" alt="black"> /1min</p>
        </div>
        <div class="grid-stat">
            <h3>Detection</h3>
            <button><img src="/img/d6-char-sheet/d6-white-{$character.dete}.png" width="74" alt="[{$character.dete} white]"></button>
            <p>+<img src="/img/d6-char-sheet/d6-black-small-icon.png" width="15em" alt="black"> /5min</p>
        </div>


        <hr class="grid-hr">

        <h2 class="grid-header grid-h2-sticky-top">Aptitudes</h2>

        <div class="grid-stat grid-stat-sticky-top">
            <h3>Might</h3>
            <button><img src="/img/d6-char-sheet/d6-white-{$character.mig}.png" width="74" alt="[{$character.mig} white]"></button>
        </div>
        <div class="grid-stat grid-stat-sticky-top">
            <h3>Finesse</h3>
            <button><img src="/img/d6-char-sheet/d6-white-{$character.fin}.png" width="74" alt="[{$character.fin} white]"></button>
        </div>
        <div class="grid-stat grid-stat-sticky-top">
            <h3>Artifice</h3>
            <button><img src="/img/d6-char-sheet/d6-white-{$character.art}.png" width="74" alt="[{$character.art} white]"></button>
        </div>
        <div class="grid-stat grid-stat-sticky-top">
            <h3>Tuning</h3>
            <button><img src="/img/d6-char-sheet/d6-white-{$character.tun}.png" width="74" alt="[{$character.tun} white]"></button>
        </div>

        <h4 class="grid-header grid-h4-sticky-top">Saves</h4>

        <div class="grid-skill">
            <p>S</p>
            <button><img src="/img/d6-char-sheet/d6-black-{$character.mig}.png" width="50" alt="[{$character.mig} black]"></button>
        </div>
        <div class="grid-skill">
            <p>S</p>
            <button><img src="/img/d6-char-sheet/d6-black-{$character.fin}.png" width="50" alt="[{$character.fin} black]"></button>
        </div>
        <div class="grid-skill">
            <p>S</p>
            <button><img src="/img/d6-char-sheet/d6-black-{$character.art}.png" width="50" alt="[{$character.art} black]"></button>
        </div>
        <div class="grid-skill">
            <p>S</p>
            <button><img src="/img/d6-char-sheet/d6-black-{$character.tun}.png" width="50" alt="[{$character.tun} black]"></button>
        </div>

        <h4 class="grid-header grid-h4-sticky-top">Exploration</h4>

        <div class="grid-skill">
            <p>S</p>
            <p>Might<button><img src="/img/d6-char-sheet/d6-black-{$character.mig}.png" width="50" alt="[{$character.mig} black]"></button></p>
        </div>
        <div class="grid-skill">
            <p>S</p>
            <p>Might<button><img src="/img/d6-char-sheet/d6-black-{$character.fin}.png" width="50" alt="[{$character.fin} black]"></button></p>
        </div>
        <div class="grid-skill">
            <p>S</p>
            <p>Might<button><img src="/img/d6-char-sheet/d6-black-{$character.art}.png" width="50" alt="[{$character.art} black]"></button></p>
        </div>
        <div class="grid-skill">
            <p>S</p>
            <p>Might<button><img src="/img/d6-char-sheet/d6-black-{$character.tun}.png" width="50" alt="[{$character.tun} black]"></button></p>
        </div>

        <h4 class="grid-header grid-h4-sticky-top">Knowledge</h4>

        <div class="grid-skill">
            <p>S</p>
            <p>Might<button><img src="/img/d6-char-sheet/d6-black-{$character.mig}.png" width="50" alt="[{$character.mig} black]"></button></p>
        </div>
        <div class="grid-skill">
            <p>S</p>
            <p>Might<button><img src="/img/d6-char-sheet/d6-black-{$character.fin}.png" width="50" alt="[{$character.fin} black]"></button></p>
        </div>
        <div class="grid-skill">
            <p>S</p>
            <p>Might<button><img src="/img/d6-char-sheet/d6-black-{$character.art}.png" width="50" alt="[{$character.art} black]"></button></p>
        </div>
        <div class="grid-skill">
            <p>S</p>
            <p>Might<button><img src="/img/d6-char-sheet/d6-black-{$character.tun}.png" width="50" alt="[{$character.tun} black]"></button></p>
        </div>

        <div class="grid-skill">
            <p>S</p>
            <p>Might<button><img src="/img/d6-char-sheet/d6-black-{$character.mig}.png" width="50" alt="[{$character.mig} black]"></button></p>
        </div>
        <div class="grid-skill">
            <p>S</p>
            <p>Might<button><img src="/img/d6-char-sheet/d6-black-{$character.fin}.png" width="50" alt="[{$character.fin} black]"></button></p>
        </div>
        <div class="grid-skill">
            <p>S</p>
            <p>Might<button><img src="/img/d6-char-sheet/d6-black-{$character.art}.png" width="50" alt="[{$character.art} black]"></button></p>
        </div>
        <div class="grid-skill">
            <p>S</p>
            <p>Might<button><img src="/img/d6-char-sheet/d6-black-{$character.tun}.png" width="50" alt="[{$character.tun} black]"></button></p>
        </div>
        
        <h4 class="grid-header grid-h4-sticky-top">Equipment</h4>

        <div class="grid-skill">
            <p>S</p>
            <p>Might<button><img src="/img/d6-char-sheet/d6-black-{$character.mig}.png" width="50" alt="[{$character.mig} black]"></button></p>
        </div>
        <div class="grid-skill">
            <p>S</p>
            <p>Might<button><img src="/img/d6-char-sheet/d6-black-{$character.fin}.png" width="50" alt="[{$character.fin} black]"></button></p>
        </div>
        <div class="grid-skill">
            <p>S</p>
            <p>Might<button><img src="/img/d6-char-sheet/d6-black-{$character.art}.png" width="50" alt="[{$character.art} black]"></button></p>
        </div>
        <div class="grid-skill">
            <p>S</p>
            <p>Might<button><img src="/img/d6-char-sheet/d6-black-{$character.tun}.png" width="50" alt="[{$character.tun} black]"></button></p>
        </div>

        <div class="grid-skill">
            <p>S</p>
            <p>Might<button><img src="/img/d6-char-sheet/d6-black-{$character.mig}.png" width="50" alt="[{$character.mig} black]"></button></p>
        </div>
        <div class="grid-skill">
            <p>S</p>
            <p>Might<button><img src="/img/d6-char-sheet/d6-black-{$character.fin}.png" width="50" alt="[{$character.fin} black]"></button></p>
        </div>
        <div class="grid-skill">
            <p>S</p>
            <p>Might<button><img src="/img/d6-char-sheet/d6-black-{$character.art}.png" width="50" alt="[{$character.art} black]"></button></p>
        </div>
        <div class="grid-skill">
            <p>S</p>
            <p>Might<button><img src="/img/d6-char-sheet/d6-black-{$character.tun}.png" width="50" alt="[{$character.tun} black]"></button></p>
        </div>
    </div>
</div>

<style>

#name-input {
    font-size: x-large;
    text-align: center;
    min-width: 10px;
    max-width: 90%;
    border: 0;
    background-color: transparent;
}
#name-input {
    font-size: x-large;
    min-width: 10px;
}

.edit-button {
    width: 1em;
    height: 1em;
    padding: 0;
    background-color: transparent;
    background-image: url("/img/pencil.svg");
    background-repeat: no-repeat;
    background-position: center;
}

.main-grid {
    display: grid;
    overflow: scroll;
    height: 90vh; 
    background-color: #000000;
    color: #FDF6E3;
    grid-template-columns: auto auto auto auto;
    gap: 10px;
    margin: 0px;
    padding: 0px;
}

.main-grid > h2,
.main-grid > h3,
.main-grid > h4,
.main-grid > p {
    width: calc( 84vw - 10px - 16px - 30px );
    max-width: calc( 550pt - 10px - 16px - 30px );
    text-align: left;
    margin: 0px;
}

.main-grid h2 { font-size: 18pt; }
.main-grid h3 { font-size: 16pt; }
.main-grid h4 { font-size: 14pt; }
.main-grid p { font-size: 12pt; }

.grid-header {
    position: sticky;
    left: 0px;
    width: auto;
    max-width: none;
    background-color: black;
    grid-column-start: 1;
    grid-column-end: 5;
    width: calc(100vw - 112px);
    max-width: calc(550pt - 112px);
    margin: 0px;
    padding: 0px 10px;
    text-align: left;
}


.grid-hr {
    grid-column-start: 1;
    grid-column-end: 5;
    width: 100%;
}

.grid-stat {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    background-color: black;
    margin: 0px -5px;
    padding: 10px;
}
.grid-stat h3 {
    margin-bottom: 4px;
}

.grid-stat button {
    width: 84px;
    height: 84px;
    padding: 0px;
    align-self: center;
    justify-self: center;
}

.grid-h2-sticky-top {
    top: 0px;
}
.grid-stat-sticky-top {
    position: sticky;
    top: calc(18pt + 10px);
}
.grid-h4-sticky-top {
    top: calc(18pt + 104px);
}


</style>