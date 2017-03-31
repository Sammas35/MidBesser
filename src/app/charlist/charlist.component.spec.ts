import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CharlistComponent} from './charlist.component';
import {AppComponent} from "../app.component";
import {CharService} from "../charservice/char.service";
import {CharakterDetailComponent} from "../charakter-detail/charakter-detail.component";
import {MockCharService} from "../mockdata/mock-char-service";
import {Charakter} from "../domain/charakter";
import {CHARS} from "../mockdata/mock.chars";
import {FormsModule} from "@angular/forms";
import {DomainService} from "../domainservice/domain.service";
import {TEST_CONFIG} from "../testconfig/testconfig";

describe('CharlistComponent', () => {
    let component: CharlistComponent;
    let fixture: ComponentFixture<CharlistComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule(TEST_CONFIG)
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CharlistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('model', function () {
        it('should create', () => {
            expect(component).toBeTruthy();
            expect(component.domainService.currentCharakter).toBeFalsy();
            expect(component.domainService.charakterList).toBeDefined();
            expect(component.domainService.charakterList.length).toBe(3);
            expect(component.domainService.charakterList[0].name).toBe('Hans');
            expect(component.domainService.charakterList[1].name).toBe('Paul');
            expect(component.domainService.charakterList[2].name).toBe('Willi');
        });
        it('should select charakter on click', () => {
            let charakter: Charakter;

            charakter = CHARS[1];
            component.onSelect(charakter);

            expect(component.domainService.currentCharakter).toBe(charakter);
        });
    });

    describe('render', function () {
        it('should render 3 chars', async(() => {
            const fixture = TestBed.createComponent(AppComponent);

            component.ngOnInit();

            fixture.detectChanges();

            const compiled = fixture.debugElement.nativeElement;
            let liList = compiled.querySelectorAll('.charinlist');

            expect(component.domainService.charakterList.length).toBe(3);
            // expect(liList).toBeTruthy();
            // expect(liList.length).toBe(3);
            // expect(liList[0].textContent.trim()).toBe('Hans, Söldner');
            // expect(liList[1].textContent.trim()).toBe('Paul, Magier');
            // expect(liList[2].textContent.trim()).toBe('Willi, Spitzbube');
        }));
    });
});
