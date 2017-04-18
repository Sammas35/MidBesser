export class NamedEntity {
    name:string;

    public equals(namedEntity:NamedEntity):boolean{
        return this.name === namedEntity.name;
    }
}
