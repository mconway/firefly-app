import { FireflyRemoteProvider } from "../providers/firefly-remote/firefly-remote";
import { Inject, Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { TransactionItemModel } from "./transactionItem.model";

@Injectable()
export class TransactionModel{

    public user: number
    public transactionJournalId: number
    public type: string 
    public date: Date
    public order: number
    public currencyId: number
    public currencyCode: string
    public currencyName: string
    public currencySymbol: string
    public currencyDecimalPlaces: number
    public foreignCurrencyId :  number
    public foreignCurrencyCode :  string
    public foreignCurrencySymbol :  string
    public foreignCurrencyDecimalPlaces :  number
    public amount: number
    public foreignAmount:  number
    public description: string
    public sourceId: number
    public sourceName: string
    public sourceIban: string
    public sourceType: string
    public destinationId: number
    public destinationName: string
    public destinationIban :  string
    public destinationType: string
    public budgetId: number
    public budgetName: string
    public categoryId: number
    public categoryName: string
    public billId :  number
    public billName :  string
    public reconciled: boolean
    public notes :  string
    public tags: any[]
    public interestDate : Date
    public bookDate : Date
    public processDate : Date
    public dueDate : Date
    public paymentDate : Date
    public invoiceDate: Date

    constructor(transactionGroupResult: any){
        if(transactionGroupResult !== undefined && transactionGroupResult !== null)
            this.hydrate(transactionGroupResult)
    }

    public hydrate(transactionGroupResult: any){
        this.transactionJournalId = transactionGroupResult.transaction_journal_id;
        this.date = new Date(transactionGroupResult.date);
        this.description = transactionGroupResult.description;

        this.user = transactionGroupResult.user
        this.type = transactionGroupResult.type
        this.order = transactionGroupResult.order
        this.currencyId = transactionGroupResult.currency_id
        this.currencyCode = transactionGroupResult.currency_code
        this.currencyName = transactionGroupResult.currency_name
        this.currencySymbol = transactionGroupResult.currency_symbol
        this.currencyDecimalPlaces = transactionGroupResult.currency_decimal_places
        this.foreignCurrencyId = transactionGroupResult.foreign_currency_id
        this.foreignCurrencyCode = transactionGroupResult.foreign_currency_code
        this.foreignCurrencySymbol = transactionGroupResult.foreign_currency_symbol
        this.foreignCurrencyDecimalPlaces = transactionGroupResult.foreign_currency_decimal_places
        this.amount = parseFloat(transactionGroupResult.amount)
        this.foreignAmount = transactionGroupResult.foreign_amount
        this.sourceId = transactionGroupResult.source_id
        this.sourceName = transactionGroupResult.source_name
        this.sourceIban = transactionGroupResult.source_iban
        this.sourceType = transactionGroupResult.source_type
        this.destinationId = transactionGroupResult.destination_id
        this.destinationName = transactionGroupResult.destination_name
        this.destinationIban = transactionGroupResult.destination_iban
        this.destinationType = transactionGroupResult.destination_type
        this.budgetId = transactionGroupResult.budget_id
        this.budgetName = transactionGroupResult.budget_name
        this.categoryId = transactionGroupResult.category_id
        this.categoryName = transactionGroupResult.category_name
        this.billId = transactionGroupResult.bill_id
        this.billName = transactionGroupResult.bill_name
        this.reconciled = transactionGroupResult.reconciled
        this.notes = transactionGroupResult.notes
        this.tags = transactionGroupResult.tags
        this.interestDate = transactionGroupResult.interest_date
        this.bookDate = transactionGroupResult.book_date
        this.processDate = transactionGroupResult.process_date
        this.dueDate = transactionGroupResult.due_date
        this.paymentDate = transactionGroupResult.payment_date
        this.invoiceDate = transactionGroupResult.invoice_date
    }
/*
    public save() {
        return new Promise((resolve,reject)> {    

            public data {
                type: this.type,
                description: this.description,
                date: this.date,
                piggy_bank_id: this.piggyBankId,
                transactions: this.transactions
            }

            if(this.fireflyService.isConnected){
                this.fireflyService.postTransaction(data).then( ()> {
                    this.synced true;
                    return resolve("Transaction Created Successfully");
                }).catch( err> {
                    return resolve("An error was encountered while saving your transaction");
                });
            }
            else{
                this.storage.get("pendingTransactions").then( pendingTransactions> {
                    public pending pendingTransactions;

                    if(pending= null || pending= undefined){
                        pending [];
                    }

                    pending.push(data);
                    this.storage.set("pendingTransactions", pending);
                    return resolve("Transaction Queued");
                });
            }

        });
    }

    public loadFromQueue(queueData: any){
        this.type queueData.type;
        this.description= queueData.description;
        this.date queueData.date;
        this.piggyBankId queueData.piggyBankId != '' ? queueData.piggyBankId : null;

        // Only 1 sub item can be added for now
        this.transactions queueData.transactions;

        return this;
    }

    public loadFromForm(formData: any){
        this.type formData.type;
        this.description= formData.description;
        this.date formData.date;
        this.piggyBankId formData.piggy_bank_id !== '' ? formData.piggy_bank_id : null;

        // Only 1 sub item can be added for now
        // Bug #230 - need to rethink how transaction model is instantiated. Use repo pattern.
        this.transactions [ new TransactionItemModel(formData)];
        //this.transactions.push(new TransactionItemModel(formData));

        return this;
    }
    */
}