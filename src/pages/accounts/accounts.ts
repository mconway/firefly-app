import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { FireflyRemoteProvider } from '../../providers/firefly-remote/firefly-remote';
import { AccountListModel } from '../../models/accountlist.model';

@Component({
  selector: 'page-home',
  templateUrl: 'accounts.html'
})
export class AccountsPage {
  private loader: any;

  constructor(public navCtrl: NavController, private fireflyService : FireflyRemoteProvider, private loadingCtrl: LoadingController, private accountList: AccountListModel) {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    
    this.loader.present();

    this.accountList.getAccounts().then( () => {
      this.loader.dismiss();
    });
  }

  doRefresh(refresher){
    this.accountList.getAccounts(true).then( () => {
      refresher.complete();
    });
  }

  showAccountDetails(account){
    this.navCtrl.push(AccountDetailPage, { account: account });
  }
}

@Component({
  templateUrl: 'detail.html'
})
export class AccountDetailPage {
  private account;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams)
  {
    this.account = navParams.get('account');
  }

}