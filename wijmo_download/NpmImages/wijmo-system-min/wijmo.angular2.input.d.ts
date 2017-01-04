import * as wjcInput from 'wijmo/wijmo.input';
import * as wjcCore from 'wijmo/wijmo';
import { ElementRef, Injector, ViewContainerRef, TemplateRef, Renderer } from '@angular/core';
import * as ngCore from '@angular/core';
export declare class WjComboBox extends wjcInput.ComboBox {
    constructor(elRef: ElementRef, injector: Injector);
}
export declare class WjAutoComplete extends wjcInput.AutoComplete {
    constructor(elRef: ElementRef, injector: Injector);
}
export declare class WjCalendar extends wjcInput.Calendar {
    constructor(elRef: ElementRef, injector: Injector);
}
export declare class WjColorPicker extends wjcInput.ColorPicker {
    constructor(elRef: ElementRef, injector: Injector);
}
export declare class WjInputMask extends wjcInput.InputMask {
    constructor(elRef: ElementRef, injector: Injector);
}
export declare class WjInputColor extends wjcInput.InputColor {
    constructor(elRef: ElementRef, injector: Injector);
}
export declare class WjMultiSelect extends wjcInput.MultiSelect {
    constructor(elRef: ElementRef, injector: Injector);
}
export declare class WjInputNumber extends wjcInput.InputNumber {
    constructor(elRef: ElementRef, injector: Injector);
}
export declare class WjInputDate extends wjcInput.InputDate {
    constructor(elRef: ElementRef, injector: Injector);
}
export declare class WjInputTime extends wjcInput.InputTime {
    constructor(elRef: ElementRef, injector: Injector);
}
export declare class WjInputDateTime extends wjcInput.InputDateTime {
    constructor(elRef: ElementRef, injector: Injector);
}
export declare class WjListBox extends wjcInput.ListBox {
    constructor(elRef: ElementRef, injector: Injector);
}
export declare class WjMenu extends wjcInput.Menu implements ngCore.OnInit, ngCore.OnDestroy, ngCore.OnChanges, ngCore.AfterContentInit {
    private _value;
    private _definedHeader;
    constructor(elRef: ElementRef, injector: Injector);
    value: any;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        [key: string]: ngCore.SimpleChange;
    }): void;
    ngAfterContentInit(): void;
    onItemClicked(e?: wjcCore.EventArgs): void;
    refresh(fullUpdate?: boolean): void;
    private _attachToControl();
    private _loadingItems(s);
    private _fmtItem(s, e);
    private _updateHeader();
}
export declare class WjMenuItem implements ngCore.OnInit, ngCore.AfterContentInit {
    elRef: ElementRef;
    private viewContainerRef;
    private domRenderer;
    value: string;
    cmd: string;
    cmdParam: string;
    header: string;
    _ownerMenu: wjcInput.Menu;
    templateDir: WjMenuItemTemplateDir;
    contentRoot: HTMLElement;
    constructor(elRef: ElementRef, injector: Injector, viewContainerRef: ViewContainerRef, domRenderer: Renderer);
    ngOnInit(): void;
    wjAfterParentInit(): void;
    ngAfterContentInit(): void;
}
export declare class WjMenuSeparator extends WjMenuItem implements ngCore.OnInit {
    constructor(elRef: ElementRef, injector: Injector, viewContainerRef: ViewContainerRef, domRenderer: Renderer);
    ngOnInit(): void;
}
export declare class WjMenuItemTemplateDir implements ngCore.OnInit, ngCore.AfterContentInit {
    viewContainerRef: ViewContainerRef;
    templateRef: TemplateRef<any>;
    elRef: ElementRef;
    private domRenderer;
    wjMenuItemTemplateDir: any;
    ownerItem: WjMenuItem;
    contentRoot: HTMLElement;
    constructor(viewContainerRef: ViewContainerRef, templateRef: TemplateRef<any>, elRef: ElementRef, injector: Injector, domRenderer: Renderer, menuItem: WjMenuItem, menuSeparator: WjMenuSeparator);
    ngOnInit(): void;
    ngAfterContentInit(): void;
}
export declare class WjItemTemplate implements ngCore.OnInit, ngCore.OnDestroy {
    viewContainerRef: ViewContainerRef;
    templateRef: TemplateRef<any>;
    elRef: ElementRef;
    private domRenderer;
    wjItemTemplate: any;
    ownerControl: wjcCore.Control;
    listBox: wjcInput.ListBox;
    constructor(viewContainerRef: ViewContainerRef, templateRef: TemplateRef<any>, elRef: ElementRef, injector: Injector, domRenderer: Renderer);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private _attachToControl();
    private _loadingItems(s);
    private _fmtItem(s, e);
    private _instantiateTemplate(parent);
    private static _getListBox(ownerControl);
}
export declare class WjPopup extends wjcInput.Popup implements ngCore.OnChanges {
    private _elRef;
    constructor(elRef: ElementRef, injector: Injector);
    ngOnChanges(changes: {
        [key: string]: ngCore.SimpleChange;
    }): void;
    dispose(): void;
}
export declare class WjContextMenu {
    private elRef;
    wjContextMenu: wjcInput.Menu;
    constructor(elRef: ElementRef);
    onContextMenu(e: MouseEvent): void;
}
export declare class WjCollectionViewNavigator {
    cv: wjcCore.CollectionView;
    constructor(elRef: ElementRef, injector: Injector);
}
export declare class WjCollectionViewPager {
    cv: wjcCore.CollectionView;
    constructor(elRef: ElementRef, injector: Injector);
}
export declare class WjInputModule {
}
