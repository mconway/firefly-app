import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { FireflyRemoteProvider } from '../../providers/firefly-remote/firefly-remote';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TransactionListModel } from '../../models/transactionlist.model';
import { TransactionModel } from '../../models/transaction.model';
import { AccountListModel } from '../../models/accountlist.model';

@Component({
  selector: 'page-home',
  templateUrl: 'transactions.html'
})

export class TransactionsPage {
  private loader: any;

  constructor(
    public navCtrl: NavController, 
    private transactionList : TransactionListModel,
    private loadingCtrl: LoadingController)
  {

    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });

    this.loader.present();

    this.transactionList.getTransactions().then( () => {
      this.loader.dismiss();
    });
  }

  doRefresh(refresher){
    this.transactionList.getTransactions().then( () => {
      refresher.complete();
    });
  }

  showTransactionDetails(transaction){
    this.navCtrl.push(TransactionDetailPage, { transaction: transaction });
  }
}

@Component({
  templateUrl: 'add.html'
})

export class AddTransactionPage {
  private form : FormGroup;
  private loader: any;

  constructor(
      public platform: Platform, 
      public params: NavParams, 
      public viewCtrl: ViewController, 
      private formBuilder: FormBuilder, 
      private model: TransactionModel,
      private accountList: AccountListModel,
      private toastCtrl: ToastController,
      private loadingCtrl: LoadingController
    )
  {
    this.buildForm();
    this.buildAccountDropDown();

    this.loader = this.loadingCtrl.create({
      content: "Please Wait..."
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.loader.present();

    var formData = this.form.value;

    this.model.loadFromForm(formData);
    this.model.save().then((message) => {
      this.presentToast("Transaction Created Successfully");
      this.loader.dismiss();
      this.dismiss();
    }).catch( err => {
      this.loader.dismiss();
      alert(err.statusText);
    });
  }

  buildAccountDropDown()
  {
    return this.accountList.getAccounts();
  }

  buildForm(){
    this.form = this.formBuilder.group({
      type: ['withdrawal'],
      description: [''],
      source: [''],
      destination: [''],
      amount: [''],
      currency_code: [''],
      date: [ new Date().toISOString().slice(0,10) ]
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "top"
    });
    toast.present();
  }

  changeTransactionType(){
    if(this.form.value.type == "deposit"){
      this.form.controls['destination'].setValue(this.form.value.source);
      this.form.controls['source'].setValue('');
    }else if(this.form.value.type == "withdrawal"){
      this.form.controls['source'].setValue(this.form.value.destination);
      this.form.controls['destination'].setValue('');
    }
  }

  changeCurrencyCode(control){
    var accountId = this.form.value[control];
    var selectedAccount = this.accountList.accounts.filter(function(a){ return parseInt(a.id) === parseInt(accountId) });
    if(selectedAccount[0]){
      this.form.controls['currency_code'].setValue(selectedAccount[0].attributes.currency_code);
    }
  }
}

@Component({
  templateUrl: 'detail.html'
})
export class TransactionDetailPage {
  private transaction;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams)
  {
    this.transaction = navParams.get('transaction');
  }

}