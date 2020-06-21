import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, FormBuilder, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { TransactionsService } from './providers/transactions.service';
import { FireflyService } from './providers/firefly.service';
import { IonicStorageModule } from '@ionic/storage'
import { HttpClientModule, HttpHandler } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    //TransactionsService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FireflyService,
   
    //HttpHandler,
    Storage
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
