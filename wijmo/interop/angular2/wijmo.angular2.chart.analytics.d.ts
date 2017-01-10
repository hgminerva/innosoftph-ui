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
* Contains Angular 2 components for the <b>wijmo.chart.analytics</b> module.
*
* <b>wijmo.angular2.chart.analytics</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjAnalitics from 'wijmo/wijmo.angular2.chart.analytics';</pre>
*
*/
import { EventEmitter, AfterViewInit } from '@angular/core';
import { ElementRef, Injector } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { IWjComponentMetadata } from 'wijmo/wijmo.angular2.directiveBase';
/**
 * Angular 2 component for the @see:wijmo.chart.analytics.TrendLine control.
 *
 * The <b>wj-flex-chart-trend-line</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
 *
 * Use the <b>wj-flex-chart-trend-line</b> component to add <b>TrendLine</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartTrendLine</b> component is derived from the <b>TrendLine</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjFlexChartTrendLine extends wijmo.chart.analytics.TrendLine implements OnInit, OnDestroy, AfterViewInit {
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
 * Angular 2 component for the @see:wijmo.chart.analytics.MovingAverage control.
 *
 * The <b>wj-flex-chart-moving-average</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
 *
 * Use the <b>wj-flex-chart-moving-average</b> component to add <b>MovingAverage</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartMovingAverage</b> component is derived from the <b>MovingAverage</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjFlexChartMovingAverage extends wijmo.chart.analytics.MovingAverage implements OnInit, OnDestroy, AfterViewInit {
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
 * Angular 2 component for the @see:wijmo.chart.analytics.YFunctionSeries control.
 *
 * The <b>wj-flex-chart-y-function-series</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
 *
 * Use the <b>wj-flex-chart-y-function-series</b> component to add <b>YFunctionSeries</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartYFunctionSeries</b> component is derived from the <b>YFunctionSeries</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjFlexChartYFunctionSeries extends wijmo.chart.analytics.YFunctionSeries implements OnInit, OnDestroy, AfterViewInit {
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
 * Angular 2 component for the @see:wijmo.chart.analytics.ParametricFunctionSeries control.
 *
 * The <b>wj-flex-chart-parametric-function-series</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
 *
 * Use the <b>wj-flex-chart-parametric-function-series</b> component to add <b>ParametricFunctionSeries</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartParametricFunctionSeries</b> component is derived from the <b>ParametricFunctionSeries</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjFlexChartParametricFunctionSeries extends wijmo.chart.analytics.ParametricFunctionSeries implements OnInit, OnDestroy, AfterViewInit {
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
 * Angular 2 component for the @see:wijmo.chart.analytics.Waterfall control.
 *
 * The <b>wj-flex-chart-waterfall</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
 *
 * Use the <b>wj-flex-chart-waterfall</b> component to add <b>Waterfall</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartWaterfall</b> component is derived from the <b>Waterfall</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjFlexChartWaterfall extends wijmo.chart.analytics.Waterfall implements OnInit, OnDestroy, AfterViewInit {
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
 * Angular 2 component for the @see:wijmo.chart.analytics.BoxWhisker control.
 *
 * The <b>wj-flex-chart-box-whisker</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
 *
 * Use the <b>wj-flex-chart-box-whisker</b> component to add <b>BoxWhisker</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartBoxWhisker</b> component is derived from the <b>BoxWhisker</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjFlexChartBoxWhisker extends wijmo.chart.analytics.BoxWhisker implements OnInit, OnDestroy, AfterViewInit {
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
 * Angular 2 component for the @see:wijmo.chart.analytics.ErrorBar control.
 *
 * The <b>wj-flex-chart-error-bar</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.WjFlexChart component.
 *
 * Use the <b>wj-flex-chart-error-bar</b> component to add <b>ErrorBar</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartErrorBar</b> component is derived from the <b>ErrorBar</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjFlexChartErrorBar extends wijmo.chart.analytics.ErrorBar implements OnInit, OnDestroy, AfterViewInit {
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
export declare class WjChartAnalyticsModule {
}
