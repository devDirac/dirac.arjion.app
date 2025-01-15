import {
    Backdrop,
    CircularProgress,
    Grid
} from "@mui/material";
import DashboardLayout from "../examples/LayoutContainers/DashboardLayout";
import React, {
    useCallback,
    useEffect,
    useState
} from "react";
import DashboardNavbar from "../examples/Navbars/DashboardNavbar";
import {
    useSelector
} from "react-redux";
import ModalComponent from "../componets/Modal";
import {
    useMaterialUIController
} from "context";
import {
    StoreType
} from "../types/geericTypes";
import {
    setAhut
} from "../actions/auth";
import {
    useIntl
} from "react-intl";
import "./styles.scss";
import "gantt-task-react/dist/index.css";
import { sleep } from "../utils";
import { getErrorHttpMessage } from "../utils";
import { getVerCuentasContablesHttp } from '../actions/cuentasContables';
import _ from "lodash";
import { numericFormatter } from "react-number-format";
import DinamicTableMejorada from '../componets/DinamicTableMejorada/DinamicTableMejorada';
import AddIcon from '@mui/icons-material/Add';
import CatalogoPEP from '../componets/CatalogosForms/CatalogoPEP';
import { getCatalogosGereicos, guardaCatalogoPEPHttp } from '../actions/catalogos';

