import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
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
    private toastCtrl: ToastController,
    private iab: InAppBrowser) 
  {
    this.buildForm();

    this.storage.get('settings').then( s => {
      var settings = {};

      if(s)
        settings = JSON.parse(s);

      this.form.get('serverUrl').setValue(settings["serverUrl"]);
      this.form.get('pat').setValue(settings["pat"]); 
      this.form.get('oauth_token').setValue(settings['oauth_token']);
      this.form.get('client_id').setValue(settings["client_id"]); 
      this.form.get('client_secret').setValue(settings["client_secret"]); 
      this.getServerInfo();
    });

  }

  save() { 
    // Save settings before we attempt to authenticate just in case something happens.
    this.storage.set('settings', JSON.stringify(this.form.value));
    
    //Authenticate to oauth to get an auth code
    this.getOauthToken().then( data => {
      var token = data["code"];
      this.form.get('oauth_token').setValue(token);
      // Now get an access_token
      this.fireflyService.getOauthToken(token).then( data => {
        // Save the access token as the PAT
        this.form.get('pat').setValue(data['access_token']);
        this.storage.set('settings', JSON.stringify(this.form.value));

        // Refresh Server Info
        this.getServerInfo();
      }).catch(err => {
        alert("An error occurred " + err.statusText);
      });
      
    }).catch(err => {
      this.presentToast("An error occurred " + err);
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

  dismiss() {
    this.viewCtrl.dismiss();
  }

  buildForm(){
    this.form = this.formBuilder.group({
      serverUrl: [''],
      pat: [''],
      client_id: [''],
      client_secret: [''],
      oauth_token: ['']
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
    var ref = this.iab;
    var oauthUrl = this.form.value['serverUrl'] + '/oauth/authorize?client_id=' + this.form.value['client_id'] + '&redirect_uri=http%3A%2F%2Flocalhost%2Fcallback&scope=&response_type=code&state='
     return new Promise(function(resolve, reject){
      var browserRef = ref.create(oauthUrl, '_blank', "location=no,clearsessioncache=yes,clearcache=yes");
      browserRef.on("loadstart").subscribe(event => {
        //wait for the callback redirect
        if ((event.url).indexOf("http://localhost/callback") === 0) {
            //close the browser window
            browserRef.close();
            //URL Schema = url?code=
            var responseParameters = ((event.url).split("?")[1]).split("&");
            var parsedResponse = {};

            for (var i = 0; i < responseParameters.length; i++) {
                //creates ['code'] = code
                parsedResponse[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
            }

            if (parsedResponse["code"] !== undefined && parsedResponse["code"] !== null) {
                resolve(parsedResponse);
            } else {
                reject("Problem authenticating with Firefly iii");
            }
        }
      });
      browserRef.on("exit").subscribe(function(event) {
        reject("The sign in flow was canceled");
     });
    });
  }
}
