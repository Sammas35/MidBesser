import {Verbesserung} from "./verbesserung";

export class Faehigkeit {
    name:string;
    erstkosten:number;
    startwert:string;
    grund:string[];
    ausnahme:string[];
    verbesserungen: Verbesserung[];
}
