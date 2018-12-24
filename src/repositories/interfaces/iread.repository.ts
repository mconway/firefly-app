export interface IRead<T>{
    find(item: T): Promise<T[]>;
    findOne(id: number): Promise<T>;
    getAll(month: number): Promise<T[]>;
    getOne(id: number): Promise<T>;
}