﻿/*
    *
    * Wijmo Library 5.20163.234
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the Wijmo Commercial License.
    * sales@wijmo.com
    * http://wijmo.com/products/wijmo-5/license/
    *
    */
"use strict";
var __extends=this && this.__extends || function(d, b)
{
function __()
{
this.constructor = d
}
for (var p in b)
b.hasOwnProperty(p) && (d[p] = b[p]);
d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __)
},
__decorate=this && this.__decorate || function(decorators, target, key, desc)
{
var c=arguments.length,
r=c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
d,
i;
if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
r = Reflect.decorate(decorators, target, key, desc);
else
for (i = decorators.length - 1; i >= 0; i--)
(d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
return c > 3 && r && Object.defineProperty(target, key, r), r
},
__param=this && this.__param || function(paramIndex, decorator)
{
return function(target, key)
{
decorator(target, key, paramIndex)
}
},
wjcGridSheet=require('wijmo/wijmo.grid.sheet'),
core_1=require('@angular/core'),
wijmo_angular2_directiveBase_1=require('wijmo/wijmo.angular2.directiveBase'),
WjFlexSheet=function(_super)
{
function WjFlexSheet(elRef, injector)
{
_super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef));
wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector)
}
return __extends(WjFlexSheet, _super), __decorate([wijmo_angular2_directiveBase_1.WjComponent({
selector: 'wj-flex-sheet', template: ""
}), __param(0, core_1.Inject(core_1.ElementRef)), __param(1, core_1.Inject(core_1.Injector))], WjFlexSheet)
}(wjcGridSheet.FlexSheet),
WjSheet,
moduleExports,
WjGridSheetModule;
exports.WjFlexSheet = WjFlexSheet;
WjSheet = function(_super)
{
function WjSheet(elRef, injector)
{
var parentCmp=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.findTypeParentBehavior(injector, WjSheet).directive;
_super.call(this, parentCmp);
this._flexSheet = parentCmp;
wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector)
}
return __extends(WjSheet, _super), WjSheet.prototype.ngOnChanges = function(changes)
{
var chg;
(chg = changes.rowCount) && chg.isFirstChange && (this.boundRowCount = chg.currentValue);
(chg = changes.columnCount) && chg.isFirstChange && (this.boundColumnCount = chg.currentValue)
}, WjSheet.prototype.ngOnInit = function()
{
return this.itemsSource ? this._flexSheet.addBoundSheet(this.name, this.itemsSource) : this._flexSheet.addUnboundSheet(this.name, this.boundRowCount != null ? +this.boundRowCount : null, this.boundColumnCount != null ? +this.boundColumnCount : null)
}, WjSheet = __decorate([wijmo_angular2_directiveBase_1.WjComponent({
selector: 'wj-sheet', template: "", wjParentDirectives: [WjFlexSheet]
}), __param(0, core_1.Inject(core_1.ElementRef)), __param(1, core_1.Inject(core_1.Injector))], WjSheet)
}(wjcGridSheet.Sheet);
exports.WjSheet = WjSheet;
moduleExports = [WjFlexSheet, WjSheet];
WjGridSheetModule = function()
{
function WjGridSheetModule(){}
return __decorate([core_1.NgModule({
imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule], declarations: moduleExports.slice(), exports: moduleExports.slice()
})], WjGridSheetModule)
}();
exports.WjGridSheetModule = WjGridSheetModule