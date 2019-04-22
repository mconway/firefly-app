import { BaseRepository } from './base.repository';
import { ChartModel } from '../models/chart.model';

export class ChartRepository extends BaseRepository<ChartModel>{
    protected endpoint: string = '/chart/category/overview';
    protected model = ChartModel;

    // This needs to be more dynamic
    getEndpoint(){
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), this.month, 1).toISOString().slice(0, 10);
        var lastDay = new Date(date.getFullYear(), this.month + 1, 0).toISOString().slice(0, 10);
        return this.endpoint + "?start=" + firstDay + "&end=" + lastDay;
    }
}