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
* Contains Angular 2 components for the <b>wijmo.gauge</b> module.
*
* <b>wijmo.angular2.gauge</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjGauge from 'wijmo/wijmo.angular2.gauge';
* &nbsp;
* &#64;Component({
*     directives: [wjGauge.WjLinearGauge],
*     template: '&lt;wj-linear-gauge [(value)]="amount" [isReadOnly]="false"&gt;&lt;/wj-linear-gauge&gt;',
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     amount = 0;
* }</pre>
*
*/
import { EventEmitter, AfterViewInit } from '@angular/core';
import { ElementRef, Injector } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { IWjComponentMetadata } from 'wijmo/wijmo.angular2.directiveBase';
/**
 * Angular 2 component for the @see:wijmo.gauge.LinearGauge control.
 *
 * Use the <b>wj-linear-gauge</b> component to add <b>LinearGauge</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjLinearGauge</b> component is derived from the <b>LinearGauge</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-linear-gauge</b> component may contain a @see:wijmo/wijmo.angular2.gauge.WjRange child component.
*/
export declare class WjLinearGauge extends wijmo.gauge.LinearGauge implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjModelProperty: string;
    gotFocusNg: EventEmitter<{}>;
    lostFocusNg: EventEmitter<{}>;
    valueChangedNg: EventEmitter<{}>;
    valueChangePC: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
/**
 * Angular 2 component for the @see:wijmo.gauge.BulletGraph control.
 *
 * Use the <b>wj-bullet-graph</b> component to add <b>BulletGraph</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjBulletGraph</b> component is derived from the <b>BulletGraph</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-bullet-graph</b> component may contain a @see:wijmo/wijmo.angular2.gauge.WjRange child component.
*/
export declare class WjBulletGraph extends wijmo.gauge.BulletGraph implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjModelProperty: string;
    gotFocusNg: EventEmitter<{}>;
    lostFocusNg: EventEmitter<{}>;
    valueChangedNg: EventEmitter<{}>;
    valueChangePC: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
/**
 * Angular 2 component for the @see:wijmo.gauge.RadialGauge control.
 *
 * Use the <b>wj-radial-gauge</b> component to add <b>RadialGauge</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjRadialGauge</b> component is derived from the <b>RadialGauge</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-radial-gauge</b> component may contain a @see:wijmo/wijmo.angular2.gauge.WjRange child component.
*/
export declare class WjRadialGauge extends wijmo.gauge.RadialGauge implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjModelProperty: string;
    gotFocusNg: EventEmitter<{}>;
    lostFocusNg: EventEmitter<{}>;
    valueChangedNg: EventEmitter<{}>;
    valueChangePC: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
/**
 * Angular 2 component for the @see:wijmo.gauge.Range control.
 *
 * The <b>wj-range</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.gauge.WjLinearGauge
 * , @see:wijmo/wijmo.angular2.gauge.WjBulletGraph
 *  or @see:wijmo/wijmo.angular2.gauge.WjRadialGauge.
 *
 * Use the <b>wj-range</b> component to add <b>Range</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjRange</b> component is derived from the <b>Range</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjRange extends wijmo.gauge.Range implements OnInit, OnDestroy, AfterViewInit {
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
export declare class WjGaugeModule {
}
