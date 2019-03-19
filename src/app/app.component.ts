import {Component, NgZone, OnInit} from '@angular/core';
import {DomainService} from './domainservice/domain.service';
import {Charakter} from './domain/charakter';
import {DomainIoService} from './domain-io/domain-io.service';
import {ElectronService} from 'ngx-electron';
import {Router} from '@angular/router';


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
                private ngZone: NgZone) {

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
        this.domainService.currentCharakter = new Charakter();
        this.ngZone.run(() => {
            this.router.navigate(['/neu']).then(()=>{console.log('done')});
        });
    }

    openChar(event: any, fileName: string) {
        this.domainService.loadCharakter(fileName)
            .subscribe(value => {
                this.ngZone.run(() => {
                    this.domainService.currentCharakter = value;
                    // this.router.navigateByUrl('/').then(()=>{}).catch((err)=>{console.log('navigation error', err)});
                },);
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

    lernPermanent(currentCharakter: Charakter) {
        currentCharakter.lernPermanent();
    }
}
