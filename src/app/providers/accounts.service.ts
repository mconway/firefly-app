import { Injectable } from '@angular/core';
import { AccountModel } from '../models/account.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsService  extends BaseService<AccountModel>{

  protected endpoint: string = '/accounts';
  protected model = AccountModel;

  public groupAccounts(group: string, accounts: any): AccountModel[]{
      return accounts.reduce(function (r, a) {
          //if(a[group] !== undefined && a[group] !== null){
              r[a[group]] = r[a[group]] || [];
              r[a[group]].push(a);
              return r;
          //}
        }, Object.create(null));
  }

  public getSubgroupTotal(roles: string[], accounts) : any{
      // ccAsset, sharedAsset, savingAsset, defaultAsset
      var groups = [];
      
      roles.forEach(role => {
          if(accounts[role] !== undefined && accounts[role] !== null){
              var subAccounts = accounts[role];
              var subAccountsCurrency = this.groupAccounts('currencyCode', subAccounts);
  
              for(let currency of Object.keys(subAccountsCurrency))
              {
                  var currencySymbol = "";
                  var total = 0;
  
                  for(var i = 0; i < subAccountsCurrency[currency].length; i++){
                      var account = subAccountsCurrency[currency][i];
                      currencySymbol = account.currencySymbol;
                      if(account.role === "ccAsset" && account.virtualBalance > 0){
                          total += account.currentBalance - account.virtualBalance;
                      }else{
                          total += parseFloat(account.currentBalance);
                      }
                  }

                  if(groups[currency] === undefined){
                      groups[currency] = {
                          total: total,
                          currency: currency,
                          currencySymbol: currencySymbol
                      };
                  }else{
                      groups[currency].total += total;
                  }

              }
              
          }else{
              groups["null"] = {
                  total: 0,
                  currency: ""
              }; 
          }
      });

      return Object.keys(groups).map(key => ({key, val:groups[key]}));
  }
}
