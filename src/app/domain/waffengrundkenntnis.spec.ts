import {Waffengrundkenntnis} from "./waffengrundkenntnis";
import {Waffe} from "./waffe";

fdescribe('Waffengrundkenntnis', () => {
    it('should create an instance', () => {
        expect(new Waffengrundkenntnis()).toBeTruthy();
    });


    describe('deserialize', function () {
        it('should deserialize a json', function () {
            let json = {
                "name": "Einhandschwerter",
                "erstkosten": 500,
                "waffen": [
                    {
                        "name": "Langschwert",
                        "staerke": 31,
                        "geschicklichkeit": 21,
                        "schwierigkeit": 5
                    },
                    {
                        "name": "Krummsäbel",
                        "staerke": 31,
                        "geschicklichkeit": 11,
                        "schwierigkeit": 4
                    }
                ]
            };
            let grundkenntnis: Waffengrundkenntnis;

            grundkenntnis = Waffengrundkenntnis.deserialize(<Waffengrundkenntnis>json, 'Sö', 'angriff');

            expect(grundkenntnis.name).toBe('Einhandschwerter');
            expect(grundkenntnis.erfolgswert).toBeUndefined();
            expect(grundkenntnis.erstkosten).toBe(250);
            expect(grundkenntnis.waffen.length).toBe(2);
            expect(grundkenntnis.waffen[0].name).toBe('Langschwert');
            expect(grundkenntnis.waffen[1].name).toBe('Krummsäbel');
        });
    });

    describe('adjustLernkosten', function () {
        it('should adjust kosten of waffengrundkenntnis', function () {
            let grundkenntnis: Waffengrundkenntnis = new Waffengrundkenntnis();

            grundkenntnis.erstkosten = 4000;

            grundkenntnis.adjustLernkosten('Sö');
            expect(grundkenntnis.erstkosten).toBe(2000);
            grundkenntnis.adjustLernkosten('Kr');
            expect(grundkenntnis.erstkosten).toBe(1000);

            grundkenntnis.adjustLernkosten('As');
            expect(grundkenntnis.erstkosten).toBe(1000);
            grundkenntnis.adjustLernkosten('Ba');
            expect(grundkenntnis.erstkosten).toBe(1000);
            grundkenntnis.adjustLernkosten('BN');
            expect(grundkenntnis.erstkosten).toBe(1000);
            grundkenntnis.adjustLernkosten('BS');
            expect(grundkenntnis.erstkosten).toBe(1000);
            grundkenntnis.adjustLernkosten('BW');
            expect(grundkenntnis.erstkosten).toBe(1000);
            grundkenntnis.adjustLernkosten('Gl');
            expect(grundkenntnis.erstkosten).toBe(1000);
            grundkenntnis.adjustLernkosten('Hä');
            expect(grundkenntnis.erstkosten).toBe(1000);
            grundkenntnis.adjustLernkosten('Or');
            expect(grundkenntnis.erstkosten).toBe(1000);
            grundkenntnis.adjustLernkosten('Se');
            expect(grundkenntnis.erstkosten).toBe(1000);
            grundkenntnis.adjustLernkosten('Sp');
            expect(grundkenntnis.erstkosten).toBe(1000);
            grundkenntnis.adjustLernkosten('Wa');
            expect(grundkenntnis.erstkosten).toBe(1000);

            grundkenntnis.erstkosten = 1;
            grundkenntnis.adjustLernkosten('Be');
            expect(grundkenntnis.erstkosten).toBe(2);
            grundkenntnis.adjustLernkosten('Dr');
            expect(grundkenntnis.erstkosten).toBe(4);
            grundkenntnis.adjustLernkosten('Hl');
            expect(grundkenntnis.erstkosten).toBe(8);
            grundkenntnis.adjustLernkosten('Hx');
            expect(grundkenntnis.erstkosten).toBe(16);
            grundkenntnis.adjustLernkosten('Ma');
            expect(grundkenntnis.erstkosten).toBe(32);
            grundkenntnis.adjustLernkosten('PH');
            expect(grundkenntnis.erstkosten).toBe(64);
            grundkenntnis.adjustLernkosten('PF');
            expect(grundkenntnis.erstkosten).toBe(128);
            grundkenntnis.adjustLernkosten('PK');
            expect(grundkenntnis.erstkosten).toBe(256);
            grundkenntnis.adjustLernkosten('PM');
            expect(grundkenntnis.erstkosten).toBe(512);
            grundkenntnis.adjustLernkosten('PT');
            expect(grundkenntnis.erstkosten).toBe(1024);
            grundkenntnis.adjustLernkosten('PW');
            expect(grundkenntnis.erstkosten).toBe(2048);
            grundkenntnis.adjustLernkosten('Sc');
            expect(grundkenntnis.erstkosten).toBe(4096);
            grundkenntnis.adjustLernkosten('Th');
            expect(grundkenntnis.erstkosten).toBe(8192);
        });
    });

    describe('berechneGeplanteKosten', function () {
        it('should sum erstkosten and no waffe', function () {
            let kosten:number;
            let json = {
                "name": "Einhandschwerter",
                "erstkosten": 500,
                "waffen": []
            };

            let grundkenntnis: Waffengrundkenntnis;

            grundkenntnis = Waffengrundkenntnis.deserialize(<Waffengrundkenntnis>json, 'Sö', 'angriff');

            kosten = grundkenntnis.berechneGeplanteKosten();

            expect(kosten).toBe(250);
        });
        it('should sum erstkosten and two waffe', function () {
            let kosten:number;
            let json = {
                "name": "Einhandschwerter",
                "erstkosten": 500,
                "waffen": [
                    {
                        "name": "Langschwert",
                        "staerke": 31,
                        "geschicklichkeit": 21,
                        "schwierigkeit": 5
                    },
                    {
                        "name": "Krummsäbel",
                        "staerke": 31,
                        "geschicklichkeit": 11,
                        "schwierigkeit": 4
                    }
                ]
            };

            let grundkenntnis: Waffengrundkenntnis;

            grundkenntnis = Waffengrundkenntnis.deserialize(<Waffengrundkenntnis>json, 'Sö', 'angriff');

            let langschwert = grundkenntnis.waffen[0];
            let kurzschwert = grundkenntnis.waffen[1];

            langschwert.lerneBis(langschwert.verbesserungen[3]);
            kurzschwert.lerneBis(kurzschwert.verbesserungen[1]);

            kosten = grundkenntnis.berechneGeplanteKosten();

            expect(kosten).toBe(344);
        });
        it('should sum erstkosten and one waffe with nothing in geplanteKosten', function () {
            let grundkenntnis : Waffengrundkenntnis;
            let waffe : Waffe;
            let kosten :number;

            grundkenntnis = new Waffengrundkenntnis();
            grundkenntnis.name = 'Einhandschwerter';
            grundkenntnis.waffen = [];
            waffe = new Waffe();
            waffe.name = 'Langschwert';
            waffe.schwierigkeit = 5;
            waffe.geplanteStufen = [];
            waffe.offeneStufen=[];
            waffe.verbesserungen=[];
            grundkenntnis.waffen.push(waffe);

            kosten = grundkenntnis.berechneGeplanteKosten();

            expect(kosten).toBe(500);
        });
    });
});