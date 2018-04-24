import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AccountsPage } from '../accounts/accounts';
import { TransactionsPage } from '../transactions/transactions';
import { AccountListModel } from '../../models/accountlist.model';
import { TransactionListModel } from '../../models/transactionlist.model';
import { BillListModel } from '../../models/billlist.model';

import { Network } from '@ionic-native/network';
import { BillDetailPage } from '../bills/bills';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  accountMeta: any;
  recentTransactions: any;
  upcomingBills: any;
  cashTotal = 0;
  creditTotal = 0;
  loader: any;

  constructor(
    public navCtrl: NavController, 
    private transactionList: TransactionListModel,
    private loadingCtrl: LoadingController, 
    private accountList: AccountListModel,
    private billList: BillListModel,
    private network: Network) 
  {
      this.loader = this.loadingCtrl.create({
        content: "Loading..."
      });

      // Disable loader on home screen or you can't get to settings
      //this.loader.present();

      Promise.all([this.getAccounts(), this.getRecentTransactions(), this.getUpcomingBills()]).then( () => {
        this.loader.dismiss();
      });
  }

  getAccounts(refresh: boolean = false) {
    return this.accountList.getAccounts(refresh).then((data) => {
      this.creditTotal = this.accountList.getSubgroupTotal("ccAsset");
      this.cashTotal = this.accountList.getSubgroupTotal("savingAsset") + this.accountList.getSubgroupTotal("defaultAsset");
    });
  }

  getRecentTransactions(refresh: boolean = false){
    return this.transactionList.getTransactions(refresh).then((t) => {
      this.recentTransactions = this.transactionList.transactions.slice(0,5);
    });
  }

  getUpcomingBills(refresh: boolean = false){
    return this.billList.getBills(refresh).then((t) => {
      this.upcomingBills = this.billList.bills.slice(0,5);
    });
  }

  navToAccounts(){
    this.navCtrl.push(AccountsPage);
  }

  navToTransactions(){
    this.navCtrl.push(TransactionsPage);
  }

  doRefresh(refresher){
    Promise.all([this.getAccounts(true), this.getRecentTransactions(true), this.getUpcomingBills(true)]).then( () => {
      refresher.complete();
    }).catch(err => { refresher.complete() });
  }

  showBillDetails(bill){
    this.navCtrl.push(BillDetailPage, { bill: bill });
  }
}
