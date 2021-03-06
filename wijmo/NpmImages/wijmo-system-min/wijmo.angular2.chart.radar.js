﻿/*
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
System.register(['wijmo/wijmo.chart.radar', '@angular/core', '@angular/common', '@angular/forms', 'wijmo/wijmo.angular2.directiveBase'], function(exports_1, context_1)
{
"use strict";
var __moduleName=context_1 && context_1.id,
__extends=this && this.__extends || function(d, b)
{
function __()
{
this.constructor = d
}
for (var p in b)
b.hasOwnProperty(p) && (d[p] = b[p]);
d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __)
},
wjcChartRadar,
core_1,
core_2,
core_3,
common_1,
forms_1,
wijmo_angular2_directiveBase_1,
wjFlexRadar_outputs,
WjFlexRadar,
wjFlexRadarAxis_outputs,
WjFlexRadarAxis,
wjFlexRadarSeries_outputs,
WjFlexRadarSeries,
moduleExports,
WjChartRadarModule;
return {
setters: [function(wjcChartRadar_1)
{
wjcChartRadar = wjcChartRadar_1
}, function(core_1_1)
{
core_1 = core_1_1;
core_2 = core_1_1;
core_3 = core_1_1
}, function(common_1_1)
{
common_1 = common_1_1
}, function(forms_1_1)
{
forms_1 = forms_1_1
}, function(wijmo_angular2_directiveBase_1_1)
{
wijmo_angular2_directiveBase_1 = wijmo_angular2_directiveBase_1_1
}], execute: function()
{
wjFlexRadar_outputs = ['initialized', 'gotFocusNg: gotFocus', 'lostFocusNg: lostFocus', 'renderingNg: rendering', 'renderedNg: rendered', 'seriesVisibilityChangedNg: seriesVisibilityChanged', 'selectionChangedNg: selectionChanged', 'selectionChangePC: selectionChange', ];
WjFlexRadar = function(_super)
{
function WjFlexRadar(elRef, injector, parentCmp)
{
_super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef));
this.isInitialized = !1;
this.initialized = new core_1.EventEmitter(!0);
this.gotFocusNg = new core_1.EventEmitter(!1);
this.lostFocusNg = new core_1.EventEmitter(!1);
this.renderingNg = new core_1.EventEmitter(!1);
this.renderedNg = new core_1.EventEmitter(!1);
this.seriesVisibilityChangedNg = new core_1.EventEmitter(!1);
this.selectionChangedNg = new core_1.EventEmitter(!1);
this.selectionChangePC = new core_1.EventEmitter(!1);
var behavior=this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector, parentCmp)
}
return __extends(WjFlexRadar, _super), WjFlexRadar.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexRadar.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexRadar.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, Object.defineProperty(WjFlexRadar.prototype, "tooltipContent", {
get: function()
{
return this.tooltip.content
}, set: function(value)
{
this.tooltip.content = value
}, enumerable: !0, configurable: !0
}), Object.defineProperty(WjFlexRadar.prototype, "labelContent", {
get: function()
{
return this.dataLabel.content
}, set: function(value)
{
this.dataLabel.content = value
}, enumerable: !0, configurable: !0
}), WjFlexRadar.meta = {
outputs: wjFlexRadar_outputs, changeEvents: {selectionChanged: ['selection']}
}, WjFlexRadar.decorators = [{
type: core_1.Component, args: [{
selector: 'wj-flex-radar', template: "<div><ng-content></ng-content></div>", inputs: ['wjModelProperty', 'isDisabled', 'binding', 'footer', 'header', 'selectionMode', 'palette', 'plotMargin', 'footerStyle', 'headerStyle', 'tooltipContent', 'itemsSource', 'bindingX', 'interpolateNulls', 'legendToggle', 'symbolSize', 'options', 'selection', 'itemFormatter', 'labelContent', 'chartType', 'startAngle', 'totalAngle', 'reversed', 'stacking', ], outputs: wjFlexRadar_outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexRadar
})
}, {
provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: !0, deps: ['WjComponent']
}]
}, ]
}, ], WjFlexRadar.ctorParameters = [{
type: core_2.ElementRef, decorators: [{
type: core_3.Inject, args: [core_2.ElementRef, ]
}, ]
}, {
type: core_2.Injector, decorators: [{
type: core_3.Inject, args: [core_2.Injector, ]
}, ]
}, {
type: undefined, decorators: [{
type: core_3.Inject, args: ['WjComponent', ]
}, {type: core_3.SkipSelf}, {type: core_2.Optional}, ]
}, ], WjFlexRadar
}(wjcChartRadar.FlexRadar);
exports_1("WjFlexRadar", WjFlexRadar);
wjFlexRadarAxis_outputs = ['initialized', 'rangeChangedNg: rangeChanged', ];
WjFlexRadarAxis = function(_super)
{
function WjFlexRadarAxis(elRef, injector, parentCmp)
{
_super.call(this);
this.isInitialized = !1;
this.initialized = new core_1.EventEmitter(!0);
this.wjProperty = 'axes';
this.rangeChangedNg = new core_1.EventEmitter(!1);
var behavior=this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector, parentCmp)
}
return __extends(WjFlexRadarAxis, _super), WjFlexRadarAxis.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexRadarAxis.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexRadarAxis.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjFlexRadarAxis.meta = {outputs: wjFlexRadarAxis_outputs}, WjFlexRadarAxis.decorators = [{
type: core_1.Component, args: [{
selector: 'wj-flex-radar-axis', template: "", inputs: ['wjProperty', 'axisLine', 'format', 'labels', 'majorGrid', 'majorTickMarks', 'majorUnit', 'max', 'min', 'position', 'reversed', 'title', 'labelAngle', 'minorGrid', 'minorTickMarks', 'minorUnit', 'origin', 'logBase', 'plotArea', 'labelAlign', 'name', 'overlappingLabels', 'labelPadding', 'itemFormatter', 'itemsSource', 'binding', ], outputs: wjFlexRadarAxis_outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexRadarAxis
})
}, ]
}, ]
}, ], WjFlexRadarAxis.ctorParameters = [{
type: core_2.ElementRef, decorators: [{
type: core_3.Inject, args: [core_2.ElementRef, ]
}, ]
}, {
type: core_2.Injector, decorators: [{
type: core_3.Inject, args: [core_2.Injector, ]
}, ]
}, {
type: undefined, decorators: [{
type: core_3.Inject, args: ['WjComponent', ]
}, {type: core_3.SkipSelf}, {type: core_2.Optional}, ]
}, ], WjFlexRadarAxis
}(wjcChartRadar.FlexRadarAxis);
exports_1("WjFlexRadarAxis", WjFlexRadarAxis);
wjFlexRadarSeries_outputs = ['initialized', 'renderingNg: rendering', 'renderedNg: rendered', 'visibilityChangePC: visibilityChange', ];
WjFlexRadarSeries = function(_super)
{
function WjFlexRadarSeries(elRef, injector, parentCmp)
{
_super.call(this);
this.isInitialized = !1;
this.initialized = new core_1.EventEmitter(!0);
this.wjProperty = 'series';
this.renderingNg = new core_1.EventEmitter(!1);
this.renderedNg = new core_1.EventEmitter(!1);
this.visibilityChangePC = new core_1.EventEmitter(!1);
var behavior=this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector, parentCmp)
}
return __extends(WjFlexRadarSeries, _super), WjFlexRadarSeries.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexRadarSeries.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexRadarSeries.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjFlexRadarSeries.meta = {
outputs: wjFlexRadarSeries_outputs, changeEvents: {'chart.seriesVisibilityChanged': ['visibility']}, siblingId: 'series'
}, WjFlexRadarSeries.decorators = [{
type: core_1.Component, args: [{
selector: 'wj-flex-radar-series', template: "<div><ng-content></ng-content></div>", inputs: ['wjProperty', 'axisX', 'axisY', 'binding', 'bindingX', 'cssClass', 'name', 'style', 'altStyle', 'symbolMarker', 'symbolSize', 'symbolStyle', 'visibility', 'itemsSource', 'chartType', ], outputs: wjFlexRadarSeries_outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexRadarSeries
})
}, ]
}, ]
}, ], WjFlexRadarSeries.ctorParameters = [{
type: core_2.ElementRef, decorators: [{
type: core_3.Inject, args: [core_2.ElementRef, ]
}, ]
}, {
type: core_2.Injector, decorators: [{
type: core_3.Inject, args: [core_2.Injector, ]
}, ]
}, {
type: undefined, decorators: [{
type: core_3.Inject, args: ['WjComponent', ]
}, {type: core_3.SkipSelf}, {type: core_2.Optional}, ]
}, ], WjFlexRadarSeries
}(wjcChartRadar.FlexRadarSeries);
exports_1("WjFlexRadarSeries", WjFlexRadarSeries);
moduleExports = [WjFlexRadar, WjFlexRadarAxis, WjFlexRadarSeries];
WjChartRadarModule = function()
{
function WjChartRadarModule(){}
return WjChartRadarModule.decorators = [{
type: core_1.NgModule, args: [{
imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule], declarations: moduleExports.slice(), exports: moduleExports.slice()
}, ]
}, ], WjChartRadarModule.ctorParameters = [], WjChartRadarModule
}();
exports_1("WjChartRadarModule", WjChartRadarModule)
}
}
})