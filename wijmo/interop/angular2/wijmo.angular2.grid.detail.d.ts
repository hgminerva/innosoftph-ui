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
* Contains Angular 2 components for the <b>wijmo.grid.detail</b> module.
*
* <b>wijmo.angular2.grid.detail</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjDetail from 'wijmo/wijmo.angular2.grid.detail';
* import * as wjGrid from 'wijmo/wijmo.angular2.grid';
* &nbsp;
* &#64;Component({
*     directives: [wjGrid.WjFlexGrid, wjDetail.WjFlexGridDetail],
*     template: `
*       &lt;wj-flex-grid [itemsSource]="data"&gt;
*           &lt;template wjFlexGridDetail&gt;
*               Detail row content here...
*           &lt;/template&gt;
*       &lt;/wj-flex-grid&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
import { EventEmitter, AfterViewInit } from '@angular/core';
import { ElementRef, Injector, ViewContainerRef, TemplateRef, Renderer } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { IWjComponentMetadata } from 'wijmo/wijmo.angular2.directiveBase';
export declare class WjFlexGridDetail extends wijmo.grid.detail.FlexGridDetailProvider implements OnInit, OnDestroy, AfterViewInit {
    private static _viewRefProp;
    wjFlexGridDetail: any;
    _viewContainerRef: ViewContainerRef;
    _templateRef: TemplateRef<any>;
    _domRenderer: Renderer;
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any, viewContainerRef: ViewContainerRef, templateRef: TemplateRef<any>, domRenderer: Renderer);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private _init();
}
export declare class WjGridDetailModule {
}
