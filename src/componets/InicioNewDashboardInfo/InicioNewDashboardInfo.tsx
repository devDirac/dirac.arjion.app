import { Avatar, Divider, Grid, Card, CardContent, CircularProgress, Backdrop, Box, Tab, Tabs, Alert } from '@mui/material'
import * as am5 from "@amcharts/amcharts5";
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import iconoIrAPM from "../../assets/images/Iconos_APM/fondo_transparente/iconos_08_apm.png";
import CampoChart from '../CampoChart/index';
import { useMaterialUIController } from 'context';
import { InicioNewDashboardInfoProps } from './types';
import { numericFormatter } from 'react-number-format';
import { useDispatch, useSelector } from "react-redux";
import './style.scss'
import moment from 'moment';
import DinamicTable from '../../componets/DinamicTable/index'
import DinamicTableMejorada from '../../componets/DinamicTableMejorada/DinamicTableMejorada'
import SeleccionFrenteDashboardForm from '../../componets/SeleccionFrenteDashboardForm/SeleccionFrenteDashboardForm'
import Progreso from '../Progreso/index';
import ModalComponent from '../Modal/index';
import { agruparPor } from '../../utils/index'
import {
    reclasificacionesHTP,
    getOrdenCompraHTTP,
    getAhorroHTTP,
    getAnticiposHTTP,
    getDeductivasHTTP,
    getFondoGarantiaHTTP,
    getEstimacionesProcesoHTTP,
    getPendientesContabilizarHTTP,
    getOENEHTTP,
    getDetalleDeductivasHTTP,
    getDetalleFondoGarantiaHTTP,
    getDetallePendienteContabilizarHTTP,
    getDetalleOENEHTTP
} from '../../actions/newDashboardInfo';
import _ from 'lodash';
import HorizontalPartitionChart from '../../componets/Amcharts/Amcharts';
import AmchartsOENE from '../../componets/Amcharts/AmchartsOENE';
import TestChart from '../../componets/Amcharts/TestChart';

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

