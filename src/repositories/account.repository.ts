import { BaseRepository } from './base.repository';
import { AccountModel } from '../models/account.model';
import { CategoryModel } from '../models/category.model';

export class AccountRepository extends BaseRepository<AccountModel>{
    protected endpoint: string = '/accounts';
    protected model = AccountModel;

    public groupAccounts(group: string, accounts: any): AccountModel[]{
        return accounts.reduce(function (r, a) {
            //if(a[group] !== undefined && a[group] !== null){
                //console.log(r);
                //console.log(a)
                //console.log(a[group])
                r[a[group]] = r[a[group]] || [];
                r[a[group]].push(a);
                return r;
            //}
          }, Object.create(null));
    }

    public getSubgroupTotal(role, accounts) : any{
        // ccAsset, sharedAsset, savingAsset, defaultAsset
        var subAccounts = accounts[role];
        var subAccountsCurrency = this.groupAccounts('currencyCode', subAccounts);
        var total = 0;

        var groups = [];

        for(let currency of Object.keys(subAccountsCurrency))
        {
            for(var i = 0; i < subAccountsCurrency[currency].length; i++){
                var account = subAccountsCurrency[currency][i];
                if(account.role === "ccAsset" && account.virtualBalance > 0){
                    total += account.currentBalance - account.virtualBalance;
                }else{
                    total += parseFloat(account.currentBalance);
                }
            }
            groups.push({
                total: total,
                currency: currency
            });
        }

        return groups;
    }
}