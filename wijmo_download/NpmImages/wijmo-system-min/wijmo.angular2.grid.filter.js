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
System.register(['wijmo/wijmo.grid.filter', '@angular/core', 'wijmo/wijmo.angular2.directiveBase', 'wijmo/wijmo.angular2.grid'], function(exports_1, context_1)
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
wjcGridFilter,
core_1,
wijmo_angular2_directiveBase_1,
wijmo_angular2_grid_1,
WjFlexGridFilter,
moduleExports,
WjGridFilterModule;
return {
setters: [function(wjcGridFilter_1)
{
wjcGridFilter = wjcGridFilter_1
}, function(core_1_1)
{
core_1 = core_1_1
}, function(wijmo_angular2_directiveBase_1_1)
{
wijmo_angular2_directiveBase_1 = wijmo_angular2_directiveBase_1_1
}, function(wijmo_angular2_grid_1_1)
{
wijmo_angular2_grid_1 = wijmo_angular2_grid_1_1
}], execute: function()
{
WjFlexGridFilter = function(_super)
{
function WjFlexGridFilter(elRef, injector)
{
var parentCmp=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.findTypeParentBehavior(injector, WjFlexGridFilter).directive;
_super.call(this, parentCmp);
wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector)
}
return __extends(WjFlexGridFilter, _super), WjFlexGridFilter = __decorate([wijmo_angular2_directiveBase_1.WjComponent({
selector: 'wj-flex-grid-filter', template: "", wjParentDirectives: [wijmo_angular2_grid_1.WjFlexGrid]
}), __param(0, core_1.Inject(core_1.ElementRef)), __param(1, core_1.Inject(core_1.Injector))], WjFlexGridFilter)
}(wjcGridFilter.FlexGridFilter);
exports_1("WjFlexGridFilter", WjFlexGridFilter);
moduleExports = [WjFlexGridFilter];
WjGridFilterModule = function()
{
function WjGridFilterModule(){}
return __decorate([core_1.NgModule({
imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule], declarations: moduleExports.slice(), exports: moduleExports.slice()
})], WjGridFilterModule)
}();
exports_1("WjGridFilterModule", WjGridFilterModule)
}
}
})