import * as wjcChartRadar from 'wijmo/wijmo.chart.radar';
import { Injector, ElementRef } from '@angular/core';
export declare class WjFlexRadar extends wjcChartRadar.FlexRadar {
    constructor(elRef: ElementRef, injector: Injector);
    tooltipContent: any;
    labelContent: any;
}
export declare class WjFlexRadarAxis extends wjcChartRadar.FlexRadarAxis {
    constructor(elRef: ElementRef, injector: Injector);
}
export declare class WjFlexRadarSeries extends wjcChartRadar.FlexRadarSeries {
    constructor(elRef: ElementRef, injector: Injector);
}
export declare class WjChartRadarModule {
}
