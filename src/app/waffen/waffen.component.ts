import {Component, OnInit} from '@angular/core';
import {WAFFEN} from "../data/waffen";
import {Waffengrundkenntnis} from "../domain/waffengrundkenntnis";
import {DomainService} from "../domainservice/domain.service";
import {Charakter} from "../domain/charakter";
import {Waffe} from "../domain/waffe";

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

    add(waffe:Waffe, grundkenntnis:Waffengrundkenntnis){
        let wunschGrundkenntnis:Waffengrundkenntnis;

        wunschGrundkenntnis = this.getWunschkenntnis(grundkenntnis);

        wunschGrundkenntnis.addWaffe(waffe);
    }

    private getWunschkenntnis(waffengrundkenntnis):Waffengrundkenntnis {
        let result : Waffengrundkenntnis;

        result = this.charakter.waffenWunschList.find((grundkenntnis)=>grundkenntnis.name === waffengrundkenntnis.name);

        if(!result) {
            result = new Waffengrundkenntnis();
            result.name = waffengrundkenntnis.name;
            result.kosten = waffengrundkenntnis.kosten;
            result.faktor = waffengrundkenntnis.faktor;
            result.waffen = [];
            this.charakter.waffenWunschList.push(result);
        }

        return result;
    }
}
