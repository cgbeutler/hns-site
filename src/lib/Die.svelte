<script lang="ts">
    export let faces :number = 6;
    export let showPips :boolean = false;
    export let result :number = Infinity;
    export let active :boolean = false;
    export let enabled :boolean = true;
    export let invert :boolean = false;

    const fateFlag :number = -1;
    const eyeFlag :number = -2;

    let die;

    function _roll() {
        if (faces > 0) return Math.floor( Math.random() * faces ) + 1;
        if (faces == fateFlag) return Math.floor( Math.random() * 3 ) - 1;
        if (faces == eyeFlag) {
            var sixes = Math.floor( Math.random() * 6 ) + 1;
            if (sixes == 1) return 1
            if (sixes == 2 || sixes == 3) return 2
            if (sixes == 4 || sixes == 5 || sixes == 6) return 3
        }
        return 0;
    }
    function _restartAnimation() {
        if (!die) return;
        die.style.animation = 'none';
        die.offsetHeight;
        die.style.animation = null;
    }

    export function roll() {
        if (!enabled) return;
        result = _roll();
        active = false;
        _restartAnimation();
    }
    export function rollIfActive() {
        if (!active || !enabled) return;
        result = _roll();
        active = false;
        _restartAnimation();
    }

    $: result = enabled ? _roll() : result
</script>

<button bind:this={die} type="button" class:active={active} class:inverted={invert} class:show-pips={showPips}
    on:click={() => {active = enabled && !active}}
    class="die
        faces-{faces == fateFlag ? "F" : faces == eyeFlag ? "E" : faces}
        result-{result}
    "
    >
    {result == Infinity ? "?" : result}
</button>

<style>

.die {
    display: inline-flex;
    background-image: url('/img/dice/d6.svg');
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    color: black;
    width: 48px;
    height: 48px;
    margin: 0px;
    border: 0px;
    padding: 0px;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    animation-name: shake;
    animation-duration: 0.2s;
    transform-origin: 50% 50%;
    animation-iteration-count: 1;
}
.die.active {
    animation-name: shake;
    animation-duration: 0.4s;
    transform-origin: 50% 50%;
    animation-iteration-count: infinite;
}

.die.faces-2 { background-image: url('/img/dice/d2.svg'); }
.die.faces-4 { background-image: url('/img/dice/d4.svg'); }
.die.faces-6 { background-image: url('/img/dice/d6.svg'); }
.die.faces-8 { background-image: url('/img/dice/d8.svg'); }
.die.faces-10 { background-image: url('/img/dice/d10.svg'); }
.die.faces-12 { background-image: url('/img/dice/d12.svg'); }
.die.faces-20 { background-image: url('/img/dice/d20.svg'); }
.die.faces-F { background-image: url('/img/dice/dF.svg'); font-size: 0px; }

.die.show-pips.faces-6.result-1 { background-image: url('/img/dice/d6-1.svg'); font-size: 0px; }
.die.show-pips.faces-6.result-2 { background-image: url('/img/dice/d6-2.svg'); font-size: 0px; }
.die.show-pips.faces-6.result-3 { background-image: url('/img/dice/d6-3.svg'); font-size: 0px; }
.die.show-pips.faces-6.result-4 { background-image: url('/img/dice/d6-4.svg'); font-size: 0px; }
.die.show-pips.faces-6.result-5 { background-image: url('/img/dice/d6-5.svg'); font-size: 0px; }
.die.show-pips.faces-6.result-6 { background-image: url('/img/dice/d6-6.svg'); font-size: 0px; }

.die.faces-F.result--1 { background-image: url('/img/dice/dF-plus.svg'); font-size: 0px; }
.die.faces-F.result-1 { background-image: url('/img/dice/dF-minus.svg'); font-size: 0px; }

.die.faces-E.result-1 { background-image: url('/img/dice/d6-snake.svg'); font-size: 0px; }
.die.faces-E.result-2 { background-image: url('/img/dice/d6-bat.svg'); font-size: 0px; }
.die.faces-E.result-3 { background-image: url('/img/dice/d6-fish.svg'); font-size: 0px; }

.die.inverted { filter: invert(100%); -webkit-filter: invert(100%); }


@keyframes shake {
    0% { -webkit-transform: translate(1px, 1px) rotate(0deg); } 
    10% { -webkit-transform: translate(-1px, -1px) rotate(-1deg); }
    20% { -webkit-transform: translate(-1px, 0px) rotate(1deg); }
    30% { -webkit-transform: translate(0px, 1px) rotate(0deg); }
    40% { -webkit-transform: translate(1px, -1px) rotate(1deg); }
    50% { -webkit-transform: translate(-1px, 1px) rotate(-1deg); }
    60% { -webkit-transform: translate(-1px, 1px) rotate(0deg); }
    70% { -webkit-transform: translate(1px, 1px) rotate(-1deg); }
    80% { -webkit-transform: translate(-1px, -1px) rotate(1deg); }
    90% { -webkit-transform: translate(1px, 1px) rotate(0deg); }
    100% { -webkit-transform: translate(1px, -1px) rotate(-1deg); }
}

</style>