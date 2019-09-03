import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
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
  private month: number;

  constructor(
    public navCtrl: NavController, 
    private loadingCtrl: LoadingController, 
    private accountRepo: AccountRepository) 
  {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    
    this.loader.present();

    this.getAccounts();
  }

  getAccounts(){
    return this.accountRepo.getAll(this.month, true, false).then( (accounts) => {
      var accountTypes = ["Asset account", "Loan", "Mortgage", "Debt", "asset", "liabilities"];
      var accountRoles = ["ccAsset", "defaultAsset", "sharedAsset", "savingAsset"];

      accounts = accounts.filter(function(a) { 
        var result = a.type !== null && ( (a.type === accountTypes[0] && a.role !== null && accountRoles.indexOf(a.role) !== -1) || accountTypes.indexOf(a.type) !== -1);
        return result;
      });
      
      this.accounts = this.accountRepo.groupAccounts("role", accounts);
      this.accountTypes = Object.keys(this.accounts);
      this.loader.dismiss();
    });
  }

  doRefresh(refresher){
    this.getAccounts().then(() => {
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

  constructor(private navParams: NavParams)
  {
    this.account = this.navParams.get('account');
  }
}