const VerCuentasContablesPage: React.FC = () => {

    const intl = useIntl();
    const espacio = useSelector((state: any) => state?.app?.espacio || null);
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [procesando, setProcesando] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const [data, setData] = useState([]);
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);
    const [peps, setPeps] = useState<any>([]);
    const [isAlertOpenContratos, setIsAlertOpenContratos] = useState(false);
    const handleisAlertOpenContratos = () => setIsAlertOpenContratos(true);
    const handleisAlerCloseContratos = () => setIsAlertOpenContratos(false);
    const [dataDetalle, setDataDetalle] = useState([]);

    const [isOpenAdd, setOpenAdd] = useState(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const token = useSelector((state: StoreType) => state?.app?.user?.token || '')

    useEffect(() => {
        setAhut(token);
    }, [token]);

     const getDatosCatalogo = useCallback(async () => {
            try {
                setProcesando(true);
                const dataCatRes = await getCatalogosGereicos('apm_pep');
                setPeps(dataCatRes.filter((r: any) => r?.id_obra === espacio?.id))
                setProcesando(false);
            } catch (error) {
                const message = getErrorHttpMessage(error);
                setMensajeAlert(message || intl.formatMessage({ id: 'catalogos_error_obtener' }));
                setProcesando(false);
                handleisAlertOpen();
            }
        }, []);
    
        useEffect(() => {
            getDatosCatalogo()
        }, [getDatosCatalogo])

    const getData = useCallback(async () => {
        try {
            setProcesando(true);
            const response = await getVerCuentasContablesHttp(espacio?.id)
            setData(response)
            //alert('obtencion de las cuentas contables')
            setProcesando(false);
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_obtener' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    }, [espacio?.id]);

    useEffect(() => {
        getData();
    }, [getData]);

    const guardaCataPEP = async (data: any) => {
        try {
            setProcesando(true);
            await guardaCatalogoPEPHttp(data);
            getData();
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
            setProcesando(false);
            handleisAlertOpen();
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    }
    
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container justifyContent="center" alignItems="center" sx={{ height: "100%", mt: 3 }} style={darkMode ? { backgroundColor: '#1f283e', padding: '25px' } : { backgroundColor: '#fff', padding: '25px' }}>

                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <h3 className='color-dark'>Cuentas contables<small style={{cursor:'pointer', fontSize:15, color:'#1A73E8'}}  onClick={()=>{
                        handleOpenAdd();
                    }}> <AddIcon /> agregar cuenta
                        
                        </small></h3>
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                {!_.isEmpty(data) ? <DinamicTableMejorada
                        flex
                        key={'idTable'}
                        esPlanMaestro
                        verComentarios={(row) => {
                            setDataDetalle(row?.detalle || []);
                            handleisAlertOpenContratos();
                        }}
                        pinned={[{ columna: 'cuenta', lado: 'left' }]}
                        columnsToShow={['cuenta', 'descripción', 'presupuesto', 'contratado', 'presupuesto_disponible', 'ejercido_estimado', 'por_ejercer', 'contabilizado', 'pagado', 'por_pagar', 'fondo_garantia', 'cta_contratos']}
                        data={(data || []).filter((r: any) => r?.cuenta !== 'Total').map((r: any) => {
                            return {
                                cuenta:r?.cuenta,
                                descripcion:r?.descripcion,
                                presupuesto:numericFormatter((r?.presupuesto || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                contratado:numericFormatter((r?.contratado || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                presupuesto_disponible:numericFormatter((r?.presupuesto_disponible || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                ejercido_estimado:numericFormatter((r?.ejercido_estimado || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }) ,
                                por_ejercer:numericFormatter((r?.por_ejercer || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                contabilizado:numericFormatter((r?.contabilizado || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                pagado:numericFormatter((r?.pagado || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                por_pagar:numericFormatter((r?.por_pagar || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                fondo_garantia:numericFormatter((r?.fondo_garantia || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                detalle:r?.contratos,
                                cta_contratos:r?.contratos,
                            }
                        })}
                        footerRowData={data.filter((r: any) => r?.cuenta === 'Total').map((r: any) => {
                            return {
                                cuenta:r?.cuenta,
                                descripcion:r?.descripcion,
                                presupuesto:numericFormatter((r?.presupuesto || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                contratado:numericFormatter((r?.contratado || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                presupuesto_disponible:numericFormatter((r?.presupuesto_disponible || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                ejercido_estimado:numericFormatter((r?.ejercido_estimado || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }) ,
                                por_ejercer:numericFormatter((r?.por_ejercer || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                contabilizado:numericFormatter((r?.contabilizado || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                pagado:numericFormatter((r?.pagado || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                por_pagar:numericFormatter((r?.por_pagar || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                fondo_garantia:numericFormatter((r?.fondo_garantia || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                detalle:r?.contratos,
                                cta_contratos:r?.contratos,
                            }
                        })}
                        titulo={''}
                    /> : null}
                </Grid>
            </Grid>
            <Backdrop className='BackdropClass' open={procesando}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <ModalComponent handleClose={handleisAlerClose} isOpen={isAlertOpen} key={'alerta'}>
                <Grid container spacing={2} style={{ textAlign: 'center' }}>
                    <Grid item xs={12}>
                        <br />
                        <br />
                        <p>{mensajeAlert}</p>
                    </Grid>
                </Grid>
            </ModalComponent>

            <ModalComponent handleClose={handleisAlerCloseContratos} isOpen={isAlertOpenContratos} key={'alerta'} size='xl'>
                <Grid container spacing={2} style={{ textAlign: 'center' }}>
                    <Grid item xs={12}>
                    {!_.isEmpty(dataDetalle) ? <DinamicTableMejorada
                        key={'idTableDetalle'}
                        /* pinned={[{ columna: 'cuenta', lado: 'left' }]} */
                        //columnsToShow={['cuenta', 'descripción', 'presupuesto', 'contratado', 'presupuesto_disponible', 'ejercido_estimado', 'por_ejercer', 'contabilizado', 'pagado', 'por_pagar', 'fondo_garantia', 'cta_contratos']}
                        data={dataDetalle.map((r:any)=> {
                            return {
                                id_contrato: r?.id_contrato,
                                contratista: r?.contratista,
                                descripcion:r?.descripcion,
                                contratado: numericFormatter((r?.importe || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                anticipo: numericFormatter((r?.anticipo || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                amortizado: numericFormatter((r?.amortizaion || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                ejercido_estimado: numericFormatter((r?.ejercido_estimado || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                por_ejercer: numericFormatter((r?.por_ejercer || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                contabilizado:numericFormatter((r?.contabilizado || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                pagado: numericFormatter((r?.pagado || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                por_pagar: numericFormatter((r?.por_pagar || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                fondo_garantia:numericFormatter((r?.fondo_garantia || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }) 
                            }
                        })}
                        titulo={''}
                    /> : 'Sin resultados'}
                    </Grid>
                </Grid>
            </ModalComponent>

<ModalComponent handleClose={handleCloseAdd} isOpen={isOpenAdd}>
                <CatalogoPEP 
                    key={'agregaNuevo'} 
                    catalogo={'apm_pep'}
                    idObra={espacio?.id}
                    titulo={'apm_pep'}
                    action={guardaCataPEP} 
                    peps={peps}
                    procesando={procesando} /> 
            </ModalComponent>
            
        </DashboardLayout>
    )
}

export default VerCuentasContablesPage
