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
/*
 * Wijmo culture file: ko (Korean)
 */
var wijmo;
(function (wijmo) {
    wijmo.culture = {
        Globalize: {
            name: 'ko',
            displayName: 'Korean',
            numberFormat: {
                '.': '.',
                ',': ',',
                percent: { pattern: ['-n%', 'n%'] },
                currency: { decimals: 0, symbol: '₩', pattern: ['-$n', '$n'] }
            },
            calendar: {
                '/': '-',
                ':': ':',
                firstDay: 0,
                days: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
                daysAbbr: ['일', '월', '화', '수', '목', '금', '토'],
                months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                monthsAbbr: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                am: ['오전', '오전'],
                pm: ['오후', '오후'],
                eras: ['서기'],
                patterns: {
                    d: 'yyyy-MM-dd', D: 'yyyy"년" M"월" d"일" dddd',
                    f: 'yyyy"년" M"월" d"일" dddd tt h:mm', F: 'yyyy"년" M"월" d"일" dddd tt h:mm:ss',
                    t: 'tt h:mm', T: 'tt h:mm:ss',
                    m: 'M"월" d"일"', M: 'M"월" d"일"',
                    y: 'yyyy"년" M"월"', Y: 'yyyy"년" M"월"',
                    g: 'yyyy-MM-dd tt h:mm', G: 'yyyy-MM-dd tt h:mm:ss',
                    s: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss'
                },
            }
        },
        MultiSelect: {
            itemsSelected: '{count:n0} 항목 선택'
        },
        FlexGrid: {
            groupHeaderFormat: '{name}: <b>{value}</b> ({count:n0} 항목)'
        },
        FlexGridFilter: {
            // filter
            ascending: '\u2191 상승',
            descending: '\u2193 하락',
            apply: '적용',
            clear: '지움',
            conditions: '조건에 따른 필터',
            values: '값에 따른 필터',
            // value filter
            search: '검색',
            selectAll: '모두 선택',
            null: '(없음)',
            // condition filter
            header: '항목 표시: 값이',
            and: '및',
            or: '또는',
            stringOperators: [
                { name: '(설정 되지 않음)', op: null },
                { name: '다음과 같을 경우', op: 0 },
                { name: '다음과 같지 않을 경우', op: 1 },
                { name: '다음의 값으로 시작하는 경우', op: 6 },
                { name: '다음의 값으로 끝나는 경우', op: 7 },
                { name: '다음의 값을 포함하는 경우', op: 8 },
                { name: '다음의 값을 포함하지 않는 경우', op: 9 }
            ],
            numberOperators: [
                { name: '(설정 되지 않음)', op: null },
                { name: '다음과 같을 경우', op: 0 },
                { name: '다음과 같지 않을 경우', op: 1 },
                { name: '다음의 값보다 큰 경우', op: 2 },
                { name: '다음의 값보다 크거나 같은 경우', op: 3 },
                { name: '다음의 값보다 작은 경우', op: 4 },
                { name: '다음의 값보다 작거나 같은 경우', op: 5 }
            ],
            dateOperators: [
                { name: '(설정 되지 않음)', op: null },
                { name: '다음과 같을 경우', op: 0 },
                { name: '다음의 값보다 앞에 있는 경우', op: 4 },
                { name: '다음의 값보다 뒤에 있는 경우', op: 3 }
            ],
            booleanOperators: [
                { name: '(설정 되지 않음)', op: null },
                { name: '다음과 같을 경우', op: 0 },
                { name: '다음과 같지 않을 경우', op: 1 }
            ]
        },
        olap: {
            PivotFieldEditor: {
                dialogHeader: '필드 설정:',
                header: '헤더:',
                summary: '요약:',
                showAs: '표시:',
                weighBy: '여 무게:',
                sort: '정렬:',
                filter: '필터:',
                format: '형식:',
                sample: '미리 보기:',
                edit: '편집…',
                clear: '지우기',
                ok: '확인',
                cancel: '취소',
                none: '(없음)',
                sorts: {
                    asc: '오름차순',
                    desc: '내림차순'
                },
                aggs: {
                    sum: '합계',
                    cnt: '개수',
                    avg: '평균',
                    max: 'MAX',
                    min: 'MIN',
                    rng: '범위',
                    std: '표본_표준_편차',
                    var: 'VAR',
                    stdp: 'StdDevPop',
                    varp: 'VarPop'
                },
                calcs: {
                    noCalc: '계산 없음',
                    dRow: '이전 행에서 차이',
                    dRowPct: '% 이전 행에서 차이',
                    dCol: '이전 열에서 차이',
                    dColPct: '% 이전 열에서 차이',
                    dPctGrand: '그랜드 합계의 %',
                    dPctRow: '행 합계의 %',
                    dPctCol: '열 합계의 %',
                    dRunTot: '누적 합계',
                    dRunTotPct: '% 누적 합계'
                },
                formats: {
                    n0: '정수 (n0)',
                    n2: '진수 (n2)',
                    c: '통화 (c)',
                    p0: '비율 (p0)',
                    p2: '비율 (p2)',
                    n2c: '수천 (n2,)',
                    n2cc: '수백만 (n2,,)',
                    n2ccc: '수십억 (n2,,,)',
                    d: '날짜 (d)',
                    MMMMddyyyy: '월 일 년 (MMMM dd, yyyy)',
                    dMyy: '일 월 년 (d/M/yy)',
                    ddMyy: '일 월 년 (dd/M/yy)',
                    dMyyyy: '일 월 년 (M/dd/yyyy)',
                    MMMyyyy: '달 년 (MMM yyyy)',
                    MMMMyyyy: '달 년 (MMMM yyyy)',
                    yyyyQq: '올해 분기 (yyyy "Q" q)',
                    FYEEEEQU: '회계 연도 분기 ("년도" EEEE "Q" U)'
                }
            },
            PivotEngine: {
                grandTotal: '총합계',
                subTotal: '부분합'
            },
            PivotPanel: {
                fields: '보고서에 추가할 필드 선택:',
                drag: '아래 영역 사이에 필드를 끌어 놓으십시오:',
                filters: '필터',
                cols: '열',
                rows: '행',
                vals: '값',
                defer: '업데이트 지연',
                update: '업데이트'
            },
            _ListContextMenu: {
                up: '위로 이동',
                down: '아래로 이동',
                first: '처음으로 이동',
                last: '끝으로 이동',
                filter: '보고서 필터로 이동',
                rows: '행 레이블로 이동',
                cols: '열 레이블로 이동',
                vals: '값으로 이동',
                remove: '필드 제거',
                edit: '필드 설정…',
                detail: '자세히 보기…'
            },
            PivotChart: {
                by: '기준',
                and: 'and'
            },
            DetailDialog: {
                header: '세부 정보 보기:',
                ok: '확인',
                items: '{cnt:n0} 항목',
                item: '{cnt} 항목',
                row: 'Row',
                col: '세로 막대형'
            }
        },
        Viewer: {
            cancel: '취소',
            ok: '확인',
            bottom: '아래쪽:',
            top: '위쪽:',
            right: '오른쪽:',
            left: '왼쪽:',
            margins: '여백(인치)',
            orientation: '방향:',
            paperKind: '종이 종류:',
            pageSetup: '설정 페이지',
            landscape: '가로',
            portrait: '세로',
            pageNumber: '페이지 번호',
            zoomFactor: '확대/축소 비율',
            paginated: '인쇄 레이아웃',
            print: '인쇄',
            search: '검색',
            matchCase: '대/소문자 구분',
            wholeWord: '단어 단위로',
            searchResults: '검색 결과',
            previousPage: '이전 페이지',
            nextPage: '다음 페이지',
            firstPage: '첫 페이지',
            lastPage: '마지막 페이지',
            backwardHistory: '뒤로',
            forwardHistory: '앞으로',
            pageCount: '페이지 수',
            selectTool: '도구 선택',
            moveTool: '이동 도구',
            continuousMode: '연속 페이지 보기',
            singleMode: '단일 페이지 보기',
            wholePage: '전체 페이지를 맞춤된',
            pageWidth: '페이지 너비에 맞게',
            zoomOut: '축소',
            zoomIn: '확대',
            exports: '내보내기',
            fullScreen: '전체 화면',
            exitFullScreen: '전체 화면 끝내기',
            thumbnails: '페이지 축소판',
            outlines: '문서 구조',
            loading: '로드 중입니다…',
            pdfExportName: 'Adobe PDF',
            docxExportName: 'Open XML 워드',
            xlsxExportName: 'Open XML Excel',
            docExportName: 'Microsoft Word',
            xlsExportName: 'Microsoft Excel',
            mhtmlExportName: '웹 보관 파일 (MHTML)',
            htmlExportName: 'HTML 문서',
            rtfExportName: 'RTF 문서',
            metafileExportName: '압축 된 메타 파일',
            csvExportName: 'CSV',
            tiffExportName: 'Tiff 이미지',
            bmpExportName: 'BMP 이미지',
            emfExportName: '향상 된 메타 파일',
            gifExportName: 'GIF 이미지',
            jpgExportName: 'JPEG 이미지',
            jpegExportName: 'JPEG 이미지',
            pngExportName: 'PNG 이미지',
            parameters: 'Parameters',
            requiringParameters: '매개 변수를 입력 하십시오.',
            nullParameterError: '값은 null일 수 없습니다.',
            invalidParameterError: '잘못된 입력입니다.',
            parameterNoneItemsSelected: '(없음)',
            parameterAllItemsSelected: '(모두)',
            parameterSelectAllItemText: '(모두 선택)',
            selectParameterValue: '(값을 선택)',
            apply: '적용',
            errorOccured: '오류가 발생했습니다.'
        }
    };
})(wijmo || (wijmo = {}));
;
