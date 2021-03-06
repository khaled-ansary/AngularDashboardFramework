/**
 * Created by jayhamilton on 6/24/17.
 */
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RuntimeService } from '../../../services/runtime.service';
import { LineChartWidgetService } from '../line/line-chart-widget.service';

@Injectable()
export class PieChartWidgetService {
    constructor(private _http: Http) {
    }

    get() {
        return this._http.request('/assets/api/disk-model.json')
            .map(res => res.json())
            .catch(RuntimeService.handleError);
    }

    getHelpTopic() {
        return this._http.request('/assets/api/disk-help-model.json')
            .map(res => res.json())
            .catch(RuntimeService.handleError);
    }

    getMockData() {
        return new Observable(observer => {
            Observable.timer(500, 5000).subscribe(t => {
                const used = LineChartWidgetService.getRandomArbitrary(0, 100);
                const available = 100 - used;

                const data = [
                    {
                        'name': 'used',
                        'value': used
                    },
                    {
                        'name': 'available',
                        'value': available
                    }
                ];
                observer.next(data);
            });
        });
    }
}
