<script lang="ts">
    import { openModal } from "svelte-modals";
    import ConfirmModal from "./ConfirmModal.svelte";
    import { ConstitutionFeat } from "../HnsCharacter";
    import type { ConstitutionFeatDescription, FeatDescription } from "../HnsCompendium";
    import FeatSelectModal from "./FeatSelectModal.svelte";

    export let feat: ConstitutionFeat|undefined;
    export let options: Array<ConstitutionFeatDescription>|undefined
    export let readonly = false;
    let constitutionHasFlavors = true;

    $: featDescription = options?.find((f) => f.id == feat?.compendiumId)

    let expanded = false;
    
    function showConstitionSelectionModal() {
        if (!options) return;
        openModal(FeatSelectModal, {
            options,
            onSelected: (newFeat: FeatDescription) => { feat = new ConstitutionFeat( newFeat.id ) }
        });
    }
    function confirmDelConstitution() {
        openModal(ConfirmModal, {
            question: "Remove Constitution?",
            onConfirm: () => { feat = undefined }
        });
    }
</script>

    <div class="feat-box">
        {#if !feat}
            <div class="feat-header">
                <h4>No feat selected</h4>
                {#if options}
                    <button class="delete-button" on:click={showConstitionSelectionModal}>+</button>
                {/if}
            </div>
        {:else}
            <div class="feat-header">
                <h4>{featDescription?.name ?? "--Error--"}</h4>
                <div>
                    {#if !expanded}
                        <button class="delete-button" on:click={()=>expanded=true}>&gt;</button>
                    {:else}
                        {#if !readonly}
                            <button class="delete-button" on:click={confirmDelConstitution}>x</button>
                        {/if}
                        <button class="delete-button" on:click={()=>expanded=false}>v</button>
                    {/if}
                </div>
            </div>
            <p>{(expanded ? featDescription?.longDescription : featDescription?.shortDescription) ?? "--Error--"}</p>
        {/if}
    </div>

<style>
    .feat-box {
        display: flex;
        flex-direction: column;
        padding: 5px;
        border: 1px solid white;
    }
    .feat-header {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
    }
</style>