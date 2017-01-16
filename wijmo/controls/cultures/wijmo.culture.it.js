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
 * Wijmo culture file: it (Italian)
 */
var wijmo;
(function (wijmo) {
    wijmo.culture = {
        Globalize: {
            name: 'it',
            displayName: 'Italian',
            numberFormat: {
                '.': ',',
                ',': '.',
                percent: { pattern: ['-n%', 'n%'] },
                currency: { decimals: 2, symbol: '€', pattern: ['-n $', 'n $'] }
            },
            calendar: {
                '/': '/',
                ':': ':',
                firstDay: 1,
                days: ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'],
                daysAbbr: ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'],
                months: ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'],
                monthsAbbr: ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'],
                am: ['', ''],
                pm: ['', ''],
                eras: ['d.C.'],
                patterns: {
                    d: 'dd/MM/yyyy', D: 'dddd d MMMM yyyy',
                    f: 'dddd d MMMM yyyy HH:mm', F: 'dddd d MMMM yyyy HH:mm:ss',
                    t: 'HH:mm', T: 'HH:mm:ss',
                    m: 'd MMMM', M: 'd MMMM',
                    y: 'MMMM yyyy', Y: 'MMMM yyyy',
                    g: 'dd/MM/yyyy HH:mm', G: 'dd/MM/yyyy HH:mm:ss',
                    s: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss'
                },
            }
        },
        MultiSelect: {
            itemsSelected: '{count:n0} elementi selezionati'
        },
        FlexGrid: {
            groupHeaderFormat: '{name}: <b>{value}</b> ({count:n0} elementi)'
        },
        FlexGridFilter: {
            // filter
            ascending: '\u2191 Crescente',
            descending: '\u2193 Decrescente',
            apply: 'Applica',
            clear: 'Cancella',
            conditions: 'Filtra per Condizione',
            values: 'Filtra per valore',
            // value filter
            search: 'Cerca',
            selectAll: 'Seleziona tutto',
            null: '(niente)',
            // condition filter
            header: 'Mostra elementi dove il valore',
            and: 'E',
            or: 'Oppure',
            stringOperators: [
                { name: '(non impostato)', op: null },
                { name: 'Uguale a', op: 0 },
                { name: 'Diverso da', op: 1 },
                { name: 'Inizia con', op: 6 },
                { name: 'Termina con', op: 7 },
                { name: 'Contiene', op: 8 },
                { name: 'Non contiene', op: 9 }
            ],
            numberOperators: [
                { name: '(non impostato)', op: null },
                { name: 'Uguale a', op: 0 },
                { name: 'Diverso da', op: 1 },
                { name: 'Maggiore di', op: 2 },
                { name: 'Maggiore o uguale a', op: 3 },
                { name: 'Minore di', op: 4 },
                { name: 'Minore o uguale a', op: 5 }
            ],
            dateOperators: [
                { name: '(non impostato)', op: null },
                { name: 'Uguale a', op: 0 },
                { name: 'Prima di', op: 4 },
                { name: 'Dopo', op: 3 }
            ],
            booleanOperators: [
                { name: '(non impostato)', op: null },
                { name: 'Uguale a', op: 0 },
                { name: 'Diverso da', op: 1 }
            ]
        },
        olap: {
            PivotFieldEditor: {
                dialogHeader: 'Impostazioni del campo:',
                header: 'Intestazione:',
                summary: 'Sunto:',
                showAs: 'Visualizza come:',
                weighBy: 'Pesare da:',
                sort: 'Ordinamento:',
                filter: 'Filtro:',
                format: 'Formato:',
                sample: 'Esempio:',
                edit: 'Modifica…',
                clear: 'Cancella',
                ok: 'OK',
                cancel: 'Annulla',
                none: '(nessuno)',
                sorts: {
                    asc: 'Crescente',
                    desc: 'Decrescente'
                },
                aggs: {
                    sum: 'Somma',
                    cnt: 'Conteggio',
                    avg: 'Media',
                    max: 'Max',
                    min: 'Min',
                    rng: 'Intervallo',
                    std: 'Dev. Standard',
                    var: 'Varianza',
                    stdp: 'Dev. StandardP',
                    varp: 'VarianzaP'
                },
                calcs: {
                    noCalc: 'Nessun calcolo',
                    dRow: 'Differenza della riga precedente',
                    dRowPct: '% Differenza dalla riga precedente',
                    dCol: 'Differenza dalla colonna precedente',
                    dColPct: '% Differenza dalla colonna precedente',
                    dPctGrand: '% del totale complessivo',
                    dPctRow: '% di riga totale',
                    dPctCol: '% della colonna totale',
                    dRunTot: 'Totale parziale',
                    dRunTotPct: '% totale parziale'
                },
                formats: {
                    n0: 'Intero (n0)',
                    n2: 'Decimale (n2)',
                    c: 'Valuta (c)',
                    p0: 'Percentuale (p0)',
                    p2: 'Percentuale (p2)',
                    n2c: 'Migliaia (n2,)',
                    n2cc: 'Milioni (n2,,)',
                    n2ccc: 'Miliardi (n2,,,)',
                    d: 'Data (d)',
                    MMMMddyyyy: 'Mese giorno anno (MMMM dd, yyyy)',
                    dMyy: 'Giorno mese anno (d/M/yy)',
                    ddMyy: 'Giorno mese anno (dd/M/yy)',
                    dMyyyy: 'Giorno mese anno (dd/M/yyyy)',
                    MMMyyyy: 'Mese anno (MMM yyyy)',
                    MMMMyyyy: 'Mese anno (MMMM yyyy)',
                    yyyyQq: 'Trimestre (yyyy "Q" q)',
                    FYEEEEQU: 'Trimestre fiscale ("FY" EEEE "Q" U)'
                }
            },
            PivotEngine: {
                grandTotal: 'Totale complessivo',
                subTotal: 'Subtotale'
            },
            PivotPanel: {
                fields: 'Scegliere i campi da aggiungere al report:',
                drag: 'Trascinare i campi nelle aree sottostanti:',
                filters: 'Filtri',
                cols: 'Colonne',
                rows: 'Righe',
                vals: 'Valori',
                defer: 'Rinviare gli aggiornamenti',
                update: 'Aggiorna'
            },
            _ListContextMenu: {
                up: 'Sposta su',
                down: 'Sposta giù',
                first: 'Sposta all\'inizio',
                last: 'Sposta alla fine',
                filter: 'Sposta nel filtro per il rapporto',
                rows: 'Sposta nelle etichette di riga',
                cols: 'Sposta nelle etichette di colonna',
                vals: 'Sposta nei valori',
                remove: 'Rimuovi campo',
                edit: 'Impostazioni campo…',
                detail: 'Visualizza dettaglio…'
            },
            PivotChart: {
                by: 'per',
                and: 'e'
            },
            DetailDialog: {
                header: 'Vista di dettaglio:',
                ok: 'OK',
                items: 'elementi di {cnt:n0}',
                item: 'elemento di {cnt}',
                row: 'Riga',
                col: 'Colonna'
            }
        },
        Viewer: {
            cancel: 'Annulla',
            ok: 'OK',
            bottom: 'Inferiore:',
            top: 'Superiore:',
            right: 'Destra:',
            left: 'Sinistra:',
            margins: 'Margini (pollici)',
            orientation: 'Orientamento:',
            paperKind: 'Tipo di carta:',
            pageSetup: 'Imposta pagina',
            landscape: 'Orizzontale',
            portrait: 'Verticale',
            pageNumber: 'Numero di pagina',
            zoomFactor: 'Fattore di ingrandimento',
            paginated: 'Layout di stampa',
            print: 'Stampare',
            search: 'Cerca',
            matchCase: 'Maiuscole/minuscole',
            wholeWord: 'Solo parole intere',
            searchResults: 'Risultati ricerca',
            previousPage: 'Pagina precedente',
            nextPage: 'Pagina successiva',
            firstPage: 'Prima pagina',
            lastPage: 'Ultima pagina',
            backwardHistory: 'Indietro',
            forwardHistory: 'Avanti',
            pageCount: 'Conteggio pagine',
            selectTool: 'Selezionare strumento',
            moveTool: 'Strumento sposta',
            continuousMode: 'Vista pagina continua',
            singleMode: 'Visualizzazione a pagina singola',
            wholePage: 'Adatta pagina intera',
            pageWidth: 'Misura la larghezza della pagina',
            zoomOut: 'Riduci',
            zoomIn: 'Ingrandisci',
            exports: 'Esporta',
            fullScreen: 'Schermo intero',
            exitFullScreen: 'Chiudi visualizzazione schermo intero',
            thumbnails: 'Miniature di pagina',
            outlines: 'Struttura del documento',
            loading: 'Caricamento…',
            pdfExportName: 'Adobe PDF',
            docxExportName: 'Open XML Word',
            xlsxExportName: 'Open XML Excel',
            docExportName: 'Microsoft Word',
            xlsExportName: 'Microsoft Excel',
            mhtmlExportName: 'Archivio Web (MHTML)',
            htmlExportName: 'Documento HTML',
            rtfExportName: 'Documento RTF',
            metafileExportName: 'Metafile compresso',
            csvExportName: 'CSV',
            tiffExportName: 'Immagini TIFF',
            bmpExportName: 'Immagini BMP',
            emfExportName: 'Metafile avanzato',
            gifExportName: 'Immagini GIF',
            jpgExportName: 'Immagini JPEG',
            jpegExportName: 'Immagini JPEG',
            pngExportName: 'Immagini PNG',
            parameters: 'Parameters',
            requiringParameters: 'Parametri di input per favore.',
            nullParameterError: 'Il valore non può essere null.',
            invalidParameterError: 'Input non valido.',
            parameterNoneItemsSelected: '(nessuno)',
            parameterAllItemsSelected: '(tutti)',
            parameterSelectAllItemText: '(Seleziona tutto)',
            selectParameterValue: '(selezionare valore)',
            apply: 'Applica',
            errorOccured: 'Si è verificato un errore.'
        }
    };
})(wijmo || (wijmo = {}));
;
