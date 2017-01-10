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
* Contains Angular 2 components for the <b>wijmo.chart.finance</b> module.
*
* <b>wijmo.angular2.chart.finance</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjFinance from 'wijmo/wijmo.angular2.chart.finance';
* &nbsp;
* &#64;Component({
*     directives: [wjFinance.WjFinancialChart, wjFinance.WjFinancialChartSeries],
*     template: `
*       &lt;wj-financial-chart [itemsSource]="data" [bindingX]="'x'"&gt;
*           &lt;wj-financial-chart-series [binding]="'y'"&gt;&lt;/wj-financial-chart-series&gt;
*       &lt;/wj-financial-chart&gt;`,
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
 * Angular 2 component for the @see:wijmo.chart.finance.FinancialChart control.
 *
 * Use the <b>wj-financial-chart</b> component to add <b>FinancialChart</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFinancialChart</b> component is derived from the <b>FinancialChart</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-financial-chart</b> component may contain the following child components:
 * @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartTrendLine
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartMovingAverage
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartYFunctionSeries
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartParametricFunctionSeries
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartWaterfall
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartBoxWhisker
 * , @see:wijmo/wijmo.angular2.chart.animation.WjFlexChartAnimation
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartFibonacci
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartFibonacciArcs
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartFibonacciFans
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartFibonacciTimeZones
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartAtr
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartCci
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartRsi
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartWilliamsR
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartMacd
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartMacdHistogram
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartStochastic
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartBollingerBands
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartEnvelopes
 * , @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChartSeries
 * , @see:wijmo/wijmo.angular2.chart.interaction.WjFlexChartRangeSelector
 * , @see:wijmo/wijmo.angular2.chart.interaction.WjFlexChartGestures
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartAxis
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartLegend
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartLineMarker
 *  and @see:wijmo/wijmo.angular2.chart.WjFlexChartPlotArea.
*/
export declare class WjFinancialChart extends wijmo.chart.finance.FinancialChart implements OnInit, OnDestroy, AfterViewInit {
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
 * Angular 2 component for the @see:wijmo.chart.finance.FinancialSeries control.
 *
 * The <b>wj-financial-chart-series</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
 *
 * Use the <b>wj-financial-chart-series</b> component to add <b>FinancialSeries</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFinancialChartSeries</b> component is derived from the <b>FinancialSeries</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-financial-chart-series</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartAxis child component.
*/
export declare class WjFinancialChartSeries extends wijmo.chart.finance.FinancialSeries implements OnInit, OnDestroy, AfterViewInit {
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
export declare class WjChartFinanceModule {
}
