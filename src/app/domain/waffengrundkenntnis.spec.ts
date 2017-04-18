import {Waffengrundkenntnis} from "./waffengrundkenntnis";

fdescribe('Waffengrundkenntnis', () => {
    it('should create an instance', () => {
        expect(new Waffengrundkenntnis()).toBeTruthy();
    });


    describe('deserialize', function () {
        it('should deserialize a json', function () {
            let json = {
                "name": "Einhandschwerter",
                "kosten": 500,
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
            }
            let grundkenntnis: Waffengrundkenntnis;

            grundkenntnis = Waffengrundkenntnis.deserialize(<Waffengrundkenntnis>json);

            expect(grundkenntnis.name).toBe('Einhandschwerter');
            expect(grundkenntnis.kosten).toBe(500);
            expect(grundkenntnis.waffen.length).toBe(2);
            expect(grundkenntnis.waffen[0].name).toBe('Langschwert');
            expect(grundkenntnis.waffen[1].name).toBe('Krummsäbel');
        });
    });

    describe('adjustLernkosten', function () {
        it('should adjust kosten of waffengrundkenntnis', function () {
            let grundkenntnis: Waffengrundkenntnis = new Waffengrundkenntnis();

            grundkenntnis.kosten = 4000;

            grundkenntnis.adjustLernkosten('Sö');
            expect(grundkenntnis.kosten).toBe(2000);
            grundkenntnis.adjustLernkosten('Kr');
            expect(grundkenntnis.kosten).toBe(1000);

            grundkenntnis.adjustLernkosten('As');
            expect(grundkenntnis.kosten).toBe(1000);
            grundkenntnis.adjustLernkosten('Ba');
            expect(grundkenntnis.kosten).toBe(1000);
            grundkenntnis.adjustLernkosten('BN');
            expect(grundkenntnis.kosten).toBe(1000);
            grundkenntnis.adjustLernkosten('BS');
            expect(grundkenntnis.kosten).toBe(1000);
            grundkenntnis.adjustLernkosten('BW');
            expect(grundkenntnis.kosten).toBe(1000);
            grundkenntnis.adjustLernkosten('Gl');
            expect(grundkenntnis.kosten).toBe(1000);
            grundkenntnis.adjustLernkosten('Hä');
            expect(grundkenntnis.kosten).toBe(1000);
            grundkenntnis.adjustLernkosten('Or');
            expect(grundkenntnis.kosten).toBe(1000);
            grundkenntnis.adjustLernkosten('Se');
            expect(grundkenntnis.kosten).toBe(1000);
            grundkenntnis.adjustLernkosten('Sp');
            expect(grundkenntnis.kosten).toBe(1000);
            grundkenntnis.adjustLernkosten('Wa');
            expect(grundkenntnis.kosten).toBe(1000);

            grundkenntnis.kosten = 1;
            grundkenntnis.adjustLernkosten('Be');
            expect(grundkenntnis.kosten).toBe(2);
            grundkenntnis.adjustLernkosten('Dr');
            expect(grundkenntnis.kosten).toBe(4);
            grundkenntnis.adjustLernkosten('Hl');
            expect(grundkenntnis.kosten).toBe(8);
            grundkenntnis.adjustLernkosten('Hx');
            expect(grundkenntnis.kosten).toBe(16);
            grundkenntnis.adjustLernkosten('Ma');
            expect(grundkenntnis.kosten).toBe(32);
            grundkenntnis.adjustLernkosten('PH');
            expect(grundkenntnis.kosten).toBe(64);
            grundkenntnis.adjustLernkosten('PF');
            expect(grundkenntnis.kosten).toBe(128);
            grundkenntnis.adjustLernkosten('PK');
            expect(grundkenntnis.kosten).toBe(256);
            grundkenntnis.adjustLernkosten('PM');
            expect(grundkenntnis.kosten).toBe(512);
            grundkenntnis.adjustLernkosten('PT');
            expect(grundkenntnis.kosten).toBe(1024);
            grundkenntnis.adjustLernkosten('PW');
            expect(grundkenntnis.kosten).toBe(2048);
            grundkenntnis.adjustLernkosten('Sc');
            expect(grundkenntnis.kosten).toBe(4096);
            grundkenntnis.adjustLernkosten('Th');
            expect(grundkenntnis.kosten).toBe(8192);
        });
    });
});