import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FireflyService } from '../providers/firefly.service'
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  private form : FormGroup;
  private serverInfo: any = { version: "Disconnected" };
  private version;
  private name;

  constructor(private formBuilder: FormBuilder, private fireflyService: FireflyService, private storage: Storage ) {
    
   }

  public ngOnInit() {
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
      if(settings["authType"] === undefined || settings["authType"] === null || settings["authType"] === "")
      {
        settings["authType"] = "oauth";
      }
      this.form.get('authType').setValue(settings["authType"]);
      this.getServerInfo();
    });

    //if (this.platform.is('cordova')) {
    //  this.appVersion.getVersionNumber().then( data => { this.version = data });
    //  this.appVersion.getAppName().then( data => { this.name = data });
    //}
  }

  public buildForm(){
    this.form = this.formBuilder.group({
      serverUrl: [''],
      pat: [''],
      client_id: [''],
      client_secret: [''],
      oauth_token: [''],
      authType: ['oauth']
    });
  }

  private save() { 
    // Save settings before we attempt to authenticate just in case something happens.
    this.storage.set('settings', JSON.stringify(this.form.value)).then(r => {
      /*if(this.form.value.authType === "oauth"){
        // Authenticate to oauth to get an auth code
        this.getOauthToken().then( data => {
          var token = data["code"];
          this.form.get('oauth_token').setValue(token);
          // Now get an access_token
          this.fireflyService.getOauthToken(token).then( data => {
            // Save the access token as the PAT
            this.form.get('pat').setValue(data['access_token']);
            this.storage.set('settings', JSON.stringify(this.form.value)).then(r => {
              //refresh firefly server settings
              this.fireflyService.getSettings().then(d => {
                // Refresh Server Info
                this.getServerInfo();
              });
            });
          }).catch(err => {
            this.presentToast("An error occurred getting Token: " + err.statusText);
          });
        }).catch(err => {
          this.presentToast("An error occurred getting Code: " + err.statusText);
        });
      }else{*/
        //refresh firefly server settings
        this.fireflyService.getSettings().then(d => {
          // Refresh Server Info
          this.getServerInfo();
        });
      //}
    });
  }

  presentToast(msg) {
    /*let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "bottom"
    });
    toast.present();*/
  }

  dismiss() {
    //this.viewCtrl.dismiss();
  }

  getServerInfo(){
      //let loading = this.loadingCtrl.create({ content: "Loading..." });

      this.fireflyService.getServerInfo().then(data => {
        this.serverInfo = data["data"];
        //loading.dismiss();
        console.log("Connection Established")
        this.presentToast("Connection Established");
        //this.events.publish("settings:saved");
      }).catch( err => {
        this.presentToast("Unable to connect to Firefly Instance");
        console.log("Unable to connect: " + err)
      });
  }
}
