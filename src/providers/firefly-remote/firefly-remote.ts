import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { query } from '@angular/core/src/animation/dsl';

/*
  Generated class for the FireflyRemoteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FireflyRemoteProvider {

  private settings: any = {};

  constructor(
    public http: HttpClient, 
    private storage: Storage) 
  {
    console.log('Hello FireflyRemoteProvider Provider');
  }

  getSettings(){
    return new Promise( resolve => {
        this.storage.ready().then(() => {
          this.storage.get('settings').then( s => {
            if(s)
              this.settings = JSON.parse(s);

            this.settings.apiUrl = this.settings.serverUrl + '/api/v1';

            return resolve(this.settings);
          });
      });
    });
  }

  getHttpHeaders()
  {
    return this.getSettings().then( (s) => {
      return new HttpHeaders({
        'Authorization': 'Bearer ' + s["pat"],
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/json'
      });
    });
  }

  async getAccounts() {
    return new Promise(resolve => {
      this.getHttpHeaders()
        .then(h => { 
            this.http.get(this.settings.apiUrl + '/accounts?type=asset', {headers: h})
              .subscribe(data => {
                resolve(data);
              }, err => {
                console.log(err)
              });
          });
       });
  }

  getBills(start, end) {
    return new Promise(resolve => {
      this.getHttpHeaders()
        .then(h => {
          this.http.get(this.settings.apiUrl + '/bills', {
            headers: h, 
            params: {
              'start': start,
              'end': end
            }
          }
        ).subscribe(bills => {
              resolve(bills);
            }, err => {
              console.log(err)
            });
        });
      });
  }

  getTransactions() {
    return new Promise(resolve => {
      this.getHttpHeaders()
        .then(h => {
          this.http.get(this.settings.apiUrl + '/transactions', {headers: h})
            .subscribe(transactions => {
              resolve(transactions);
            }, err => {
              console.log(err)
            });
        });
      });
  }

  postTransaction(data: any){
    return new Promise(resolve => {
      this.getHttpHeaders()
        .then(h => {
          this.http.post(this.settings.apiUrl + '/transactions', JSON.stringify(data), { headers: h})
          .subscribe(success => { return resolve(success); }, err => { console.log(err); })
        });
      });
  }

  getServerInfo(){
    return new Promise(resolve => {
      this.getHttpHeaders()
        .then( h => {
          this.http.get(this.settings.apiUrl + '/about', { headers: h })
          .subscribe(success => {
            return resolve(success);
          }, err => { console.log(err); })
        });
    })
  }

}
