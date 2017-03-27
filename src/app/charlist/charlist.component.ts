import {Component, OnInit} from '@angular/core';
import {CharService} from "../charservice/char.service";
import {Charakter} from "../charakter";

@Component({
    selector: 'app-charlist',
    templateUrl: './charlist.component.html',
    styleUrls: ['./charlist.component.css'],
    providers: [CharService]
})
export class CharlistComponent implements OnInit {
    private charlist: Charakter[];

    constructor(private charService: CharService) {
    }

    ngOnInit() {
        this.charlist = this.charService.getChars();
    }
}
