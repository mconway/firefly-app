import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { FireflyRemoteProvider } from '../../providers/firefly-remote/firefly-remote';

@Component({
  selector: 'page-home',
  templateUrl: 'accounts.html'
})
export class AccountsPage {
  private accountMeta: any;
  private accountList: any;
  private orderedAccounts: any;
  private accountTypes: any;
  private loader: any;

  constructor(public navCtrl: NavController, private fireflyService : FireflyRemoteProvider, private loadingCtrl: LoadingController) {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    
    this.loader.present();

    this.getAccounts().then( () => {
      this.loader.dismiss();
    });
  }

  getAccounts() {
    return this.fireflyService.getAccounts().then((data) => {
      this.accountList = data["data"];
      this.accountMeta = data["meta"];

      this.accountList.sort((a, b) => parseFloat(b.attributes.current_balance) - parseFloat(a.attributes.current_balance))

      this.orderedAccounts = data["data"].reduce(function (r, a) {
        r[a.attributes.role] = r[a.attributes.role] || [];
        //console.log(moment(a.attributes.next_expected_match).toNow());
        r[a.attributes.role].push(a);
        return r;
      }, Object.create(null));

      this.accountTypes = Object.keys(this.orderedAccounts).sort();

    });
  }

  getSubgroupTotal(role) {
    // ccAsset, sharedAsset, savingAsset, defaultAsset
    var subAccounts = this.accountList.filter(function(a){return a.attributes.role === role});
    var total = 0;

    for(var i = 0; i < subAccounts.length; i++){
      total += parseFloat(subAccounts[i].attributes.current_balance);
    }

    return total;
  }

  doRefresh(refresher){
    this.getAccounts().then( () => {
      refresher.complete();
    });
  }
}
