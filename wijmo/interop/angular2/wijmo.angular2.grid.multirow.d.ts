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
* Contains Angular 2 components for the <b>wijmo.grid.multirow</b> module.
*
* <b>wijmo.angular2.grid.multirow</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjMultiRow from 'wijmo/wijmo.angular2.grid.multirow';
* &nbsp;
* &#64;Component({
*     directives: [wjMultiRow.WjMultiRow],
*     template: `&lt;wj-multi-row&gt;&lt;/wj-multi-row&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
* }</pre>
*
*/
import { EventEmitter, AfterViewInit } from '@angular/core';
import { ElementRef, Injector } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { IWjComponentMetadata } from 'wijmo/wijmo.angular2.directiveBase';
/**
 * Angular 2 component for the @see:wijmo.grid.multirow.MultiRow control.
 *
 * Use the <b>wj-multi-row</b> component to add <b>MultiRow</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjMultiRow</b> component is derived from the <b>MultiRow</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjMultiRow extends wijmo.grid.multirow.MultiRow implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjModelProperty: string;
    gotFocusNg: EventEmitter<{}>;
    lostFocusNg: EventEmitter<{}>;
    beginningEditNg: EventEmitter<{}>;
    cellEditEndedNg: EventEmitter<{}>;
    cellEditEndingNg: EventEmitter<{}>;
    prepareCellForEditNg: EventEmitter<{}>;
    formatItemNg: EventEmitter<{}>;
    resizingColumnNg: EventEmitter<{}>;
    resizedColumnNg: EventEmitter<{}>;
    autoSizingColumnNg: EventEmitter<{}>;
    autoSizedColumnNg: EventEmitter<{}>;
    draggingColumnNg: EventEmitter<{}>;
    draggedColumnNg: EventEmitter<{}>;
    sortingColumnNg: EventEmitter<{}>;
    sortedColumnNg: EventEmitter<{}>;
    resizingRowNg: EventEmitter<{}>;
    resizedRowNg: EventEmitter<{}>;
    autoSizingRowNg: EventEmitter<{}>;
    autoSizedRowNg: EventEmitter<{}>;
    draggingRowNg: EventEmitter<{}>;
    draggedRowNg: EventEmitter<{}>;
    deletingRowNg: EventEmitter<{}>;
    loadingRowsNg: EventEmitter<{}>;
    loadedRowsNg: EventEmitter<{}>;
    rowEditStartingNg: EventEmitter<{}>;
    rowEditStartedNg: EventEmitter<{}>;
    rowEditEndingNg: EventEmitter<{}>;
    rowEditEndedNg: EventEmitter<{}>;
    rowAddedNg: EventEmitter<{}>;
    groupCollapsedChangedNg: EventEmitter<{}>;
    groupCollapsedChangingNg: EventEmitter<{}>;
    itemsSourceChangedNg: EventEmitter<{}>;
    selectionChangingNg: EventEmitter<{}>;
    selectionChangedNg: EventEmitter<{}>;
    scrollPositionChangedNg: EventEmitter<{}>;
    updatingViewNg: EventEmitter<{}>;
    updatedViewNg: EventEmitter<{}>;
    updatingLayoutNg: EventEmitter<{}>;
    updatedLayoutNg: EventEmitter<{}>;
    pastingNg: EventEmitter<{}>;
    pastedNg: EventEmitter<{}>;
    pastingCellNg: EventEmitter<{}>;
    pastedCellNg: EventEmitter<{}>;
    copyingNg: EventEmitter<{}>;
    copiedNg: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
export declare class WjGridMultirowModule {
}
