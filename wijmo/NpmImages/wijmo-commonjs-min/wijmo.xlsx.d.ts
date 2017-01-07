export declare function _xlsx(file: any): any;
export declare class Workbook implements IWorkbook {
    application: string;
    company: string;
    creator: string;
    created: Date;
    lastModifiedBy: string;
    modified: Date;
    activeWorksheet: number;
    private _reservedContent;
    private _sheets;
    private _styles;
    private static _alphabet;
    private static _formatMap;
    constructor();
    readonly sheets: WorkSheet[];
    readonly styles: WorkbookStyle[];
    reservedContent: any;
    save(fileName?: string): string;
    load(base64: string): void;
    _serialize(): IWorkbook;
    _deserialize(workbookOM: IWorkbook): void;
    _addWorkSheet(workSheet: WorkSheet, sheetIndex?: number): void;
    private _saveToFile(blob, fileName);
    static toXlsxDateFormat(format: string): string;
    static toXlsxNumberFormat(format: string): string;
    static fromXlsxFormat(xlsxFormat: string): string[];
    static _parseCellFormat(format: string, isDate: boolean): string;
    static _parseExcelFormat(item: any): string;
    static xlsxAddress(row: number, col: number, absolute?: boolean, absoluteCol?: boolean): string;
    static tableAddress(xlsxIndex: string): ITableAddress;
    static _parseHAlignToString(hAlign: HAlign): string;
    static _parseStringToHAlign(hAlign: string): HAlign;
    static _parseVAlignToString(vAlign: VAlign): string;
    static _parseStringToVAlign(vAlign: string): VAlign;
    static _parseBorderTypeToString(type: BorderStyle): string;
    static _parseStringToBorderType(type: string): BorderStyle;
    private static _numAlpha(i);
    private static _alphaNum(s);
    private static _b64ToUint6(nChr);
    static _base64DecToArr(sBase64: string, nBlocksSize?: number): Uint8Array;
    private static _uint6ToB64(nUint6);
    static _base64EncArr(aBytes: Uint8Array): string;
    private _serializeWorkSheets();
    private _serializeWorkbookStyles();
    private _deserializeWorkSheets(workSheets);
    private _deserializeWorkbookStyles(workbookStyles);
}
export declare class WorkSheet implements IWorkSheet {
    name: string;
    frozenPane: WorkbookFrozenPane;
    summaryBelow: boolean;
    visible: boolean;
    style: WorkbookStyle;
    private _columns;
    private _rows;
    constructor();
    readonly columns: WorkbookColumn[];
    readonly cols: WorkbookColumn[];
    readonly rows: WorkbookRow[];
    _serialize(): IWorkSheet;
    _deserialize(workSheetOM: IWorkSheet): void;
    _addWorkbookColumn(column: WorkbookColumn, columnIndex?: number): void;
    _addWorkbookRow(row: WorkbookRow, rowIndex?: number): void;
    private _serializeWorkbookColumns();
    private _serializeWorkbookRows();
    private _deserializeWorkbookColumns(workbookColumns);
    private _deserializeWorkbookRows(workbookRows);
    private _checkEmptyWorkSheet();
}
export declare class WorkbookColumn implements IWorkbookColumn {
    width: any;
    visible: boolean;
    style: WorkbookStyle;
    autoWidth: boolean;
    constructor();
    _serialize(): IWorkbookColumn;
    _deserialize(workbookColumnOM: IWorkbookColumn): void;
    private _checkEmptyWorkbookColumn();
}
export declare class WorkbookRow implements IWorkbookRow {
    height: number;
    visible: boolean;
    groupLevel: number;
    style: WorkbookStyle;
    collapsed: boolean;
    private _cells;
    constructor();
    readonly cells: WorkbookCell[];
    _serialize(): IWorkbookRow;
    _deserialize(workbookRowOM: IWorkbookRow): void;
    _addWorkbookCell(cell: WorkbookCell, cellIndex?: number): void;
    private _serializeWorkbookCells();
    private _deserializeWorkbookCells(workbookCells);
    private _checkEmptyWorkbookRow();
}
export declare class WorkbookCell implements IWorkbookCell {
    value: any;
    isDate: boolean;
    formula: string;
    style: WorkbookStyle;
    colSpan: number;
    rowSpan: number;
    constructor();
    _serialize(): IWorkbookCell;
    _deserialize(workbookCellOM: IWorkbookCell): void;
    private _checkEmptyWorkbookCell();
}
export declare class WorkbookFrozenPane implements IWorkbookFrozenPane {
    rows: number;
    columns: number;
    constructor();
    _serialize(): IWorkbookFrozenPane;
    _deserialize(workbookFrozenPaneOM: IWorkbookFrozenPane): void;
}
export declare class WorkbookStyle implements IWorkbookStyle {
    format: string;
    basedOn: WorkbookStyle;
    font: WorkbookFont;
    hAlign: HAlign;
    vAlign: VAlign;
    indent: number;
    fill: WorkbookFill;
    borders: WorkbookBorder;
    wordWrap: boolean;
    constructor();
    _serialize(): IWorkbookStyle;
    _deserialize(workbookStyleOM: IWorkbookStyle): void;
    private _checkEmptyWorkbookStyle();
}
export declare class WorkbookFont implements IWorkbookFont {
    family: string;
    size: number;
    bold: boolean;
    italic: boolean;
    underline: boolean;
    color: string;
    constructor();
    _serialize(): IWorkbookFont;
    _deserialize(workbookFontOM: IWorkbookFont): void;
    private _checkEmptyWorkbookFont();
}
export declare class WorkbookFill implements IWorkbookFill {
    color: string;
    constructor();
    _serialize(): IWorkbookFill;
    _deserialize(workbookFillOM: IWorkbookFill): void;
}
export declare class WorkbookBorder implements IWorkbookBorder {
    top: WorkbookBorderSetting;
    bottom: WorkbookBorderSetting;
    left: WorkbookBorderSetting;
    right: WorkbookBorderSetting;
    diagonal: WorkbookBorderSetting;
    constructor();
    _serialize(): IWorkbookBorder;
    _deserialize(workbookBorderOM: IWorkbookBorder): void;
    private _checkEmptyWorkbookBorder();
}
export declare class WorkbookBorderSetting implements IWorkbookBorderSetting {
    color: string;
    style: BorderStyle;
    constructor();
    _serialize(): IWorkbookBorderSetting;
    _deserialize(workbookBorderSettingOM: IWorkbookBorderSetting): void;
}
export interface IXlsxFileContent {
    base64: string;
    base64Array: Uint8Array;
    href: Function;
}
export interface IWorkSheet {
    name?: string;
    cols?: IWorkbookColumn[];
    columns?: IWorkbookColumn[];
    rows?: IWorkbookRow[];
    frozenPane?: IWorkbookFrozenPane;
    summaryBelow?: boolean;
    visible?: boolean;
    style?: IWorkbookStyle;
}
export interface IWorkbookColumn {
    width?: any;
    visible?: boolean;
    style?: IWorkbookStyle;
    autoWidth?: boolean;
}
export interface IWorkbookRow {
    height?: number;
    visible?: boolean;
    groupLevel?: number;
    style?: IWorkbookStyle;
    collapsed?: boolean;
    cells?: IWorkbookCell[];
}
export interface IWorkbookCell {
    value?: any;
    isDate?: boolean;
    formula?: string;
    style?: IWorkbookStyle;
    colSpan?: number;
    rowSpan?: number;
}
export interface IWorkbookFrozenPane {
    rows: number;
    columns: number;
}
export interface IWorkbook {
    sheets: IWorkSheet[];
    application?: string;
    company?: string;
    creator?: string;
    created?: Date;
    lastModifiedBy?: string;
    modified?: Date;
    activeWorksheet?: number;
    styles?: IWorkbookStyle[];
    reservedContent?: any;
}
export interface IWorkbookStyle {
    format?: string;
    basedOn?: IWorkbookStyle;
    font?: IWorkbookFont;
    hAlign?: HAlign;
    vAlign?: VAlign;
    indent?: number;
    borders?: IWorkbookBorder;
    fill?: IWorkbookFill;
    wordWrap?: boolean;
}
export interface IWorkbookFont {
    family?: string;
    size?: number;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    color?: string;
}
export interface IWorkbookBorder {
    top?: IWorkbookBorderSetting;
    bottom?: IWorkbookBorderSetting;
    left?: IWorkbookBorderSetting;
    right?: IWorkbookBorderSetting;
    diagonal?: IWorkbookBorderSetting;
}
export interface IWorkbookBorderSetting {
    color?: string;
    style?: BorderStyle;
}
export interface IWorkbookFill {
    color?: string;
}
export interface ITableIndex {
    row: number;
    col: number;
    absCol: boolean;
    absRow: boolean;
}
export interface ITableAddress {
    row: number;
    col: number;
    absCol: boolean;
    absRow: boolean;
}
export declare enum HAlign {
    General = 0,
    Left = 1,
    Center = 2,
    Right = 3,
    Fill = 4,
    Justify = 5,
}
export declare enum VAlign {
    Top = 0,
    Center = 1,
    Bottom = 2,
    Justify = 3,
}
export declare enum BorderStyle {
    None = 0,
    Thin = 1,
    Medium = 2,
    Dashed = 3,
    Dotted = 4,
    Thick = 5,
    Double = 6,
    Hair = 7,
    MediumDashed = 8,
    ThinDashDotted = 9,
    MediumDashDotted = 10,
    ThinDashDotDotted = 11,
    MediumDashDotDotted = 12,
    SlantedMediumDashDotted = 13,
}
export declare class XlsxConverter {
    static export(workbook: IWorkbook): IXlsxFileContent;
    static exportToFile(workbook: IWorkbook, fileName: string): void;
    static import(fileContent: any): IWorkbook;
    static xlsxDateFormat(netFormat: string): string;
    static xlsxNumberFormat(netFormat: string): string;
    static netFormat(xlsxFormat: string): string[];
    static xlsxIndex(row: number, col: number, absolute?: boolean, absoluteCol?: boolean): string;
    static numericIndex(xlsxIndex: string): ITableAddress;
}
