import { BaseRepository } from './base.repository';
import { BillModel } from '../models/bill.model';

export class BillRepository extends BaseRepository<BillModel>{
    protected endpoint: string = '/bills';
    protected model = BillModel;

    // This needs to be more dynamic
    getEndpoint(){
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().slice(0, 10);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().slice(0, 10);
        console.log(this.endpoint + "?start=" + firstDay + "&end=" + lastDay)
        return this.endpoint + "?start=" + firstDay + "&end=" + lastDay;
    }
}