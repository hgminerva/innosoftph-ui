/*
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
/*
 * Wijmo culture file: zh-CN (Chinese (Simplified, PRC))
 */
var wijmo;
(function (wijmo) {
    wijmo.culture = {
        Globalize: {
            name: 'zh-CN',
            displayName: 'Chinese (Simplified, PRC)',
            numberFormat: {
                '.': '.',
                ',': ',',
                percent: { pattern: ['-n%', 'n%'] },
                currency: { decimals: 2, symbol: '¥', pattern: ['$-n', '$n'] }
            },
            calendar: {
                '/': '/',
                ':': ':',
                firstDay: 1,
                days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                daysAbbr: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                monthsAbbr: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                am: ['上午', '上'],
                pm: ['下午', '下'],
                eras: ['公元'],
                patterns: {
                    d: 'yyyy/M/d', D: 'yyyy"年"M"月"d"日"',
                    f: 'yyyy"年"M"月"d"日" H:mm', F: 'yyyy"年"M"月"d"日" H:mm:ss',
                    t: 'H:mm', T: 'H:mm:ss',
                    m: 'M"月"d"日"', M: 'M"月"d"日"',
                    y: 'yyyy"年"M"月"', Y: 'yyyy"年"M"月"',
                    g: 'yyyy/M/d H:mm', G: 'yyyy/M/d H:mm:ss',
                    s: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss'
                },
            }
        },
        MultiSelect: {
            itemsSelected: '选定{count:n0}个项目'
        },
        FlexGrid: {
            groupHeaderFormat: '{name}: <b>{value}</b> ({count:n0} 项目)'
        },
        FlexGridFilter: {
            // filter
            ascending: '\u2191 升序',
            descending: '\u2193 降序',
            apply: '应用',
            clear: '清除',
            conditions: '按条件过滤',
            values: '按值过滤',
            // value filter
            search: '搜索',
            selectAll: '选择全部',
            null: '(无)',
            // condition filter
            header: '显示下列值的项目',
            and: '和',
            or: '或',
            stringOperators: [
                { name: '(非预设)', op: null },
                { name: '等于', op: 0 },
                { name: '不等于', op: 1 },
                { name: '开头为', op: 6 },
                { name: '结尾为', op: 7 },
                { name: '包含', op: 8 },
                { name: '不包含', op: 9 }
            ],
            numberOperators: [
                { name: '(非预设)', op: null },
                { name: '等于', op: 0 },
                { name: '不等于', op: 1 },
                { name: '大于', op: 2 },
                { name: '大于或等于', op: 3 },
                { name: '小于', op: 4 },
                { name: '小于或等于', op: 5 }
            ],
            dateOperators: [
                { name: '(非预设)', op: null },
                { name: '等于', op: 0 },
                { name: '之后为', op: 4 },
                { name: '之前为', op: 3 }
            ],
            booleanOperators: [
                { name: '(非预设)', op: null },
                { name: '等于', op: 0 },
                { name: '不等于', op: 1 }
            ]
        },
        olap: {
            PivotFieldEditor: {
                dialogHeader: '字段设置:',
                header: '头:',
                summary: '汇总:',
                showAs: '显示为:',
                weighBy: '权重:',
                sort: '排序:',
                filter: '过滤:',
                format: '格式:',
                sample: '示例:',
                edit: '编辑…',
                clear: '清除',
                ok: 'OK',
                cancel: '取消',
                none: '(无)',
                sorts: {
                    asc: '升序',
                    desc: '降序'
                },
                aggs: {
                    sum: 'Sum 求和',
                    cnt: 'Count 总数',
                    avg: 'Average 平均值',
                    max: 'Max 最大值',
                    min: 'Min 最小值',
                    rng: 'Range 范围',
                    std: 'StdDev 标准差',
                    var: 'Var 方差',
                    stdp: 'StdDevPop 总体标准差',
                    varp: 'VarPop 总体方差'
                },
                calcs: {
                    noCalc: '不计算',
                    dRow: '前一行的差异',
                    dRowPct: '前一行差异的%',
                    dCol: '前一列的差异',
                    dColPct: '前一列差异的%',
                    dPctGrand: '总计的百分比',
                    dPctRow: '%的行总数',
                    dPctCol: '%的列合计',
                    dRunTot: '运行总和',
                    dRunTotPct: '总运行 %'
                },
                formats: {
                    n0: '整数 (n0)',
                    n2: '十进制 (n2)',
                    c: '货币 (c)',
                    p0: '百分比 (p0)',
                    p2: '百分比 (p2)',
                    n2c: '数千人 (n2,)',
                    n2cc: '数以百万计 (n2,,)',
                    n2ccc: '数十亿 (n2,,,)',
                    d: '日期 (d)',
                    MMMMddyyyy: '月天年 (MMMM dd, yyyy)',
                    dMyy: '天月年 (d/M/yy)',
                    ddMyy: '天月年 (dd/M/yy)',
                    dMyyyy: '天月年 (dd/M/yyyy)',
                    MMMyyyy: '月年 (MMM yyyy)',
                    MMMMyyyy: '月年 (MMMM yyyy)',
                    yyyyQq: '去年季度 (yyyy"Q"q)',
                    FYEEEEQU: '财政年度季度 ("FY"EEEE "Q"U)'
                }
            },
            PivotEngine: {
                grandTotal: '总合计',
                subTotal: '小计'
            },
            PivotPanel: {
                fields: '选择字段:',
                drag: '在下面的区域之间拖动字段:',
                filters: '过滤',
                cols: '列',
                rows: '行',
                vals: '值',
                defer: '延迟更新',
                update: '更新'
            },
            _ListContextMenu: {
                up: '上移',
                down: '下移',
                first: '移动到开始',
                last: '移动到结尾',
                filter: '移动到过滤区域',
                rows: '移动到行区域',
                cols: '移动到列区域',
                vals: '移动到值区域',
                remove: '移除字段',
                edit: '字段设置…',
                detail: '显示明细…'
            },
            PivotChart: {
                by: '依据',
                and: '并且'
            },
            DetailDialog: {
                header: '查看明细:',
                ok: 'OK',
                items: '{cnt:n0} 项目',
                item: '{cnt} 项目',
                row: '行',
                col: '列'
            }
        },
        Viewer: {
            cancel: '取消',
            ok: 'OK',
            bottom: '底部:',
            top: '顶部:',
            right: '右边:',
            left: '左边:',
            margins: '边(英寸)',
            orientation: '方向:',
            paperKind: '纸张种类:',
            pageSetup: '纸张设置',
            landscape: '横向',
            portrait: '纵向',
            pageNumber: '页数',
            zoomFactor: '放大',
            paginated: '打印布局',
            print: '打印',
            search: '查找',
            matchCase: '匹配大小写',
            wholeWord: '匹配整个字符',
            searchResults: '搜索结果',
            previousPage: '前一页',
            nextPage: '下一页',
            firstPage: '第一页',
            lastPage: '最后一页',
            backwardHistory: '向后',
            forwardHistory: '向前',
            pageCount: '页数',
            selectTool: '选择工具',
            moveTool: '移动工具',
            continuousMode: '连续多页模式',
            singleMode: '单页模式',
            wholePage: '适应整页',
            pageWidth: '适应页宽',
            zoomOut: '缩小',
            zoomIn: '放大',
            exports: '导出',
            fullScreen: '全屏',
            exitFullScreen: '退出全屏',
            thumbnails: '缩略图',
            outlines: '文档结构图',
            loading: '加载中…',
            pdfExportName: 'Adobe PDF',
            docxExportName: 'Open XML Word',
            xlsxExportName: 'Open XML Excel',
            docExportName: 'Microsoft Word',
            xlsExportName: 'Microsoft Excel',
            mhtmlExportName: 'Web archive (MHTML)',
            htmlExportName: 'HTML 文档',
            rtfExportName: 'RTF 文档',
            metafileExportName: '压缩的图元文件',
            csvExportName: 'CSV',
            tiffExportName: 'Tiff 图片',
            bmpExportName: 'BMP 图片',
            emfExportName: '增强的图元文件',
            gifExportName: 'GIF 图片',
            jpgExportName: 'JPG 图片',
            jpegExportName: 'JPEG 图片',
            pngExportName: 'PNG 图片',
            parameters: '参数',
            requiringParameters: '请输入参数.',
            nullParameterError: '值不能为空.',
            invalidParameterError: '无效输入.',
            parameterNoneItemsSelected: '(空)',
            parameterAllItemsSelected: '(所有)',
            parameterSelectAllItemText: '(选择所有)',
            selectParameterValue: '(选择值)',
            apply: '适用',
            errorOccured: '错误发生.'
        }
    };
})(wijmo || (wijmo = {}));
;

