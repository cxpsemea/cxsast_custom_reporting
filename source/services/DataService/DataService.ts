import DataServiceImpl from './DataServiceImpl';

export interface IDataService {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    executeQuery(query: string): Promise<any>;
}

let instance: IDataService;

export default class DataService {
    public static getInstance(): IDataService {
        if (!instance) {
            instance = new DataServiceImpl();
        }
        return instance;
    }
}
