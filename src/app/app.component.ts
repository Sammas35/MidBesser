import {Component, NgZone, OnInit} from '@angular/core';
import {DomainService} from "./domainservice/domain.service";
import {Charakter} from "./domain/charakter";
import {DomainIoService} from "./domain-io/domain-io.service";
import {ElectronService} from "ngx-electron";
import {Router} from "@angular/router";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Midgard verbessern';


    constructor(private router: Router,
                public domainService: DomainService,
                public domainIoService: DomainIoService,
                private electronService: ElectronService,
                private ngZone : NgZone) {

        let ipcRenderer = electronService.ipcRenderer;
        ipcRenderer.on('newChar', this.newChar.bind(this));
        ipcRenderer.on('saveChar', this.saveChar.bind(this));
        ipcRenderer.on('openChar', this.openChar.bind(this));
    }

    ngOnInit() {
        this.domainIoService.getCharacterList();
    }

    newChar() {
        console.log('newChar');
    }

    openChar(event: any, fileName: string) {
        // this.router.navigateByUrl('/charakter').then((fulfilled) => {
        //     console.log('Navigate done : ' + fulfilled)
        // }, (reason: any) => {
        //     console.log('Navigate rejected : ' + reason)
        // });
        console.log('openChar', fileName);
        this.domainService.loadCharakter(fileName)
            .subscribe(value => {
                this.domainService.currentCharakter = value;
                console.log('Load Char', value, this.domainService.currentCharakter);
                this.ngZone.run(()=>{}, );
            });
    }

    saveChar() {
        if (this.domainService.currentCharakter) {
            this.saveCurrent(this.domainService.currentCharakter);
        }
    }

    saveCurrent(charakter: Charakter) {
        this.domainIoService.saveCharacter(charakter);
    }
}
