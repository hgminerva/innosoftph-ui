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
 * Wijmo culture file: uk (Ukrainian)
 */
var wijmo;
(function (wijmo) {
    wijmo.culture = {
        Globalize: {
            name: 'uk',
            displayName: 'Ukrainian',
            numberFormat: {
                '.': ',',
                ',': ' ',
                percent: { pattern: ['-n%', 'n%'] },
                currency: { decimals: 2, symbol: '₴', pattern: ['-n $', 'n $'] }
            },
            calendar: {
                '/': '.',
                ':': ':',
                firstDay: 1,
                days: ['неділя', 'понеділок', 'вівторок', 'середа', 'четвер', 'п\'ятниця', 'субота'],
                daysAbbr: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                months: ['січень', 'лютий', 'березень', 'квітень', 'травень', 'червень', 'липень', 'серпень', 'вересень', 'жовтень', 'листопад', 'грудень'],
                monthsAbbr: ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'],
                am: ['', ''],
                pm: ['', ''],
                eras: ['н.е.'],
                patterns: {
                    d: 'dd.MM.yyyy', D: 'd MMMM yyyy" р."',
                    f: 'd MMMM yyyy" р." H:mm', F: 'd MMMM yyyy" р." H:mm:ss',
                    t: 'H:mm', T: 'H:mm:ss',
                    m: 'd MMMM', M: 'd MMMM',
                    y: 'MMMM yyyy" р."', Y: 'MMMM yyyy" р."',
                    g: 'dd.MM.yyyy H:mm', G: 'dd.MM.yyyy H:mm:ss',
                    s: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss'
                },
            }
        },
        MultiSelect: {
            itemsSelected: '{count:n0} пунктів обраний'
        },
        FlexGrid: {
            groupHeaderFormat: '{name}: <b>{value}</b> ({count:n0} елементи)'
        },
        FlexGridFilter: {
            // filter
            ascending: '\u2191 У порядку зростання',
            descending: '\u2193 У порядку спадання',
            apply: 'Застосувати',
            clear: 'Очистити',
            conditions: 'Фільтрувати за умовою',
            values: 'Фільтрувати за значенням',
            // value filter
            search: 'Пошук',
            selectAll: 'Шукати все',
            null: '(нічого)',
            // condition filter
            header: 'Показати елементи зі значенням',
            and: 'Ta',
            or: 'Або',
            stringOperators: [
                { name: '(не встановлено)', op: null },
                { name: 'Дорівнює', op: 0 },
                { name: 'Не дорівнює', op: 1 },
                { name: 'починається з', op: 6 },
                { name: 'Закінчується на', op: 7 },
                { name: 'Містить', op: 8 },
                { name: 'Не містить', op: 9 }
            ],
            numberOperators: [
                { name: '(не встановлено)', op: null },
                { name: 'Дорівнює', op: 0 },
                { name: 'Не дорівнює', op: 1 },
                { name: 'Більше', op: 2 },
                { name: 'Більше або дорівнює', op: 3 },
                { name: 'Менше', op: 4 },
                { name: 'Менше або дорівнює', op: 5 }
            ],
            dateOperators: [
                { name: '(не встановлено)', op: null },
                { name: 'Дорівнює', op: 0 },
                { name: 'До', op: 4 },
                { name: 'Після', op: 3 }
            ],
            booleanOperators: [
                { name: '(не встановлено)', op: null },
                { name: 'Дорівнює', op: 0 },
                { name: 'Не дорівнює', op: 1 }
            ]
        },
        olap: {
            PivotFieldEditor: {
                dialogHeader: 'Параметри поля:',
                header: 'верхнього колонтитула:',
                summary: 'Резюме:',
                showAs: 'Відобразити як:',
                weighBy: 'Важити по:',
                sort: 'Сортування:',
                filter: 'Фільтр:',
                format: 'Формат:',
                sample: 'Зразок:',
                edit: 'Редагування…',
                clear: 'Очистити',
                ok: 'ОК',
                cancel: 'Скасувати',
                none: '(немає)',
                sorts: {
                    asc: 'За зростанням',
                    desc: 'За спаданням'
                },
                aggs: {
                    sum: 'Сума',
                    cnt: 'Лічильник',
                    avg: 'Середня',
                    max: 'MAX',
                    min: 'MIN',
                    rng: 'Діапазон',
                    std: 'Зсунене відхилення',
                    var: 'VAR',
                    stdp: 'StdDevPop',
                    varp: 'VarPop'
                },
                calcs: {
                    noCalc: 'Без обчислення',
                    dRow: 'Відмінність від попереднього рядка',
                    dRowPct: '% Відмінність від попереднього рядка',
                    dCol: 'Відмінність від попереднього стовпця',
                    dColPct: '% Відмінність від попереднього стовпця',
                    dPctGrand: '% від підсумка',
                    dPctRow: '% загальної рядка',
                    dPctCol: '% всього стовпця',
                    dRunTot: 'З накопичувальним підсумком',
                    dRunTotPct: '% працює загальна'
                },
                formats: {
                    n0: 'Ціле число (n0)',
                    n2: 'Float (n2)',
                    c: 'Грошова одиниця (c)',
                    p0: 'Відсоток (p0)',
                    p2: 'Відсоток (p2)',
                    n2c: 'Тисячі (n2)',
                    n2cc: 'Мільйони (n2,)',
                    n2ccc: 'Мільярди (n2),,',
                    d: 'Дата (d)',
                    MMMMddyyyy: 'Місяць дня року (ММММ dd, рррр)',
                    dMyy: 'День місяць рік (д/М/рр)',
                    ddMyy: 'День місяць рік (M/ДД/РР)',
                    dMyyyy: 'День місяць рік (дд/М/рррр)',
                    MMMyyyy: 'Місяць рік (МММ рррр)',
                    MMMMyyyy: 'Місяць рік (натискань ММММ. рррр)',
                    yyyyQq: 'Роком чверть (yyyy "Q"q)',
                    FYEEEEQU: 'Квартал фінансового року ("FY" EEEE "Q" U)'
                }
            },
            PivotEngine: {
                grandTotal: 'Загальний підсумок',
                subTotal: 'SUBTOTAL'
            },
            PivotPanel: {
                fields: 'Виберіть поля для додавання до звіту:',
                drag: 'Перетягніть поля між такими областями:',
                filters: 'Фільтри',
                cols: 'Стовпці',
                rows: 'Рядки',
                vals: 'Значення',
                defer: 'Відкласти оновлення',
                update: 'Оновити'
            },
            _ListContextMenu: {
                up: 'Вгору',
                down: 'Вниз',
                first: 'переміщення на початок',
                last: 'Перейти до кінця',
                filter: 'Перейти до фільтру звіту',
                rows: 'Перейти до підписів рядків',
                cols: 'Перейти до підписів стовпців',
                vals: 'Перейти до значень',
                remove: 'Видалити поля',
                edit: 'Параметри поля…',
                detail: 'Показати подробиці…'
            },
            PivotChart: {
                by: 'за',
                and: 'та'
            },
            DetailDialog: {
                header: 'Докладне подання:',
                ok: 'ОК',
                items: '{cnt:n0} елементів',
                item: '{cnt} елемент',
                row: 'Рядок',
                col: 'Стовпець'
            }
        },
        Viewer: {
            cancel: 'Скасувати',
            ok: 'ОК',
            bottom: 'Вниз:',
            top: 'Зверху:',
            right: 'Справа:',
            left: 'Зліва:',
            margins: 'Поля (дюйми)',
            orientation: 'Напрямок:',
            paperKind: 'Вид паперу:',
            pageSetup: 'зміну розмітки сторінки',
            landscape: 'Альбомна',
            portrait: 'Книжкова',
            pageNumber: 'Номер сторінки',
            zoomFactor: 'Коефіцієнт масштабування',
            paginated: 'Надрукувати макет',
            print: 'Друк',
            search: 'Пошук',
            matchCase: 'Враховувати регістр',
            wholeWord: 'Слово цілком',
            searchResults: 'Результати пошуку',
            previousPage: 'Попередня сторінка',
            nextPage: 'Наступна сторінка',
            firstPage: 'Перша сторінка',
            lastPage: 'Остання сторінка',
            backwardHistory: 'повернутий',
            forwardHistory: 'Вперед',
            pageCount: 'Кількість сторінок',
            selectTool: 'Виберіть інструмент',
            moveTool: 'Інструмент "переміщення"',
            continuousMode: 'Безперервний режим перегляду',
            singleMode: 'Суцільне подання сторінки',
            wholePage: 'Fit цілу сторінку',
            pageWidth: 'Шириною сторінки',
            zoomOut: 'Зменшити',
            zoomIn: 'Збільшити',
            exports: 'Експорт',
            fullScreen: 'На весь екран',
            exitFullScreen: 'Вийти з повноекранного режиму',
            thumbnails: 'Мініатюри сторінок',
            outlines: 'Схема документа',
            loading: 'Завантаження…',
            pdfExportName: 'Adobe PDF',
            docxExportName: 'Слово Open XML',
            xlsxExportName: 'Excel Open XML',
            docExportName: 'Microsoft Word',
            xlsExportName: 'Microsoft Excel',
            mhtmlExportName: 'Веб-архів (MHTML)',
            htmlExportName: 'HTML-документа',
            rtfExportName: 'RTF документ',
            metafileExportName: 'Стиснутий метафайли',
            csvExportName: 'CSV',
            tiffExportName: 'TIFF-зображень',
            bmpExportName: 'Для Бітових зображень',
            emfExportName: 'Розширений метафайл',
            gifExportName: 'GIF зображень',
            jpgExportName: 'Зображення JPEG',
            jpegExportName: 'Зображення JPEG',
            pngExportName: 'PNG зображення',
            parameters: 'Параметрів',
            requiringParameters: 'Будь ласка, введіть параметри.',
            nullParameterError: 'Значення не може бути пустим.',
            invalidParameterError: 'Неприпустимий ввід.',
            parameterNoneItemsSelected: '(немає)',
            parameterAllItemsSelected: '(всі)',
            parameterSelectAllItemText: '(Виділити все)',
            selectParameterValue: '(виберіть значення)',
            apply: 'Застосувати',
            errorOccured: 'Сталася помилка.'
        }
    };
})(wijmo || (wijmo = {}));
;

