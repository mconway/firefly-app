import { FireflyRemoteProvider } from "../providers/firefly-remote/firefly-remote";
import { Inject, Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { TransactionItemModel } from "./transactionItem.model";

@Injectable()
export class TransactionModel{

    public type: string;
    public description: string;
    public date: Date;
    public transactions: TransactionItemModel[] = [];
    public synced: boolean = false;

    public constructor(@Inject(FireflyRemoteProvider) private fireflyService, @Inject(Storage) private storage){

    }

    public save() {
        return new Promise((resolve,reject) => {    

            var data = {
                type: this.type,
                description: this.description,
                date: this.date,
                transactions: this.transactions
            }

            this.fireflyService.postTransaction(data).then( () => {
                console.log(data);
                return resolve("Transaction Created Successfully");
            }).catch( err => {
                return resolve("An error was encountered while saving your transaction");
            });
        });
    }

    public loadFromForm(formData: any){
        this.type = formData.type;
        this.description= formData.description;
        this.date = formData.date;

        // Only 1 sub item can be added for now
        this.transactions.push(new TransactionItemModel(formData));

        return this;
    }
}