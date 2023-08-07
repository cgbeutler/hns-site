import { validate, NIL } from 'uuid'

export interface HnsSkill {
    name: string;
    aptitude: string;
    category: string;
    level: number;
}

export class HnsCharacter {

    private static __clampStat( value: number ): number {
        value = Math.round(value);
        return value < 0 ? 0 : value > 4 ? 4 : value;
    }
    private static __clampSkill( value: number ): number {
        value = Math.round(value);
        return value < 0 ? 0 : value > 2 ? 2 : value;
    }

    private _id: string = "";
    public get id(): string { return this._id; }
    private set id(value: string) {
        if (!validate(value)) { this._id = NIL; return; }
        this._id = value;
    }

    private _name: string = "";
    public get name(): string { return this._name ?? ""; }
    public set name(value: string) { this._name = value ?? ""; }
    
    private _description: string = "";
    public get description(): string { return this._description ?? ""; }
    public set description(value: string) { this._description = value ?? ""; }
    
    // ____ Social Stats ____
    private _pres: number = 1;
    public get pres(): number { return this._pres; }
    public set pres(value: number) { this._pres = HnsCharacter.__clampStat(value) }

    private _thea: number = 1;
    public get thea(): number { return this._thea; }
    public set thea(value: number) { this._thea = HnsCharacter.__clampStat(value) }

    private _cred: number = 1;
    public get cred(): number { return this._cred; }
    public set cred(value: number) { this._cred = HnsCharacter.__clampStat(value) }

    private _insi: number = 1;
    public get insi(): number { return this._insi; }
    public set insi(value: number) { this._insi = HnsCharacter.__clampStat(value) }
    
    // ____ Perception Stats ____
    private _trac: number = 1;
    public get trac(): number { return this._trac; }
    public set trac(value: number) { this._trac = HnsCharacter.__clampStat(value) }

    private _inve: number = 1;
    public get inve(): number { return this._inve; }
    public set inve(value: number) { this._inve = HnsCharacter.__clampStat(value) }

    private _exam: number = 1;
    public get exam(): number { return this._exam; }
    public set exam(value: number) { this._exam = HnsCharacter.__clampStat(value) }

    private _dete: number = 1;
    public get dete(): number { return this._dete; }
    public set dete(value: number) { this._dete = HnsCharacter.__clampStat(value) }

    // ____ Core Stats ____
    private _mig: number = 1;
    public get mig(): number { return this._mig; }
    public set mig(value: number) { this._mig = HnsCharacter.__clampStat(value) }

    private _fin: number = 1;
    public get fin(): number { return this._fin; }
    public set fin(value: number) { this._fin = HnsCharacter.__clampStat(value) }

    private _art: number = 1;
    public get art(): number { return this._art; }
    public set art(value: number) { this._art = HnsCharacter.__clampStat(value) }

    private _tun: number = 1;
    public get tun(): number { return this._tun; }
    public set tun(value: number) { this._tun = HnsCharacter.__clampStat(value) }


    // ____ Saves ____
    private _fort: number = 0;
    public get fort(): number { return this._fort; }
    public set fort(value: number) { this._fort = HnsCharacter.__clampSkill(value) }

    private _init: number = 0;
    public get init(): number { return this._init; }
    public set init(value: number) { this._init = HnsCharacter.__clampSkill(value) }

    private _cunn: number = 0;
    public get cunn(): number { return this._cunn; }
    public set cunn(value: number) { this._cunn = HnsCharacter.__clampSkill(value) }

    private _clar: number = 0;
    public get clar(): number { return this._clar; }
    public set clar(value: number) { this._clar = HnsCharacter.__clampSkill(value) }
    

    private _skills: HnsSkill[] = [
        /*Saves*/
        { name: "Fortitude", aptitude: "MIG", category: "Save", level: 0 },
        { name: "Initiative", aptitude: "FIN", category: "Save", level: 0 },
        { name: "Cunning", aptitude: "ART", category: "Save", level: 0 },
        { name: "Clarity", aptitude: "TUN", category: "Save", level: 0 },
        /*Exploration*/
        { name: "Athletics", aptitude: "MIG", category: "Exploration", level: 0 },
        { name: "Stealth", aptitude: "FIN", category: "Exploration", level: 0 },
        { name: "Tinkering", aptitude: "ART", category: "Exploration", level: 0 },
        { name: "Tapping", aptitude: "TUN", category: "Exploration", level: 0 },
        /*Knowledge*/
        { name: "Security", aptitude: "MIG", category: "Knowledge", level: 0 },
        { name: "History", aptitude: "FIN", category: "Knowledge", level: 0 },
        { name: "Alchemy (Med)", aptitude: "ART", category: "Knowledge", level: 0 },
        { name: "Magecraft", aptitude: "TUN", category: "Knowledge", level: 0 },
        { name: "Wayfaring", aptitude: "MIG", category: "Knowledge", level: 0 },
        { name: "Rumor", aptitude: "FIN", category: "Knowledge", level: 0 },
        { name: "Workmanship", aptitude: "ART", category: "Knowledge", level: 0 },
        { name: "Natures", aptitude: "TUN", category: "Knowledge", level: 0 },
        /*Equipment*/
        { name: "Heavy", aptitude: "MIG", category: "Equipment", level: 0 },
        { name: "Raw", aptitude: "FIN", category: "Equipment", level: 0 },
        { name: "Steady", aptitude: "ART", category: "Equipment", level: 0 },
        { name: "Magian", aptitude: "TUN", category: "Equipment", level: 0 },
        { name: "Simple", aptitude: "MIG", category: "Equipment", level: 0 },
        { name: "Swift", aptitude: "FIN", category: "Equipment", level: 0 },
        { name: "Cunning", aptitude: "ART", category: "Equipment", level: 0 },
        { name: "Source", aptitude: "TUN", category: "Equipment", level: 0 }
    ];

    // lineages: { major: "", minor: "" },
    // languages: [],
    // background: {},
    // class1: { name: "", level: 1 },
    // class2: { name: "", level: 1 },
    
    // defenses: {
    //     resistances: [],
    //     immunities: [],
    //     weaknesses: [],
    // },


    constructor(p_id: string = "") {
        this.id = p_id;
        this.name = ""
    }

    public static FromJson( json: string ): HnsCharacter {
        return Object.assign( new HnsCharacter(), JSON.parse(json) )
    }
}

