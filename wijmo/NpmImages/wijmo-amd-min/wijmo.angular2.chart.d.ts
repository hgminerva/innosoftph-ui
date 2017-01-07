import * as wjcChart from 'wijmo/wijmo.chart';
import { ElementRef, Injector } from '@angular/core';
export declare class WjFlexChart extends wjcChart.FlexChart {
    constructor(elRef: ElementRef, injector: Injector);
    tooltipContent: any;
    labelContent: any;
}
export declare class WjFlexPie extends wjcChart.FlexPie {
    constructor(elRef: ElementRef, injector: Injector);
    tooltipContent: any;
    labelContent: any;
}
export declare class WjFlexChartAxis extends wjcChart.Axis {
    constructor(elRef: ElementRef, injector: Injector);
}
export declare class WjFlexChartLegend extends wjcChart.Legend {
    constructor(elRef: ElementRef, injector: Injector);
}
export declare class WjFlexChartDataLabel extends wjcChart.DataLabel {
    constructor(elRef: ElementRef, injector: Injector);
}
export declare class WjFlexPieDataLabel extends wjcChart.PieDataLabel {
    constructor(elRef: ElementRef, injector: Injector);
}
export declare class WjFlexChartSeries extends wjcChart.Series {
    static SiblingId: string;
    constructor(elRef: ElementRef, injector: Injector);
}
export declare class WjFlexChartLineMarker extends wjcChart.LineMarker {
    constructor(elRef: ElementRef, injector: Injector);
}
export declare class WjFlexChartDataPoint extends wjcChart.DataPoint {
    constructor(elRef: ElementRef, injector: Injector);
}
export declare class WjFlexChartPlotArea extends wjcChart.PlotArea {
    constructor(elRef: ElementRef, injector: Injector);
}
export declare class WjChartModule {
}