const InicioNewDashboardInfo: React.FC<InicioNewDashboardInfoProps> = (props: InicioNewDashboardInfoProps) => {
    const navigate = useNavigate();
    const [queryParameters] = useSearchParams();
    const contratosFiltro = useSelector((state: any) => state?.app?.new_dashboard?.filtros_contratos?.contrato || []);
    const usuario = useSelector((state: any) => state?.app?.user?.data?.id || null);
    const contrato = useSelector((state: any) => state?.app?.espacio || null);
    const infoProyecto = useSelector((state: any) => state?.app?.new_dashboard?.infoProyecto || {});
    const nombreProyecto = useSelector((state: any) => state?.app?.new_dashboard?.infoObra || []);
    const [gruposConceptosFueraCatalogo, setGruposConceptosFueraCatalogo] = useState(null);
    const [gruposClasificacionObra, setGruposClasificacionObra] = useState(null);
    const [gruposEstimacionesEstatus, setGruposEstimacionesEstatus] = useState(null);
    const [tipoErogacion, setTipoErogacion] = useState('programa_general_de_obra');
    const [acumuladoErogacionesFrente, setAcumuladoErogacionesFrente] = useState(0);

    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    /* Ejecución del presupuesto */
    const [procesando, setProcesando] = useState(false);
    const [isAlertOpenDetalleDetalle, setIsAlertOpenDetalleDetalle] = useState(false);
    const handleisAlertOpenDetalleDetalle = () => setIsAlertOpenDetalleDetalle(true);
    const handleisAlerCloseDetalleDetalle = () => {
        setDataDeductivasDetalle([]);
        setDataFondoGarantiaDetalle([]);
        setDataPendienteContabilizarDetalle([]);
        setDataOene1Detalle([]);
        setIsAlertOpenDetalleDetalle(false);
    };
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => {
        setDataReclasificaciones([]);
        setDataOrdenCompra([]);
        setDataAhorro([]);
        setDataAnticipos([]);
        setDataDeductivas([]);
        setDataFondoGarantia([]);
        setDataEstimacionesProceso([]);
        setDataPendientesContabilizar([]);
        setDataOneClick([])
        setDataOneClickDataTipo('')
        setIsAlertOpen(false);
    };

    const [isAlertOpenDetalleOne, setIsAlertOpenDetalleOne] = useState(false);
    const handleisAlertOpenDetalleOne = () => setIsAlertOpenDetalleOne(true);
    const handleisAlerCloseDetalleOne = () => {
        setIsAlertOpenDetalleOne(false);
        setDataOneClickData([]);
        setDataOneClickDataTipo('');
    };



    const [valueTercero, setValueTercero] = useState(0);
    const handleChangeTercero = (event: any, newValue: any) => {
        setValueTercero(newValue);
    };
    const [dataOneClick, setDataOneClick] = useState<any>([]);
    const [dataOneClickData, setDataOneClickData] = useState<any>([]);
    const [dataOneClickDataTipo, setDataOneClickDataTipo] = useState<any>('');
    const [dataEstimacionesProceso, setDataEstimacionesProceso] = useState([]);
    const [dataPendientesContabilizar, setDataPendientesContabilizar] = useState([]);
    const [dataFondoGarantia, setDataFondoGarantia] = useState([]);
    const [dataDeductivas, setDataDeductivas] = useState([]);
    const [dataDeductivasDetalle, setDataDeductivasDetalle] = useState([]);
    const [dataFondoGarantiaDetalle, setDataFondoGarantiaDetalle] = useState([]);
    const [dataPendienteContabilizarDetalle, setDataPendienteContabilizarDetalle] = useState([]);
    const [dataOene1Detalle, setDataOene1Detalle] = useState([]);
    const [dataAnticipos, setDataAnticipos] = useState([]);
    const [dataAhorro, setDataAhorro] = useState([]);
    const [dataReclasificaciones, setDataReclasificaciones] = useState([]);
    const [dataOrdenCompra, setDataOrdenCompra] = useState([]);
    const [totalContratado, setTotalContratado] = useState(0);
    const [reclasificacion, setReclasificacion] = useState(0);
    const [ordenesCompra, setOrdenesCompra] = useState(0);
    const [totalAnticipo, setTotalAnticipo] = useState(0);
    const [amotizados, setAmortizados] = useState(0);
    const [totalEstimados, setTotalEstimados] = useState(0);
    const [deductivas, setDeductivas] = useState(0);
    const [fondoGarantia, setFondoGarantia] = useState(0);
    const [estimacionesProceso, setEstimacionesProceso] = useState(0);
    const [estimacionesContabilizados, setEstimacionesContabilizados] = useState(0);
    const [anticiposContabilizados, setAnticiposContabilizados] = useState(0);
    const [fondoGarantiaContabilizados, setFondoGarantiaContabilizados] = useState(0);
    const [estimacionesPendienteContabilizar, setEstimacionesPendienteContabilizar] = useState(0);
    const [anticiposPendienteContabilizar, setAnticiposPendienteContabilizar] = useState(0);
    const [fondoGarantiaPendienteContabilizar, setFondoGarantiaPendienteContabilizar] = useState(0);
    const [estimacionesPendientePago, setEstimacionesPendientePago] = useState(0);
    const [anticiposPendientePago, setAnticiposPendientePago] = useState(0);
    const [fondoGarantiaPendientePago, setFondoGarantiaPendientePago] = useState(0);
    const [oene, setOene] = useState(0);
    const [contratadoPesos, setContratadoPesos] = useState(0);
    const [contratadoDolares, setContratadoDolares] = useState(0);
    const [contratadoEuros, setContratadoEuros] = useState(0);
    const [estimadoPesos, setEstimadoPesos] = useState(0);
    const [estimadoDolares, setEstimadoDolares] = useState(0);
    const [estimadoEuros, setEstimadoEuros] = useState(0);

    const [tituloTabla, setTituloTabla] = useState('');
    const [dataDetalleDashboardContratos, setDataDetalleDashboardContratos] = useState([]);
    const [isAlertOpenDashboardContratos, setIsAlertOpenDashboardContratos] = useState(false);
    const handleisAlertOpenDashboardContratos = () => setIsAlertOpenDashboardContratos(true);
    const handleisAlerCloseDashboardContratos = () => {
        setDataDetalleDashboardContratos([]);
        setIsAlertOpenDashboardContratos(false);
    };

    moment.locale('es', {
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
        weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
        weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
        weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
    } as any);

    const creaDatosGrafica = useCallback(() => {
        setTotalContratado(props?.data?.total_contratados);
        setReclasificacion(props?.data?.reclasificaciones);
        setOrdenesCompra(props?.data?.ordenes_compra);
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

        const resConceptosFueraCatalogo = agruparPor(props?.data?.conceptosFueraCatalogo || [], 'tipo_concepto_desc');
        const keys = Object.keys(resConceptosFueraCatalogo);
        const datos: any = [];
        keys.forEach((r: any, key) => {
            datos.push({
                status: r,
                data: resConceptosFueraCatalogo?.[r]
            })
        });
        setGruposConceptosFueraCatalogo(datos);


        const resClasificacionObra = agruparPor(props?.data?.clasificacionesDeObra || [], 'nombre_clasificacion');
        const keysClasificacion = Object.keys(resClasificacionObra);
        const datosClasificacion: any = [];
        keysClasificacion.forEach((r: any, key) => {
            datosClasificacion.push({
                status: r,
                data: resClasificacionObra?.[r]
            })
        });
        setGruposClasificacionObra(datosClasificacion);

        const estimaciones_ = agruparPor(props?.data?.estimacionesDashboard || [], 'evento');
        const keys_ = Object.keys(estimaciones_);
        const datos_: any = [];
        keys_.forEach((r: any, key) => {
            datos_.push({
                status: r,
                data: estimaciones_?.[r]
            })
        });
        setGruposEstimacionesEstatus(datos_);
    }, [props?.data]);

    useEffect(() => {
        creaDatosGrafica();
    }, [creaDatosGrafica]);

    function removeChildrenWithZeroValue(nodes: any) {
        return nodes.map((node: any) => {
            if (node.children) {
                node.children = removeChildrenWithZeroValue(node.children.filter((child: any) => child.value !== 0 && (child?.keys === 4 || child?.keys === 5 ? child?.documentos_calidad_contratos?.length || child?.documentos_calidad_contratos_concepto?.length : true)));
            }
            return node;
        });
    }




    const handleOENE = async () => {
        try {
            setProcesando(true);
            const res = await getOENEHTTP(contrato?.id, props?.usuario, contratosFiltro.toString());
            const sumaOneRoot = (res?.results?.contratos_con_one?.data || []).reduce((a: any, c: any) => a + (+c?.oene), 0,);
            const oneFinal = [
                {
                    name: "OENE (" + numericFormatter((sumaOneRoot || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }) + ") ",
                    value: (res?.results?.contratos_con_one?.data || [])?.length,
                    fill: am5.color(0x33ff57), // Verde
                }
            ]
            const nuevo = oneFinal.map((r: any) => {
                return {
                    ...r,
                    ...{
                        children: (res?.results?.contratos_con_one?.data || []).map((w: any) => {
                            return {
                                ...{
                                    id: w?.id,
                                    name: "[[Contrato " + w?.id_contrato + "]] (" + numericFormatter((w?.oene || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }) + ")",
                                    value: +w?.oene,
                                    fill: am5.color(0x33ff57), // Verde
                                    children: [
                                        {
                                            id: w?.id_contrato,
                                            keys: 1,
                                            name: 'OENE Avances ejecutado +2 semanas (' + w?.id_contrato + ') :  (' + numericFormatter(((w?.avance_ejecutado_2_semanas || []).reduce((a: any, c: any) => a + (+c?.oene), 0,)) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }) + ")",
                                            value: (w?.avance_ejecutado_2_semanas || []).reduce((a: any, c: any) => a + (+c?.oene), 0,),
                                            data: (w?.avance_ejecutado_2_semanas || []),
                                            fill: am5.color(0x33ff57), // Verde
                                        },
                                        {
                                            id: w?.id_contrato,
                                            keys: 2,
                                            name: 'OENE Avances pendientes de confirmación (' + w?.id_contrato + ') : (' + numericFormatter(((w?.oene_pendiente_confirmacion || []).reduce((a: any, c: any) => a + (+c?.oene), 0,)) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }) + ")",
                                            value: (w?.oene_pendiente_confirmacion || []).reduce((a: any, c: any) => a + (+c?.oene), 0,),
                                            data: (w?.oene_pendiente_confirmacion || []),
                                            fill: am5.color(0x33ff57), // Verde
                                        },
                                        {
                                            id: w?.id_contrato,
                                            keys: 3,
                                            name: 'OENE avances por usuarios (' + w?.id_contrato + ') : (' + numericFormatter(((w?.responsables).reduce((total: any, user: any) => {
                                                const sum = user.one.reduce((sum: any, contract: any) => sum + parseFloat(contract.oene), 0);
                                                return total + sum;
                                            }, 0)) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }) + ")",
                                            value: (w?.responsables).reduce((total: any, user: any) => {
                                                const sum = user.one.reduce((sum: any, contract: any) => sum + parseFloat(contract.oene), 0);
                                                return total + sum;
                                            }, 0),
                                            data: (w?.responsables || []),
                                            fill: am5.color(0x33ff57), // Verde
                                        },
                                        {
                                            id: w?.id_contrato,
                                            keys: 4,
                                            name: 'OENE Avances confirmados pendientes de documentacion (' + w?.id_contrato + ') : (' + numericFormatter(((w?.oene_confirmada_pendiente_documentacion || []).reduce((a: any, c: any) => a + (+c?.oene), 0,)) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }) + ")",
                                            value: (w?.oene_confirmada_pendiente_documentacion || []).reduce((a: any, c: any) => a + (+c?.oene), 0,),
                                            data: (w?.oene_confirmada_pendiente_documentacion || []),
                                            fill: am5.color(0x33ff57), // Verde
                                        },
                                        {
                                            id: w?.id_contrato,
                                            keys: 5,
                                            name: 'OENE Avances pendientes de documentacion (' + w?.id_contrato + ') : (' + numericFormatter(((w?.oene_pendiente_documentacion || []).reduce((a: any, c: any) => a + (+c?.oene), 0,)) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }) + ")",
                                            value: (w?.oene_pendiente_documentacion || []).reduce((a: any, c: any) => a + (+c?.oene), 0,),
                                            data: (w?.oene_pendiente_documentacion || []),
                                            fill: am5.color(0x33ff57), // Verde
                                        },
                                    ]
                                }
                            }
                        })
                    }
                }
            })
            const filteredData = removeChildrenWithZeroValue(nuevo);
            setDataOneClick(filteredData);
            handleisAlertOpenDetalleOne();
            setProcesando(false);
        } catch (err) {
            setProcesando(false);
            handleisAlertOpen();
        }
    }
    const handlePendientesContabilizar = async () => {
        try {
            setProcesando(true);
            const res = await getPendientesContabilizarHTTP(contrato?.id, contratosFiltro.toString());
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
            const res = await getEstimacionesProcesoHTTP(contrato?.id, contratosFiltro.toString());
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
            const res = await getFondoGarantiaHTTP(contrato?.id, contratosFiltro.toString());
            setDataFondoGarantia(res?.results || []);
            handleisAlertOpen();
            setProcesando(false);
        } catch (err) {
            setProcesando(false);
            handleisAlertOpen();
        }
    }
    const handleDeductivas = async () => {
        try {
            setProcesando(true);
            const res = await getDeductivasHTTP(contrato?.id, contratosFiltro.toString());
            setDataDeductivas(res?.results || []);
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
            const res = await getAnticiposHTTP(contrato?.id, contratosFiltro.toString());
            setDataAnticipos(res?.results || []);
            handleisAlertOpen();
            setProcesando(false);
        } catch (err) {
            setProcesando(false);
            handleisAlertOpen();
        }
    }
    const handleAhorro = async () => {
        try {
            setProcesando(true);
            const res = await getAhorroHTTP(contrato?.id, contratosFiltro.toString());
            setDataAhorro(res?.results || []);
            handleisAlertOpen();
            setProcesando(false);
        } catch (err) {
            setProcesando(false);
            handleisAlertOpen();
        }
    }
    const handleOrdenCompra = async () => {
        try {
            setProcesando(true);
            const res = await getOrdenCompraHTTP(contrato?.id);
            setDataOrdenCompra(res?.results || []);
            handleisAlertOpen();
            setProcesando(false);
        } catch (err) {
            setProcesando(false);
            handleisAlertOpen();
        }
    }
    const handleReclasificaciones = async () => {
        try {
            setProcesando(true);
            const res = await reclasificacionesHTP(contrato?.id);
            setDataReclasificaciones(res?.results || []);
            handleisAlertOpen();
            setProcesando(false);
        } catch (err) {
            setProcesando(false);
            handleisAlertOpen();
        }
    }
    const handleClickDeductivas = async (row: any) => {
        try {
            setProcesando(true);
            const res = await getDetalleDeductivasHTTP(row?.id);
            setDataDeductivasDetalle(res?.results || []);
            handleisAlertOpenDetalleDetalle();
            setProcesando(false);
        } catch (err) {
            setProcesando(false);
            handleisAlertOpenDetalleDetalle();
        }
    }

    const handleClickDetalleFondoGarantia = async (row: any) => {
        try {
            setProcesando(true);
            const res = await getDetalleFondoGarantiaHTTP(row?.id);
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
            const res = await getDetallePendienteContabilizarHTTP(row?.id);
            setDataPendienteContabilizarDetalle(res?.results || []);
            handleisAlertOpenDetalleDetalle();
            setProcesando(false);
        } catch (err) {
            setProcesando(false);
            handleisAlertOpenDetalleDetalle();
        }
    }

    const handleClickTablasOene = async (row: any, dataOneClickDataTipo_: any) => {
        navigate('/gestion-contratos?id=' + row?.id)
    }

    const handleClickTablasOeneNoResponsables = async (row: any, dataOneClickDataTipo_: any) => {
        try {
            setProcesando(true);
            const res = await getDetalleOENEHTTP(row?.id);
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
                            <Grid item xs={6}><h3 style={{ color: darkMode ? 'white' : '#28334a', fontWeight: 'bold' }} className='inicio-new-dashboard-titulo'> {contrato?.obra || ''} </h3></Grid>
                            <Grid item xs={6} style={{ textAlign: 'right' }}><p style={{ color: darkMode ? 'white' : '#576e85' }} className='inicio-new-dashboard-sub-titulo'>{contrato?.descripcion || ''}</p></Grid>
                            <Divider variant="inset" />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ paddingLeft: 50, paddingRight: 50 }}>
                        <Grid container spacing={2} style={{ borderBottom: darkMode ? 'solid 2px white' : 'solid 2px #28334a' }}>
                            <Grid item xs={12}><h5 style={{ color: '#576e85' }} className='inicio-new-dashboard-sub-titulo'><strong>Contratos vigentes.</strong> concentrado de información</h5></Grid>
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
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <p className='inicio-new-dashboard-titulo-acordeon'>Presupuesto</p>
                    </AccordionSummary>
                    <AccordionDetails style={{ backgroundColor: darkMode ? '#28334a' : '#e9eef1' }}>
                        {!procesando || props?.procesando ? <Grid container spacing={2}>
                            <Grid item xs={12} style={{ textAlign: 'center', border: darkMode ? 'solid 1px white' : 'solid 1px #28334a', margin: 50 }}>
                                <h4 style={{ color: darkMode ? 'white' : '#28334a', }} className='inicio-new-dashboard-sub-titulo' ><strong>Presupuesto:</strong> {numericFormatter((props?.data?.total_presupuesto || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })} </h4>
                            </Grid>
                            <Grid item md={12} sm={12} xl={12} xs={12}>
                                <Grid container>
                                    <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: 5 }} >
                                        <Avatar alt="Usuario" src={iconoIrAPM} sx={{ borderRadius: 1, backgroundColor: '#1c75bc' }} />
                                        <p style={{ margin: 0, color: darkMode ? 'white' : '#576e85' }} className='inicio-new-dashboard-sub-titulo'><strong>Total contratado:</strong> {numericFormatter(totalContratado + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })} </p>
                                    </Grid>
                                    <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: 5, cursor: 'pointer' }} onClick={() => { handleReclasificaciones() }} >
                                        <Avatar alt="Usuario" src={iconoIrAPM} sx={{ borderRadius: 1, backgroundColor: '#fbd039' }} />
                                        <p style={{ margin: 0, color: darkMode ? 'white' : '#576e85' }} className='inicio-new-dashboard-sub-titulo onHoverActive'><strong>Reclasificación:</strong> {numericFormatter(reclasificacion + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p>
                                    </Grid>
                                    <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: 5, cursor: 'pointer' }} onClick={() => { handleOrdenCompra() }} >
                                        <Avatar alt="Usuario" src={iconoIrAPM} sx={{ borderRadius: 1, backgroundColor: '#39b54a' }} />
                                        <p style={{ margin: 0, color: darkMode ? 'white' : '#576e85' }} className='inicio-new-dashboard-sub-titulo onHoverActive'><strong>Órdenes de compra:</strong> {numericFormatter(ordenesCompra + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p>
                                    </Grid>
                                    <Grid item xs={12} style={{ paddingTop: 10, paddingBottom: 10, borderTop: darkMode ? 'solid 2px white' : 'solid 2px #28334a', borderBottom: darkMode ? 'solid 2px white' : 'solid 2px #28334a', marginTop: 5, marginBottom: 5 }} >
                                        <h5 style={{ margin: 0, color: darkMode ? 'white' : '#576e85' }} className='inicio-new-dashboard-sub-titulo'><strong>PRESUPUESTO ASIGNADO:</strong> {numericFormatter((totalContratado + reclasificacion + ordenesCompra) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</h5>
                                    </Grid>
                                    <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: 5 }} >
                                        <Avatar alt="Usuario" src={iconoIrAPM} sx={{ borderRadius: 1, backgroundColor: '#7593b2' }} />
                                        <p style={{ margin: 0, color: darkMode ? 'white' : '#28334a' }} className='inicio-new-dashboard-sub-titulo'><strong>Presupuesto disponible:</strong> {numericFormatter(((props?.data?.total_presupuesto || 0) - (totalContratado + reclasificacion + ordenesCompra)) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })} </p>
                                    </Grid>
                                    <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: 5, cursor: 'pointer' }} onClick={() => { handleAhorro() }}>
                                        <Avatar alt="Usuario" src={iconoIrAPM} sx={{ borderRadius: 1, backgroundColor: '#7593b2' }} />
                                        <p style={{ margin: 0, color: darkMode ? 'white' : '#28334a' }} className='inicio-new-dashboard-sub-titulo onHoverActive'><strong>Ahorro del proyecto:</strong> {numericFormatter((props?.data?.total_ahorrado || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })} </p>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid> : <small style={{ position: 'relative', top: 4 }} ><CircularProgress color="inherit" size={20} /></small>}
                    </AccordionDetails>
                </Accordion>

                <Accordion style={{ backgroundColor: '#e9eef1', boxShadow: 'none', border: 'none' }} disabled={props?.procesandoResumen}>
                    <AccordionSummary
                        style={{ backgroundColor: '#576e85', color: 'white', fontWeight: 'bold', paddingLeft: 35, paddingRight: 50 }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <p className='inicio-new-dashboard-titulo-acordeon'>Resumen financiero {props?.procesandoResumen ? <small style={{ position: 'relative', top: 4 }} ><CircularProgress color="inherit" size={20} /></small> : null}</p>
                    </AccordionSummary>
                    <AccordionDetails style={{ backgroundColor: darkMode ? '#28334a' : '#e9eef1' }}>
                        <Grid container spacing={1} style={{ border: darkMode ? 'solid 2px white' : 'solid 2px #28334a', marginTop: 10, padding: 20 }}>
                            <Grid item md={4} sm={12} xl={4} xs={12} style={{ borderTop: 'solid 2px #1c75bc', marginTop: 20, cursor: 'pointer' }} onClick={() => { handleAnticipos() }} className='onHoverActive'>
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
                                    <Grid xs={12}> <h5 style={{ color: '#1c75bc' }} className='inicio-new-dashboard-sub-titulo'> <strong>Por amortizar:</strong> </h5> </Grid>
                                    <Grid xs={12}> <p style={{ color: '#1c75bc' }} className='inicio-new-dashboard-sub-titulo'>{numericFormatter((totalAnticipo - amotizados) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p> </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={4} sm={12} xl={4} xs={12} style={{ borderTop: 'solid 2px #1c75bc' }}>
                                <Grid container>
                                    <Grid xs={12}> <h5 style={{ color: '#1c75bc' }} className='inicio-new-dashboard-sub-titulo'><strong>Total estimados:</strong></h5> </Grid>
                                    <Grid xs={12}> <p style={{ color: '#1c75bc' }} className='inicio-new-dashboard-sub-titulo'> {numericFormatter(totalEstimados + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })} </p> </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={4} sm={12} xl={4} xs={12} style={{ cursor: 'pointer' }} onClick={() => { handleDeductivas() }} className='onHoverActive'>
                                <Grid container>
                                    <Grid xs={12}> <h5 style={{ color: '#1c75bc' }} className='inicio-new-dashboard-sub-titulo'> <strong>Deductivas:</strong> </h5> </Grid>
                                    <Grid xs={12}> <p style={{ color: '#1c75bc' }} className='inicio-new-dashboard-sub-titulo'>{numericFormatter(deductivas + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p> </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={4} sm={12} xl={4} xs={12} style={{ cursor: 'pointer' }} onClick={() => { hanndleFondoGarantia() }} className='onHoverActive'>
                                <Grid container>
                                    <Grid xs={12}> <h5 style={{ color: '#1c75bc' }} className='inicio-new-dashboard-sub-titulo'> <strong>Fondo de garantia:</strong> </h5> </Grid>
                                    <Grid xs={12}> <p style={{ color: '#1c75bc' }} className='inicio-new-dashboard-sub-titulo'>{numericFormatter(fondoGarantia + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p> </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={4} sm={12} xl={4} xs={12} style={{ borderTop: 'solid 2px #39b54a', cursor: 'pointer' }} onClick={() => { hanndleEstimacionesProceso() }} className='onHoverActive'>
                                <Grid container>
                                    <Grid xs={12}> <h5 style={{ color: '#39b54a' }} className='inicio-new-dashboard-sub-titulo'> <strong>Estimaciones en proceso:</strong> </h5> </Grid>
                                    <Grid xs={12}> <p style={{ color: '#39b54a' }} className='inicio-new-dashboard-sub-titulo'>{numericFormatter(estimacionesProceso + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p> </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={8} sm={12} xl={8} xs={12} />
                            <Grid item md={4} sm={12} xl={4} xs={12} >
                                <Grid container>
                                    <Grid xs={12}> <h5 style={{ color: '#576e85' }} className='inicio-new-dashboard-sub-titulo'> <strong>Contabilizados:</strong> </h5> </Grid>
                                    <Grid xs={12} style={{ borderBottom: 'solid 2px #576e85' }}> <p style={{ color: '#576e85' }} className='inicio-new-dashboard-sub-titulo'>{numericFormatter((estimacionesContabilizados + anticiposContabilizados + fondoGarantiaContabilizados) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p> </Grid>
                                    <Grid xs={12}> <p style={{ color: '#576e85' }} className='inicio-new-dashboard-sub-titulo'><strong>Estimaciones:</strong>  {numericFormatter((estimacionesContabilizados) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p> </Grid>
                                    <Grid xs={12}> <p style={{ color: '#576e85' }} className='inicio-new-dashboard-sub-titulo'><strong>Anticipos:</strong>  {numericFormatter((anticiposContabilizados) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p> </Grid>
                                    <Grid xs={12}> <p style={{ color: '#576e85' }} className='inicio-new-dashboard-sub-titulo'><strong>Fondo de garantia:</strong>  {numericFormatter((fondoGarantiaContabilizados) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p> </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={4} sm={12} xl={4} xs={12}>
                                <Grid container>
                                    <Grid xs={12} style={{ cursor: 'pointer' }} onClick={() => { handlePendientesContabilizar() }}> <h5 style={{ color: '#00a79d' }} className='inicio-new-dashboard-sub-titulo onHoverActive'><strong>Pendiente de contabilizar:</strong> </h5> </Grid>
                                    <Grid xs={12} style={{ borderBottom: 'solid 2px #00a79d' }}> <p style={{ color: '#00a79d' }} className='inicio-new-dashboard-sub-titulo onHoverActive'>{numericFormatter((estimacionesPendienteContabilizar + anticiposPendienteContabilizar + fondoGarantiaPendienteContabilizar) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</p> </Grid>
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

                                <Grid container style={{ backgroundColor: '#1A73E8', borderRadius: 5, padding: 10, minHeight: 50 }}>

                                    <Grid item md={6} sm={12} xl={6} xs={12}>
                                        <h5 style={{ color: darkMode ? 'white' : 'white' }} className='inicio-new-dashboard-sub-titulo'><strong>Total de pedidos:&nbsp;</strong>{numericFormatter(props?.data?.total_pedidos + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</h5>
                                    </Grid>
                                    <Grid item md={6} sm={12} xl={6} xs={12} style={{ cursor: 'pointer' }} className='onHoverActive' onClick={() => { handleOENE() }}>

                                        <h5 style={{ color: darkMode ? 'white' : 'white' }} className='inicio-new-dashboard-sub-titulo onHoverActive'><strong>OENE (INFORMATIVO):&nbsp;</strong>{numericFormatter((oene) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}</h5>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion style={{ backgroundColor: '#e9eef1', boxShadow: 'none', border: 'none' }} disabled={props?.procesandoAvanceTotal}>
                    <AccordionSummary
                        style={{ backgroundColor: '#576e85', color: 'white', fontWeight: 'bold', paddingLeft: 35, paddingRight: 50 }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header">
                        <p className='inicio-new-dashboard-titulo-acordeon'>Avance total <small>[proyecto]</small> {props?.procesandoAvanceTotal ? <small style={{ position: 'relative', top: 4 }} ><CircularProgress color="inherit" size={20} /></small> : null} </p>
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
                <Accordion style={{ backgroundColor: '#e9eef1', boxShadow: 'none', border: 'none' }} disabled={props?.procesandoListaContratos}>
                    <AccordionSummary
                        style={{ backgroundColor: '#576e85', color: 'white', fontWeight: 'bold', paddingLeft: 35, paddingRight: 50 }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header">
                        <p className='inicio-new-dashboard-titulo-acordeon'>Contratos {props?.procesandoListaContratos ? <small style={{ position: 'relative', top: 4 }} ><CircularProgress color="inherit" size={20} /></small> : null}</p>
                    </AccordionSummary>
                    <AccordionDetails style={{ backgroundColor: darkMode ? '#28334a' : '#e9eef1' }}>
                        <Grid container spacing={1} style={{ border: darkMode ? 'solid 2px white' : 'solid 2px #28334a', marginTop: 10, padding: 20 }}>
                            <Grid item md={12} sm={12} xl={12} xs={12} style={{ marginTop: 20 }}>
                                <Card>
                                    <CardContent>
                                        {(props?.data?.proyectos || [])?.length ? <DinamicTableMejorada
                                            flex
                                            key={'Carpetas'}
                                            noOrdenaColumnas
                                            sinFiltro
                                            actions
                                            enAccion={(accion, row) => {
                                                if (accion === 'ir_apm') {
                                                    navigate('/gestion-contratos?id=' + row?.id)
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
                                                        id: r?.id,
                                                        contrato: r?.contratista + '- ' + r?.id_contrato,
                                                        detalle: {
                                                            id: r?.id,
                                                            contratista: r?.contratista,
                                                            id_contrato: r?.id_contrato,
                                                            obra: r?.proyecto,
                                                            nombre: r?.clas,
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
                <Accordion style={{ backgroundColor: '#e9eef1', boxShadow: 'none', border: 'none' }} disabled={props?.procesandoTotalImporte}>
                    <AccordionSummary
                        style={{ backgroundColor: '#576e85', color: 'white', fontWeight: 'bold', paddingLeft: 35, paddingRight: 50 }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header">
                        <p className='inicio-new-dashboard-titulo-acordeon'>Total de importe en pesos por tipo de moneda {props?.procesandoTotalImporte ? <small style={{ position: 'relative', top: 4 }} ><CircularProgress color="inherit" size={20} /></small> : null}</p>
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
                                    <Grid xs={12}> <h5 style={{ color: '#1c75bc' }} className='inicio-new-dashboard-sub-titulo'> <strong>Contratado Euros:</strong> </h5> </Grid>
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
                <Accordion style={{ backgroundColor: '#e9eef1', boxShadow: 'none', border: 'none' }}>
                    <AccordionSummary
                        style={{ backgroundColor: '#576e85', color: 'white', fontWeight: 'bold', paddingLeft: 35, paddingRight: 50 }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                    >
                        <p className='inicio-new-dashboard-titulo-acordeon'>Indices financieros</p>
                    </AccordionSummary>
                    <AccordionDetails style={{ backgroundColor: darkMode ? '#28334a' : '#e9eef1' }}>
                        <Grid container spacing={1} style={{ border: darkMode ? 'solid 2px white' : 'solid 2px #28334a', marginTop: 10, padding: 20 }}>


                            <Grid item md={12} sm={12} xl={12} xs={12} style={{ textAlign: 'center' }}>
                                <Card>
                                    <CardContent>
                                        <h4>Matriz de avance por frente al corte</h4>
                                        <Divider variant="inset" />
                                        <p style={{ fontSize: '15px' }}> <strong> Avance financiero global[estimado]:</strong><label>{numericFormatter(
                                            (((props?.data?.matrizAvancePorFrenteAlCorte || []).reduce((a: any, c: any) => a + (+c?.avance_financiero), 0) * 100) / ((props?.data?.matrizAvancePorFrenteAlCorte || []).reduce((a: any, c: any) => a + (+c?.importe), 0))) + "",
                                            {
                                                thousandSeparator: ",",
                                                decimalScale: 2,
                                                fixedDecimalScale: true,
                                                suffix: "%",
                                            }
                                        )} </label></p>
                                        <p style={{ fontSize: '15px' }}> <strong> Avance programado al corte:</strong><label>{numericFormatter(
                                            (((props?.data?.matrizAvancePorFrenteAlCorte || []).reduce((a: any, c: any) => a + (+c?.avance_programado), 0) * 100) / ((props?.data?.matrizAvancePorFrenteAlCorte || []).reduce((a: any, c: any) => a + (+c?.importe), 0))) + "",
                                            {
                                                thousandSeparator: ",",
                                                decimalScale: 2,
                                                fixedDecimalScale: true,
                                                suffix: "%",
                                            }
                                        )} </label></p>
                                        <Grid container style={{ textAlign: 'left' }}>
                                            <Grid item md={12} sm={12} xl={12} xs={12}>

                                                {(props?.data?.matrizAvancePorFrenteAlCorte || [])?.length ? <Grid item xs={12}>
                                                    <DinamicTableMejorada
                                                        key={'matrizAvancePorFrenteAlCorte'}
                                                        titulo={''}
                                                        pinned={[{ columna: 'frente', lado: 'left' }]}
                                                        data={(props?.data?.matrizAvancePorFrenteAlCorte || []).map((r: any) => {
                                                            return {
                                                                frente: r?.frente,
                                                                descripcion: r?.descripcion,
                                                                importe: numericFormatter(r?.importe + "", {
                                                                    thousandSeparator: ",",
                                                                    decimalScale: 2,
                                                                    fixedDecimalScale: true,
                                                                    prefix: "$",
                                                                }),
                                                                oene: numericFormatter(
                                                                    (+r?.moneda === 1 ? (((+r?.oene) * 100) / (+r?.importe)) : ((((+r?.oene) * 100) / (+r?.importe)) * (+r?.tipo_cambio))) + "",
                                                                    {
                                                                        thousandSeparator: ",",
                                                                        decimalScale: 2,
                                                                        fixedDecimalScale: true,
                                                                        suffix: "%",
                                                                    }
                                                                ),
                                                                avance_financiero: numericFormatter(
                                                                    (+r?.moneda === 1 ? (((+r?.avance_financiero) * 100) / (+r?.importe)) : ((((+r?.avance_financiero) * 100) / (+r?.importe)) * (+r?.tipo_cambio))) + "",
                                                                    {
                                                                        thousandSeparator: ",",
                                                                        decimalScale: 2,
                                                                        fixedDecimalScale: true,
                                                                        suffix: "%",
                                                                    }
                                                                ),
                                                                avance_programado: numericFormatter(
                                                                    (+r?.moneda === 1 ? (((+r?.avance_programado) * 100) / (+r?.importe)) : ((((+r?.avance_programado) * 100) / (+r?.importe)) * (+r?.tipo_cambio))) + "",
                                                                    {
                                                                        thousandSeparator: ",",
                                                                        decimalScale: 2,
                                                                        fixedDecimalScale: true,
                                                                        suffix: "%",
                                                                    }
                                                                ),
                                                                fecha_inicio: r?.fecha_inicio,
                                                                fecha_fin: r?.fecha_fin
                                                            }
                                                        })}
                                                    />
                                                </Grid> : null}

                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item md={12} sm={12} xl={6} xs={12} style={{ textAlign: 'center' }}>
                                <Card>
                                    <CardContent>
                                        <h4>Programa Financiero</h4>
                                        <Divider variant="inset" />
                                        <Grid container spacing={2} >
                                            <Grid item md={12} sm={12} xl={6} xs={12}>
                                                <Card>
                                                    <CardContent>
                                                        <p style={{ fontSize: '15px' }}> <strong>Importe contratado</strong> </p>
                                                        <p style={{ fontSize: '15px' }}>{numericFormatter((props?.data?.programaFinanciero?.tarjeta_importe_contratado || []).reduce((a: any, c: any) => a + (+c?.moneda === 1 ? (+c?.importe) : ((+c?.importe)) * (+c?.tipo_cambio)), 0,) + "", {
                                                            thousandSeparator: ",",
                                                            decimalScale: 2,
                                                            fixedDecimalScale: true,
                                                            prefix: "$",
                                                        })}  </p>
                                                        <Button variant="primary" style={{ cursor: 'pointer' }} onClick={() => {
                                                            setTituloTabla('Programa Financiero: ' + 'importe contratado')
                                                            setDataDetalleDashboardContratos((props?.data?.programaFinanciero?.tarjeta_importe_contratado || []).map((r: any) => {
                                                                return {
                                                                    id_contrato: r?.id_contrato,
                                                                    categoria: r?.categoria,
                                                                    contrato: r?.contrato,
                                                                    contrato_liberado: r?.contrato_liberado,
                                                                    estatus_firma: r?.estatus_firma,
                                                                    fecha_final: r?.fecha_final,
                                                                    fecha_inicio: r?.fecha_inicio,
                                                                    importe: numericFormatter((r?.importe || 0) + "", {
                                                                        thousandSeparator: ",",
                                                                        decimalScale: 2,
                                                                        fixedDecimalScale: true,
                                                                        prefix: "$",
                                                                    }),
                                                                    moneda: r?.moneda === 1 ? 'Pesos MX' : r?.moneda === 2 ? 'Dolar' : 'Euro',
                                                                    nombre_clasificacion: r?.nombre_clasificacion,
                                                                    nota: r?.nota,
                                                                    tipo_cambio: numericFormatter((r?.tipo_cambio || 0) + "", {
                                                                        thousandSeparator: ",",
                                                                        decimalScale: 2,
                                                                        fixedDecimalScale: true,
                                                                        prefix: "$",
                                                                    }),
                                                                }
                                                            }))
                                                            handleisAlertOpenDashboardContratos();

                                                        }}><small>Ver detalle</small>
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item md={12} sm={12} xl={6} xs={12}>
                                                <Card>
                                                    <CardContent>
                                                        <p style={{ fontSize: '15px' }}> <strong>Importe catálogo</strong> </p>
                                                        <p style={{ fontSize: '15px' }}>{numericFormatter((props?.data?.programaFinanciero?.tarjeta_importe_catalogo || []).reduce((a: any, c: any) => a + (+c?.moneda === 1 ? ((+c?.cantidad) * (+c?.pu)) : (((+c?.cantidad) * (+c?.pu))) * (+c?.tipo_cambio)), 0,) + "", {
                                                            thousandSeparator: ",",
                                                            decimalScale: 2,
                                                            fixedDecimalScale: true,
                                                            prefix: "$",
                                                        })}  </p>
                                                        <Button variant="primary" style={{ cursor: 'pointer' }} onClick={() => {
                                                            setTituloTabla('Programa Financiero: ' + 'importe catálogo')
                                                            setDataDetalleDashboardContratos((props?.data?.programaFinanciero?.tarjeta_importe_catalogo || []).map((r: any) => {
                                                                return {
                                                                    inciso: r?.inciso,
                                                                    concepto: r.concepto,
                                                                    descripcion: r?.descripcion,
                                                                    fecha_fin: r?.fecha_fin,
                                                                    fecha_inicio: r?.fecha_inicio,
                                                                    moneda: r?.moneda === 1 ? 'Pesos MX' : r?.moneda === 2 ? 'Dolar' : 'Euro',
                                                                    num_convenio: r?.num_convenio,
                                                                    cantidad: numericFormatter((r?.cantidad || 0) + "", {
                                                                        thousandSeparator: ",",
                                                                        decimalScale: 2,
                                                                        fixedDecimalScale: true,
                                                                        prefix: "",
                                                                    }),
                                                                    pu: numericFormatter((r?.pu || 0) + "", {
                                                                        thousandSeparator: ",",
                                                                        decimalScale: 2,
                                                                        fixedDecimalScale: true,
                                                                        prefix: "",
                                                                    }),
                                                                    tipo_cambio: numericFormatter((r?.tipo_cambio || 0) + "", {
                                                                        thousandSeparator: ",",
                                                                        decimalScale: 2,
                                                                        fixedDecimalScale: true,
                                                                        prefix: "$",
                                                                    }),
                                                                    unidad: r?.unidad
                                                                }
                                                            }))
                                                            handleisAlertOpenDashboardContratos();
                                                        }}><small>Ver detalle</small>
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item md={12} sm={12} xl={6} xs={12}>
                                                <Card>
                                                    <CardContent>
                                                        <p style={{ fontSize: '15px' }}> <strong>Programa general</strong> </p>
                                                        <p style={{ fontSize: '15px' }}>{numericFormatter((props?.data?.programaFinanciero?.tarjeta_programa_general || []).reduce((a: any, c: any) => a + (+c?.moneda === 1 ? (+c?.importe) : ((+c?.importe)) * (+c?.tipo_cambio)), 0,) + "", {
                                                            thousandSeparator: ",",
                                                            decimalScale: 2,
                                                            fixedDecimalScale: true,
                                                            prefix: "$",
                                                        })}  </p>
                                                        <Button variant="primary" style={{ cursor: 'pointer' }} onClick={() => {
                                                            setTituloTabla('Programa Financiero: ' + 'programa general')
                                                            setDataDetalleDashboardContratos((props?.data?.programaFinanciero?.tarjeta_programa_general || []).map((r: any) => {
                                                                return {
                                                                    fecha: r?.fecha,
                                                                    fecha_registro: r?.fecha_registro,
                                                                    importe: numericFormatter((r?.importe || 0) + "", {
                                                                        thousandSeparator: ",",
                                                                        decimalScale: 2,
                                                                        fixedDecimalScale: true,
                                                                        prefix: "$",
                                                                    }),
                                                                    moneda: r?.moneda === 1 ? 'Pesos MX' : r?.moneda === 2 ? 'Dolar' : 'Euro',
                                                                    tipo_cambio: numericFormatter((r?.tipo_cambio || 0) + "", {
                                                                        thousandSeparator: ",",
                                                                        decimalScale: 2,
                                                                        fixedDecimalScale: true,
                                                                        prefix: "$",
                                                                    })
                                                                }
                                                            }))
                                                            handleisAlertOpenDashboardContratos();
                                                        }}><small>Ver detalle</small>
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item md={12} sm={12} xl={6} xs={12}>
                                                <Card>
                                                    <CardContent>
                                                        <p style={{ fontSize: '15px' }}> <strong>Particular [frentes] </strong> </p>
                                                        <p style={{ fontSize: '15px' }}>{numericFormatter((props?.data?.programaFinanciero?.tarjeta_particular_frentes || []).reduce((a: any, c: any) => a + (+c?.moneda === 1 ? (+c?.importe) : ((+c?.importe)) * (+c?.tipo_cambio)), 0,) + "", {
                                                            thousandSeparator: ",",
                                                            decimalScale: 2,
                                                            fixedDecimalScale: true,
                                                            prefix: "$",
                                                        })}  </p>
                                                        <Button variant="primary" style={{ cursor: 'pointer' }} onClick={() => {
                                                            setTituloTabla('Programa Financiero: ' + 'particular [frentes]')
                                                            setDataDetalleDashboardContratos((props?.data?.programaFinanciero?.tarjeta_particular_frentes || []).map((r: any) => {
                                                                return {
                                                                    frente: r?.frente,
                                                                    fecha: r?.fecha,
                                                                    fecha_registro: r?.fecha_registro,
                                                                    importe: numericFormatter((r?.importe || 0) + "", {
                                                                        thousandSeparator: ",",
                                                                        decimalScale: 2,
                                                                        fixedDecimalScale: true,
                                                                        prefix: "$",
                                                                    }),
                                                                    moneda: r?.moneda === 1 ? 'Pesos MX' : r?.moneda === 2 ? 'Dolar' : 'Euro',
                                                                    tipo_cambio: numericFormatter((r?.tipo_cambio || 0) + "", {
                                                                        thousandSeparator: ",",
                                                                        decimalScale: 2,
                                                                        fixedDecimalScale: true,
                                                                        prefix: "$",
                                                                    })
                                                                }
                                                            }))
                                                            handleisAlertOpenDashboardContratos();
                                                        }}><small>Ver detalle</small>
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item md={12} sm={12} xl={6} xs={12} style={{ textAlign: 'center' }}>
                                <Card>
                                    <CardContent>
                                        <h4>Estimaciones</h4>
                                        <Divider variant="inset" />
                                        <Grid container spacing={2}>
                                            {
                                                (gruposEstimacionesEstatus || []).map((r: any) => {
                                                    return (
                                                        <Grid item md={12} sm={12} xl={6} xs={12}>
                                                            <Card>
                                                                <CardContent>
                                                                    <p style={{ fontSize: '15px' }}> <strong> {r?.status || ''}</strong> </p>
                                                                    <p style={{ fontSize: '15px' }}>{(r?.data || [])?.length} {(r?.data || [])?.length === 1 ? 'Estimacion' : 'Estimaciones'}</p>
                                                                    <p style={{ fontSize: '15px' }}>{numericFormatter((r?.data || []).reduce((a: any, c: any) => a + (+c?.moneda === 1 ? (+c?.importe) : ((+c?.importe)) * (+c?.tipo_cambio)), 0,) + "", {
                                                                        thousandSeparator: ",",
                                                                        decimalScale: 2,
                                                                        fixedDecimalScale: true,
                                                                        prefix: "$",
                                                                    })}  </p>
                                                                    <Button variant="primary" style={{ cursor: 'pointer' }} onClick={() => {
                                                                        setTituloTabla('Estimaciones: ' + r?.status || '')
                                                                        setDataDetalleDashboardContratos((r?.data || []).map((r: any) => {
                                                                            return {
                                                                                id: r?.id,
                                                                                id_contrato: r?.id_contrato,
                                                                                numero_estimacion: 1,
                                                                                importe: numericFormatter((r?.alcance_liquido || 0) + "", {
                                                                                    thousandSeparator: ",",
                                                                                    decimalScale: 2,
                                                                                    fixedDecimalScale: true,
                                                                                    prefix: "$",
                                                                                }),
                                                                                estatus: r?.evento
                                                                            }
                                                                        }))
                                                                        handleisAlertOpenDashboardContratos();
                                                                    }}><small>Ver detalle</small></Button>
                                                                </CardContent>
                                                            </Card>
                                                        </Grid>
                                                    );
                                                })
                                            }
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item md={12} sm={12} xl={12} xs={12} style={{ textAlign: 'center' }}>
                                <Card>
                                    <CardContent>
                                        <h4>Erogaciones programadas por obra y frente</h4>
                                        <Divider variant="inset" />
                                        <Grid container style={{ textAlign: 'left' }}>
                                            <Grid item md={12} sm={12} xl={12} xs={12}>
                                                <SeleccionFrenteDashboardForm enAccion={(data: any) => {
                                                    setTipoErogacion(data?.frente)
                                                }} frentes={[...Object.keys(props?.data?.erogacionesProgramadasObraFrente?.frentes || []).map((r: any) => {
                                                    return { label: r, value: r }
                                                }), ...[{ label: 'Programa general de obra', value: 'programa_general_de_obra' }]]} />
                                            </Grid>
                                            <Grid item md={12} sm={12} xl={12} xs={12}>
                                                {tipoErogacion === 'programa_general_de_obra' && ((props?.data?.erogacionesProgramadasObraFrente || {})?.[tipoErogacion] || [])?.length ? <Grid item xs={12}>
                                                    <DinamicTableMejorada
                                                        flex
                                                        pinned={[{ columna: 'fecha', lado: 'left' }]}
                                                        key={'erogaciones_frente'}
                                                        data={((props?.data?.erogacionesProgramadasObraFrente || {})?.[tipoErogacion]).map((r: any) => {
                                                            return {
                                                                fecha: r?.fecha,
                                                                importe_parcial: numericFormatter(r?.importe + "", {
                                                                    thousandSeparator: ",",
                                                                    decimalScale: 2,
                                                                    fixedDecimalScale: true,
                                                                    prefix: "$",
                                                                }),
                                                                importe_acumulado: numericFormatter(r?.importe_acumulado + "" + "", {
                                                                    thousandSeparator: ",",
                                                                    decimalScale: 2,
                                                                    fixedDecimalScale: true,
                                                                    prefix: "$",
                                                                })
                                                            }
                                                        })}
                                                    />
                                                </Grid> : null}

                                                {(props?.data?.erogacionesProgramadasObraFrente?.frentes?.[tipoErogacion] || []).length ? <Grid item xs={12}>
                                                    <DinamicTableMejorada
                                                        flex
                                                        pinned={[{ columna: 'fecha', lado: 'left' }]}
                                                        key={'erogaciones_frente'}
                                                        data={(props?.data?.erogacionesProgramadasObraFrente?.frentes?.[tipoErogacion] || []).map((r: any) => {
                                                            return {
                                                                fecha: r?.fecha,
                                                                importe_parcial: numericFormatter(r?.importe + "", {
                                                                    thousandSeparator: ",",
                                                                    decimalScale: 2,
                                                                    fixedDecimalScale: true,
                                                                    prefix: "$",
                                                                }),
                                                                importe_acumulado: numericFormatter(r?.importe_acumulado + "" + "", {
                                                                    thousandSeparator: ",",
                                                                    decimalScale: 2,
                                                                    fixedDecimalScale: true,
                                                                    prefix: "$",
                                                                })
                                                            }
                                                        })}
                                                    />
                                                </Grid> : null}


                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item md={12} sm={12} xl={12} xs={12} style={{ textAlign: 'center' }}>
                                <Card>
                                    <CardContent>
                                        <h4>Avance financiero real vs programado</h4>
                                        <Divider variant="inset" />
                                        <Grid container spacing={2}>
                                            <Grid item md={12} sm={12} xl={12} xs={12}>

                                                {(props?.data?.avanceFinancieroReaclVsProgramado || []).length ? <Grid item xs={12}>
                                                    <DinamicTableMejorada
                                                        flex
                                                        pinned={[{ columna: 'fecha', lado: 'left' }]}
                                                        key={'erogaciones_frente'}
                                                        data={(props?.data?.avanceFinancieroReaclVsProgramado || []).map((r: any) => {
                                                            return {
                                                                fecha: r?.fecha,
                                                                programa_acumulado: numericFormatter(r?.programa_acumulado + "", {
                                                                    thousandSeparator: ",",
                                                                    decimalScale: 2,
                                                                    fixedDecimalScale: true,
                                                                    prefix: "$",
                                                                }) + ' | ' + numericFormatter(r?.porcentaje_acumulado + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: '%' }),
                                                                real_acumulado: numericFormatter(r?.real_acumulado + "", {
                                                                    thousandSeparator: ",",
                                                                    decimalScale: 2,
                                                                    fixedDecimalScale: true,
                                                                    prefix: "$",
                                                                }) + ' | ' + numericFormatter(r?.real_acumulado_porcentaje_1 + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: '%' })
                                                                    + ' | ' + numericFormatter(r?.real_acumulado_porcentaje_2 + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: '%' })
                                                            }
                                                        })
                                                        }
                                                    />
                                                </Grid> : null}
                                            </Grid>
                                        </Grid>
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
                        <p className='inicio-new-dashboard-titulo-acordeon'>Información del proyecto</p>
                    </AccordionSummary>
                    <AccordionDetails style={{ backgroundColor: darkMode ? '#28334a' : '#e9eef1' }}>
                        <Grid container spacing={1} style={{ border: darkMode ? 'solid 2px white' : 'solid 2px #28334a', marginTop: 10, padding: 20 }}>


                            <Grid item md={12} sm={12} xl={6} xs={12} style={{ textAlign: 'center' }}>
                                <Card>
                                    <CardContent>
                                        <h4>Alertas en los conceptos</h4>
                                        <Divider variant="inset" />
                                        <Grid container spacing={2}>
                                            <Grid item md={12} sm={12} xl={6} xs={12}>
                                                <Card>
                                                    <CardContent>
                                                        <p style={{ fontSize: '15px' }}><strong>Volumenes con excedente</strong></p>
                                                        <p style={{ fontSize: '15px' }}>{(props?.data?.alertasEnConceptos?.volumen_con_excedente || [])?.length} {(props?.data?.alertasEnConceptos?.volumen_con_excedente || [])?.length === 1 ? 'Concepto' : 'Conceptos'} </p>
                                                        <Button variant="primary" style={{ cursor: 'pointer' }} disabled={(props?.data?.alertasEnConceptos?.volumen_con_excedente || [])?.length === 0} onClick={() => {
                                                            setTituloTabla('Volumenes con excedente')
                                                            setDataDetalleDashboardContratos((props?.data?.alertasEnConceptos?.volumen_con_excedente || []).map((r: any) => {
                                                                return {
                                                                    cantidad: numericFormatter((r?.cantidad || 0) + "", {
                                                                        thousandSeparator: ",",
                                                                        decimalScale: 2,
                                                                        fixedDecimalScale: true,
                                                                        prefix: "",
                                                                    }),
                                                                    concepto: r?.concepto,
                                                                    fecha_registro: r?.fecha_registro,
                                                                    moneda: r?.moneda === 1 ? 'Pesos MX' : r?.moneda === 2 ? 'Dolar' : 'Euro',
                                                                    nota: r?.nota,
                                                                    pu: numericFormatter((r?.pu || 0) + "", {
                                                                        thousandSeparator: ",",
                                                                        decimalScale: 2,
                                                                        fixedDecimalScale: true,
                                                                        prefix: "",
                                                                    }),
                                                                    tipo_cambio: numericFormatter((r?.tipo_cambio || 0) + "", {
                                                                        thousandSeparator: ",",
                                                                        decimalScale: 2,
                                                                        fixedDecimalScale: true,
                                                                        prefix: "$",
                                                                    }),
                                                                    unidad: r?.unidad,
                                                                    volumen_excedente: numericFormatter((r?.volumen_reportado || 0) + "", {
                                                                        thousandSeparator: ",",
                                                                        decimalScale: 2,
                                                                        fixedDecimalScale: true,
                                                                        prefix: "",
                                                                    })
                                                                }
                                                            }))
                                                            handleisAlertOpenDashboardContratos();
                                                        }}><small>Ver detalle</small></Button>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item md={12} sm={12} xl={6} xs={12}>
                                                <Card>
                                                    <CardContent>
                                                        <p style={{ fontSize: '15px' }}><strong>Conceptos Cancelados / cerrados</strong></p>
                                                        <p style={{ fontSize: '15px' }}>{(props?.data?.alertasEnConceptos?.conceptos_cerrados_cancelados || [])?.length} {(props?.data?.alertasEnConceptos?.conceptos_cerrados_cancelados || [])?.length === 1 ? 'Concepto' : 'Conceptos'}</p>
                                                        <p style={{ fontSize: '15px' }}>Ejecutado: {numericFormatter((props?.data?.alertasEnConceptos?.conceptos_cerrados_cancelados || []).reduce((a: any, c: any) => a + (+c?.ejecutado), 0,) + "", {
                                                            thousandSeparator: ",",
                                                            decimalScale: 2,
                                                            fixedDecimalScale: true,
                                                            prefix: "$",
                                                        })}  </p>
                                                        <p style={{ fontSize: '15px' }}>No ejecutado: {numericFormatter((props?.data?.alertasEnConceptos?.conceptos_cerrados_cancelados || []).reduce((a: any, c: any) => a + (+c?.pendiente), 0,) + "", {
                                                            thousandSeparator: ",",
                                                            decimalScale: 2,
                                                            fixedDecimalScale: true,
                                                            prefix: "$",
                                                        })}  </p>
                                                        <p style={{ fontSize: '15px' }}>Total: {numericFormatter((props?.data?.alertasEnConceptos?.conceptos_cerrados_cancelados || []).reduce((a: any, c: any) => a + (+c?.importe_concepto), 0,) + "", {
                                                            thousandSeparator: ",",
                                                            decimalScale: 2,
                                                            fixedDecimalScale: true,
                                                            prefix: "$",
                                                        })}  </p>
                                                        <Button variant="primary" style={{ cursor: 'pointer' }} disabled={(props?.data?.alertasEnConceptos?.conceptos_cerrados_cancelados || [])?.length === 0} onClick={() => {
                                                            setTituloTabla('Conceptos cancelados / cerrados')
                                                            setDataDetalleDashboardContratos((props?.data?.alertasEnConceptos?.conceptos_cerrados_cancelados || []).map((r: any) => {
                                                                return {
                                                                    concepto: r?.concepto,
                                                                    cantidad: numericFormatter((r?.cantidad || 0) + "", {
                                                                        thousandSeparator: ",",
                                                                        decimalScale: 2,
                                                                        fixedDecimalScale: true,
                                                                        prefix: "",
                                                                    }),
                                                                    fecha_fin: r?.fecha_fin,
                                                                    fecha_inicio: r?.fecha_inicio,
                                                                    id_contrato: r?.id_contrato,
                                                                    moneda: r?.moneda === 1 ? 'Pesos MX' : r?.moneda === 2 ? 'Dolar' : 'Euro',
                                                                    pu: numericFormatter((r?.cantidad || 0) + "", {
                                                                        thousandSeparator: ",",
                                                                        decimalScale: 2,
                                                                        fixedDecimalScale: true,
                                                                        prefix: "",
                                                                    }),
                                                                    unidad: r?.unidad,
                                                                    tipo_cambio: numericFormatter((r?.cantidad || 0) + "", {
                                                                        thousandSeparator: ",",
                                                                        decimalScale: 2,
                                                                        fixedDecimalScale: true,
                                                                        prefix: "$",
                                                                    }),
                                                                    importe_concepto: numericFormatter((r?.cantidad || 0) + "", {
                                                                        thousandSeparator: ",",
                                                                        decimalScale: 2,
                                                                        fixedDecimalScale: true,
                                                                        prefix: "$",
                                                                    }),
                                                                    ejecutado: numericFormatter((r?.cantidad || 0) + "", {
                                                                        thousandSeparator: ",",
                                                                        decimalScale: 2,
                                                                        fixedDecimalScale: true,
                                                                        prefix: "$",
                                                                    }),
                                                                    pendiente: numericFormatter((r?.cantidad || 0) + "", {
                                                                        thousandSeparator: ",",
                                                                        decimalScale: 2,
                                                                        fixedDecimalScale: true,
                                                                        prefix: "$",
                                                                    }),
                                                                }
                                                            }))
                                                            handleisAlertOpenDashboardContratos();
                                                        }}><small>Ver detalle</small></Button>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item md={12} sm={12} xl={6} xs={12} style={{ textAlign: 'center' }}>
                                <Card>
                                    <CardContent>
                                        <h4>Conceptos fuera de catálogo</h4>
                                        <Divider variant="inset" />
                                        <Grid container spacing={2}>
                                            {
                                                (gruposConceptosFueraCatalogo || []).map((r: any) => {
                                                    return (
                                                        <Grid item md={12} sm={12} xl={6} xs={12}>
                                                            <Card>
                                                                <CardContent>
                                                                    <p style={{ fontSize: '15px' }}> <strong> {r?.status || ''}</strong> </p>
                                                                    <p style={{ fontSize: '15px' }}>{(r?.data || [])?.length} {(r?.data || [])?.length === 1 ? 'Concepto' : 'Conceptos'}</p>
                                                                    <p style={{ fontSize: '15px' }}>{numericFormatter((r?.data || []).reduce((a: any, c: any) => a + (+c?.moneda === 1 ? (+c?.cantidad) * (+c?.pu) : ((+c?.cantidad) * (+c?.pu)) * (+c?.tipo_cambio)), 0,) + "", {
                                                                        thousandSeparator: ",",
                                                                        decimalScale: 2,
                                                                        fixedDecimalScale: true,
                                                                        prefix: "$",
                                                                    })}  </p>
                                                                    <Button variant="primary" style={{ cursor: 'pointer' }} onClick={() => {
                                                                        setTituloTabla('Conceptos fuera de catálogo: ' + r?.status || '')
                                                                        setDataDetalleDashboardContratos((r?.data || []).map((r: any) => {
                                                                            return {
                                                                                inciso: r?.inciso,
                                                                                concepto: r?.concepto,
                                                                                descripcion: r?.descripcion,
                                                                                fecha_inicio: r?.fecha_inicio,
                                                                                fecha_fin: r?.fecha_fin,
                                                                                cantidad: numericFormatter((r?.cantidad || 0) + "", {
                                                                                    thousandSeparator: ",",
                                                                                    decimalScale: 2,
                                                                                    fixedDecimalScale: true,
                                                                                    prefix: "",
                                                                                }),
                                                                                moneda: r?.moneda === 1 ? 'Pesos MX' : r?.moneda === 2 ? 'Dolar' : 'Euro',
                                                                                num_convenio: r?.num_convenio,
                                                                                pu: numericFormatter((r?.pu || 0) + "", {
                                                                                    thousandSeparator: ",",
                                                                                    decimalScale: 2,
                                                                                    fixedDecimalScale: true,
                                                                                    prefix: "",
                                                                                }),
                                                                                tipo_cambio: numericFormatter((r?.tipo_cambio || 0) + "", {
                                                                                    thousandSeparator: ",",
                                                                                    decimalScale: 2,
                                                                                    fixedDecimalScale: true,
                                                                                    prefix: "$",
                                                                                }),
                                                                                tipo_concepto_desc: r?.tipo_concepto_desc,
                                                                                unidad: r?.unidad
                                                                            }
                                                                        }))
                                                                        handleisAlertOpenDashboardContratos();
                                                                    }}><small>Ver detalle</small></Button>
                                                                </CardContent>
                                                            </Card>
                                                        </Grid>
                                                    );
                                                })
                                            }
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item md={12} sm={12} xl={6} xs={12} style={{ textAlign: 'center' }}>
                                <Card>
                                    <CardContent>
                                        <h4>Clasificación de obra</h4>
                                        <Divider variant="inset" />
                                        <Grid container spacing={2}>

                                            {
                                                (gruposClasificacionObra || []).map((r: any) => {
                                                    return (
                                                        <Grid item md={12} sm={12} xl={6} xs={12}>
                                                            <Card>
                                                                <CardContent>
                                                                    <p style={{ fontSize: '15px' }}> <strong> {r?.status || ''}</strong> </p>
                                                                    <p style={{ fontSize: '15px' }}>{(r?.data || [])?.length} {(r?.data || [])?.length === 1 ? 'Contrato' : 'Contratos'}</p>
                                                                    <p style={{ fontSize: '15px' }}>{numericFormatter((r?.data || []).reduce((a: any, c: any) => a + (+c?.moneda === 1 ? (+c?.importe) : ((+c?.importe)) * (+c?.tipo_cambio)), 0,) + "", {
                                                                        thousandSeparator: ",",
                                                                        decimalScale: 2,
                                                                        fixedDecimalScale: true,
                                                                        prefix: "$",
                                                                    })}  </p>
                                                                    <Button variant="primary" style={{ cursor: 'pointer' }} onClick={() => {
                                                                        setTituloTabla('Clasificación de obra: ' + r?.status || '')
                                                                        setDataDetalleDashboardContratos((r?.data || []).map((r: any) => {
                                                                            return {
                                                                                id_contrato: r?.id_contrato,
                                                                                categoria: r?.categoria,
                                                                                contrato: r?.contrato,
                                                                                contrato_liberado: r?.contrato_liberado,
                                                                                estatus_firma: r?.estatus_firma,
                                                                                fecha_final: r?.fecha_final,
                                                                                fecha_inicio: r?.fecha_inicio,
                                                                                importe: numericFormatter((r?.importe || 0) + "", {
                                                                                    thousandSeparator: ",",
                                                                                    decimalScale: 2,
                                                                                    fixedDecimalScale: true,
                                                                                    prefix: "$",
                                                                                }),
                                                                                moneda: r?.moneda === 1 ? 'Pesos MX' : r?.moneda === 2 ? 'Dolar' : 'Euro',
                                                                                nombre_clasificacion: r?.nombre_clasificacion,
                                                                                nota: r?.nota,
                                                                                tipo_cambio: numericFormatter((r?.tipo_cambio || 0) + "", {
                                                                                    thousandSeparator: ",",
                                                                                    decimalScale: 2,
                                                                                    fixedDecimalScale: true,
                                                                                    prefix: "$",
                                                                                }),
                                                                            }
                                                                        }))
                                                                        handleisAlertOpenDashboardContratos();
                                                                    }}><small>Ver detalle</small></Button>
                                                                </CardContent>
                                                            </Card>
                                                        </Grid>
                                                    );
                                                })
                                            }
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>


                            <Grid item md={12} sm={12} xl={6} xs={12} style={{ textAlign: 'center' }}>
                                <Card>
                                    <CardContent>
                                        <h4>Hitos</h4>
                                        <Divider variant="inset" />
                                        <Grid container spacing={2}>
                                            <Grid item md={12} sm={12} xl={4} xs={12}>
                                                <Card>
                                                    <CardContent>
                                                        <p style={{ fontSize: '15px' }}> <strong>Vigentes </strong> </p>
                                                        <p style={{ fontSize: '15px' }}> {(props?.data?.hitos || []).filter((r: any) => {
                                                            const fechaInicioDate = new Date(r?.fecha_inicio);
                                                            const fechaFinDate = new Date(r?.fecha_fin);
                                                            const fechaActual = new Date(); // Fecha actual
                                                            const estaEnRango = _.inRange(fechaActual.getTime(), fechaInicioDate.getTime(), fechaFinDate.getTime());
                                                            return estaEnRango;
                                                        })?.length} {(props?.data?.hitos || []).filter((r: any) => {
                                                            const fechaInicioDate = new Date(r?.fecha_inicio);
                                                            const fechaFinDate = new Date(r?.fecha_fin);
                                                            const fechaActual = new Date(); // Fecha actual
                                                            const estaEnRango = _.inRange(fechaActual.getTime(), fechaInicioDate.getTime(), fechaFinDate.getTime());
                                                            return estaEnRango;
                                                        })?.length === 1 ? 'Hito' : 'Hitos'} </p>
                                                        <Button variant="primary" disabled={!(props?.data?.hitos || []).filter((r: any) => {
                                                            const fechaInicioDate = new Date(r?.fecha_inicio);
                                                            const fechaFinDate = new Date(r?.fecha_fin);
                                                            const fechaActual = new Date(); // Fecha actual
                                                            const estaEnRango = _.inRange(fechaActual.getTime(), fechaInicioDate.getTime(), fechaFinDate.getTime());
                                                            return estaEnRango;
                                                        })?.length} style={{ cursor: 'pointer' }} onClick={() => {
                                                            setTituloTabla('Hitos: ' + 'vigentes')
                                                            setDataDetalleDashboardContratos((props?.data?.hitos || []).filter((r: any) => {
                                                                const fechaInicioDate = new Date(r?.fecha_inicio);
                                                                const fechaFinDate = new Date(r?.fecha_fin);
                                                                const fechaActual = new Date(); // Fecha actual
                                                                const estaEnRango = _.inRange(fechaActual.getTime(), fechaInicioDate.getTime(), fechaFinDate.getTime());
                                                                return estaEnRango;
                                                            }))
                                                            handleisAlertOpenDashboardContratos();
                                                        }}><small>Ver detalle</small>
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item md={12} sm={12} xl={4} xs={12}>
                                                <Card>
                                                    <CardContent>
                                                        <p style={{ fontSize: '15px' }}> <strong>Desfasados </strong> </p>
                                                        <p style={{ fontSize: '15px' }}>{(props?.data?.hitos || []).filter((r: any) => {
                                                            const otraFechaDate = new Date(r?.fecha_fin);
                                                            const fechaActual = new Date(); // Fecha actual
                                                            return fechaActual > otraFechaDate;
                                                        })?.length} {(props?.data?.hitos || []).filter((r: any) => {
                                                            const otraFechaDate = new Date(r?.fecha_fin);
                                                            const fechaActual = new Date(); // Fecha actual
                                                            return fechaActual > otraFechaDate;
                                                        })?.length === 1 ? 'Hito' : 'Hitos'} </p>
                                                        <Button variant="primary" disabled={!(props?.data?.hitos || []).filter((r: any) => {
                                                            const otraFechaDate = new Date(r?.fecha_fin);
                                                            const fechaActual = new Date(); // Fecha actual
                                                            return fechaActual > otraFechaDate;
                                                        })?.length} style={{ cursor: 'pointer' }} onClick={() => {
                                                            setTituloTabla('Hitos: ' + 'desfasados')
                                                            setDataDetalleDashboardContratos((props?.data?.hitos || []).filter((r: any) => {
                                                                const otraFechaDate = new Date(r?.fecha_fin);
                                                                const fechaActual = new Date(); // Fecha actual
                                                                return fechaActual > otraFechaDate;
                                                            }))
                                                            handleisAlertOpenDashboardContratos();
                                                        }}><small>Ver detalle</small>
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item md={12} sm={12} xl={4} xs={12}>
                                                <Card>
                                                    <CardContent>
                                                        <p style={{ fontSize: '15px' }}> <strong>Cerrados </strong> </p>
                                                        <p style={{ fontSize: '15px' }}>{(props?.data?.hitos || []).filter((r: any) => !r?.estatus)?.length} {(props?.data?.hitos || []).filter((r: any) => !r?.estatus)?.length === 1 ? 'Hito' : 'Hitos'} </p>
                                                        <Button variant="primary" disabled={!(props?.data?.hitos || []).filter((r: any) => !r?.estatus)?.length} style={{ cursor: 'pointer' }} onClick={() => {
                                                            setTituloTabla('Hitos: ' + 'cerrados')
                                                            setDataDetalleDashboardContratos((props?.data?.hitos || []).filter((r: any) => !r?.estatus))
                                                            handleisAlertOpenDashboardContratos();
                                                        }}><small>Ver detalle</small>
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
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
                    {dataReclasificaciones?.length ? <Grid item xs={12}>
                        <DinamicTableMejorada
                            flex
                            key={'reclasificaciones'}
                            titulo={'Reclasificaciones'}
                            data={dataReclasificaciones.map((r: any) => {
                                return {
                                    nombre: r?.nombre,
                                    importe: numericFormatter((r?.importe || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                    pedido: r?.pedido,
                                    fecha_registro: r?.fecha_registro,
                                }
                            })}
                        />
                    </Grid> : null}
                    {dataOrdenCompra?.length ? <Grid item xs={12}>
                        <DinamicTableMejorada
                            flex
                            key={'orden_compra'}
                            titulo={'Ordenes de compra'}
                            data={dataOrdenCompra.map((r: any) => {
                                return {
                                    nombre: r?.nombre,
                                    importe: numericFormatter((r?.importe || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                    pedido: r?.pedido,
                                    fecha_registro: r?.fecha_registro,
                                }
                            })}
                        />
                    </Grid> : null}
                    {dataAhorro?.length ? <Grid item xs={12}>
                        <DinamicTableMejorada
                            flex
                            key={'ahorrro'}
                            titulo={'Relación de contratos con ahorro'}
                            data={dataAhorro.map((r: any) => {
                                return {
                                    contrato: r?.contrato,
                                    contratista: r?.contratista,
                                    importe: numericFormatter((r?.importe || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                    anticipo: numericFormatter((r?.anticipo || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                    fondo_garantia: numericFormatter((r?.fondo_garantia || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                    deducciones: numericFormatter((r?.deducciones || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                    estimado: numericFormatter((r?.estimado || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                    ahorro: numericFormatter((r?.ahorro || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                }
                            })}
                        />
                    </Grid> : null}
                    {dataAnticipos?.length ? <Grid item xs={12}>
                        <DinamicTableMejorada
                            flex
                            key={'anticipos'}
                            titulo={'Relación de anticipos por contratista'}
                            data={dataAnticipos.map((r: any) => {
                                return {
                                    obra: r?.obra,
                                    id_contrato: r?.id_contrato,
                                    contrato: r?.contrato,
                                    contratista: r?.contratista,
                                    anticipo: numericFormatter((r?.total_anticipos || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                }
                            })}
                        />
                    </Grid> : null}
                    {dataDeductivas?.length ? <Grid item xs={12}>
                        <DinamicTableMejorada
                            key={'deductivas'}
                            titulo={'Relación de contratos con deductivas'}
                            verDetalleNewDashbaord
                            actions
                            enAccion={(action, row) => {
                                if (action === 'ver_detalle') {
                                    handleClickDeductivas(row);
                                }
                            }}
                            columnsToShow={['contrato', 'id_contrato', 'moneda', 'tipo_cambio', 'anticipo', 'deductiva', 'deductiva_tipo_cambio', 'fondo_garantia', 'resultado']}
                            data={dataDeductivas.map((r: any) => {
                                return {
                                    id: r?.id,
                                    contrato: r?.contrato,
                                    id_contrato: r.id_contrato,
                                    moneda: r?.moneda,
                                    tipo_cambio: numericFormatter((r?.tipo_cambio || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                    anticipo: numericFormatter((r?.anticipo || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                    deductiva: numericFormatter((r?.deductiva || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                    deductiva_tipo_cambio: numericFormatter((r?.deductiva_tipo_cambio || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                    fondo_garantia: numericFormatter((r?.fondo_garantia || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                    resultado: numericFormatter((r?.resultado || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })
                                }
                            })}
                        />
                    </Grid> : null}
                    {dataFondoGarantia?.length ? <Grid item xs={12}>
                        <DinamicTableMejorada
                            flex
                            key={'fodo_gtia'}
                            titulo={'Relación de contratos fondo de garantía'}
                            verDetalleNewDashbaord
                            actions
                            enAccion={(action, row) => {
                                if (action === 'ver_detalle') {
                                    handleClickDetalleFondoGarantia(row)
                                }
                            }}
                            columnsToShow={['id_contrato', 'contrato', 'contratista', 'importe_contratado', 'fondo_grantia']}
                            data={dataFondoGarantia.map((r: any) => {
                                return {
                                    id: r?.id,
                                    id_contrato: r?.id_contrato,
                                    contrato: r?.contrato,
                                    contratista: r?.contratista,
                                    importe_contratado: numericFormatter((r?.importe || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                    fondo_grantia: numericFormatter((r?.fondo_garantia || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                }
                            })}
                        />
                    </Grid> : null}
                    {dataEstimacionesProceso?.length ? <Grid item xs={12}>
                        <DinamicTableMejorada
                            flex
                            key={'estimaciones_proceso'}
                            titulo='Estimaciones en proceso'
                            data={dataEstimacionesProceso.map((r: any) => {
                                return {
                                    contrato: r?.contrato,
                                    contratista: r?.contratista,
                                    numero_estimacion: r?.numero_estimacion,
                                    importe: numericFormatter((r?.importe || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                    estatus: r?.estatus,
                                }
                            })}
                        />
                    </Grid> : null}
                    {dataPendientesContabilizar?.length ? <Grid item xs={12}>
                        <DinamicTableMejorada
                            flex
                            titulo={'Pendientes de contabilizar'}
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
                                    id: r?.id,
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
                            <Grid container spacing={2} >
                                <Grid item xs={4} style={{ textAlign: 'center' }}>
                                    <Card>
                                        <CardContent>
                                            <p><strong>Contratos con OENE</strong></p>
                                            <p>{dataOneClick?.contratos_con_one?.datadato}</p>
                                            <Button variant="primary" style={{ cursor: 'pointer' }} disabled={dataOneClick?.contratos_con_one?.datadato === 0} onClick={() => {
                                                setProcesando(true)
                                                setDataOneClickData(dataOneClick?.contratos_con_one?.data);
                                                setDataOneClickDataTipo('contratos_con_one');
                                                setTimeout(() => setProcesando(false), 1000)
                                            }}><small>Ver detalle</small></Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={4} style={{ textAlign: 'center' }}>
                                    <Card>
                                        <CardContent>
                                            <p><strong>Avance ejecutado 2+semanas</strong></p>
                                            <p>{dataOneClick?.avance_ejecutado_2_semanas?.datadato}</p>
                                            <Button variant="primary" style={{ cursor: 'pointer' }} disabled={dataOneClick?.avance_ejecutado_2_semanas?.datadato === 0} onClick={() => {
                                                setProcesando(true)
                                                setDataOneClickData(dataOneClick?.avance_ejecutado_2_semanas?.data)
                                                setDataOneClickDataTipo('avance_ejecutado_2_semanas');
                                                setTimeout(() => setProcesando(false), 1000)
                                            }}><small>Ver detalle</small></Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={4} style={{ textAlign: 'center' }}>
                                    <Card>
                                        <CardContent>
                                            <p><strong>OENE por responsables</strong></p>
                                            <p>{dataOneClick?.responsables?.datadato}</p>
                                            <Button variant="primary" style={{ cursor: 'pointer' }} disabled={dataOneClick?.responsables?.datadato === 0} onClick={() => {
                                                setProcesando(true)
                                                setDataOneClickData(dataOneClick?.responsables?.data);
                                                setDataOneClickDataTipo('responsables');
                                                setTimeout(() => setProcesando(false), 1000)
                                            }}><small>Ver detalle</small></Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={4} style={{ textAlign: 'center' }}>
                                    <Card>
                                        <CardContent>
                                            <p><strong>OENE pendiente confirmación</strong></p>
                                            <p>{dataOneClick?.oene_pendiente_confirmacion?.datadato}</p>
                                            <Button variant="primary" style={{ cursor: 'pointer' }} disabled={dataOneClick?.oene_pendiente_confirmacion?.datadato === 0} onClick={() => {
                                                setProcesando(true);
                                                setDataOneClickData(dataOneClick?.oene_pendiente_confirmacion?.data);
                                                setDataOneClickDataTipo('oene_pendiente_confirmacion');
                                                setTimeout(() => setProcesando(false), 1000)
                                            }}><small>Ver detalle</small></Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={4} style={{ textAlign: 'center' }}>
                                    <Card>
                                        <CardContent>
                                            <p><strong>OENE pendiente documentación</strong></p>
                                            <p>{dataOneClick?.oene_pendiente_documentacion?.datadato}</p>
                                            <Button variant="primary" style={{ cursor: 'pointer' }} disabled={dataOneClick?.oene_pendiente_documentacion?.datadato === 0} onClick={() => {
                                                setProcesando(true);
                                                setDataOneClickData(dataOneClick?.oene_pendiente_documentacion?.data);
                                                setDataOneClickDataTipo('oene_pendiente_documentacion');
                                                setTimeout(() => setProcesando(false), 1000)
                                            }}><small>Ver detalle</small></Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={4} style={{ textAlign: 'center' }}>
                                    <Card>
                                        <CardContent>
                                            <p><strong>OENE confirmada pendiente de documentación</strong></p>
                                            <p>{dataOneClick?.oene_confirmada_pendiente_documentacion?.datadato}</p>
                                            <Button variant="primary" style={{ cursor: 'pointer' }} disabled={dataOneClick?.oene_confirmada_pendiente_documentacion?.datadato === 0} onClick={() => {
                                                setProcesando(true)
                                                setDataOneClickData(dataOneClick?.oene_confirmada_pendiente_documentacion?.data);
                                                setDataOneClickDataTipo('oene_confirmada_pendiente_documentacion');
                                                setTimeout(() => setProcesando(false), 1000)
                                            }}><small>Ver detalle</small></Button>
                                        </CardContent>
                                    </Card>
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
                                        data={(dataOneClick?.[dataOneClickDataTipo]?.data || []).map((r: any) => {
                                            return {
                                                id: r?.id,
                                                id_contrato: r?.id_contrato,
                                                contratista: r?.contratista,
                                                importe: numericFormatter((r?.importe || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                                oene: numericFormatter((r?.oene || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                            }
                                        })} /> : null}
                            </Grid> : procesando ? <Grid item xs={12} style={{ textAlign: 'center' }}><br></br><br></br><CircularProgress color="inherit" /> </Grid> : null}
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
                                                                            /> : procesando ? null : null
                                                                    }
                                                                </Grid>
                                                            </Grid>
                                                        </CustomTabPanel>
                                                    </>
                                                );
                                            })
                                        }
                                    </Box>
                                </Grid> : procesando ? <Grid item xs={12} style={{ textAlign: 'center' }}><br></br><br></br><CircularProgress color="inherit" /> </Grid> : null}
                        </Grid>
                        : null}
                </Grid>
            </ModalComponent>

            <ModalComponent handleClose={handleisAlerCloseDetalleDetalle} isOpen={isAlertOpenDetalleDetalle} key={'alerta_dos'} size={'xl'}>
                <Grid container spacing={2} >
                    {dataDeductivasDetalle?.length ? <Grid item xs={12}>
                        <DinamicTableMejorada
                            flex
                            key={'reclasificaciones'}
                            titulo={'Estimaciones con deductivas'}
                            data={dataDeductivasDetalle.map((r: any) => {
                                return {
                                    contrato: r?.id_contrato,
                                    contratista: r?.contratista,
                                    numero_estimacion: r?.numero_estimacion,
                                    importe: numericFormatter((r?.importe || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                    deductiva: numericFormatter((r?.total_deducciones || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })
                                }
                            })}
                        />
                    </Grid> : null}
                    {dataFondoGarantiaDetalle?.length ? <Grid item xs={12}>
                        <DinamicTableMejorada
                            flex
                            key={'reclasificaciones'}
                            titulo={'Estimaciones con fondo de garantia'}
                            data={dataFondoGarantiaDetalle.map((r: any) => {
                                return {
                                    contrato: r?.id_contrato,
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
                                    contrato: r?.id_contrato,
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


            <ModalComponent handleClose={handleisAlerCloseDashboardContratos} isOpen={isAlertOpenDashboardContratos} key={'alerta_dashboard_contratos'} size={'xl'}>
                {dataDetalleDashboardContratos?.length ? <Grid item xs={12}>
                    <DinamicTableMejorada
                        esDetalleOeneUno
                        key={'detalle_'}
                        titulo={tituloTabla}
                        data={dataDetalleDashboardContratos}
                    />
                </Grid> : null}
            </ModalComponent>
            <ModalComponent handleClose={handleisAlerCloseDetalleOne} isOpen={isAlertOpenDetalleOne} key={'alerta_dashboard_contratos_oenbe'} size={'xl'} esFullScreen>
                <Grid container >
                    <Grid item xs={12} style={{ textAlign: 'center' }} >
                        <h5>Detalle OENE (Obra ejecutada no estimada )</h5>
                    </Grid>
                    <Grid item xs={12} style={{ width: '100vw', height: '90vh' }} >
                        <AmchartsOENE dataOneClick={dataOneClick} enSeleccion={(d) => {
                            setDataOneClickData(d?.data)
                            setDataOneClickDataTipo(d?.keys === 3 ? 'responsables' : 'normal')
                        }} />
                    </Grid>
                    <Grid item xs={12} >
                        {dataOneClickDataTipo !== '' && dataOneClickDataTipo === 'responsables' ?
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <Box sx={{ width: '100%' }}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs value={valueTercero} onChange={handleChangeTercero} aria-label="basic tabs example">
                                            {
                                                dataOneClickData.map((r: any, key: any) => {
                                                    return (<Tab label={r?.nombre} key={r?.nombre + '_t3'} {...a11yProps(key)} />);
                                                })
                                            }
                                        </Tabs>
                                    </Box>
                                    {
                                        dataOneClickData.map((r: any, key: any) => {
                                            return (
                                                <>
                                                    <CustomTabPanel value={valueTercero} index={key} key={r?.usuario + '_t3.1'}>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12}>
                                                                {
                                                                    (r?.one || [])?.length && !procesando ?
                                                                        <DinamicTableMejorada
                                                                            flex
                                                                            data={(r?.one || []).map((r: any) => {
                                                                                return {
                                                                                    ...r,
                                                                                    ...{
                                                                                        oene: numericFormatter((r?.oene || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                                                                        importe: numericFormatter((r?.importe || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })
                                                                                    }
                                                                                }
                                                                            })}
                                                                        /> : procesando ? <CircularProgress color="inherit" /> : 'Sin resultados'
                                                                }
                                                            </Grid>
                                                        </Grid>
                                                    </CustomTabPanel>
                                                </>
                                            );
                                        })
                                    }
                                </Box>
                            </Grid> : procesando ?
                                <Grid item xs={12} style={{ textAlign: 'center' }}>
                                    <br></br><br></br><CircularProgress color="inherit" />
                                </Grid> : null
                        }
                        {dataOneClickDataTipo !== '' && dataOneClickDataTipo === 'normal' ?
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    {
                                        (dataOneClickData || [])?.length && !procesando ?
                                            <DinamicTableMejorada
                                                flex
                                                data={(dataOneClickData || []).map((r: any) => {
                                                    return {
                                                        ...r,
                                                        ...{
                                                            oene: numericFormatter((r?.oene || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }),
                                                            importe: numericFormatter((r?.importe || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })
                                                        }
                                                    }
                                                })}
                                            /> : procesando ? <CircularProgress color="inherit" /> : 'Sin resultados'
                                    }
                                </Grid>
                            </Grid> : null
                        }
                    </Grid>
                </Grid>
            </ModalComponent>
        </Grid>
    )
}


export default InicioNewDashboardInfo;