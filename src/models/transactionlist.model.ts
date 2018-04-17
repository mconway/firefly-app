import { FireflyRemoteProvider } from "../providers/firefly-remote/firefly-remote";
import { Inject, Injectable } from "@angular/core";

@Injectable()
export class TransactionListModel {
    public transactions: any;

    constructor(@Inject(FireflyRemoteProvider) private fireflyService){

    }

    getTransactions() {
        return this.fireflyService.getTransactions().then((data) => {
            this.transactions = data['data'];
            return this;
        });
    }
}