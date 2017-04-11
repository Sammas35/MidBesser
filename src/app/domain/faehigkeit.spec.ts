import {Faehigkeit} from './faehigkeit';
import {SKILLS} from "../data/skills";
import {Verbesserung} from "./verbesserung";

fdescribe('Faehigkeit', () => {
    it('should create an instance', () => {
        expect(new Faehigkeit()).toBeTruthy();
    });

    describe('entferneBis', function () {
        it('should be a function', function () {
            let faehigkeit: Faehigkeit;

            faehigkeit = new Faehigkeit();

            expect(faehigkeit.entferneBis).toBeDefined();
        });
        it('should remove the first Verbesserung when all are planned', function () {
            let faehigkeit: Faehigkeit;
            let verbesserung: Verbesserung;

            faehigkeit = Faehigkeit.deserialize(<Faehigkeit>SKILLS[1]);

            verbesserung = faehigkeit.offeneStufen[5];

            faehigkeit.lerneBis(verbesserung);
            expect(faehigkeit.offeneStufen.length).toBe(0);
            expect(faehigkeit.geplanteStufen.length).toBe(6);

            faehigkeit.entferneBis(verbesserung);
            expect(faehigkeit.offeneStufen.length).toBe(1);
            expect(faehigkeit.geplanteStufen.length).toBe(5);
        });

        it('should remove three Verbesserung if all are planned', function () {
            let faehigkeit: Faehigkeit;
            let verbesserung: Verbesserung;

            faehigkeit = Faehigkeit.deserialize(<Faehigkeit>SKILLS[1]);

            verbesserung = faehigkeit.offeneStufen[5];
            faehigkeit.lerneBis(verbesserung);

            expect(faehigkeit.offeneStufen.length).toBe(0);
            expect(faehigkeit.geplanteStufen.length).toBe(6);

            verbesserung = faehigkeit.verbesserungen[3];
            faehigkeit.entferneBis(verbesserung);

            expect(faehigkeit.offeneStufen.length).toBe(3);
            expect(faehigkeit.geplanteStufen.length).toBe(3);
        });

        it('should remove all Verbesserungen if all are planned', function () {
            let faehigkeit: Faehigkeit;
            let verbesserung: Verbesserung;

            faehigkeit = Faehigkeit.deserialize(<Faehigkeit>SKILLS[1]);

            verbesserung = faehigkeit.offeneStufen[5];
            faehigkeit.lerneBis(verbesserung);

            expect(faehigkeit.offeneStufen.length).toBe(0);
            expect(faehigkeit.geplanteStufen.length).toBe(6);

            verbesserung = faehigkeit.verbesserungen[0];
            faehigkeit.entferneBis(verbesserung);

            expect(faehigkeit.offeneStufen.length).toBe(6);
            expect(faehigkeit.geplanteStufen.length).toBe(0);
        });
    });
    describe('lerneBis', function () {

        it('should add the first Verbesserung', function () {
            let faehigkeit: Faehigkeit;
            let verbesserung: Verbesserung;

            faehigkeit = Faehigkeit.deserialize(<Faehigkeit>SKILLS[1]);

            verbesserung = faehigkeit.offeneStufen[0];

            faehigkeit.lerneBis(verbesserung);

            expect(faehigkeit.offeneStufen.length).toBe(5);
            expect(faehigkeit.geplanteStufen.length).toBe(1);
            expect(faehigkeit.offeneStufen.find(v => v === verbesserung)).toBeUndefined();
            expect(faehigkeit.geplanteStufen.find(v => v === verbesserung)).toBeDefined();
        });
        it('should add three Verbesserungen when the third Verbesserung is added', function () {
            let faehigkeit: Faehigkeit;
            let verbesserung: Verbesserung;
            let verbesserung0: Verbesserung;
            let verbesserung1: Verbesserung;

            faehigkeit = Faehigkeit.deserialize(<Faehigkeit>SKILLS[1]);

            verbesserung0 = faehigkeit.offeneStufen[2];
            verbesserung1 = faehigkeit.offeneStufen[2];
            verbesserung = faehigkeit.offeneStufen[2];

            faehigkeit.lerneBis(verbesserung);

            expect(faehigkeit.offeneStufen.length).toBe(3);
            expect(faehigkeit.geplanteStufen.length).toBe(3);
            expect(faehigkeit.offeneStufen.find(v => v === verbesserung)).toBeUndefined();
            expect(faehigkeit.geplanteStufen.find(v => v === verbesserung)).toBeDefined();
            expect(faehigkeit.offeneStufen.find(v => v === verbesserung0)).toBeUndefined();
            expect(faehigkeit.geplanteStufen.find(v => v === verbesserung0)).toBeDefined();
            expect(faehigkeit.offeneStufen.find(v => v === verbesserung1)).toBeUndefined();
            expect(faehigkeit.geplanteStufen.find(v => v === verbesserung1)).toBeDefined();
            expect(faehigkeit.verbesserungen[0]).toBe(faehigkeit.geplanteStufen[0]);
            expect(faehigkeit.verbesserungen[1]).toBe(faehigkeit.geplanteStufen[1]);
            expect(faehigkeit.verbesserungen[2]).toBe(faehigkeit.geplanteStufen[2]);
            expect(faehigkeit.verbesserungen[3]).toBe(faehigkeit.offeneStufen[0]);
            expect(faehigkeit.verbesserungen[4]).toBe(faehigkeit.offeneStufen[1]);
            expect(faehigkeit.verbesserungen[5]).toBe(faehigkeit.offeneStufen[2]);
        });

        it('should add all Verbesserungen when the last Verbesserung is added', function () {
            let faehigkeit: Faehigkeit;
            let verbesserung: Verbesserung;

            faehigkeit = Faehigkeit.deserialize(<Faehigkeit>SKILLS[1]);

            verbesserung = faehigkeit.offeneStufen[5];

            faehigkeit.lerneBis(verbesserung);

            expect(faehigkeit.offeneStufen.length).toBe(0);
            expect(faehigkeit.geplanteStufen.length).toBe(6);
        });

        it('should add three Verbesserungen and then the other in correct order', function () {
            let faehigkeit: Faehigkeit;
            let verbesserung: Verbesserung;

            faehigkeit = Faehigkeit.deserialize(<Faehigkeit>SKILLS[1]);

            verbesserung = faehigkeit.verbesserungen[2];
            faehigkeit.lerneBis(verbesserung);

            verbesserung = faehigkeit.verbesserungen[5];
            faehigkeit.lerneBis(verbesserung);

            expect(faehigkeit.offeneStufen.length).toBe(0);
            expect(faehigkeit.geplanteStufen.length).toBe(6);
            expect(faehigkeit.verbesserungen[0]).toBe(faehigkeit.geplanteStufen[0]);
            expect(faehigkeit.verbesserungen[1]).toBe(faehigkeit.geplanteStufen[1]);
            expect(faehigkeit.verbesserungen[2]).toBe(faehigkeit.geplanteStufen[2]);
            expect(faehigkeit.verbesserungen[3]).toBe(faehigkeit.geplanteStufen[3]);
            expect(faehigkeit.verbesserungen[4]).toBe(faehigkeit.geplanteStufen[4]);
            expect(faehigkeit.verbesserungen[5]).toBe(faehigkeit.geplanteStufen[5]);
        });

    });
    describe('berechneGeplanteKosten', function () {
        it('should calc the first Verbesserung and Grundkosten', function () {
            let faehigkeit: Faehigkeit;
            let verbesserung: Verbesserung;

            faehigkeit = Faehigkeit.deserialize(<Faehigkeit>SKILLS[1]);

            verbesserung = faehigkeit.verbesserungen[0];

            faehigkeit.lerneBis(verbesserung);

            expect(faehigkeit.berechneGeplanteKosten()).toBe(150);

        });

        it('should calc the first Verbesserung and no Grundkosten', function () {
            let faehigkeit: Faehigkeit;
            let verbesserung: Verbesserung;

            faehigkeit = Faehigkeit.deserialize(<Faehigkeit>SKILLS[1]);

            faehigkeit.erfolgswert = "12";

            verbesserung = faehigkeit.verbesserungen[0];

            faehigkeit.lerneBis(verbesserung);

            expect(faehigkeit.berechneGeplanteKosten()).toBe(50);

        });

        it('should calc the first three Verbesserung and Grundkosten', function () {
            let faehigkeit: Faehigkeit;
            let verbesserung: Verbesserung;

            faehigkeit = Faehigkeit.deserialize(<Faehigkeit>SKILLS[1]);

            verbesserung = faehigkeit.verbesserungen[2];

            faehigkeit.lerneBis(verbesserung);

            expect(faehigkeit.berechneGeplanteKosten()).toBe(300);
        });

        it('should calc all Verbesserungen and Grundkosten', function () {
            let faehigkeit: Faehigkeit;
            let verbesserung: Verbesserung;

            faehigkeit = Faehigkeit.deserialize(<Faehigkeit>SKILLS[1]);

            verbesserung = faehigkeit.verbesserungen[5];

            faehigkeit.lerneBis(verbesserung);

            expect(faehigkeit.berechneGeplanteKosten()).toBe(1700);
        });
    });
});
