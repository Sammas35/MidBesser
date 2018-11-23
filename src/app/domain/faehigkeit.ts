import {LernEntity} from "./lern-entity";

export class Faehigkeit extends LernEntity {
    grund: string[];
    ausnahme: string[];
    private grundFaktor: number = 0.5;
    private ausnahmeFaktor: number = 2;

    public static deserializeList(faehigkeitList: Faehigkeit[]): Faehigkeit[] {
        if(!faehigkeitList) {
            return [];
        }

        return faehigkeitList.map((c:Faehigkeit)=>Faehigkeit.deserialize(c))
    }

    public static deserialize(faehigkeit: Faehigkeit): Faehigkeit {
        let result: Faehigkeit;

        result = new Faehigkeit();

        result.name = faehigkeit.name;
        result.erstkosten = faehigkeit.erstkosten;
        result.startwert = faehigkeit.startwert;
        result.gelernt = faehigkeit.gelernt;
        result.erfolgswert = faehigkeit.erfolgswert;
        result.grund = faehigkeit.grund ? faehigkeit.grund.slice() : [];
        result.ausnahme = faehigkeit.ausnahme ? faehigkeit.ausnahme.slice() : [];
        result.faktor = faehigkeit.faktor;
        result.verbesserungen = faehigkeit.verbesserungen ? faehigkeit.verbesserungen.slice() : [];
        result.offeneStufen = faehigkeit.offeneStufen ? faehigkeit.offeneStufen.slice() : [];
        result.geplanteStufen = faehigkeit.geplanteStufen ? faehigkeit.geplanteStufen.slice() : [];

        return result;
    }

    adjustLernkosten(kuerzel: string) {
        let index;
        this.faktor = 1;

        if (this.grund && this.grund.some(k => k === kuerzel)) {
            this.faktor = this.grundFaktor;
        } else if (this.ausnahme && this.ausnahme.some(k => k === kuerzel)) {
            this.faktor = this.ausnahmeFaktor;
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
