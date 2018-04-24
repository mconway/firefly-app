import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { FireflyRemoteProvider } from '../../providers/firefly-remote/firefly-remote';
import * as moment from 'moment'
import { BillListModel } from '../../models/billlist.model';

@Component({
  selector: 'page-home',
  templateUrl: 'bills.html'
})
export class BillsPage {
  private loader: any;

  constructor(
    public navCtrl: NavController, 
    private billList: BillListModel, 
    private loadingCtrl: LoadingController) 
  {
    
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });

    this.loader.present();

    this.billList.getBills().then( () => {
      this.loader.dismiss();
    });

  }

  doRefresh(refresher){
    this.billList.getBills(true).then( () => {
      refresher.complete();
    });
  }

  showBillDetails(bill){
    this.navCtrl.push(BillDetailPage, { bill: bill });
  }
}

@Component({
  templateUrl: 'billDetail.html'
})
export class BillDetailPage {
  private bill;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams)
  {
    this.bill = navParams.get('bill');
  }

}