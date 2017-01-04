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
System.register(['wijmo/wijmo.grid','wijmo/wijmo','wijmo/wijmo.grid.multirow'],function(n,t){"use strict";var v=t&&t.id,u=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)},i,r,l,f,o,e,h,c,s,a;return{setters:[function(n){i=n},function(n){r=n},function(n){l=n}],execute:function(){window.wijmo=window.wijmo||{};window.wijmo.grid=window.wijmo.grid||{};window.wijmo.grid.multirow=l;f=function(n){function t(t,i,r){n.call(this,t);this._idxData=i;this._idxRecord=r}return u(t,n),Object.defineProperty(t.prototype,"recordIndex",{get:function(){return this._idxRecord},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"dataIndex",{get:function(){return this._idxData},enumerable:!0,configurable:!0}),t}(i.Row);n("_MultiRow",f);o=function(n){function t(t){n.call(this);this._row=this._col=0;this._rowspan=this._colspan=1;t&&r.copy(this,t)}return u(t,n),Object.defineProperty(t.prototype,"colspan",{get:function(){return this._colspan},set:function(n){this._colspan=r.asInt(n,!1,!0)},enumerable:!0,configurable:!0}),t}(i.Column);n("_Cell",o);e=function(n){function t(t,i){var o,e,u,f;if(n.call(this),this._colstart=0,this._g=t,i&&r.copy(this,i),!this._cells)throw'Cell group with no cells?';for(o=0,e=0,u=0;u<this._cells.length;u++)f=this._cells[u],e+f.colspan>this._colspan&&(o++,e=0),f._row=o,f._col=e,e+=f.colspan;for(this._rowspan=o+1,u=0;u<this._cells.length;u++)f=this._cells[u],(u==this._cells.length-1||this._cells[u+1]._row>f._row)&&(e=f._col,f._colspan=this._colspan-e)}return u(t,n),t.prototype._copy=function(n,t){var i,u;if(n=='cells'){if(this._cells=[],r.isArray(t))for(i=0;i<t.length;i++)u=new o(t[i]),!t[i].header&&u.binding&&(t.header=r.toHeaderCase(u.binding)),this._cells.push(u),this._colspan=Math.max(this._colspan,u.colspan);return!0}return!1},Object.defineProperty(t.prototype,"cells",{get:function(){return this._cells},enumerable:!0,configurable:!0}),t.prototype.closeGroup=function(n){var r,t,u,f,e,o;if(n>this._rowspan){for(r=0;r<this._cells.length;r++)t=this._cells[r],t._row==this._rowspan-1&&(t._rowspan=n-t._row);this._rowspan=n}for(this._cols=new i.ColumnCollection(this._g,this._g.columns.defaultSize),this._rng=new Array(n*this._colspan),r=0;r<this._cells.length;r++)for(t=this._cells[r],u=0;u<t._rowspan;u++)for(f=0;f<t._colspan;f++)e=(t._row+u)*this._colspan+t._col+f,this._cols.setAt(e,t),o=new i.CellRange(0-u,0-f,0-u+t._rowspan-1,0-f+t._colspan-1),o.isSingleCell||(this._rng[e]=o);this._rng[-1]=new i.CellRange(0,this._colstart,0,this._colstart+this._colspan-1)},t.prototype.getColumnWidth=function(n){for(var i,t=0;t<this._cells.length;t++)if(i=this._cells[t],i._col==n&&i.colspan==1)return i.width;return null},t.prototype.getMergedRange=function(n,t,r){if(t<0)return this._rng[-1];var f=n.rows[t],e=f.recordIndex!=null?f.recordIndex:t%this._rowspan,o=r-this._colstart,u=this._rng[e*this._colspan+o];return u?new i.CellRange(t+u.row,r+u.col,t+u.row2,r+u.col2):null},t.prototype.getBindingColumn=function(n,t,i){if(t<0)return this;var r=n.rows[t],u=r.recordIndex!=null?r.recordIndex:t%this._rowspan,f=i-this._colstart;return this._cols[u*this._colspan+f]},t}(o);n("_CellGroup",e);h=function(n){function t(){n.apply(this,arguments)}return u(t,n),t.prototype.getMergedRange=function(t,u,f,o){var c,l,s,h;o===void 0&&(o=!0);c=t.grid;switch(t.cellType){case i.CellType.Cell:case i.CellType.RowHeader:if(t.rows[u]instanceof i.GroupRow)return n.prototype.getMergedRange.call(this,t,u,f,o)}switch(t.cellType){case i.CellType.Cell:case i.CellType.ColumnHeader:return l=c._cellGroupsByColumn[f],r.assert(l instanceof e,'Failed to get the group!'),t.cellType==i.CellType.ColumnHeader&&c.collapsedHeaders&&(u=-1),s=l.getMergedRange(t,u,f),s&&t.columns.frozen&&(h=t.columns.frozen,s.col<h&&s.col2>=h&&(f<h?s.col2=h-1:s.col=h)),s&&t.rows.frozen&&(h=t.rows.frozen,s.row<h&&s.row2>=h&&(u<h?s.row2=h-1:s.row=h)),s;case i.CellType.RowHeader:var v=c._rowsPerItem,y=t.rows[u],a=u-y.recordIndex;return new i.CellRange(a,0,a+v-1,t.columns.length-1);case i.CellType.TopLeft:return new i.CellRange(0,0,t.rows.length-1,t.columns.length-1)}return null},t}(i.MergeManager);n("_MergeManager",h);c=function(n){function t(t){var i=t._addHdl;i._detach();n.call(this,t)}return u(t,n),t.prototype.updateNewRowTemplate=function(){for(var o,f=r.tryCast(this._g.collectionView,'IEditableCollectionView'),i=this._g,t=i.rows,e=f&&f.canAddNew&&i.allowAddNew&&!i.isReadOnly,u=!0,n=t.length-i.rowsPerItem;n<t.length;n++)if(!(t[n]instanceof s)){u=!1;break}if(e&&!u)for(n=0;n<i.rowsPerItem;n++)o=new s(n),t.push(o);if(!e&&u)for(n=0;n<t.length;n++)t[n]instanceof s&&(t.removeAt(n),n--)},t}(i._AddNewHandler);n("_AddNewHandler",c);s=function(n){function t(t){n.call(this);this._idxRecord=t}return u(t,n),Object.defineProperty(t.prototype,"recordIndex",{get:function(){return this._idxRecord},enumerable:!0,configurable:!0}),t}(i._NewRowTemplate);a=function(n){function t(t,u){var f=this,o,e;n.call(this,t);this._rowsPerItem=1;this._cellBindingGroups=[];this._centerVert=!0;this._collapsedHeaders=!1;r.addClass(this.hostElement,'wj-multirow');o=this.columnHeaders.hostElement.parentElement;e=r.createElement('<div class="wj-hdr-collapse"><span></span></div>');e.style.display='none';o.appendChild(e);this._btnCollapse=e;this._updateButtonGlyph();this.addEventListener(e,'mousedown',function(n){f.collapsedHeaders=!f.collapsedHeaders;n.preventDefault()},!0);this.autoGenerateColumns=!1;this.allowDragging=i.AllowDragging.None;this.mergeManager=new h(this);this._addHdl=new c(this);this.formatItem.addHandler(this._formatItem,this);this.addEventListener(this.rowHeaders.hostElement,'click',function(n){var r=f.hitTest(n),t,u;r.panel==f.rowHeaders&&r.row>-1&&(t=f.rows[r.row],t.recordIndex!=null&&(u=t.index-t.recordIndex,f.select(new i.CellRange(u,0,u+f.rowsPerItem-1,f.columns.length-1))))});this.initialize(u)}return u(t,n),Object.defineProperty(t.prototype,"layoutDefinition",{get:function(){return this._layoutDef},set:function(n){var t,i;for(this._layoutDef=r.asArray(n),this._rowsPerItem=1,this._cellBindingGroups=this._parseCellGroups(this._layoutDef),t=0;t<this._cellBindingGroups.length;t++)i=this._cellBindingGroups[t],this._rowsPerItem=Math.max(this._rowsPerItem,i._rowspan);this._bindGrid(!0)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"rowsPerItem",{get:function(){return this._rowsPerItem},enumerable:!0,configurable:!0}),t.prototype.getBindingColumn=function(n,t,i){return this._getBindingColumn(n,t,n.columns[i])},Object.defineProperty(t.prototype,"centerHeadersVertically",{get:function(){return this._centerVert},set:function(n){n!=this._centerVert&&(this._centerVert=r.asBoolean(n),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"collapsedHeaders",{get:function(){return this._collapsedHeaders},set:function(n){n!=this._collapsedHeaders&&(this._collapsedHeaders=r.asBoolean(n),this._updateButtonGlyph(),this._bindGrid(!0))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"showHeaderCollapseButton",{get:function(){return this._btnCollapse.style.display==''},set:function(n){n!=this.showHeaderCollapseButton&&(this._btnCollapse.style.display=r.asBoolean(n)?'':'none')},enumerable:!0,configurable:!0}),t.prototype._addBoundRow=function(n,t){for(var r=n[t],i=0;i<this._rowsPerItem;i++)this.rows.push(new f(r,t,i))},t.prototype._addNode=function(n,t){this._addBoundRow(n,t)},t.prototype._bindColumns=function(){for(var t=this.columnHeaders.rows,s=this._collapsedHeaders?1:this._rowsPerItem,h,r,f,e,o,n,u;t.length>s;)t.removeAt(t.length-1);while(t.length<s)t.push(new i.Row);if(this.columns.clear(),this._cellGroupsByColumn={},h=null,r=this.collectionView,r&&r.sourceCollection&&r.sourceCollection.length&&(h=r.sourceCollection[0]),this._cellBindingGroups)for(f=0;f<this._cellBindingGroups.length;f++)for(e=this._cellBindingGroups[f],o=0;o<e._colspan;o++)this._cellGroupsByColumn[this.columns.length]=e,n=new i.Column,u=e.cells[o],n.width=u.width,n.binding=u.binding,n.aggregate=u.aggregate,n.format=u.format,this.columns.push(n)},t.prototype._updateColumnTypes=function(){var f,o,i,e,u,t;if(n.prototype._updateColumnTypes.call(this),f=this.collectionView,r.hasItems(f))for(o=f.items[0],i=0;i<this._cellBindingGroups.length;i++)for(e=this._cellBindingGroups[i],u=0;u<e._cols.length;u++)t=e._cols[u],t.dataType==null&&t._binding&&(t.dataType=r.getType(t._binding.getValue(o)))},t.prototype._getBindingColumn=function(n,t,i){if(n==this.cells||n==this.columnHeaders){var r=this._cellGroupsByColumn[i.index];n==this.columnHeaders&&this.collapsedHeaders&&(t=-1);i=r.getBindingColumn(n,t,i.index)}return i},t.prototype._cvCollectionChanged=function(n,t){var u,e;if(this.autoGenerateColumns&&this.columns.length==0)this._bindGrid(!0);else switch(t.action){case r.NotifyCollectionChangedAction.Change:this.invalidate();break;case r.NotifyCollectionChangedAction.Add:if(t.index==this.collectionView.items.length-1){for(u=this.rows.length;u>0&&this.rows[u-1]instanceof i._NewRowTemplate;)u--;for(e=0;e<this._rowsPerItem;e++)this.rows.insert(u+e,new f(t.item,t.index,e));return}r.assert(!1,'added item should be the last one.');break;default:this._bindGrid(!1)}},t.prototype._parseCellGroups=function(n){var r=[],u=1,f,i,t;if(n){for(t=0,f=0;t<n.length;t++)i=new e(this,n[t]),i._colstart=f,f+=i._colspan,u=Math.max(u,i._rowspan),r.push(i);for(t=0;t<r.length;t++)r[t].closeGroup(u)}return r},t.prototype._formatItem=function(n,t){var h=this._rowsPerItem,o=t.panel.rows[t.range.row],c=t.panel.rows[t.range.row2],u,l,s;(t.panel.cellType==i.CellType.Cell||t.panel.cellType==i.CellType.ColumnHeader)&&(u=this._cellGroupsByColumn[t.col],r.assert(u instanceof e,'Failed to get the group!'),r.toggleClass(t.cell,'wj-group-start',u._colstart==t.range.col),r.toggleClass(t.cell,'wj-group-end',u._colstart+u._colspan-1==t.range.col2));h>1&&(t.panel.cellType==i.CellType.Cell||t.panel.cellType==i.CellType.RowHeader)&&(r.toggleClass(t.cell,'wj-record-start',o instanceof f?o.recordIndex==0:!1),r.toggleClass(t.cell,'wj-record-end',c instanceof f?c.recordIndex==h-1:!1));this.showAlternatingRows&&r.toggleClass(t.cell,'wj-alt',o instanceof f?o.dataIndex%2!=0:!1);this._centerVert&&(t.cell.hasChildNodes&&t.range.rowSpan>1?(l=r.createElement('<div style="display:table-cell;vertical-align:middle"></div>'),s=document.createRange(),s.selectNodeContents(t.cell),s.surroundContents(l),r.setCss(t.cell,{display:'table',tableLayout:'fixed',paddingTop:0,paddingBottom:0})):r.setCss(t.cell,{display:'',tableLayout:'',paddingTop:'',paddingBottom:''}))},t.prototype._updateButtonGlyph=function(){var n=this._btnCollapse.querySelector('span');n instanceof HTMLElement&&(n.className=this.collapsedHeaders?'wj-glyph-left':'wj-glyph-down-left')},t}(i.FlexGrid);n("MultiRow",a)}}})