import {Component, OnInit} from '@angular/core';
import {CharService} from "../charservice/char.service";
import {Charakter} from "../domain/charakter";
import {DomainService} from "../domainservice/domain.service";

@Component({
    selector: 'app-charlist',
    templateUrl: './charlist.component.html',
    styleUrls: ['./charlist.component.css'],
    providers: [CharService]
})
export class CharlistComponent implements OnInit {
    constructor(public domainService: DomainService) {
    }

    ngOnInit() {
        this.domainService.loadCharakters();
    }

    onSelect(charakter:Charakter){
        this.domainService.currentCharakter = charakter;
    }
}
