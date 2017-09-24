import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LernEntity} from "../domain/lern-entity";
import {Verbesserung} from "../domain/verbesserung";

@Component({
    selector: 'app-lern',
    templateUrl: './lern.component.html',
    styleUrls: ['./lern.component.css']
})
export class LernComponent implements OnInit {

    @Input()
    lern: LernEntity;

    constructor() {
    }

    ngOnInit() {
    }

    @Output() remove = new EventEmitter<LernEntity>();

    triggerRemoveEvent(lern:LernEntity) {
        this.remove.emit(lern);
    }

    entferne(lernEntity: LernEntity, verbesserung:Verbesserung){
        lernEntity.entferneBis(verbesserung);
    }

    lerne(lernEntity: LernEntity, verbesserung:Verbesserung){
        lernEntity.lerneBis(verbesserung);
    }
}
