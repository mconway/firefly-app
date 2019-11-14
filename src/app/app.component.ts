import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Events } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';
import { MenuPage } from '../pages/menu/menu';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = MenuPage;

  constructor(
    events: Events,
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen) 
  {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // Fix the race condition trying to pass the selected month before the device is ready but publishing an event.
      events.publish("platform:ready");
    });
  }
}
