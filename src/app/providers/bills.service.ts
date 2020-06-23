import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BillModel } from '../models/bill.model';

@Injectable({
  providedIn: 'root'
})
export class BillsService extends BaseService<BillModel>{
  protected endpoint: string = '/bills';
  protected model = BillModel;

  getEndpoint(){
      var date = new Date();
      var firstDay = new Date(date.getFullYear()-1, this.month, 1).toISOString().slice(0, 10);
      var lastDay = new Date(date.getFullYear(), this.month + 1, 0).toISOString().slice(0, 10);
      return this.endpoint + "?start=" + firstDay + "&end=" + lastDay;
  }
}
