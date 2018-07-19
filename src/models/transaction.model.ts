import { FireflyRemoteProvider } from "../providers/firefly-remote/firefly-remote";
import { Inject, Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { TransactionItemModel } from "./transactionItem.model";

@Injectable()
export class TransactionModel{

    public type: string;
    public description: string;
    public date: Date;
    public categoryId: number;
    public transactions: TransactionItemModel[] = [];
    public synced: boolean = false;

    public constructor(@Inject(FireflyRemoteProvider) private fireflyService, @Inject(Storage) private storage){
        console.log(this.fireflyService.isConnected);
    }

    public save() {
        return new Promise((resolve,reject) => {    

            var data = {
                type: this.type,
                description: this.description,
                date: this.date,
                category_id: this.categoryId,
                transactions: this.transactions
            }

            if(this.fireflyService.isConnected){
                this.fireflyService.postTransaction(data).then( () => {
                    this.synced = true;
                    return resolve("Transaction Created Successfully");
                }).catch( err => {
                    return resolve("An error was encountered while saving your transaction");
                });
            }
            else{
                this.storage.get("pendingTransactions").then( pendingTransactions => {
                    var pending = pendingTransactions;

                    if(pending == null || pending == undefined){
                        pending = [];
                    }

                    pending.push(data);
                    this.storage.set("pendingTransactions", pending);
                    return resolve("Transaction Queued");
                });
            }

        });
    }

    public loadFromQueue(queueData: any){
        this.type = queueData.type;
        this.description= queueData.description;
        this.date = queueData.date;

        // Only 1 sub item can be added for now
        this.transactions = queueData.transactions;

        return this;
    }

    public loadFromForm(formData: any){
        this.type = formData.type;
        this.description= formData.description;
        this.date = formData.date;
        this.categoryId = formData.category_id;

        // Only 1 sub item can be added for now
        this.transactions.push(new TransactionItemModel(formData));

        return this;
    }
}