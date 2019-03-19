import {Component, OnInit} from '@angular/core';
import {WAFFEN} from "../data/waffen";
import {Waffengrundkenntnis} from "../domain/waffengrundkenntnis";
import {DomainService} from "../domainservice/domain.service";
import {Charakter} from "../domain/charakter";
import {Waffe} from "../domain/waffe";
import {LernBaseComponent} from "../components/lern-base-component";

@Component({
    selector: 'app-waffen',
    templateUrl: './waffen.component.html',
    styleUrls: ['./waffen.component.css']
})
export class WaffenComponent extends LernBaseComponent implements OnInit {

    constructor(protected domainService: DomainService) {
        super(domainService.currentCharakter.waffenList, domainService.currentCharakter.waffenWunschList);
    }

    ngOnInit() {
        WAFFEN.waffengrundkenntnisse.angriff.forEach((w) => {
            this.domainService.currentCharakter.assignWaffe(Waffengrundkenntnis.deserialize(<Waffengrundkenntnis>w, this.domainService.currentCharakter.abenteuertyp.kuerzel, 'angriff'));
        });

        console.log('WaffenComponent', this.domainService.currentCharakter);
    }

    addWaffe(waffe:Waffe, grundkenntnis:Waffengrundkenntnis){
        let wunschGrundkenntnis:Waffengrundkenntnis;

        wunschGrundkenntnis = this.getWunschkenntnis(grundkenntnis);

        grundkenntnis.removeWaffe(waffe);
        wunschGrundkenntnis.addWaffe(waffe);
    }
    removeWaffe(waffe:Waffe, wunschGrundkenntnis:Waffengrundkenntnis){
        let grundkenntnis:Waffengrundkenntnis;

        grundkenntnis = this.getGrundkenntnis(wunschGrundkenntnis);

        wunschGrundkenntnis.removeWaffe(waffe);
        grundkenntnis.addWaffe(waffe);
    }

    private getWunschkenntnis(waffengrundkenntnis : Waffengrundkenntnis):Waffengrundkenntnis {
        let result : Waffengrundkenntnis;

        result = this.domainService.currentCharakter.waffenWunschList.find((grundkenntnis)=>grundkenntnis.name === waffengrundkenntnis.name);

        if(!result) {
            result = new Waffengrundkenntnis();
            result.name = waffengrundkenntnis.name;
            result.erstkosten = waffengrundkenntnis.erstkosten;
            result.faktor = waffengrundkenntnis.faktor;
            result.waffen = [];
            this.domainService.currentCharakter.waffenWunschList.push(result);
        }

        return result;
    }

    private getGrundkenntnis(wunschGrundkenntnis: Waffengrundkenntnis) {
        let result : Waffengrundkenntnis;

        result = this.domainService.currentCharakter.waffenList.find((grundkenntnis)=>grundkenntnis.name === wunschGrundkenntnis.name);

        return result;
    }
}
