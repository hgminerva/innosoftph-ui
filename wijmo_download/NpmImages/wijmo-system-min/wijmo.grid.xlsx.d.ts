import * as wjcXlsx from 'wijmo/wijmo.xlsx';
import * as wjcGrid from 'wijmo/wijmo.grid';
export declare class FlexGridXlsxConverter {
    static export(grid: any, exportOption?: IFlexGridXlsxExportOptions): wjcXlsx.IXlsxFileContent;
    static import(fileContent: any, grid: wjcGrid.FlexGrid, importOption?: IFlexGridXlsxImportOptions, moreSheets?: wjcGrid.FlexGrid[]): void;
    static toWorkbookOM(flex: any, exportOption?: IFlexGridXlsxExportOptions): wjcXlsx.IWorkbook;
    static fromWorkbookOM(workbook: wjcXlsx.IWorkbook, flex: wjcGrid.FlexGrid, importOption?: IFlexGridXlsxImportOptions, moreSheets?: wjcGrid.FlexGrid[]): void;
    static save(grid: wjcGrid.FlexGrid, options?: IFlexGridXlsxOptions, fileName?: any): wjcXlsx.Workbook;
    static load(grid: wjcGrid.FlexGrid, workbook: any, options?: IFlexGridXlsxOptions): void;
    private static _exportFlexGrid(flex, file, exportOption);
    private static _loadToFlexGrid(grid, workbook, options);
    private static _parseFlexGridRowToSheetRow(panel, workbookRow, rowIndex, startColIndex, columnSettings, includeCellStyles, fakeCell, isGroupRow, groupLevel, includeColumns);
    private static _parseCellStyle(cellStyle);
    private static _parseBorder(cellStyle);
    private static _parseEgdeBorder(cellStyle, edge);
    private static _parseToExcelFontFamily(fontFamily);
    private static _parseToExcelFormula(formula, isDate);
    private static _parseToFlexSheetFormula(excelFormula);
    private static _getColumnSetting(column, defaultWidth);
    private static _toExcelHAlign(value);
    private static _getColumnCount(sheetData);
    private static _getRowCount(sheetData, columnCnt);
    private static _numAlpha(i);
    private static _getItemType(item);
    private static _setColumn(columns, columnIndex, item);
    private static _getItemValue(item);
    private static _getCellStyle(panel, fakeCell, r, c);
    private static _resetCellStyle(cell);
    private static _extend(dst, src);
    private static _checkParentCollapsed(groupCollapsedSettings, groupLevel);
    private static _getColSpan(p, mergedRange, includeColumns);
}
export interface IExtendedSheetInfo {
    name: string;
    visible: boolean;
    styledCells: any;
    mergedRanges: any;
    fonts: string[];
}
export interface IFlexGridXlsxExportOptions {
    includeColumnHeader?: boolean;
    includeColumnHeaders?: boolean;
    includeRowHeaders?: boolean;
    needGetCellStyle?: boolean;
    includeCellStyles?: boolean;
    activeWorksheet?: number;
    includeColumns?: (column: wjcGrid.Column) => boolean;
}
export interface IFlexGridXlsxImportOptions {
    includeColumnHeader: boolean;
}
export interface IFlexGridXlsxOptions {
    sheetIndex?: number;
    sheetName?: string;
    sheetVisible?: boolean;
    includeColumnHeaders?: boolean;
    includeRowHeaders?: boolean;
    includeCellStyles?: boolean;
    activeWorksheet?: any;
    includeColumns?: (column: wjcGrid.Column) => boolean;
}
