import { FireflyRemoteProvider } from "../providers/firefly-remote/firefly-remote";
import { Inject, Injectable } from "@angular/core";

@Injectable()
export class AccountListModel {
    public accounts: any;
    public meta: any;
    public groupedAccounts: any;
    public accountTypes: any;

    constructor(@Inject(FireflyRemoteProvider) private fireflyService){

    }

    getAccounts() {
        return this.fireflyService.getAccounts().then((data) => {
            this.meta = data['meta'];
            this.accounts = data['data'];
            this.accounts.sort((a, b) => parseFloat(b.attributes.current_balance) - parseFloat(a.attributes.current_balance))
            this.groupedAccounts = this.groupAccounts('role', data['data']);
            this.accountTypes = Object.keys(this.groupedAccounts).sort();

            return this;
        });
      }
    
    groupAccounts(group: string, accounts: any){
        return accounts.reduce(function (r, a) {
            r[a.attributes[group]] = r[a.attributes[group]] || [];
            //console.log(moment(a.attributes.next_expected_match).toNow());
            r[a.attributes[group]].push(a);
            return r;
          }, Object.create(null));
    }

    getSubgroupTotal(role) : number{
        // ccAsset, sharedAsset, savingAsset, defaultAsset
        var subAccounts = this.groupedAccounts[role];
        var total = 0;

        for(var i = 0; i < subAccounts.length; i++){
            total += parseFloat(subAccounts[i].attributes.current_balance);
        }

        return total;
    }
}