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
"use strict";var __extends=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)},wjcChart=require('wijmo/wijmo.chart'),wjcCore=require('wijmo/wijmo'),wjcSelf=require('wijmo/wijmo.chart.hierarchical'),Sunburst,HierarchicalUtil;window.wijmo=window.wijmo||{};window.wijmo.chart=window.wijmo.chart||{};window.wijmo.chart.hierarchical=wjcSelf;Sunburst=function(n){function t(t,i){n.call(this,t,i);this._processedData=[];this._legendLabels=[];this._level=1;this._sliceIndex=0;this._selectionIndex=0;this.applyTemplate('wj-sunburst',null,null)}return __extends(t,n),Object.defineProperty(t.prototype,"bindingName",{get:function(){return this._bindName},set:function(n){n!=this._bindName&&(wjcCore.assert(n==null||wjcCore.isArray(n)||wjcCore.isString(n),'bindingName should be an array or a string.'),this._bindName=n,this._bindChart())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"childItemsPath",{get:function(){return this._childItemsPath},set:function(n){n!=this._childItemsPath&&(wjcCore.assert(n==null||wjcCore.isArray(n)||wjcCore.isString(n),'childItemsPath should be an array or a string.'),this._childItemsPath=n,this._bindChart())},enumerable:!0,configurable:!0}),t.prototype._initData=function(){n.prototype._initData.call(this);this._processedData=[];this._level=1;this._legendLabels=[]},t.prototype._performBind=function(){var t=this,n;this._initData();this._cv&&(n=this._cv.items,n&&(this._processedData=HierarchicalUtil.parseDataToHierarchical(n,this.binding,this.bindingName,this.childItemsPath),this._sum=this._calculateValueAndLevel(this._processedData,1),this._processedData.forEach(function(n){t._legendLabels.push(n.name)})))},t.prototype._calculateValueAndLevel=function(n,t){var i=this,r=0,u=this._values,f=this._labels;return this._level<t&&(this._level=t),n.forEach(function(n){var e;n.items?(e=i._calculateValueAndLevel(n.items,t+1),n.value=e,u.push(e),f.push(n.name)):(e=i._getBindData(n,u,f,'value','name'),n.value=e);r+=e}),r},t.prototype._renderPie=function(n,t,i,r,u){var f=this._getCenter();this._sliceIndex=0;this._renderHierarchicalSlices(n,f.x,f.y,this._processedData,this._sum,t,i,r,2*Math.PI,u,1)},t.prototype._renderHierarchicalSlices=function(n,t,i,r,u,f,e,o,s,h,c){var rt=r.length,a=o,g=this.reversed==!0,nt,tt,d,l,y,p,it,w,b,k,v;for(d=(f-e)/this._level,nt=f-(this._level-c)*d,tt=e+(c-1)*d,v=0;v<rt;v++)w=t,b=i,it=n.startGroup('slice-level'+c),c===1&&(n.fill=this._getColorLight(v),n.stroke=this._getColor(v)),y=r[v],p=Math.abs(y.value),l=Math.abs(p-u)<1e-10?s:s*p/u,k=g?a-.5*l:a+.5*l,h>0&&l<s&&(w+=h*Math.cos(k),b+=h*Math.sin(k)),y.items&&this._renderHierarchicalSlices(n,w,b,y.items,p,f,e,a,l,0,c+1),this._renderSlice(n,w,b,k,this._sliceIndex,nt,tt,a,l,s),this._sliceIndex++,g?a-=l:a+=l,n.endGroup(),this._pels.push(it)},t.prototype._getLabelsForLegend=function(){return this._legendLabels||[]},t.prototype._highlightCurrent=function(){this.selectionMode!=wjcChart.SelectionMode.None&&this._highlight(!0,this._selectionIndex)},t}(wjcChart.FlexPie);exports.Sunburst=Sunburst;HierarchicalUtil=function(){function n(){}return n.parseDataToHierarchical=function(t,i,r,u){var f=[],e;return t.length>0&&(wjcCore.isString(r)&&r.indexOf(',')>-1&&(r=r.split(',')),u?f=n.parseItems(t,i,r,u):(e=n.ConvertFlatData(t,i,r),f=n.parseItems(e,'value',r,'items'))),f},n.parseItems=function(t,i,r,u){for(var e=[],o=t.length,f=0;f<o;f++)e.push(n.parseItem(t[f],i,r,u));return e},n.isFlatItem=function(n,t){return wjcCore.isArray(n[t])?!1:!0},n.ConvertFlatData=function(t,i,r){for(var f=[],e={},o,s=t.length,u=0;u<s;u++)o=t[u],n.ConvertFlatItem(e,o,i,r);return n.ConvertFlatToHierarchical(f,e),f},n.ConvertFlatToHierarchical=function(t,i){var r=i.flatDataOrder;r&&r.forEach(function(r){var u={},f=i[r],e;u[i.field]=r;f.flatDataOrder?(e=[],n.ConvertFlatToHierarchical(e,f),u.items=e):u.value=f;t.push(u)})},n.ConvertFlatItem=function(t,i,r,u){var e,o,f,s,h;return(e=u.slice(),o=e.shift().trim(),f=i[o],f==null)?!1:(e.length===0?(t[f]=i[r],t.flatDataOrder?t.flatDataOrder.push(f):t.flatDataOrder=[f],t.field=o):(t[f]==null&&(t[f]={},t.flatDataOrder?t.flatDataOrder.push(f):t.flatDataOrder=[f],t.field=o),s=t[f],h=n.ConvertFlatItem(s,i,r,e),h||(t[f]=i[r])),!0)},n.parseItem=function(t,i,r,u){var f={},s,c,e,h,o;return wjcCore.isArray(u)?(o=u.slice(),h=o.length?o.shift().trim():''):(o=u,h=u),wjcCore.isArray(r)?(s=r.slice(),c=s.shift().trim(),f.nameField=c,f.name=t[c],e=t[h],s.length===0?f.value=t[i]:e&&wjcCore.isArray(e)&&e.length>0?f.items=n.parseItems(e,i,s,o):f.value=t[i]||0):(f.nameField=r,f.name=t[r],e=t[h],e!=null&&wjcCore.isArray(e)&&e.length>0?f.items=n.parseItems(e,i,r,o):f.value=t[i]),f},n.parseFlatItem=function(n){n.items||(n.items=[])},n}();exports.HierarchicalUtil=HierarchicalUtil