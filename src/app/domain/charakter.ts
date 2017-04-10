import {AbenteuerTyp, ABENTEUERTYPEN_LIST} from "./abenteuer-typ";
import {Faehigkeit} from "./faehigkeit";

export class Charakter {
    name: string;
    abenteuertyp: AbenteuerTyp;
    faehigkeitenGelerntList: Faehigkeit[];
    faehigkeitenList: Faehigkeit[];
    faehigkeitenWunschList: Faehigkeit[];

    public assignFaehigkeit(faehigkeit: Faehigkeit) {
        let gelernt: Faehigkeit;

        this.faehigkeitenGelerntList = this.faehigkeitenGelerntList || [];
        this.faehigkeitenWunschList = this.faehigkeitenWunschList || [];
        this.faehigkeitenList = this.faehigkeitenList || [];

        if (gelernt = this.isGelernt(faehigkeit)) {
            faehigkeit.erfolgswert = gelernt.erfolgswert;
            faehigkeit.adjustLernkosten(this.abenteuertyp.kuerzel);
            this.faehigkeitenWunschList.push(faehigkeit);
        } else {
            faehigkeit.adjustLernkosten(this.abenteuertyp.kuerzel);
            this.getFaehigkeitenList().push(faehigkeit);
        }
    }

    private isGelernt(faehigkeit: Faehigkeit) {
        let gelernt: Faehigkeit;

        gelernt = this.faehigkeitenGelerntList.find((f) => {
            return f.name === faehigkeit.name
        });

        return gelernt;
    }

    private getFaehigkeitenList() {
        if (!this.faehigkeitenList) {
            this.faehigkeitenList = [];
        }
        return this.faehigkeitenList;
    }

    public static deserialize(charakter: Charakter): Charakter {
        let result: Charakter;

        result = new Charakter();

        result.name = charakter.name;
        result.abenteuertyp = ABENTEUERTYPEN_LIST.find((abenteuertyp) => abenteuertyp.kuerzel === charakter.abenteuertyp.kuerzel);
        result.faehigkeitenGelerntList = charakter.faehigkeitenGelerntList ? charakter.faehigkeitenGelerntList.slice() : [];
        result.faehigkeitenList = [];
        result.faehigkeitenWunschList = [];

        return result;
    }
}
