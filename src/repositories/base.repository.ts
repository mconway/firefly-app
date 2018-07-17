import { IRead } from './interfaces/iread.repository';
import { ModelFactory } from '../models/model.factory';
import { FireflyRemoteProvider } from '../providers/firefly-remote/firefly-remote';
import { Storage } from '@ionic/storage';
import { Inject } from "@angular/core";

export class BaseRepository<T> implements IRead<T>
{
    protected endpoint: string = '';
    protected model: any;

    constructor(@Inject(FireflyRemoteProvider) private fireflyService, @Inject(Storage) private storage){

    }

    getAll(): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.fireflyService.getEntities(this.endpoint).then(d => {
                var collection = [];

                for(var i = 0; i < d["data"].length; i++){
                    collection[i] = ModelFactory.create(this.model);
                }

                resolve(collection);
            });
        });
    }

    find(): Promise<T[]> {
        throw new Error("Method not implemented");
    }

    findOne(): Promise<T> {
        throw new Error("Method not implemented");
    }

}