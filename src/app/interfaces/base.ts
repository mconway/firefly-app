export interface BaseInterface {
    settings: any;
    isConnected: boolean;

    getSettings();

    getHttpHeaders();

    getEntities(endpoint: string, recursive: boolean);

    getEntitiesRecursive(url, headers, entities: any, resolve, reject, recurse);

    updateEntity(endpoint: string, entity: any);

    post(data: any, endpoint: string);
}
