import { Component } from '@angular/core';
import { NavController, LoadingController, Platform ,Events} from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version'
import { FireflyRemoteProvider } from '../../providers/firefly-remote/firefly-remote';

declare var window: any;

@Component({
  selector: 'page-home',
  templateUrl: 'about.html'
})

export class AboutPage {
  private name: string;
  private serverInfo: any = { version: "Disconnected" };
  private version: string;

  constructor(
    public navCtrl: NavController, 
    public viewCtrl: ViewController, 
    private appVersion: AppVersion,
    private platform: Platform,
    private fireflyService : FireflyRemoteProvider, 
    private events: Events) 
  {
    if (this.platform.is('cordova')) {
      this.appVersion.getVersionNumber().then( data => { this.version = data });
      this.appVersion.getAppName().then( data => { this.name = data });
    }

    this.getServerInfo();
  }

  getServerInfo(){
      this.fireflyService.getServerInfo().then(data => {
        this.serverInfo = data["data"];
      }).catch( err => {

      });
  }
}
