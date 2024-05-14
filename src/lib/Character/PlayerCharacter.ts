import { validate, NIL } from 'uuid'
import { clamp } from '../Helpers/MathHelpers'
import { ConstitutionFeats, TraitFeats, type FeatDescription, SocialFeats } from '../HnsCompendium';
import { ExplorationSkillEnum, ExplorationSkills, SkillToStatLookup, SocialSkillEnum, SocialSkills, SocialStats, StatEnum, Stats } from './CharacterEnums';

// Takes in a tracker reward list and reverses it to make a level->reward lookup table
function _reverseRewards( trackerRewards: {[reward: string]: Array<number>} ): Array<{[reward: string]: number}> {
  let levels = trackerRewards[Object.keys(trackerRewards).at(0)??""].length;
  let result = Array.from( {length: levels}, (_v, i) => {
    return Object.fromEntries( Object.keys(trackerRewards).map((key) => {
      return [key, trackerRewards[key].slice(0, i+1).reduce((p, a)=> p+a, 0)]
    }))
  });
  console.log(result);
  return result;
}

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


export interface Stat { mod: number };
export interface Skill { points: 0|1|2; inspiration: boolean; overrideStat?: StatEnum; }


export class PlayerCharacter {
  public lookup( key: string ) {
    return (<any> this)[key];
  }

  private _id: string = "";
  public get id(): string { return this._id; }
  private set id(value: string) {
    if (!validate(value)) { this._id = NIL; return; }
    this._id = value;
  }


  //# ____ Background ____
  //## _ Description _
  public name: string = "";
  public description: string = "";

  //## _ Level Trackers _
  private _experience: number = 0;
  public get experience() { return this._experience }
  public set experience( n: number ) { this._experience = clamp(n, 0, 10) }

  private _level: number = 1;
  public get level() { return this._level }
  public set level( n: number ) { this._level = clamp(n, 1, 20) }
  public readonly levelTrackerPerks: {[reward: string]: Array<number>} = {
    StatPoints:             [5, 0, 1, 0, 1,  0, 1, 0, 1, 0,  1, 0, 1, 0, 1,  0, 1, 0, 1, 1],
    SocialSkillPoints:      [5, 0, 0, 1, 0,  0, 0, 1, 0, 0,  0, 1, 0, 0, 0,  1, 0, 0, 0, 0],
    ExplorationSkillPoints: [7, 1, 0, 0, 0,  1, 0, 0, 0, 1,  0, 0, 0, 1, 0,  0, 0, 1, 0, 0],
    SocialFeatPoints:       [2, 0, 0, 0, 0,  1, 0, 0, 0, 0,  1, 0, 0, 0, 0,  1, 0, 0, 0, 0],
    TraitFeatPoints:        [5, 0, 1, 0, 1,  0, 1, 0, 1, 0,  1, 0, 1, 0, 1,  0, 1, 0, 1, 1],
    ClassFeatPoints:        [3, 1, 0, 1, 0,  1, 0, 1, 0, 1,  0, 1, 0, 1, 0,  1, 1, 1, 1, 1],
    PrestigeFeatPoints:     [0, 0, 0, 0, 1,  0, 0, 0, 0, 1,  0, 0, 0, 0, 1,  0, 0, 1, 0, 1],
  }
  public readonly allLevelPerks = _reverseRewards(this.levelTrackerPerks);
  private get levelPerks() { return this.allLevelPerks[clamp(this._level-1, 0, 19)] }
  public get StatPoints() { return this.levelPerks.StatPoints; }
  public get SocialSkillPoints() { return this.levelPerks.SocialSkillPoints; }
  public get ExplorationSkillPoints() { return this.levelPerks.ExplorationSkillPoints; }
  public get SocialFeatPoints() { return this.levelPerks.SocialFeatPoints; }
  public get TraitFeatPoints() { return this.levelPerks.TraitFeatPoints; }
  public get ClassFeatPoints() { return this.levelPerks.ClassFeatPoints; }
  public get PrestigeFeatPoints() { return this.levelPerks.PrestigeFeatPoints; }

