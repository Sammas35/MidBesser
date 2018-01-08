import {AbenteuerTyp, ABENTEUERTYPEN_LIST} from "./abenteuer-typ";
import {Faehigkeit} from "./faehigkeit";
import {Waffengrundkenntnis} from "./waffengrundkenntnis";
import {NamedEntity} from "./named-entity";
import {Waffe} from "./waffe";
import {LernEntity} from "./lern-entity";

export class Charakter extends NamedEntity {
    abenteuertyp: AbenteuerTyp;
    faehigkeitenGelerntList: Faehigkeit[];
    faehigkeitenList: Faehigkeit[];
    faehigkeitenWunschList: Faehigkeit[];
    waffenGelerntList: Waffengrundkenntnis[];
    waffenList: Waffengrundkenntnis[] = [];
    waffenWunschList: Waffengrundkenntnis[] = [];

    assignWaffe(waffengrundkenntnis: Waffengrundkenntnis) {
        let gelerntGrundkenntnis: Waffengrundkenntnis;
        let wunsch: Waffengrundkenntnis;

        this.waffenGelerntList = this.waffenGelerntList || [];
        this.waffenList.push(waffengrundkenntnis);

        gelerntGrundkenntnis = <Waffengrundkenntnis>this.isGelernt(waffengrundkenntnis, this.waffenGelerntList);

        if (gelerntGrundkenntnis) {
            wunsch = this.waffenWunschList.find((w) => w.equals(waffengrundkenntnis));
            if (!wunsch) {
            }
        } else {
            this.addToList(waffengrundkenntnis, this.waffenList);
        }
    }

    public assignFaehigkeit(faehigkeit: Faehigkeit) {
        let gelernt: Faehigkeit;

        this.faehigkeitenGelerntList = this.faehigkeitenGelerntList || [];
        this.faehigkeitenWunschList = this.faehigkeitenWunschList || [];
        this.faehigkeitenList = this.faehigkeitenList || [];

        if (gelernt = <Faehigkeit>this.isGelernt(faehigkeit, this.faehigkeitenGelerntList)) {
            this.addToWunschlist(faehigkeit, gelernt);
        } else {
            this.addToList(faehigkeit, this.faehigkeitenList);
        }
    }

    private addToList(faehigkeit: LernEntity, lernEntityList: LernEntity[]) {
        if (!this.isInList(faehigkeit, lernEntityList)) {
            faehigkeit.adjustLernkosten(this.abenteuertyp.kuerzel);
            lernEntityList.push(faehigkeit);
        }
    }

    private isInList(lernEntity: LernEntity, lernEntityList: LernEntity[]) {
        return lernEntityList.some((f) => f.name === lernEntity.name);
    }

    private addToWunschlist(faehigkeit: Faehigkeit, gelernt: Faehigkeit) {
        if (this.isInList(faehigkeit, this.faehigkeitenWunschList)) {
            return;
        }
        faehigkeit.erfolgswert = gelernt.erfolgswert;
        faehigkeit.adjustLernkosten(this.abenteuertyp.kuerzel);
        this.faehigkeitenWunschList.push(faehigkeit);
    }

    private isGelernt(lernEntity: LernEntity, lernEntityList: LernEntity[]) {
        let gelernt: LernEntity;

        gelernt = lernEntityList.find((f) => lernEntity.equals(f));

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

        result.faehigkeitenGelerntList = Faehigkeit.deserializeList(charakter.faehigkeitenGelerntList);
        result.faehigkeitenList = Faehigkeit.deserializeList(charakter.faehigkeitenList);
        result.faehigkeitenWunschList = Faehigkeit.deserializeList(charakter.faehigkeitenWunschList);

        // result.waffenGelerntList = charakter.waffenGelerntList ? charakter.waffenGelerntList.slice() : [];
        // result.waffenList = charakter.waffenList ? charakter.waffenList.slice() : [];
        // result.waffenWunschList = charakter.waffenWunschList ? charakter.waffenWunschList.slice() : [];

        return result;
    }

    public berechneGeplanteKosten(): number {
        let result: number;

        result = this.faehigkeitenWunschList.reduce((prev, curr) => {
            return prev + curr.berechneGeplanteKosten();
        }, 0);

        result = this.waffenWunschList.reduce((prev, curr) => {
            return prev + curr.berechneGeplanteKosten();
        }, result);

        return result;
    }

    public hatSprueche(): boolean {
        return false;
    }
}
