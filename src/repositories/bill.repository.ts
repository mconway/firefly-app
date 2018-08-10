import { BaseRepository } from './base.repository';
import { BillModel } from '../models/bill.model';

export class BillRepository extends BaseRepository<BillModel>{
    protected endpoint: string = '/bills';
    protected model = BillModel;

    // This needs to be more dynamic
    getEndpoint(){
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return this.endpoint + "?start=" + firstDay + "&end=" + lastDay;
    }
}