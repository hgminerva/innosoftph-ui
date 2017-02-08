/*
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
};
define(["require", "exports", 'wijmo/wijmo.chart.interaction', '@angular/core', '@angular/common', 'wijmo/wijmo.angular2.directiveBase', 'wijmo/wijmo.angular2.chart'], function(require, exports, wjcChartInteraction, core_1, common_1, wijmo_angular2_directiveBase_1, wijmo_angular2_chart_1)
{
"use strict";
function tryGetModuleWijmoChartFinance()
{
var m1,
m2;
return (m1 = window.wijmo) && (m2 = m1.chart) && m2.finance
}
var WjFlexChartRangeSelector=function(_super)
{
function WjFlexChartRangeSelector(elRef, injector)
{
var parentCmp=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.findTypeParentBehavior(injector, WjFlexChartRangeSelector).directive;
_super.call(this, parentCmp);
wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector)
}
return __extends(WjFlexChartRangeSelector, _super), WjFlexChartRangeSelector = __decorate([wijmo_angular2_directiveBase_1.WjComponent({
selector: 'wj-flex-chart-range-selector', wjParentDirectives: [wijmo_angular2_chart_1.WjFlexChart, core_1.forwardRef(function()
{
return tryGetModuleWijmoChartFinance() && tryGetModuleWijmoChartFinance().FinancialChart
}), ], template: ""
}), __param(0, core_1.Inject(core_1.ElementRef)), __param(1, core_1.Inject(core_1.Injector))], WjFlexChartRangeSelector)
}(wjcChartInteraction.RangeSelector),
WjFlexChartGestures,
moduleExports,
WjChartInteractionModule;
exports.WjFlexChartRangeSelector = WjFlexChartRangeSelector;
WjFlexChartGestures = function(_super)
{
function WjFlexChartGestures(elRef, injector)
{
var parentCmp=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.findTypeParentBehavior(injector, WjFlexChartGestures).directive;
_super.call(this, parentCmp);
wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector)
}
return __extends(WjFlexChartGestures, _super), WjFlexChartGestures = __decorate([wijmo_angular2_directiveBase_1.WjComponent({
selector: 'wj-flex-chart-gestures', wjParentDirectives: [wijmo_angular2_chart_1.WjFlexChart, core_1.forwardRef(function()
{
return tryGetModuleWijmoChartFinance() && tryGetModuleWijmoChartFinance().FinancialChart
}), ], template: ""
}), __param(0, core_1.Inject(core_1.ElementRef)), __param(1, core_1.Inject(core_1.Injector))], WjFlexChartGestures)
}(wjcChartInteraction.ChartGestures);
exports.WjFlexChartGestures = WjFlexChartGestures;
moduleExports = [WjFlexChartRangeSelector, WjFlexChartGestures];
WjChartInteractionModule = function()
{
function WjChartInteractionModule(){}
return __decorate([core_1.NgModule({
imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule], declarations: moduleExports.slice(), exports: moduleExports.slice()
})], WjChartInteractionModule)
}();
exports.WjChartInteractionModule = WjChartInteractionModule
})