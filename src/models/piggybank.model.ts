import { Inject, Injectable } from "@angular/core";

@Injectable()
export class PiggybankModel {
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
    }

    public getApiEntity(){
        return {
            "name": this.name,
            "account_id": 3,
            "target_amount": this.targetAmount,
            "start_date": this.startDate,
            "target_date": this.targetDate,
        };
    }
}