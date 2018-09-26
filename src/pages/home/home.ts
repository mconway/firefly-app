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

      // Disable loader on home screen or you can't get to settings
      //this.loader.present();

      this.firefly.getServerInfo().then(data => {
        
      }, err => {
        if(err == "NotConfigured"){
          this.navCtrl.push(SettingsPage);
        }
      });

      Promise.all([this.getAccounts(), this.getRecentTransactions(), this.getUpcomingBills(), this.getPiggyBanks(), this.budgetsRepo.getAll(), this.budgetLimitsRepo.getAll()]).then( () => {
        this.loader.dismiss();
      });
  }

  getAccounts(refresh: boolean = false) {
    // beginning of refactor out of accountList.
    this.accountRepo.getAll(true, refresh);

    // this will get replaced with the account repo.
    return this.accountRepo.getAll(true, refresh).then((data) => {
      var accounts = this.accountRepo.groupAccounts("role", data);
      this.creditTotal = this.accountRepo.getSubgroupTotal(["ccAsset"], accounts);
      this.cashTotal = this.accountRepo.getSubgroupTotal(["defaultAsset","savingAsset"],accounts);
    });
  }

  getRecentTransactions(refresh: boolean = false){
    return this.transactionList.getTransactions(refresh).then((t) => {
      this.recentTransactions = this.transactionList.transactions.slice(0,5);
    });
  }

  getUpcomingBills(refresh: boolean = false){
    return this.billRepo.getAll(false, refresh).then((bills) => {
      bills.sort(function(a, b){
        return a.nextExpectedMatch.getTime() - b.nextExpectedMatch.getTime();
      });

      this.upcomingBills = bills.filter(function(a){return a.active}).slice(0,5);
    });
  }

  getPiggyBanks(refresh: boolean = false){
    return this.piggybankRepo.getAll(true, refresh).then((piggyBanks) => {
      this.piggyBanks = piggyBanks;
    });
  }

  navToAccounts(){
    this.navCtrl.push(AccountsPage);
  }

  navToTransactions(){
    this.navCtrl.push(TransactionsPage);
  }  

  addTransaction(){
    this.navCtrl.push(AddTransactionPage);
  }
  
  doRefresh(refresher){
    Promise.all([this.getAccounts(true), this.getRecentTransactions(true), this.getUpcomingBills(true), this.getPiggyBanks(true), this.budgetsRepo.getAll(true, true), this.budgetLimitsRepo.getAll(true, true)]).then( () => {
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
