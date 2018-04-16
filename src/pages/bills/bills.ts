import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { FireflyRemoteProvider } from '../../providers/firefly-remote/firefly-remote';
import * as moment from 'moment'

@Component({
  selector: 'page-home',
  templateUrl: 'bills.html'
})
export class BillsPage {
  private billMeta: any;
  private billList: any;
  private billDates: any;
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
    var date = new Date();
    var start = new Date(date.setMonth(date.getMonth() - 2)).toISOString().slice(0,10);
    var end = new Date(date.setMonth(date.getMonth() + 4)).toISOString().slice(0,10);
    console.log(start, end)

    return this.fireflyService.getBills(start, end).then((data) => {
        this.billList = data["data"].reduce(function (r, a) {
          r[a.attributes.next_expected_match] = r[a.attributes.next_expected_match] || [];
          //console.log(moment(a.attributes.next_expected_match).toNow());
          r[a.attributes.next_expected_match].push(a);
          return r;
      }, Object.create(null));
      this.billMeta = data["meta"];
      this.billDates = Object.keys(this.billList).sort();
    });
  }

  doRefresh(refresher){
    this.getBills().then( () => {
      refresher.complete();
    });
  }
}

/* bill grouping option 1
var res = bills.reduce(function(res, currentValue) {
    if ( res.indexOf(currentValue.attributes.next_expected_match) === -1 ) {
      res.push(currentValue.attributes.next_expected_match);
    }
    return res;
}, []).map(function(group) {
    return {
        due_date: group,
        bills: bills.filter(function(_el) {
          return _el.attributes.next_expected_match === group;
       }).map(function(_el) { return _el; })
    }
});
======================
    result = bills.reduce(function (r, a) {
        r[a.attributes.next_expected_match] = r[a.attributes.next_expected_match] || [];
        r[a.attributes.next_expected_match].push(a);
        return r;
    }, Object.create(null));
*/