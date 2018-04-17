import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { BillsPage } from '../pages/bills/bills';
import { AccountsPage } from '../pages/accounts/accounts';
import { SettingsPage } from '../pages/settings/settings';
import { TransactionsPage, AddTransactionPage } from '../pages/transactions/transactions'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FireflyRemoteProvider } from '../providers/firefly-remote/firefly-remote';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { AccountListModel } from '../models/accountlist.model';
import { TransactionListModel } from '../models/transactionlist.model';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    BillsPage,
    AccountsPage,
    TransactionsPage,
    SettingsPage,
    AddTransactionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{ 'serverUrl': 'initial' }),
    IonicStorageModule.forRoot(),
    HttpModule,
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    BillsPage,
    AccountsPage,
    TransactionsPage,
    AddTransactionPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FireflyRemoteProvider,
    AccountListModel,
    TransactionListModel
  ]
})
export class AppModule {}
