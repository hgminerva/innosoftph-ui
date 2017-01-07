import * as wjcChartFinance from 'wijmo/wijmo.chart.finance';
import { Injector, ElementRef } from '@angular/core';
export declare class WjFinancialChart extends wjcChartFinance.FinancialChart {
    constructor(elRef: ElementRef, injector: Injector);
    tooltipContent: any;
    labelContent: any;
}
export declare class WjFinancialChartSeries extends wjcChartFinance.FinancialSeries {
    constructor(elRef: ElementRef, injector: Injector);
}
export declare class WjChartFinanceModule {
}
