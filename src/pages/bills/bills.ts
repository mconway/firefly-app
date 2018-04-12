import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { FireflyRemoteProvider } from '../../providers/firefly-remote/firefly-remote';

@Component({
  selector: 'page-home',
  templateUrl: 'bills.html'
})
export class BillsPage {
  private billMeta: any;
  private billList: any;
  private loader: any;

  constructor(public navCtrl: NavController, private fireflyService : FireflyRemoteProvider, private loadingCtrl: LoadingController) {
    
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });

    this.getBills().then( () => {
      this.loader.dismiss();
    });

  }

  getBills() {
    return this.fireflyService.getBills().then((data) => {
      this.billList = data["data"];
      this.billMeta = data["meta"];
    });
  }

  doRefresh(refresher){
    this.getBills().then( () => {
      refresher.complete();
    });
  }
}
