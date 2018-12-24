export interface IWrite<T>{
    update(delta: any): Promise<T>;
}