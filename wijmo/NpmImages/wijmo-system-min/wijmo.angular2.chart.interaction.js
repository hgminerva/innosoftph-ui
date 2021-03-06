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
System.register(['wijmo/wijmo.chart.interaction', '@angular/core', '@angular/common', 'wijmo/wijmo.angular2.directiveBase'], function(exports_1, context_1)
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
wjcChartInteraction,
core_1,
core_2,
core_3,
common_1,
wijmo_angular2_directiveBase_1,
wjFlexChartRangeSelector_outputs,
WjFlexChartRangeSelector,
wjFlexChartGestures_outputs,
WjFlexChartGestures,
moduleExports,
WjChartInteractionModule;
return {
setters: [function(wjcChartInteraction_1)
{
wjcChartInteraction = wjcChartInteraction_1
}, function(core_1_1)
{
core_1 = core_1_1;
core_2 = core_1_1;
core_3 = core_1_1
}, function(common_1_1)
{
common_1 = common_1_1
}, function(wijmo_angular2_directiveBase_1_1)
{
wijmo_angular2_directiveBase_1 = wijmo_angular2_directiveBase_1_1
}], execute: function()
{
wjFlexChartRangeSelector_outputs = ['initialized', 'rangeChangedNg: rangeChanged', ];
WjFlexChartRangeSelector = function(_super)
{
function WjFlexChartRangeSelector(elRef, injector, parentCmp)
{
_super.call(this, parentCmp);
this.isInitialized = !1;
this.initialized = new core_1.EventEmitter(!0);
this.rangeChangedNg = new core_1.EventEmitter(!1);
var behavior=this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector, parentCmp)
}
return __extends(WjFlexChartRangeSelector, _super), WjFlexChartRangeSelector.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexChartRangeSelector.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexChartRangeSelector.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjFlexChartRangeSelector.meta = {outputs: wjFlexChartRangeSelector_outputs}, WjFlexChartRangeSelector.decorators = [{
type: core_1.Component, args: [{
selector: 'wj-flex-chart-range-selector', template: "", inputs: ['wjProperty', 'isVisible', 'min', 'max', 'orientation', 'seamless', 'minScale', 'maxScale', ], outputs: wjFlexChartRangeSelector_outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexChartRangeSelector
})
}, ]
}, ]
}, ], WjFlexChartRangeSelector.ctorParameters = [{
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
}, ], WjFlexChartRangeSelector
}(wjcChartInteraction.RangeSelector);
exports_1("WjFlexChartRangeSelector", WjFlexChartRangeSelector);
wjFlexChartGestures_outputs = ['initialized', ];
WjFlexChartGestures = function(_super)
{
function WjFlexChartGestures(elRef, injector, parentCmp)
{
_super.call(this, parentCmp);
this.isInitialized = !1;
this.initialized = new core_1.EventEmitter(!0);
var behavior=this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector, parentCmp)
}
return __extends(WjFlexChartGestures, _super), WjFlexChartGestures.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexChartGestures.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexChartGestures.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjFlexChartGestures.meta = {outputs: wjFlexChartGestures_outputs}, WjFlexChartGestures.decorators = [{
type: core_1.Component, args: [{
selector: 'wj-flex-chart-gestures', template: "", inputs: ['wjProperty', 'mouseAction', 'interactiveAxes', 'enable', 'scaleX', 'scaleY', 'posX', 'posY', ], outputs: wjFlexChartGestures_outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexChartGestures
})
}, ]
}, ]
}, ], WjFlexChartGestures.ctorParameters = [{
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
}, ], WjFlexChartGestures
}(wjcChartInteraction.ChartGestures);
exports_1("WjFlexChartGestures", WjFlexChartGestures);
moduleExports = [WjFlexChartRangeSelector, WjFlexChartGestures];
WjChartInteractionModule = function()
{
function WjChartInteractionModule(){}
return WjChartInteractionModule.decorators = [{
type: core_1.NgModule, args: [{
imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule], declarations: moduleExports.slice(), exports: moduleExports.slice()
}, ]
}, ], WjChartInteractionModule.ctorParameters = [], WjChartInteractionModule
}();
exports_1("WjChartInteractionModule", WjChartInteractionModule)
}
}
})