import * as wjcChartHierarchical from 'wijmo/wijmo.chart.hierarchical';
import { Injector, ElementRef } from '@angular/core';
export declare class WjSunburst extends wjcChartHierarchical.Sunburst {
    constructor(elRef: ElementRef, injector: Injector);
    tooltipContent: any;
    labelContent: any;
}
export declare class WjChartHierarchicalModule {
}
