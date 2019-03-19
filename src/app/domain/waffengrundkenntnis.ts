import {Waffe} from './waffe';
import {LernEntity} from './lern-entity';

export class Waffengrundkenntnis extends LernEntity {
    private static grund: Array<string> = [
        'Kr',
        'Sö'
    ];
    private static standard: Array<string> = [
        'As',
        'Ba',
        'BN',
        'BS',
        'BW',
        'Gl',
        'Hä',
        'Or',
        'Se',
        'Sp',
        'Wa',
    ];
    private static ausnahme: Array<string> = [
        'Be',
        'Dr',
        'Hl',
        'Hx',
        'Ma',
        'PH',
        'PF',
        'PK',
        'PM',
        'PT',
        'PW',
        'Sc',
        'Th',
    ];
    waffen: Waffe[];
    kind:string;

    public static deserializeList(waffengrundkenntnis: Waffengrundkenntnis[], abenteurtypKuerzel: string): Waffengrundkenntnis[] {
        if (!waffengrundkenntnis) {
            return [];
        }

        return waffengrundkenntnis.map((c: Waffengrundkenntnis) => Waffengrundkenntnis.deserialize(c, abenteurtypKuerzel, c.kind))
    }


    public static deserialize(waffengrundkenntnis: Waffengrundkenntnis, abenteurtypKuerzel: string, kind:string): Waffengrundkenntnis {
        let result;
        let faktor;

        kind = kind || waffengrundkenntnis.kind;

        result = new Waffengrundkenntnis();

        faktor = result.getFaktor(abenteurtypKuerzel);
        result.name = waffengrundkenntnis.name;

        result.erstkosten = waffengrundkenntnis.erstkosten * faktor;

        result.waffen = [];

        waffengrundkenntnis.waffen.forEach((w) => result.waffen.push(Waffe.deserialize(w, faktor, kind)));

        return result;
    }

    adjustLernkosten(kuerzel: string) {
        this.faktor = this.getFaktor(kuerzel);

        this.erstkosten *= this.faktor;
    }

    isGelernt() {
        return this.waffen.some((w) => w.isGelernt());
    }

    addWaffe(waffe: Waffe) {
        if (!this.waffen.some((w) => w.name === waffe.name)) {
            this.waffen.push(waffe);
            this.waffen.sort((a, b) => a.name.localeCompare(b.name));
        }
    }

    removeWaffe(waffe: Waffe) {
        let index: number;

        index = this.waffen.indexOf(waffe);

        if (index >= 0) {
            this.waffen.splice(index, 1);
        }
    }

    berechneGeplanteKosten(): number {
        let kosten: number = 0;

        if (!this.erfolgswert && this.erstkosten) {
            kosten += this.erstkosten;
        }

        kosten = this.waffen.reduce((prev, curr) => {
            return prev + curr.berechneGeplanteKosten();
        }, kosten);

        return kosten;
    }

    copy() {
        let result: Waffengrundkenntnis;

        result = new Waffengrundkenntnis();

        result.erfolgswert = this.erfolgswert;
        result.startwert = this.startwert;
        result.erstkosten = this.erstkosten;
        result.faktor = this.faktor;

        result.waffen = this.waffen.slice();

        return result;
    }

    private getFaktor(kuerzel: string): number {
        if (Waffengrundkenntnis.grund.some((k) => k === kuerzel)) {
            return 0.5;
        }
        if (Waffengrundkenntnis.standard.some((k) => k === kuerzel)) {
            return 1;
        }
        if (Waffengrundkenntnis.ausnahme.some((k) => k === kuerzel)) {
            return 2;
        }

        console.log('unknown charakter Kürzel in Waffengrundkenntnis : ' + kuerzel);

        return 1;
    }
}
