import {Injectable} from '@angular/core';
import {CharService} from "../charservice/char.service";
import {Charakter} from "../domain/charakter";
import {DomainIoService} from "../domain-io/domain-io.service";
import {Observable} from "rxjs/Observable";
import {Observer} from 'rxjs/Observer';

@Injectable()
export class DomainService {

    charakterList: Charakter[];

    currentCharakter: Charakter;

    constructor(private charService: CharService, private domainIoService: DomainIoService) {

    }

    loadCharakters() {
        if (!this.charakterList) {
            this.charakterList = [];
            this.domainIoService.getCharacterList()
                .subscribe((char) => {
                    this.charakterList.push(char);
                });
        }
    }

    loadCharakter(fileName: string):Observable<Charakter> {
        return Observable.create((observer:Observer<Charakter>)=> {
            this.domainIoService.readCharFile(observer)(fileName)
        })
    }
}
