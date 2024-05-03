import { validate, NIL } from 'uuid'
import { ConstitutionFeats, TraitFeats, type FeatDescription, SocialFeats } from './HnsCompendium';

export abstract class Feat {
    public id: string = NIL;

    public compendiumId: string = NIL;
    abstract get compendium(): Array<FeatDescription>;
    private _compendiumRes: FeatDescription|undefined;
    public get compendiumRes(): FeatDescription {
        if (this._compendiumRes?.id === this.compendiumId) return this._compendiumRes;
        this._compendiumRes = this.compendium.find( f => f.id === this.compendiumId ) ?? ({ id:this.compendiumId } as FeatDescription)
        return this._compendiumRes
    }

    public get name(): string { return this.compendiumRes.name ?? "--Error--" }
    public get shortDescription(): string { return this.compendiumRes.shortDescription ?? "--Error--" }
    public get longDescription(): string { return this.compendiumRes.longDescription ?? "--Error--" }

    constructor (compendiumId: string) {
        this.compendiumId = compendiumId
    }
}

export class ConstitutionFeat extends Feat {
    public get compendium() { return ConstitutionFeats }
}

export class TraitFeat extends Feat {
    public get compendium() { return TraitFeats }
}

export class SocialFeat extends Feat {
    public get compendium() { return SocialFeats }
}


export enum StatGenMethodEnum { Manual = "Manual", Roll = "Roll" }

export enum StatEnum { Candor = "Candor", Conscious = "Conscious", Cunning = "Cunning", Might = "Might", Artifice = "Artifice", Tuning = "Tuning" }
var statEnumKeys = Object.keys(StatEnum);
export function isValidStat( stat: StatEnum ) { return statEnumKeys.includes(stat); }
export function isSocialStat( stat: StatEnum ) { return stat == StatEnum.Candor || stat == StatEnum.Conscious || stat == StatEnum.Cunning }

export interface Stat { mod: number };

export interface Skill { stat: StatEnum; points?: 0|1|2; inspiration?: boolean; overrideStat?: StatEnum; }


export class PlayerCharacter {

    private _id: string = "";
    public get id(): string { return this._id; }
    private set id(value: string) {
        if (!validate(value)) { this._id = NIL; return; }
        this._id = value;
    }

    //## Description
    public name: string = "";
    public description: string = "";

    //## Feats
    public constitutionFeat: ConstitutionFeat | undefined;
    public traitFeats: Array<TraitFeat> = [];
    public socialFeats: Array<SocialFeat> = [];


    //# ____ Stat Generation ____
    public socialStatGenMethod: StatGenMethodEnum = StatGenMethodEnum.Manual;
    public explorationStatGenMethod: StatGenMethodEnum = StatGenMethodEnum.Manual;
    public readonly statGen_Roll: { [Keys in StatEnum]?: number } = { }
    public readonly statGen_Manual: { [Keys in StatEnum]?: number } = { }

    private _getBaseStat( stat: StatEnum ): number {
        let genMethod = isSocialStat(stat) ? this.socialStatGenMethod : this.explorationStatGenMethod;
        if (genMethod == StatGenMethodEnum.Manual) return this.statGen_Manual[stat] ?? -2;
        if (genMethod == StatGenMethodEnum.Roll) return this.statGen_Roll[stat] ?? -2;
        return -2;
    }
    public GetStat( stat: StatEnum ): number {
        return this._getBaseStat( stat ); // TODO: Add in improvements as well
    }
    public GetStatString( stat: StatEnum ): string {
        let mod = this.GetStat( stat );
        return mod < -1 ? "--" : (mod<0 ? "" : "+")+mod;
    }


    // ____ Skills ____
    private _getSkill( name: string, skillCollection: { [name: string]: Skill } ): number {
        var skill = skillCollection[name];
        if (!skill) return -2;
        var stat = skill.overrideStat ? skill.overrideStat : skill.stat;
        var mod = !isValidStat(stat) ? -2 : this.GetStat(stat);
        return mod + (skill.points ?? 0) + (skill.inspiration ? 1 : 0);
    }
    public GetSocialSkill( name: string ): number { return this._getSkill( name, this.socialSkills ); }
    public GetExplorationSkill( name: string ): number { return this._getSkill( name, this.explorationSkills ); }
    public GetSocialSkillString( name: string ): string {
        let m = this.GetSocialSkill( name );
        return m < -1 ? "--" : (m<0 ? "" : "+") + m;
    }
    public GetExplorationSkillString( name: string ): string {
        let m = this.GetExplorationSkill( name );
        return m < -1 ? "--" : (m<0 ? "" : "+") + m;
    }


    public readonly socialSkills: { [name: string]: Skill } = {
        // Major
        Persuasion: { stat: StatEnum.Candor },
        Insight: { stat: StatEnum.Conscious },
        Deception: { stat: StatEnum.Cunning },

        // Minor
        Captivation: { stat: StatEnum.Candor },
        Awareness: { stat: StatEnum.Conscious },
        Portrayal: { stat: StatEnum.Cunning },

        Poignancy: { stat: StatEnum.Candor },
        Composure: { stat: StatEnum.Conscious },
        Pressure: { stat: StatEnum.Cunning },
    }

    public readonly explorationSkills: { [name: string]: Skill } = {
        // Major
        Scouting: { stat: StatEnum.Might },
        Analysis: { stat: StatEnum.Artifice },
        Sensing: { stat: StatEnum.Tuning },

        Sneaking: { stat: StatEnum.Might },
        Finesse: { stat: StatEnum.Artifice },
        Hiding: { stat: StatEnum.Tuning },
        
        // Minor
        Athletics: { stat: StatEnum.Might },
        History: { stat: StatEnum.Artifice },
        Discord: { stat: StatEnum.Tuning },

        Security: { stat: StatEnum.Might },
        Rumor: { stat: StatEnum.Artifice },
        Harmony: { stat: StatEnum.Tuning },

        Wayfaring: { stat: StatEnum.Might },
        Tinkering: { stat: StatEnum.Artifice },
        Rituals: { stat: StatEnum.Tuning },
    }


    constructor(p_id: string = "") {
        this.id = p_id;
        this.name = ""
    }

    public static FromJson(json: string): PlayerCharacter {
        return Object.assign(new PlayerCharacter(), JSON.parse(json))
    }
}

