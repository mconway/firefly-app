import { IRead } from '../interfaces/iread';
import { IWrite } from '../interfaces/iwrite';
import { ModelFactory } from '../models/model.factory';
import { FireflyService } from '../providers/firefly.service';
import { Storage } from '@ionic/storage';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class BaseService<T extends BaseModel> implements IRead<T>, IWrite<T>
{
    protected endpoint: string = '';
    protected model: any;
    protected _rawData: any = null;
    protected month: number;

    constructor(@Inject(FireflyService) protected fireflyService, @Inject(Storage) protected storage){
        
    }

    public getEndpoint(id: number = null){
        if(id === null){
            return this.endpoint;
        }else{
            return this.endpoint + "/" + id.toString();
        }
    }

    public getAll(month: number, recursive:boolean = false, refresh: boolean = false): Promise<T[]> {

        this.month = month;

        return new Promise((resolve, reject) => {

            // instantiate collection just in case.
            var collection = [];

            // Check for cached data before making a call to the web service.
            if(!refresh && this._rawData !== null){
                resolve(this._rawData);
            }else if(!refresh || !this.fireflyService.isConnected){
                this.getEntitiesFromStorage().then(d => {
                    if(d !== null)
                        collection = d;
                    resolve(collection);
                });
            }else{
                this.processPendingTransactions();
                this.fireflyService.getEntities(this.getEndpoint(), recursive).then(d => {
                    collection = this.processData(d);
                    this.saveEntitiesToStorage();
                    resolve(collection);
                });
            }
        });
    }

    public find(): Promise<T[]> {
        throw new Error("Method not implemented");
    }

    public findOne(): Promise<T> {
        throw new Error("Method not implemented");
    }

    public getOne(id: number): Promise<T> {
        var endpoint = this.getEndpoint(id);
        return this.fireflyService.getEntities(endpoint, false);
    }

    public save(model): Promise<string> {
        return new Promise((resolve, reject) => {    

            if(this.fireflyService.isConnected){
                this.fireflyService.post(model, this.getEndpoint()).then( (message) => {
                    model.isPending = false;
                    //return resolve(message);
                }).catch( err => {
                    return resolve(err);
                });
            }
            else{
                model.isPending = true;
                
                this.getEntitiesFromStorage().then( (result) => {
                    this._rawData = result;
                    this._rawData.push(model);
                    this.saveEntitiesToStorage();
                });

                return resolve("Transaction Queued");
            }
        });
    }

    protected processPendingTransactions(){
        this.getEntitiesFromStorage().then((entities) => {
          var pending = entities.filter( t => { if(t !== null && t !== undefined) return t.isPending })
          pending.forEach((entity) => {
            this.save(entity).then( (result) => {
            });
          });
        })
    }

    protected saveEntitiesToStorage(): Promise<T>{
        return this.storage.set(this.getEndpoint(), this._rawData);
    }

    protected getEntitiesFromStorage(): Promise<T[]>{
        return this.storage.get(this.getEndpoint());
    }

    protected processData(data: any): T[]{

        var collection = [];        

        if(data !== null && data.length > 0){
            
            for(var i = 0; i < data.length; i++){
                collection[i] = ModelFactory.create(this.model);
                collection[i].hydrate(data[i]);
            }

            this._rawData = collection;
        }

        return collection;
    }

    public update(delta: any): Promise<T>{
        var entity = delta.getApiEntity();
        return this.fireflyService.updateEntity(this.getEndpoint() + "/" + delta.id, entity);
    }

}