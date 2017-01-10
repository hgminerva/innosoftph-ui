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
* Contains Angular 2 components for the <b>wijmo.chart.animation</b> module.
*
* <b>wijmo.angular2.chart.animation</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjAnimation from 'wijmo/wijmo.angular2.chart.animation';
* import * as wjChart from 'wijmo/wijmo.angular2.chart';
* &nbsp;
* &#64;Component({
*     directives: [wjChart.WjFlexChart, wjAnimation.WjFlexChartAnimation, wjChart.WjFlexChartSeries],
*     template: `
*       &lt;wj-flex-chart [itemsSource]="data" [bindingX]="'x'"&gt;
*           &lt;wj-flex-chart-animation [animationMode]="'Point'"&gt;&lt;/wj-flex-chart-animation&gt;
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
 * Angular 2 component for the @see:wijmo.chart.animation.ChartAnimation control.
 *
 * The <b>wj-flex-chart-animation</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 * , @see:wijmo/wijmo.angular2.chart.WjFlexPie
 * , @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart
 *  or @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadar.
 *
 * Use the <b>wj-flex-chart-animation</b> component to add <b>ChartAnimation</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartAnimation</b> component is derived from the <b>ChartAnimation</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjFlexChartAnimation extends wijmo.chart.animation.ChartAnimation implements OnInit, OnDestroy, AfterViewInit {
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
export declare class WjChartAnimationModule {
}
