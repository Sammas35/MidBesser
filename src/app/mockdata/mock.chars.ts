import {Charakter} from "../domain/charakter";
import {ABENTEUERTYPEN} from "../domain/abenteuer-typ";

export const CHARS: any[] = [
    {
        name: 'Hans',
        abenteuertyp: ABENTEUERTYPEN.Soeldner,
        faehigkeitenList:[],
        faehigkeitenWunschList:[],
        faehigkeitenGelerntList:[{
            "name": "beidhändiger Kampf",
            "erfolgswert": "-4",
        }]
    }, {
        name: 'Paul',
        abenteuertyp: ABENTEUERTYPEN.Magier,
        faehigkeitenList:[],
        faehigkeitenWunschList:[]
    }, {
        name: 'Willi',
        abenteuertyp: ABENTEUERTYPEN.Spitzbube,
        faehigkeitenList:[],
        faehigkeitenWunschList:[]
    }
];