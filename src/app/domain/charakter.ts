import {AbenteuerTyp, ABENTEUERTYPEN_LIST} from "./abenteuer-typ";
import {Faehigkeit} from "./faehigkeit";
import {Waffengrundkenntnis} from "./waffengrundkenntnis";
import {NamedEntity} from "./named-entity";

export class Charakter extends NamedEntity{
    abenteuertyp: AbenteuerTyp;
    faehigkeitenGelerntList: Faehigkeit[];
    faehigkeitenList: Faehigkeit[];
    faehigkeitenWunschList: Faehigkeit[];
    waffenGelerntList:Waffengrundkenntnis[];
    waffenList: Waffengrundkenntnis[] = [];
    waffenWunschList: Waffengrundkenntnis[] = [];

    assignWaffe(waffengrundkenntnis: Waffengrundkenntnis) {

        this.waffenList.push(waffengrundkenntnis);
    }

    public assignFaehigkeit(faehigkeit: Faehigkeit) {
        let gelernt: Faehigkeit;

        this.faehigkeitenGelerntList = this.faehigkeitenGelerntList || [];
        this.faehigkeitenWunschList = this.faehigkeitenWunschList || [];
        this.faehigkeitenList = this.faehigkeitenList || [];

        if (gelernt = this.isGelernt(faehigkeit)) {
            this.addToWunschlist(faehigkeit, gelernt);
        } else {
            this.addToFaehigkeitList(faehigkeit);
        }
    }

    private addToFaehigkeitList(faehigkeit: Faehigkeit) {
        if(!this.isInList(faehigkeit, this.faehigkeitenList)) {
            faehigkeit.adjustLernkosten(this.abenteuertyp.kuerzel);
            this.getFaehigkeitenList().push(faehigkeit);
        }
    }

    private isInList(faehigkeit: Faehigkeit, faehigkeitenList: Faehigkeit[]) {
        return faehigkeitenList.some((f) => f.name === faehigkeit.name);
    }

    private addToWunschlist(faehigkeit: Faehigkeit, gelernt: Faehigkeit) {
        faehigkeit.erfolgswert = gelernt.erfolgswert;
        faehigkeit.adjustLernkosten(this.abenteuertyp.kuerzel);
        this.faehigkeitenWunschList.push(faehigkeit);
    }

    private isGelernt(faehigkeit: Faehigkeit) {
        let gelernt: Faehigkeit;

        gelernt = this.faehigkeitenGelerntList.find((f)=>faehigkeit.equals(f));

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
