import * as wjcCore from 'wijmo/wijmo';
import * as wjcInput from 'wijmo/wijmo.input';
export declare class _DocumentSource {
    static _abstractMethodException: string;
    private _features;
    private _paginated;
    private _hasOutlines;
    private _pageCount;
    private _service;
    private _supportedExportDescriptions;
    private _pageSettings;
    private _isLoadCompleted;
    private _isDisposed;
    private _errors;
    private _expiredDateTime;
    private _executionDateTime;
    private static _isMobileEnvironment;
    private static _isIOSEnvironment;
    pageCountChanged: wjcCore.Event;
    disposed: wjcCore.Event;
    pageSettingsChanged: wjcCore.Event;
    loadCompleted: wjcCore.Event;
    queryLoadingData: wjcCore.Event;
    onQueryLoadingData(e: QueryLoadingDataEventArgs): void;
    constructor(options: _IDocumentOptions);
    _updateIsLoadCompleted(value: boolean): void;
    _updateIsDisposed(value: boolean): void;
    _getIsDisposed(): boolean;
    _checkHasOutlines(data: _IExecutionInfo): boolean;
    _checkIsLoadCompleted(data: _IExecutionInfo): boolean;
    _checkIsDisposed(data: _IExecutionInfo): boolean;
    static _isMobile(): boolean;
    static _isIOS(): boolean;
    readonly executionDateTime: Date;
    readonly expiredDateTime: Date;
    readonly errors: string[];
    readonly isLoadCompleted: boolean;
    readonly isDisposed: boolean;
    readonly features: _IDocumentFeatures;
    readonly pageSettings: _IPageSettings;
    onPageSettingsChanged(e?: wjcCore.EventArgs): void;
    onLoadCompleted(e?: wjcCore.EventArgs): void;
    onDisposed(e?: wjcCore.EventArgs): void;
    setPageSettings(pageSettings: _IPageSettings): IPromise;
    _updatePageSettings(newValue: _IPageSettings): void;
    readonly _innerService: _DocumentService;
    readonly paginated: boolean;
    readonly hasOutlines: boolean;
    readonly pageCount: number;
    readonly service: _IDocumentService;
    getSupportedExportDescriptions(): IPromise;
    getBookmark(name: string): IPromise;
    executeCustomAction(actionString: string): IPromise;
    getOutlines(): IPromise;
    dispose(): IPromise;
    load(): IPromise;
    _update(data: _IExecutionInfo): void;
    _getFeatures(data: _IExecutionInfo): _IDocumentFeatures;
    _getExecutionDateTime(data: _IExecutionInfo): Date;
    _getExpiredDateTime(data: _IExecutionInfo): Date;
    _getPageCount(data: _IExecutionInfo): number;
    _updatePageCount(value: number): void;
    getDocumentStatus(): IPromise;
    _createDocumentService(options: _IDocumentService): _DocumentService;
    onPageCountChanged(e?: wjcCore.EventArgs): void;
    print(): void;
    renderToFilter(options: Object): IPromise;
    getRenderToFilterUrl(options: Object): string;
    search(text: string, matchCase?: boolean, wholeWord?: boolean): IPromise;
}
export declare function _statusJsonReviver(k: string, v: any): any;
export interface _IDocumentStatus {
    documentId: string;
    status: string;
    errorList: string[];
    progress: number;
    pageCount: number;
    hasOutlines: boolean;
    pageSettings: _IPageSettings;
    features: _IDocumentFeatures;
}
export interface _IDocumentFeatures {
    paginated: boolean;
    nonPaginated: boolean;
    textSearchInPaginatedMode: boolean;
    pageSettings: boolean;
}
export interface _IExecutionInfo {
    documentStatus: _IDocumentStatus;
    loadedDateTime: Date;
    expiredDateTime: Date;
}
export interface _IPageSettings {
    paginated: boolean;
    height: _Unit;
    width: _Unit;
    bottomMargin: _Unit;
    landscape: boolean;
    leftMargin: _Unit;
    paperSize: _PaperKind;
    rightMargin: _Unit;
    topMargin: _Unit;
}
export interface _ISearchResult {
    nearText: string;
    positionInNearText: number;
    boundsList: _IRect[];
    pageIndex: number;
}
export interface _IOutlineNode {
    caption: string;
    children: _IOutlineNode[];
    level: number;
    target: string;
    position?: _IDocumentPosition;
}
export interface _IRect {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface _IDocumentPosition {
    pageBounds: _IRect;
    pageIndex: number;
}
export interface _IExportDescription {
    name: string;
    format: string;
    optionDescriptions?: _IExportOptionDescription[];
}
export interface _IExportOptionDescription {
    name: string;
    type: string;
    defaultValue: string;
    allowedValues?: string[];
}
export interface _IDocumentService {
    serviceUrl: string;
    filePath: string;
}
export interface _IDocumentOptions extends _IDocumentService {
    paginated?: boolean;
}
export declare class _DocumentService implements _IDocumentService {
    private _url;
    private _documentPath;
    constructor(options: _IDocumentService);
    readonly serviceUrl: string;
    readonly filePath: string;
    getDocumentStatus(): IPromise;
    setPageSettings(pageSettings: _IPageSettings): IPromise;
    getBookmark(name: string): IPromise;
    executeCustomAction(actionString: string): IPromise;
    load(data?: any): IPromise;
    dispose(): IPromise;
    getOutlines(): IPromise;
    renderToFilter(options: Object): IPromise;
    search(text: string, matchCase?: boolean, wholeWord?: boolean): IPromise;
    getRenderToFilterUrl(options: Object): string;
    getSupportedExportDescriptions(): IPromise;
}
export declare function _pageSettingsJsonReviver(k: string, v: any): any;
export declare function _strEndsWith(text: string, suffix: string): boolean;
export declare function _appendQueryString(url: string, queries: Object): string;
export declare function _joinUrl(...data: (string | string[])[]): string;
export declare function _joinStringUrl(data: string[]): string[];
export declare function _prepareStringUrl(data: string): string[];
export declare function _httpRequest(url: string, settings?: _IHttpRequest): XMLHttpRequest;
export declare function _objToParams(obj: Object): string;
export interface _IHttpRequest {
    method?: string;
    data?: any;
    async?: boolean;
    cache?: boolean;
    success?: (xhr: XMLHttpRequest) => void;
    user?: string;
    password?: string;
    requestHeaders?: any;
    beforeSend?: (xhr: XMLHttpRequest) => void;
    error?: (xhr: XMLHttpRequest) => void;
    complete?: (xhr: XMLHttpRequest) => void;
}
export declare function _disableCache(url: string): string;
export declare function _twipToPixel(value: number): number;
export declare enum _UnitType {
    Document = 0,
    Inch = 1,
    Mm = 2,
    Pica = 3,
    Point = 4,
    Twip = 5,
    InHs = 6,
    Display = 7,
    Cm = 8,
    Dip = 9,
}
export declare class _Unit {
    static _MmPerInch: number;
    static _DocumentUnitsPerInch: number;
    static _PointsPerInch: number;
    static _TwipsPerInch: number;
    static _PicaPerInch: number;
    static _CmPerInch: number;
    static _DisplayPerInch: number;
    static _DipPerInch: number;
    private static _unitTypes;
    private static _unitTypeDic;
    private _value;
    private _units;
    private _valueInPixel;
    constructor(value: any, units?: _UnitType);
    private static _initUnitTypeDic();
    readonly value: number;
    readonly units: _UnitType;
    readonly valueInPixel: number;
    toString(): string;
    static toString(unit: _Unit): string;
    static convertValue(value: number, from: _UnitType, to: _UnitType): number;
}
export interface IPromise {
    then(onFulfilled?: (value?: any) => any, onRejected?: (reason?: any) => any): IPromise;
    catch(onRejected: (reason?: any) => any): IPromise;
}
export declare class _Promise implements IPromise {
    private _callbacks;
    then(onFulfilled?: (value?: any) => any, onRejected?: (reason?: any) => any): IPromise;
    catch(onRejected: (reason?: any) => any): IPromise;
    resolve(value?: any): void;
    reject(reason?: any): void;
    onFulfilled(value: any): void;
    onRejected(reason: any): void;
}
export declare class _CompositedPromise extends _Promise {
    private _promises;
    constructor(promises: IPromise[]);
    _init(): void;
}
export declare enum _PaperKind {
    Custom = 0,
    Letter = 1,
    LetterSmall = 2,
    Tabloid = 3,
    Ledger = 4,
    Legal = 5,
    Statement = 6,
    Executive = 7,
    A3 = 8,
    A4 = 9,
    A4Small = 10,
    A5 = 11,
    B4 = 12,
    B5 = 13,
    Folio = 14,
    Quarto = 15,
    Standard10x14 = 16,
    Standard11x17 = 17,
    Note = 18,
    Number9Envelope = 19,
    Number10Envelope = 20,
    Number11Envelope = 21,
    Number12Envelope = 22,
    Number14Envelope = 23,
    CSheet = 24,
    DSheet = 25,
    ESheet = 26,
    DLEnvelope = 27,
    C5Envelope = 28,
    C3Envelope = 29,
    C4Envelope = 30,
    C6Envelope = 31,
    C65Envelope = 32,
    B4Envelope = 33,
    B5Envelope = 34,
    B6Envelope = 35,
    ItalyEnvelope = 36,
    MonarchEnvelope = 37,
    PersonalEnvelope = 38,
    USStandardFanfold = 39,
    GermanStandardFanfold = 40,
    GermanLegalFanfold = 41,
    IsoB4 = 42,
    JapanesePostcard = 43,
    Standard9x11 = 44,
    Standard10x11 = 45,
    Standard15x11 = 46,
    InviteEnvelope = 47,
    LetterExtra = 50,
    LegalExtra = 51,
    TabloidExtra = 52,
    A4Extra = 53,
    LetterTransverse = 54,
    A4Transverse = 55,
    LetterExtraTransverse = 56,
    APlus = 57,
    BPlus = 58,
    LetterPlus = 59,
    A4Plus = 60,
    A5Transverse = 61,
    B5Transverse = 62,
    A3Extra = 63,
    A5Extra = 64,
    B5Extra = 65,
    A2 = 66,
    A3Transverse = 67,
    A3ExtraTransverse = 68,
    JapaneseDoublePostcard = 69,
    A6 = 70,
    JapaneseEnvelopeKakuNumber2 = 71,
    JapaneseEnvelopeKakuNumber3 = 72,
    JapaneseEnvelopeChouNumber3 = 73,
    JapaneseEnvelopeChouNumber4 = 74,
    LetterRotated = 75,
    A3Rotated = 76,
    A4Rotated = 77,
    A5Rotated = 78,
    B4JisRotated = 79,
    B5JisRotated = 80,
    JapanesePostcardRotated = 81,
    JapaneseDoublePostcardRotated = 82,
    A6Rotated = 83,
    JapaneseEnvelopeKakuNumber2Rotated = 84,
    JapaneseEnvelopeKakuNumber3Rotated = 85,
    JapaneseEnvelopeChouNumber3Rotated = 86,
    JapaneseEnvelopeChouNumber4Rotated = 87,
    B6Jis = 88,
    B6JisRotated = 89,
    Standard12x11 = 90,
    JapaneseEnvelopeYouNumber4 = 91,
    JapaneseEnvelopeYouNumber4Rotated = 92,
    Prc16K = 93,
    Prc32K = 94,
    Prc32KBig = 95,
    PrcEnvelopeNumber1 = 96,
    PrcEnvelopeNumber2 = 97,
    PrcEnvelopeNumber3 = 98,
    PrcEnvelopeNumber4 = 99,
    PrcEnvelopeNumber5 = 100,
    PrcEnvelopeNumber6 = 101,
    PrcEnvelopeNumber7 = 102,
    PrcEnvelopeNumber8 = 103,
    PrcEnvelopeNumber9 = 104,
    PrcEnvelopeNumber10 = 105,
    Prc16KRotated = 106,
    Prc32KRotated = 107,
    Prc32KBigRotated = 108,
    PrcEnvelopeNumber1Rotated = 109,
    PrcEnvelopeNumber2Rotated = 110,
    PrcEnvelopeNumber3Rotated = 111,
    PrcEnvelopeNumber4Rotated = 112,
    PrcEnvelopeNumber5Rotated = 113,
    PrcEnvelopeNumber6Rotated = 114,
    PrcEnvelopeNumber7Rotated = 115,
    PrcEnvelopeNumber8Rotated = 116,
    PrcEnvelopeNumber9Rotated = 117,
    PrcEnvelopeNumber10Rotated = 118,
}
export declare class QueryLoadingDataEventArgs extends wjcCore.EventArgs {
    private _data;
    constructor(data?: any);
    readonly data: any;
}
export declare class _Report extends _DocumentSource {
    private _hasParameters;
    private _parameters;
    private _status;
    constructor(options: _IReportOptions);
    static getReportNames(serviceUrl: string, reportFilePath: string): IPromise;
    static getReports(serviceUrl: string, path: string, data?: any): IPromise;
    readonly reportName: string;
    statusChanged: wjcCore.Event;
    readonly hasParameters: boolean;
    readonly status: string;
    load(): IPromise;
    _updateStatus(newValue: string): void;
    cancel(): IPromise;
    onStatusChanged(e?: wjcCore.EventArgs): void;
    getDocumentStatus(): IPromise;
    dispose(): IPromise;
    setParameters(parameters: Object): IPromise;
    getParameters(): IPromise;
    _getIsDisposed(): boolean;
    _update(data: _IReportExecutionInfo): void;
    _checkIsLoadCompleted(data: _IReportExecutionInfo): boolean;
    _checkIsDisposed(data: _IReportExecutionInfo): boolean;
    _createDocumentService(options: _IReportService): _ReportService;
    readonly _innerService: _ReportService;
    render(): IPromise;
}
export interface _IReportService extends _IDocumentService {
    reportName: string;
}
export interface _IReportOptions extends _IDocumentOptions, _IReportService {
}
export declare class _ReportService extends _DocumentService implements _IReportService {
    private _reportName;
    private static _renderAction;
    private static _loadAction;
    private static _searchAction;
    private static _cancelAction;
    private static _outlinesAction;
    private static _exportAction;
    private static _reportsController;
    private static _reportController;
    private static _reportCacheController;
    private static _parametersAction;
    private static _bookmarkAction;
    private static _customActionAction;
    private static _pageSettingsAction;
    private static _supportedFormatsAction;
    private _cacheId;
    private _status;
    private static _invalidReportControllerError;
    private static _invalidReportCacheControllerError;
    constructor(options: _IReportService);
    readonly isCleared: boolean;
    static getReportNames(serviceUrl: string, reportFilePath: string): IPromise;
    static getReports(serviceUrl: string, path: string, data?: any): IPromise;
    readonly reportName: string;
    getBookmark(name: string): IPromise;
    executeCustomAction(actionString: string): IPromise;
    getDocumentStatus(): IPromise;
    _getReportCache(): IPromise;
    getParameters(): IPromise;
    _getReportUrl(...params: string[]): string;
    _getReportCacheUrl(...params: string[]): string;
    _checkReportController(promise: _Promise): boolean;
    _checkReportCacheController(promise?: _Promise): boolean;
    _getError(xhr: XMLHttpRequest): string;
    render(): IPromise;
    load(data?: any): IPromise;
    cancel(): IPromise;
    dispose(): IPromise;
    getOutlines(): IPromise;
    renderToFilter(options: Object): IPromise;
    getRenderToFilterUrl(options: Object): string;
    search(text: string, matchCase?: boolean, wholeWord?: boolean): IPromise;
    setPageSettings(pageSettings: _IPageSettings): IPromise;
    setParameters(parameters: Object): IPromise;
    getSupportedExportDescriptions(): IPromise;
}
export declare function _parseReportExecutionInfo(json: string): _IReportExecutionInfo;
export interface _IReportStatus extends _IDocumentStatus {
    hasParameters: boolean;
}
export interface _IReportExecutionInfo extends _IExecutionInfo {
    cacheId: string;
    isCleared: boolean;
}
export declare class _ExecutionStatus {
    static loaded: string;
    static rendering: string;
    static completed: string;
    static stopped: string;
    static cleared: string;
    static notFound: string;
}
export interface _IParameter {
    name: string;
    dataType: _ParameterType;
    nullable: boolean;
    allowedValues: any[];
    value: any;
    hidden: boolean;
    multiValue: boolean;
    prompt: string;
    error?: string;
}
export declare enum _ParameterType {
    Boolean = 0,
    DateTime = 1,
    Time = 2,
    Date = 3,
    Integer = 4,
    Float = 5,
    String = 6,
}
export interface ICatalogItem {
    name: string;
    path: string;
    type: CatalogItemType;
    items: ICatalogItem[];
}
export declare enum CatalogItemType {
    Folder = 0,
    File = 1,
    Report = 2,
}
export declare class _PdfDocumentSource extends _DocumentSource {
    private _status;
    constructor(options: _IDocumentService);
    readonly status: string;
    readonly _innerService: _PdfDocumentService;
    _createDocumentService(options: _IDocumentService): _PdfDocumentService;
    load(): IPromise;
    _updateStatus(newValue: string): void;
    getDocumentStatus(): IPromise;
    renderToFilter(options: Object): IPromise;
    _update(data: _IExecutionInfo): void;
    _checkIsDisposed(data: _IExecutionInfo): boolean;
}
export declare class _PdfDocumentService extends _DocumentService {
    private static _pdfController;
    private static _statusAction;
    private static _exportAction;
    private static _supportedFormatsAction;
    private static _invalidPdfControllerError;
    private _status;
    _getPdfUrl(...params: string[]): string;
    _getPdfStatus(data?: any): IPromise;
    _checkPdfController(promise?: _Promise): boolean;
    dispose(): IPromise;
    load(data?: any): IPromise;
    getDocumentStatus(data?: any): IPromise;
    renderToFilter(options: Object, data?: any): IPromise;
    getRenderToFilterUrl(options: Object): string;
    getSupportedExportDescriptions(): IPromise;
}
export declare function _parseExecutionInfo(json: string): _IExecutionInfo;
export declare enum ViewMode {
    Single = 0,
    Continuous = 1,
}
export interface _IPage {
    content: any;
    size?: _ISize;
}
export interface _ISize {
    width: _Unit;
    height: _Unit;
}
export interface _IHistory {
    zoomFactor: number;
    position: _IDocumentPosition;
}
export declare class _HistoryManager {
    private _items;
    private _position;
    statusChanged: wjcCore.Event;
    private _onStatusChanged();
    clear(): void;
    add(item: _IHistory): void;
    forward(): _IHistory;
    backward(): _IHistory;
    canForward(): boolean;
    canBackward(): boolean;
}
export declare class ViewerBase extends wjcCore.Control {
    private _scrollbarWidth;
    private _leftPanel;
    _viewpanelContainer: HTMLElement;
    private _viewpanelWrapper;
    private _initialPosition;
    private _initialTop;
    private _initialLeft;
    private _isScrolling;
    private _pageIndexChangedByScrolling;
    private _viewerContainer;
    private _preFetchPageCount;
    private _pages;
    _documentEventKey: string;
    private _keepSerConnTimer;
    private _documentSource;
    private _pageIndex;
    private _zoomFactor;
    private _selectMouseMode;
    private _viewMode;
    private _serviceUrl;
    private _filePath;
    private _paginated;
    private _needBind;
    private _historyManager;
    private _fullScreen;
    private _miniToolbarPinnedTimer;
    _sidePanel: HTMLElement;
    private _toolbar;
    private _miniToolbar;
    private _splitter;
    private _pageSetupDialog;
    private _expiredTime;
    private _autoHeightCalculated;
    private _startX;
    private _startY;
    private _exportMenu;
    private _placeHolderElement;
    private _hostOriginWidth;
    private _hostOriginHeight;
    private _bodyOriginScrollTop;
    private _bodyOriginScrollLeft;
    private static _bookmarkAttr;
    private static _isIE;
    private static _bookmarkReg;
    private static _customActionAttr;
    private static _customActionReg;
    private static _idReg;
    private static _idReferReg;
    private static _viewpanelContainerMinHeight;
    private static _miniToolbarPinnedTime;
    static _defaultZoomValues: {
        name: string;
        value: number;
    }[];
    private static _exportItemDescriptions;
    static controlTemplate: string;
    _documentSourceChanged: wjcCore.Event;
    pageIndexChanged: wjcCore.Event;
    viewModeChanged: wjcCore.Event;
    selectMouseModeChanged: wjcCore.Event;
    fullScreenChanged: wjcCore.Event;
    zoomFactorChanged: wjcCore.Event;
    queryLoadingData: wjcCore.Event;
    constructor(element: any, options?: any);
    serviceUrl: string;
    filePath: string;
    _innerPaginated: boolean;
    reload(): void;
    refresh(fullUpdate?: boolean): void;
    _getSource(): _DocumentSource;
    _needBindDocumentSource(): void;
    _supportsPageSettingActions(): boolean;
    private _init(options?);
    private _autoCalculateViewerContainerHeight();
    private _bindEvents();
    private _checkMiniToolbarVisible(e);
    private _showMiniToolbar(visible);
    private _startPanning(e);
    private _panning(e);
    private _stopPanning();
    _goToBookmark(name: string): void;
    _executeCustomAction(actionString: string): void;
    _getStatusUtilCompleted(documentSource: _DocumentSource): void;
    private _onViewScrolling();
    private _updateScrollPageIndex(isScrolling);
    private _createChildren();
    private _initSplitter();
    _toggleSplitter(collapsed?: boolean): void;
    private _resetMiniToolbarPosition();
    private _resetToolbarWidth();
    private _resetViewPanelContainerWidth();
    private _shouldAutoHeight();
    private _initSidePanel();
    private _highlightPosition(pageIndex, boundsList);
    private _scrollToPosition(position, addHistory?);
    private _initSidePanelSearch();
    private _initSidePanelOutlines();
    private _initSidePanelThumbnails();
    private _scrollToCurrentPage();
    private _scrollToInitialPosition();
    _executeAction(action: _ViewerActionType): void;
    private _initToolbar();
    private _clearExportMenuItems();
    private _updateExportMenu();
    private _actionIsChecked(action);
    private _actionIsDisabled(action);
    private _actionIsShown(action);
    _viewerActionStatusChanged: wjcCore.Event;
    _onViewerActionStatusChanged(e: _ViewerActionChangedEventArgs): void;
    private _setViewerAction(actionType, disabled?, checked?, shown?);
    private _updateViewerActions();
    private _updateViewModeActions();
    private _updatePageSettingsActions();
    private _updateSelectMouseModeActions();
    private _updateZoomFactorActions();
    private _onPageSettingsUpdated();
    private _onPageCountUpdated();
    private _updatePageNavActions();
    private _onHistoryManagerStatusUpdated();
    private _updateViewContainerCursor();
    private _updateFullScreenStyle();
    _initExportMenu(owner: HTMLElement): void;
    private _onExportClicked(menu);
    showPageSetupDialog(): void;
    private _createPageSetupDialog();
    zoomToView(): void;
    zoomToViewWidth(): void;
    private _getScrollbarWidth();
    private _getViewPortHeight();
    private _getViewPortWidth();
    private _setPageLandscape(landscape);
    _setPaginated(paginated: boolean): void;
    private _setPageSettings(pageSettings);
    _showViewPanelErrorMessage(message: string): void;
    _showViewPanelMessage(message?: string, className?: string): void;
    _removeViewPanelMessage(): void;
    _reRenderDocument(): void;
    private _zoomBtnClicked(zoomIn, zoomValues);
    _getDocumentSource(): _DocumentSource;
    _setDocumentSource(value: _DocumentSource): void;
    _loadDocument(value: _DocumentSource): IPromise;
    _getErrorMessage(reason: any): string;
    private _onDocumentSourceLoadCompleted();
    private _renderSinglePage(viewPage, pageIndex);
    private _addGlobalUniqueId(svgHtml);
    private _replaceActionLinks(svg);
    private _getPageSize();
    private _changePageZoom(viewPage);
    private _renderContinuousPage();
    _clearKeepSerConnTimer(): void;
    _keepServiceConnection(): void;
    _getExpiredTime(): number;
    _disposeDocument(): void;
    _resetDocument(): void;
    _setDocumentRendering(): void;
    private _createViewPage();
    private _addContinuousPage();
    private _addSinglePage();
    moveToPage(index: number): IPromise;
    private _innerMoveToPage(pageIndex, addHistory?);
    private _moveToLastPage();
    private _moveBackwardHistory();
    private _moveForwardHistory();
    private _moveToHistory(history);
    private _addHistory(position);
    private _ensureDocumentLoadCompleted(promise?);
    private _setPageIndex(pageIndex);
    _updatePageIndex(index: number): void;
    zoomFactor: number;
    private _changeViewerZoom();
    viewMode: ViewMode;
    selectMouseMode: boolean;
    fullScreen: boolean;
    readonly pageIndex: number;
    private _initMiniToolbar();
    private _pinMiniToolbar();
    private _updateViewPage();
    _onDocumentSourceChanged(e?: wjcCore.EventArgs): void;
    onPageIndexChanged(e?: wjcCore.EventArgs): void;
    onViewModeChanged(e?: wjcCore.EventArgs): void;
    onSelectMouseModeChanged(e?: wjcCore.EventArgs): void;
    onFullScreenChanged(e?: wjcCore.EventArgs): void;
    onZoomFactorChanged(e?: wjcCore.EventArgs): void;
    onQueryLoadingData(e: QueryLoadingDataEventArgs): void;
}
export declare class _SideTabs extends wjcCore.Control {
    private _headersContainer;
    private _contentsContainer;
    private _idCounter;
    private _tabPages;
    private _tabPageDic;
    tabPageActived: wjcCore.Event;
    tabPageVisibilityChanged: wjcCore.Event;
    expanded: wjcCore.Event;
    collapsed: wjcCore.Event;
    static _hiddenCss: string;
    static _activedCss: string;
    static _collapsedCss: string;
    static controlTemplate: string;
    constructor(element: any);
    applyTemplate(css: string, tpl: string, parts: Object): HTMLElement;
    readonly tabPages: _TabPage[];
    getTabPage(id: string): _TabPage;
    getFirstShownTabPage(except?: _TabPage): _TabPage;
    readonly visibleTabPagesCount: number;
    readonly activedTabPage: _TabPage;
    removePage(page: string | _TabPage): void;
    addPage(title: string, svgIcon: string, index?: number): _TabPage;
    readonly isCollapsed: boolean;
    hide(page: string | _TabPage): void;
    show(page: string | _TabPage): void;
    deactive(page: string | _TabPage): void;
    active(page: string | _TabPage): void;
    onTabPageActived(): void;
    onTabPageVisibilityChanged(tabPage: _TabPage): void;
    onExpanded(): void;
    onCollapsed(): void;
    collapse(): void;
    expand(): void;
    _getNewTabPageId(): string;
}
export interface _TabPageVisibilityChangedEventArgs {
    tabPage: _TabPage;
}
export declare class _TabPage {
    private _header;
    private _outContent;
    private _content;
    private _id;
    constructor(outContent: HTMLElement, header: HTMLElement, id: string);
    readonly isActived: boolean;
    readonly isHidden: boolean;
    readonly id: string;
    readonly header: HTMLElement;
    readonly content: HTMLElement;
    readonly outContent: HTMLElement;
    format(customizer: (_TabPage: this) => void): void;
}
export declare class _Toolbar extends wjcCore.Control {
    private _toolbarWrapper;
    private _toolbarContainer;
    private _toolbarLeft;
    private _toolbarRight;
    private _toolbarMoveTimer;
    private static _moveStep;
    private static _moveInterval;
    private static _enabledCss;
    static commandTagAttr: string;
    static controlTemplate: string;
    constructor(element: any);
    applyTemplate(css: string, tpl: string, parts: Object): HTMLElement;
    private _clearToolbarMoveTimer();
    private _scrollRight();
    private _scrollLeft();
    private _checkMoveButtonEnabled();
    private _showToolbarMoveButton(show);
    resetWidth(): void;
    addSeparator(): HTMLElement;
    svgButtonClicked: wjcCore.Event;
    onSvgButtonClicked(e: _ToolbarSvgButtonClickedEventArgs): void;
    addCustomItem(element: any, commandTag?: any): void;
    addSvgButton(title: string, svgContent: string, commandTag: any, isToggle?: boolean): HTMLElement;
    static _initToolbarPageNumberInput(hostToolbar: HTMLElement, viewer: ViewerBase): void;
    static _checkSeparatorShown(toolbar: _Toolbar): void;
}
export interface _ToolbarSvgButtonClickedEventArgs {
    commandTag: string;
}
export declare class _ViewerToolbar extends _Toolbar {
    private _viewer;
    constructor(element: any, viewer: ViewerBase);
    _initToolbarItems(): void;
    onSvgButtonClicked(e: _ToolbarSvgButtonClickedEventArgs): void;
    private _initToolbarZoomValue(hostToolbar);
}
export declare class _ViewerMiniToolbar extends _Toolbar {
    private _viewer;
    constructor(element: any, viewer: ViewerBase);
    _initToolbarItems(): void;
    onSvgButtonClicked(e: _ToolbarSvgButtonClickedEventArgs): void;
}
export declare function _createSvgBtn(svgContent: string): HTMLElement;
export declare class _PageSetupDialog extends wjcInput.Popup {
    private _btnClose;
    private _btnCancel;
    private _btnApply;
    private _divPaperKind;
    private _divOrientation;
    private _divMarginsLeft;
    private _divMarginsTop;
    private _divMarginsRight;
    private _divMarginsBottom;
    private _cmbPaperKind;
    private _cmbOrientation;
    private _numMarginsLeft;
    private _numMarginsTop;
    private _numMarginsRight;
    private _numMarginsBottom;
    private _uiUpdating;
    applied: wjcCore.Event;
    pageSettings: _IPageSettings;
    static controlTemplate: string;
    constructor(ele: any);
    private _addEvents();
    private _apply();
    private _updateValue();
    private onApplied();
    onShowing(e: wjcCore.CancelEventArgs): boolean;
    _updateUI(): void;
    onShown(e?: wjcCore.EventArgs): void;
    showWithValue(pageSettings: _IPageSettings): void;
}
export declare function _setLandscape(pageSettings: _IPageSettings, landscape: boolean): void;
export declare function _clonePageSettings(src: _IPageSettings): _IPageSettings;
export declare function _enumToArray(enumType: any): _IEnumItem[];
export declare function _removeChildren(node: HTMLElement, condition?: (ele: Element) => boolean): void;
export interface _IEnumItem {
    text: string;
    value: number;
}
export declare function _toDOMs(html: string): DocumentFragment;
export declare function _toDOM(html: string): HTMLElement;
export declare function _addEvent(elm: any, evType: string, fn: Function, useCapture?: boolean): void;
export declare function _checkImageButton(button: HTMLElement, checked: boolean): void;
export declare function _disableImageButton(button: HTMLElement, disabled: boolean): void;
export declare function _showImageButton(button: HTMLElement, visible: boolean): void;
export declare function _isDisabledImageButton(button: HTMLElement): boolean;
export declare function _isCheckedImageButton(button: HTMLElement): boolean;
export declare function _addWjHandler(key: string, event: wjcCore.Event, func: wjcCore.IEventHandler, self?: any): void;
export declare function _removeAllWjHandlers(key: string, event: wjcCore.Event): void;
export declare enum _ViewerActionType {
    TogglePaginated = 0,
    Print = 1,
    Exports = 2,
    Portrat = 3,
    Landscape = 4,
    ShowPageSetupDialog = 5,
    FirstPage = 6,
    PrePage = 7,
    NextPage = 8,
    LastPage = 9,
    PageNumber = 10,
    PageCountLabel = 11,
    Backward = 12,
    Forward = 13,
    SelectTool = 14,
    MoveTool = 15,
    Continuous = 16,
    Single = 17,
    ZoomOut = 18,
    ZoomIn = 19,
    ZoomValue = 20,
    FitWholePage = 21,
    FitPageWidth = 22,
    FullScreen = 23,
    ExitFullScreen = 24,
}
export interface _ViewerActionChangedEventArgs {
    action: _IViewerAction;
}
export interface _IViewerAction {
    actionType: _ViewerActionType;
    disabled: boolean;
    checked: boolean;
    shown: boolean;
}
export declare class ReportViewer extends ViewerBase {
    private _reportName;
    constructor(element: any, options?: any);
    reportName: string;
    paginated: boolean;
    static getReportNames(serviceUrl: string, reportFilePath: string): IPromise;
    static getReports(serviceUrl: string, path: string, data?: any): IPromise;
    private static _isRequiringParameters(parameters);
    private _initSidePanelParameters();
    private _updateLoadingDivContent(content);
    readonly _innerDocumentSource: _Report;
    _loadDocument(value: _Report): IPromise;
    _reRenderDocument(): void;
    _onDocumentStatusChanged(): void;
    private _renderDocumentSource();
    _disposeDocument(): void;
    _setDocumentRendering(): void;
    _getSource(): _Report;
    _supportsPageSettingActions(): boolean;
}
export declare class _ParametersEditor extends wjcCore.Control {
    private _itemSources;
    private _parameters;
    private _errors;
    private static _paramIdAttr;
    private static _errorsHiddenCss;
    private _errorsVisible;
    private _validateTimer;
    private _lastEditedParam;
    private static _dateTimeFormat;
    commit: wjcCore.Event;
    validate: wjcCore.Event;
    constructor(element: any);
    _setErrors(value: any[]): void;
    readonly parameters: Object;
    itemsSource: _IParameter[];
    _setErrorsVisible(value: boolean): void;
    _updateErrorsVisible(): void;
    onCommit(): void;
    onValidate(): void;
    _deferValidate(paramName: string, beforeValidate?: Function, afterValidate?: Function): void;
    private _updateErrorDiv();
    _render(): void;
    _validateParameters(): boolean;
    static _isFloat(value: string): boolean;
    static _checkValueType(value: string, isSpecificType: Function): boolean;
    private _generateComboEditor(parameter);
    private _updateParameters(parameter, value);
    private _generateBoolEditor(parameter);
    private _generateStringEditor(parameter);
    private _createTextarea(value, dataType);
    private _bindTextChangedEvent(element, parameter);
    private _generateNumberEditor(parameter);
    private _generateDateTimeEditor(parameter);
    private _validateNullValueOfParameter(element);
}
export declare class _MultiSelectEx {
    private _itemsSource;
    private _selectAllItem;
    private _multiSelect;
    private _selectedAll;
    private _innerCheckedItemsChanged;
    checkedItemsChanged: wjcCore.Event;
    constructor(element: HTMLElement);
    _updateHeader(): string;
    onIsDroppedDownChanged(): void;
    onCheckedItemsChanged(sender: any, e: any): void;
    isEditable: boolean;
    isDisabled: boolean;
    displayMemberPath: string;
    selectedValuePath: string;
    itemsSource: any[];
    checkedItems: any[];
    _updateSelectedAll(): void;
}
export declare class PdfViewer extends ViewerBase {
    constructor(element: any, options?: any);
    readonly _innerDocumentSource: _PdfDocumentSource;
    _getSource(): _PdfDocumentSource;
}
