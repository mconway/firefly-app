import { BaseRepository } from './base.repository';
import { BillModel } from '../models/bill.model';

export class BillRepository extends BaseRepository<BillModel>{
    protected endpoint: string = '/bills?start=2018-07-01&end=2018-07-31';
    protected model = BillModel;
}