import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { AccountsPage } from '../accounts/accounts';
import { BillsPage } from '../bills/bills';
import { AddTransactionPage } from '../transactions/transactions'
import { SettingsPage } from '../settings/settings'

import { ModalController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tabAccountRoot = AccountsPage;
  tabBillRoot = BillsPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
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
