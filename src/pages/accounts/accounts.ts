import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FireflyRemoteProvider } from '../../providers/firefly-remote/firefly-remote';

@Component({
  selector: 'page-home',
  templateUrl: 'accounts.html'
})
export class AccountsPage {
  accountMeta: any;
  accountList: any;
  orderedAccounts: any;

  constructor(public navCtrl: NavController, private fireflyService : FireflyRemoteProvider) {
    this.getAccounts();
  }

  getAccounts() {
    this.fireflyService.getAccounts().then((data) => {
      this.accountList = data["data"];
      this.accountMeta = data["meta"];

      this.accountList.sort((a, b) => parseFloat(b.attributes.current_balance) - parseFloat(a.attributes.current_balance))

      this.orderedAccounts = [
        this.getAccountSubgroup("defaultAsset"),
        this.getAccountSubgroup("ccAsset"),
        this.getAccountSubgroup("savingAsset"),
        this.getAccountSubgroup("sharedAsset")
      ];

      console.log(this.orderedAccounts);
    });
  }

  getAccountSubgroup(role) {
    // ccAsset, sharedAsset, savingAsset, defaultAsset
    var subAccounts = this.accountList.filter(function(a){return a.attributes.role === role});
    var total = 0;

    for(var i = 0; i < subAccounts.length; i++){
      total += parseFloat(subAccounts[i].attributes.current_balance);
    }

    return {
      role: role,
      total: total,
      accounts: subAccounts
    };
  }

}
