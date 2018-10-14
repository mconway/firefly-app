import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, Tabs } from 'ionic-angular';
import { HomePage } from '../home/home';
import { BillsPage } from '../bills/bills';
import { BudgetsPage } from '../budgets/budgets';
import { TransactionsPage, AddTransactionPage } from '../transactions/transactions';
import { SettingsPage } from '../settings/settings';
import { AccountsPage } from '../accounts/accounts';
import { PiggyBanksPage } from '../piggybanks/piggybanks';

@Component({
    selector: 'page-home',
    templateUrl: 'menu.html'
  })
  
export class MenuPage{
    rootPage = HomePage;

    @ViewChild('content') content: NavController;

    pages = [
        { title: 'Overview', component: HomePage, icon: "home", index: 1 },
        { title: 'Accounts', component: AccountsPage, icon: "card", index: 0 },
        { title: 'Budgets', component: BudgetsPage, icon: "options", index: 0 },
        { title: 'Bills', component: BillsPage, icon: "calendar", index: 2 },
        { title: 'Piggy Banks', component: PiggyBanksPage, icon: "list", index: 2 },
        { title: 'Transactions', component: TransactionsPage, icon: "refresh", index: 0 },
        { title: 'Settings', component: SettingsPage, icon: "settings", index: 3 },
    ];

    constructor(public navCtrl: NavController) { }

    openPage(page){
        this.content.setRoot(page.component, {selectedIndex: page.index});
    }
}