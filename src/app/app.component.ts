import { Component } from '@angular/core';
import { Platform, Config } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private config: Config, private storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.getSetting('serverUrl').then((v) => { this.config.set('serverUrl', v) } );
      this.getSetting('pat').then((v) => { this.config.set('pat', v) } );
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  public async getSetting(key){
    return await this.storage.get(key);
  }
}
