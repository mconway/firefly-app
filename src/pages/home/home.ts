import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AccountsPage } from '../accounts/accounts';
import { TransactionsPage } from '../transactions/transactions';
import { AccountListModel } from '../../models/accountlist.model';
import { TransactionListModel } from '../../models/transactionlist.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  accountMeta: any;
  recentTransactions: any;
  cashTotal = 0;
  creditTotal = 0;
  loader: any;

  constructor(
    public navCtrl: NavController, 
    private transactionList: TransactionListModel,
    private loadingCtrl: LoadingController, 
    private accountList: AccountListModel) 
  {
      this.loader = this.loadingCtrl.create({
        content: "Loading..."
      });

      // Disable loader on home screen or you can't get to settings
      //this.loader.present();

      Promise.all([this.getAccounts(), this.getRecentTransactions()]).then( () => {
        this.loader.dismiss();
      });
  }

  getAccounts() {
    return this.accountList.getAccounts().then((data) => {
      this.creditTotal = this.accountList.getSubgroupTotal("ccAsset");
      this.cashTotal = this.accountList.getSubgroupTotal("savingAsset") + this.accountList.getSubgroupTotal("defaultAsset");
    });
  }

  getRecentTransactions(){
    return this.transactionList.getTransactions().then((t) => {
      this.recentTransactions = this.transactionList.transactions.slice(0,5);
    });
  }

  navToAccounts(){
    this.navCtrl.push(AccountsPage);
  }

  navToTransactions(){
    this.navCtrl.push(TransactionsPage);
  }

  doRefresh(refresher){
    Promise.all([this.getAccounts(), this.getRecentTransactions()]).then( () => {
      refresher.complete();
    });
  }
}
