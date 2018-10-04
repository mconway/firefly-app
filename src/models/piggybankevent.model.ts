import { Inject, Injectable } from "@angular/core";

@Injectable()
export class PiggyBankEventModel {
    public id: number;
    public createdDate: Date;
    public updatedDate: Date;
    public amount: number;

    constructor(event = null){
        if(event !== null){
            this.hydrate(event);
        }
    }

    public hydrate(apiData: any){
        this.id = apiData.id;
        this.amount = apiData.attributes.amount;
        this.createdDate = apiData.attributes.created_at;
        this.updatedDate = apiData.attributes.updated_at;
    }
}