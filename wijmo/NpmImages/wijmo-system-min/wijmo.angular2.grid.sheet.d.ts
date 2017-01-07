import * as wjcGridSheet from 'wijmo/wijmo.grid.sheet';
import { Injector, ElementRef, OnInit, OnChanges, SimpleChange } from '@angular/core';
export declare class WjFlexSheet extends wjcGridSheet.FlexSheet {
    constructor(elRef: ElementRef, injector: Injector);
}
export declare class WjSheet extends wjcGridSheet.Sheet implements OnInit, OnChanges {
    boundRowCount: number;
    boundColumnCount: number;
    private _flexSheet;
    constructor(elRef: ElementRef, injector: Injector);
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): any;
    ngOnInit(): wjcGridSheet.Sheet;
}
export declare class WjGridSheetModule {
}
