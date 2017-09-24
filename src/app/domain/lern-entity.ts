import {NamedEntity} from "./named-entity";
import {Verbesserung} from "./verbesserung";

export class LernEntity extends NamedEntity {

    erfolgswert: string;
    startwert: number;
    erstkosten: number;
    faktor: number;
    geplanteStufen: Verbesserung[];
    offeneStufen: Verbesserung[];
    verbesserungen: Verbesserung[];

    berechneGeplanteKosten(): number {
        let kosten: number = 0;

        if (!this.erfolgswert && this.erstkosten) {
            kosten += this.erstkosten;
        }

        this.geplanteStufen.forEach(v => {
            kosten += v.kosten
        });


        return kosten;
    }

    isGelernt(): boolean {
        return this.erfolgswert !== null && this.erfolgswert != undefined;
    }

    entferneBis(verbesserung: Verbesserung) {
        let stufePos: number;
        let stufen: Array<Verbesserung>;

        stufePos = this.geplanteStufen.findIndex((v) => {
            return v === verbesserung;
        });

        if (stufePos == -1) {
            return;
        }

        stufen = this.geplanteStufen.splice(stufePos);
        this.offeneStufen = stufen.concat(this.offeneStufen);
    }

    lerneBis(verbesserung: Verbesserung) {
        let stufePos: number;
        let stufen: Array<Verbesserung>;

        stufePos = this.offeneStufen.findIndex((v) => {
            return v === verbesserung;
        });

        if (stufePos == -1) {
            return;
        }

        stufen = this.offeneStufen.splice(0, stufePos + 1);
        this.geplanteStufen = this.geplanteStufen.concat(stufen);
    }

    adjustLernkosten(kuerzel: string) {
    }
}
