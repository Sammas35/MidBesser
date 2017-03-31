import {Injectable} from "@angular/core";
import {CharService} from "../charservice/char.service";
import {Observable} from "rxjs";
import {Charakter} from "../domain/charakter";
import {CHARS} from "./mock.chars";


@Injectable()
export class MockCharService extends CharService{

    getChars(): Observable<Charakter> {
        return Observable.create((observer) => {
            CHARS.forEach((char) => {
                observer.next(char);
            });
            observer.complete();
        });
    }
}