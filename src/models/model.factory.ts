export class ModelFactory
{
    public static create<T>(c: {new(): T; }): T {
        return new c();
    }
}