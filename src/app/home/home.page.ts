import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'
import { SettingsPage } from '../settings/settings.page';

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
  ) {
   }

  ngOnInit() {
    this.recentTransactions = [
      {
        date: "2020-06-01",
        description: "Lorem ipsum",
        amount: 5,
        transactions: [
          {
            category_name: "test category",
            currency_symbol: "$",
          }
        ]
      },
      {
        date: "2020-05-31",
        description: "Lorem ipsum",
        amount: 50,
        transactions: [
          {
            category_name: "bacon",
            currency_symbol: "$",
          }
        ]
      }
    ]

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

  // navigation methods

  navToAccounts(){
    //this.navCtrl.navigateForward(SettingsPage);
    console.log("Navigate to Accounts")
  }

  navToTransactions(){
    //this.navCtrl.navigateForward(TransactionsPage);
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
