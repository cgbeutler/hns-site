import { validate, NIL } from 'uuid'


export class HnsCharacterSummary {

    private _id: string = "";
    public get id(): string { return this._id; }
    private set id(value: string) {
        if (!validate(value)) { this._id = NIL; return; }
        this._id = value;
    }

    private _name: string = "";
    public get name(): string { return this._name ?? ""; }
    public set name(value: string) { this._name = value ?? ""; }
    
    private _class: string = "";
    public get class(): string { return this._class ?? ""; }
    public set class(value: string) { this._class = value ?? ""; }
    private _subclass: string = "";
    public get subclass(): string { return this._subclass ?? ""; }
    public set subclass(value: string) { this._subclass = value ?? ""; }
    private _class2: string = "";
    public get class2(): string { return this._class2 ?? ""; }
    public set class2(value: string) { this._class2 = value ?? ""; }
    private _subclass2: string = "";
    public get subclass2(): string { return this._subclass2 ?? ""; }
    public set subclass2(value: string) { this._subclass2 = value ?? ""; }


    public static FromJson( json: string ): HnsCharacterSummary {
        return Object.assign( new HnsCharacterSummary(), JSON.parse(json) )
    }
}

