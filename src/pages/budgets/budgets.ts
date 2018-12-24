import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { BudgetLimitRepository } from '../../repositories/budgetlimit.repository';
import { BudgetRepository } from '../../repositories/budget.repository';
import { BudgetLimitModel } from '../../models/budgetlimit.model';

@Component({
  selector: 'page-home',
  templateUrl: 'budgets.html'
})

export class BudgetsPage {
  private loader: any;
  private budgets: any;
  private month: number; 

  constructor(
    public navCtrl: NavController, 
    private budgetRepo: BudgetRepository,
    private budgetLimitRepo: BudgetLimitRepository, 
    private loadingCtrl: LoadingController) 
  { 
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });

    this.loader.present();

    Promise.all([this.budgetRepo.getAll(this.month, true, false), this.budgetLimitRepo.getAll(this.month, true, false)]).then( (values) => {
      this.budgets = this.initiateBudgets(values);
      this.loader.dismiss();
    });
  }

  initiateBudgets(data: any[]){
    var budgets = data[0];
    var budgetLimits = data[1];

    var limits: BudgetLimitModel[];

    budgets = budgets.filter(function(b){
      return b.active == true;
    });

    budgets.forEach(budget => {
      budget.limits = budgetLimits.filter(function(b){
        return b.relatedBudget === budget.id;
      });
    });

    return budgets;
  }

  doRefresh(refresher){
    Promise.all([this.budgetRepo.getAll(this.month, true, true), this.budgetLimitRepo.getAll(this.month, true, true)]).then( (values) => {
      this.budgets = this.initiateBudgets(values);
      refresher.complete();
    });
  }

  showDetails(bill){
    this.navCtrl.push(BudgetDetailPage, { bill: bill });
  }
}

@Component({
  templateUrl: 'detail.html'
})
export class BudgetDetailPage {
  private budget;

  constructor(private navParams: NavParams)
  {
    this.budget = this.navParams.get('budget');
  }
}