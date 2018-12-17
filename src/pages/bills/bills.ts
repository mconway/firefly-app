import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { BillRepository } from '../../repositories/bill.repository';

@Component({
  selector: 'page-home',
  templateUrl: 'bills.html'
})
export class BillsPage {
  private loader: any;
  private groupedBills: any;
  private dueDates: any;
  private month: number;

  constructor(
    public navCtrl: NavController, 
    private billRepo: BillRepository, 
    private loadingCtrl: LoadingController) 
  {
    
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });

    this.loader.present();

    this.billRepo.getAll(this.month, true, false).then( (d) => {
      this.initiateBills(d);
      this.loader.dismiss();
    });

  }

  initiateBills(data){
    data.sort(function(a, b){
      return a.nextExpectedMatch - b.nextExpectedMatch;
    });
    this.groupedBills = this.groupBills("nextExpectedMatch", data);
    this.dueDates = Object.keys(this.groupedBills);
  }

  groupBills(group: string, bills: any){
      return bills.reduce(function (r, a) {
          r[a[group]] = r[a[group]] || [];
          r[a[group]].push(a);
          return r;
      }, Object.create(null));
  }

  doRefresh(refresher){
    this.billRepo.getAll(this.month, true, true).then( (d) => {
      this.initiateBills(d);
      refresher.complete();
    });
  }

  showBillDetails(bill){
    this.navCtrl.push(BillDetailPage, { bill: bill });
  }
}

@Component({
  templateUrl: 'detail.html'
})
export class BillDetailPage {
  private bill;

  constructor(private navParams: NavParams)
  {
    this.bill = this.navParams.get('bill');
  }
}