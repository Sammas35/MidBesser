import {LernEntity} from "./lern-entity";

export class Waffe extends LernEntity {
    staerke: number;
    geschicklichkeit: number;
    schwierigkeit: number;
    grundkenntnis: string;
    private erfolgswert: number;

    public static deserialize(waffe: Waffe): Waffe {
        let result: Waffe;

        result = new Waffe();

        result.name = waffe.name;
        result.staerke = waffe.staerke;
        result.geschicklichkeit = waffe.geschicklichkeit;
        result.schwierigkeit = waffe.schwierigkeit;

        return result;
    }
    isGelernt():boolean {
        return !(this.erfolgswert);
    }
}
