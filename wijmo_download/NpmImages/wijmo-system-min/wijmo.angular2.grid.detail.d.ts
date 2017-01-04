import * as wjcGridDetail from 'wijmo/wijmo.grid.detail';
import { Injector, ElementRef, ViewContainerRef, TemplateRef, Renderer } from '@angular/core';
export declare class WjFlexGridDetail extends wjcGridDetail.FlexGridDetailProvider {
    private static _viewRefProp;
    wjFlexGridDetail: any;
    _viewContainerRef: ViewContainerRef;
    _templateRef: TemplateRef<any>;
    _domRenderer: Renderer;
    constructor(viewContainerRef: ViewContainerRef, templateRef: TemplateRef<any>, domRenderer: Renderer, elRef: ElementRef, injector: Injector);
    private _init();
}
export declare class WjGridDetailModule {
}
