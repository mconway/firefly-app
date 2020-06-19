export class BudgetLimitModel implements BaseModel {
    public isPending;
    id: number;
    startDate: Date;
    endDate: Date;
    amount: number;
    relatedBudget: number;
    public spentAmount: number;

    constructor(result: any){
        if(result !== undefined && result !== null)
            this.hydrate(result)
    }

    public hydrate(result: any){
        // compatibility for 0.9
        var start = result.attributes.start_date === undefined ? result.attributes.start : result.attributes.start_date;
        var end = result.attributes.end_date === undefined ? result.attributes.end : result.attributes.end_date;

        this.id = result.id;
        this.amount = result.attributes.amount;
        
        // Force 00:00:00 so that dates don't have time taken away when converting to locale.
        this.startDate = new Date(start + " 00:00:00");
        this.endDate = new Date(end + " 00:00:00");
        this.relatedBudget = result.attributes.budget_id;

        // added in 0.9
        if(result.spent !== undefined)
            this.spentAmount = result.spent[0].amount;
    }
}