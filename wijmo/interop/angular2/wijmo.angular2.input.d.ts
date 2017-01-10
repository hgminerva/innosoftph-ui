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
* Contains Angular 2 components for the <b>wijmo.input</b> module.
*
* <b>wijmo.angular2.input</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjInput from 'wijmo/wijmo.angular2.input';
* &nbsp;
* &#64;Component({
*     directives: [wjInput.WjInputNumber],
*     template: '&lt;wj-input-number [(value)]="amount"&gt;&lt;/wj-input-number&gt;',
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     amount = 0;
* }</pre>
*
*/
import { EventEmitter, AfterViewInit } from '@angular/core';
import { ElementRef, Injector, ViewContainerRef, TemplateRef, Renderer } from '@angular/core';
import { OnInit, OnChanges, OnDestroy, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import * as ngCore from '@angular/core';
import { IWjComponentMetadata } from 'wijmo/wijmo.angular2.directiveBase';
/**
 * Angular 2 component for the @see:wijmo.input.ComboBox control.
 *
 * Use the <b>wj-combo-box</b> component to add <b>ComboBox</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjComboBox</b> component is derived from the <b>ComboBox</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-combo-box</b> component may contain a @see:wijmo/wijmo.angular2.input.WjItemTemplate child directive.
*/
export declare class WjComboBox extends wijmo.input.ComboBox implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjModelProperty: string;
    gotFocusNg: EventEmitter<{}>;
    lostFocusNg: EventEmitter<{}>;
    isDroppedDownChangingNg: EventEmitter<{}>;
    isDroppedDownChangedNg: EventEmitter<{}>;
    isDroppedDownChangePC: EventEmitter<{}>;
    textChangedNg: EventEmitter<{}>;
    textChangePC: EventEmitter<{}>;
    formatItemNg: EventEmitter<{}>;
    selectedIndexChangedNg: EventEmitter<{}>;
    selectedIndexChangePC: EventEmitter<{}>;
    selectedItemChangePC: EventEmitter<{}>;
    selectedValueChangePC: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
/**
 * Angular 2 component for the @see:wijmo.input.AutoComplete control.
 *
 * Use the <b>wj-auto-complete</b> component to add <b>AutoComplete</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjAutoComplete</b> component is derived from the <b>AutoComplete</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjAutoComplete extends wijmo.input.AutoComplete implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjModelProperty: string;
    gotFocusNg: EventEmitter<{}>;
    lostFocusNg: EventEmitter<{}>;
    isDroppedDownChangingNg: EventEmitter<{}>;
    isDroppedDownChangedNg: EventEmitter<{}>;
    isDroppedDownChangePC: EventEmitter<{}>;
    textChangedNg: EventEmitter<{}>;
    textChangePC: EventEmitter<{}>;
    formatItemNg: EventEmitter<{}>;
    selectedIndexChangedNg: EventEmitter<{}>;
    selectedIndexChangePC: EventEmitter<{}>;
    selectedItemChangePC: EventEmitter<{}>;
    selectedValueChangePC: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
/**
 * Angular 2 component for the @see:wijmo.input.Calendar control.
 *
 * Use the <b>wj-calendar</b> component to add <b>Calendar</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjCalendar</b> component is derived from the <b>Calendar</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjCalendar extends wijmo.input.Calendar implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjModelProperty: string;
    gotFocusNg: EventEmitter<{}>;
    lostFocusNg: EventEmitter<{}>;
    valueChangedNg: EventEmitter<{}>;
    valueChangePC: EventEmitter<{}>;
    displayMonthChangedNg: EventEmitter<{}>;
    displayMonthChangePC: EventEmitter<{}>;
    formatItemNg: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
/**
 * Angular 2 component for the @see:wijmo.input.ColorPicker control.
 *
 * Use the <b>wj-color-picker</b> component to add <b>ColorPicker</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjColorPicker</b> component is derived from the <b>ColorPicker</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjColorPicker extends wijmo.input.ColorPicker implements OnInit, OnDestroy, AfterViewInit {
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
 * Angular 2 component for the @see:wijmo.input.InputMask control.
 *
 * Use the <b>wj-input-mask</b> component to add <b>InputMask</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjInputMask</b> component is derived from the <b>InputMask</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjInputMask extends wijmo.input.InputMask implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjModelProperty: string;
    gotFocusNg: EventEmitter<{}>;
    lostFocusNg: EventEmitter<{}>;
    valueChangedNg: EventEmitter<{}>;
    rawValueChangePC: EventEmitter<{}>;
    valueChangePC: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
/**
 * Angular 2 component for the @see:wijmo.input.InputColor control.
 *
 * Use the <b>wj-input-color</b> component to add <b>InputColor</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjInputColor</b> component is derived from the <b>InputColor</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjInputColor extends wijmo.input.InputColor implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjModelProperty: string;
    gotFocusNg: EventEmitter<{}>;
    lostFocusNg: EventEmitter<{}>;
    isDroppedDownChangingNg: EventEmitter<{}>;
    isDroppedDownChangedNg: EventEmitter<{}>;
    isDroppedDownChangePC: EventEmitter<{}>;
    textChangedNg: EventEmitter<{}>;
    textChangePC: EventEmitter<{}>;
    valueChangedNg: EventEmitter<{}>;
    valueChangePC: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
/**
 * Angular 2 component for the @see:wijmo.input.MultiSelect control.
 *
 * Use the <b>wj-multi-select</b> component to add <b>MultiSelect</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjMultiSelect</b> component is derived from the <b>MultiSelect</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-multi-select</b> component may contain a @see:wijmo/wijmo.angular2.input.WjItemTemplate child directive.
*/
export declare class WjMultiSelect extends wijmo.input.MultiSelect implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjModelProperty: string;
    gotFocusNg: EventEmitter<{}>;
    lostFocusNg: EventEmitter<{}>;
    isDroppedDownChangingNg: EventEmitter<{}>;
    isDroppedDownChangedNg: EventEmitter<{}>;
    isDroppedDownChangePC: EventEmitter<{}>;
    textChangedNg: EventEmitter<{}>;
    textChangePC: EventEmitter<{}>;
    formatItemNg: EventEmitter<{}>;
    selectedIndexChangedNg: EventEmitter<{}>;
    selectedIndexChangePC: EventEmitter<{}>;
    selectedItemChangePC: EventEmitter<{}>;
    selectedValueChangePC: EventEmitter<{}>;
    checkedItemsChangedNg: EventEmitter<{}>;
    checkedItemsChangePC: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
/**
 * Angular 2 component for the @see:wijmo.input.InputNumber control.
 *
 * Use the <b>wj-input-number</b> component to add <b>InputNumber</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjInputNumber</b> component is derived from the <b>InputNumber</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjInputNumber extends wijmo.input.InputNumber implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjModelProperty: string;
    gotFocusNg: EventEmitter<{}>;
    lostFocusNg: EventEmitter<{}>;
    valueChangedNg: EventEmitter<{}>;
    valueChangePC: EventEmitter<{}>;
    textChangedNg: EventEmitter<{}>;
    textChangePC: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
/**
 * Angular 2 component for the @see:wijmo.input.InputDate control.
 *
 * Use the <b>wj-input-date</b> component to add <b>InputDate</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjInputDate</b> component is derived from the <b>InputDate</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjInputDate extends wijmo.input.InputDate implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjModelProperty: string;
    gotFocusNg: EventEmitter<{}>;
    lostFocusNg: EventEmitter<{}>;
    isDroppedDownChangingNg: EventEmitter<{}>;
    isDroppedDownChangedNg: EventEmitter<{}>;
    isDroppedDownChangePC: EventEmitter<{}>;
    textChangedNg: EventEmitter<{}>;
    textChangePC: EventEmitter<{}>;
    valueChangedNg: EventEmitter<{}>;
    valueChangePC: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
/**
 * Angular 2 component for the @see:wijmo.input.InputTime control.
 *
 * Use the <b>wj-input-time</b> component to add <b>InputTime</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjInputTime</b> component is derived from the <b>InputTime</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjInputTime extends wijmo.input.InputTime implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjModelProperty: string;
    gotFocusNg: EventEmitter<{}>;
    lostFocusNg: EventEmitter<{}>;
    isDroppedDownChangingNg: EventEmitter<{}>;
    isDroppedDownChangedNg: EventEmitter<{}>;
    isDroppedDownChangePC: EventEmitter<{}>;
    textChangedNg: EventEmitter<{}>;
    textChangePC: EventEmitter<{}>;
    formatItemNg: EventEmitter<{}>;
    selectedIndexChangedNg: EventEmitter<{}>;
    selectedIndexChangePC: EventEmitter<{}>;
    selectedItemChangePC: EventEmitter<{}>;
    selectedValueChangePC: EventEmitter<{}>;
    valueChangedNg: EventEmitter<{}>;
    valueChangePC: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
/**
 * Angular 2 component for the @see:wijmo.input.InputDateTime control.
 *
 * Use the <b>wj-input-date-time</b> component to add <b>InputDateTime</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjInputDateTime</b> component is derived from the <b>InputDateTime</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjInputDateTime extends wijmo.input.InputDateTime implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjModelProperty: string;
    gotFocusNg: EventEmitter<{}>;
    lostFocusNg: EventEmitter<{}>;
    isDroppedDownChangingNg: EventEmitter<{}>;
    isDroppedDownChangedNg: EventEmitter<{}>;
    isDroppedDownChangePC: EventEmitter<{}>;
    textChangedNg: EventEmitter<{}>;
    textChangePC: EventEmitter<{}>;
    valueChangedNg: EventEmitter<{}>;
    valueChangePC: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
/**
 * Angular 2 component for the @see:wijmo.input.ListBox control.
 *
 * Use the <b>wj-list-box</b> component to add <b>ListBox</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjListBox</b> component is derived from the <b>ListBox</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-list-box</b> component may contain a @see:wijmo/wijmo.angular2.input.WjItemTemplate child directive.
*/
export declare class WjListBox extends wijmo.input.ListBox implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjModelProperty: string;
    gotFocusNg: EventEmitter<{}>;
    lostFocusNg: EventEmitter<{}>;
    formatItemNg: EventEmitter<{}>;
    itemsChangedNg: EventEmitter<{}>;
    itemCheckedNg: EventEmitter<{}>;
    selectedIndexChangedNg: EventEmitter<{}>;
    selectedIndexChangePC: EventEmitter<{}>;
    selectedItemChangePC: EventEmitter<{}>;
    selectedValueChangePC: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
/**
 * Angular 2 component for the @see:wijmo.input.Menu control.
 *
 * Use the <b>wj-menu</b> component to add <b>Menu</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjMenu</b> component is derived from the <b>Menu</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-menu</b> component may contain the following child components:
 * @see:wijmo/wijmo.angular2.input.WjMenuItem
 * , @see:wijmo/wijmo.angular2.input.WjMenuSeparator
 *  and @see:wijmo/wijmo.angular2.input.WjItemTemplate.
*/
export declare class WjMenu extends wijmo.input.Menu implements OnInit, OnDestroy, AfterViewInit, OnChanges, AfterContentInit {
    private _value;
    private _definedHeader;
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjModelProperty: string;
    gotFocusNg: EventEmitter<{}>;
    lostFocusNg: EventEmitter<{}>;
    isDroppedDownChangingNg: EventEmitter<{}>;
    isDroppedDownChangedNg: EventEmitter<{}>;
    isDroppedDownChangePC: EventEmitter<{}>;
    textChangedNg: EventEmitter<{}>;
    textChangePC: EventEmitter<{}>;
    formatItemNg: EventEmitter<{}>;
    selectedIndexChangedNg: EventEmitter<{}>;
    selectedIndexChangePC: EventEmitter<{}>;
    selectedItemChangePC: EventEmitter<{}>;
    selectedValueChangePC: EventEmitter<{}>;
    itemClickedNg: EventEmitter<{}>;
    valueChangePC: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    value: any;
    ngOnChanges(changes: {
        [key: string]: ngCore.SimpleChange;
    }): void;
    ngAfterContentInit(): void;
    onItemClicked(e?: wijmo.EventArgs): void;
    refresh(fullUpdate?: boolean): void;
    private _attachToControl();
    private _loadingItems(s);
    private _fmtItem(s, e);
    private _updateHeader();
}
/**
 * Angular 2 component for the @see: control.
 *
 * The <b>wj-menu-item</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.input.WjMenu component.
 *
 * Use the <b>wj-menu-item</b> component to add <b></b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
*/
export declare class WjMenuItem implements OnInit, OnDestroy, AfterViewInit {
    private viewContainerRef;
    private domRenderer;
    value: string;
    cmd: string;
    cmdParam: string;
    header: string;
    _ownerMenu: wijmo.input.Menu;
    templateDir: WjMenuItemTemplateDir;
    contentRoot: HTMLElement;
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjProperty: string;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any, viewContainerRef: ViewContainerRef, domRenderer: Renderer);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
export declare class WjMenuItemTemplateDir implements ngCore.AfterContentInit {
    viewContainerRef: ViewContainerRef;
    templateRef: TemplateRef<any>;
    elRef: ElementRef;
    private domRenderer;
    wjMenuItemTemplateDir: any;
    ownerItem: WjMenuItem;
    contentRoot: HTMLElement;
    constructor(viewContainerRef: ViewContainerRef, templateRef: TemplateRef<any>, elRef: ElementRef, injector: Injector, domRenderer: Renderer, menuItem: WjMenuItem, menuSeparator: WjMenuSeparator);
    ngAfterContentInit(): void;
}
/**
 * Angular 2 component for the @see: control.
 *
 * The <b>wj-menu-separator</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.input.WjMenu component.
 *
 * Use the <b>wj-menu-separator</b> component to add <b></b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
*/
export declare class WjMenuSeparator extends WjMenuItem implements OnInit, OnDestroy, AfterViewInit {
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any, viewContainerRef: ViewContainerRef, domRenderer: Renderer);
}
/**
 * Angular 2 component for the @see: control.
 *
 * The <b>[wjItemTemplate]</b> directive must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.input.WjListBox
 * , @see:wijmo/wijmo.angular2.input.WjMenu
 * , @see:wijmo/wijmo.angular2.input.WjComboBox
 *  or @see:wijmo/wijmo.angular2.input.WjMultiSelect.
 *
 * The <b>[wjItemTemplate]</b> directive defines a template for items of a component
 * that it's nested in.
 * The template may contain an arbitrary HTML fragment with Angular 2 bindings and directives.
 * The local <b>item</b>, <b>itemIndex</b> and <b>control</b> template variables can be used in Angular 2
 * bindings that refer to the data item, its index, and the owner control. For example:
 *
 *<pre>&lt;wj-list-box style="max-height:300px;width:250px;"
 *             [itemsSource]="musicians"&gt;
 *   &lt;template wjItemTemplate let-item="item" let-itemIndex="itemIndex"&gt;
 *       {&#8203;{itemIndex + 1}}. &lt;b&gt;{&#8203;{item.name}}&lt;/b&gt;
 *       &lt;div *ngIf="item.photo"&gt;
 *           &lt;img [src]="item.photo" height="100" /&gt;
 *           &lt;br /&gt;
 *           &lt;a href="https://www.google.com/#newwindow=1&q=The+Beatles+"
 *              target="_blank"
 *              style="color:red"&gt;go there!&lt;/a&gt;
 *       &lt;/div&gt;
 *   &lt;/template&gt;
 * &lt;/wj-list-box&gt;</pre>
*/
export declare class WjItemTemplate implements OnInit, OnDestroy, AfterViewInit {
    viewContainerRef: ViewContainerRef;
    templateRef: TemplateRef<any>;
    private domRenderer;
    wjItemTemplate: any;
    ownerControl: wijmo.Control;
    listBox: wijmo.input.ListBox;
    private _cdRef;
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any, viewContainerRef: ViewContainerRef, templateRef: TemplateRef<any>, domRenderer: Renderer, cdRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private _attachToControl();
    private _loadingItems(s);
    private _fmtItem(s, e);
    private _instantiateTemplate(parent);
    private static _getListBox(ownerControl);
}
/**
 * Angular 2 component for the @see:wijmo.input.Popup control.
 *
 * Use the <b>wj-popup</b> component to add <b>Popup</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjPopup</b> component is derived from the <b>Popup</b> control and
 * inherits all its properties, events and methods.
*/
export declare class WjPopup extends wijmo.input.Popup implements OnInit, OnDestroy, AfterViewInit, OnChanges {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjModelProperty: string;
    gotFocusNg: EventEmitter<{}>;
    lostFocusNg: EventEmitter<{}>;
    showingNg: EventEmitter<{}>;
    shownNg: EventEmitter<{}>;
    hidingNg: EventEmitter<{}>;
    hiddenNg: EventEmitter<{}>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        [key: string]: ngCore.SimpleChange;
    }): void;
    dispose(): void;
}
/**
    * Angular 2 directive for context menus.
    *
    * Use the <b>wjContextMenu</b> directive to add context menus to elements
    * on the page. The wjContextMenu directive is based on the <b>wj-menu</b>
    * component; it displays a popup menu when the user performs a context menu
    * request on an element (usually a right-click).
    *
    * The wjContextMenu directive is specified as a parameter added to the
    * element that the context menu applies to. The parameter value is a
    * reference to the <b>wj-menu</b> component. For example:
    *
    * <pre>&lt;!-- paragraph with a context menu --&gt;
    *&lt;p [wjContextMenu]="menu" &gt;
    *  This paragraph has a context menu.&lt;/p&gt;
    *
    *&lt;!-- define the context menu (hidden and with an id) --&gt;
    *&lt;wj-menu #menu style="display:none"&gt;
    *  &lt;wj-menu-item [cmd]="cmdOpen" [cmdParam] ="1"&gt;Open...&lt;/wj-menu-item&gt;
    *  &lt;wj-menu-item [cmd]="cmdSave" [cmdParam]="2"&gt;Save &lt;/wj-menu-item&gt;
    *  &lt;wj-menu-item [cmd]="cmdSave" [cmdParam]="3"&gt;Save As...&lt;/wj-menu-item&gt;
    *  &lt;wj-menu-item [cmd]="cmdNew" [cmdParam] ="4"&gt;New...&lt;/wj-menu-item&gt;
    *  &lt;wj-menu-separator&gt;&lt;/wj-menu-separator&gt;
    *  &lt;wj-menu-item [cmd]="cmdExit" [cmdParam]="5"&gt;Exit&lt;/wj-menu-item&gt;
    *&lt;/wj-menu &gt;</pre>
    */
