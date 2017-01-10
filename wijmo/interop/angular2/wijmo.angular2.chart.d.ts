/*
    *
    * Wijmo Library 5.20163.254
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the Wijmo Commercial License.
    * sales@wijmo.com
    * http://wijmo.com/products/wijmo-5/license/
    *
    */
/**
* Contains Angular 2 components for the <b>wijmo.chart</b> module.
*
* <b>wijmo.angular2.chart</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjChart from 'wijmo/wijmo.angular2.chart';
* &nbsp;
* &#64;Component({
*     directives: [wjChart.WjFlexChart, wjChart.WjFlexChartSeries],
*     template: `
*       &lt;wj-flex-chart [itemsSource]="data" [bindingX]="'x'"&gt;
*           &lt;wj-flex-chart-series [binding]="'y'"&gt;&lt;/wj-flex-chart-series&gt;
*       &lt;/wj-flex-chart&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
import { EventEmitter, AfterViewInit } from '@angular/core';
import { ElementRef, Injector } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { IWjComponentMetadata } from 'wijmo/wijmo.angular2.directiveBase';
/**
 * Angular 2 component for the @see:wijmo.chart.FlexChart control.
 *
 * Use the <b>wj-flex-chart</b> component to add <b>FlexChart</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChart</b> component is derived from the <b>FlexChart</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-flex-chart</b> component may contain the following child components:
 * @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartTrendLine
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartMovingAverage
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartYFunctionSeries
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartParametricFunctionSeries
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartWaterfall
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartBoxWhisker
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartErrorBar
 * , @see:wijmo/wijmo.angular2.chart.animation.WjFlexChartAnimation
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer
 * , @see:wijmo/wijmo.angular2.chart.interaction.WjFlexChartRangeSelector
 * , @see:wijmo/wijmo.angular2.chart.interaction.WjFlexChartGestures
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartAxis
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartLegend
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartDataLabel
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartSeries
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartLineMarker
 *  and @see:wijmo/wijmo.angular2.chart.WjFlexChartPlotArea.
*/
export declare class WjFlexChart extends wijmo.chart.FlexChart implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjModelProperty: string;
    gotFocusNg: EventEmitter<{}>;
    lostFocusNg: EventEmitter<{}>;
    renderingNg: EventEmitter<{}>;
    renderedNg: EventEmitter<{}>;
    seriesVisibilityChangedNg: EventEmitter<{}>;
    selectionChangedNg: EventEmitter<{}>;
    selectionChangePC: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    tooltipContent: any;
    labelContent: any;
}
/**
 * Angular 2 component for the @see:wijmo.chart.FlexPie control.
 *
 * Use the <b>wj-flex-pie</b> component to add <b>FlexPie</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexPie</b> component is derived from the <b>FlexPie</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-flex-pie</b> component may contain the following child components:
 * @see:wijmo/wijmo.angular2.chart.animation.WjFlexChartAnimation
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartLegend
 *  and @see:wijmo/wijmo.angular2.chart.WjFlexPieDataLabel.
*/
export declare class WjFlexPie extends wijmo.chart.FlexPie implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjModelProperty: string;
    gotFocusNg: EventEmitter<{}>;
    lostFocusNg: EventEmitter<{}>;
    renderingNg: EventEmitter<{}>;
    renderedNg: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    tooltipContent: any;
    labelContent: any;
}
/**
 * Angular 2 component for the @see:wijmo.chart.Axis control.
 *
 * The <b>wj-flex-chart-axis</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartSeries
 * , @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChartSeries.
 *
 * Use the <b>wj-flex-chart-axis</b> component to add <b>Axis</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartAxis</b> component is derived from the <b>Axis</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjFlexChartAxis extends wijmo.chart.Axis implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjProperty: string;
    rangeChangedNg: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
/**
 * Angular 2 component for the @see:wijmo.chart.Legend control.
 *
 * The <b>wj-flex-chart-legend</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 * , @see:wijmo/wijmo.angular2.chart.WjFlexPie
 * , @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart
 * , @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadar
 *  or @see:wijmo/wijmo.angular2.chart.hierarchical.WjSunburst.
 *
 * Use the <b>wj-flex-chart-legend</b> component to add <b>Legend</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartLegend</b> component is derived from the <b>Legend</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjFlexChartLegend extends wijmo.chart.Legend implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjProperty: string;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
/**
 * Angular 2 component for the @see:wijmo.chart.DataLabel control.
 *
 * The <b>wj-flex-chart-data-label</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.WjFlexChart component.
 *
 * Use the <b>wj-flex-chart-data-label</b> component to add <b>DataLabel</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartDataLabel</b> component is derived from the <b>DataLabel</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjFlexChartDataLabel extends wijmo.chart.DataLabel implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjProperty: string;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
/**
 * Angular 2 component for the @see:wijmo.chart.PieDataLabel control.
 *
 * The <b>wj-flex-pie-data-label</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.WjFlexPie component.
 *
 * Use the <b>wj-flex-pie-data-label</b> component to add <b>PieDataLabel</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexPieDataLabel</b> component is derived from the <b>PieDataLabel</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjFlexPieDataLabel extends wijmo.chart.PieDataLabel implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjProperty: string;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
/**
 * Angular 2 component for the @see:wijmo.chart.Series control.
 *
 * The <b>wj-flex-chart-series</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.WjFlexChart component.
 *
 * Use the <b>wj-flex-chart-series</b> component to add <b>Series</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartSeries</b> component is derived from the <b>Series</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-flex-chart-series</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartAxis child component.
*/
export declare class WjFlexChartSeries extends wijmo.chart.Series implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjProperty: string;
    renderingNg: EventEmitter<{}>;
    renderedNg: EventEmitter<{}>;
    visibilityChangePC: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
/**
 * Angular 2 component for the @see:wijmo.chart.LineMarker control.
 *
 * The <b>wj-flex-line-marker</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
 *
 * Use the <b>wj-flex-line-marker</b> component to add <b>LineMarker</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartLineMarker</b> component is derived from the <b>LineMarker</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjFlexChartLineMarker extends wijmo.chart.LineMarker implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjProperty: string;
    positionChangedNg: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
/**
 * Angular 2 component for the @see:wijmo.chart.DataPoint control.
 *
 * The <b>wj-flex-chart-data-point</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationText
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationEllipse
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationRectangle
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLine
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationPolygon
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationCircle
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationSquare
 *  or @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationImage.
 *
 * Use the <b>wj-flex-chart-data-point</b> component to add <b>DataPoint</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartDataPoint</b> component is derived from the <b>DataPoint</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjFlexChartDataPoint extends wijmo.chart.DataPoint implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjProperty: string;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
/**
 * Angular 2 component for the @see:wijmo.chart.PlotArea control.
 *
 * The <b>wj-flex-chart-plot-area</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
 *
 * Use the <b>wj-flex-chart-plot-area</b> component to add <b>PlotArea</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartPlotArea</b> component is derived from the <b>PlotArea</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjFlexChartPlotArea extends wijmo.chart.PlotArea implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjProperty: string;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
export declare class WjChartModule {
}
