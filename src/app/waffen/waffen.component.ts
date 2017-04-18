import {Component, OnInit} from '@angular/core';
import {WAFFEN} from "../data/waffen";
import {Waffengrundkenntnis} from "../domain/waffengrundkenntnis";
import {DomainService} from "../domainservice/domain.service";
import {Charakter} from "../domain/charakter";

@Component({
    selector: 'app-waffen',
    templateUrl: './waffen.component.html',
    styleUrls: ['./waffen.component.css']
})
export class WaffenComponent implements OnInit {

    charakter : Charakter;

    constructor(protected domainService: DomainService) {
        this.charakter = domainService.currentCharakter;
    }

    ngOnInit() {
        WAFFEN.waffengrundkenntnisse.angriff.forEach((w) => {
            this.charakter.assignWaffe(Waffengrundkenntnis.deserialize(<Waffengrundkenntnis>w));
        });
    }

}
