import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { Injectable } from '@angular/core';
import { Config } from 'ionic-angular';

/*
  Generated class for the FireflyRemoteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FireflyRemoteProvider {

  //private serverUrl: any;
  //private pat: string;
  //private getApiUrl: string;

  constructor(public http: HttpClient, private storage: Storage, private config: Config) {
    console.log('Hello FireflyRemoteProvider Provider');

    //this.serverUrl = config.get('serverUrl');
    //this.pat = config.get('pat');
    //this.getApiUrl = this.serverUrl + '/api/v1';

    //console.log(this.serverUrl, this.pat);

  }

  getApiUrl(){
    return this.config.get('serverUrl') + '/api/v1';
  }

  getHttpHeaders()
  {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.config.get('pat'),
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/json'
    });
  }

  getAccounts() {
    return new Promise(resolve => {
      this.http.get(this.getApiUrl() + '/accounts?type=asset', {headers: this.getHttpHeaders()})
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err)
        });
    });
    
  }

  getBills() {
    return new Promise(resolve => {
      this.http.get(this.getApiUrl() + '/bills', {headers: this.getHttpHeaders()})
        .subscribe(bills => {
          resolve(bills);
        }, err => {
          console.log(err)
        });
    });
  }

  postTransaction(data: any){
    return new Promise(resolve => {
      this.http.post(this.getApiUrl() + '/transactions', JSON.stringify(data), { headers: this.getHttpHeaders()})
      .subscribe(success => { return resolve(success); }, err => { console.log(err); })
    });
  }

}
