import {Component, OnInit} from '@angular/core';
import {DomainService} from "../domainservice/domain.service";
import {SKILLS} from "../data/skills";
import {Charakter} from "../domain/charakter";
import {Faehigkeit} from "../domain/faehigkeit";
import {Verbesserung} from "../domain/verbesserung";
import {WAFFEN} from "../data/waffen";
import {Waffengrundkenntnis} from "../domain/waffengrundkenntnis";
import {LernComponent} from "../components/lern-component";

@Component({
    selector: 'app-faehigkeiten',
    templateUrl: './faehigkeiten.component.html',
    styleUrls: ['./faehigkeiten.component.css']
})
export class FaehigkeitenComponent extends LernComponent implements OnInit {

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

    entferne(faehigkeit: Faehigkeit, verbesserung:Verbesserung){
        faehigkeit.entferneBis(verbesserung);
    }

    lerne(faehigkeit: Faehigkeit, verbesserung:Verbesserung){
        faehigkeit.lerneBis(verbesserung);
    }

    berechneGeplanteKosten():number{
        let kosten : number;

        kosten = this.charakter.faehigkeitenWunschList.reduce((prev, curr)=> {
            return prev + curr.berechneGeplanteKosten();
        }, 0);

        return kosten;
    }
}
