import {Verbesserung} from "./verbesserung";

export class Faehigkeit {
    name: string;
    erfolgswert: string;
    erstkosten: number;
    startwert: string;
    faktor: number;
    grund: string[];
    ausnahme: string[];
    geplanteStufen: Verbesserung[];
    offeneStufen: Verbesserung[];
    verbesserungen: Verbesserung[];

    public static deserialize(faehigkeit: Faehigkeit): Faehigkeit {
        let result: Faehigkeit;

        result = new Faehigkeit();

        result.name = faehigkeit.name;
        result.erstkosten = faehigkeit.erstkosten;
        result.startwert = faehigkeit.startwert;
        result.grund = faehigkeit.grund ? faehigkeit.grund.slice() : [];
        result.ausnahme = faehigkeit.ausnahme ? faehigkeit.ausnahme.slice() : [];
        result.verbesserungen = faehigkeit.verbesserungen ? faehigkeit.verbesserungen.slice() : [];
        result.offeneStufen = [].concat(result.verbesserungen);
        result.geplanteStufen = [];

        return result;
    }

    adjustLernkosten(kuerzel: string) {
        let index;
        this.faktor = 1;

        if (this.grund && this.grund.includes(kuerzel)) {
            this.faktor = 0.5;
        } else if (this.ausnahme && this.ausnahme.includes(kuerzel)) {
            this.faktor = 2;
        }

        this.erstkosten *= this.faktor;
        if (this.erfolgswert) {
            index = this.verbesserungen.find((v) => {
                return v.erfolgswert === this.erfolgswert;
            });
            this.verbesserungen = this.verbesserungen.slice(0, index);
        }
        this.verbesserungen.forEach((f) => f.kosten *= this.faktor);
    }

    entferneBis(verbesserung: Verbesserung) {
        let stufePos:number;
        let stufen:Array<Verbesserung>;

        stufePos = this.geplanteStufen.findIndex((v)=> {
            return v === verbesserung;
        });

        if (stufePos == -1) {
            return;
        }

        stufen = this.geplanteStufen.splice(stufePos);
        this.offeneStufen = stufen.concat(this.offeneStufen);
    }

    lerneBis(verbesserung: Verbesserung) {
        let stufePos:number;
        let stufen:Array<Verbesserung>;

        stufePos = this.offeneStufen.findIndex((v)=> {
            return v === verbesserung;
        });

        if (stufePos == -1) {
            return;
        }

        stufen = this.offeneStufen.splice(0, stufePos + 1);
        this.geplanteStufen = this.geplanteStufen.concat(stufen);
    }

    berechneGeplanteKosten(): number {
        let kosten : number = 0;

        if(!this.erfolgswert){
            kosten += this.erstkosten;
        }

        this.geplanteStufen.forEach(v => kosten += v.kosten);

        return kosten;
    }
}
