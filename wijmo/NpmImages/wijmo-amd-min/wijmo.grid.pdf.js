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
var __extends=this&&this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);n.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)};define(["require","exports",'wijmo/wijmo.pdf','wijmo/wijmo','wijmo/wijmo.grid','wijmo/wijmo.grid.pdf'],function(n,t,i,r,u,f){"use strict";function c(){var n,t;return(n=window.wijmo)&&(t=n.grid)&&t.multirow}function e(n,t,i){var u,o,f;if(i===void 0&&(i=!1),t&&n)for(u in t)o=t[u],f=n[u],r.isObject(o)?((f===undefined||!r.isObject(f)&&i)&&(n[u]=f={}),r.isObject(f)&&e(n[u],o,i)):(f===undefined||i&&o!==undefined)&&(n[u]=o);return n}var o,l,a;window.wijmo=window.wijmo||{};window.wijmo.grid=window.wijmo.grid||{};window.wijmo.grid.pdf=f,function(n){n[n.ActualSize=0]="ActualSize";n[n.PageWidth=1]="PageWidth";n[n.SinglePage=2]="SinglePage"}(t.ScaleMode||(t.ScaleMode={}));o=t.ScaleMode,function(n){n[n.All=0]="All";n[n.Selection=1]="Selection"}(t.ExportMode||(t.ExportMode={}));l=t.ExportMode;a=function(){function n(){}return n.draw=function(n,t,u,f,s){r.assert(!!n,'The flex argument cannot be null.');r.assert(!!t,'The doc argument cannot be null.');var h=e({},s);e(h,this.DefaultDrawSettings);h.scaleMode=u==null?o.ActualSize:f==null?o.PageWidth:o.SinglePage;try{h.recalculateStarWidths&&n.columns._updateStarSizes(i.ptToPx(t.width));this._draw(n,t,null,u,f,h)}finally{h.recalculateStarWidths&&n.invalidate(!0)}},n.drawToPosition=function(n,t,u,f,s,h){r.assert(!!n,'The flex argument cannot be null.');r.assert(!!t,'The doc argument cannot be null.');r.assert(!!u,'The point argument cannot be null.');var c=e({},h);e(c,this.DefaultDrawSettings);c.scaleMode=f==null?o.ActualSize:s==null?o.PageWidth:o.SinglePage;try{c.recalculateStarWidths&&n.columns._updateStarSizes(i.ptToPx(t.width));this._draw(n,t,u,f,s,c)}finally{c.recalculateStarWidths&&n.invalidate(!0)}},n.export=function(n,t,u){var o,f;r.assert(!!n,'The flex argument cannot be null.');r.assert(!!t,'The fileName argument cannot be empty.');u=e({},u);e(u,this.DefaultExportSettings);o=u.documentOptions.ended;u.documentOptions.ended=function(n,r){o&&o.apply(f,[n,r])===!1||i.saveBlob(r.blob,t)};f=new i.PdfDocument(u.documentOptions);try{u.recalculateStarWidths&&n.columns._updateStarSizes(i.ptToPx(f.width));this._draw(n,f,null,null,null,u);f.end()}finally{u.recalculateStarWidths&&n.invalidate(!0)}},n._draw=function(n,t,i,u,f,e){var g=i!=null,h=new r.Size(t.width,t.height),o,d;i||(i=new r.Point(0,t.y));r.isArray(e.embeddedFonts)&&e.embeddedFonts.forEach(function(n){t.registerFont(n)});var b=s.getSelection(n,e.exportMode),k=new y(n,b,!1,this.BorderWidth,null,!0),c=new r.Rect(i.x||0,i.y||0,u||h.width,f||h.height),l=this._getScaleFactor(k,e.scaleMode,c),a=this._getPages(n,b,c,e,g,l);for(o=0;o<a.length;o++){o>0&&t.addPage();var v=a[o],p=v.pageCol===0?c.left:0,w=v.pageRow===0?c.top:0;t.saveState();t.paths.rect(0,0,h.width,h.height).clip();t.scale(l,l,new r.Point(p,w));t.translate(p,w);d=new y(n,v.range,e.repeatMergedValuesAcrossPages,this.BorderWidth,e.styles,o===a.length-1);d.render(t);t.restoreState();t.x=p;t.y=w+k.renderSize.height*l}},n._getScaleFactor=function(n,t,i){var u=1,f,r;return t===o.ActualSize?u:(f=n.renderSize,t===o.SinglePage?(r=Math.min(i.width/f.width,i.height/f.height),r<1&&(u=r)):(r=i.width/f.width,r<1&&(u=r)),u)},n._getPages=function(n,t,r,f,e,s){var ht=this,c=[],l=[],b=i.pxToPt,nt=n.headersVisibility&u.HeadersVisibility.Column,tt=n.headersVisibility&u.HeadersVisibility.Row,k=nt?b(n.columnHeaders.height):0,d=tt?b(n.rowHeaders.width):0,yt=f.scaleMode===o.ActualSize||f.scaleMode===o.PageWidth,pt=f.scaleMode===o.ActualSize,wt=(r.width-r.left)*(1/s),bt=(r.height-r.top)*(1/s),kt=r.width*(1/s),dt=r.height*(1/s),y=k,p=d,ct=e&&f.scaleMode==o.ActualSize,it,rt,ut,ft,g,et,h,a,st,vt;if(yt&&(it=0,t.forEach(n.cells,function(n,t,i,r){var f=c.length?dt:bt,u;v.isRenderableRow(n)&&(u=b(n.renderHeight),it++,y+=u,(nt||it>1)&&(y-=ht.BorderWidth),y>f&&(k+u>f||ct?(c.push(r),y=k):(c.push(r-1),y=k+u),nt&&(y-=ht.BorderWidth)))})),rt=t.length()-1,c.length&&c[c.length-1]===rt||c.push(rt),pt)for(ut=0,h=t.leftCol;h<=t.rightCol;h++)ft=n.columns[h],ft.isVisible&&(g=b(ft.renderWidth),et=l.length?kt:wt,ut++,p+=g,(tt>0||ut>1)&&(p-=this.BorderWidth),p>et&&(d+g>et||ct?(l.push(h),p=d):(l.push(h-1),p=d+g),tt&&(p-=this.BorderWidth)));l.length&&l[l.length-1]===t.rightCol||l.push(t.rightCol);var lt=[],ot=!1,at=1,gt=e&&f.maxPages>0?1:f.maxPages;for(h=0;h<c.length&&!ot;h++)for(a=0;a<l.length&&!ot;a++,at++)(ot=at>gt)||(st=h==0?0:c[h-1]+1,vt=a==0?t.leftCol:l[a-1]+1,lt.push(new w(t.subrange(st,c[h]-st+1,vt,l[a]),a,h)));return lt},n.BorderWidth=1,n.DefaultDrawSettings={maxPages:Number.MAX_VALUE,exportMode:l.All,repeatMergedValuesAcrossPages:!0,recalculateStarWidths:!0,styles:{cellStyle:{font:new i.PdfFont,padding:1.5,verticalAlign:'middle'},headerCellStyle:{font:{weight:'bold'}}}},n.DefaultExportSettings=e({scaleMode:o.PageWidth,documentOptions:{compress:!1,pageSettings:{margins:{left:36,right:36,top:18,bottom:18}}}},n.DefaultDrawSettings),n}();t.FlexGridPdfConverter=a;var v=function(){function n(n,t){this._panel=n;this._range=t.clone()}return n.isRenderableRow=function(n){return n.isVisible&&!(n instanceof u._NewRowTemplate)},Object.defineProperty(n.prototype,"visibleRows",{get:function(){var n=this;return this._visibleRows==null&&(this._visibleRows=0,this._range.forEach(this._panel,function(t){n.isRenderableRow(t)&&n._visibleRows++})),this._visibleRows},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"visibleColumns",{get:function(){if(this._visibleColumns==null&&(this._visibleColumns=0,this._range.isValid))for(var n=this._range.leftCol;n<=this._range.rightCol;n++)this._panel.columns[n].isVisible&&this._visibleColumns++;return this._visibleColumns},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"size",{get:function(){if(this._size==null){var n=this._range.getRenderSize(this._panel);this._size=new r.Size(i.pxToPt(n.width),i.pxToPt(n.height))}return this._size},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"range",{get:function(){return this._range},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"panel",{get:function(){return this._panel},enumerable:!0,configurable:!0}),n.prototype.isRenderableRow=function(t){return n.isRenderableRow(t)},n}(),h=function(n){function t(t,i,r,u,f,e){n.call(this,i,r);this._flex=t;this._repeatMergedValues=u;this._borderWidth=f;this._styles=e}return __extends(t,n),Object.defineProperty(t.prototype,"renderSize",{get:function(){return this._renderSize==null&&(this._renderSize=this.size.clone(),this.visibleColumns>1&&(this._renderSize.width-=this._borderWidth*(this.visibleColumns-1)),this.visibleRows>1&&(this._renderSize.height-=this._borderWidth*(this.visibleRows-1))),this._renderSize},enumerable:!0,configurable:!0}),t.prototype.getRangeWidth=function(n,t){for(var e,r=0,u=0,o=this.panel,f=n;f<=t;f++)e=o.columns[f],e.isVisible&&(u++,r+=e.renderWidth);return r=i.pxToPt(r),u>1&&(r-=this._borderWidth*(u-1)),r},t.prototype.getRangeHeight=function(n,t){for(var e,r=0,u=0,o=this.panel,f=n;f<=t;f++)e=o.rows[f],this.isRenderableRow(e)&&(u++,r+=e.renderHeight);return r=i.pxToPt(r),u>1&&(r=r-this._borderWidth*(u-1)),r},t.prototype.render=function(n,t,i){var r=this,f=this.range,s=this.panel,h=new p(this._flex),e,o;if(f.isValid){for(e={},o=f.leftCol;o<=f.rightCol;o++)e[o]=i;f.forEach(s,function(i,o,l){var g,a,w,v,d;if(r.isRenderableRow(i))for(g=t,a=f.leftCol;a<=f.rightCol;a++){var nt=s.columns[a],b=undefined,y=undefined,p=undefined,k=undefined;if(nt.isVisible){if(w=r._getCellValue(a,l),(i.allowMerging||nt.allowMerging||i instanceof u.GroupRow||typeof c()!="undefined"&&r._flex instanceof c().MultiRow)&&(v=h.getMergedRange(s,l,a)))if(v.topRow!==v.bottomRow)v.topRow===l||l===o.topRow?b={value:r._repeatMergedValues?w:v.topRow===l?w:'',height:y=r.getRangeHeight(l,Math.min(v.bottomRow,o.bottomRow)),width:p=r.getRangeWidth(a,a)}:p=r.getRangeWidth(a,a);else for(b={value:r._repeatMergedValues?w:a===v.leftCol?w:'',height:y=r.getRangeHeight(l,l),width:p=r.getRangeWidth(Math.max(f.leftCol,v.leftCol),Math.min(f.rightCol,v.rightCol))},k=Math.min(f.rightCol,v.rightCol),d=a+1;d<=k;d++)e[d]+=y-r._borderWidth;else b={value:w,height:y=r.getRangeHeight(l,l),width:p=r.getRangeWidth(a,a)};b&&r._renderCell(n,b,i,nt,l,a,g,e[a]);y&&(e[a]+=y-r._borderWidth);p&&(g+=p-r._borderWidth);k&&(a=k)}}})}},t.prototype._getCellValue=function(n,t){var r=this.panel,f=r.getCellData(t,n,!0),i,e,o;return f||f===0||r.cellType!==u.CellType.Cell||(i=r.rows[t],i instanceof u.GroupRow&&i.dataItem&&i.dataItem.groupDescription&&n===r.columns.firstVisibleIndex&&(e=i.dataItem.groupDescription.propertyName,o=r.columns.getColumn(e),o&&o.header&&(e=o.header),f=e+': '+i.dataItem.name+' ('+i.dataItem.items.length+' items)')),f},t.prototype._isGroupRow=function(n){return n instanceof u.GroupRow&&n.hasChildren},t.prototype._renderCell=function(n,t,f,o,s,h,l,a){var y=e({},this._styles.cellStyle),b=this.panel,v,p,w;switch(b.cellType){case u.CellType.Cell:this._isGroupRow(f)?e(y,this._styles.groupCellStyle,!0):typeof c()!='undefined'&&f instanceof c()._MultiRow?f.dataIndex%2!=0&&e(y,this._styles.altCellStyle,!0):s%2!=0&&e(y,this._styles.altCellStyle,!0);break;case u.CellType.ColumnHeader:case u.CellType.RowHeader:case u.CellType.TopLeft:case u.CellType.BottomLeft:e(y,this._styles.headerCellStyle,!0);break;case u.CellType.ColumnFooter:e(y,this._styles.headerCellStyle,!0);e(y,this._styles.footerCellStyle,!0)}if(v=y,y.font&&((p=y.font.family)&&(v.fontFamily=p),(p=y.font.size)&&(v.fontSize=p),(p=y.font.style)&&(v.fontStyle=p),(p=y.font.weight)&&(v.fontWeight=p),y.font=undefined),!(f instanceof u.GroupRow&&!o.aggregate))switch(o.dataType){case r.DataType.Number:v.textAlign='right';break;case r.DataType.Boolean:v.textAlign='center'}if(v.left=l,v.top=a,v.width=t.width,v.height=t.height,v.boxSizing='no-box',v.borderWidth=this._borderWidth,v.borderStyle='solid',w=b.grid,b.cellType===u.CellType.Cell&&w.rows.maxGroupLevel>=0&&h===w.columns.firstVisibleIndex){var k=f instanceof u.GroupRow?Math.max(f.level,0):w.rows.maxGroupLevel+1,d=i._asPt(v.paddingLeft||v.padding),g=i.pxToPt(k*w.treeIndent);v.paddingLeft=d+g}o.dataType!==r.DataType.Boolean||b.cellType!==u.CellType.Cell||this._isGroupRow(f)?n._renderTextCell(t.value,v):n._renderBooleanCell(t.value,v)},t}(v),y=function(){function n(n,t,i,r,f,e){this._flex=n;this._borderWidth=r;this._lastPage=e;this._topLeft=new h(n,n.topLeftCells,this._showRowHeader&&this._showColumnHeader?new s(n,[new u.CellRange(0,0,n.topLeftCells.rows.length-1,n.topLeftCells.columns.length-1)]):new s(n,[]),i,r,f);this._rowHeader=new h(n,n.rowHeaders,this._showRowHeader?t.clone(0,n.rowHeaders.columns.length-1):new s(n,[]),i,r,f);this._columnHeader=new h(n,n.columnHeaders,this._showColumnHeader?new s(n,[new u.CellRange(0,t.leftCol,n.columnHeaders.rows.length-1,t.rightCol)]):new s(n,[]),i,r,f);this._cells=new h(n,n.cells,t,i,r,f);this._bottomLeft=new h(n,n.bottomLeftCells,this._showRowHeader&&this._showColumnFooter?new s(n,[new u.CellRange(0,0,n.bottomLeftCells.rows.length-1,n.bottomLeftCells.columns.length-1)]):new s(n,[]),i,r,f);this._columnFooter=new h(n,n.columnFooters,this._showColumnFooter?new s(n,[new u.CellRange(0,t.leftCol,n.columnFooters.rows.length-1,t.rightCol)]):new s(n,[]),i,r,f)}return n.prototype.render=function(n){var i=Math.max(0,this._rowHeader.renderSize.width-this._borderWidth),t=Math.max(0,this._columnHeader.renderSize.height-this._borderWidth);this._topLeft.render(n,0,0);this._rowHeader.render(n,0,t);this._columnHeader.render(n,i,0);this._cells.render(n,i,t);t=Math.max(0,t+this._cells.renderSize.height-this._borderWidth);this._bottomLeft.render(n,0,t);this._columnFooter.render(n,i,t)},Object.defineProperty(n.prototype,"renderSize",{get:function(){var n=this._columnHeader.renderSize.height+this._cells.renderSize.height+this._columnFooter.renderSize.height,t=this._rowHeader.renderSize.width+this._cells.renderSize.width;return this._columnHeader.visibleRows>0&&(n-=this._borderWidth),this._columnFooter.visibleRows>0&&(n-=this._borderWidth),this._rowHeader.visibleColumns>0&&(t-=this._borderWidth),new r.Size(t,n)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"_showColumnHeader",{get:function(){return!!(this._flex.headersVisibility&u.HeadersVisibility.Column)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"_showRowHeader",{get:function(){return!!(this._flex.headersVisibility&u.HeadersVisibility.Row)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"_showColumnFooter",{get:function(){return this._lastPage&&this._flex.columnFooters.rows.length>0},enumerable:!0,configurable:!0}),n}(),p=function(){function n(n){this._columns={};this._flex=n}return n.prototype.getMergedRange=function(n,t,i){var r=this._columns[i];return r&&t>=r.topRow&&t<=r.bottomRow?r:this._columns[i]=this._flex.getMergedRange(n,t,i,!1)},n}(),s=function(){function n(n,t){this._flex=n;this._ranges=t||[]}return n.getSelection=function(t,i){var f=[],o,e,r,s;if(i===l.All)f.push(new u.CellRange(0,0,t.rows.length-1,t.columns.length-1));else{o=t.selection;switch(t.selectionMode){case u.SelectionMode.Cell:case u.SelectionMode.CellRange:f.push(o);break;case u.SelectionMode.Row:f.push(new u.CellRange(o.topRow,0,o.topRow,t.cells.columns.length-1));break;case u.SelectionMode.RowRange:f.push(new u.CellRange(o.topRow,0,o.bottomRow,t.cells.columns.length-1));break;case u.SelectionMode.ListBox:for(e=-1,r=0;r<t.rows.length;r++)s=t.rows[r],s.isSelected?(e<0&&(e=r),r===t.rows.length-1&&f.push(new u.CellRange(e,0,r,t.cells.columns.length-1))):(e>=0&&f.push(new u.CellRange(e,0,r-1,t.cells.columns.length-1)),e=-1)}}return new n(t,f)},n.prototype.length=function(){for(var n,i=0,t=0;t<this._ranges.length;t++)n=this._ranges[t],n.isValid&&(i+=n.bottomRow-n.topRow+1);return i},Object.defineProperty(n.prototype,"isValid",{get:function(){return this._ranges.length&&this._ranges[0].isValid},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"leftCol",{get:function(){return this._ranges.length?this._ranges[0].leftCol:-1},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"rightCol",{get:function(){return this._ranges.length?this._ranges[0].rightCol:-1},enumerable:!0,configurable:!0}),n.prototype.clone=function(t,i){for(var r,f=[],u=0;u<this._ranges.length;u++)r=this._ranges[u].clone(),arguments.length>0&&(r.col=t),arguments.length>1&&(r.col2=i),f.push(r);return new n(this._flex,f)},n.prototype.getRenderSize=function(n){for(var u,t=new r.Size(0,0),i=0;i<this._ranges.length;i++)u=this._ranges[i].getRenderSize(n),t.width=Math.max(t.width,u.width),t.height+=u.height;return t},n.prototype.forEach=function(n,t){for(var i,r,f=0,u=0;u<this._ranges.length;u++)if(i=this._ranges[u],i.isValid)for(r=i.topRow;r<=i.bottomRow;r++)t(n.rows[r],i,r,f++)},n.prototype.subrange=function(t,i,r,f){var l=[],o,s,h,e;if(t>=0&&i>0)for(o=0,s=0,h=0;h<this._ranges.length&&i>0;h++,o=s+1)if(e=this._ranges[h],s=o+(e.bottomRow-e.topRow),!(t>s)){var c=t>o?e.topRow+(t-o):e.topRow,a=Math.min(e.bottomRow,c+i-1),v=arguments.length>2?r:e.leftCol,y=arguments.length>2?f:e.rightCol;l.push(new u.CellRange(c,v,a,y));i-=a-c+1}return new n(this._flex,l)},n}(),w=function(){function n(n,t,i){this._col=t;this._row=i;this._range=n}return Object.defineProperty(n.prototype,"range",{get:function(){return this._range},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"pageCol",{get:function(){return this._col},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"pageRow",{get:function(){return this._row},enumerable:!0,configurable:!0}),n}()})