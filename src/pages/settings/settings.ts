import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { FireflyRemoteProvider } from '../../providers/firefly-remote/firefly-remote';
import { ViewController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InAppBrowser } from '@ionic-native/in-app-browser';

declare var window: any;

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
    private loadingCtrl: LoadingController,
    private iab: InAppBrowser) 
  {
    this.buildForm();

    this.storage.get('settings').then( s => {
      var settings = {};

      if(s)
        settings = JSON.parse(s);

      this.form.get('serverUrl').setValue(settings["serverUrl"]);
      this.form.get('pat').setValue(settings["pat"]); 
      this.form.get('client_id').setValue(settings["client_id"]); 
      this.form.get('client_secret').setValue(settings["client_secret"]); 
      this.getServerInfo();
    });

  }

  save() { 
    this.storage.set('settings', JSON.stringify(this.form.value));
    this.getServerInfo();
    this.getOauthToken();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  buildForm(){
    this.form = this.formBuilder.group({
      serverUrl: [''],
      pat: [''],
      client_id: [''],
      client_secret: ['']
    });
  }

  getServerInfo(){
      let loading = this.loadingCtrl.create({ content: "Loading..." });

      this.fireflyService.getServerInfo().then(data => {
        this.serverInfo = data["data"];
        loading.dismiss();
      });
  }

  getOauthToken(){
    console.log('retreiving auth token')
    //var ref = this.iab;
    var oauthUrl = this.form.value['serverUrl'] + '/oauth/authorize?client_id=' + this.form.value['client_id'] + '&redirect_uri=http://localhost/callback&scope=&response_type=token'
    var ref = window.open(oauthUrl, '_blank', 'location=no');
    ref.addEventListener('loadstart',function(event) {
      console.log(event['url']);
    });
    /* return new Promise(function(resolve, reject){
      var browserRef = ref.create(oauthUrl, '_blank', "location=no,clearsessioncache=yes,clearcache=yes");
      browserRef.on("loadstart").subscribe(event => {
        if ((event.url).indexOf("http://localhost/callback") === 0) {
            //browserRef.removeEventListener("exit", (event) => {});
            browserRef.close();
            var responseParameters = ((event.url).split("#")[1]).split("&");
            var parsedResponse = {};
            for (var i = 0; i < responseParameters.length; i++) {
                parsedResponse[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
            }
            if (parsedResponse["access_token"] !== undefined && parsedResponse["access_token"] !== null) {
                resolve(parsedResponse);
            } else {
                reject("Problem authenticating with Firefly iii");
            }
        }
      });
//      browserRef.on("exit").subscribe(function(event) {
//        reject("The Facebook sign in flow was canceled");
//     });
    });*/
  }
}
