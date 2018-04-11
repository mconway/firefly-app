import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FireflyRemoteProvider } from '../../providers/firefly-remote/firefly-remote';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'transactions.html'
})

export class TransactionsPage {
  billMeta: any;
  billList: any;

  constructor(public navCtrl: NavController, private fireflyService : FireflyRemoteProvider) {
    this.getBills();
  }

  getBills() {
    this.fireflyService.getBills().then((data) => {
      this.billList = data["data"];
      this.billMeta = data["meta"];

      console.log(this.billList.data)

      //this.getAccountSummaries();
    });
  }
}

@Component({
  templateUrl: 'add.html'
})

export class AddTransactionPage {
  private form : FormGroup;
  accountList: any;

  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, private formBuilder: FormBuilder, private fireflyService: FireflyRemoteProvider ){
    this.buildForm();
    this.buildAccountDropDown();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save() {
    console.log(this.form.value);

    var formData = this.form.value;

    var data = {
      type: 'withdrawal',
      description: formData.description,
      date: formData.date,
      transactions: [
        {
          amount: formData.amount,
          source_id: formData.source,
          destination_id: '',
          currency_code: 'USD'
        }
      ]
    }

    console.log(JSON.stringify(data));

    this.fireflyService.postTransaction(data);
  }

  buildAccountDropDown()
  {
    this.fireflyService.getAccounts().then( (data) => {
      this.accountList = data["data"];
    });
  }

  buildForm(){
    this.form = this.formBuilder.group({
      description: [''],
      source: [''],
      amount: [''],
      date: ['']
    });
  }
}
