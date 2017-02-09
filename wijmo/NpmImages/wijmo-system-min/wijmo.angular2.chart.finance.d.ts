import * as wjcChartFinance from 'wijmo/wijmo.chart.finance';
import { EventEmitter, AfterViewInit } from '@angular/core';
import { ElementRef, Injector } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { IWjComponentMetadata } from 'wijmo/wijmo.angular2.directiveBase';
export declare class WjFinancialChart extends wjcChartFinance.FinancialChart implements OnInit, OnDestroy, AfterViewInit {
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
export declare class WjFinancialChartSeries extends wjcChartFinance.FinancialSeries implements OnInit, OnDestroy, AfterViewInit {
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
