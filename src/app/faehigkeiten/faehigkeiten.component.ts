import {Component, OnInit} from '@angular/core';
import {DomainService} from "../domainservice/domain.service";
import {SKILLS} from "../data/skills";
import {Charakter} from "../domain/charakter";
import {Faehigkeit} from "../domain/faehigkeit";
import {LernBaseComponent} from "../components/lern-base-component";

@Component({
    selector: 'app-faehigkeiten',
    templateUrl: './faehigkeiten.component.html',
    styleUrls: ['./faehigkeiten.component.css']
})
export class FaehigkeitenComponent extends LernBaseComponent implements OnInit {

    charakter : Charakter;

    constructor(protected domainService: DomainService) {
        super(domainService.currentCharakter.faehigkeitenList, domainService.currentCharakter.faehigkeitenWunschList);
        this.charakter = domainService.currentCharakter;
    }

    ngOnInit() {
        if(this.charakter) {
            console.log(this.charakter);
            SKILLS.forEach((skill) => {
                this.charakter.assignFaehigkeit(Faehigkeit.deserialize(<Faehigkeit>skill));
            });
        }
    }
}
