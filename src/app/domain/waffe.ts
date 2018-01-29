import {LernEntity} from "./lern-entity";
import {Verbesserung} from "./verbesserung";

export class Waffe extends LernEntity {
    staerke: number;
    geschicklichkeit: number;
    schwierigkeit: number;
    grundkenntnis: string;

    private static stufenAngriff = {
        '5': 6,
        '6': 6,
        '7': 6,
        '8': 10,
        '9': 20,
        '10': 40,
        '11': 80,
        '12': 160,
        '13': 300,
        '14': 500,
        '15': 1000,
        '16': 1000,
        '17': 1500,
        '18': 1500,
        '19': 2500
    };

    private static stufenAbwehr = {
        '2': 20,
        '3': 100,
        '4': 400,
        '5': 1000,
        '6': 2000,
        '7': 4000,
        '8': 6000
    };

    public static deserialize(waffe: Waffe, faktor: number, kind: string): Waffe {
        let result: Waffe;

        result = new Waffe();

        result.erstkosten = null;
        result.erfolgswert = null;
        result.name = waffe.name;
        result.staerke = waffe.staerke;
        result.geschicklichkeit = waffe.geschicklichkeit;
        result.schwierigkeit = waffe.schwierigkeit;
        result.verbesserungen = result.createVerbesserungen(faktor, kind);
        result.offeneStufen = result.verbesserungen.slice();
        result.geplanteStufen = [];

        return result;
    }

    private createVerbesserungen(faktor: number, kind: string): Verbesserung[] {
        let result: Verbesserung[];
        let erfolgswert: number;
        let maxErfolgswert: number;
        let verbesserung: Verbesserung;
        let stufen;

        erfolgswert = +this.erfolgswert || 5;
        maxErfolgswert = this.getMaxErfolgswert(faktor, kind);
        stufen = kind === 'angriff' ? Waffe.stufenAngriff : Waffe.stufenAbwehr;
        result = [];

        for (let i = erfolgswert; i <= maxErfolgswert; i++) {
            verbesserung = new Verbesserung(i.toString(), stufen[i] * this.schwierigkeit * faktor);
            result.push(verbesserung);
        }

        return result;
    }

    private getMaxErfolgswert(faktor: number, kind: string) {
        if (kind === 'angriff') {
            if (faktor === 2) {
                return 14;
            }
            if (faktor === 0.5) {
                return 19;
            }
            return 17;
        }
        if (kind === 'abwehr') {
            if (faktor === 2) {
                return 5;
            }
            if (faktor === 0.5) {
                return 8;
            }
            return 7;
        }
        return 0;
    }
}
