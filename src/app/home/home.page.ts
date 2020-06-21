import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'
import { SettingsPage } from '../settings/settings.page';
import { FireflyService } from '../providers/firefly.service';
import { TransactionsService } from '../providers/transactions.service';

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
    private transactionsService: TransactionsService
  ) {
   }

  ngOnInit() {

    if(this.month === null){
      this.month = new Date().getMonth();
    }

    this.fireflyService.getServerInfo().then(r => {
      this.getRecentTransactions();
    })

    this.cashTotal = [
      { val: { total: 5000, currency_symbol: "$"} },
    ]

    this.creditTotal = [
      { val: { total: 5000, currency_symbol: "$"} },
    ]

    this.upcomingBills = [
      {
        nextExpectedMatch: '2020-07-01',
        name: 'Bill 1',
        paidDates: [
          "2020-06-01"
        ],
        amountMax: 200,
        currencyCode: "$"
      },
      {
        nextExpectedMatch: '2020-07-02',
        name: 'Bill 2',
        paidDates: [
          "2020-06-02"
        ],
        amountMax: 20,
        currencyCode: "$"
      }
    ]
  }

  /*
  Data Population for the various items we need on the home screen
  */
  private getRecentTransactions(refresh: boolean = false){
    return this.transactionsService.getAll(this.month, true, refresh).then((transactions) => {
            this.recentTransactions = transactions.slice(0,5);
    });
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
