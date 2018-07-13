import { HttpClient, HttpParams, HttpEventType } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { query } from '@angular/core/src/animation/dsl';
import { Subscriber } from 'rxjs/Subscriber';

/*
  Generated class for the FireflyRemoteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FireflyRemoteProvider {

  private settings: any = {};
  public isConnected: boolean = null;

  constructor(
    public http: HttpClient, 
    private storage: Storage) 
  {
    console.log('Hello FireflyRemoteProvider Provider');
  }

  getSettings(){
    return new Promise( (resolve, reject) => {
        this.storage.ready().then(() => {
          this.storage.get('settings').then( s => {
            if(s)
              this.settings = JSON.parse(s);

            this.settings.apiUrl = this.settings.serverUrl + '/api/v1';

            return resolve(this.settings);
          }, err => { reject(err) });
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
    return new Promise((resolve, reject) => {
      this.getHttpHeaders()
        .then(h => { 
            this.http.get(this.settings.apiUrl + '/accounts?type=asset', {headers: h})
              .subscribe(data => {
                resolve(data);
              }, err => {
                reject(err);
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

  async getEntities(endpoint: string) {
    return new Promise((resolve, reject) => {
      this.getHttpHeaders()
        .then(h => { 
            this.http.get(this.settings.apiUrl + endpoint, {headers: h})
              .subscribe(data => {
                resolve(data);
              }, err => {
                reject(err);
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
    return new Promise((resolve, reject) => {
      this.getHttpHeaders()
        .then(h => {
          this.http.post(this.settings.apiUrl + '/transactions', JSON.stringify(data), { headers: h})
          .subscribe(success => { return resolve(success); }, err => { return reject(err) })
        });
      });
  }

  getServerInfo(){
    return new Promise(resolve => {
      this.getHttpHeaders()
        .then( h => {
          this.http.get(this.settings.apiUrl + '/about', { headers: h })
          .subscribe(success => {
            this.isConnected = true;
            return resolve(success);
          }, err => { 
            this.isConnected = false; 
            console.log(err); })
        });
    })
  }

  getOauthToken(token){
    return new Promise( (resolve, reject) => {
      this.getSettings().then(data => {

        var bodyObject = {
          'grant_type': "authorization_code",
          'code': token,
          'redirect_uri': "http://localhost/callback",
          'client_id': this.settings.client_id,
          'client_secret': this.settings.client_secret
        }
    
        var body = [];
        for(var p in bodyObject){
          body.push(encodeURIComponent(p) + "=" + encodeURIComponent(bodyObject[p]));
        }

        this.http.post(this.settings.serverUrl + '/oauth/token', body.join('&'), { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })}).subscribe(success => {
          return resolve(success);
        }, err => { reject(err)});
      });
    });
  }

}
