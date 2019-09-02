import { BaseRepository } from './base.repository';
import { BudgetLimitModel } from '../models/budgetlimit.model';

export class BudgetLimitRepository extends BaseRepository<BudgetLimitModel>{
    protected endpoint: string = '/budgets/limits';
    protected model = BudgetLimitModel;

    // This needs to be more dynamic
    getEndpoint(){
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), this.month, 1).toISOString().slice(0, 10);
        var lastDay = new Date(date.getFullYear(), this.month + 1, 0).toISOString().slice(0, 10);
        return this.endpoint + "?start=" + firstDay + "&end=" + lastDay;
    }
}