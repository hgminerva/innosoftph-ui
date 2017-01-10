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
* Contains Angular 2 components for the <b>wijmo.grid.sheet</b> module.
*
* <b>wijmo.angular2.grid.sheet</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjSheet from 'wijmo/wijmo.angular2.grid.sheet';
* &nbsp;
* &#64;Component({
*     directives: [wjSheet.WjFlexSheet],
*     template: `&lt;wj-flex-sheet&gt;&lt;/wj-flex-sheet&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
* }</pre>
*
*/
import { EventEmitter, AfterViewInit } from '@angular/core';
import { ElementRef, Injector } from '@angular/core';
import { OnInit, OnDestroy, SimpleChange } from '@angular/core';
import { IWjComponentMetadata } from 'wijmo/wijmo.angular2.directiveBase';
/**
 * Angular 2 component for the @see:wijmo.grid.sheet.FlexSheet control.
 *
 * Use the <b>wj-flex-sheet</b> component to add <b>FlexSheet</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexSheet</b> component is derived from the <b>FlexSheet</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-flex-sheet</b> component may contain a @see:wijmo/wijmo.angular2.grid.sheet.WjSheet child component.
*/
export declare class WjFlexSheet extends wijmo.grid.sheet.FlexSheet implements OnInit, OnDestroy, AfterViewInit {
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
    selectedSheetChangedNg: EventEmitter<{}>;
    selectedSheetIndexChangePC: EventEmitter<{}>;
    draggingRowColumnNg: EventEmitter<{}>;
    droppingRowColumnNg: EventEmitter<{}>;
    loadedNg: EventEmitter<{}>;
    unknownFunctionNg: EventEmitter<{}>;
    sheetClearedNg: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
/**
 * Angular 2 component for the @see:wijmo.grid.sheet.Sheet control.
 *
 * The <b>wj-sheet</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.grid.sheet.WjFlexSheet component.
 *
 * Use the <b>wj-sheet</b> component to add <b>Sheet</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjSheet</b> component is derived from the <b>Sheet</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjSheet extends wijmo.grid.sheet.Sheet implements OnInit, OnDestroy, AfterViewInit {
    boundRowCount: number;
    boundColumnCount: number;
    private _flexSheet;
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjProperty: string;
    nameChangedNg: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): wijmo.grid.sheet.Sheet;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): any;
}
export declare class WjGridSheetModule {
}
