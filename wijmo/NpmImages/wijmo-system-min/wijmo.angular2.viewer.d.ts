import * as wjcViewer from 'wijmo/wijmo.viewer';
import { EventEmitter, AfterViewInit } from '@angular/core';
import { ElementRef, Injector } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { IWjComponentMetadata } from 'wijmo/wijmo.angular2.directiveBase';
export declare class WjReportViewer extends wjcViewer.ReportViewer implements OnInit, OnDestroy, AfterViewInit {
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
export declare class WjPdfViewer extends wjcViewer.PdfViewer implements OnInit, OnDestroy, AfterViewInit {
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
