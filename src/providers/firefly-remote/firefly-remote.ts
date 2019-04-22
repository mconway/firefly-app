import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

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
    return new Promise<HttpHeaders>((resolve, reject) => {
      this.getSettings().then( (s) => {

        if(this.settings.serverUrl === undefined || this.settings.serverUrl === null){
          reject("NotConfigured");
        }
  
        resolve(new HttpHeaders({
          'Authorization': 'Bearer ' + s["pat"],
          'Content-Type': 'application/vnd.api+json',
          'Accept': 'application/json'
        }));
      });
    }); 
  }

  async getEntities(endpoint: string, recursive: boolean = false) {
    return new Promise((resolve, reject) => {
      this.getHttpHeaders()
        .then(h => { 
            var url = this.settings.apiUrl + endpoint;
            this.getEntitiesRecursive(url, h, [], resolve, reject, recursive);
          });
       });
  }

  private getEntitiesRecursive(url, headers, entities: any, resolve, reject, recurse){
    this.http.get(url, {headers: headers})
    .subscribe(response => {
      if(!Array.isArray(response)){
        var allEntities = entities.concat(response["data"]);
      }
      else{
        var allEntities = entities.concat(response);
      }
      
      if(recurse && response["links"].next !== undefined && response["links"].next !== null){
        this.getEntitiesRecursive(response["links"].next, headers, allEntities, resolve, reject, recurse);
      }else{
        // need to clean this up to handle extra items besides data - this was added to get piggybankevents
        if(response['included'] !== undefined)
          allEntities['included'] = response['included'];
        resolve(allEntities);
      }
    }, err => {
      reject(err);
    });
  }

  public updateEntity(endpoint: string, entity: any){
    return new Promise((resolve, reject) => {
      this.getHttpHeaders()
      .then(h => {
        this.http.put(this.settings.apiUrl + endpoint, entity, { headers: h }).subscribe(response => resolve(response));
      }, err => {
        console.log(err.message);
        reject(err);
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
    return new Promise((resolve, reject) => {
      this.getHttpHeaders()
        .then( h => {
          this.http.get(this.settings.apiUrl + '/about', { headers: h })
          .subscribe(success => {
            this.isConnected = true;
            return resolve(success);
          }, err => { 
            this.isConnected = false;
            reject(err); 
            console.log("Error: " + err); })
        }, err => {reject(err)});
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
