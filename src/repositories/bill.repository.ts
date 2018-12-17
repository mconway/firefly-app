import { BaseRepository } from './base.repository';
import { BillModel } from '../models/bill.model';

export class BillRepository extends BaseRepository<BillModel>{
    protected endpoint: string = '/bills';
    protected model = BillModel;

    getEndpoint(){
        var date = new Date();
        var firstDay = new Date(date.getFullYear()-1, this.month, 1).toISOString().slice(0, 10);
        var lastDay = new Date(date.getFullYear(), this.month + 1, 0).toISOString().slice(0, 10);
        return this.endpoint + "?start=" + firstDay + "&end=" + lastDay;
    }
}