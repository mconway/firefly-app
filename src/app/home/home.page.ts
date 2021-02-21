import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'
import { SettingsPage } from '../settings/settings.page';
import { FireflyService } from '../providers/firefly.service';
import { TransactionsService } from '../providers/transactions.service';
import { AccountsService } from '../providers/accounts.service';
import { BillsService } from '../providers/bills.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  accountMeta: any;
  recentTransactions: any;
  upcomingBills: any;
  cashTotal : any;
  creditTotal : any;
  loader: any;
  piggyBanks: any;
  month: number = null; 

  constructor(
    public navCtrl: NavController,
    private fireflyService: FireflyService,
    private transactionsService: TransactionsService,
    private accountsService: AccountsService,
    private billsService: BillsService
  ) {
   }

  ngOnInit() {

    if(this.month === null){
      this.month = new Date().getMonth();
    }

    this.fireflyService.getServerInfo().then(r => {
      this.getAllData(false);
    })

  }

  /*
  Data Population for the various items we need on the home screen
  */

  private getAccounts(refresh: boolean = false) {
    this.accountsService.getAll(this.month, true, refresh);

    return this.accountsService.getAll(this.month, true, refresh).then((data) => {
      var accounts = this.accountsService.groupAccounts("role", data);
      this.creditTotal = this.accountsService.getSubgroupTotal(["ccAsset"], accounts);
      this.cashTotal = this.accountsService.getSubgroupTotal(["defaultAsset","savingAsset"],accounts);
    });
  }

  private getRecentTransactions(refresh: boolean = false){
    return this.transactionsService.getAll(this.month, true, refresh).then((transactions) => {
      this.recentTransactions = transactions.slice(0,5);
    });
  }

  private getUpcomingBills(refresh: boolean = false){
    return this.billsService.getAll(this.month, false, refresh).then((bills) => {
      bills.sort(function(a, b){
        return new Date(a.nextExpectedMatch).getTime() - new Date(b.nextExpectedMatch).getTime();
      });

      this.upcomingBills = bills.filter(function(a){return a.active}).slice(0,5);
    });
  }

  private doRefresh(event){
    if(this.month === null || this.month === undefined){
      //this.events.publish("month:request");
      event.target.complete();
    }else{
      this.getAllData(true).then( () => {
        event.target.complete();
      }).catch(err => { event.target.complete(); console.log(err) });
    }
  }

  private getAllData(refresh: boolean = false){
      var dataMethods = [
        this.getAccounts(refresh),
        this.getRecentTransactions(refresh),
        this.getUpcomingBills(refresh),
        //this.getPiggyBanks(refresh),
        //this.getCharts(refresh),
        //this.getBudgets(refresh),
        //this.getCategories(refresh)
      ]

      return Promise.all(dataMethods).then(() => { console.log("refresh complete : " + refresh);});
  }

  /*
  Navigation Methods
  */

  navToAccounts(){
    //this.navCtrl.navigateForward(SettingsPage);
    console.log("Navigate to Accounts")
  }

  navToTransactions(){
    //this.navCtrl.navigateForward(TransactionsPage);
    console.log("Navigate to Transactions")
  }  

  addTransaction(){
    //this.navCtrl.navigateForward(AddTransactionPage);
  }

  showBillDetails(bill){
    //this.navCtrl.navigateForward(BillDetailPage, { bill: bill });
  }

  showTransactionDetails(transaction){
    //this.navCtrl.navigateForward(TransactionDetailPage, { transaction: transaction });
  }

  tapEvent(e){
    //this.navCtrl.navigateForward(AddTransactionPage);
  }

}
