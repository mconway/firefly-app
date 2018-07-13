import { IRead } from './interfaces/iread.repository';
import { FireflyRemoteProvider } from '../providers/firefly-remote/firefly-remote';
import { Storage } from '@ionic/storage';
import { Inject } from "@angular/core";

export class BaseRepository<T> implements IRead<T>
{
    protected endpoint: string = '';

    constructor(@Inject(FireflyRemoteProvider) private fireflyService, @Inject(Storage) private storage){

    }

    getAll(): Promise<T[]> {
        return this.fireflyService.getEntities(this.endpoint);
    }

    find(): Promise<T[]> {
        throw new Error("Method not implemented");
    }

    findOne(): Promise<T> {
        throw new Error("Method not implemented");
    }

}