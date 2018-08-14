import { Component, ViewChild } from '@angular/core';

import { HomePage } from '../home/home';
import { BillsPage } from '../bills/bills';
import { AddTransactionPage } from '../transactions/transactions'
import { SettingsPage } from '../settings/settings'

import { ModalController, NavController, NavParams, Tabs } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tabBillRoot = BillsPage;
  tabSettingsRoot = SettingsPage;

  selectedIndex: Number;

  @ViewChild('tabNav') tabs: Tabs;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
    this.selectedIndex = this.navParams.data.tabIndex || 0;
  }
}
