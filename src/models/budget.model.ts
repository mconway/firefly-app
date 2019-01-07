import { BudgetLimitModel } from "./budgetlimit.model";

export class BudgetModel {
    id: Number;
    name: string;
    active: boolean;
    spent: number;
    limits: BudgetLimitModel[];

    constructor(result: any){
        if(result !== undefined && result !== null)
            this.hydrate(result)
    }

    public hydrate(result: any){
        this.id = result.id;
        this.name = result.attributes.name;
        this.active = result.attributes.active;

        // added in 0.9
        if(result.attributes.spent !== undefined && result.attributes.spent[0] !== undefined)
            this.spent = result.attributes.spent[0].amount;
    }
}