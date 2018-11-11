export class Collection_Item {
    key: string;
    name: string;
    parentCollection: string;

    constructor(key,name,parentCollection){
        this.key = key;
        this.name=name;
        this.parentCollection = parentCollection;
    }
}