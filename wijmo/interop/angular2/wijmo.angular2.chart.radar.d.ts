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
* Contains Angular 2 components for the <b>wijmo.chart.radar</b> module.
*
* <b>wijmo.angular2.chart.radar</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjRadar from 'wijmo/wijmo.angular2.chart.radar';
* &nbsp;
* &#64;Component({
*     directives: [wjRadar.WjFlexRadar, wjRadar.WjFlexRadarSeries],
*     template: `
*       &lt;wj-flex-radar [itemsSource]="data" [bindingX]="'x'"&gt;
*           &lt;wj-flex-radar-series [binding]="'y'"&gt;&lt;/wj-flex-radar-series&gt;
*       &lt;/wj-flex-radar&gt;`,
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
 * Angular 2 component for the @see:wijmo.chart.radar.FlexRadar control.
 *
 * Use the <b>wj-flex-radar</b> component to add <b>FlexRadar</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexRadar</b> component is derived from the <b>FlexRadar</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-flex-radar</b> component may contain the following child components:
 * @see:wijmo/wijmo.angular2.chart.animation.WjFlexChartAnimation
 * , @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadarAxis
 * , @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadarSeries
 *  and @see:wijmo/wijmo.angular2.chart.WjFlexChartLegend.
*/
export declare class WjFlexRadar extends wijmo.chart.radar.FlexRadar implements OnInit, OnDestroy, AfterViewInit {
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
 * Angular 2 component for the @see:wijmo.chart.radar.FlexRadarAxis control.
 *
 * The <b>wj-flex-radar-axis</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadar
 *  or @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadarSeries.
 *
 * Use the <b>wj-flex-radar-axis</b> component to add <b>FlexRadarAxis</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexRadarAxis</b> component is derived from the <b>FlexRadarAxis</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjFlexRadarAxis extends wijmo.chart.radar.FlexRadarAxis implements OnInit, OnDestroy, AfterViewInit {
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
 * Angular 2 component for the @see:wijmo.chart.radar.FlexRadarSeries control.
 *
 * The <b>wj-flex-radar-series</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadar component.
 *
 * Use the <b>wj-flex-radar-series</b> component to add <b>FlexRadarSeries</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexRadarSeries</b> component is derived from the <b>FlexRadarSeries</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-flex-radar-series</b> component may contain a @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadarAxis child component.
*/
export declare class WjFlexRadarSeries extends wijmo.chart.radar.FlexRadarSeries implements OnInit, OnDestroy, AfterViewInit {
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
export declare class WjChartRadarModule {
}
