import { Injectable } from "@angular/core";

@Injectable()
export class TransactionItemModel{

    public amount: number
    public source_id: number
    public destination_id: number
    public currency_code: string

    public constructor(data){
        this.amount = data.amount;
        this.source_id = data.source;
        this.destination_id = data.destination;
        this.currency_code = data.currency_code;
    }

}