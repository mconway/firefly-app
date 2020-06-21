import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { TransactionGroupModel } from '../models/transactiongroup.model';
import { FireflyService } from './firefly.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService extends BaseService<TransactionGroupModel>{

  protected endpoint: string = '/transactions';
  protected model = TransactionGroupModel;

  private getStartDate(){
      var date = new Date();
      return new Date(date.getFullYear(), this.month, 1).toISOString().slice(0, 10);
  }

  private getEndDate(){
      var date = new Date();
      return new Date(date.getFullYear(), this.month + 1, 0).toISOString().slice(0, 10);
  }

  public getEndpoint(){
      return this.endpoint + "?start=" + this.getStartDate() + "&end=" + this.getEndDate();
  }

}
