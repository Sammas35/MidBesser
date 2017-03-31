import {Component, OnInit} from '@angular/core';
import {DomainService} from "../domainservice/domain.service";
import {SKILLS} from "../data/skills";
import {Charakter} from "../domain/charakter";
import {Faehigkeit} from "../domain/faehigkeit";

@Component({
    selector: 'app-faehigkeiten',
    templateUrl: './faehigkeiten.component.html',
    styleUrls: ['./faehigkeiten.component.css']
})
export class FaehigkeitenComponent implements OnInit {

    charakter : Charakter;

    constructor(protected domainService: DomainService) {
        this.charakter = domainService.currentCharakter;
    }

    ngOnInit() {
        if(this.charakter) {
            console.log(this.charakter);
            SKILLS.forEach((skill) => {
                this.charakter.assignFaehigkeit(<Faehigkeit>skill);
            });
        }
    }
}
