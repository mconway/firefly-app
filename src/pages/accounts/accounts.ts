import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
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
}
