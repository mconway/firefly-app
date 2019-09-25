import { BaseRepository } from './base.repository';
import { TransactionGroupModel } from '../models/transactiongroup.model';

export class TransactionGroupRepository extends BaseRepository<TransactionGroupModel>{
    protected endpoint: string = '/transactions';
    protected model = TransactionGroupModel;

    private getStartDate(){
        var date = new Date();
        return new Date(date.getFullYear(), this.month, 1).toISOString().slice(0, 10);
    }

    private getEndDate(){
        var date = new Date();
        return new Date(date.getFullYear(), this.month + 1, 0).toISOString().slice(0, 10);
    }

    public getEndpoint(){
        return this.endpoint + "?start=" + this.getStartDate() + "&end=" + this.getEndDate();
    }
}