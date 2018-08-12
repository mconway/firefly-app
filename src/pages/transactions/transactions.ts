import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionListModel } from '../../models/transactionlist.model';
import { TransactionModel } from '../../models/transaction.model';
import { CategoryRepository } from '../../repositories/category.repository';
import { AccountRepository } from '../../repositories/account.repository';
import { PiggybankRepository } from '../../repositories/piggybank.repository';

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
  private categories: any;

  // shortcut
  private expenseAccounts: any = [];
  private revenueAccounts: any = [];
  private assetAccounts:   any = [];
  private piggyBanks: any = [];

  constructor(
      public navCtrl: NavController,
      public platform: Platform, 
      public params: NavParams, 
      public viewCtrl: ViewController, 
      private formBuilder: FormBuilder, 
      private model: TransactionModel,
      private toastCtrl: ToastController,
      private loadingCtrl: LoadingController,
      private categoryRepo: CategoryRepository,
      private accountRepo: AccountRepository,
      private piggyRepo: PiggybankRepository
    )
  {
    this.buildForm();

    // get away from hardcoding the refresh request into this repo...
    this.categoryRepo.getAll(true, true).then( d => { this.categories = d; });

    // get expense and revenue accounts
    this.accountRepo.getAll(true).then( d => { 
      this.expenseAccounts = d.filter(function(a){ return a.type === "Expense account" });
      this.revenueAccounts = d.filter(function(a){ return a.type === "Revenue account" });
      this.assetAccounts = d.filter(function(a){ return a.type === "Asset account" });
    });

    this.piggyRepo.getAll(true).then( pb => {
      this.piggyBanks = pb;
    });

    this.loader = this.loadingCtrl.create({
      content: "Please Wait..."
    });
  }

  dismiss() {
    //this.viewCtrl.dismiss();
    this.navCtrl.pop();
  }

  save() {

    if(this.form.valid){
      this.loader.present();
      var formData = this.form.value;
      this.model.loadFromForm(formData);
      this.model.save().then((message) => {
        this.presentToast("Transaction Created Successfully");
        this.loader.dismiss();
        this.dismiss();
      }).catch( err => {
        this.loader.dismiss();
        this.presentToast(err.statusText);
      });
    }else{
      this.presentToast("Please fill out all required fields and try again.");
    }

  }

  buildForm(){
    this.form = this.formBuilder.group({
      type: ['withdrawal', Validators.required],
      description: ['', Validators.required],
      source: [''],
      destination: [''],
      category_id: ['', Validators.required],
      amount: ['', Validators.required],
      currency_code: ['', Validators.required],
      piggy_bank_id: [''],
      date: [ new Date().toISOString().slice(0,10), Validators.required ]
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

  getAccountsByType(type: string){
    this.accountRepo.getAll(true).then( d => { return d.filter(function(a){ return a.type === type })  });
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
    var selectedAccount = this.assetAccounts.filter(function(a){ return parseInt(a.id) === parseInt(accountId) });
    if(selectedAccount[0]){
      this.form.controls['currency_code'].setValue(selectedAccount[0].currencyCode);
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