import {Waffe} from "./waffe";
import {LernEntity} from "./lern-entity";
export class Waffengrundkenntnis extends LernEntity {
    kosten:number;
    faktor: number = 1;

    waffen:Waffe[];
    private static grund:Array<string> = [
        "Kr",
        "Sö"
    ];
    private static standard:Array<string> = [
        "As",
        "Ba",
        "BN",
        "BS",
        "BW",
        "Gl",
        "Hä",
        "Or",
        "Se",
        "Sp",
        "Wa",
    ];
    private static ausnahme:Array<string> = [
        "Be",
        "Dr",
        "Hl",
        "Hx",
        "Ma",
        "PH",
        "PF",
        "PK",
        "PM",
        "PT",
        "PW",
        "Sc",
        "Th",
    ];

    public static deserialize(waffengrundkenntnis: Waffengrundkenntnis):Waffengrundkenntnis {
        let result;

        result = new Waffengrundkenntnis();

        result.name = waffengrundkenntnis.name;
        result.kosten = waffengrundkenntnis.kosten;

        result.waffen = [];

        waffengrundkenntnis.waffen.forEach((w) => result.waffen.push(Waffe.deserialize(w)));

        return result;
    }

    adjustLernkosten(kuerzel: string) {
        this.faktor = this.getFaktor(kuerzel);

        this.kosten *= this.faktor;
    }

    private getFaktor(kuerzel: string):number {
        if(Waffengrundkenntnis.grund.some((k)=>k===kuerzel)) {
            return 0.5;
        }
        if(Waffengrundkenntnis.standard.some((k)=>k===kuerzel)) {
            return 1;
        }
        if(Waffengrundkenntnis.ausnahme.some((k)=>k===kuerzel)) {
            return 2;
        }

        console.log('unknown charakter Kürzel in Waffengrundkenntnis : ' + kuerzel);

        return 1;
    }

    isGelernt() {
        return this.waffen.some((w)=>w.isGelernt());
    }
}
