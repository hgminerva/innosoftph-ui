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
declare module wijmo.viewer {
    class _DocumentSource {
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
        pageCountChanged: Event;
        disposed: Event;
        pageSettingsChanged: Event;
        loadCompleted: Event;
        queryLoadingData: Event;
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
        onPageSettingsChanged(e?: EventArgs): void;
        onLoadCompleted(e?: EventArgs): void;
        onDisposed(e?: EventArgs): void;
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
        onPageCountChanged(e?: EventArgs): void;
        print(): void;
        renderToFilter(options: Object): IPromise;
        getRenderToFilterUrl(options: Object): string;
        search(text: string, matchCase?: boolean, wholeWord?: boolean): IPromise;
    }
    function _statusJsonReviver(k: string, v: any): any;
    interface _IDocumentStatus {
        documentId: string;
        status: string;
        errorList: string[];
        progress: number;
        pageCount: number;
        hasOutlines: boolean;
        pageSettings: _IPageSettings;
        features: _IDocumentFeatures;
    }
    interface _IDocumentFeatures {
        paginated: boolean;
        nonPaginated: boolean;
        textSearchInPaginatedMode: boolean;
        pageSettings: boolean;
    }
    interface _IExecutionInfo {
        documentStatus: _IDocumentStatus;
        loadedDateTime: Date;
        expiredDateTime: Date;
    }
    interface _IPageSettings {
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
    interface _ISearchResult {
        nearText: string;
        positionInNearText: number;
        boundsList: _IRect[];
        pageIndex: number;
    }
    interface _IOutlineNode {
        caption: string;
        children: _IOutlineNode[];
        level: number;
        target: string;
        position?: _IDocumentPosition;
    }
    interface _IRect {
        x: number;
        y: number;
        width: number;
        height: number;
    }
    interface _IDocumentPosition {
        pageBounds: _IRect;
        pageIndex: number;
    }
    interface _IExportDescription {
        name: string;
        format: string;
        optionDescriptions?: _IExportOptionDescription[];
    }
    interface _IExportOptionDescription {
        name: string;
        type: string;
        defaultValue: string;
        allowedValues?: string[];
    }
    interface _IDocumentService {
        serviceUrl: string;
        filePath: string;
    }
    interface _IDocumentOptions extends _IDocumentService {
        paginated?: boolean;
    }
    class _DocumentService implements _IDocumentService {
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
    function _pageSettingsJsonReviver(k: string, v: any): any;
    function _strEndsWith(text: string, suffix: string): boolean;
    function _appendQueryString(url: string, queries: Object): string;
    function _joinUrl(...data: (string | string[])[]): string;
    function _joinStringUrl(data: string[]): string[];
    function _prepareStringUrl(data: string): string[];
    function _httpRequest(url: string, settings?: _IHttpRequest): XMLHttpRequest;
    function _objToParams(obj: Object): string;
    interface _IHttpRequest {
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
    function _disableCache(url: string): string;
    function _twipToPixel(value: number): number;
    enum _UnitType {
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
    class _Unit {
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
    /**
     * Defines the interface of promise which is used for asynchronous calling.
     */
    interface IPromise {
        /**
         * Call the function after a promise is fulfilled or rejected.
         *
         * @param onFulfilled The function which will be executed when a promise is fulfilled.
         * This has a single parameter, the fulfillment value. If a value is returned, it will be
         * passed to the next callback function. If no value is returned, the original value will be passed.
         * @param onRejected The function which will be executed when a promise is rejected.
         * This has a single parameter, the rejection reason. If a value is returned, it will be
         * passed to the next callback function. If no value is returned, the original value will be passed.
         * @return An IPromise equivalent to the value you return from onFulfilled/onRejected after being passed.
         */
        then(onFulfilled?: (value?: any) => any, onRejected?: (reason?: any) => any): IPromise;
        /**
         * Call the function after a promise is rejected.
         *
         * @param onRejected The function which will be executed when a promise is rejected.
         * This has a single parameter, the rejection reason. The return value will be
         * passed to the next callback function.
         * @return An IPromise equivalent to the value returned by onFulfilled/onRejected after being passed.
         */
        catch(onRejected: (reason?: any) => any): IPromise;
    }
    class _Promise implements IPromise {
        private _callbacks;
        then(onFulfilled?: (value?: any) => any, onRejected?: (reason?: any) => any): IPromise;
        catch(onRejected: (reason?: any) => any): IPromise;
        resolve(value?: any): void;
        reject(reason?: any): void;
        onFulfilled(value: any): void;
        onRejected(reason: any): void;
    }
    class _CompositedPromise extends _Promise {
        private _promises;
        constructor(promises: IPromise[]);
        _init(): void;
    }
    enum _PaperKind {
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
    /**
     * Provides arguments for @see:queryLoadingData event.
     */
    class QueryLoadingDataEventArgs extends EventArgs {
        private _data;
        /**
         * Initializes a new instance of the @see:QueryLoadingDataEventArgs class.
         *
         * @param data The request data sent to the service on loading the document.
         */
        constructor(data?: any);
        /**
         * Gets the request data sent to the service on loading the document.
         */
        readonly data: any;
    }
}

declare module wijmo.viewer {
    class _Report extends _DocumentSource {
        private _hasParameters;
        private _parameters;
        private _status;
        constructor(options: _IReportOptions);
        static getReportNames(serviceUrl: string, reportFilePath: string): IPromise;
        static getReports(serviceUrl: string, path: string, data?: any): IPromise;
        readonly reportName: string;
        statusChanged: Event;
        readonly hasParameters: boolean;
        readonly status: string;
        load(): IPromise;
        _updateStatus(newValue: string): void;
        cancel(): IPromise;
        onStatusChanged(e?: EventArgs): void;
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
    interface _IReportService extends _IDocumentService {
        reportName: string;
    }
    interface _IReportOptions extends _IDocumentOptions, _IReportService {
    }
    class _ReportService extends _DocumentService implements _IReportService {
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
    function _parseReportExecutionInfo(json: string): _IReportExecutionInfo;
    interface _IReportStatus extends _IDocumentStatus {
        hasParameters: boolean;
    }
    interface _IReportExecutionInfo extends _IExecutionInfo {
        cacheId: string;
        isCleared: boolean;
    }
    class _ExecutionStatus {
        static loaded: string;
        static rendering: string;
        static completed: string;
        static stopped: string;
        static cleared: string;
        static notFound: string;
    }
    interface _IParameter {
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
    enum _ParameterType {
        Boolean = 0,
        DateTime = 1,
        Time = 2,
        Date = 3,
        Integer = 4,
        Float = 5,
        String = 6,
    }
    /**
    * Describes an item in the report server of a specific path.
    */
    interface ICatalogItem {
        /**
        * The short name of the item.
        */
        name: string;
        /**
        * The full path (starts with the report provider key) of the item.
        */
        path: string;
        /**
        * The type of the item.
        */
        type: CatalogItemType;
        /**
        * The array of child items.
        */
        items: ICatalogItem[];
    }
    /**
    * Specifies the type of a catalog item.
    */
    enum CatalogItemType {
        /**
        * A folder.
        */
        Folder = 0,
        /**
        * A FlexReport definition file.
        */
        File = 1,
        /**
        * An SSRS report or a FlexReport defined in the FlexReport definition file.
        */
        Report = 2,
    }
}

declare module wijmo.viewer {
    class _PdfDocumentSource extends _DocumentSource {
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
    class _PdfDocumentService extends _DocumentService {
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
    function _parseExecutionInfo(json: string): _IExecutionInfo;
}

/**
* Defines a series of classes, interfaces and functions related to the viewer controls.
*/
declare module wijmo.viewer {
    /**
    * Specifies the view modes, which define how to show document pages in the view panel.
    */
    enum ViewMode {
        /** Only show one document page. */
        Single = 0,
        /** Show document pages continuously. */
        Continuous = 1,
    }
    interface _IPage {
        content: any;
        size?: _ISize;
    }
    interface _ISize {
        width: _Unit;
        height: _Unit;
    }
    interface _IHistory {
        zoomFactor: number;
        position: _IDocumentPosition;
    }
    class _HistoryManager {
        private _items;
        private _position;
        statusChanged: Event;
        private _onStatusChanged();
        clear(): void;
        add(item: _IHistory): void;
        forward(): _IHistory;
        backward(): _IHistory;
        canForward(): boolean;
        canBackward(): boolean;
    }
    /**
     * Base class for all the viewer controls.
     */
    class ViewerBase extends Control {
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
        /**
         * Gets or sets the template used to instantiate the viewer controls.
         */
        static controlTemplate: string;
        _documentSourceChanged: Event;
        /**
         * Occurs after the page index is changed.
         */
        pageIndexChanged: Event;
        /**
         * Occurs after the view mode is changed.
         */
        viewModeChanged: Event;
        /**
         * Occurs after the select mouse mode is changed.
         */
        selectMouseModeChanged: Event;
        /**
         * Occurs after the full screen mode is changed.
         */
        fullScreenChanged: Event;
        /**
         * Occurs after the zoom factor is changed.
         */
        zoomFactorChanged: Event;
        /**
         * Occurs when querying the request data sent to the service before loading the document.
         */
        queryLoadingData: Event;
        /**
         * Initializes a new instance of the @see:ViewerBase class.
         *
         * @param element The DOM element that will host the control, or a selector for the host element (e.g. '#theCtrl').
         * @param options JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?: any);
        /**
         * Gets or sets the address of C1 Web API service.
         *
         * For example, "http://demos.componentone.com/aspnet/webapi/api".
         */
        serviceUrl: string;
        /**
         * Gets or sets the full path to the document on the server.
         *
         * The path starts with the key of a provider which is registered at server for locating specified document.
         */
        filePath: string;
        _innerPaginated: boolean;
        /**
         * Reloads the document.
         *
         * This is useful for force reloading and rerendering the document.
         */
        reload(): void;
        /**
         * Refreshes the control.
         *
         * @param fullUpdate Whether to update the control layout as well as the content.
         */
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
        _viewerActionStatusChanged: Event;
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
        /**
         * Shows the page setup dialog.
         */
        showPageSetupDialog(): void;
        private _createPageSetupDialog();
        /**
         * Scales the current page to show the whole page in view panel.
         */
        zoomToView(): void;
        /**
         * Scales the current page to fit the width of the view panel.
         */
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
        /**
         * Moves to the page at the specified index.
         *
         * @param index Index (0-base) of the page to move to.
         * @return An @see:wijmo.viewer.IPromise object with current page index.
         */
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
        /**
         * Gets or sets a value indicating the current zoom factor to show the document pages.
         */
        zoomFactor: number;
        private _changeViewerZoom();
        /**
        * Gets or sets a value indicating how to show the document pages.
        */
        viewMode: ViewMode;
        /**
        * Gets or sets a value indicating whether clicking and dragging the mouse in the view panel selects text.
        *
        * This property only works for desktop.
        * The default is true which means clicking and dragging the mouse will select the text.
        * Setting it to false means clicking and dragging the mouse will move the view page in the view panel.
        */
        selectMouseMode: boolean;
        /**
        * Gets or sets a value indicating whether the viewer is under full screen mode.
        */
        fullScreen: boolean;
        /**
        * Gets the index of the page which is currently displayed in the view panel.
        */
        readonly pageIndex: number;
        private _initMiniToolbar();
        private _pinMiniToolbar();
        private _updateViewPage();
        _onDocumentSourceChanged(e?: EventArgs): void;
        /**
         * Raises the @see:pageIndexChanged event.
         *
         * @param e The @see:EventArgs object.
         */
        onPageIndexChanged(e?: EventArgs): void;
        /**
         * Raises the @see:viewModeChanged event.
         *
         * @param e The @see:EventArgs object.
         */
        onViewModeChanged(e?: EventArgs): void;
        /**
         * Raises the @see:selectMouseModeChanged event.
         *
         * @param e The @see:EventArgs object.
         */
        onSelectMouseModeChanged(e?: EventArgs): void;
        /**
         * Raises the @see:fullScreenChanged event.
         *
         * @param e The @see:EventArgs object.
         */
        onFullScreenChanged(e?: EventArgs): void;
        /**
         * Raises the @see:zoomFactorChanged event.
         *
         * @param e The @see:EventArgs object.
         */
        onZoomFactorChanged(e?: EventArgs): void;
        /**
         * Raises the @see:queryLoadingData event.
         *
         * @param e The @see:QueryLoadingDataEventArgs object that contains the loading data.
         */
        onQueryLoadingData(e: QueryLoadingDataEventArgs): void;
    }
    class _SideTabs extends Control {
        private _headersContainer;
        private _contentsContainer;
        private _idCounter;
        private _tabPages;
        private _tabPageDic;
        tabPageActived: Event;
        tabPageVisibilityChanged: Event;
        expanded: Event;
        collapsed: Event;
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
    interface _TabPageVisibilityChangedEventArgs {
        tabPage: _TabPage;
    }
    class _TabPage {
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
    class _Toolbar extends Control {
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
        svgButtonClicked: Event;
        onSvgButtonClicked(e: _ToolbarSvgButtonClickedEventArgs): void;
        addCustomItem(element: any, commandTag?: any): void;
        addSvgButton(title: string, svgContent: string, commandTag: any, isToggle?: boolean): HTMLElement;
        static _initToolbarPageNumberInput(hostToolbar: HTMLElement, viewer: ViewerBase): void;
        static _checkSeparatorShown(toolbar: _Toolbar): void;
    }
    interface _ToolbarSvgButtonClickedEventArgs {
        commandTag: string;
    }
    class _ViewerToolbar extends _Toolbar {
        private _viewer;
        constructor(element: any, viewer: ViewerBase);
        _initToolbarItems(): void;
        onSvgButtonClicked(e: _ToolbarSvgButtonClickedEventArgs): void;
        private _initToolbarZoomValue(hostToolbar);
    }
    class _ViewerMiniToolbar extends _Toolbar {
        private _viewer;
        constructor(element: any, viewer: ViewerBase);
        _initToolbarItems(): void;
        onSvgButtonClicked(e: _ToolbarSvgButtonClickedEventArgs): void;
    }
    function _createSvgBtn(svgContent: string): HTMLElement;
    class _PageSetupDialog extends wijmo.input.Popup {
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
        applied: Event;
        pageSettings: _IPageSettings;
        static controlTemplate: string;
        constructor(ele: any);
        private _addEvents();
        private _apply();
        private _updateValue();
        private onApplied();
        onShowing(e: CancelEventArgs): boolean;
        _updateUI(): void;
        onShown(e?: EventArgs): void;
        showWithValue(pageSettings: _IPageSettings): void;
    }
    function _setLandscape(pageSettings: _IPageSettings, landscape: boolean): void;
    function _clonePageSettings(src: _IPageSettings): _IPageSettings;
    function _enumToArray(enumType: any): _IEnumItem[];
    function _removeChildren(node: HTMLElement, condition?: (ele: Element) => boolean): void;
    interface _IEnumItem {
        text: string;
        value: number;
    }
    function _toDOMs(html: string): DocumentFragment;
    function _toDOM(html: string): HTMLElement;
    function _addEvent(elm: any, evType: string, fn: Function, useCapture?: boolean): void;
    function _checkImageButton(button: HTMLElement, checked: boolean): void;
    function _disableImageButton(button: HTMLElement, disabled: boolean): void;
    function _showImageButton(button: HTMLElement, visible: boolean): void;
    function _isDisabledImageButton(button: HTMLElement): boolean;
    function _isCheckedImageButton(button: HTMLElement): boolean;
    function _addWjHandler(key: string, event: Event, func: IEventHandler, self?: any): void;
    function _removeAllWjHandlers(key: string, event: Event): void;
    enum _ViewerActionType {
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
    interface _ViewerActionChangedEventArgs {
        action: _IViewerAction;
    }
    interface _IViewerAction {
        actionType: _ViewerActionType;
        disabled: boolean;
        checked: boolean;
        shown: boolean;
    }
}

declare module wijmo.viewer {
    /**
     * Defines the ReportViewer control for displaying the FlexReport or SSRS report.
     *
     * The @see:serviceUrl property indicates the url of C1 Web API which provides report services.
     * The report services use C1FlexReport to process a FlexReport, and use C1SSRSDocumentSource and C1PdfDocumentSource to process an SSRS report.
     *
     * Here is the sample to show a FlexReport:
     * <pre>var reportViewer = new wijmo.viewer.ReportViewer('#reportViewer');
     * reportViewer.serviceUrl= 'http://demos.componentone.com/aspnet/webapi/api';
     * reportViewer.filePath= 'ReportsRoot/Formatting/AlternateBackground.flxr';
     * reportViewer.reportName = 'AlternateBackground';</pre>
     *
     * Here is the sample to show an SSRS report:
     * <pre>var reportViewer = new wijmo.viewer.ReportViewer('#reportViewer');
     * reportViewer.serviceUrl= 'http://demos.componentone.com/aspnet/webapi/api';
     * reportViewer.filePath= 'c1ssrs/AdventureWorks/Company Sales';</pre>
     */
    class ReportViewer extends ViewerBase {
        private _reportName;
        /**
         * Initializes a new instance of the @see:ReportViewer class.
         *
         * @param element The DOM element that will host the control, or a selector for the host element (e.g. '#theCtrl').
         * @param options JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?: any);
        /**
        * Gets or sets the report name.
        *
        * For FlexReport, sets it with the report name defined in the FlexReport definition file.
        * For SSRS report, leave it as empty string. The SSRS report path is specified by the @see:filePath property.
        */
        reportName: string;
        /**
        * Gets or sets a value indicating whether the content should be represented as a set of fixed sized pages.
        *
        * The default value is null which means using paginated mode for a FlexReport and non-paginaged mode for an SSRS report.
        */
        paginated: boolean;
        /**
         * Gets the report names defined in the specified FlexReport definition file.
         *
         * @param serviceUrl The address of C1 Web API service.
         * @param reportFilePath The full path to the FlexReport definition file.
         * @return An @see:wijmo.viewer.IPromise object with a string array which contains the report names.
         */
        static getReportNames(serviceUrl: string, reportFilePath: string): IPromise;
        /**
         * Gets the catalog items in the specified folder path.
         *
         * You can get all items under the folder path by passing the data parameter as:
         * 1) A true value.
         * 2) An object which has the "recursive" property with true value.
         *
         * @param serviceUrl The address of C1 Web API service.
         * @param path The folder path. The path to the FlexReport definition file will be treated as a folder path.
         * @param data The request data sent to the report service, or a boolean value indicates whether getting all items under the path.
         * @return An @see:IPromise object with an array of @see:wijmo.viewer.ICatalogItem.
         */
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
    class _ParametersEditor extends Control {
        private _itemSources;
        private _parameters;
        private _errors;
        private static _paramIdAttr;
        private static _errorsHiddenCss;
        private _errorsVisible;
        private _validateTimer;
        private _lastEditedParam;
        private static _dateTimeFormat;
        commit: Event;
        validate: Event;
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
    class _MultiSelectEx {
        private _itemsSource;
        private _selectAllItem;
        private _multiSelect;
        private _selectedAll;
        private _innerCheckedItemsChanged;
        checkedItemsChanged: Event;
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
}

declare module wijmo.viewer {
    /**
     * Defines the PDFViewer control for displaying the PDF document.
     *
     * The @see:serviceUrl property indicates the url of C1 Web API which provides PDF services.
     * The PDF services use C1PdfDocumentSource to process PDF document.
     *
     * Here is the sample to show a PDF document:
     * <pre>var pdfViewer = new wijmo.viewer.PdfViewer('#pdfViewer');
     * pdfViewer.serviceUrl= 'http://demos.componentone.com/aspnet/webapi/api';
     * pdfViewer.filePath= 'PdfsRoot/C1XapOptimizer.pdf';</pre>
     */
    class PdfViewer extends ViewerBase {
        /**
         * Initializes a new instance of the @see:PdfViewer class.
         *
         * @param element The DOM element that will host the control, or a selector for the host element (e.g. '#theCtrl').
         * @param options JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?: any);
        readonly _innerDocumentSource: _PdfDocumentSource;
        _getSource(): _PdfDocumentSource;
    }
}