  public warriorLevel: number = 0;
  public readonly warriorTrackerPerks = {
    GeneralWealth: [0,  0, 1, 0, 0, 1,  0, 1, 0, 0, 1,  0, 0, 1, 0, 0],
    FortitudeSave: [0,  0, 1, 0, 1, 0,  1, 0, 1, 0, 0,  1, 0, 0, 1, 0],
    WarriorSkill:  [0,  0, 0, 1, 0, 0,  0, 0, 0, 1, 0,  0, 0, 0, 0, 1],
    ShieldMax:     [0,  1, 0, 1, 0, 1,  0, 0, 0, 1, 0,  0, 0, 1, 0, 1],
    CloseDamage:   [2,  0, 1, 0, 0, 0,  0, 1, 0, 0, 0,  0, 1, 0, 0, 0],
    WarriorPoints: [0,  1, 0, 0, 1, 0,  1, 0, 0, 0, 1,  0, 0, 0, 1, 0],
  }
  public readonly allWarriorPerks = _reverseRewards(this.warriorTrackerPerks);
  private get warriorPerks() { return this.allWarriorPerks[clamp(this.warriorLevel, 0, 15)] }
  public get GeneralWealth() { return this.warriorPerks.GeneralWealth; }
  public get FortitudeSave() { return this.warriorPerks.FortitudeSave; }
  public get StartingWarriorSkill() { return this.Might; }
  public get WarriorSkill() { return this.StartingWarriorSkill + this.warriorPerks.WarriorSkill; }
  public get ShieldMax() { return this.warriorPerks.ShieldMax; }
  public get StartingCloseDamage() { return 0; /* TODO: +features */ }
  public get CloseDamage() { return this.StartingCloseDamage + this.warriorPerks.CloseDamage; }
  public get WarriorPoints() { return this.warriorPerks.WarriorPoints; }

  public specialistLevel: number = 0;
  public readonly specialistTrackerPerks = {
    GreyWealth:       [0,  0, 1, 0, 0, 1,  0, 1, 0, 0, 1,  0, 0, 1, 0, 0],
    InitiativeSave:   [0,  0, 1, 0, 1, 0,  1, 0, 1, 0, 0,  1, 0, 0, 1, 0],
    SpecialistSkill:  [0,  0, 0, 1, 0, 0,  0, 0, 0, 1, 0,  0, 0, 0, 0, 1],
    BaseDefense:      [0,  0, 0, 1, 0, 0,  0, 0, 0, 1, 0,  0, 0, 0, 0, 1],
    RangedDamage:     [2,  0, 1, 0, 0, 0,  0, 1, 0, 0, 0,  0, 1, 0, 0, 0],
    SpecialistPoints: [0,  1, 0, 0, 1, 1,  1, 0, 0, 0, 1,  1, 1, 1, 1, 0],
  }
  public readonly allSpecialistPerks = _reverseRewards(this.specialistTrackerPerks);
  private get specialistPerks() { return this.allSpecialistPerks[clamp(this.specialistLevel, 0, 15)] }
  public get GreyWealth() { return this.specialistPerks.GreyWealth }
  public get InitiativeSave() { return this.specialistPerks.InitiativeSave }
  public get StartingSpecialistSkill() { return this.Artifice }
  public get SpecialistSkill() { return this.StartingSpecialistSkill + this.specialistPerks.SpecialistSkill }
  public get BaseDefense() { return this.specialistPerks.BaseDefense }
  public get RangedDamage() { return this.specialistPerks.RangedDamage }
  public get SpecialistPoints() { return this.specialistPerks.SpecialistPoints }

  public casterLevel: number = 0;
  public readonly casterTrackerPerks = {
    ObscureWealth: [0,  0, 1, 0, 0, 1,  0, 1, 0, 0, 1,  0, 0, 1, 0, 0],
    WillpowerSave: [0,  0, 1, 0, 1, 0,  1, 0, 1, 0, 0,  1, 0, 0, 1, 0],
    CasterSkill:   [0,  0, 0, 1, 0, 0,  0, 0, 0, 1, 0,  0, 0, 0, 0, 1],
    RitualPoints:  [0,  0, 0, 0, 0, 1,  0, 0, 0, 0, 1,  0, 1, 0, 1, 0],
    SpellPoints:   [0,  2, 1, 1, 2, 1,  1, 2, 0, 1, 2,  1, 1, 2, 1, 2],
  }
  public readonly allCasterPerks = _reverseRewards(this.casterTrackerPerks);
  private get casterPerks() { return this.allCasterPerks[clamp(this.casterLevel, 0, 15)] }
  public get ObscureWealth() { return this.casterPerks.ObscureWealth }
  public get WillpowerSave() { return this.casterPerks.WillpowerSave }
  public get StartingCasterSkill() { return this.Tuning }
  public get CasterSkill() { return this.StartingCasterSkill + this.casterPerks.CasterSkill }
  public get StartingRitualPoints() { return Math.max(this.GetSkill(ExplorationSkillEnum.Rituals), 0) }
  public get RitualPoints() { return this.StartingRitualPoints + this.casterPerks.RitualPoints }
  public get SpellPoints() { return this.casterPerks.SpellPoints }


