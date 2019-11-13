import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionGroupModel } from '../../models/transactiongroup.model';
import { TransactionModel } from '../../models/transaction.model';
import { CategoryRepository } from '../../repositories/category.repository';
import { AccountRepository } from '../../repositories/account.repository';
import { PiggybankRepository } from '../../repositories/piggybank.repository';
import { TransactionGroupRepository } from '../../repositories/transactiongroup.repository';

@Component({
  selector: 'page-home',
  templateUrl: 'transactions.html'
})

export class TransactionsPage {
  private loader: any;
  private month: number; 
  private transactionList: TransactionGroupModel[];
  private pendingTransactionsCount: number = 0;

  constructor(
    public navCtrl: NavController, 
    private transactionGroupRepo: TransactionGroupRepository,
    private navParams: NavParams,
    private loadingCtrl: LoadingController)
  {

    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });

    this.loader.present();

    this.month = parseInt(this.navParams.get("month"));

    this.transactionGroupRepo.getAll(this.month, true, false).then( (results) => {
      this.loader.dismiss();
      this.transactionList = results;
      this.pendingTransactionsCount = this.transactionList.filter( t => { return t.isPending }).length;
    });
  }

  doRefresh(refresher){
    this.transactionGroupRepo.getAll(this.month, true, true).then( (results) => {
      this.transactionList = results;
      this.pendingTransactionsCount = this.transactionList.filter( t => { return t.isPending }).length;
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
  private month: number;

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
      //private model: TransactionModel,
      private toastCtrl: ToastController,
      private loadingCtrl: LoadingController,
      private categoryRepo: CategoryRepository,
      private accountRepo: AccountRepository,
      private piggyRepo: PiggybankRepository,
      private transactionGroupRepo: TransactionGroupRepository
    )
  {
    this.buildForm();

    // get away from hardcoding the refresh request into this repo...
    this.categoryRepo.getAll(this.month, true, false).then( d => { this.categories = d; });

    // get expense and revenue accounts
    this.accountRepo.getAll(this.month, true).then( d => { 
      this.expenseAccounts = d.filter(function(a){ return a.type === "Expense account" || a.type == 'expense'});
      this.revenueAccounts = d.filter(function(a){ return a.type === "Revenue account" || a.type == 'revenue'});
      this.assetAccounts = d.filter(function(a){ return a.type === "Asset account" || a.type == 'asset' });
    });

    this.piggyRepo.getAll(this.month, true).then( pb => {
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

  private save() {
    if(this.form.valid){
      this.loader.present();
      var formData = this.form.value;
      var transaction = new TransactionModel(formData);
      var group = new TransactionGroupModel(null);
      group.transactions = [transaction];

      this.transactionGroupRepo.save(group).then((message) => {
        this.presentToast("Transaction Saved Successfully");

        this.loader.dismiss();
        this.dismiss();
      }).catch( err => {
        console.log(err)
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
      source_id: [''],
      destination_id: [''],
      category_id: [],
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
      position: "bottom"
    });
    toast.present();
  }

  getAccountsByType(type: string){
    this.accountRepo.getAll(this.month, true).then( d => { return d.filter(function(a){ return a.type === type })  });
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

  constructor(private navParams: NavParams)
  {
    this.transaction = this.navParams.get('transaction');
  }

}