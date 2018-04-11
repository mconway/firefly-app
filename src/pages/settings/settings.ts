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

    this.storage.get('settings').then( s => {
      var settings = {};

      if(s)
        settings = JSON.parse(s);

      this.form.get('serverUrl').setValue(settings["serverUrl"]);
      this.form.get('pat').setValue(settings["pat"]); 
    });

  }

  save() { 
    this.storage.set('settings', JSON.stringify(this.form.value));
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
