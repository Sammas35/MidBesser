import {Injectable} from '@angular/core';
import {Charakter} from "../domain/charakter";
import {Observable} from "rxjs/Observable";

declare var electron: any;
let fs = electron.remote.require('fs');

@Injectable()
export class DomainIoService {
    private basePath: string = '.\\';

    constructor() {
    }

    saveCharacter(character: Charakter) {
        let charPath = this.basePath + 'chars';
        fs.stat(charPath, (err, stats) => {
            if (err) {
                fs.mkdirSync(charPath);
            }
            fs.writeFile(charPath + '\\' + character.name + '.json', JSON.stringify(character), 'UTF-8', (err) => {
                if (err) throw err;
                console.log('Charakter ' + character.name + ' gespeichert');
            });
        });
    }

    getCharacterList(): Observable<Charakter> {
        let basePath = '.\\';

        fs.stat(basePath + 'chars', (err, stats) => {
            if (err) {
                fs.mkdirSync(basePath + 'chars');
            }
        });

        return Observable.create(observer => {
            fs.readdir(basePath + 'chars', this.readCharDir(observer));
        });
    }

    readCharDir(observer) {
        let readCharFile = this.readCharFile;
        return function (err: any, files: string[]) {
            console.log(arguments);
            if (err) {
                console.error('error while reading char directory: ' + err);
                return;
            }

            files.forEach(readCharFile(observer));
        }
    }

    readCharFile(observer) {
        return function (file: string) {
            fs.readFile('.\\chars\\' + file, 'utf-8', (err, data) => {
                if (err) {
                    alert("An error ocurred reading the file :" + err.message);
                    return;
                }

                let charakter : Charakter;

                charakter = Charakter.deserialize(JSON.parse(data));

                observer.next(charakter);
            });

        }
    }
}
