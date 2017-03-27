import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CharlistComponent} from './charlist.component';
import {AppComponent} from "../app.component";
import {CharService} from "../charservice/char.service";

describe('CharlistComponent', () => {
    let component: CharlistComponent;
    let fixture: ComponentFixture<CharlistComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, CharlistComponent],
            providers: [CharService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CharlistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render 3 chars', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        let liList = compiled.querySelectorAll('.charinlist');

        expect(liList).toBeTruthy();
        expect(liList.length).toBe(3);
        expect(liList[0].textContent).toBe('Hans');
        expect(liList[1].textContent).toBe('Paul');
        expect(liList[2].textContent).toBe('Willi');
    }));
});
