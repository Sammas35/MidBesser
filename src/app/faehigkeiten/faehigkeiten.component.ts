import {Component, OnInit} from '@angular/core';
import {DomainService} from "../domainservice/domain.service";
import {SKILLS} from "../data/skills";
import {Charakter} from "../domain/charakter";
import {Faehigkeit} from "../domain/faehigkeit";
import {Verbesserung} from "../domain/verbesserung";

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
                this.charakter.assignFaehigkeit(Faehigkeit.deserialize(<Faehigkeit>skill));
            });
        }
    }


    add(faehigkeit : Faehigkeit){
        this.move(faehigkeit, this.charakter.faehigkeitenList, this.charakter.faehigkeitenWunschList);
    }

    remove(faehigkeit : Faehigkeit){
        if(faehigkeit.erfolgswert) {
            return;
        }
        this.move(faehigkeit, this.charakter.faehigkeitenWunschList, this.charakter.faehigkeitenList);
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

    private move(faehigkeit: Faehigkeit, source:Faehigkeit[], target:Faehigkeit[]) {
        let index;

        index = source.indexOf(faehigkeit);
        if (index > -1) {
            source.splice(index, 1);
        }
        target.push(faehigkeit);
        target.sort((f1, f2) => f1.name.localeCompare(f2.name));
    }
}
