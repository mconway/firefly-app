import { Component, ViewChild, ViewChildren } from '@angular/core';
import { NavController, LoadingController, NavParams, ToastController } from 'ionic-angular';
import { PiggybankModel } from '../../models/piggybank.model';
import { PiggybankRepository } from '../../repositories/piggybank.repository';
import { Chart } from 'chart.js';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ChangeDetectorStatus } from '@angular/core/src/change_detection/constants';

@Component({
  selector: 'page-home',
  templateUrl: 'piggybanks.html'
})
export class PiggyBanksPage {
  private loader: any;
  private piggyBanks: PiggybankModel[] = [];

  @ViewChildren('progressChart') progressCharts;

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

  // Charts
  ionViewDidLoad(){
    this.progressCharts.forEach(element => {
      var piggy: PiggybankModel = this.piggyBanks.filter(p => p.id === element.nativeElement.id.replace("p",""))[0];
      var chart = new Chart(element.nativeElement, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [piggy.percentage, 100 - piggy.percentage],
            backgroundColor: [
              "#00FF00"
            ]
          }],
        }
      });
    });
  }
}

@Component({
  templateUrl: 'detail.html'
})
export class PiggyBankDetailPage {
  private piggy;
  private chart: any;
  private editMode = false;
  private form : FormGroup;
  @ViewChild('progressChart') progressChart;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams, 
    private formBuilder: FormBuilder, 
    private piggyBankRepo: PiggybankRepository,
    private toastCtrl: ToastController)
  {
    this.piggy = this.navParams.get('piggy');
    this.buildForm();
  }

  edit(piggy: PiggybankModel){
    this.editMode = true;
  }

  exitEdit(){
    this.editMode = false;
  }

  save(){
    if(this.form.valid){
      this.piggy.name = this.form.value['name'];
      this.piggy.targetAmount = this.form.value['targetAmount'];
      this.piggy.targetDate = this.form.value['targetDate'];
      
      this.piggyBankRepo.update(this.piggy).then(r => {
        this.piggy.hydrate(r['data']);
        this.chart.data.datasets[0].data = [this.piggy.percentage, 100 - this.piggy.percentage];
        this.chart.update();
        this.presentToast("Piggy Bank changes saved successfully");
      }, err => { 
        this.presentToast(err.message);
        console.log(err);
      });

    }

    this.exitEdit();
  }

  buildForm(){
    this.form = this.formBuilder.group({
      name: [this.piggy.name, Validators.required],
      targetAmount: [this.piggy.targetAmount, Validators.required],
      targetDate: [this.piggy.targetDate, Validators.required]
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "bottom"
    });
    toast.present();
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