  //## _ Feats _
  public constitutionFeat: ConstitutionFeat | undefined;
  public traitFeats: Array<TraitFeat> = [];
  public socialFeats: Array<SocialFeat> = [];


  //# ____ Stat Generation ____
  public socialStatGenMethod: StatGenMethodEnum = StatGenMethodEnum.Manual;
  public explorationStatGenMethod: StatGenMethodEnum = StatGenMethodEnum.Manual;
  public readonly statGen_Roll: { [Keys in StatEnum]?: number } = {}
  public readonly statGen_Manual: { [Keys in StatEnum]: number } = { Candor: -1, Conscious: -1, Cunning: -1, Might: -1, Artifice: -1, Tuning: -1 }

  public readonly statImprovements: { [Keys in StatEnum]: number } = { Candor: 0, Conscious: 0, Cunning: 0, Might: 0, Artifice: 0, Tuning: 0 }

  public GetBaseStat( stat: StatEnum ): number {
    let genMethod = SocialStats.includes(stat) ? this.socialStatGenMethod : this.explorationStatGenMethod;
    if (genMethod == StatGenMethodEnum.Manual) return this.statGen_Manual[stat] ?? -2;
    if (genMethod == StatGenMethodEnum.Roll) return this.statGen_Roll[stat] ?? -2;
    return -2;
  }
  public GetStat( stat: StatEnum ): number {
    return this.GetBaseStat( stat ) + (this.statImprovements[stat] ?? 0); // TODO: Add in improvements as well
  }
  public GetStatString( stat: StatEnum ): string {
    let mod = this.GetStat( stat );
    return mod < -1 ? "--" : (mod<0 ? "" : "+")+mod;
  }
  
  public get Candor() { return this.GetStat( StatEnum.Candor ); }
  public get Conscious() { return this.GetStat( StatEnum.Conscious ); }
  public get Cunning() { return this.GetStat( StatEnum.Cunning ); }
  public get Might() { return this.GetStat( StatEnum.Might ); }
  public get Artifice() { return this.GetStat( StatEnum.Artifice ); }
  public get Tuning() { return this.GetStat( StatEnum.Tuning ); }

  // ____ Skills ____
  public GetSkill( skill: SocialSkillEnum|ExplorationSkillEnum ): number {
    var skillData = this.socialSkills[skill] ?? this.explorationSkills[skill];
    if (!skillData) { console.error("Unknown Skill"); return -2; }
    let improvements = (skillData.points ?? 0) + (skillData.inspiration ? 1 : 0);
    if (skillData.overrideStat && Stats.includes(skillData.overrideStat)) {
      return this.GetStat(skillData.overrideStat) + improvements;
    }
    return this.GetStat(SkillToStatLookup[skill]) + improvements;
  }

  public socialSkills: { [name: string]: Skill } = {
    // Major
    Persuasion: { points: 0, inspiration: false },
    Insight: { points: 0, inspiration: false },
    Deception: { points: 0, inspiration: false },

    // Minor
    Captivation: { points: 0, inspiration: false },
    Awareness: { points: 0, inspiration: false },
    Portrayal: { points: 0, inspiration: false },

    Poignancy: { points: 0, inspiration: false },
    Composure: { points: 0, inspiration: false },
    Pressure: { points: 0, inspiration: false },
  }

  public explorationSkills: { [name: string]: Skill } = {
    // Major
    Scouting: { points: 0, inspiration: false },
    Analysis: { points: 0, inspiration: false },
    Sensing: { points: 0, inspiration: false },

    Sneaking: { points: 0, inspiration: false },
    Finesse: { points: 0, inspiration: false },
    Hiding: { points: 0, inspiration: false },
    
    // Minor
    Athletics: { points: 0, inspiration: false },
    History: { points: 0, inspiration: false },
    Discord: { points: 0, inspiration: false },

    Security: { points: 0, inspiration: false },
    Rumor: { points: 0, inspiration: false },
    Harmony: { points: 0, inspiration: false },

    Wayfaring: { points: 0, inspiration: false },
    Tinkering: { points: 0, inspiration: false },
    Rituals: { points: 0, inspiration: false },
  }


  constructor(p_id: string = "") {
    this.id = p_id;
    this.name = ""
  }

  public static FromJson(json: string): PlayerCharacter {
    return Object.assign(new PlayerCharacter(), JSON.parse(json))
  }
}

