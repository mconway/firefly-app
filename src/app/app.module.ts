import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, Menu } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { BillsPage, BillDetailPage } from '../pages/bills/bills';
import { AccountsPage, AccountDetailPage } from '../pages/accounts/accounts';
import { SettingsPage } from '../pages/settings/settings';
import { TransactionsPage, AddTransactionPage, TransactionDetailPage } from '../pages/transactions/transactions'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FireflyRemoteProvider } from '../providers/firefly-remote/firefly-remote';

import { HttpModule, BaseResponseOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { BaseRepository } from '../repositories/base.repository';
import { AccountRepository } from '../repositories/account.repository';
import { BillRepository } from '../repositories/bill.repository';
import { BudgetRepository } from '../repositories/budget.repository';
import { BudgetLimitRepository } from '../repositories/budgetlimit.repository';
import { CategoryRepository } from '../repositories/category.repository';
import { ChartRepository } from '../repositories/chart.repository';
import { PiggybankRepository } from '../repositories/piggybank.repository';

import { Network } from '@ionic-native/network';
import { AppVersion } from '@ionic-native/app-version'
import { MenuPage } from '../pages/menu/menu';
import { PiggyBanksPage, PiggyBankDetailPage } from '../pages/piggybanks/piggybanks';
import { BudgetsPage } from '../pages/budgets/budgets';
import { TransactionGroupRepository } from '../repositories/transactiongroup.repository';
import { AboutPage } from '../pages/about/about';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    MenuPage,
    BillsPage,
    BudgetsPage,
    AccountsPage,
    TransactionsPage,
    SettingsPage,
    AddTransactionPage,
    TransactionDetailPage,
    BillDetailPage,
    AccountDetailPage,
    PiggyBanksPage,
    PiggyBankDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{ 'serverUrl': 'initial' }),
    IonicStorageModule.forRoot(),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    MenuPage,
    BillsPage,
    BudgetsPage,
    AccountsPage,
    TransactionsPage,
    AddTransactionPage,
    SettingsPage,
    BillDetailPage,
    AccountDetailPage,
    TransactionDetailPage,
    PiggyBanksPage,
    PiggyBankDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FireflyRemoteProvider,
    InAppBrowser,
    BaseRepository,
    AccountRepository,
    BillRepository,
    BudgetRepository,
    BudgetLimitRepository,
    CategoryRepository,
    ChartRepository,
    PiggybankRepository,
    TransactionGroupRepository,
    Network,
    AppVersion
  ]
})
export class AppModule {}
