export interface IRead<T>{
    getAll(): Promise<T[]>;
    find(item: T): Promise<T[]>;
    findOne(id: number): Promise<T>;
}