import { validate, NIL } from 'uuid'

export class Background {
    public name: string = "";
    public description: string = "";
}


export interface Stat { mod: number; }

export type SocialStatStrings = "Pressure" | "Captivation" | "Credibility";
export interface SocialSkill { stat: SocialStatStrings; mod: number; }

export class SocialProfile {
    public readonly stats: { [name: string]: Stat } = {
        Pressure: { mod: 0 },
        Captivation: { mod: 0 },
        Credibility: { mod: 0 },
    }

    public readonly passives: { [name: string]: SocialSkill } = {
        Composure: { stat: "Pressure", mod: 0 },
        Awareness: { stat: "Captivation", mod: 0 },
        Insight: { stat: "Credibility", mod: 0 },
    }
    public readonly sways: { [name: string]: SocialSkill } = {
        Provocation: { stat: "Pressure", mod: 0 }, Poignancy: { stat: "Captivation", mod: 0 },
        Parlaying: { stat: "Pressure", mod: 0 }, Candor: { stat: "Credibility", mod: 0 },
        Enthrallment: { stat: "Captivation", mod: 0 }, Deception: { stat: "Credibility", mod: 0 },
    }
}

export type ExplorerStatStrings = "Might" | "Finesse" | "Tuning";
export interface ExplorerSkill { stat: ExplorerStatStrings; mod: number; }

export class ExplorerProfile {
    public readonly stats: { [name: string]: Stat } = {
        Might: { mod: 0 },
        Finesse: { mod: 0 },
        Tuning: { mod: 0 },
    }

    public readonly saves: { [name: string]: ExplorerSkill } = {
        Fortitude: { stat: "Might", mod: 0 },
        Cunning: { stat: "Finesse", mod: 0 },
        Willpower: { stat: "Tuning", mod: 0 },
    }
    public readonly perceptions: { [name: string]: ExplorerSkill } = {
        Tracking: { stat: "Might", mod: 0 },
        Analysis: { stat: "Finesse", mod: 0 },
        Sensing: { stat: "Tuning", mod: 0 },
    }
    public readonly explorations: { [name: string]: ExplorerSkill } = {
        Athletics: { stat: "Might", mod: 0 }, Hiding: { stat: "Might", mod: 0 },
        Tinkering: { stat: "Finesse", mod: 0 }, Stealth: { stat: "Finesse", mod: 0 },
        Rituals: { stat: "Tuning", mod: 0 }, Sleight: { stat: "Tuning", mod: 0 },
    }
    public readonly knowledges: { [name: string]: ExplorerSkill } = {
        Security: { stat: "Might", mod: 0 }, Wayfaring: { stat: "Might", mod: 0 },
        History: { stat: "Finesse", mod: 0 }, Rumor: { stat: "Finesse", mod: 0 },
        Discordance: { stat: "Tuning", mod: 0 }, Harmony: { stat: "Tuning", mod: 0 },
    }
    public readonly equipments: { [name: string]: ExplorerSkill } = {
        Heavy: { stat: "Might", mod: 0 }, Simple: { stat: "Might", mod: 0 },
        Complex: { stat: "Finesse", mod: 0 }, Light: { stat: "Finesse", mod: 0 },
        Dissonant: { stat: "Tuning", mod: 0 }, Harmonic: { stat: "Tuning", mod: 0 },
    }
}


export class HnsCharacter {

    private _id: string = "";
    public get id(): string { return this._id; }
    private set id(value: string) {
        if (!validate(value)) { this._id = NIL; return; }
        this._id = value;
    }

    public readonly background: Background = new Background();

    public get name(): string { return this.background.name; }
    public set name(value: string) { this.background.name = value; }


    // ____ Standalone Values ____
    // The values stored in these are the raw or core values that are then
    // modified by the classes, items, etc.
    public readonly socialProfile: SocialProfile = new SocialProfile();
    public readonly explorerProfile: ExplorerProfile = new ExplorerProfile();


    constructor(p_id: string = "") {
        this.id = p_id;
        this.name = ""
    }

    public static FromJson(json: string): HnsCharacter {
        return Object.assign(new HnsCharacter(), JSON.parse(json))
    }
}

