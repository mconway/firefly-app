import { BaseRepository } from './base.repository';
import { PiggybankModel } from '../models/piggybank.model';

export class PiggybankRepository extends BaseRepository<PiggybankModel>{
    protected endpoint: string = '/piggy_banks';
    protected model = PiggybankModel;

    public getEndpoint(id: number = null): string {
        if(id === null){
            return this.endpoint;
        }else{
            return this.endpoint + "/" + id.toString() + "?include=account"
        }
    }
}