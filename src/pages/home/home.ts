import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FireflyRemoteProvider } from '../../providers/firefly-remote/firefly-remote';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  accountMeta: any;
  accountList: any;
  cashTotal = 0;
  creditTotal = 0;

  constructor(public navCtrl: NavController, private fireflyService : FireflyRemoteProvider) {
    try{
      this.getAccounts();
    }catch{
      console.log("An Exception Occurred");
    }

  }

  getAccounts() {
    this.fireflyService.getAccounts().then((data) => {
      this.accountList = data["data"];
      this.accountMeta = data["meta"];

      this.accountList.sort((a, b) => parseFloat(b.attributes.current_balance) - parseFloat(a.attributes.current_balance))

      this.creditTotal = this.getAccountSummaries("ccAsset");
      this.cashTotal = this.getAccountSummaries("savingAsset") + this.getAccountSummaries("defaultAsset");
    });
  }

  getAccountSummaries(role) {
    // ccAsset, sharedAsset, savingAsset, defaultAsset
    var summaryAccounts = this.accountList.filter(function(a){return a.attributes.role === role});
    var total = 0;

    for(var i = 0; i < summaryAccounts.length; i++){
      total += parseFloat(summaryAccounts[i].attributes.current_balance);
    }

    return total;
  }

}
