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
System.register(['wijmo/wijmo.chart.annotation', '@angular/core', '@angular/common', 'wijmo/wijmo.angular2.directiveBase', 'wijmo/wijmo.angular2.chart'], function(exports_1, context_1)
{
"use strict";
function tryGetModuleWijmoChartFinance()
{
var m1,
m2;
return (m1 = window.wijmo) && (m2 = m1.chart) && m2.finance
}
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
wjcChartAnnotation,
core_1,
common_1,
wijmo_angular2_directiveBase_1,
wijmo_angular2_chart_1,
WjFlexChartAnnotationLayer,
WjFlexChartAnnotationText,
WjFlexChartAnnotationEllipse,
WjFlexChartAnnotationRectangle,
WjFlexChartAnnotationLine,
WjFlexChartAnnotationPolygon,
WjFlexChartAnnotationCircle,
WjFlexChartAnnotationSquare,
WjFlexChartAnnotationImage,
moduleExports,
WjChartAnnotationModule;
return {
setters: [function(wjcChartAnnotation_1)
{
wjcChartAnnotation = wjcChartAnnotation_1
}, function(core_1_1)
{
core_1 = core_1_1
}, function(common_1_1)
{
common_1 = common_1_1
}, function(wijmo_angular2_directiveBase_1_1)
{
wijmo_angular2_directiveBase_1 = wijmo_angular2_directiveBase_1_1
}, function(wijmo_angular2_chart_1_1)
{
wijmo_angular2_chart_1 = wijmo_angular2_chart_1_1
}], execute: function()
{
WjFlexChartAnnotationLayer = function(_super)
{
function WjFlexChartAnnotationLayer(elRef, injector)
{
var parentCmp=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.findTypeParentBehavior(injector, WjFlexChartAnnotationLayer).directive;
_super.call(this, parentCmp);
wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector)
}
return __extends(WjFlexChartAnnotationLayer, _super), WjFlexChartAnnotationLayer = __decorate([wijmo_angular2_directiveBase_1.WjComponent({
selector: 'wj-flex-chart-annotation-layer', wjParentDirectives: [wijmo_angular2_chart_1.WjFlexChart, core_1.forwardRef(function()
{
return tryGetModuleWijmoChartFinance() && tryGetModuleWijmoChartFinance().FinancialChart
}), ], template: ""
}), __param(0, core_1.Inject(core_1.ElementRef)), __param(1, core_1.Inject(core_1.Injector))], WjFlexChartAnnotationLayer)
}(wjcChartAnnotation.AnnotationLayer);
exports_1("WjFlexChartAnnotationLayer", WjFlexChartAnnotationLayer);
WjFlexChartAnnotationText = function(_super)
{
function WjFlexChartAnnotationText(elRef, injector)
{
_super.call(this);
wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector)
}
return __extends(WjFlexChartAnnotationText, _super), __decorate([wijmo_angular2_directiveBase_1.WjComponent({
selector: 'wj-flex-chart-annotation-text', wjMetadataId: 'FlexChartAnnotation', wjSiblingDirectiveId: 'annotation', wjParentDirectives: [WjFlexChartAnnotationLayer], template: ""
}), __param(0, core_1.Inject(core_1.ElementRef)), __param(1, core_1.Inject(core_1.Injector))], WjFlexChartAnnotationText)
}(wjcChartAnnotation.Text);
exports_1("WjFlexChartAnnotationText", WjFlexChartAnnotationText);
WjFlexChartAnnotationEllipse = function(_super)
{
function WjFlexChartAnnotationEllipse(elRef, injector)
{
_super.call(this);
wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector)
}
return __extends(WjFlexChartAnnotationEllipse, _super), __decorate([wijmo_angular2_directiveBase_1.WjComponent({
selector: 'wj-flex-chart-annotation-ellipse', wjMetadataId: 'FlexChartAnnotation', wjSiblingDirectiveId: 'annotation', wjParentDirectives: [WjFlexChartAnnotationLayer], template: ""
}), __param(0, core_1.Inject(core_1.ElementRef)), __param(1, core_1.Inject(core_1.Injector))], WjFlexChartAnnotationEllipse)
}(wjcChartAnnotation.Ellipse);
exports_1("WjFlexChartAnnotationEllipse", WjFlexChartAnnotationEllipse);
WjFlexChartAnnotationRectangle = function(_super)
{
function WjFlexChartAnnotationRectangle(elRef, injector)
{
_super.call(this);
wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector)
}
return __extends(WjFlexChartAnnotationRectangle, _super), __decorate([wijmo_angular2_directiveBase_1.WjComponent({
selector: 'wj-flex-chart-annotation-rectangle', wjMetadataId: 'FlexChartAnnotation', wjSiblingDirectiveId: 'annotation', wjParentDirectives: [WjFlexChartAnnotationLayer], template: ""
}), __param(0, core_1.Inject(core_1.ElementRef)), __param(1, core_1.Inject(core_1.Injector))], WjFlexChartAnnotationRectangle)
}(wjcChartAnnotation.Rectangle);
exports_1("WjFlexChartAnnotationRectangle", WjFlexChartAnnotationRectangle);
WjFlexChartAnnotationLine = function(_super)
{
function WjFlexChartAnnotationLine(elRef, injector)
{
_super.call(this);
wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector)
}
return __extends(WjFlexChartAnnotationLine, _super), __decorate([wijmo_angular2_directiveBase_1.WjComponent({
selector: 'wj-flex-chart-annotation-line', wjMetadataId: 'FlexChartAnnotation', wjSiblingDirectiveId: 'annotation', wjParentDirectives: [WjFlexChartAnnotationLayer], template: ""
}), __param(0, core_1.Inject(core_1.ElementRef)), __param(1, core_1.Inject(core_1.Injector))], WjFlexChartAnnotationLine)
}(wjcChartAnnotation.Line);
exports_1("WjFlexChartAnnotationLine", WjFlexChartAnnotationLine);
WjFlexChartAnnotationPolygon = function(_super)
{
function WjFlexChartAnnotationPolygon(elRef, injector)
{
_super.call(this);
wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector)
}
return __extends(WjFlexChartAnnotationPolygon, _super), __decorate([wijmo_angular2_directiveBase_1.WjComponent({
selector: 'wj-flex-chart-annotation-polygon', wjMetadataId: 'FlexChartAnnotation', wjSiblingDirectiveId: 'annotation', wjParentDirectives: [WjFlexChartAnnotationLayer], template: ""
}), __param(0, core_1.Inject(core_1.ElementRef)), __param(1, core_1.Inject(core_1.Injector))], WjFlexChartAnnotationPolygon)
}(wjcChartAnnotation.Polygon);
exports_1("WjFlexChartAnnotationPolygon", WjFlexChartAnnotationPolygon);
WjFlexChartAnnotationCircle = function(_super)
{
function WjFlexChartAnnotationCircle(elRef, injector)
{
_super.call(this);
wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector)
}
return __extends(WjFlexChartAnnotationCircle, _super), __decorate([wijmo_angular2_directiveBase_1.WjComponent({
selector: 'wj-flex-chart-annotation-circle', wjMetadataId: 'FlexChartAnnotation', wjSiblingDirectiveId: 'annotation', wjParentDirectives: [WjFlexChartAnnotationLayer], template: ""
}), __param(0, core_1.Inject(core_1.ElementRef)), __param(1, core_1.Inject(core_1.Injector))], WjFlexChartAnnotationCircle)
}(wjcChartAnnotation.Circle);
exports_1("WjFlexChartAnnotationCircle", WjFlexChartAnnotationCircle);
WjFlexChartAnnotationSquare = function(_super)
{
function WjFlexChartAnnotationSquare(elRef, injector)
{
_super.call(this);
wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector)
}
return __extends(WjFlexChartAnnotationSquare, _super), __decorate([wijmo_angular2_directiveBase_1.WjComponent({
selector: 'wj-flex-chart-annotation-square', wjMetadataId: 'FlexChartAnnotation', wjSiblingDirectiveId: 'annotation', wjParentDirectives: [WjFlexChartAnnotationLayer], template: ""
}), __param(0, core_1.Inject(core_1.ElementRef)), __param(1, core_1.Inject(core_1.Injector))], WjFlexChartAnnotationSquare)
}(wjcChartAnnotation.Square);
exports_1("WjFlexChartAnnotationSquare", WjFlexChartAnnotationSquare);
WjFlexChartAnnotationImage = function(_super)
{
function WjFlexChartAnnotationImage(elRef, injector)
{
_super.call(this);
wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector)
}
return __extends(WjFlexChartAnnotationImage, _super), __decorate([wijmo_angular2_directiveBase_1.WjComponent({
selector: 'wj-flex-chart-annotation-image', wjMetadataId: 'FlexChartAnnotation', wjSiblingDirectiveId: 'annotation', wjParentDirectives: [WjFlexChartAnnotationLayer], template: ""
}), __param(0, core_1.Inject(core_1.ElementRef)), __param(1, core_1.Inject(core_1.Injector))], WjFlexChartAnnotationImage)
}(wjcChartAnnotation.Image);
exports_1("WjFlexChartAnnotationImage", WjFlexChartAnnotationImage);
moduleExports = [WjFlexChartAnnotationLayer, WjFlexChartAnnotationText, WjFlexChartAnnotationEllipse, WjFlexChartAnnotationRectangle, WjFlexChartAnnotationLine, WjFlexChartAnnotationPolygon, WjFlexChartAnnotationCircle, WjFlexChartAnnotationSquare, WjFlexChartAnnotationImage, ];
WjChartAnnotationModule = function()
{
function WjChartAnnotationModule(){}
return __decorate([core_1.NgModule({
imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule], declarations: moduleExports.slice(), exports: moduleExports.slice()
})], WjChartAnnotationModule)
}();
exports_1("WjChartAnnotationModule", WjChartAnnotationModule)
}
}
})