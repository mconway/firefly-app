import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { BillsPage } from '../bills/bills';
import { AddTransactionPage } from '../transactions/transactions'
import { SettingsPage } from '../settings/settings'

import { ModalController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tabBillRoot = BillsPage;
  tab2Root = AboutPage;
  tabSettingsRoot = SettingsPage;

  constructor(public modalCtrl: ModalController) {

  }

  tapEvent(e){
    let modal = this.modalCtrl.create(AddTransactionPage);
    modal.present();
  }

  openSettings(e){
    let modal = this.modalCtrl.create(SettingsPage);
    modal.present();
  }
}
