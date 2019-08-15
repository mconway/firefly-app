import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, Events } from 'ionic-angular';
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
import { ChartRepository } from '../../repositories/chart.repository';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Chart } from 'chart.js';

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
  month: number = null; 

  @ViewChild('categorySpendChart') categoryChart;
  @ViewChild('budgetSpendChart') budgetChart;

  constructor(
    public navCtrl: NavController, 
    private navParams: NavParams,
    private events: Events,
    private transactionList: TransactionListModel,
    private loadingCtrl: LoadingController, 
    private accountRepo: AccountRepository,
    private billRepo: BillRepository,
    private budgetsRepo: BudgetRepository,
    private budgetLimitsRepo: BudgetLimitRepository,
    private piggybankRepo: PiggybankRepository,
    private chartsRepo: ChartRepository,
    private firefly: FireflyRemoteProvider)
  {
      if(this.navParams.get("month") !== undefined){
        this.month = parseInt(this.navParams.get("month"));
      }else{
        this.events.publish("month:request");
      }

      this.events.subscribe("month:changed", (month) =>{
        if(month !== undefined){
          this.month = parseInt(month);
          this.getAllData(true);
        }
      });

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
      this.getCharts(refresh),
      this.getBudgets(refresh)
    ]

    return Promise.all(dataMethods).then(() => { console.log("refresh complete"); console.log()});
  }

  private getAccounts(refresh: boolean = false) {
    this.accountRepo.getAll(this.month, true, refresh);

    return this.accountRepo.getAll(this.month, true, refresh).then((data) => {
      var accounts = this.accountRepo.groupAccounts("role", data);
      this.creditTotal = this.accountRepo.getSubgroupTotal(["ccAsset"], accounts);
      this.cashTotal = this.accountRepo.getSubgroupTotal(["defaultAsset","savingAsset"],accounts);
    });
  }

  private getBudgets(refresh: boolean = false){
    this.budgetsRepo.getAll(this.month, true, refresh).then(b => {

      var filteredBudgets = b.filter( budget => budget.spent !== undefined).sort((first, second) => { return first.spent - second.spent });

      var budgets = [];

      filteredBudgets.forEach( (budget) => {
          return budgets[budget.name] = budget.spent;
      })

      //var budgetLabels = budgets.map(model => model.name); 
      //var budgetSpent = budgets.map(model => model.spent); 

      var data = Object.keys(budgets).map(key => budgets[key]);
      
      var chart = new Chart(this.budgetChart.nativeElement, {
        type: 'doughnut',
        options: {
          tooltips: {
            enabled: true
          },
          legend: { 
            display: true,
            position: "right",

          }
        },
        data: {
          labels: Object.keys(budgets).slice(0,6), 
          datasets: [{
            data: data.slice(0,6),
            backgroundColor: [
              "red",
              "orange",
              "yellow",
              "green",
              "blue",
              "purple"
            ]
          }],
        }
      });
    });
  }

  private getRecentTransactions(refresh: boolean = false){
    return this.transactionList.getTransactions(refresh).then((t) => {
      this.recentTransactions = this.transactionList.transactions.slice(0,5);
    });
  }

  private getUpcomingBills(refresh: boolean = false){
    return this.billRepo.getAll(this.month, false, refresh).then((bills) => {
      bills.sort(function(a, b){
        return new Date(a.nextExpectedMatch).getTime() - new Date(b.nextExpectedMatch).getTime();
      });

      this.upcomingBills = bills.filter(function(a){return a.active}).slice(0,5);
    });
  }

  private getPiggyBanks(refresh: boolean = false){
    return this.piggybankRepo.getAll(this.month, true, refresh).then((piggyBanks) => {
      this.piggyBanks = piggyBanks;
    });
  }

  private getCharts(refresh: boolean = false){
    return this.chartsRepo.getAll(this.month, false, refresh).then((charts) => {
      var spentChart = charts.filter(c => { return c.label === "firefly.box_spent_in_currency" });

      if(spentChart.length !== 1){
        return false;
      }

      var entries = spentChart[0].entries;

      var data = Object.keys(entries).map(key => entries[key]);

      var chart = new Chart(this.categoryChart.nativeElement, {
        type: 'doughnut',
        options: {
          tooltips: {
            enabled: true
          },
          legend: { 
            display: true,
            position: "right",

          }
        },
        data: {
          labels: Object.keys(entries).slice(0,6), 
          datasets: [{
            data: data.slice(0,6),
            backgroundColor: [
              "red",
              "orange",
              "yellow",
              "green",
              "blue",
              "purple"
            ]
          }],
        }
      });
    });
  }

  private doRefresh(refresher){
    if(this.month === null || this.month === undefined){
      this.events.publish("month:request");
      refresher.complete();
    }else{
      this.getAllData(true).then( () => {
        refresher.complete();
      }).catch(err => { refresher.complete(); console.log(err) });
    }
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
