import {LernEntity} from "../domain/lern-entity";
export class LernComponent {

    constructor(protected allList: LernEntity[], protected wunschList: LernEntity[]) {
    }

    protected move(faehigkeit: LernEntity, source:LernEntity[], target:LernEntity[]) {
        let index;

        index = source.indexOf(faehigkeit);
        if (index > -1) {
            source.splice(index, 1);
        }
        target.push(faehigkeit);
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
}
