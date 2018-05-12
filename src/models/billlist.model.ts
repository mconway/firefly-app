import { FireflyRemoteProvider } from "../providers/firefly-remote/firefly-remote";
import { Inject, Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { BillModel } from "./bill.model";

@Injectable()
export class BillListModel {
    public bills: any;
    public groupedBills: any;
    public meta: any;
    public dueDates: any;
    public lastUpdated: Date;

    constructor(@Inject(FireflyRemoteProvider) private fireflyService, @Inject(Storage) private storage){

    }

    getBills(refresh: boolean = false) {
        if(refresh){
            return this.getBillsFromService(2);
        }else{
            return this.getBillsFromCache();
        }
    }

    filter(item: any, start: Date, end: Date){
        var expectedMatch = new Date(item['next_expected_match']);
        return (expectedMatch >= start) && (expectedMatch <= end);
    }

    private getBillsFromService(pastMonths: number = 2) {
        var date = new Date();
        var start = new Date(date.setMonth(date.getMonth() - pastMonths)).toISOString().slice(0,10);
        var end = new Date(date.setMonth(date.getMonth() + 4)).toISOString().slice(0,10);

        return this.fireflyService.getBills(start, end).then((data) => {
            this.bills = [];

            for(var i = 0; i < data['data'].length; i++){
                var bill = new BillModel(data['data'][i]);
                if(bill.active){
                    this.bills.push(bill);
                }
            }

            this.groupedBills = this.groupBills('nextExpectedMatch', this.bills) || [];
            this.meta = data['meta'];
            this.dueDates = Object.keys(this.groupedBills).sort();
            this.lastUpdated = new Date();

            this.saveToStorage();

            return this;
        });
    }

    private getBillsFromCache() {
        return this.storage.get('bills').then((data) => {
            if(!data)
                data = { bills: [] }

            this.meta = data['meta'];
            this.bills = data['bills'];
            this.groupedBills = data['groupedBills'];
            this.dueDates = data['dueDates'];
            this.lastUpdated = data['lastUpdated'];

            return this;
        });
    }
    
    private saveToStorage(){
        this.storage.set('bills', {
            meta: this.meta,
            bills: this.bills,
            groupedBills: this.groupedBills,
            dueDates: this.dueDates,
            lastUpdated: this.lastUpdated
        });
    }

    groupBills(group: string, bills: any){
        return bills.reduce(function (r, a) {
            r[a[group]] = r[a[group]] || [];
            //console.log(moment(a.attributes.next_expected_match).toNow());
            r[a[group]].push(a);
            return r;
        }, Object.create(null));
    }
}