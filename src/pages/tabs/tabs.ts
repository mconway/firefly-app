import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { BillsPage } from '../bills/bills';
import { AddTransactionPage } from '../transactions/transactions'
import { SettingsPage } from '../settings/settings'

import { ModalController, NavController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tabBillRoot = BillsPage;
  tabSettingsRoot = SettingsPage;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController) {

  }

  tapEvent(e){
    this.navCtrl.push(AddTransactionPage);
    //let modal = this.modalCtrl.create(AddTransactionPage);
    //modal.present();
  }

  openSettings(e){
    let modal = this.modalCtrl.create(SettingsPage);
    modal.present();
  }
}
