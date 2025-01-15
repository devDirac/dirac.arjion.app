import React, { useEffect, useRef, useState } from 'react';
import CommentIcon from '@mui/icons-material/Comment';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, CellValueChangedEvent } from 'ag-grid-community';
import ModalComponent from '../Modal/index';
import './style.scss'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Grid } from '@mui/material';
import { Button } from 'react-bootstrap';
import { numericFormatter } from 'react-number-format';

interface RowData {
    id: number;
    name: string;
    age: number;
    comment: string | null;
}

interface EditHistory {
    id: number;
    column: string;
    oldValue: any;
    newValue: any;
    comment: string;
}

const localeText = {
    page: "Página",
    more: "Más",
    to: "a",
    of: "de",
    next: "Siguiente",
    last: "Último",
    first: "Primero",
    previous: "Anterior",
    loadingOoo: "Cargando...",
    selectAll: "Seleccionar todo",
    searchOoo: "Buscando...",
    blanks: "En blanco",
    filterOoo: "Filtrar...",
    equals: "Igual",
    notEqual: "Diferente",
    contains: "Contiene",
    notContains: "No contiene",
    startsWith: "Empieza con",
    endsWith: "Termina con",
    pageSize: "Tamaño de página",
    applyFilter: "Aplicar filtro",
    resetFilter: "Restablecer filtro",
    clearFilter: "Borrar filtro",
    noRowsToShow: "No hay datos para mostrar",
    pinColumn: "Fijar columna",
    autosizeThiscolumn: "Ajustar esta columna",
    autosizeAllColumns: "Ajustar todas las columnas",
    resetColumns: "Restablecer columnas",
    blank: "Vacío",
    notBlank: "No vacío",
};

interface TablaEditProps {
    footerRowData?: any
    //initialData?: any[]
    enCheckBox: (data: any) => void
    verComentarios: (data: any) => void
    initialData: any[]
}

