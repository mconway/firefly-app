import { IRead } from './interfaces/iread.repository';
import { ModelFactory } from '../models/model.factory';
import { FireflyRemoteProvider } from '../providers/firefly-remote/firefly-remote';
import { Storage } from '@ionic/storage';
import { Inject } from "@angular/core";

export class BaseRepository<T> implements IRead<T>
{
    protected endpoint: string = '';
    protected model: any;
    protected _rawData: any = null;

    constructor(@Inject(FireflyRemoteProvider) private fireflyService, @Inject(Storage) private storage){
        console.log("Creating new repository " + typeof this);
    }

    getAll(recursive:boolean = false): Promise<T[]> {
        return new Promise((resolve, reject) => {

            var collection = [];

            // Check for cached data before making a call to the web service.
            if(this._rawData !== null){
                resolve(this._rawData);
            }else{
                this.fireflyService.getEntities(this.endpoint, recursive).then(d => {

                    if(d.length > 0){
                        for(var i = 0; i < d.length; i++){
                            collection[i] = ModelFactory.create(this.model);
                            collection[i].hydrate(d[i]);
                        }

                        this._rawData = collection;
                    }

                    resolve(collection);
                });
            }
        });
    }

    find(): Promise<T[]> {
        throw new Error("Method not implemented");
    }

    findOne(): Promise<T> {
        throw new Error("Method not implemented");
    }

}