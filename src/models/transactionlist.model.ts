import { FireflyRemoteProvider } from "../providers/firefly-remote/firefly-remote";
import { Inject, Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';

@Injectable()
export class TransactionListModel {
    public meta: any;
    public transactions: any;
    public lastUpdated: Date;
    public transactionTypeIcons: any = {
        'Withdrawal': 'md-arrow-back',
        'Deposit': 'md-arrow-forward',
        'Transfer': 'md-shuffle',
    };

    constructor(@Inject(FireflyRemoteProvider) private fireflyService, @Inject(Storage) private storage){

    }

    getTransactions(refresh: boolean = false) {
        if(refresh){
            return this.getTransactionsFromService();
        }else{
            return this.getTransactionsFromCache();
        }
    }

    private getTransactionsFromService() {
        return this.fireflyService.getTransactions().then((data) => {
            this.meta = data['meta'];
            this.transactions = data['data'];
            this.lastUpdated = new Date();

            this.saveToStorage();

            return this;
        });
    }

    private getTransactionsFromCache() {
        return this.storage.get('transactions').then((data) => {
            if(!data)
                data = { transactions: [] }

            this.meta = data['meta'];
            this.transactions = data['transactions'];
            this.lastUpdated = data['lastUpdated'];

            return this;
        });
    }
    
    private saveToStorage(){
        this.storage.set('transactions', {
            meta: this.meta,
            transactions: this.transactions,
            lastUpdated: this.lastUpdated
        });
    }
}