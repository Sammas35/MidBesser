import {LernEntity} from "../domain/lern-entity";
export class LernBaseComponent {

    constructor(protected allList: LernEntity[], protected wunschList: LernEntity[]) {
    }

    protected move(lernEntity: LernEntity, source:LernEntity[], target:LernEntity[]) {
        let index;

        index = source.indexOf(lernEntity);
        if (index > -1) {
            source.splice(index, 1);
        }
        target.push(lernEntity);
        target.sort((f1, f2) => f1.name.localeCompare(f2.name));
    }

    public add(namedEntity : LernEntity){
        this.move(namedEntity, this.allList, this.wunschList);
    }

    public remove(namedEntity : LernEntity){
        if(namedEntity.isGelernt()) {
            return;
        }
        this.move(namedEntity, this.wunschList, this.allList);
    }

    berechneGeplanteKosten():number{
        let kosten : number;

        kosten = this.wunschList.reduce((prev, curr)=> {
            return prev + curr.berechneGeplanteKosten();
        }, 0);

        return kosten;
    }
}
