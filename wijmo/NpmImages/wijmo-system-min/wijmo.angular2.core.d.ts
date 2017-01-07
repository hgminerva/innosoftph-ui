import { ElementRef, Injector, EventEmitter, AfterViewInit, ComponentFactoryResolver } from '@angular/core';
import * as ngCore from '@angular/core';
export declare class WjTooltip implements ngCore.OnDestroy {
    private elRef;
    private static _toolTip;
    private _toolTipText;
    constructor(elRef: ElementRef, injector: Injector);
    wjTooltip: string;
    ngOnDestroy(): void;
}
export declare class WjComponentLoader implements AfterViewInit {
    private _cmpResolver;
    private _elementRef;
    private _component;
    private _properties;
    private _cmpRef;
    private _isViewInit;
    private _anchor;
    propertiesChange: EventEmitter<{}>;
    constructor(_cmpResolver: ComponentFactoryResolver, _elementRef: ElementRef);
    component: any;
    properties: Object;
    ngAfterViewInit(): void;
    private _createComponent();
    private _updateProperties();
    private _addPropListener(component, propName, propChange);
}
export declare class WjCoreModule {
}
