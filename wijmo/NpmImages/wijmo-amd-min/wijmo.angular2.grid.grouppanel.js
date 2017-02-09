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
define(["require", "exports", 'wijmo/wijmo.grid.grouppanel', '@angular/core', '@angular/core', '@angular/core', '@angular/common', '@angular/forms', 'wijmo/wijmo.angular2.directiveBase'], function(require, exports, wjcGridGrouppanel, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1)
{
"use strict";
var wjGroupPanel_outputs=['initialized', 'gotFocusNg: gotFocus', 'lostFocusNg: lostFocus', ],
WjGroupPanel=function(_super)
{
function WjGroupPanel(elRef, injector, parentCmp)
{
_super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef));
this.isInitialized = !1;
this.initialized = new core_1.EventEmitter(!0);
this.gotFocusNg = new core_1.EventEmitter(!1);
this.lostFocusNg = new core_1.EventEmitter(!1);
var behavior=this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector, parentCmp)
}
return __extends(WjGroupPanel, _super), WjGroupPanel.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjGroupPanel.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjGroupPanel.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjGroupPanel.meta = {outputs: wjGroupPanel_outputs}, WjGroupPanel.decorators = [{
type: core_1.Component, args: [{
selector: 'wj-group-panel', template: "", inputs: ['wjModelProperty', 'isDisabled', 'hideGroupedColumns', 'maxGroups', 'placeholder', 'grid', ], outputs: wjGroupPanel_outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjGroupPanel
})
}, {
provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: !0, deps: ['WjComponent']
}]
}, ]
}, ], WjGroupPanel.ctorParameters = [{
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
}, ], WjGroupPanel
}(wjcGridGrouppanel.GroupPanel),
moduleExports,
WjGridGrouppanelModule;
exports.WjGroupPanel = WjGroupPanel;
moduleExports = [WjGroupPanel];
WjGridGrouppanelModule = function()
{
function WjGridGrouppanelModule(){}
return WjGridGrouppanelModule.decorators = [{
type: core_1.NgModule, args: [{
imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule], declarations: moduleExports.slice(), exports: moduleExports.slice()
}, ]
}, ], WjGridGrouppanelModule.ctorParameters = [], WjGridGrouppanelModule
}();
exports.WjGridGrouppanelModule = WjGridGrouppanelModule
})