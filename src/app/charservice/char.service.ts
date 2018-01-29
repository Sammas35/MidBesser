import {Injectable} from '@angular/core';
import {Charakter} from "../domain/charakter";
import {CHARS} from "../mockdata/mock.chars";
import {Observable} from "rxjs";
import {Observer} from 'rxjs/Observer';

@Injectable()
export class CharService {

    constructor() {
    }

    getChars(): Observable<Charakter> {
        return Observable.create((observer:Observer<Charakter>) => {
            CHARS.forEach((char) => {
                let charakter : Charakter;

                charakter = Charakter.deserialize(char);

                observer.next(charakter);
            });
            observer.complete();
        });
    }
}
