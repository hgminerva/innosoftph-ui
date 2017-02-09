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
var __extends=this && this.__extends || function(d, b)
{
function __()
{
this.constructor = d
}
for (var p in b)
b.hasOwnProperty(p) && (d[p] = b[p]);
d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __)
};
define(["require", "exports", 'wijmo/wijmo.grid.filter', '@angular/core', '@angular/core', '@angular/core', '@angular/common', 'wijmo/wijmo.angular2.directiveBase'], function(require, exports, wjcGridFilter, core_1, core_2, core_3, common_1, wijmo_angular2_directiveBase_1)
{
"use strict";
var wjFlexGridFilter_outputs=['initialized', 'filterChangingNg: filterChanging', 'filterChangedNg: filterChanged', 'filterAppliedNg: filterApplied', ],
WjFlexGridFilter=function(_super)
{
function WjFlexGridFilter(elRef, injector, parentCmp)
{
_super.call(this, parentCmp);
this.isInitialized = !1;
this.initialized = new core_1.EventEmitter(!0);
this.filterChangingNg = new core_1.EventEmitter(!1);
this.filterChangedNg = new core_1.EventEmitter(!1);
this.filterAppliedNg = new core_1.EventEmitter(!1);
var behavior=this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector, parentCmp)
}
return __extends(WjFlexGridFilter, _super), WjFlexGridFilter.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexGridFilter.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexGridFilter.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjFlexGridFilter.meta = {outputs: wjFlexGridFilter_outputs}, WjFlexGridFilter.decorators = [{
type: core_1.Component, args: [{
selector: 'wj-flex-grid-filter', template: "", inputs: ['wjProperty', 'showFilterIcons', 'showSortButtons', 'defaultFilterType', 'filterColumns', ], outputs: wjFlexGridFilter_outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexGridFilter
})
}, ]
}, ]
}, ], WjFlexGridFilter.ctorParameters = [{
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
}, ], WjFlexGridFilter
}(wjcGridFilter.FlexGridFilter),
moduleExports,
WjGridFilterModule;
exports.WjFlexGridFilter = WjFlexGridFilter;
moduleExports = [WjFlexGridFilter];
WjGridFilterModule = function()
{
function WjGridFilterModule(){}
return WjGridFilterModule.decorators = [{
type: core_1.NgModule, args: [{
imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule], declarations: moduleExports.slice(), exports: moduleExports.slice()
}, ]
}, ], WjGridFilterModule.ctorParameters = [], WjGridFilterModule
}();
exports.WjGridFilterModule = WjGridFilterModule
})