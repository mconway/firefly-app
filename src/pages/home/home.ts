import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AccountsPage } from '../accounts/accounts';
import { TransactionsPage, TransactionDetailPage } from '../transactions/transactions';
import { AccountListModel } from '../../models/accountlist.model';
import { TransactionListModel } from '../../models/transactionlist.model';
import { BillListModel } from '../../models/billlist.model';

import { BillDetailPage } from '../bills/bills';
import { FireflyRemoteProvider } from '../../providers/firefly-remote/firefly-remote';

//testing
import { CategoryRepository } from '../../repositories/category.repository';

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
    private firefly: FireflyRemoteProvider,
    private repo: CategoryRepository)
  {
      this.loader = this.loadingCtrl.create({
        content: "Loading..."
      });

      // Disable loader on home screen or you can't get to settings
      //this.loader.present();

      this.firefly.getServerInfo().then(data => {

      });

      Promise.all([this.getAccounts(), this.getRecentTransactions(), this.getUpcomingBills()]).then( () => {
        console.log(this.creditTotal, this.cashTotal)
        this.loader.dismiss();
      });
  }

  getAccounts(refresh: boolean = false) {
    return this.accountList.getAccounts(refresh).then((data) => {
      this.creditTotal = this.accountList.getSubgroupTotal("ccAsset")[0].total;
      this.cashTotal = this.accountList.getSubgroupTotal("savingAsset")[0].total + this.accountList.getSubgroupTotal("defaultAsset")[0].total;
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

            //testing
            this.repo.getAll().then(d => {
              console.log(d);
            })
            

      refresher.complete();
    }).catch(err => { refresher.complete() });
  }

  showBillDetails(bill){
    this.navCtrl.push(BillDetailPage, { bill: bill });
  }

  showTransactionDetails(transaction){
    this.navCtrl.push(TransactionDetailPage, { transaction: transaction });
  }
}
