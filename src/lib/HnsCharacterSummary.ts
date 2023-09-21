import { validate, NIL } from 'uuid'


export class HnsCharacterSummary {

    private _id: string = "";
    public get id(): string { return this._id; }
    private set id(value: string) {
        if (!validate(value)) { this._id = NIL; return; }
        this._id = value;
    }

    public name: string = "";
    public class: string = "";
    public subclass: string = "";
    public class2: string = "";
    public subclass2: string = "";

    public static FromJson( json: string ): HnsCharacterSummary {
        return Object.assign( new HnsCharacterSummary(), JSON.parse(json) )
    }
}

