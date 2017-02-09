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
System.register(['wijmo/wijmo.xlsx','wijmo/wijmo','wijmo/wijmo.grid','wijmo/wijmo.grid.xlsx'],function(n,t){"use strict";function o(){var n,t;return(n=window.wijmo)&&(t=n.grid)&&t.detail}function s(){var n,t;return(n=window.wijmo)&&(t=n.grid)&&t.multirow}var h=t&&t.id,r,i,u,f,e;return{setters:[function(n){r=n},function(n){i=n},function(n){u=n},function(n){f=n}],execute:function(){window.wijmo=window.wijmo||{};window.wijmo.grid=window.wijmo.grid||{};window.wijmo.grid.xlsx=f;e=function(){function n(){}return n.export=function(n,t){i._deprecated('FlexGridXlsxConverter.export','FlexGridXlsxConverter.save');var u=this.toWorkbookOM(n,t);return r.XlsxConverter.export(u)},n.import=function(n,t,u,f){i._deprecated('FlexGridXlsxConverter.import','FlexGridXlsxConverter.load');var e=r.XlsxConverter.import(n);this.fromWorkbookOM(e,t,u,f)},n.toWorkbookOM=function(n,t){i._deprecated('FlexGridXlsxConverter.toWorkbookOM','FlexGridXlsxConverter.save');var r={sheets:[],creator:'',created:new Date,lastModifiedBy:'',modified:new Date,activeWorksheet:0},u,f;if(t&&t.activeWorksheet!=null&&t.activeWorksheet>0&&(r.activeWorksheet=t.activeWorksheet),i.isArray(n))for(u=0;u<n.length;u++)f=n[u],this._exportFlexGrid(f,r,t);else this._exportFlexGrid(n,r,t);return r},n.fromWorkbookOM=function(n,t,f,e){i._deprecated('FlexGridXlsxConverter.fromWorkbookOM','FlexGridXlsxConverter.load');var fi=f?f.includeColumnHeader:!0,w=f?f.includeColumnHeader:!0,gt=1,nt=0,o=0,c=0,rt,ut,y,ft,k,b,et,wt,tt,ni,h,a,ti,d,ot,l,st,ht,ii,bt,v,ct,g,p,ri,lt,s,kt,dt,at,ui,it,vt=!1,yt={},pt;if(t.itemsSource=null,t.columns.clear(),t.rows.clear(),t.frozenColumns=0,t.frozenRows=0,n.sheets.length!==0)for(e&&(gt=n.sheets.length);nt<gt;nt++){for(kt={},dt={},c=0,ft=[],at=[],a=n.sheets[nt],fi&&(c=1,a.rows.length<=1&&(w=!1,c=0),wt=a.rows[0]),d=this._getColumnCount(a.rows),ti=this._getRowCount(a.rows,d),ii=a.summaryBelow,nt>0&&(ri=document.createElement('div'),t=new u.FlexGrid(ri)),y=a.columns||a.cols,o=0;o<d;o++)t.columns.push(new u.Column),!y[o]||(isNaN(+y[o].width)||(t.columns[o].width=+y[o].width),y[o].visible||y[o].visible==undefined||(t.columns[o].visible=!!y[o].visible),y[o].style&&!!y[o].style.wordWrap&&(t.columns[o].wordWrap=y[o].style.wordWrap));for(;c<ti;c++){if(ot=!1,pt=!0,h=a.rows[c],h)for(st=c+1;st<a.rows.length;)if(ht=a.rows[st],ht){(isNaN(h.groupLevel)&&!isNaN(ht.groupLevel)||!isNaN(h.groupLevel)&&h.groupLevel<ht.groupLevel)&&(ot=!0);break}else st++;for(ot&&!ii?(v&&(v.isCollapsed=vt),v=new u.GroupRow,v.isReadOnly=!1,vt=h.collapsed==null?!1:h.collapsed,v.level=isNaN(h.groupLevel)?0:h.groupLevel,yt[v.level]=vt,this._checkParentCollapsed(yt,v.level)&&v._setFlag(u.RowColFlags.ParentCollapsed,!0),t.rows.push(v)):(bt=new u.Row,h&&this._checkParentCollapsed(yt,h.groupLevel)&&bt._setFlag(u.RowColFlags.ParentCollapsed,!0),t.rows.push(bt)),!h||!h.height||isNaN(h.height)||(t.rows[w?c-1:c].height=h.height),o=0;o<d;o++)if(h){if(l=h.cells[o],p=l?l.formula:undefined,p&&p[0]!=='='&&(p='='+p),p=p?this._parseToFlexSheetFormula(p):undefined,t.setCellData(w?c-1:c,o,p&&e?p:this._getItemValue(l)),!ot&&l&&l.value!=null&&l.value!==''&&this._setColumn(ft,o,l),lt=c*d+o,s=l?l.style:undefined,s){if(pt=pt&&!!s.wordWrap,ui=this._getItemType(l),s.hAlign)it=r.Workbook._parseHAlignToString(i.asEnum(s.hAlign,r.HAlign));else switch(ui){case i.DataType.Number:it='right';break;case i.DataType.Boolean:it='center';break;default:it='left'}kt[lt]={fontWeight:s.font&&s.font.bold?'bold':'none',fontStyle:s.font&&s.font.italic?'italic':'none',textDecoration:s.font&&s.font.underline?'underline':'none',textAlign:it,fontFamily:s.font&&s.font.family?s.font.family:'',fontSize:s.font&&s.font.size?s.font.size+'px':'',color:s.font&&s.font.color?s.font.color:'',backgroundColor:s.fill&&s.fill.color?s.fill.color:'',format:r.Workbook._parseExcelFormat(l)};s.font&&at.indexOf(s.font.family)===-1&&at.push(s.font.family)}if(l&&i.isNumber(l.rowSpan)&&i.isNumber(l.colSpan))for(rt=c;rt<c+l.rowSpan;rt++)for(ut=o;ut<o+l.colSpan;ut++)lt=rt*d+ut,dt[lt]=new u.CellRange(c,o,c+l.rowSpan-1,o+l.colSpan-1)}else t.setCellData(w?c-1:c,o,''),this._setColumn(ft,o,undefined);h&&(this._checkParentCollapsed(yt,h.groupLevel)||h.visible||h.visible==undefined||(t.rows[w?c-1:c].visible=h.visible),t.rows[w?c-1:c].wordWrap=!!h.style&&!!h.style.wordWrap||pt)}for(v&&(v.isCollapsed=vt),a.frozenPane&&(ct=a.frozenPane.columns,i.isNumber(ct)&&!isNaN(ct)&&(t.frozenColumns=ct),g=a.frozenPane.rows,i.isNumber(g)&&!isNaN(g)&&(t.frozenRows=w&&g>0?g-1:g)),o=0;o<t.columnHeaders.columns.length;o++)k=ft[o],b=t.columns[o],b.isRequired=!1,w?(tt=wt?wt.cells[o]:undefined,tt&&tt.value?(ni=r.Workbook._parseExcelFormat(tt),et=i.Globalize.format(tt.value,ni)):et=this._numAlpha(o)):et=this._numAlpha(o),b.header=et,k&&(k.dataType===i.DataType.Boolean&&(b.dataType=k.dataType),b.format=k.format,b.align=k.hAlign,b.wordWrap=b.wordWrap||k.wordWrap);e&&(t.wj_sheetInfo={name:a.name,visible:a.visible!==!1,styledCells:kt,mergedRanges:dt,fonts:at});e&&nt>0&&e.push(t)}},n.save=function(n,t,f){var tt=new r.Workbook,l=new r.WorkSheet,it=new r.WorkbookFrozenPane,et=t&&t.includeColumnHeaders!=null?t.includeColumnHeaders:!0,nt=t&&t.includeRowHeaders!=null?t.includeRowHeaders:!1,b=t&&t.includeCellStyles!=null?t.includeCellStyles:!0,ht=t?t.activeWorksheet:null,a=t?t.includeColumns:null,s,y,k,p,w,h,e,o,rt,v,g,ot,d,ut=0,ft=0,st=0,c=0;if(rt=n.wj_sheetInfo,l.name=t?t.sheetName:'',l.visible=t?t.sheetVisible!==!1:!0,h=[],!rt&&b&&(v=document.createElement('div'),v.style.visibility='hidden',n.hostElement.appendChild(v)),nt){for(e=0;e<n.rowHeaders.rows.length;e++)for(h[e]=[],o=0;o<n.rowHeaders.columns.length;o++)k=n._getBindingColumn(n.rowHeaders,e,n.rowHeaders.columns[o]),p=this._getColumnSetting(k,n.columnHeaders.columns.defaultSize),h[e][o]=p,e===0&&(w=new r.WorkbookColumn,w._deserialize(p),l._addWorkbookColumn(w,o));c=o}if(et&&n.columnHeaders.rows.length>0){for(e=0;e<n.columnHeaders.rows.length;e++){for(h[e]||(h[e]=[]),o=0;o<n.columnHeaders.columns.length;o++)k=n._getBindingColumn(n.columnHeaders,e,n.columnHeaders.columns[o]),p=this._getColumnSetting(k,n.columnHeaders.columns.defaultSize),h[e][c+o]=p,e===0&&(!a||a(k))&&(w=new r.WorkbookColumn,w._deserialize(p),l._addWorkbookColumn(w));c=0;s={};y=new r.WorkbookRow;nt&&(c=this._parseFlexGridRowToSheetRow(n.topLeftCells,s,e,0,h,b,v,!1,0,a));this._parseFlexGridRowToSheetRow(n.columnHeaders,s,e,c,h,b,v,!1,0,a);s.cells.length>0&&(y._deserialize(s),l._addWorkbookRow(y,e))}ft=e}else for(h[0]||(h[0]=[]),o=0;o<n.columnHeaders.columns.length;o++)k=n._getBindingColumn(n.columnHeaders,0,n.columnHeaders.columns[o]),p=this._getColumnSetting(k,n.columnHeaders.columns.defaultSize),h[0][c+o]=p,(!a||a(k))&&(w=new r.WorkbookColumn,w._deserialize(p),l._addWorkbookColumn(w));for(e=0;e<n.cells.rows.length;e++)(c=0,s={},y=new r.WorkbookRow,g=n.rows[e],g instanceof u._NewRowTemplate)||(d=g instanceof u.GroupRow,d&&(ot=i.tryCast(g,u.GroupRow),ut=ot.level+1),nt&&(c=this._parseFlexGridRowToSheetRow(n.rowHeaders,s,e,0,h,b,v,d,ut,a)),this._parseFlexGridRowToSheetRow(n.cells,s,e,c,h,b,v,d,ut,a),s.cells.length>0&&(y._deserialize(s),l._addWorkbookRow(y,ft+e)));for(st=n.cells.rows.length,e=0;e<n.columnFooters.rows.length;e++)c=0,s={},y=new r.WorkbookRow,g=n.columnFooters.rows[e],d=g instanceof u.GroupRow,nt&&(c=this._parseFlexGridRowToSheetRow(n.rowHeaders,s,e,0,h,b,v,d,0,a)),this._parseFlexGridRowToSheetRow(n.columnFooters,s,e,c,h,b,v,d,0,a),s.cells.length>0&&(y._deserialize(s),l._addWorkbookRow(y,ft+st+e));return it.rows=et?n.frozenRows+n.columnHeaders.rows.length:n.frozenRows,it.columns=nt?n.frozenColumns+n.rowHeaders.columns.length:n.frozenColumns,l.frozenPane=it,tt._addWorkSheet(l),!rt&&b&&n.hostElement.removeChild(v),tt.activeWorksheet=ht,f&&tt.save(f),tt},n.load=function(n,t,u){var f,e,o=this;if(t instanceof Blob)e=new FileReader,e.onload=function(){var t=r.Workbook._base64EncArr(new Uint8Array(e.result));f=new r.Workbook;f.load(t);o._loadToFlexGrid(n,f,u)},e.readAsArrayBuffer(t);else if(t instanceof r.Workbook)o._loadToFlexGrid(n,t,u);else{if(t instanceof ArrayBuffer)t=r.Workbook._base64EncArr(new Uint8Array(t));else if(!i.isString(t))throw'Invalid workbook.';f=new r.Workbook;f.load(t);o._loadToFlexGrid(n,f,u)}},n._exportFlexGrid=function(n,t,r){var d=[],s=[],o={columns:[],rows:[],summaryBelow:!1},tt=r?r.includeColumnHeaders!=null?r.includeColumnHeaders:r.includeColumnHeader!=null?r.includeColumnHeader:!0:!0,b=r?r.includeRowHeaders!=null?r.includeRowHeaders:!1:!1,w=r?r.includeCellStyles!=null?r.includeCellStyles:r.needGetCellStyle!=null?r.needGetCellStyle:!0:!0,a=r?r.includeColumns:null,h,v,c,f,e,p,y,g,it,k,nt=0,rt=0,l=0;if(p=n.wj_sheetInfo,o.name=p?p.name:'',o.visible=p?p.visible!==!1:!0,o.style={font:{size:14}},o.columns=[],!p&&w&&(y=document.createElement('div'),y.style.visibility='hidden',n.hostElement.appendChild(y)),b){for(f=0;f<n.rowHeaders.rows.length;f++)for(s[f]=[],o.columns[f]=[],e=0;e<n.rowHeaders.columns.length;e++)v=n._getBindingColumn(n.rowHeaders,f,n.rowHeaders.columns[e]),c=this._getColumnSetting(v,n.columnHeaders.columns.defaultSize),s[f][e]=c,o.columns[f][e]=c;l=e}if(tt&&n.columnHeaders.rows.length>0){for(f=0;f<n.columnHeaders.rows.length;f++){for(s[f]||(s[f]=[]),o.columns[f]||(o.columns[f]=[]),e=0;e<n.columnHeaders.columns.length;e++)v=n._getBindingColumn(n.rowHeaders,f,n.columnHeaders.columns[e]),c=this._getColumnSetting(v,n.columnHeaders.columns.defaultSize),s[f][l+e]=c,(!a||a(v))&&o.columns[f].push(c);l=0;h={};b&&(l=this._parseFlexGridRowToSheetRow(n.topLeftCells,h,f,0,s,w,y,!1,0,a));this._parseFlexGridRowToSheetRow(n.columnHeaders,h,f,l,s,w,y,!1,0,a);h.cells.length>0&&(d[f]=h)}rt=f}else for(s[0]||(s[0]=[]),o.columns[f]||(o.columns[f]=[]),e=0;e<n.columnHeaders.columns.length;e++)v=n.columnHeaders.columns[e],c=this._getColumnSetting(v,n.columnHeaders.columns.defaultSize),s[0][l+e]=c,(!a||a(v))&&o.columns[f].push(c);for(o.columns=s,f=0;f<n.cells.rows.length;f++)l=0,h={},g=n.rows[f],k=g instanceof u.GroupRow,k&&(it=i.tryCast(g,u.GroupRow),nt=it.level+1),b&&(l=this._parseFlexGridRowToSheetRow(n.rowHeaders,h,f,0,s,w,y,k,nt,a)),this._parseFlexGridRowToSheetRow(n.cells,h,f,l,s,w,y,k,nt,a),h.cells.length>0&&(d[rt+f]=h);o.rows=d;o.frozenPane={rows:tt?n.frozenRows+n.columnHeaders.rows.length:n.frozenRows,columns:b?n.frozenColumns+n.rowHeaders.columns.length:n.frozenColumns};t.sheets.push(o);!p&&w&&n.hostElement.removeChild(y)},n._loadToFlexGrid=function(n,t,f){var ii=f&&f.includeColumnHeaders!=null?f.includeColumnHeaders:!0,p=f&&f.includeColumnHeaders!=null?f.includeColumnHeaders:!0,yt=f&&f.sheetIndex!=null&&!isNaN(f.sheetIndex)?f.sheetIndex:0,ri=f?f.sheetName:null,ui=f?f.sheetVisible:!0,fi=f&&(f.sheetIndex!=null&&!isNaN(f.sheetIndex)||f.sheetName!=null||f.sheetVisible!=null),e=0,h=0,tt,it,v,rt,b,w,ut,pt,g,dt,s,l,gt,k,ft,c,et,ot,ni,wt,a,st,d,y,ht,o,bt,kt,ct,ti,nt,lt=!1,at={},vt;if(n.itemsSource=null,n.columns.clear(),n.rows.clear(),n.frozenColumns=0,n.frozenRows=0,bt={},kt={},h=0,rt=[],ct=[],yt<0||yt>=t.sheets.length)throw'The sheet index option is out of the sheet range of current workbook.';if(l=t.sheets[yt],l.rows!=null){for(ii&&(h=1,l.rows.length<=1&&(p=!1,h=0),pt=l.rows[0]),k=this._getColumnCount(l.rows),gt=this._getRowCount(l.rows,k),ni=l.summaryBelow,v=l.columns||l.cols,e=0;e<k;e++)n.columns.push(new u.Column),!v[e]||(isNaN(+v[e].width)||(n.columns[e].width=+v[e].width),v[e].visible||v[e].visible==undefined||(n.columns[e].visible=!!v[e].visible),v[e].style&&!!v[e].style.wordWrap&&(n.columns[e].wordWrap=v[e].style.wordWrap));for(;h<gt;h++){if(ft=!1,vt=!0,s=l.rows[h],s)for(et=h+1;et<l.rows.length;)if(ot=l.rows[et],ot){(isNaN(s.groupLevel)&&!isNaN(ot.groupLevel)||!isNaN(s.groupLevel)&&s.groupLevel<ot.groupLevel)&&(ft=!0);break}else et++;for(ft&&!ni?(a&&(a.isCollapsed=lt),a=new u.GroupRow,a.isReadOnly=!1,lt=s.collapsed==null?!1:s.collapsed,a.level=isNaN(s.groupLevel)?0:s.groupLevel,at[a.level]=lt,this._checkParentCollapsed(at,a.level)&&a._setFlag(u.RowColFlags.ParentCollapsed,!0),n.rows.push(a)):(wt=new u.Row,s&&this._checkParentCollapsed(at,s.groupLevel)&&wt._setFlag(u.RowColFlags.ParentCollapsed,!0),n.rows.push(wt)),!s||!s.height||isNaN(s.height)||(n.rows[p?h-1:h].height=s.height),e=0;e<k;e++)if(s){if(c=s.cells[e],y=c?c.formula:undefined,y&&y[0]!=='='&&(y='='+y),y=y?this._parseToFlexSheetFormula(y):undefined,n.setCellData(p?h-1:h,e,y&&fi?y:this._getItemValue(c)),ft||this._setColumn(rt,e,c),ht=h*k+e,o=c?c.style:undefined,o){if(vt=vt&&!!o.wordWrap,ti=this._getItemType(c),o.hAlign)nt=r.Workbook._parseHAlignToString(i.asEnum(o.hAlign,r.HAlign));else switch(ti){case i.DataType.Number:nt='right';break;case i.DataType.Boolean:nt='center';break;default:nt='left'}bt[ht]={fontWeight:o.font&&o.font.bold?'bold':'none',fontStyle:o.font&&o.font.italic?'italic':'none',textDecoration:o.font&&o.font.underline?'underline':'none',textAlign:nt,fontFamily:o.font&&o.font.family?o.font.family:'',fontSize:o.font&&o.font.size?o.font.size+'px':'',color:o.font&&o.font.color?o.font.color:'',backgroundColor:o.fill&&o.fill.color?o.fill.color:'',format:r.Workbook._parseExcelFormat(c)};o.font&&ct.indexOf(o.font.family)===-1&&ct.push(o.font.family)}if(c&&i.isNumber(c.rowSpan)&&c.rowSpan>0&&i.isNumber(c.colSpan)&&c.colSpan>0&&(c.rowSpan>1||c.colSpan>1))for(tt=h;tt<h+c.rowSpan;tt++)for(it=e;it<e+c.colSpan;it++)ht=tt*k+it,kt[ht]=new u.CellRange(h,e,h+c.rowSpan-1,e+c.colSpan-1)}else n.setCellData(p?h-1:h,e,''),this._setColumn(rt,e,undefined);s&&(this._checkParentCollapsed(at,s.groupLevel)||s.visible||s.visible==undefined||(n.rows[p?h-1:h].visible=s.visible),n.rows[p?h-1:h].wordWrap=!!s.style&&!!s.style.wordWrap||vt)}for(a&&(a.isCollapsed=lt),l.frozenPane&&(st=l.frozenPane.columns,i.isNumber(st)&&!isNaN(st)&&(n.frozenColumns=st),d=l.frozenPane.rows,i.isNumber(d)&&!isNaN(d)&&(n.frozenRows=p&&d>0?d-1:d)),e=0;e<n.columnHeaders.columns.length;e++)b=rt[e],w=n.columns[e],w.isRequired=!1,p?(g=pt?pt.cells[e]:undefined,g&&g.value?(dt=r.Workbook._parseExcelFormat(g),ut=i.Globalize.format(g.value,dt)):ut=this._numAlpha(e)):ut=this._numAlpha(e),w.header=ut,b&&(b.dataType===i.DataType.Boolean&&(w.dataType=b.dataType),w.format=b.format,w.align=b.hAlign,w.wordWrap=w.wordWrap||b.wordWrap);n.wj_sheetInfo={name:ri||l.name,visible:ui===!0?!0:l.visible!==!1,styledCells:bt,mergedRanges:kt,fonts:ct}}},n._parseFlexGridRowToSheetRow=function(n,t,f,e,h,c,l,a,v,y){var nt,w,it,p,b,k,ft,st,et,rt,lt,g,tt,ht,ct,ot,d,vt=!1,at,ut,yt;for(nt=n.grid,ot=nt.wj_sheetInfo,w=n.rows[f],yt=w.recordIndex!=null?w.recordIndex:0,t.cells||(t.cells=[]),t.visible=w.isVisible,t.height=w.renderHeight||n.rows.defaultSize,t.groupLevel=a?v-1:v,a&&(t.collapsed=w.isCollapsed),w.wordWrap&&(t.style={wordWrap:w.wordWrap}),(w.constructor===u.Row||w.constructor===u._NewRowTemplate||o()&&w.constructor===o().DetailRow||s()&&w.constructor===s()._MultiRow)&&(vt=!0),p=0;p<n.columns.length;p++)if(ct=1,ht=1,ut=!1,at=nt._getBindingColumn(n,f,n.columns[p]),tt=null,ot&&n===nt.cells?(lt=f*n.columns.length+p,ot.mergedRanges&&(tt=ot.mergedRanges[lt]),ot.styledCells&&(g=ot.styledCells[lt])):c&&(g=this._getCellStyle(n,l,f,p)||{}),tt||(tt=nt.getMergedRange(n,f,p,!1)),tt?f===tt.topRow&&p===tt.leftCol&&(ht=tt.bottomRow-tt.topRow+1,ct=this._getColSpan(n,tt,y),ut=!0):ut=!0,!y||y(at))if(it=h[yt][p+e],vt||a?(k=ut?n.getCellData(f,p,!0):null,ft=ut?n.getCellData(f,p,!1):null,et=!1,k&&i.isString(k)&&k.length>1&&k[0]==='='&&(et=!0),d=i.isDate(ft),b=g&&g.format?r.Workbook._parseCellFormat(g.format,d):it&&it.style&&it.style.format?r.Workbook._parseCellFormat(it.style.format,d):null,b||(d?b='m/d/yyyy':i.isNumber(ft)&&!at.dataMap?b=i.isInt(ft)?'#,##0':'#,##0.00':et?(rt=k.toLowerCase(),rt==='=now()'?(b='m/d/yyyy h:mm',d=!0):rt==='=today()'||rt.substring(0,rt.indexOf('('))==='=date'?(b='m/d/yyyy',d=!0):rt.substring(0,rt.indexOf('('))==='=time'&&(b='h:mm AM/PM',d=!0)):b='General')):(k=ut?nt.columnHeaders.getCellData(0,p,!0):null,b='General'),n===nt.cells&&a&&w.hasChildren&&p===nt.columns.firstVisibleIndex){if(k?st=k:ut&&(st=w.getGroupHeader().replace(/<\/?\w+>/g,'')),st==null&&!g)continue;d=i.isDate(st);t.cells.push({value:st,isDate:d,formula:et?this._parseToExcelFormula(k,d):null,colSpan:ct,rowSpan:ht,style:this._extend(this._parseCellStyle(g),{format:b,font:{bold:!0},hAlign:r.HAlign.Left,indent:v-1})})}else t.cells.push({value:et?undefined:b==='General'?k:ft,isDate:d,formula:et?this._parseToExcelFormula(k,d):null,colSpan:p<nt.columns.firstVisibleIndex?1:ct,rowSpan:ht,style:this._extend(this._parseCellStyle(g),{format:b,hAlign:g&&g.textAlign?r.Workbook._parseStringToHAlign(g.textAlign):i.isDate(ft)&&it.style.hAlign==null?r.HAlign.Left:i.asEnum(it.style.hAlign,r.HAlign,!0),vAlign:ht>1?n===nt.cells?r.VAlign.Top:r.VAlign.Center:null})});return e+p},n._parseCellStyle=function(n){var t=n&&n.fontSize?+n.fontSize.substring(0,n.fontSize.indexOf('px')):null;return isNaN(t)&&(t=null),{font:{bold:n&&n.fontWeight&&(n.fontWeight==='bold'||!isNaN(+n.fontWeight)&&+n.fontWeight>=700),italic:n&&n.fontStyle&&n.fontStyle==='italic',underline:n&&n.textDecoration&&n.textDecoration==='underline',family:n?this._parseToExcelFontFamily(n.fontFamily):null,size:t,color:n&&n.color?n.color:null},fill:{color:n&&n.backgroundColor?n.backgroundColor:null},borders:n?this._parseBorder(n):null,hAlign:n&&n.textAlign?r.Workbook._parseStringToHAlign(n.textAlign):null}},n._parseBorder=function(n){var t,i;for(var r in{Left:0,Right:0,Top:0,Bottom:0})i=this._parseEgdeBorder(n,r),i&&(t||(t={}),t[r.toLowerCase()]=i);return t},n._parseEgdeBorder=function(n,t){var u,e='border'+t+'Color',f=n['border'+t+'Style'],o;if(f&&f!=='none'&&f!=='hidden'){u={};f=f.toLowerCase();switch(f){case'dotted':u.style=r.BorderStyle.Dotted;break;case'dashed':u.style=r.BorderStyle.Dashed;break;case'double':u.style=r.BorderStyle.Double;break;default:u.style=r.BorderStyle.Thin}n[e]&&(o=new i.Color(n[e]),u.color=o.toString())}return u},n._parseToExcelFontFamily=function(n){var t;return n&&(t=n.split(','),t&&t.length>0&&(n=t[0].replace(/\"|\'/g,''))),n},n._parseToExcelFormula=function(n,t){var u=n.substring(1,n.indexOf('(')).toLowerCase(),i;switch(u){case'ceiling':case'floor':n=n.substring(0,n.lastIndexOf(')'))+', 1)';break;case'text':i=n.substring(n.lastIndexOf(','),n.lastIndexOf('\"'));i=r.Workbook._parseCellFormat(i.substring(i.lastIndexOf('\"')+1),t);n=n.substring(0,n.lastIndexOf(',')+1)+'\"'+i+'\")'}return n},n._parseToFlexSheetFormula=function(n){var u=n.substring(1).match(/\W+(\w+)\(/),i,f,e,o,t;f=u&&u.length===2?u[1]:n.substring(1,n.indexOf('('));e=n.indexOf(f);switch(f.toLowerCase()){case'ceiling':case'floor':n=n.substring(0,n.lastIndexOf(','))+')';break;case'text':i=n.substring(e);t=i.substring(i.indexOf('\"'),i.lastIndexOf('\"'));t=t.substring(t.lastIndexOf('\"')+1);o=t.indexOf('0')>-1?0:'';t=r.Workbook._parseExcelFormat({value:o,style:{format:t}});t=t.replace(/m+/g,function(n){return n.toUpperCase()}).replace(/Y+/g,function(n){return n.toLowerCase()}).replace(/M+:?|:?M+/gi,function(n){return n.indexOf(':')>-1?n.toLowerCase():n});n=n.substring(0,e)+i.substring(0,i.indexOf('\"')+1)+t+'\")'}return n},n._getColumnSetting=function(n,t){var u=n.renderWidth;return u=u||t,{autoWidth:!0,width:u,visible:n.visible,style:{format:n.format?r.Workbook._parseCellFormat(n.format,n.dataType===i.DataType.Date):'',hAlign:r.Workbook._parseStringToHAlign(this._toExcelHAlign(n.getAlignment())),wordWrap:n.wordWrap}}},n._toExcelHAlign=function(n){return(n=n?n.trim().toLowerCase():n,!n)?n:n.indexOf('center')>-1?'center':n.indexOf('right')>-1||n.indexOf('end')>-1?'right':n.indexOf('justify')>-1?'justify':'left'},n._getColumnCount=function(n){for(var f=0,t=0,r,u=0;u<n.length;u++)r=n[u]&&n[u].cells?n[u].cells:[],r&&r.length>0&&(t=r.length,i.isInt(r[t-1].colSpan)&&r[t-1].colSpan>1&&(t=t+r[t-1].colSpan-1),t>f&&(f=t));return f},n._getRowCount=function(n,t){for(var f=n.length,u=f-1,o=0,e,s,r;o<t;o++)n:for(;u>=0;u--)if(e=n[u],s=e&&e.cells?e.cells:[],r=s[o],r&&(r.value!=null&&r.value!==''||i.isInt(r.rowSpan)&&r.rowSpan>1)){i.isInt(r.rowSpan)&&r.rowSpan>1&&u+r.rowSpan>f&&(f=u+r.rowSpan);break n}return f},n._numAlpha=function(n){var t=Math.floor(n/26)-1;return(t>-1?this._numAlpha(t):'')+String.fromCharCode(65+n%26)},n._getItemType=function(n){return n===undefined||n===null||n.value===undefined||n.value===null||isNaN(n.value)?undefined:i.getType(n.value)},n._setColumn=function(n,t,u){var e,o,s,f=n[t];f?(e=this._getItemType(u),f.dataType!==e&&f.dataType===i.DataType.Boolean&&e!==i.DataType.Boolean&&(f.dataType=e),u&&u.value!=null&&u.value!==''&&(o=r.Workbook._parseExcelFormat(u),o&&f.format!==o&&o!=='General'&&(f.format=o)),u&&u.style&&(u.style.hAlign&&(s=r.Workbook._parseHAlignToString(i.asEnum(u.style.hAlign,r.HAlign))),f.wordWrap=f.wordWrap&&!!u.style.wordWrap),s||e!==i.DataType.Number||(s='right'),f.hAlign=s):n[t]={dataType:this._getItemType(u),format:r.Workbook._parseExcelFormat(u),hAlign:'',wordWrap:!0}},n._getItemValue=function(n){if(n===undefined||n===null||n.value===undefined||n.value===null)return undefined;var t=n.value;return i.isNumber(t)&&isNaN(t)?'':t instanceof Date&&isNaN(t.getTime())?'':t},n._getCellStyle=function(n,t,i,r){try{this._resetCellStyle(t);n.grid.cellFactory.updateCell(n,i,r,t)}catch(u){return undefined}return window.getComputedStyle(t)},n._resetCellStyle=function(n){for(var t in n.style)typeof n.style[t]=='string'&&isNaN(+t)&&(n.style[t]='')},n._extend=function(n,t){var r,u;for(r in t)u=t[r],i.isObject(u)&&n[r]?i.copy(n[r],u):n[r]=u;return n},n._checkParentCollapsed=function(n,t){var i=!1;return Object.keys(n).forEach(function(r){n[r]===!0&&i===!1&&!isNaN(t)&&+r<t&&(i=!0)}),i},n._getColSpan=function(n,t,i){for(var u=0,r=t.leftCol;r<=t.rightCol;r++)(!i||i(n.columns[r]))&&u++;return u},n}();n("FlexGridXlsxConverter",e)}}})