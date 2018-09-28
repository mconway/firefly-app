import { BaseRepository } from './base.repository';
import { BudgetModel } from '../models/budget.model';

export class BudgetRepository extends BaseRepository<BudgetModel>{
    protected endpoint: string = '/budgets';
    protected model = BudgetModel;
}