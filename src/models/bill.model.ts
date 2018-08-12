import { FireflyRemoteProvider } from "../providers/firefly-remote/firefly-remote";
import { Inject, Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';

export class BillModel {
    id: number;
    name: string;
    currencyId: number;
    currencyCode: string;
    amountMin: number;
    amountMax: number;
    active: boolean;
    payDates: any;
    paidDates: any;
    nextExpectedMatch: Date;
    repeatFreq: string;

    constructor(billResult: any){
        if(billResult !== undefined && billResult !== null)
            this.hydrate(billResult)
    }

    public hydrate(billResult: any){
        this.id = billResult.id;
        this.name = billResult.attributes.name;
        this.amountMin = billResult.attributes.amount_min;
        this.amountMax = billResult.attributes.amount_max;
        this.active = billResult.attributes.active;
        this.payDates = billResult.attributes.pay_dates;
        this.paidDates = billResult.attributes.paid_dates;
        // Force 00:00:00 so that dates don't have time taken away when converting to locale.
        this.nextExpectedMatch = new Date(billResult.attributes.next_expected_match + " 00:00:00");
        this.repeatFreq = billResult.attributes.repeat_freq;

        //added in API v0.3
        //if(apiVersion > 0.3)
        this.currencyId = billResult.attributes.currency_id;
        this.currencyCode = billResult.attributes.currency_code;
    }
}