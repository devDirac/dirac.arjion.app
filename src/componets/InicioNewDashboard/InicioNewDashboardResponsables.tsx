import { Avatar, Divider, Grid, Card, CardContent, CircularProgress, Backdrop, Box, Tab, Tabs } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import ModalComponent from '../Modal/index';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import iconoIrAPM from "../../assets/images/Iconos_APM/fondo_transparente/iconos_08_apm.png";
import CampoChart from '../CampoChart/index';
import { useMaterialUIController } from 'context';
import { InicioNewDashboardResponsablesProps } from './types';
import { numericFormatter } from 'react-number-format';
import { useDispatch, useSelector } from "react-redux";
import './style.scss'
import moment from 'moment';
import {
    getAnticiposResponsablesHTTP,
    getFondoGarantiaResponsablesHTTP,
    getEstimacionesProcesoResponsablesHTTP,
    getPendientesContabilizarResponsablesHTTP,
    getOENEHTTP,
    getDetalleFondoGarantiaHTTP,
    getDetallePendienteContabilizarHTTP,
    getDetalleOENEHTTP
} from '../../actions/newDashboard';
import DinamicTable from '../../componets/DinamicTable/index'
import DinamicTableMejorada from '../../componets/DinamicTableMejorada/DinamicTableMejorada';
import Progreso from '../Progreso/index';
function CustomTabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const InicioNewDashboardResponsables: React.FC<InicioNewDashboardResponsablesProps> = (props: InicioNewDashboardResponsablesProps) => {

    const dispatch = useDispatch();
    const [queryParameters] = useSearchParams();
    const responsable: string = queryParameters.get("responsable") || '';
    const usuario: string = queryParameters.get("usuario") || '';
    const contrato: string = queryParameters.get("contrato") || '';
    const infoProyecto = useSelector((state: any) => state?.app?.new_dashboard?.infoProyecto || {});
    const nombreProyecto = useSelector((state: any) => state?.app?.new_dashboard?.infoObra || []);
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [procesando, setProcesando] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => {
        setDataAnticipos([]);
        setDataDeductivas([]);
        setDataFondoGarantia([]);
        setDataEstimacionesProceso([]);
        setDataPendientesContabilizar([]);
        setIsAlertOpen(false)
    };
    const [valueTercero, setValueTercero] = useState(0);
    const handleChangeTercero = (event: any, newValue: any) => {
        setValueTercero(newValue);
    };


    const [isAlertOpenDetalleDetalle, setIsAlertOpenDetalleDetalle] = useState(false);
    const handleisAlertOpenDetalleDetalle = () => setIsAlertOpenDetalleDetalle(true);
    const handleisAlerCloseDetalleDetalle = () => {
        setDataFondoGarantiaDetalle([]);
        setDataPendienteContabilizarDetalle([]);
        setDataOene1Detalle([]);
        setDataOneClick([])
        setDataOneClickDataTipo('')
        setIsAlertOpenDetalleDetalle(false);
    };

    const [dataOneClick, setDataOneClick] = useState<any>([]);
    const [dataOneClickData, setDataOneClickData] = useState<any>([]);
    const [dataOneClickDataTipo, setDataOneClickDataTipo] = useState<any>('');
    const [dataEstimacionesProceso, setDataEstimacionesProceso] = useState([]);
    const [dataPendientesContabilizar, setDataPendientesContabilizar] = useState([]);
    const [dataFondoGarantia, setDataFondoGarantia] = useState([]);
    const [dataDeductivas, setDataDeductivas] = useState([]);
    const [dataAnticipos, setDataAnticipos] = useState([]);

    /* Resumen financiero*/
    const [totalAnticipo, setTotalAnticipo] = useState(0);
    const [amotizados, setAmortizados] = useState(0);
    const [totalEstimados, setTotalEstimados] = useState(0);
    const [deductivas, setDeductivas] = useState(0);
    const [fondoGarantia, setFondoGarantia] = useState(0);
    const [estimacionesProceso, setEstimacionesProceso] = useState(0);

    const [estimacionesContabilizados, setEstimacionesContabilizados] = useState(0);
    const [anticiposContabilizados, setAnticiposContabilizados] = useState(0);
    const [fondoGarantiaContabilizados, setFondoGarantiaContabilizados] = useState(0);

    const [dataFondoGarantiaDetalle, setDataFondoGarantiaDetalle] = useState([]);
    const [dataPendienteContabilizarDetalle, setDataPendienteContabilizarDetalle] = useState([]);
    const [dataOene1Detalle, setDataOene1Detalle] = useState([]);

    const [estimacionesPendienteContabilizar, setEstimacionesPendienteContabilizar] = useState(0);
    const [anticiposPendienteContabilizar, setAnticiposPendienteContabilizar] = useState(0);
    const [fondoGarantiaPendienteContabilizar, setFondoGarantiaPendienteContabilizar] = useState(0);

    const [estimacionesPendientePago, setEstimacionesPendientePago] = useState(0);
    const [anticiposPendientePago, setAnticiposPendientePago] = useState(0);
    const [fondoGarantiaPendientePago, setFondoGarantiaPendientePago] = useState(0);

    const [oene, setOene] = useState(0);

    /* TOTAL IMPORTE EN PESOS POR TIPO DE MONEDA */
    const [contratadoPesos, setContratadoPesos] = useState(0);
    const [contratadoDolares, setContratadoDolares] = useState(0);
    const [contratadoEuros, setContratadoEuros] = useState(0);

    const [estimadoPesos, setEstimadoPesos] = useState(0);
    const [estimadoDolares, setEstimadoDolares] = useState(0);
    const [estimadoEuros, setEstimadoEuros] = useState(0);
    const [dataChartAvanceTotal, setDataChartAvanceTotal] = useState<any>([]);

    moment.locale('es', {
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
        weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
        weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
        weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
    } as any
    );

    const creaDatosGrafica = useCallback(() => {
        setTotalAnticipo(props?.data?.total_anticipos);
        setAmortizados(props?.data?.total_amortizado);
        setTotalEstimados(props?.data?.total_estimado);
        setDeductivas(props?.data?.total_deductivas);
        setFondoGarantia(props?.data?.total_fondo_garantia);
        setEstimacionesProceso(props?.data?.estimaciones_proceso);

        setAnticiposContabilizados(props?.data?.contabilizado_anticipos);
        setEstimacionesContabilizados(props?.data?.contabilizado_estimaciones);
        setFondoGarantiaContabilizados(props?.data?.contabilizado_fondo_garantia);

        setAnticiposPendienteContabilizar(props?.data?.pendiente_contabilizar_anticipos);
        setEstimacionesPendienteContabilizar(props?.data?.pendiente_contabilizar_estimaciones);
        setFondoGarantiaPendienteContabilizar(props?.data?.pendiente_contabilizar_fondo_garantia);
        setAnticiposPendientePago(props?.data?.pendiente_pago_anticipos);
        setEstimacionesPendientePago(props?.data?.pendiente_pago_estimaciones);
        setFondoGarantiaPendientePago(props?.data?.pendiente_pago_fondo_garantia);
        setOene(props?.data?.oene_total);
        setContratadoPesos(props?.data?.total_contratado_pesos);
        setContratadoDolares(props?.data?.total_contratado_dolares);
        setContratadoEuros(props?.data?.total_contratado_euros);
        setEstimadoPesos(props?.data?.total_estimado_pesos);
        setEstimadoDolares(props?.data?.total_estimado_dolares);
        setEstimadoEuros(props?.data?.total_estimado_euros);
        setDataChartAvanceTotal([
            { labels: 'Programado ajustado', ['% Avance']: props?.data?.porcentaje_prog_ajustado },
            { labels: 'Programado', ['% Avance']: props?.data?.porcentaje_programado },
            { labels: 'Fisico', ['% Avance']: props?.data?.porcentaje_fisico },
            { labels: 'Financiero', ['% Avance']: props?.data?.porcentaje_financiero },
            { labels: 'Anticipo + financiero', ['% Avance']: props?.data?.porcentaje_anticipo_mas_financiero }
        ]);
    }, [props?.data]);

    useEffect(() => {
        creaDatosGrafica();
    }, [creaDatosGrafica])

    const handleOENE = async () => {
        try {
            setProcesando(true);
            const res: any = await getOENEHTTP(infoProyecto?.id_obra_principal, responsable);
            setDataOneClick(res?.results || []);
            handleisAlertOpen();
            setProcesando(false);
        } catch (err) {
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const handlePendientesContabilizar = async () => {
        try {
            setProcesando(true);
            const res: any = await getPendientesContabilizarResponsablesHTTP(responsable);
            setDataPendientesContabilizar(res?.results || []);
            handleisAlertOpen();
            setProcesando(false);
        } catch (err) {
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const hanndleEstimacionesProceso = async () => {
        try {
            setProcesando(true);
            const res: any = await getEstimacionesProcesoResponsablesHTTP(usuario);
            setDataEstimacionesProceso(res?.results || []);
            handleisAlertOpen();
            setProcesando(false);
        } catch (err) {
            setProcesando(false);
            handleisAlertOpen();
        }
    }
    const hanndleFondoGarantia = async () => {
        try {
            setProcesando(true);
            const res: any = await getFondoGarantiaResponsablesHTTP(usuario);
            setDataFondoGarantia(res?.results || []);
            handleisAlertOpen();
            setProcesando(false);
        } catch (err) {
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const handleAnticipos = async () => {
        try {
            setProcesando(true);
            const res: any = await getAnticiposResponsablesHTTP(responsable);
            setDataAnticipos(res?.results || []);
            handleisAlertOpen();
            setProcesando(false);
        } catch (err) {
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const handleClickDetalleFondoGarantia = async (row: any) => {
        try {
            setProcesando(true);
            const res = await getDetalleFondoGarantiaHTTP(row?.contrato);
            setDataFondoGarantiaDetalle(res?.results || []);
            handleisAlertOpenDetalleDetalle();
            setProcesando(false);
        } catch (err) {
            setProcesando(false);
            handleisAlertOpenDetalleDetalle();
        }
    }

    const handleClickDetallePendienteContabilizar = async (row: any) => {
        try {
            setProcesando(true);
            const res = await getDetallePendienteContabilizarHTTP(row?.contrato);
            setDataPendienteContabilizarDetalle(res?.results || []);
            handleisAlertOpenDetalleDetalle();
            setProcesando(false);
        } catch (err) {
            setProcesando(false);
            handleisAlertOpenDetalleDetalle();
        }
    }

    const handleClickTablasOene = async (row: any, dataOneClickDataTipo_: any) => {
        window.open(`http://201.132.19.132/dirac/controller/redirect.php?e=1&obra=${row?.contrato}&usuario=${usuario}`);
    }

    const handleClickTablasOeneNoResponsables = async (row: any, dataOneClickDataTipo_: any) => {
        try {
            setProcesando(true);
            const res = await getDetalleOENEHTTP(row?.contrato);
            setDataOene1Detalle(res?.results || []);
            handleisAlertOpenDetalleDetalle();
            setProcesando(false);
        } catch (err) {
            setProcesando(false);
            handleisAlertOpenDetalleDetalle();
        }
    }


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container spacing={2} style={{ marginTop: 20 }}>
                    <Grid item xs={12} style={{ paddingLeft: 50, paddingRight: 50 }}>
                        <Grid container spacing={2} style={{ borderBottom: darkMode ? 'solid 2px white' : 'solid 2px #28334a' }} >
                            <Grid item xs={6}><h3 style={{ color: darkMode ? 'white' : '#28334a', fontWeight: 'bold' }} className='inicio-new-dashboard-titulo'> {nombreProyecto?.obra || ''} </h3></Grid>
                            <Grid item xs={6} style={{ textAlign: 'right' }}><p style={{ color: darkMode ? 'white' : '#576e85' }} className='inicio-new-dashboard-sub-titulo'>{nombreProyecto?.descripcion || ''}</p></Grid>
                            <Divider variant="inset" />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ paddingLeft: 50, paddingRight: 50 }}>
                        <Grid container spacing={2} style={{ borderBottom: darkMode ? 'solid 2px white' : 'solid 2px #28334a' }}>
                            <Grid item xs={12}><h5 style={{ color: '#576e85' }} className='inicio-new-dashboard-sub-titulo'><strong>CONTRATOS VIGENTES.</strong> CONCETRADO DE INFORMACIÓN</h5></Grid>
                            <Divider variant="inset" />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Accordion style={{ backgroundColor: '#e9eef1', boxShadow: 'none', border: 'none' }} defaultExpanded>
                    <AccordionSummary
                        style={{ backgroundColor: '#576e85', color: 'white', fontWeight: 'bold', paddingLeft: 35, paddingRight: 50 }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <p className='inicio-new-dashboard-titulo-acordeon'>Resumen financiero</p>
                    </AccordionSummary>
                    <AccordionDetails style={{ backgroundColor: darkMode ? '#28334a' : '#e9eef1' }}>

                        <Grid container spacing={1} style={{ border: darkMode ? 'solid 2px white' : 'solid 2px #28334a', marginTop: 10, padding: 20 }}>
                            <Grid item md={4} sm={12} xl={4} xs={12} style={{ borderTop: 'solid 2px #1c75bc', marginTop: 20, cursor: 'pointer' }} onClick={() => { handleAnticipos() }} >
                                <Grid container>
                                    <Grid xs={12}> <h5 style={{ color: '#1c75bc' }} className='inicio-new-dashboard-sub-titulo'><strong>Total anticipos:</strong></h5> </Grid>
                                    <Grid xs={12}> <p style={{ color: '#1c75bc' }} className='inicio-new-dashboard-sub-titulo'>{numericFormatter(totalAnticipo + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })} ({numericFormatter(props?.data?.porcentaje_anticipo + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: '%' })}) </p> </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={4} sm={12} xl={4} xs={12} style={{ marginTop: 20 }}>
                                <Grid container>
                                    <Grid xs={12}> <h5 style={{ color: '#1c75bc' }} className='inicio-new-dashboard-sub-titulo'><strong>Amortizados:</strong></h5> </Grid>
                                    <Grid xs={12}> <p style={{ color: '#1c75bc' }} className='inicio-new-dashboard-sub-titulo'>{numericFormatter(amotizados + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })} </p> </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={4} sm={12} xl={4} xs={12} style={{ marginTop: 20 }}>
                                <Grid container>
                                    <Grid xs={12}> <h5 style={{ color: '#1c75bc' }} className='inicio-new-dashboard-sub-titulo'> <strong>Por amortizar:   </strong> </h5> </Grid>
                                    <Grid xs={12}> <p style={{ color: '#1c75bc' }} className='inicio-new-dashboard-sub-titulo'>{numericFormatter((+(totalAnticipo + '').replaceAll(',', '')) - (+(amotizados + '').replaceAll(',', '')) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p> </Grid>
                                </Grid>
                            </Grid>

                            <Grid item md={4} sm={12} xl={4} xs={12} style={{ borderTop: 'solid 2px rgb(28, 117, 188)' }}>
                                <Grid container>
                                    <Grid xs={12}> <h5 style={{ color: 'rgb(28, 117, 188)' }} className='inicio-new-dashboard-sub-titulo'><strong>Total estimados:</strong></h5> </Grid>
                                    <Grid xs={12}> <p style={{ color: 'rgb(28, 117, 188)' }} className='inicio-new-dashboard-sub-titulo'> {numericFormatter(totalEstimados + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })} </p> </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={4} sm={12} xl={4} xs={12}>
                                <Grid container>
                                    <Grid xs={12}> <h5 style={{ color: 'rgb(28, 117, 188)' }} className='inicio-new-dashboard-sub-titulo'> <strong>Deductivas:</strong> </h5> </Grid>
                                    <Grid xs={12}> <p style={{ color: 'rgb(28, 117, 188)' }} className='inicio-new-dashboard-sub-titulo'>{numericFormatter(deductivas + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p> </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={4} sm={12} xl={4} xs={12} style={{ cursor: 'pointer' }} onClick={() => { hanndleFondoGarantia() }}>
                                <Grid container>
                                    <Grid xs={12}> <h5 style={{ color: 'rgb(28, 117, 188)' }} className='inicio-new-dashboard-sub-titulo'> <strong>Fondo de garantia:</strong> </h5> </Grid>
                                    <Grid xs={12}> <p style={{ color: 'rgb(28, 117, 188)' }} className='inicio-new-dashboard-sub-titulo'>{numericFormatter(fondoGarantia + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p> </Grid>
                                </Grid>
                            </Grid>


                            <Grid item md={4} sm={12} xl={4} xs={12} style={{ borderTop: 'solid 2px #39b54a', cursor: 'pointer' }} onClick={() => { hanndleEstimacionesProceso() }}>
                                <Grid container>
                                    <Grid xs={12}> <h5 style={{ color: '#39b54a' }} className='inicio-new-dashboard-sub-titulo'> <strong>Estimaciones en proceso:</strong> </h5> </Grid>
                                    <Grid xs={12}> <p style={{ color: '#39b54a' }} className='inicio-new-dashboard-sub-titulo'>{numericFormatter(estimacionesProceso + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p> </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={8} sm={12} xl={8} xs={12} />

                            <Grid item md={4} sm={12} xl={4} xs={12} >
                                <Grid container>
                                    <Grid xs={12}> <h5 style={{ color: 'rgb(87, 110, 133)' }} className='inicio-new-dashboard-sub-titulo'> <strong>Contabilizados:</strong> </h5> </Grid>
                                    <Grid xs={12} style={{ borderBottom: 'solid 2px rgb(87, 110, 133)' }}> <p style={{ color: 'rgb(87, 110, 133)' }} className='inicio-new-dashboard-sub-titulo'>{numericFormatter((anticiposContabilizados + fondoGarantiaContabilizados + estimacionesContabilizados) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p> </Grid>
                                    <Grid xs={12}> <p style={{ color: 'rgb(87, 110, 133)' }} className='inicio-new-dashboard-sub-titulo'><strong>Estimaciones:</strong>  {numericFormatter((estimacionesContabilizados) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p> </Grid>
                                    <Grid xs={12}> <p style={{ color: 'rgb(87, 110, 133)' }} className='inicio-new-dashboard-sub-titulo'><strong>Anticipos:</strong>  {numericFormatter((anticiposContabilizados) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p> </Grid>
                                    <Grid xs={12}> <p style={{ color: 'rgb(87, 110, 133)' }} className='inicio-new-dashboard-sub-titulo'><strong>Fondo de garantia:</strong>  {numericFormatter((fondoGarantiaContabilizados) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p> </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={4} sm={12} xl={4} xs={12}>
                                <Grid container>
                                    <Grid xs={12} style={{ cursor: 'pointer' }} onClick={() => { handlePendientesContabilizar() }}> <h5 style={{ color: '#00a79d' }} className='inicio-new-dashboard-sub-titulo'><strong>Pendiente de contabilizar:</strong> </h5> </Grid>
                                    <Grid xs={12} style={{ borderBottom: 'solid 2px #00a79d' }}> <p style={{ color: '#00a79d' }} className='inicio-new-dashboard-sub-titulo'>{numericFormatter((estimacionesPendienteContabilizar + anticiposPendienteContabilizar + fondoGarantiaPendienteContabilizar) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p> </Grid>
                                    <Grid xs={12}> <p style={{ color: '#00a79d' }} className='inicio-new-dashboard-sub-titulo'><strong>Estimaciones:</strong>{numericFormatter((estimacionesPendienteContabilizar) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p> </Grid>
                                    <Grid xs={12}> <p style={{ color: '#00a79d' }} className='inicio-new-dashboard-sub-titulo'> <strong>Anticipos:</strong> {numericFormatter((anticiposPendienteContabilizar) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p> </Grid>
                                    <Grid xs={12}> <p style={{ color: '#00a79d' }} className='inicio-new-dashboard-sub-titulo'> <strong>Fondo de garantia:</strong> {numericFormatter((fondoGarantiaPendienteContabilizar) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p> </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={4} sm={12} xl={4} xs={12} >
                                <Grid container>
                                    <Grid xs={12}> <h5 style={{ color: '#576e85' }} className='inicio-new-dashboard-sub-titulo'><strong>Pendiente de pago:</strong> </h5> </Grid>
                                    <Grid xs={12} style={{ borderBottom: 'solid 2px #576e85' }}> <p style={{ color: '#576e85' }} className='inicio-new-dashboard-sub-titulo'>{numericFormatter((estimacionesPendientePago + anticiposPendientePago + fondoGarantiaPendientePago) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p> </Grid>
                                    <Grid xs={12}> <p style={{ color: '#576e85' }} className='inicio-new-dashboard-sub-titulo'> <strong>Estimaciones:</strong> {numericFormatter((estimacionesPendientePago) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p> </Grid>
                                    <Grid xs={12}> <p style={{ color: '#576e85' }} className='inicio-new-dashboard-sub-titulo'> <strong>Anticipos:</strong> {numericFormatter((anticiposPendientePago) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p> </Grid>
                                    <Grid xs={12}> <p style={{ color: '#576e85' }} className='inicio-new-dashboard-sub-titulo'><strong>Fondo de garantia:</strong>{numericFormatter((fondoGarantiaPendientePago) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p></Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12} sm={12} xl={12} xs={12} style={{ borderTop: darkMode ? 'solid 2px white' : 'solid 2px #28334a' }}>
                                <Grid container>
                                    <Grid item md={6} sm={12} xl={6} xs={12}>
                                        <h5 style={{ color: darkMode ? 'white' : '#28334a' }} className='inicio-new-dashboard-sub-titulo'><strong>Total de pedidos:</strong>{numericFormatter(props?.data?.total_pedidos + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</h5>
                                    </Grid>
                                    <Grid item md={6} sm={12} xl={6} xs={12} style={{ cursor: 'pointer' }} onClick={() => { handleOENE() }}>
                                        <h5 style={{ color: darkMode ? 'white' : '#28334a' }} className='inicio-new-dashboard-sub-titulo'><strong>OENE (INFORMATIVO):</strong>{numericFormatter((oene) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</h5>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>


                <Accordion style={{ backgroundColor: '#e9eef1', boxShadow: 'none', border: 'none' }}>
                    <AccordionSummary
                        style={{ backgroundColor: '#576e85', color: 'white', fontWeight: 'bold', paddingLeft: 35, paddingRight: 50 }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                    >
                        <p className='inicio-new-dashboard-titulo-acordeon'>Avance total <small>[proyecto]</small> </p>
                    </AccordionSummary>
                    <AccordionDetails style={{ backgroundColor: darkMode ? '#28334a' : '#e9eef1' }}>
                        <Grid container spacing={1} style={{ border: darkMode ? 'solid 2px white' : 'solid 2px #28334a', marginTop: 10, padding: 20 }}>
                            <Grid item md={12} sm={12} xl={12} xs={12}>
                                <p className='inicio-new-dashboard-sub-titulo' style={{ color: 'rgb(87, 110, 133)' }}><strong>% Avance programado ajustado {numericFormatter((props?.data?.porcentaje_prog_ajustado || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: '%' })}</strong> <Progreso avance={props?.data?.porcentaje_prog_ajustado} color='rgb(143 177 197)' /> </p>
                                <p className='inicio-new-dashboard-sub-titulo' style={{ color: 'rgb(87, 110, 133)' }}><strong>% Avance Programado {numericFormatter((props?.data?.porcentaje_programado || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: '%' })}</strong> <Progreso avance={props?.data?.porcentaje_programado} color='rgb(128 158 175)' /></p>
                                <p className='inicio-new-dashboard-sub-titulo' style={{ color: 'rgb(87, 110, 133)' }}><strong>% Avance Fisico {numericFormatter((props?.data?.porcentaje_fisico || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: '%' })}</strong> <Progreso avance={props?.data?.porcentaje_fisico} color='rgb(74 152 185)' /></p>
                                <p className='inicio-new-dashboard-sub-titulo' style={{ color: 'rgb(87, 110, 133)' }}><strong>% Avance financiero {numericFormatter((props?.data?.porcentaje_financiero || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: '%' })}</strong> <Progreso avance={props?.data?.porcentaje_financiero} color='rgb(87 149 122)' /></p>
                                <p className='inicio-new-dashboard-sub-titulo' style={{ color: 'rgb(87, 110, 133)' }}><strong>% Avance anticipo + financiero {numericFormatter((props?.data?.porcentaje_anticipo_mas_financiero || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: '%' })}</strong> <Progreso avance={props?.data?.porcentaje_anticipo_mas_financiero} color='#00a79d' /></p>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>

                <Accordion style={{ backgroundColor: '#e9eef1', boxShadow: 'none', border: 'none' }}>
                    <AccordionSummary
                        style={{ backgroundColor: '#576e85', color: 'white', fontWeight: 'bold', paddingLeft: 35, paddingRight: 50 }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                    >
                        <p className='inicio-new-dashboard-titulo-acordeon'>Contratos </p>
                    </AccordionSummary>
                    <AccordionDetails style={{ backgroundColor: darkMode ? '#28334a' : '#e9eef1' }}>
                        <Grid container spacing={1} style={{ border: darkMode ? 'solid 2px white' : 'solid 2px #28334a', marginTop: 10, padding: 20 }}>
                            <Grid item md={12} sm={12} xl={12} xs={12} style={{ marginTop: 20 }}>
                                <Card>
                                    <CardContent>
                                        {(props?.data?.proyectos || [])?.length ? <DinamicTable
                                            key={'Carpetas'}
                                            noOrdenaColumnas
                                            sinFiltro
                                            actions
                                            enAccion={(accion, row) => {
                                                if (accion === 'ir_apm') {
                                                    window.open(`http://201.132.19.132/dirac/controller/redirect.php?e=1&obra=${row?.id_contrato}&usuario=${usuario}`);
                                                }
                                                if (accion === 'detalle') {
                                                    alert('detalle');
                                                }
                                            }}
                                            esAvanceConGrafica
                                            columnsToShow={['contrato']}
                                            data={
                                                (props?.data?.proyectos || []).map((r: any) => {
                                                    const estatus_o = +r?.terminado;
                                                    let color = "";
                                                    let forma = "";
                                                    let msg = "";
                                                    if (estatus_o === 0) {
                                                        color = "aqua";
                                                        msg = "Contrato vigente";
                                                        forma = "info";
                                                    } else if (estatus_o === 1) {
                                                        color = "success";
                                                        msg = "Contrato terminado";
                                                        forma = "check";
                                                    } else if (estatus_o === 2) {
                                                        color = "danger";
                                                        msg = "Contrato rescindido";
                                                        forma = "ban";
                                                    } else {
                                                        color = "warning";
                                                        msg = "Cierre administrativo";
                                                        forma = "ban";
                                                    }
                                                    return {
                                                        contrato: r?.contratista + '- ' + r?.id_contrato,
                                                        detalle: {
                                                            contratista: r?.contratista,
                                                            id_contrato: r?.id_contrato,
                                                            obra: r?.obra,
                                                            nombre: r?.nombre,
                                                            importe: r?.importe,
                                                            color,
                                                            msg,
                                                            forma
                                                        },
                                                        data: {
                                                            porcentaje_prog_ajustado: r?.porcentaje_prog_cliente || 0,
                                                            porcentaje_programado: r?.porcentaje_prog || 0,
                                                            porcentaje_fisico: r?.porcentaje_fisico || 0,
                                                            porcentaje_financiero: r?.porcentaje || 0,
                                                            porcentaje_anticipo_mas_financiero: r?.porcentaje_anticipo
                                                        }
                                                        /* data: [
                                                                {labels:'Programado ajustado',['% Avance']:r?.porcentaje_prog_cliente || 0 } ,
                                                                {labels:'Programado',['% Avance']:r?.porcentaje_prog || 0 }, 
                                                                {labels:'Fisico',['% Avance']: r?.porcentaje_fisico || 0 },
                                                                {labels:'Financiero',['% Avance']:r?.porcentaje || 0 },
                                                                {labels:'Anticipo + financiero',['% Avance']:r?.porcentaje_anticipo || 0 }
                                                        ]  */
                                                    }
                                                })

                                            }
                                        /> : 'Sin resultados'}
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>


                <Accordion style={{ backgroundColor: '#e9eef1', boxShadow: 'none', border: 'none' }}>
                    <AccordionSummary
                        style={{ backgroundColor: '#576e85', color: 'white', fontWeight: 'bold', paddingLeft: 35, paddingRight: 50 }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                    >
                        <p className='inicio-new-dashboard-titulo-acordeon'>Total de importe en pesos por tipo de moneda</p>
                    </AccordionSummary>
                    <AccordionDetails style={{ backgroundColor: darkMode ? '#28334a' : '#e9eef1' }}>
                        <Grid container spacing={1} style={{ border: darkMode ? 'solid 2px white' : 'solid 2px #28334a', marginTop: 10, padding: 20 }}>
                            <Grid item md={4} sm={12} xl={4} xs={12} style={{ borderTop: 'solid 2px #00a79d', marginTop: 20 }}>
                                <Grid container>
                                    <Grid xs={12}> <h5 style={{ color: '#00a79d' }} className='inicio-new-dashboard-sub-titulo'> <strong>Contratado Pesos:</strong> </h5> </Grid>
                                    <Grid xs={12}> <p style={{ color: '#00a79d' }} className='inicio-new-dashboard-sub-titulo'>{numericFormatter((contratadoPesos) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })} </p> </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={4} sm={12} xl={4} xs={12} style={{ marginTop: 20 }}>
                                <Grid container>
                                    <Grid xs={12}> <h5 style={{ color: 'rgb(87 149 122)' }} className='inicio-new-dashboard-sub-titulo'><strong>Contratado Dolares:</strong> </h5> </Grid>
                                    <Grid xs={12}> <p style={{ color: 'rgb(87 149 122)' }} className='inicio-new-dashboard-sub-titulo'>{numericFormatter((contratadoDolares) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })} </p> </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={4} sm={12} xl={4} xs={12} style={{ marginTop: 20 }}>
                                <Grid container>
                                    <Grid xs={12}> <h5 style={{ color: '#1c75bc' }} className='inicio-new-dashboard-sub-titulo'> <strong>Contatado Euros:</strong> </h5> </Grid>
                                    <Grid xs={12}> <p style={{ color: '#1c75bc' }} className='inicio-new-dashboard-sub-titulo'>{numericFormatter((contratadoEuros) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p> </Grid>
                                </Grid>
                            </Grid>

                            <Grid item md={4} sm={12} xl={4} xs={12} style={{ borderTop: 'solid 2px #00a79d' }}>
                                <Grid container>
                                    <Grid xs={12}> <h5 style={{ color: '#00a79d' }} className='inicio-new-dashboard-sub-titulo'> <strong>Estimado Pesos:</strong> </h5> </Grid>
                                    <Grid xs={12}> <p style={{ color: '#00a79d' }} className='inicio-new-dashboard-sub-titulo'>{numericFormatter((estimadoPesos) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p> </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={4} sm={12} xl={4} xs={12} style={{}}>
                                <Grid container>
                                    <Grid xs={12}> <h5 style={{ color: 'rgb(87 149 122)' }} className='inicio-new-dashboard-sub-titulo'> <strong>Estimado Dolares:</strong> </h5> </Grid>
                                    <Grid xs={12}> <p style={{ color: 'rgb(87 149 122)' }} className='inicio-new-dashboard-sub-titulo'>{numericFormatter((estimadoDolares) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p> </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={4} sm={12} xl={4} xs={12} style={{}}>
                                <Grid container>
                                    <Grid xs={12}> <h5 style={{ color: '#1c75bc' }} className='inicio-new-dashboard-sub-titulo'> <strong>Estimado Euros:</strong> </h5> </Grid>
                                    <Grid xs={12}> <p style={{ color: '#1c75bc' }} className='inicio-new-dashboard-sub-titulo'>{numericFormatter((estimadoEuros) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p> </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>

            </Grid>

            <Backdrop style={{ zIndex: 10, color: "#fff", }} open={procesando}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <ModalComponent handleClose={handleisAlerClose} isOpen={isAlertOpen} key={'alerta'} esFullScreen>
                <Grid container spacing={2} >



                    {dataAnticipos?.length ? <Grid item xs={12}>
                        <DinamicTableMejorada
                            flex
                            key={'anticipos'}
                            data={dataAnticipos.map((r: any) => {
                                return {
                                    contratista: r?.contratista,
                                    contrato: r?.contrato,
                                    importe: numericFormatter((r?.importe || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),

                                }
                            })}
                        />
                    </Grid> : null}
                    {dataFondoGarantia?.length ? <Grid item xs={12}>
                        <DinamicTableMejorada
                            flex
                            key={'anticipos'}
                            verDetalleNewDashbaord
                            actions
                            enAccion={(action, row) => {
                                if (action === 'ver_detalle') {
                                    handleClickDetalleFondoGarantia(row)
                                }
                            }}
                            data={dataFondoGarantia.map((r: any) => {
                                return {
                                    contrato: r?.contrato,
                                    contratista: r?.contratista,

                                    importe_contratado: numericFormatter((r?.importe_contratado || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                    fondo_garantia: numericFormatter((r?.fondo_garantia || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),

                                }
                            })}
                        />
                    </Grid> : null}


                    {dataEstimacionesProceso?.length ? <Grid item xs={12}>
                        <DinamicTableMejorada
                            flex
                            key={'estimaciones_proceso|'}
                            data={dataEstimacionesProceso.map((r: any) => {
                                return {
                                    contrato: r?.contrato,
                                    contratista: r?.contratista,
                                    numero_estimacion: r?.estimacion,
                                    importe: numericFormatter((r?.importe || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                    estatus: r?.estatus,

                                }
                            })}
                        />
                    </Grid> : null}

                    {dataPendientesContabilizar?.length ? <Grid item xs={12}>
                        <DinamicTableMejorada
                            flex
                            verDetalleNewDashbaord
                            actions
                            enAccion={(action, row) => {
                                if (action === 'ver_detalle') {
                                    handleClickDetallePendienteContabilizar(row);
                                }
                            }}
                            key={'pendientes_contabilizar'}
                            columnsToShow={[
                                'contrato',
                                'contratista',
                                'importe',
                                'pendiente_contabilizar'
                            ]}
                            esPendienteContabilizar
                            data={dataPendientesContabilizar.map((r: any) => {
                                return {
                                    contrato: r?.contrato,
                                    contratista: r?.contratista,
                                    importe: numericFormatter((r?.importe || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                    pendiente_contabilizar_data: r?.pendiente_contabilizar,
                                    pendiente_contabilizar: '-'
                                }
                            })}
                        />
                    </Grid> : null}


                    {dataOneClick?.responsables ?
                        <Grid item xs={12}>
                            <Grid container >
                                <Grid item xs={4} style={{ textAlign: 'center' }}>
                                    <p><strong>Contratos con OENE</strong></p>
                                    <p>{dataOneClick?.contratos_con_one?.datadato}</p>
                                    <p style={{ cursor: 'pointer' }} onClick={() => {
                                        setProcesando(true)
                                        setDataOneClickData(dataOneClick?.contratos_con_one?.data);
                                        setDataOneClickDataTipo('contratos_con_one');
                                        setTimeout(() => setProcesando(false), 1000)
                                    }}><small>Ver detalle</small></p>
                                </Grid>
                                <Grid item xs={4} style={{ textAlign: 'center' }}>
                                    <p><strong>Avance ejecutado 2+semanas</strong></p>
                                    <p>{dataOneClick?.avance_ejecutado_2_semanas?.datadato}</p>
                                    <p style={{ cursor: 'pointer' }} onClick={() => {
                                        setProcesando(true)
                                        setDataOneClickData(dataOneClick?.avance_ejecutado_2_semanas?.data)
                                        setDataOneClickDataTipo('avance_ejecutado_2_semanas');
                                        setTimeout(() => setProcesando(false), 1000)
                                    }}><small>Ver detalle</small></p>
                                </Grid>
                                <Grid item xs={4} style={{ textAlign: 'center' }}>
                                    <p><strong>OENE por responsables</strong></p>
                                    <p style={{ cursor: 'pointer' }} onClick={() => {
                                        setProcesando(true)
                                        setDataOneClickData(dataOneClick?.responsables?.data);
                                        setDataOneClickDataTipo('responsables');
                                        setTimeout(() => setProcesando(false), 1000)
                                    }}><small>Ver detalle</small></p>
                                </Grid>
                                <Grid item xs={4} style={{ textAlign: 'center' }}>
                                    <p><strong>OENE pendiente confirmación</strong></p>
                                    <p>{dataOneClick?.oene_pendiente_confirmacion?.datadato}</p>
                                    <p style={{ cursor: 'pointer' }} onClick={() => {
                                        setProcesando(true);
                                        setDataOneClickData(dataOneClick?.oene_pendiente_confirmacion?.data);
                                        setDataOneClickDataTipo('oene_pendiente_confirmacion');
                                        setTimeout(() => setProcesando(false), 1000)
                                    }}><small>Ver detalle</small></p>
                                </Grid>
                                <Grid item xs={4} style={{ textAlign: 'center' }}>
                                    <p><strong>OENE pendiente documentación</strong></p>
                                    <p>{dataOneClick?.oene_pendiente_documentacion?.datadato}</p>
                                    <p style={{ cursor: 'pointer' }} onClick={() => {
                                        setProcesando(true);
                                        setDataOneClickData(dataOneClick?.oene_pendiente_documentacion?.data);
                                        setDataOneClickDataTipo('oene_pendiente_documentacion');
                                        setTimeout(() => setProcesando(false), 1000)
                                    }}><small>Ver detalle</small></p>
                                </Grid>
                                <Grid item xs={4} style={{ textAlign: 'center' }}>
                                    <p><strong>OENE confirmada pendiente de documentación</strong></p>
                                    <p>{dataOneClick?.oene_confirmada_pendiente_documentacion?.datadato}</p>
                                    <p style={{ cursor: 'pointer' }} onClick={() => {
                                        setProcesando(true)
                                        setDataOneClickData(dataOneClick?.oene_confirmada_pendiente_documentacion?.data);
                                        setDataOneClickDataTipo('oene_confirmada_pendiente_documentacion');
                                        setTimeout(() => setProcesando(false), 1000)
                                    }}><small>Ver detalle</small></p>
                                </Grid>
                            </Grid>
                            {dataOneClickDataTipo !== '' && dataOneClickDataTipo !== 'responsables' ? <Grid item xs={12} style={{ textAlign: 'center' }}>


                                {dataOneClick?.[dataOneClickDataTipo]?.data?.length && !procesando ?
                                    <DinamicTableMejorada
                                        flex
                                        verDetalleNewDashbaord
                                        actions={dataOneClickDataTipo === 'contratos_con_one' || dataOneClickDataTipo === 'oene_confirmada_pendiente_documentacion' || dataOneClickDataTipo === 'oene_pendiente_confirmacion' || dataOneClickDataTipo === 'oene_pendiente_documentacion'}
                                        enAccion={(action, row) => {
                                            if (action === 'ver_detalle' && (dataOneClickDataTipo === 'contratos_con_one' || dataOneClickDataTipo === 'oene_confirmada_pendiente_documentacion' || dataOneClickDataTipo === 'oene_pendiente_confirmacion' || dataOneClickDataTipo === 'oene_pendiente_documentacion')) {
                                                handleClickTablasOeneNoResponsables(row, dataOneClickDataTipo);
                                            }
                                        }}
                                        data={dataOneClick?.[dataOneClickDataTipo]?.data || []} /> : null}


                            </Grid> : procesando ? <CircularProgress color="inherit" /> : null}


                            {dataOneClickDataTipo !== '' && dataOneClickDataTipo === 'responsables' ?
                                <Grid item xs={12} style={{ textAlign: 'center' }}>
                                    <Box sx={{ width: '100%' }}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <Tabs value={valueTercero} onChange={handleChangeTercero} aria-label="basic tabs example">
                                                {
                                                    Object.keys(dataOneClick?.[dataOneClickDataTipo]?.data).map((r: any, key: any) => {
                                                        return (<Tab label={r} key={r + '_t3'} {...a11yProps(key)} />);
                                                    })
                                                }
                                            </Tabs>
                                        </Box>
                                        {
                                            Object.keys(dataOneClick?.[dataOneClickDataTipo]?.data).map((r: any, key: any) => {
                                                return (
                                                    <>
                                                        <CustomTabPanel value={valueTercero} index={key} key={r?.id_empleado + '_t3.1'}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12}> {r?.nombre} </Grid>
                                                                <Grid item xs={12}>
                                                                    {
                                                                        dataOneClick?.[dataOneClickDataTipo]?.data[r]?.length && !procesando ?
                                                                            <DinamicTableMejorada
                                                                                flex
                                                                                verDetalleNewDashbaord
                                                                                actions
                                                                                enAccion={(action, row) => {
                                                                                    if (action === 'ver_detalle') {
                                                                                        handleClickTablasOene(row, dataOneClickDataTipo);
                                                                                    }
                                                                                }}
                                                                                data={dataOneClick?.[dataOneClickDataTipo]?.data[r]}

                                                                            /> : procesando ? <CircularProgress color="inherit" /> : null
                                                                    }
                                                                </Grid>
                                                            </Grid>
                                                        </CustomTabPanel>
                                                    </>
                                                );
                                            })
                                        }
                                    </Box>
                                </Grid> : procesando ? <CircularProgress color="inherit" /> : null}


                        </Grid>
                        : null}

                </Grid>
            </ModalComponent>

            <ModalComponent handleClose={handleisAlerCloseDetalleDetalle} isOpen={isAlertOpenDetalleDetalle} key={'alerta'} size={'xl'}>
                <Grid container spacing={2} >



                    {dataFondoGarantiaDetalle?.length ? <Grid item xs={12}>
                        <DinamicTableMejorada
                            flex
                            key={'reclasificaciones'}
                            titulo={'Estimaciones con deductivas'}
                            data={dataFondoGarantiaDetalle.map((r: any) => {
                                return {
                                    contrato: r?.proyecto,
                                    contratista: r?.contratista,
                                    numero_estimacion: r?.numero_estimacion,
                                    importe: numericFormatter((r?.importe || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                    deductiva: numericFormatter((r?.total_deducciones || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })
                                }
                            })}
                        />
                    </Grid> : null}

                    {dataPendienteContabilizarDetalle?.length ? <Grid item xs={12}>
                        <DinamicTableMejorada
                            flex
                            key={'reclasificaciones'}
                            titulo={'Estimaciones con deductivas'}
                            data={dataPendienteContabilizarDetalle.map((r: any) => {
                                return {
                                    contrato: r?.proyecto,
                                    contratista: r?.contratista,
                                    numero_estimacion: r?.numero_estimacion,
                                    importe: numericFormatter((r?.importe || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })

                                }
                            })}
                        />
                    </Grid> : null}


                    {dataOene1Detalle?.length ? <Grid item xs={12}>
                        <DinamicTableMejorada
                            flex
                            esDetalleOeneUno
                            key={'reclasificaciones'}
                            titulo={'Estimaciones con deductivas'}
                            columnsToShow={[
                                'conceptos',
                                'oene',
                                'avances'
                            ]}
                            data={dataOene1Detalle.map((r: any) => {
                                return {
                                    conceptos: r?.id_concepto + ' - ' + r?.descripcion,
                                    oene: numericFormatter((r?.oene || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                    avances: r?.avances
                                }
                            })}
                        />
                    </Grid> : null}






                </Grid>
            </ModalComponent>


        </Grid>
    )
}


export default InicioNewDashboardResponsables;