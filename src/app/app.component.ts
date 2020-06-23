import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/home/',
      icon: 'home'
    },
    {
      title: 'Outbox',
      url: '/folder/Outbox',
      icon: 'paper-plane'
    },
    {
      title: 'Favorites',
      url: '/folder/Favorites',
      icon: 'heart'
    },
    {
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive'
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash'
    },
    {
      title: 'Settings',
      url: '/settings/',
      icon: 'settings'
    }
  ];
  dark = true;
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  private months = [];
  private selectedMonth: Number;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();

    var date = new Date();

    // build out the months for the dropdown
    for( var i = date.getMonth(); i >= 0; i--){
        var d = new Date(date.getFullYear(), i);
        this.months[i] = d.toLocaleString(navigator.language, { month: "long"});
    }
    
    this.selectedMonth = date.getMonth();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    //const path = window.location.pathname.split('home/')[1];
    //if (path !== undefined) {
    //  this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
   // }
  }
}
