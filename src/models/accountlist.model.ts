import { FireflyRemoteProvider } from "../providers/firefly-remote/firefly-remote";
import { Inject, Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';

@Injectable()
export class AccountListModel {
    public accounts: any;
    public meta: any;
    public groupedAccounts: any;
    public accountTypes: any;
    public lastUpdated: Date;

    constructor(@Inject(FireflyRemoteProvider) private fireflyService, @Inject(Storage) private storage){

    }

    getAccounts(refresh: boolean = false) {
        console.log(refresh)
        if(refresh){
            return this.getAccountsFromService();
        }else{
            return this.getAccountsFromCache();
        }
      }
    
    private getAccountsFromService(){
        return this.fireflyService.getAccounts().then((data) => {
            if(data){
                this.meta = data['meta'];
                this.accounts = data['data'];
                this.accounts.sort((a, b) => parseFloat(b.attributes.current_balance) - parseFloat(a.attributes.current_balance))
                this.groupedAccounts = this.groupAccounts('role', data['data']);
                this.accountTypes = Object.keys(this.groupedAccounts).sort();
                this.lastUpdated = new Date();

                this.saveToStorage();
            }
            return this;
        });
    }

    private getAccountsFromCache(){
        return this.storage.get('accounts').then((data) => {
            if(!data)
                data = { accounts: [] }

            this.meta = data['meta'];
            this.accounts = data['accounts'];
            this.accounts.sort((a, b) => parseFloat(b.attributes.current_balance) - parseFloat(a.attributes.current_balance));
            this.groupedAccounts = this.groupAccounts('role', data['accounts']) || [];
            this.accountTypes = Object.keys(this.groupedAccounts).sort();
            this.lastUpdated = data['lastUpdated'];
        });
    }

    private saveToStorage(){
        this.storage.set('accounts', {
            meta: this.meta,
            accounts: this.accounts,
            lastUpdated: this.lastUpdated
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

        if(subAccounts) {
            for(var i = 0; i < subAccounts.length; i++){
                total += parseFloat(subAccounts[i].attributes.current_balance);
            }
        }

        return total;
    }
}