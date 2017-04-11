import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FaehigkeitenComponent} from './faehigkeiten.component';
import {TEST_CONFIG} from "../testconfig/testconfig";
import {Faehigkeit} from "../domain/faehigkeit";
import {Charakter} from "../domain/charakter";
import {DomainService} from "../domainservice/domain.service";
import {ABENTEUERTYPEN} from "../domain/abenteuer-typ";

describe('FaehigkeitenComponent', () => {
    let component: FaehigkeitenComponent;
    let fixture: ComponentFixture<FaehigkeitenComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule(TEST_CONFIG)
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FaehigkeitenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('plain tests', () => {
        it('should add faehigkeit to wunschliste', function () {
            let char: Charakter;
            let faehigkeitenComponent: FaehigkeitenComponent;
            let faehigkeit: Faehigkeit;

            char = new Charakter();
            char.abenteuertyp = ABENTEUERTYPEN.Soeldner;
            faehigkeitenComponent = new FaehigkeitenComponent(<DomainService>{"currentCharakter": char});

            faehigkeitenComponent.ngOnInit();

            faehigkeit = faehigkeitenComponent.charakter.faehigkeitenList[2];

            faehigkeitenComponent.add(faehigkeit);

            expect(char.faehigkeitenList.find(f => f === faehigkeit)).toBeUndefined();
            expect(char.faehigkeitenWunschList.find(f => f === faehigkeit)).toBeDefined();
        });

        it('should remove faehigkeit from wunschliste', function () {
            let char: Charakter;
            let faehigkeitenComponent: FaehigkeitenComponent;
            let faehigkeit: Faehigkeit;

            char = new Charakter();
            char.abenteuertyp = ABENTEUERTYPEN.Soeldner;
            faehigkeitenComponent = new FaehigkeitenComponent(<DomainService>{"currentCharakter": char});

            faehigkeitenComponent.ngOnInit();

            faehigkeit = faehigkeitenComponent.charakter.faehigkeitenList[2];

            faehigkeitenComponent.add(faehigkeit);

            expect(char.faehigkeitenList.find(f => f === faehigkeit)).toBeUndefined();
            expect(char.faehigkeitenWunschList.find(f => f === faehigkeit)).toBeDefined();

            faehigkeitenComponent.remove(faehigkeit);

            expect(char.faehigkeitenList.find(f => f === faehigkeit)).toBeDefined();
            expect(char.faehigkeitenWunschList.find(f => f === faehigkeit)).toBeUndefined();
        });
    });
});
