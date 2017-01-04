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
var __extends=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)};define(["require","exports",'wijmo/wijmo','wijmo/wijmo.grid','wijmo/wijmo.grid.grouppanel'],function(n,t,i,r,u){"use strict";window.wijmo=window.wijmo||{};window.wijmo.grid=window.wijmo.grid||{};window.wijmo.grid.grouppanel=u;'use strict';var f=function(n){function t(t,u){var e,o,f;n.call(this,t);this._hideGroupedCols=!0;this._maxGroups=6;e='Missing dependency: GroupPanel requires ';i.assert(r!=null,e+'wijmo.grid.');o=this.getTemplate();this.applyTemplate('wj-grouppanel wj-control',o,{_divMarkers:'div-markers',_divPH:'div-ph'});f=this.hostElement;this.addEventListener(f,'dragstart',this._dragStart.bind(this));this.addEventListener(f,'dragover',this._dragOver.bind(this));this.addEventListener(f,'drop',this._drop.bind(this));this.addEventListener(f,'dragend',this._dragEnd.bind(this));this.addEventListener(f,'click',this._click.bind(this));this.initialize(u)}return __extends(t,n),Object.defineProperty(t.prototype,"hideGroupedColumns",{get:function(){return this._hideGroupedCols},set:function(n){n!=this._hideGroupedCols&&(this._hideGroupedCols=i.asBoolean(n))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"maxGroups",{get:function(){return this._maxGroups},set:function(n){n!=this._maxGroups&&(this._maxGroups=i.asNumber(n))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"placeholder",{get:function(){return this._divPH.textContent},set:function(n){this._divPH.textContent=n},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"grid",{get:function(){return this._g},set:function(n){n=i.asType(n,r.FlexGrid,!0);n!=this._g&&(this._g&&(this._g.draggingColumn.removeHandler(this._draggingColumn),this._g.sortedColumn.removeHandler(this.invalidate),this._g.itemsSourceChanged.removeHandler(this._itemsSourceChanged),this._g.columns.collectionChanged.removeHandler(this._itemsSourceChanged)),this._g=n,this._g&&(this._g.draggingColumn.addHandler(this._draggingColumn,this),this._g.sortedColumn.addHandler(this.invalidate,this),this._g.itemsSourceChanged.addHandler(this._itemsSourceChanged,this),this._g.columns.collectionChanged.addHandler(this._itemsSourceChanged,this)),this._itemsSourceChanged(this._g,null))},enumerable:!0,configurable:!0}),t.prototype.refresh=function(){var e,r,o,u,t,f,s;if(n.prototype.refresh.call(this),this._divMarkers.innerHTML='',this._dragMarker=this._dragCol=null,this._gds){for(e=this._g.sortRowIndex?this._g.sortRowIndex:this._g.columnHeaders.rows.length-1,r=0;r<this._gds.length;r++)o=this._gds[r],u=this._g.columns.getColumn(o.propertyName),u&&(t=document.createElement('div'),this._g.cellFactory.updateCell(this._g.columnHeaders,e,u.index,t),t.setAttribute('class','wj-cell wj-header wj-groupmarker'),i.setCss(t,{position:'static',display:'inline-block',verticalAlign:'top',left:'',top:'',right:'',height:'auto',width:'auto'}),f=t.querySelector('.wj-elem-filter'),f&&t.removeChild(f),s=i.createElement('<span wj-remove="" style="font-weight:normal;cursor:pointer;pointer;padding:12px;padding-right:3px">&times;</span>',t),this._divMarkers.appendChild(t));this._divMarkers.children.length>0?(this._divPH.style.display='none',this._divMarkers.style.display=''):(this._divPH.style.display='',this._divMarkers.style.display='none')}},t.prototype._addGroup=function(n,t){for(var f=this._getIndex(t),u=this._gds,r=0;r<u.length;r++)if(u[r].propertyName==n.binding){u.removeAt(r);r<f&&f--;break}for(r=this.maxGroups-1;r<u.length;r++)u.removeAt(r),r<f&&f--;u.deferUpdate(function(){var t=new i.PropertyGroupDescription(n.binding);u.insert(f,t)});n&&this.hideGroupedColumns&&(n.visible=!1);this.invalidate()},t.prototype._moveGroup=function(n,t){var r=this._gds,u=this._getElementIndex(this._dragMarker),i=this._getIndex(t);i>u&&i--;i>=this._gds.length&&(i=this._gds.length);u!=i&&r.deferUpdate(function(){var n=r[u];r.removeAt(u);r.insert(i,n)})},t.prototype._removeGroup=function(n){var i=this._gds[n].propertyName,t=this._g.columns.getColumn(i);this._gds.removeAt(n);t&&(t.visible=!0)},t.prototype._getIndex=function(n){for(var r,i=this._divMarkers.children,t=0;t<i.length;t++)if(r=i[t].getBoundingClientRect(),n.clientX<r.left+r.width/2)return t;return i.length},t.prototype._getElementIndex=function(n){var i,t;if(n.parentElement)for(i=n.parentElement.children,t=0;t<i.length;t++)if(i[t]==n)return t;return-1},t.prototype._draggingColumn=function(n,t){var i=this._g.columns[t.col];this._dragCol=i.binding?i:null},t.prototype._itemsSourceChanged=function(){this._gds&&this._gds.collectionChanged.removeHandler(this._groupsChanged);this._gds=null;this._g.collectionView&&(this._gds=this._g.collectionView.groupDescriptions,this._gds.collectionChanged.addHandler(this._groupsChanged,this));this.invalidate()},t.prototype._groupsChanged=function(){this.invalidate()},t.prototype._dragStart=function(n){n.dataTransfer.effectAllowed='move';n.dataTransfer.setData('text','');this._dragMarker=n.target;this._dragCol=null},t.prototype._dragOver=function(n){var t=this._dragCol||this._dragMarker;t&&(n.dataTransfer.dropEffect='move',n.preventDefault())},t.prototype._drop=function(n){this._dragMarker?this._moveGroup(this._dragMarker,n):this._dragCol&&this._addGroup(this._dragCol,n)},t.prototype._dragEnd=function(){this._dragMarker=this._dragCol=null},t.prototype._click=function(n){for(var o=document.elementFromPoint(n.clientX,n.clientY),c=o.getAttribute('wj-remove')!=null,t=o,f,e,u,h;t.parentElement&&!i.hasClass(t,'wj-cell');)t=t.parentElement;if(i.hasClass(t,'wj-cell')){var s=this._getElementIndex(t),l=this._g.collectionView,r=l.sortDescriptions;if(c)this._removeGroup(s);else if(n.ctrlKey)r.clear(),this.invalidate();else{for(f=this._gds[s],e=!0,u=0;u<r.length;u++)if(r[u].property==f.propertyName){e=!r[u].ascending;break}h=new i.SortDescription(f.propertyName,e);r.splice(0,r.length,h);this.invalidate()}}},t.controlTemplate='<div style="cursor:default;overflow:hidden;height:100%;width:100%;min-height:1em"><div wj-part="div-ph"><\/div><div wj-part="div-markers"><\/div><\/div>',t}(i.Control);t.GroupPanel=f})