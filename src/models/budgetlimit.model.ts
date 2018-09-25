export class BudgetLimitModel {
    id: Number;
    startDate: Date;
    endDate: Date;
    amount: Number;
    relatedBudget: Number;

    constructor(result: any){
        if(result !== undefined && result !== null)
            this.hydrate(result)
    }

    public hydrate(result: any){
        this.id = result.id;
        this.amount = result.attributes.amount;
        // Force 00:00:00 so that dates don't have time taken away when converting to locale.
        this.startDate = new Date(result.attributes.start_date + " 00:00:00");
        this.endDate = new Date(result.attributes.end_date + " 00:00:00");
        this.relatedBudget = result.relationships.budget.data.id;
    }
}