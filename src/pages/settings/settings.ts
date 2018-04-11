import { Component } from '@angular/core';
import { NavController, Config } from 'ionic-angular';
import { FireflyRemoteProvider } from '../../providers/firefly-remote/firefly-remote';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';

import { Storage } from '@ionic/storage';import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'settings.html'
})

export class SettingsPage {
  private form : FormGroup;

  constructor(public navCtrl: NavController, private fireflyService : FireflyRemoteProvider, private storage: Storage, public viewCtrl: ViewController, private formBuilder: FormBuilder, private config: Config) {
    this.buildForm();
    this.form.get('serverUrl').setValue(config.get('serverUrl'));
    this.form.get('pat').setValue(config.get('pat')); 
  }

  save() {
    console.log(this.form.value);
    this.config.set('serverUrl',this.form.value.serverUrl);
    this.config.set('pat',this.form.value.pat);

    this.storage.set('serverUrl',this.form.value.serverUrl);
    this.storage.set('pat', this.form.value.pat)

    console.log(this.config.get('serverUrl'));
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  buildForm(){
    this.form = this.formBuilder.group({
      serverUrl: [''],
      pat: ['']
    });
  }
}
