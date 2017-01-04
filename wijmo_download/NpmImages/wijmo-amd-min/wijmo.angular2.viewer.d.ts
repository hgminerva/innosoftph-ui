import * as wjcViewer from 'wijmo/wijmo.viewer';
import { ElementRef, Injector } from '@angular/core';
export declare class WjReportViewer extends wjcViewer.ReportViewer {
    constructor(elRef: ElementRef, injector: Injector);
}
export declare class WjPdfViewer extends wjcViewer.PdfViewer {
    constructor(elRef: ElementRef, injector: Injector);
}
export declare class WjViewerModule {
}
