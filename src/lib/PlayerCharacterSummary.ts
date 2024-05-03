import { validate, NIL } from 'uuid'


export class PlayerCharacterSummary {

    private _id: string = "";
    public get id(): string { return this._id; }
    private set id(value: string) {
        if (!validate(value)) { this._id = NIL; return; }
        this._id = value;
    }

    public name: string = "";
    public class: string = "";
    public lineage: string = "";

    public static FromJson( json: string ): PlayerCharacterSummary {
        return Object.assign( new PlayerCharacterSummary(), JSON.parse(json) )
    }
}

