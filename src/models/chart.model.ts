export class ChartModel {
    label: string;
    currencyId: number;
    currencyCode: string;
    currencySymbol: string;
    currencyDecimalPlaces: number;
    type: string;
    yAxisId: number;
    entries: any;

    constructor(result: any){
        if(result !== undefined && result !== null)
            this.hydrate(result)
    }

    public hydrate(result: any){
        if(result === undefined){
            return;
        }
        
        this.label = result.label;
        this.currencyId = result.currency_id;
        this.currencyCode = result.currency_code;
        this.currencySymbol = result.currency_symbol;
        this.currencyDecimalPlaces = result.currency_decimal_places;
        this.type = result.type;
        this.yAxisId = result.yAxisId;
        this.entries = result.entries;
    }
}