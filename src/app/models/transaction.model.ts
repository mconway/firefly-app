import { Injectable } from "@angular/core";

@Injectable()
export class TransactionModel{

    public user: number
    public transaction_journal_id: number
    public type: string 
    public date: Date
    public order: number
    public currency_id: number
    public currency_code: string
    public currency_name: string
    public currency_symbol: string
    public currency_decimal_places: number
    public foreign_currency_id :  number
    public foreign_currency_code :  string
    public foreign_currency_symbol :  string
    public foreign_currency_decimal_places :  number
    public amount: number
    public foreign_amount:  number
    public description: string
    public source_id: number
    public source_name: string
    public source_iban: string
    public source_type: string
    public destination_id: number
    public destination_name: string
    public destination_iban :  string
    public destination_type: string
    public budget_id: number
    public budget_name: string
    public category_id: number
    public category_name: string
    public bill_id :  number
    public bill_name :  string
    public reconciled: boolean
    public notes :  string
    public tags: any[]
    public interest_date : Date
    public book_date : Date
    public process_date : Date
    public due_date : Date
    public payment_date : Date
    public invoice_date: Date

    constructor(transactionGroupResult: any){
        if(transactionGroupResult !== undefined && transactionGroupResult !== null)
            this.hydrate(transactionGroupResult)
    }

    public hydrate(transactionGroupResult: any){
        this.transaction_journal_id = transactionGroupResult.transaction_journal_id;
        this.date = new Date(transactionGroupResult.date);
        this.description = transactionGroupResult.description;

        this.user = transactionGroupResult.user;
        this.type = transactionGroupResult.type;
        this.order = transactionGroupResult.order;
        this.currency_id = transactionGroupResult.currency_id;
        this.currency_code = transactionGroupResult.currency_code;
        this.currency_name = transactionGroupResult.currency_name;
        this.currency_symbol = transactionGroupResult.currency_symbol;
        this.currency_decimal_places = transactionGroupResult.currency_decimal_places;
        this.foreign_currency_id = transactionGroupResult.foreign_currency_id;
        this.foreign_currency_code = transactionGroupResult.foreign_currency_code;
        this.foreign_currency_symbol = transactionGroupResult.foreign_currency_symbol;
        this.foreign_currency_decimal_places = transactionGroupResult.foreign_currency_decimal_places;
        this.amount = parseFloat(transactionGroupResult.amount);
        this.foreign_amount = transactionGroupResult.foreign_amount;
        this.source_id = transactionGroupResult.source_id;
        this.source_name = transactionGroupResult.source_name;
        this.source_iban = transactionGroupResult.source_iban;
        this.source_type = transactionGroupResult.source_type;
        this.destination_id = transactionGroupResult.destination_id;
        this.destination_name = transactionGroupResult.destination_name;
        this.destination_iban = transactionGroupResult.destination_iban;
        this.destination_type = transactionGroupResult.destination_type;
        this.budget_id = transactionGroupResult.budget_id;
        this.budget_name = transactionGroupResult.budget_name;
        this.category_id = transactionGroupResult.category_id != null ? transactionGroupResult.category_id : undefined;
        this.category_name = transactionGroupResult.category_name;
        this.bill_id = transactionGroupResult.bill_id;
        this.bill_name = transactionGroupResult.bill_name;
        this.reconciled = transactionGroupResult.reconciled;
        this.notes = transactionGroupResult.notes;
        this.tags = transactionGroupResult.tags;
        this.interest_date = transactionGroupResult.interest_date;
        this.book_date = transactionGroupResult.book_date;
        this.process_date = transactionGroupResult.process_date;
        this.due_date = transactionGroupResult.due_date;
        this.payment_date = transactionGroupResult.payment_date;
        this.invoice_date = transactionGroupResult.invoice_date;
    }
}