import {TestBed, async} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {CharlistComponent} from "./charlist/charlist.component";
import {CharService} from "./charservice/char.service";
import {MockCharService} from "./mockdata/mock-char-service";
import {CharakterDetailComponent} from "./charakter-detail/charakter-detail.component";
import {FormsModule} from "@angular/forms";
import {DomainService} from "./domainservice/domain.service";
import {TEST_CONFIG} from "./testconfig/testconfig";

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule(TEST_CONFIG).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it(`should have a title 'Midgard verbessern'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('Midgard verbessern');
    }));

    it('should render title in a h2 tag', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h2').textContent).toContain('Midgard verbessern');
    }));
});
