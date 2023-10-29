

export interface FeatDescription {
    id: string;
    name: string;
    shortDescription: string;
    longDescription: string;
}

export interface ConstitutionFeatDescription extends FeatDescription {
}

export let DefaultConstitutionFeat = "bc98c68d-980d-445d-9d09-1b3ee57cd011"
export let ConstitutionFeats: Array<ConstitutionFeatDescription> = [
    {
        id: "bc98c68d-980d-445d-9d09-1b3ee57cd011",
        name: "Mortal Soul",
        shortDescription: "You have a mortal soul. On death, you fight on as a spirit.",
        longDescription: "You have a mortal soul. On death, you fight on as a spirit...",
        // Maybe the higher level lets you fight on in spirit, where at first you can just inpire others. Give advantage or extra actions?
        // Maybe offer your moves and abilities to others for the rest of the fight/day?
    },
    {
        id: "90269767-285b-4ce2-8a19-d82044fcf8e0",
        name: "Plane-bound Spirit",
        shortDescription: "Your health and vitality are halved, but only magic and silver can hurt you. On death, you cease to exist.",
        longDescription: "Your health and vitality are halved, but only magic and silver can hurt you. On death, you cease to exist..."
    },
    {
        id: "456ab2e2-fc47-4e87-a4b3-209c0245049a",
        name: "Immortal",
        shortDescription: "Your vitality is doubled. On death, you cease to exist.",
        longDescription: "Your vitality is doubled. On death, you cease to exist..."
    },
    {
        id: "bdb6b358-47a7-4061-adeb-5acfb3f2ecf7",
        name: "Automaton",
        shortDescription: "You are a machine. Your health is converted to vitality, which can only be mended, not healed. On death, you cease to exist.",
        longDescription: "You are a machine. Your health is converted to vitality, which can only be mended, not healed. On death, you cease to exist..."
    },
    {
        id: "ae9aab6f-aa68-4bcd-838c-3fe3346b55b4",
        name: "Vampirism",
        shortDescription: "You are a vampire. You have half the vitality, but can only be killed by magic or a stake to the heart.",
        longDescription: "You are a vampire. You have half the vitality, but can only be killed by magic or a stake to the heart..."
    },
    {
        id: "711dcbef-291d-4bcf-852c-3062d2586bc4",
        name: "Swarmism",
        shortDescription: "You are a living swarm. Your health is converted to vitality. On death, you fight on as a discorporated swarm.",
        longDescription: "You are a living swarm. Your health is converted to vitality. On death, you fight on as a discorporated swarm..."
    }
]

export interface TraitFeatDescription extends FeatDescription {
}
export let TraitFeats: Array<TraitFeatDescription> = [
    {
        id: "d6415979-cf3c-4258-8f12-f746c013dbfe",
        name: "Breathless",
        shortDescription: "You do not need to breathe.",
        longDescription: "You do not need to breathe...",
        // Higher level means you can cast verbal spells underwater or while mouth is blocked.
    },
    {
        id: "489f3d7d-42c4-4a7b-9e8f-9fa9804c4992",
        name: "Sleepless",
        shortDescription: "You do not need to sleep",
        longDescription: "You do not need to sleep...",
        // Still need to meditate or rest fully awake. Higher level removes that requirement.
    },
    {
        id: "da6a73f0-9b4b-4a32-9837-b34e95f05113",
        name: "Foodless",
        shortDescription: "You do not need to eat",
        longDescription: "You do not need to eat...",
        // Still require liquids of some kind? Higher level removes that?
    }
]

export interface SocialFeatDescription extends FeatDescription {
}
export let SocialFeats: Array<SocialFeatDescription> = []