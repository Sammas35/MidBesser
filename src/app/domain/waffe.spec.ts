import {Waffe} from "./waffe";

fdescribe('Waffe', () => {
    it('should create an instance', () => {
        expect(new Waffe()).toBeTruthy();
    });


    describe('deserialize', function () {
        it('should deserialize a waffe json for a Krieger or Söldner', function () {
            let waffe;
            let json = {
                "name": "Langschwert",
                "staerke": 31,
                "geschicklichkeit": 21,
                "schwierigkeit": 5
            };

            waffe = Waffe.deserialize(<Waffe>json, 0.5, 'angriff');

            expect(waffe.name).toBe('Langschwert');
            expect(waffe.staerke).toBe(31);
            expect(waffe.geschicklichkeit).toBe(21);
            expect(waffe.schwierigkeit).toBe(5);

            expect(waffe.verbesserungen.length).toBe(15);
            expect(waffe.verbesserungen[0].erfolgswert).toBe('5');
            expect(waffe.verbesserungen[0].kosten).toBe(15);
            expect(waffe.verbesserungen[1].erfolgswert).toBe('6');
            expect(waffe.verbesserungen[1].kosten).toBe(15);
            expect(waffe.verbesserungen[2].erfolgswert).toBe('7');
            expect(waffe.verbesserungen[2].kosten).toBe(15);
            expect(waffe.verbesserungen[3].erfolgswert).toBe('8');
            expect(waffe.verbesserungen[3].kosten).toBe(25);
            expect(waffe.verbesserungen[4].erfolgswert).toBe('9');
            expect(waffe.verbesserungen[4].kosten).toBe(50);
            expect(waffe.verbesserungen[5].erfolgswert).toBe('10');
            expect(waffe.verbesserungen[5].kosten).toBe(100);
            expect(waffe.verbesserungen[6].erfolgswert).toBe('11');
            expect(waffe.verbesserungen[6].kosten).toBe(200);
            expect(waffe.verbesserungen[7].erfolgswert).toBe('12');
            expect(waffe.verbesserungen[7].kosten).toBe(400);
            expect(waffe.verbesserungen[8].erfolgswert).toBe('13');
            expect(waffe.verbesserungen[8].kosten).toBe(750);
            expect(waffe.verbesserungen[9].erfolgswert).toBe('14');
            expect(waffe.verbesserungen[9].kosten).toBe(1250);
            expect(waffe.verbesserungen[10].erfolgswert).toBe('15');
            expect(waffe.verbesserungen[10].kosten).toBe(2500);
            expect(waffe.verbesserungen[11].erfolgswert).toBe('16');
            expect(waffe.verbesserungen[11].kosten).toBe(2500);
            expect(waffe.verbesserungen[12].erfolgswert).toBe('17');
            expect(waffe.verbesserungen[12].kosten).toBe(3750);
            expect(waffe.verbesserungen[13].erfolgswert).toBe('18');
            expect(waffe.verbesserungen[13].kosten).toBe(3750);
            expect(waffe.verbesserungen[14].erfolgswert).toBe('19');
            expect(waffe.verbesserungen[14].kosten).toBe(6250);
        });
    });
});
