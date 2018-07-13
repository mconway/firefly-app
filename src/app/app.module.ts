import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
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
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser'
import { AccountListModel } from '../models/accountlist.model';
import { TransactionListModel } from '../models/transactionlist.model';
import { BillListModel } from '../models/billlist.model';
import { TransactionModel } from '../models/transaction.model';
import { TransactionItemModel } from '../models/transactionItem.model';
import { CategoryModel } from '../models/category.model';

import { BaseRepository } from '../repositories/base.repository';
import { CategoryRepository } from '../repositories/category.repository';

import { Network } from '@ionic-native/network';
import { AppVersion } from '@ionic-native/app-version'

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    BillsPage,
    AccountsPage,
    TransactionsPage,
    SettingsPage,
    AddTransactionPage,
    TransactionDetailPage,
    BillDetailPage,
    AccountDetailPage
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
    ContactPage,
    HomePage,
    TabsPage,
    BillsPage,
    AccountsPage,
    TransactionsPage,
    AddTransactionPage,
    SettingsPage,
    BillDetailPage,
    AccountDetailPage,
    TransactionDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FireflyRemoteProvider,
    InAppBrowser,
    AccountListModel,
    TransactionListModel,
    BillListModel,
    TransactionModel,
    CategoryModel,
    BaseRepository,
    CategoryRepository,
    Network,
    AppVersion
  ]
})
export class AppModule {}
