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
wjcOlap=require('wijmo/wijmo.olap'),
core_1=require('@angular/core'),
wijmo_angular2_directiveBase_1=require('wijmo/wijmo.angular2.directiveBase'),
WjPivotGrid=function(_super)
{
function WjPivotGrid(elRef, injector)
{
_super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef));
wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector)
}
return __extends(WjPivotGrid, _super), __decorate([wijmo_angular2_directiveBase_1.WjComponent({
selector: 'wj-pivot-grid', template: ""
}), __param(0, core_1.Inject(core_1.ElementRef)), __param(1, core_1.Inject(core_1.Injector))], WjPivotGrid)
}(wjcOlap.PivotGrid),
WjPivotChart,
WjPivotPanel,
moduleExports,
WjOlapModule;
exports.WjPivotGrid = WjPivotGrid;
WjPivotChart = function(_super)
{
function WjPivotChart(elRef, injector)
{
_super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef));
wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector)
}
return __extends(WjPivotChart, _super), __decorate([wijmo_angular2_directiveBase_1.WjComponent({
selector: 'wj-pivot-chart', template: ""
}), __param(0, core_1.Inject(core_1.ElementRef)), __param(1, core_1.Inject(core_1.Injector))], WjPivotChart)
}(wjcOlap.PivotChart);
exports.WjPivotChart = WjPivotChart;
WjPivotPanel = function(_super)
{
function WjPivotPanel(elRef, injector)
{
_super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef));
wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector)
}
return __extends(WjPivotPanel, _super), __decorate([wijmo_angular2_directiveBase_1.WjComponent({
selector: 'wj-pivot-panel', template: ""
}), __param(0, core_1.Inject(core_1.ElementRef)), __param(1, core_1.Inject(core_1.Injector))], WjPivotPanel)
}(wjcOlap.PivotPanel);
exports.WjPivotPanel = WjPivotPanel;
moduleExports = [WjPivotGrid, WjPivotChart, WjPivotPanel];
WjOlapModule = function()
{
function WjOlapModule(){}
return __decorate([core_1.NgModule({
imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule], declarations: moduleExports.slice(), exports: moduleExports.slice()
})], WjOlapModule)
}();
exports.WjOlapModule = WjOlapModule