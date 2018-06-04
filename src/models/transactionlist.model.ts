import { FireflyRemoteProvider } from "../providers/firefly-remote/firefly-remote";
import { Inject, Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { TransactionModel } from "./transaction.model";

@Injectable()
export class TransactionListModel {
    public meta: any;
    public transactions: any;
    public pending: any = [];
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

            this.processQueued();
            this.saveToStorage();

            this.storage.get('pendingTransactions').then(pending =>{
                if(pending !== null && pending !== undefined)
                {
                    this.pending = pending;
                }
                
            });

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

            this.storage.get('pendingTransactions').then(pending =>{
                if(pending !== null && pending !== undefined)
                {
                    this.pending = pending;
                }
            });

            return this;
        });
    }
    
    public processQueued(){
        return new Promise((resolve, reject) => {
            return this.storage.get('pendingTransactions').then(pending =>{
                var queued = pending;

                if(queued == null || queued == undefined){
                    return;
                }

                //clear out the storage before trying again.
                this.storage.set('pendingTransactions', []);

                for(var i = 0; i < queued.length; i++){
                    //this needs to be cleaned up!
                    var transaction = new TransactionModel(this.fireflyService, this.storage);
                    transaction.loadFromQueue(queued[i]);
                    
                    if(!transaction.synced){
                        transaction.save();
                    }
                }
            });
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