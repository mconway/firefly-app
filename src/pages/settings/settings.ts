import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { FireflyRemoteProvider } from '../../providers/firefly-remote/firefly-remote';
import { ViewController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'settings.html'
})

export class SettingsPage {
  private form : FormGroup;
  private serverInfo: any = { version: "Disconnected" };

  constructor(
    public navCtrl: NavController, 
    private fireflyService : FireflyRemoteProvider, 
    private storage: Storage, 
    public viewCtrl: ViewController, 
    private formBuilder: FormBuilder, 
    private loadingCtrl: LoadingController) 
  {
    this.buildForm();

    this.storage.get('settings').then( s => {
      var settings = {};

      if(s)
        settings = JSON.parse(s);

      this.form.get('serverUrl').setValue(settings["serverUrl"]);
      this.form.get('pat').setValue(settings["pat"]); 
      this.getServerInfo();
    });

  }

  save() { 
    this.storage.set('settings', JSON.stringify(this.form.value));
    this.getServerInfo();
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

  getServerInfo(){
      let loading = this.loadingCtrl.create({ content: "Loading..." });

      this.fireflyService.getServerInfo().then(data => {
        this.serverInfo = data["data"];
        loading.dismiss();
      });
  }
}
