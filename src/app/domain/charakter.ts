import {AbenteuerTyp, ABENTEUERTYPEN_LIST} from "./abenteuer-typ";
import {Faehigkeit} from "./faehigkeit";

export class Charakter {
    name: string;
    abenteuertyp: AbenteuerTyp;
    faehigkeitenList: Faehigkeit[];
    faehigkeitenWunschList: Faehigkeit[];

    public assignFaehigkeit(faehigkeit: Faehigkeit) {
        this.getFaehigkeitenList().push(faehigkeit);
    }

    private getFaehigkeitenList() {
        if (!this.faehigkeitenList) {
            this.faehigkeitenList = [];
        }
        return this.faehigkeitenList;
    }

    public static deserialize(charakter:Charakter):Charakter {
        var result:Charakter;

        result = new Charakter();

        result.name = charakter.name;
        result.abenteuertyp = ABENTEUERTYPEN_LIST.find((abenteuertyp) => abenteuertyp.kuerzel === charakter.abenteuertyp.kuerzel);

        return result;
    }

}
