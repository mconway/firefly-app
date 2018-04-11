import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FireflyRemoteProvider } from '../../providers/firefly-remote/firefly-remote';

@Component({
  selector: 'page-home',
  templateUrl: 'bills.html'
})
export class BillsPage {
  billMeta: any;
  billList: any;

  constructor(public navCtrl: NavController, private fireflyService : FireflyRemoteProvider) {
    this.getBills();
  }

  getBills() {
    this.fireflyService.getBills().then((data) => {
      this.billList = data["data"];
      this.billMeta = data["meta"];
    });
  }
}
