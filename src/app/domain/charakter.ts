import {AbenteuerTyp, ABENTEUERTYPEN_LIST} from './abenteuer-typ';
import {Faehigkeit} from './faehigkeit';
import {Waffengrundkenntnis} from './waffengrundkenntnis';
import {NamedEntity} from './named-entity';
import {LernEntity} from './lern-entity';
import {Lernkontext} from './lernkontext';

export class Charakter extends NamedEntity {
    grad: number;
    abenteuertyp: AbenteuerTyp;
    faehigkeitenGelerntList: Faehigkeit[];
    faehigkeitenList: Faehigkeit[];
    faehigkeitenWunschList: Faehigkeit[];
    waffenGelerntList: Waffengrundkenntnis[];
    waffenList: Waffengrundkenntnis[] = [];
    waffenWunschList: Waffengrundkenntnis[] = [];

    faehigkeiten: Lernkontext;

    public static deserialize(charakter: Charakter): Charakter {
        let result: Charakter;

        result = new Charakter();

        result.name = charakter.name;
        result.grad = charakter.grad;
        result.abenteuertyp = ABENTEUERTYPEN_LIST.find((abenteuertyp) => abenteuertyp.kuerzel === charakter.abenteuertyp.kuerzel);

        result.faehigkeitenGelerntList = Faehigkeit.deserializeList(charakter.faehigkeitenGelerntList);
        result.faehigkeitenList = Faehigkeit.deserializeList(charakter.faehigkeitenList);
        result.faehigkeitenWunschList = Faehigkeit.deserializeList(charakter.faehigkeitenWunschList);

        result.waffenList = Waffengrundkenntnis.deserializeList(charakter.waffenList, result.abenteuertyp.kuerzel);

        return result;
    }

    assignWaffe(waffengrundkenntnis: Waffengrundkenntnis) {
        let gelerntGrundkenntnis: Waffengrundkenntnis;
        let wunsch: Waffengrundkenntnis;

        this.waffenGelerntList = this.waffenGelerntList || [];

        if (!this.isInList(waffengrundkenntnis, this.waffenList)) {
            this.waffenList.push(waffengrundkenntnis);
        }

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

        gelernt = <Faehigkeit>this.findInList(faehigkeit, this.faehigkeitenWunschList)

        if (gelernt) {
            this.addToWunschlist(faehigkeit, gelernt);
        } else {
            this.addToList(faehigkeit, this.faehigkeitenList);
        }
    }

    public berechneGeplanteKosten(): number {
        let result: number;

        if (this.faehigkeitenWunschList) {
            result = this.faehigkeitenWunschList.reduce((prev, curr) => {
                return prev + curr.berechneGeplanteKosten();
            }, 0);
        }

        if (this.waffenWunschList) {
            result = this.waffenWunschList.reduce((prev, curr) => {
                return prev + curr.berechneGeplanteKosten();
            }, result);
        }

        return result;
    }

    public hatSprueche(): boolean {
        if (this.abenteuertyp) {
            return this.abenteuertyp.zauber;
        }
        return false;
    }

    lernPermanent() {
        this.lernPermanentFaehigkeiten();
        this.lernPermanentWaffen();
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

    private findInList(lernEntity: LernEntity, lernEntityList: LernEntity[]) {
        return lernEntityList.find((f) => f.name === lernEntity.name);
    }

    private lernPermanentFaehigkeiten() {
        this.faehigkeitenWunschList.forEach((f) => {
            if (f.lernen) {
                f.gelernt = true;
            }

            if (f.geplanteStufen.length > 0) {
                f.erfolgswert = f.geplanteStufen[f.geplanteStufen.length - 1].erfolgswert;
                f.geplanteStufen = [];
            }
        });
    }

    private lernPermanentWaffen() {
        this.waffenWunschList.forEach((wg) => {
            let waffengrundkenntnisGelernt = false;

            wg.waffen.forEach((w) => {
                if (w.geplanteStufen.length > 0) {
                    waffengrundkenntnisGelernt = true;
                    w.gelernt = true;
                    w.erfolgswert = w.geplanteStufen[w.geplanteStufen.length - 1].erfolgswert;
                    w.geplanteStufen = [];
                }
            });
            wg.gelernt = waffengrundkenntnisGelernt;
        })
    }
}
