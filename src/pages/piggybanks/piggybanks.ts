import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { PiggybankModel } from '../../models/piggybank.model';
import { PiggybankRepository } from '../../repositories/piggybank.repository';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'piggybanks.html'
})
export class PiggyBanksPage {
  private loader: any;
  private piggyBanks: PiggybankModel[] = [];

  constructor(
    public navCtrl: NavController, 
    private loadingCtrl: LoadingController, 
    private piggyRepo: PiggybankRepository) 
  {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    
    this.loader.present();

    this.piggyRepo.getAll(true, false).then( (piggyBanks) => {
      this.piggyBanks = piggyBanks;
      this.loader.dismiss();
    });
  }

  doRefresh(refresher){
    this.piggyRepo.getAll(true, true).then( (piggyBanks) => {
      refresher.complete();
    });
  }

  showDetails(piggy){
    this.navCtrl.push(PiggyBankDetailPage, { piggy: piggy });
  }
}

@Component({
    templateUrl: 'detail.html'
  })
  export class PiggyBankDetailPage {
    private piggy;
    private chart: any;
    @ViewChild('progressChart') progressChart;
  
    constructor(private navParams: NavParams)
    {
      this.piggy = this.navParams.get('piggy');
    }

    ionViewDidLoad(){
      this.chart = new Chart(this.progressChart.nativeElement, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [this.piggy.percentage, 100 - this.piggy.percentage],
            backgroundColor: [
              "#00FF00"
            ]
          }],
          
        }
      });
    }
  }