const TablaEdit: React.FC<TablaEditProps> = (props: TablaEditProps) => {
    const gridRef = useRef();
    
    const pagination = true;
    const paginationPageSize = 10;
    const paginationPageSizeSelector = [10, 20, 1000];

    const [rowData, setRowData] = useState<any[]>([]);
    const [originalData, setOriginalData] = useState<RowData[]>([]);
    const [editHistory, setEditHistory] = useState<EditHistory[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [currentEdit, setCurrentEdit] = useState<CellValueChangedEvent | null>(null);
    const gridApiRef = useRef<any>(null);
    const isReverting = useRef(false);

    useEffect(() => {
        setRowData([...props?.initialData]); // Mantener una copia separada de los datos originales
        setOriginalData(JSON.parse(JSON.stringify(props?.initialData)));
    }, [props?.initialData]);

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);


    const verComentarios = (row_: any) => {
        const row = row_?.data;
        const x = row_?.colDef?.field;
        return (
            <div key={row?.id}>
                <Button
                    id="basic-button"
                    aria-haspopup="true"
                    onClick={() => {
                        props?.verComentarios && props?.verComentarios(row);
                    }}
                >
                    <CommentIcon />
                </Button>
            </div>
        );
    }

    const printConcepto = (row_: any) => {
        const row = row_?.data;
        const x = row_?.colDef?.field;
        return (<p style={{ color: '#fb8c00', fontWeight: 'bold' }}>{row?.concepto},<strong style={{ color: '#1A73E8' }}>{` (frente:${row?.frentes?.[0]?.frente || ''}) ${row?.subfrentes?.[0]?.frente ? ', (subfrente:' + (row?.subfrentes?.[0]?.frente || '') + ')' : ''}`}</strong></p>);
    }

    const setFormatoMoneda = (row_: any) => {
        const row = row_?.data;
        const x = row_?.colDef?.field;
        const text = numericFormatter(row?.[x] + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' });
        return (<p>{text}</p>);
    }

    const setFormatoUnidad = (row_: any) => {
        const row = row_?.data;
        const x = row_?.colDef?.field;
        const text = numericFormatter(row?.[x] + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: ' ' + (row?.unidad || '') });
        return (<p>{text}</p>);
    }

    const columnDefs: any[] = [
        /* {
            headerName: "Seleccionar", // Nombre de la columna
            checkboxSelection: true,  // Habilita checkboxes en las filas
            headerCheckboxSelection: false, // Deshabilita el checkbox en el header
            field: "campo"
          }, */
        { field: 'id', headerName: 'ID', editable: false, autoHeight: true, },
        {
            field: 'concepto', autoHeight: true,
            headerName: 'ID_concepto',
            editable: false,
            cellRenderer: (row: any) => printConcepto(row)
        },
        {
            field: 'comentarios', autoHeight: true,
            headerName: 'Comentarios',
            editable: false,
            cellRenderer: (row: any) => verComentarios(row)
        },
        { field: 'descripcion', headerName: 'Descripcion', editable: false },
        {
            field: 'precio_unitario', autoHeight: true,
            headerName: 'Precio unitario',
            editable: false,
            cellRenderer: (row: any) => setFormatoMoneda(row)
        },
        {
            field: 'cantidad_ejecutada', autoHeight: true,
            headerName: 'Cantidad ejecutada',
            editable: false,
            cellRenderer: (row: any) => setFormatoUnidad(row)
        },
        {
            field: 'pendiente_estimar', autoHeight: true,
            headerName: 'Pendiente de estimar',
            editable: false,
            cellRenderer: (row: any) => setFormatoUnidad(row)
        },
        {
            field: 'cantidad_acumulada', autoHeight: true,
            headerName: 'Cantidad acumulada',
            editable: false,
            cellRenderer: (row: any) => setFormatoUnidad(row)
        },
        {
            field: 'importe_acumulado', autoHeight: true,
            headerName: 'Importe acumulado',
            editable: false,
            cellRenderer: (row: any) => setFormatoMoneda(row)
        },
        {
            field: 'importe', autoHeight: true,
            headerName: 'Importe',
            editable: false,
            cellRenderer: (row: any) => setFormatoMoneda(row)
        },
        {
            field: 'volumen_estimar', autoHeight: true,
            headerName: 'Volumen estimar',
            editable: true,
            pinned: 'left',
            width: 150,
            cellStyle: { backgroundColor: '#e8f0fe' },
        },
        {
            field: 'comment', autoHeight: true,
            headerName: 'Comentario vulumen capturado < Volumen estimar',
            editable: (params: any) => params.data.comment !== null,
            cellStyle: (params: any) =>
                params.data.comment !== null
                    ? { backgroundColor: '#fef6e4' }
                    : { backgroundColor: '#f0f0f0', color: '#a1a1a1' },
        },
    ];

    const isValidNumber = (value: any): boolean => {
        return !isNaN(value) && isFinite(value);
    };

    const handleCellValueChanged = (params: CellValueChangedEvent) => {
        if (isReverting.current) {
            isReverting.current = false;
            return;
        }
        if (params.column.getId() === 'volumen_estimar') {
            const newValue = Number(params.newValue);
            const oldValue = Number(params.oldValue);
            const originalValue = getOriginalAge(params.node.data.id);
            if (+newValue > +originalValue) {
                setMensajeAlert(`No puedes ingresar un volumen mayor al volumen original propuesto (${originalValue})`)
                handleisAlertOpen();
                revertCellValue(params, originalValue);
                updateImporte(params.node.data.id)
                return;
            }
            if (!isValidNumber(newValue)) {
                setMensajeAlert(`Solo valores numéricos son aceptados `)
                handleisAlertOpen();
                revertCellValue(params, originalValue);
                updateImporte(params.node.data.id)
                return;
            }
            if (+newValue < +originalValue) {
                setCurrentEdit(params);
                setIsModalOpen(true);
                updateImporte(params.node.data.id);
                updateComment(params.node.data.id, 'Volumen capturado menor al volumen propuesto');
            }
            if (+newValue === +originalValue) {
                updateImporte(params.node.data.id);
                updateComment(params.node.data.id, '');
            }
        } else if (params.column.getId() === 'comment') {
            updateComment(params.node.data.id, params.newValue);
        }
    };

    const getOriginalAge = (id: number): number => {
        const originalRow: any = originalData.find((row) => row.id === id);
        return originalRow ? originalRow.volumen_estimar : 0;
    };

    const revertCellValue = (params: CellValueChangedEvent, oldValue: number) => {
        isReverting.current = true;
        params.node.setDataValue(params.column.getId(), oldValue);
    };

    const saveComment = (comment: string) => {
        if (currentEdit /* && comment.trim() */) {
            const newValue = Number(currentEdit.newValue);
            updateRowData(currentEdit.node.data.id, newValue);
            setEditHistory((prevHistory: any) => [
                ...prevHistory.filter((edit: any) => edit.id !== currentEdit.node.data.id),
                {
                    id: currentEdit.node.data.id,
                    oldValue: currentEdit.oldValue as number,
                    newValue: newValue,
                    comment: comment,
                },
            ]);
            updateComment(currentEdit.node.data.id, comment);
            setComment('');
            setIsModalOpen(false);
        } else {
            setMensajeAlert('Por favor, introduce un comentario.')
            handleisAlertOpen();
        }
    };

    const updateImporte = (id: number) => {
        setRowData((prevData) =>
            prevData.map((row) =>
                row.id === id ? { ...row, importe: (+row?.volumen_estimar) * +(row?.precio_unitario || '0') } : row
            )
        );
    };

    const updateComment = (id: number, newComment: string) => {
        setRowData((prevData) =>
            prevData.map((row) =>
                row.id === id ? { ...row, comment: newComment } : row
            )
        );
    };

    const updateRowData = (id: number, newValue: number) => {
        setRowData((prevData) =>
            prevData.map((row) =>
                row.id === id ? { ...row, age: newValue } : row
            )
        );
    };

    const onSelectionChanged = (event: any) => {
        const selectedNodes = event.api.getSelectedNodes();
        const selectedData = selectedNodes.map((node: any) => node.data);
        props?.enCheckBox && props?.enCheckBox(selectedData);
    };

    const onGridReady = (params: any) => {
        gridApiRef.current = params.api; // Guardar referencia a la API de Ag-Grid
    };

    /* const onRowSelected = (event: any) => {
        const { api } = event;
        const allRows: any = [];
        api.forEachNode((node: any) => {
            allRows.push(node);
        });
        allRows.forEach((node: any) => {
            if (!node.data.selectable) {
                node.setSelected(false);
            }
        });
    }; */

    return (
        <div style={{ width: '100%', height: '500px' }} className="ag-theme-alpine">
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={{ flex: 1, editable: true }}
                onCellValueChanged={handleCellValueChanged}
                onSelectionChanged={onSelectionChanged}
                getRowId={(params) => params.data.id + ''}
                detailRowHeight={150}
                localeText={localeText}
                rowSelection={{
                    mode: 'multiRow',
                    headerCheckbox: false,
                }}
                getRowClass={(params) => !params.data.selectable ? 'ag-row-disabled' : ''}
                onGridReady={onGridReady} // Establecer la referencia a la API
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                paginationPageSizeSelector={paginationPageSizeSelector}
                pinnedBottomRowData={props?.footerRowData || null}
                //onRowSelected={onRowSelected}
            />
            <ModalComponent handleClose={handleisAlerClose} isOpen={isAlertOpen} key={'alerta'}>
                <Grid container spacing={2} style={{ textAlign: 'center' }}>
                    <Grid item xs={12}>
                        <br />
                        <br />
                        <p>{mensajeAlert}</p>
                    </Grid>
                </Grid>
            </ModalComponent>
        </div>
    );
}

export default TablaEdit
