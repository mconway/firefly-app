import { Inject, Injectable } from "@angular/core";

@Injectable()
export class CategoryModel {
    public id: number;
    public name: string;

    constructor(){

    }

    public hydrate(apiData: any){
        this.id = apiData.id;
        this.name = apiData.attributes.name;
    }
}