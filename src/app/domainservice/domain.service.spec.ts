import {TestBed, inject, async} from '@angular/core/testing';

import {DomainService} from './domain.service';
import {MockCharService} from "../mockdata/mock-char-service";
import {CharService} from "../charservice/char.service";

describe('DomainService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DomainService,
                { provide: CharService, useClass: MockCharService }]
        });
    });

    it('should inject', inject([DomainService], (service: DomainService) => {
        expect(service).toBeTruthy();
    }));

    it('should have a list of charakters', async(inject([DomainService], (service: DomainService) => {
        service.loadCharakters();
        expect(service.charakterList).toBeTruthy();
        expect(service.charakterList.length).toBe(3);
    })));

});