export declare class WjContextMenu {
    private elRef;
    wjContextMenu: wijmo.input.Menu;
    constructor(elRef: ElementRef);
    onContextMenu(e: MouseEvent): void;
}
/**
    * Angular 2 component for an @see:ICollectionView navigator element.
    *
    * Use the <b>wj-collection-view-navigator</b> component to add an element
    * that allows users to navigate through the items in an @see:ICollectionView.
    * For details about Angular 2 markup syntax, see
    * <a href="static/angular2Markup.html">Angular 2 Markup</a>. For example:
    *
    * <pre>&lt;wj-collection-view-navigator
    *   [cv]="myCollectionView"&gt;
    * &lt;/wj-collection-view-navigator&gt;</pre>
    */
export declare class WjCollectionViewNavigator implements OnInit, OnDestroy, AfterViewInit {
    cv: wijmo.collections.CollectionView;
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjModelProperty: string;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
/**
    * Angular 2 component for an @see:ICollectionView pager element.
    *
    * Use the <b>wj-collection-view-pager</b> component to add an element
    * that allows users to navigate through the pages in a paged @see:ICollectionView.
    * For details about Angular 2 markup syntax, see
    * <a href="static/angular2Markup.html">Angular 2 Markup</a>. For example:
    *
    * <pre>&lt;wj-collection-view-pager
    *   [cv]="myCollectionView"&gt;
    * &lt;/wj-collection-view-pager&gt;</pre>
    */
export declare class WjCollectionViewPager implements OnInit, OnDestroy, AfterViewInit {
    cv: wijmo.collections.CollectionView;
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<{}>;
    wjModelProperty: string;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
export declare class WjInputModule {
}
