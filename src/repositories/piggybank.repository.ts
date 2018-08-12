import { BaseRepository } from './base.repository';
import { PiggybankModel } from '../models/piggybank.model';

export class PiggybankRepository extends BaseRepository<PiggybankModel>{
    protected endpoint: string = '/piggy_banks';
    protected model = PiggybankModel;
}