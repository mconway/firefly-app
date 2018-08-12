import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { FireflyRemoteProvider } from '../../providers/firefly-remote/firefly-remote';
import { AccountRepository } from '../../repositories/account.repository';
import { AccountModel } from '../../models/account.model';

@Component({
  selector: 'page-home',
  templateUrl: 'accounts.html'
})
export class AccountsPage {
  private loader: any;
  private accounts: AccountModel[] = [];
  private accountTypes: any = [];

  constructor(
    public navCtrl: NavController, 
    private fireflyService : FireflyRemoteProvider, 
    private loadingCtrl: LoadingController, 
    private accountRepo: AccountRepository) 
  {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    
    this.loader.present();

    this.accountRepo.getAll(true, false).then( (accounts) => {
      var accountTypes = ["ccAsset", "defaultAsset", "sharedAsset", "savingAsset"];
      accounts = accounts.filter(function(a) { return a.role !== null && accountTypes.indexOf(a.role) !== -1 });
      this.accounts = this.accountRepo.groupAccounts("role", accounts);
      this.accountTypes = Object.keys(this.accounts);
      this.loader.dismiss();
    });
  }

  doRefresh(refresher){
    this.accountRepo.getAll(true, true).then( (accounts) => {
      this.accounts = this.accountRepo.groupAccounts("role", accounts);
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