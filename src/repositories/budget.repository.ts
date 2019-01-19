import { BaseRepository } from './base.repository';
import { BudgetModel } from '../models/budget.model';
import { BudgetLimitModel } from '../models/budgetlimit.model';

export class BudgetRepository extends BaseRepository<BudgetModel>{
    protected endpoint: string = '/budgets';
    protected model = BudgetModel;

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

    public getLimits(id: number, refresh: boolean = true, recursive: boolean = true){
        return new Promise((resolve, reject) => {

            // instantiate collection just in case.
            var collection = [];

            // Check for cached data before making a call to the web service.
            if(!refresh && this._rawData !== null){
                resolve(this._rawData);
            }else if(!refresh || !this.fireflyService.isConnected){
                this.getEntitiesFromStorage().then(d => {
                    if(d !== null)
                        collection = d;
                    resolve(collection);
                });
            }else{
                this.fireflyService.getEntities(this.endpoint + "/" + id + "/limits?start=" + this.getStartDate() + "&end=" + this.getEndDate(), recursive).then(d => {
                    collection[0] = new BudgetLimitModel(d[0]);
                    this.saveEntitiesToStorage();
                    resolve(collection);
                });
            }
        });
    }
}