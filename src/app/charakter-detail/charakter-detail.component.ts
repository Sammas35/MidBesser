import {Component, Input, OnInit} from '@angular/core';
import {Charakter} from "../domain/charakter";
import {AbenteuerTyp, ABENTEUERTYPEN, ABENTEUERTYPEN_LIST} from "../domain/abenteuer-typ";

@Component({
    selector: 'app-charakter-detail',
    templateUrl: './charakter-detail.component.html',
    styleUrls: ['./charakter-detail.component.css']
})
export class CharakterDetailComponent implements OnInit {
    @Input()
    charakter: Charakter;

    abenteuertypChoice : AbenteuerTyp[] = ABENTEUERTYPEN_LIST;
    constructor() {
    }

    ngOnInit() {
    }

}
