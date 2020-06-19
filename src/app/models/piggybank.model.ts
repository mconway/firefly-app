import { Inject, Injectable } from "@angular/core";
//import { asPureExpressionData } from "@angular/core/src/view";
import { PiggyBankEventModel } from "./piggybankevent.model";

@Injectable()
export class PiggybankModel implements BaseModel {
    public isPending;
    public id: number;
    public name: string;
    public currencyCode: string;
    public currencySymbol: string;
    public targetAmount: number;
    public percentage: number;
    public currentAmount: number;
    public leftToSave: number;
    public savePerMonth: number;
    public startDate: Date;
    public targetDate: Date;
    public active: boolean;
    public accountId: number;

    public events: PiggyBankEventModel[] = [];

    constructor(){

    }

    public hydrate(apiData: any){
        this.id = apiData.id;
        this.name = apiData.attributes.name;
        this.currencyCode = apiData.attributes.currency_code;
        this.currencySymbol = apiData.attributes.currency_symbol;
        this.targetAmount = apiData.attributes.target_amount;
        this.percentage = apiData.attributes.percentage;
        this.currentAmount = apiData.attributes.current_amount;
        this.leftToSave = apiData.attributes.left_to_save;
        this.savePerMonth = apiData.attributes.save_per_month;
        this.startDate = apiData.attributes.start_date;
        this.targetDate = apiData.attributes.target_date;
        this.active = apiData.attributes.active;
        
        // if we got the details page
        if(apiData.relationships !== null && apiData.relationships !== undefined){
            if(apiData.relationships.account !== null && apiData.relationships.account !== undefined){
                this.accountId = apiData.relationships.account.data.id;
            }
            if(apiData.relationships.piggy_bank_events !== null && apiData.relationships.piggy_bank_events !== undefined && apiData.included !== null && apiData.included !== undefined){
                var events = apiData.included.filter(e => { return e.type == "piggy_bank_events" });
                events.forEach(e => {
                    var event = new PiggyBankEventModel(e);
                    this.events.push(event);
                });
            }
        }
    }

    public getApiEntity(){
        return {
            "name": this.name,
            "account_id": this.accountId,
            "target_amount": this.targetAmount,
            "start_date": this.startDate,
            "target_date": this.targetDate,
        };
    }
}