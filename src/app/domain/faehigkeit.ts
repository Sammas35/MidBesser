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
}
