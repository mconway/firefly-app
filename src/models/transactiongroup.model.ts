import { TransactionModel } from "./transaction.model";

export class TransactionGroupModel {
    public id: number;
    public createdAt: Date;
    public updatedAt: Date;
    public groupTitle: string;
    public transactions: TransactionModel[];
    public transactionType: string;
    public date: Date;
    public description: string;
    public categoryName: string;
    public currencySymbol: string;
    public amount: number = 0;
    public isPending: boolean = false;
    public transactionTypeIcons: any = {
        'Withdrawal': 'md-arrow-back',
        'Deposit': 'md-arrow-forward',
        'Transfer': 'md-shuffle',
    };

    constructor(transactionGroupResult: any){
        if(transactionGroupResult !== undefined && transactionGroupResult !== null)
            this.hydrate(transactionGroupResult)
    }

    public hydrate(transactionGroupResult: any){
        this.id = transactionGroupResult.id;
        this.createdAt = transactionGroupResult.attributes.created_at;
        this.updatedAt = transactionGroupResult.attributes.updated_at;
        this.groupTitle = transactionGroupResult.attributes.group_title;

        // create transaction children
        var collection = [];

        var length = transactionGroupResult.attributes.transactions.length;

        for(var i = 0; i < length; i++){
            var transaction = new TransactionModel(transactionGroupResult.attributes.transactions[i]);

            // seems hacky, but not sure of a better way right now. - set the group's transaction type
            if(i === 0 ){
                this.transactionType = transaction.type;
                this.date = transaction.date;
                this.description = transaction.description;
                this.categoryName = transaction.category_name;
                this.currencySymbol = transaction.currency_symbol;
            }
            this.amount += transaction.amount;

            collection[i] = transaction;
        }

        this.transactions = collection;
    }
}