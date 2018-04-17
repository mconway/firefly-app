import { FireflyRemoteProvider } from "../providers/firefly-remote/firefly-remote";
import { Inject, Injectable } from "@angular/core";

@Injectable()
export class BillListModel {
    public bills: any;
    public meta: any;
    public dueDates: any;

    constructor(@Inject(FireflyRemoteProvider) private fireflyService){

    }

    getBills() {
        var date = new Date();
        var start = new Date(date.setMonth(date.getMonth() - 2)).toISOString().slice(0,10);
        var end = new Date(date.setMonth(date.getMonth() + 4)).toISOString().slice(0,10);

        return this.fireflyService.getBills(start, end).then((data) => {
            this.bills = this.groupBills('next_expected_match', data['data'])
            this.meta = data['meta'];
            this.dueDates = Object.keys(this.bills).sort();

            return this;
        });
    }

    groupBills(group: string, bills: any){
        return bills.reduce(function (r, a) {
            r[a.attributes.next_expected_match] = r[a.attributes.next_expected_match] || [];
            //console.log(moment(a.attributes.next_expected_match).toNow());
            r[a.attributes.next_expected_match].push(a);
            return r;
        }, Object.create(null));
    }
}