import React, { useEffect, useRef, useState } from 'react';
import CommentIcon from '@mui/icons-material/Comment';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, CellValueChangedEvent } from 'ag-grid-community';
import ModalComponent from '../Modal/index';
import './style.scss'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button, Grid } from '@mui/material';

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

interface TablaDocumentosProps {
    footerRowData?: any
    initialData: any[]
    enGuardar?:(dta:any)=>void
}

const TablaDocumentos: React.FC<TablaDocumentosProps> = (props: TablaDocumentosProps) => {
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
        setRowData([...props?.initialData]);
        setOriginalData(JSON.parse(JSON.stringify(props?.initialData)));
    }, [props?.initialData]);

    
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);

    const columnDefs: any[] = [

        {
            field: 'path',
            headerName: 'Nombre documento',
            editable: false,
            autoHeight: true
        },
        {
            field: 'importe',
            autoHeight: true,
            headerName: 'Importe del documento',
            editable: true,
            pinned: 'left',
            width: 150,
            cellStyle: {
                backgroundColor: '#e8f0fe'
            }
        },
        {
            field: 'nombre',
            autoHeight: true,
            headerName: 'Nombre corto del documento',
            editable: true,
            pinned: 'left',
            width: 150,
            cellStyle: {
                backgroundColor: '#e8f0fe'
            }
        },
        {
            field: 'descripcion',
            autoHeight: true,
            headerName: 'Descripción del documento',
            editable: true,
            pinned: 'left',
            width: 150,
            cellStyle: {
                backgroundColor: '#e8f0fe'
            }
        },
        {
            field: 'moneda',
            autoHeight: true,
            headerName: 'Tipo de moneda',
            editable: false,
            pinned: 'left',
            width: 150,
            cellStyle: {
                backgroundColor: '#ffff'
            }
        },
        {
            field: 'documento_valido',
            autoHeight: true,
            headerName: 'El documento es valido?',
            editable: false,
            pinned: 'left',
            width: 150,
            cellStyle: {
                backgroundColor: '#ffff'
            }
        },
        {
            field: 'motivo_valido',
            autoHeight: true,
            headerName: 'Por que el documento es valido o invalido',
            editable: false,
            pinned: 'left',
            width: 150,
            cellStyle: {
                backgroundColor: '#ffff'
            }
        }
    ];

    const isValidNumber = (value: any): boolean => {
        if (value === "" || value === 0) {
            return false
        }
        return !isNaN(value) && isFinite(value);
    };

    const revertCellValue = (params: CellValueChangedEvent) => {
        isReverting.current = true;
        params.node.setDataValue(params.column.getId(), '0');
    };

    const handleCellValueChanged = (params: CellValueChangedEvent) => {
        if (isReverting.current) {
            isReverting.current = false;
            return;
        }
        if (params.column.getId() === 'importe') {
            const newValue = Number(params.newValue);
            if (!isValidNumber(newValue)) {
                revertCellValue(params);
                return;
            }
        }
    };
    const onGridReady = (params: any) => {
        gridApiRef.current = params.api;
    };

    return (
        <div style={{ width: '100%', height: '500px' }} className="ag-theme-alpine">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={{ flex: 1, editable: true }}
                        onCellValueChanged={handleCellValueChanged}
                        getRowId={(params) => params.data.path + ''}
                        detailRowHeight={50}
                        getRowHeight={(params) => {
                            return 50;
                        }}
                        domLayout="autoHeight"
                        localeText={localeText}
                        onGridReady={onGridReady}
                        pagination={pagination}
                        paginationPageSize={paginationPageSize}
                        paginationPageSizeSelector={paginationPageSizeSelector}
                        pinnedBottomRowData={props?.footerRowData || null}
                    />
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'right' }}>
                    <Button disabled={!rowData?.length} variant="outlined" size="small" style={{ color: '#1976d2', marginLeft: 2 }} onClick={() => {
                        props?.enGuardar && props?.enGuardar(rowData)
                    }}>
                        Guardar y continuar
                    </Button>
                </Grid>
            </Grid>
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

export default TablaDocumentos
