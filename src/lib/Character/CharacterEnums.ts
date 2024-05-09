
export enum StatEnum {
    // Social
    Candor = "Candor", Conscious = "Conscious", Cunning = "Cunning",
    // Exploration
    Might = "Might", Artifice = "Artifice", Tuning = "Tuning",
}
export const SocialStats = [ StatEnum.Candor, StatEnum.Conscious, StatEnum.Cunning ];
export const ExplorationStats = [ StatEnum.Might, StatEnum.Artifice, StatEnum.Tuning ];
export const Stats = [ ...SocialStats, ...ExplorationStats ];


export enum SocialSkillEnum {
    // Major
    Persuasion = "Persuasion", Insight = "Insight", Deception = "Deception",
    // Minor
    Captivation = "Captivation", Awareness = "Awareness", Portrayal = "Portrayal",
    Poignancy = "Poignancy", Composure = "Composure", Pressure = "Pressure",
};
export const MajorSocialSkills = [ SocialSkillEnum.Persuasion, SocialSkillEnum.Insight, SocialSkillEnum.Deception ];
export const MinorSocialSkills = [ SocialSkillEnum.Captivation, SocialSkillEnum.Awareness, SocialSkillEnum.Portrayal, SocialSkillEnum.Poignancy, SocialSkillEnum.Composure, SocialSkillEnum.Pressure ];
export const SocialSkills = [ ...MajorSocialSkills, ...MinorSocialSkills ]

export enum ExplorationSkillEnum {
    // Major
    Scouting = "Scouting", Analysis = "Analysis", Sensing = "Sensing",
    Sneaking = "Sneaking", Finesse = "Finesse", Hiding = "Hiding",
    // Minor
    Athletics = "Athletics", History = "History", Discord = "Discord",
    Security = "Security", Rumor = "Rumor", Harmony = "Harmony",
    Wayfaring = "Wayfaring", Tinkering = "Tinkering", Rituals = "Rituals",
}
export const MajorExplorationSkills = [ ExplorationSkillEnum.Scouting, ExplorationSkillEnum.Analysis, ExplorationSkillEnum.Sensing, ExplorationSkillEnum.Sneaking, ExplorationSkillEnum.Finesse, ExplorationSkillEnum.Hiding ];
export const MinorExplorationSkills = [ ExplorationSkillEnum.Athletics, ExplorationSkillEnum.History, ExplorationSkillEnum.Discord, ExplorationSkillEnum.Security, ExplorationSkillEnum.Rumor, ExplorationSkillEnum.Harmony, ExplorationSkillEnum.Wayfaring, ExplorationSkillEnum.Tinkering, ExplorationSkillEnum.Rituals ];
export const ExplorationSkills = [ ...MajorExplorationSkills, ...MinorExplorationSkills ]

export const SkillToStatLookup: { [keys in SocialSkillEnum | ExplorationSkillEnum]: StatEnum } = {
    // Social
    Persuasion: StatEnum.Candor, Insight: StatEnum.Conscious, Deception: StatEnum.Cunning,
    Captivation: StatEnum.Candor, Awareness: StatEnum.Conscious, Portrayal: StatEnum.Cunning,
    Poignancy: StatEnum.Candor, Composure: StatEnum.Conscious, Pressure: StatEnum.Cunning,
    // Exploration
    Scouting: StatEnum.Might, Analysis: StatEnum.Artifice, Sensing: StatEnum.Tuning,
    Sneaking: StatEnum.Might, Finesse: StatEnum.Artifice, Hiding: StatEnum.Tuning,
    Athletics: StatEnum.Might, History: StatEnum.Artifice, Discord: StatEnum.Tuning,
    Security: StatEnum.Might, Rumor: StatEnum.Artifice, Harmony: StatEnum.Tuning,
    Wayfaring: StatEnum.Might, Tinkering: StatEnum.Artifice, Rituals: StatEnum.Tuning,
}
