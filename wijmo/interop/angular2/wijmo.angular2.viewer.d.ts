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
* Contains Angular 2 components for the <b>wijmo.viewer</b> module.
*
* <b>wijmo.angular2.viewer</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjViewer from 'wijmo/wijmo.angular2.viewer';
* &nbsp;
* &#64;Component({
*     directives: [wjViewer.WjReportViewer, wjViewer.WjPdfViewer],
*     template: `
*       &lt;wj-report-viewer [reportName]="sales" [serviceUrl]="'webserviceApi'"&gt;
*       &lt;/wj-report-viewer;`,
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
 * Angular 2 component for the @see:wijmo.viewer.ReportViewer control.
 *
 * Use the <b>wj-report-viewer</b> component to add <b>ReportViewer</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjReportViewer</b> component is derived from the <b>ReportViewer</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjReportViewer extends wijmo.viewer.ReportViewer implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjModelProperty: string;
    pageIndexChangedNg: EventEmitter<{}>;
    viewModeChangedNg: EventEmitter<{}>;
    viewModeChangePC: EventEmitter<{}>;
    selectMouseModeChangedNg: EventEmitter<{}>;
    selectMouseModeChangePC: EventEmitter<{}>;
    fullScreenChangedNg: EventEmitter<{}>;
    fullScreenChangePC: EventEmitter<{}>;
    zoomFactorChangedNg: EventEmitter<{}>;
    zoomFactorChangePC: EventEmitter<{}>;
    queryLoadingDataNg: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
/**
 * Angular 2 component for the @see:wijmo.viewer.PdfViewer control.
 *
 * Use the <b>wj-pdf-viewer</b> component to add <b>PdfViewer</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjPdfViewer</b> component is derived from the <b>PdfViewer</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjPdfViewer extends wijmo.viewer.PdfViewer implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjModelProperty: string;
    pageIndexChangedNg: EventEmitter<{}>;
    viewModeChangedNg: EventEmitter<{}>;
    viewModeChangePC: EventEmitter<{}>;
    selectMouseModeChangedNg: EventEmitter<{}>;
    selectMouseModeChangePC: EventEmitter<{}>;
    fullScreenChangedNg: EventEmitter<{}>;
    fullScreenChangePC: EventEmitter<{}>;
    zoomFactorChangedNg: EventEmitter<{}>;
    zoomFactorChangePC: EventEmitter<{}>;
    queryLoadingDataNg: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
export declare class WjViewerModule {
}
