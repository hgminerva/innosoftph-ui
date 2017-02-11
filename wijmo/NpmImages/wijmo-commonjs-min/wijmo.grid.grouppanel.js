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
"use strict";var __extends=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)},wjcCore=require('wijmo/wijmo'),wjcGrid=require('wijmo/wijmo.grid'),wjcSelf=require('wijmo/wijmo.grid.grouppanel'),GroupPanel;window.wijmo=window.wijmo||{};window.wijmo.grid=window.wijmo.grid||{};window.wijmo.grid.grouppanel=wjcSelf;GroupPanel=function(n){function t(t,i){var u,f,r;n.call(this,t);this._hideGroupedCols=!0;this._maxGroups=6;u='Missing dependency: GroupPanel requires ';wjcCore.assert(wjcGrid!=null,u+'wijmo.grid.');f=this.getTemplate();this.applyTemplate('wj-grouppanel wj-control',f,{_divMarkers:'div-markers',_divPH:'div-ph'});r=this.hostElement;this.addEventListener(r,'dragstart',this._dragStart.bind(this));this.addEventListener(r,'dragover',this._dragOver.bind(this));this.addEventListener(r,'drop',this._drop.bind(this));this.addEventListener(r,'dragend',this._dragEnd.bind(this));this.addEventListener(r,'click',this._click.bind(this));this.initialize(i)}return __extends(t,n),Object.defineProperty(t.prototype,"hideGroupedColumns",{get:function(){return this._hideGroupedCols},set:function(n){n!=this._hideGroupedCols&&(this._hideGroupedCols=wjcCore.asBoolean(n))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"maxGroups",{get:function(){return this._maxGroups},set:function(n){n!=this._maxGroups&&(this._maxGroups=wjcCore.asNumber(n))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"placeholder",{get:function(){return this._divPH.textContent},set:function(n){this._divPH.textContent=n},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"grid",{get:function(){return this._g},set:function(n){n=wjcCore.asType(n,wjcGrid.FlexGrid,!0);n!=this._g&&(this._g&&(this._g.draggingColumn.removeHandler(this._draggingColumn),this._g.sortedColumn.removeHandler(this.invalidate),this._g.itemsSourceChanged.removeHandler(this._itemsSourceChanged),this._g.columns.collectionChanged.removeHandler(this._itemsSourceChanged)),this._g=n,this._g&&(this._g.draggingColumn.addHandler(this._draggingColumn,this),this._g.sortedColumn.addHandler(this.invalidate,this),this._g.itemsSourceChanged.addHandler(this._itemsSourceChanged,this),this._g.columns.collectionChanged.addHandler(this._itemsSourceChanged,this)),this._itemsSourceChanged(this._g,null))},enumerable:!0,configurable:!0}),t.prototype.refresh=function(){var f,i,e,r,t,u,o;if(n.prototype.refresh.call(this),this._divMarkers.innerHTML='',this._dragMarker=this._dragCol=null,this._gds){for(f=this._g.sortRowIndex?this._g.sortRowIndex:this._g.columnHeaders.rows.length-1,i=0;i<this._gds.length;i++)e=this._gds[i],r=this._g.columns.getColumn(e.propertyName),r&&(t=document.createElement('div'),this._g.cellFactory.updateCell(this._g.columnHeaders,f,r.index,t),t.setAttribute('class','wj-cell wj-header wj-groupmarker'),wjcCore.setCss(t,{position:'static',display:'inline-block',verticalAlign:'top',left:'',top:'',right:'',height:'auto',width:'auto'}),u=t.querySelector('.wj-elem-filter'),u&&t.removeChild(u),o=wjcCore.createElement('<span wj-remove="" style="font-weight:normal;cursor:pointer;pointer;padding:12px;padding-right:3px">&times;</span>',t),this._divMarkers.appendChild(t));this._divMarkers.children.length>0?(this._divPH.style.display='none',this._divMarkers.style.display=''):(this._divPH.style.display='',this._divMarkers.style.display='none')}},t.prototype._addGroup=function(n,t){for(var u=this._getIndex(t),r=this._gds,i=0;i<r.length;i++)if(r[i].propertyName==n.binding){r.removeAt(i);i<u&&u--;break}for(i=this.maxGroups-1;i<r.length;i++)this._removeGroup(i,r),i<u&&u--;r.deferUpdate(function(){var t=new wjcCore.PropertyGroupDescription(n.binding);r.insert(u,t)});n&&this.hideGroupedColumns&&(n.visible=!1);this.invalidate()},t.prototype._moveGroup=function(n,t){var r=this._gds,u=this._getElementIndex(this._dragMarker),i=this._getIndex(t);i>u&&i--;i>=this._gds.length&&(i=this._gds.length);u!=i&&r.deferUpdate(function(){var n=r[u];r.removeAt(u);r.insert(i,n)})},t.prototype._removeGroup=function(n,t){t===void 0&&(t=this._gds);var r=t[n].propertyName,i=this._g.columns.getColumn(r);t.removeAt(n);i&&(i.visible=!0)},t.prototype._getIndex=function(n){for(var r,i=this._divMarkers.children,t=0;t<i.length;t++)if(r=i[t].getBoundingClientRect(),n.clientX<r.left+r.width/2)return t;return i.length},t.prototype._getElementIndex=function(n){var i,t;if(n.parentElement)for(i=n.parentElement.children,t=0;t<i.length;t++)if(i[t]==n)return t;return-1},t.prototype._draggingColumn=function(n,t){var i=this._g.columns[t.col];this._dragCol=i.binding?i:null},t.prototype._itemsSourceChanged=function(){this._gds&&this._gds.collectionChanged.removeHandler(this._groupsChanged);this._gds=null;this._g.collectionView&&(this._gds=this._g.collectionView.groupDescriptions,this._gds.collectionChanged.addHandler(this._groupsChanged,this));this.invalidate()},t.prototype._groupsChanged=function(){this.invalidate()},t.prototype._dragStart=function(n){n.dataTransfer.effectAllowed='move';n.dataTransfer.setData('text','');this._dragMarker=n.target;this._dragCol=null},t.prototype._dragOver=function(n){var t=this._dragCol||this._dragMarker;t&&(n.dataTransfer.dropEffect='move',n.preventDefault())},t.prototype._drop=function(n){this._dragMarker?this._moveGroup(this._dragMarker,n):this._dragCol&&this._addGroup(this._dragCol,n)},t.prototype._dragEnd=function(){this._dragMarker=this._dragCol=null},t.prototype._click=function(n){for(var e=document.elementFromPoint(n.clientX,n.clientY),h=e.getAttribute('wj-remove')!=null,t=e,u,f,r,s;t.parentElement&&!wjcCore.hasClass(t,'wj-cell');)t=t.parentElement;if(wjcCore.hasClass(t,'wj-cell')){var o=this._getElementIndex(t),c=this._g.collectionView,i=c.sortDescriptions;if(h)this._removeGroup(o);else if(n.ctrlKey)i.clear(),this.invalidate();else{for(u=this._gds[o],f=!0,r=0;r<i.length;r++)if(i[r].property==u.propertyName){f=!i[r].ascending;break}s=new wjcCore.SortDescription(u.propertyName,f);i.splice(0,i.length,s);this.invalidate()}}},t.controlTemplate='<div style="cursor:default;overflow:hidden;height:100%;width:100%;min-height:1em"><div wj-part="div-ph"><\/div><div wj-part="div-markers"><\/div><\/div>',t}(wjcCore.Control);exports.GroupPanel=GroupPanel