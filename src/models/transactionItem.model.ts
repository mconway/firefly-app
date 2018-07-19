import { Injectable } from "@angular/core";

@Injectable()
export class TransactionItemModel{

    // Properties from Firefly-iii API
    public lastUpdated: Date;
    public created: Date;
    public description: string;
    public date: Date;
    public type: string;
    public transactionDescription: string;
    public identifier: Number;
    public journalId: Number
    public reconciled: boolean;
    public amount: Number;
    public currencyId: Number;
    public currency_code: string;
    public curencySymbol: string;
    public currencyDp: Number;
    public foreignAmount: Number;
    public foreignCurrencyId: Number;
    public foreignCurrencyCode: string;
    public foreignCurrencySymbol: string;
    public foreignCurrencyDp: Number;
    public billId: Number;
    public billName: string;
    public category_id: Number;
    public categoryName: string;
    public budgetId: Number;
    public budgetName: string;
    public notes: string;
    public source_id: Number;
    public sourceName: string;
    public sourceIban: string;
    public sourceType: string;
    public destination_id: Number;
    public destinationName: string;
    public destinationIban: string;
    public destinationType: string;

    //Extra
    public synced: boolean = false;

    public constructor(data){
        this.amount = data.amount;
        this.source_id = data.source;
        this.destination_id = data.destination;
        this.currency_code = data.currency_code;
        this.category_id = data.category_id;

        /*
        "updated_at": "2018-05-25T23:38:38+00:00",
        "created_at": "2018-05-25T23:38:38+00:00",
        "description": "Freetime",
        "transaction_description": null,
        "date": "2018-05-25",
        "type": "Withdrawal",
        "identifier": 0,
        "journal_id": 3387,
        "reconciled": false,
        "amount": -3.23,
        "currency_id": 4,
        "currency_code": "USD",
        "currency_symbol": "$",
        "currency_dp": 2,
        "foreign_amount": null,
        "foreign_currency_id": null,
        "foreign_currency_code": null,
        "foreign_currency_symbol": null,
        "foreign_currency_dp": null,
        "bill_id": null,
        "bill_name": null,
        "category_id": 63,
        "category_name": "Entertainment",
        "budget_id": null,
        "budget_name": null,
        "notes": null,
        "source_id": 16,
        "source_name": "Chase Amazon Credit Card",
        "source_iban": "",
        "source_type": "Asset account",
        "destination_id": 26,
        "destination_name": "Amazon",
        "destination_iban": null,
        "destination_type": "Expense account"
        */
    }

}