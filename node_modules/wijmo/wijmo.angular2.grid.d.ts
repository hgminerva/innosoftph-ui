import * as wjcGrid from 'wijmo/wijmo.grid';
import { ChangeDetectorRef } from '@angular/core';
import { ElementRef, ViewContainerRef, TemplateRef } from '@angular/core';
import { Injector, Renderer } from '@angular/core';
import * as ngCore from '@angular/core';
export declare class WjFlexGrid extends wjcGrid.FlexGrid {
    constructor(elRef: ElementRef, injector: Injector);
}
export declare class WjFlexGridColumn extends wjcGrid.Column {
    constructor(elRef: ElementRef, injector: Injector);
}
export declare enum CellTemplateType {
    Cell = 0,
    CellEdit = 1,
    ColumnHeader = 2,
    RowHeader = 3,
    RowHeaderEdit = 4,
    TopLeft = 5,
    GroupHeader = 6,
    Group = 7,
    NewCellTemplate = 8,
    ColumnFooter = 9,
    BottomLeft = 10,
}
export declare class WjFlexGridCellTemplate implements ngCore.OnInit, ngCore.OnDestroy {
    viewContainerRef: ViewContainerRef;
    templateRef: TemplateRef<any>;
    elRef: ElementRef;
    private domRenderer;
    cdRef: ChangeDetectorRef;
    wjFlexGridCellTemplate: any;
    cellTypeStr: string;
    cellOverflow: string;
    cellType: CellTemplateType;
    valuePaths: Object;
    autoSizeRows: boolean;
    grid: WjFlexGrid;
    column: WjFlexGridColumn;
    ownerControl: any;
    constructor(viewContainerRef: ViewContainerRef, templateRef: TemplateRef<any>, elRef: ElementRef, domRenderer: Renderer, injector: Injector, cdRef: ChangeDetectorRef);
    static _getTemplContextProp(templateType: CellTemplateType): string;
    ngOnInit(): void;
    ngOnDestroy(): void;
    _instantiateTemplate(parent: HTMLElement): {
        viewRef: ngCore.EmbeddedViewRef<any>;
        rootElement: Element;
    };
    private _attachToControl();
}
export declare class WjGridModule {
}
