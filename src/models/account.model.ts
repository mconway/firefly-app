export class AccountModel {
    public id: number;
    public name: string;
    public currencyCode: string;
    public currencySymbol: string;
    public currentBalance: number;
    public type: string;
    public role: string;
    public virtualBalance: number;

    public hydrate(apiData: any){
        this.id = apiData.id;
        this.name = apiData.attributes.name;
        this.currencyCode = apiData.attributes.currency_code;
        this.currencySymbol = apiData.attributes.currency_symbol;
        this.currentBalance = apiData.attributes.current_balance;
        this.role = apiData.attributes.role;
        this.type = apiData.attributes.type;
        this.virtualBalance = apiData.attributes.virtual_balance;
    }
}