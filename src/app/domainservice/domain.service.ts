import {Injectable, OnInit} from '@angular/core';
import {CharService} from "../charservice/char.service";
import {Charakter} from "../domain/charakter";

@Injectable()
export class DomainService {

    charakterList: Charakter[];

    currentCharakter: Charakter;

    constructor(private charService: CharService) {

    }

    loadCharakters() {
        if (!this.charakterList) {
            this.charakterList = [];
            this.charService.getChars()
                .subscribe((char) => this.charakterList.push(char));
        }
    }
}
