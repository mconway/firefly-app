import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AccountsPage } from '../accounts/accounts';
import { TransactionsPage, TransactionDetailPage, AddTransactionPage } from '../transactions/transactions';
import { TransactionListModel } from '../../models/transactionlist.model';

import { BillDetailPage } from '../bills/bills';
import { FireflyRemoteProvider } from '../../providers/firefly-remote/firefly-remote';
import { AccountRepository } from '../../repositories/account.repository';
import { BillRepository } from '../../repositories/bill.repository';
import { PiggybankRepository } from '../../repositories/piggybank.repository';
import { SettingsPage } from '../settings/settings';
import { BudgetRepository } from '../../repositories/budget.repository';
import { BudgetLimitRepository } from '../../repositories/budgetlimit.repository';

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
  piggyBanks: any;

  constructor(
    public navCtrl: NavController, 
    private transactionList: TransactionListModel,
    private loadingCtrl: LoadingController, 
    private accountRepo: AccountRepository,
    private billRepo: BillRepository,
    private budgetsRepo: BudgetRepository,
    private budgetLimitsRepo: BudgetLimitRepository,
    private piggybankRepo: PiggybankRepository,
    private firefly: FireflyRemoteProvider)
  {
      this.loader = this.loadingCtrl.create({
        content: "Loading..."
      });

      // Loader isn't going away for some people
      // this.loader.present();

      this.firefly.getServerInfo().then(data => {
        this.getAllData().then( () => {
          this.loader.dismiss();
        });
      }, err => {
        this.loader.dismiss();

        // not configured error coming from provider
        if(err == "NotConfigured"){
          this.navCtrl.push(SettingsPage);
        }
      });
  }

  private getAllData(refresh:boolean = false){
    var dataMethods = [
      this.getAccounts(refresh),
      this.getRecentTransactions(refresh),
      this.getUpcomingBills(refresh),
      this.getPiggyBanks(refresh),
      this.budgetsRepo.getAll(true, refresh),
      this.budgetLimitsRepo.getAll(true, refresh)
    ]

    return Promise.all(dataMethods);
  }

  private getAccounts(refresh: boolean = false) {
    this.accountRepo.getAll(true, refresh);

    return this.accountRepo.getAll(true, refresh).then((data) => {
      var accounts = this.accountRepo.groupAccounts("role", data);
      this.creditTotal = this.accountRepo.getSubgroupTotal(["ccAsset"], accounts);
      this.cashTotal = this.accountRepo.getSubgroupTotal(["defaultAsset","savingAsset"],accounts);
    });
  }

  private getRecentTransactions(refresh: boolean = false){
    return this.transactionList.getTransactions(refresh).then((t) => {
      this.recentTransactions = this.transactionList.transactions.slice(0,5);
    });
  }

  private getUpcomingBills(refresh: boolean = false){
    return this.billRepo.getAll(false, refresh).then((bills) => {
      bills.sort(function(a, b){
        return a.nextExpectedMatch.getTime() - b.nextExpectedMatch.getTime();
      });

      this.upcomingBills = bills.filter(function(a){return a.active}).slice(0,5);
    });
  }

  private getPiggyBanks(refresh: boolean = false){
    return this.piggybankRepo.getAll(true, refresh).then((piggyBanks) => {
      this.piggyBanks = piggyBanks;
    });
  }

  private doRefresh(refresher){
    this.getAllData(true).then( () => {
      refresher.complete();
    }).catch(err => { refresher.complete() });
  }

  // navigation methods

  navToAccounts(){
    this.navCtrl.push(AccountsPage);
  }

  navToTransactions(){
    this.navCtrl.push(TransactionsPage);
  }  

  addTransaction(){
    this.navCtrl.push(AddTransactionPage);
  }

  showBillDetails(bill){
    this.navCtrl.push(BillDetailPage, { bill: bill });
  }

  showTransactionDetails(transaction){
    this.navCtrl.push(TransactionDetailPage, { transaction: transaction });
  }

  
  tapEvent(e){
    this.navCtrl.push(AddTransactionPage);
  }
}
