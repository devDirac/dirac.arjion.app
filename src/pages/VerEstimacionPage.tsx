import { Alert, Backdrop, CircularProgress, Grid } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useMaterialUIController } from 'context';
import DashboardLayout from '../examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from '../examples/Navbars/DashboardNavbar';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import ModalComponent from '../componets/Modal';
import "./styles.scss";
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { useLocation, useNavigate } from 'react-router-dom';
import { StoreType } from '../types/geericTypes';
import { setAhut } from '../actions/auth';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CaratulaEstimacionInfo from '../componets/CaratulaEstimacionForm/CaratulaEstimacionInfo';
import DinamicTable from '../componets/DinamicTable';
import { autorizarEstimacionHttp, getDeduccionesConceptosHttp, getDeductivasAdicionalesEstimacionHttp, getDocumentosEstimacionHttp, getListaEstimacionDetalleDefinitivasHttp, rechazarEstimacionHttp } from '../actions/estimaciones';
import { getErrorHttpMessage } from '../utils';
import { numero2word } from '../utils/numeros_a_letras';
import { numericFormatter } from 'react-number-format';
import { Button, ButtonGroup } from 'react-bootstrap';
import { perfilContext } from '../context/perfilContexto';
import ModalConfirm from '../componets/ModalConfirm/ModalConfirm';
import DinamicTableMejorada from '../componets/DinamicTableMejorada/DinamicTableMejorada';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: Readonly<TabPanelProps>) {
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

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const VerEstimacionPage: React.FC = () => {
    const intl = useIntl();
    const perfil = useContext(perfilContext);
    const contrato = useSelector((state: any) => state?.app?.contrato || null);
    const [openModalConfirmRechazo, setOpenModalConfirmRechazo] = useState(false);
    const [openModalConfirmAutoriza, setOpenModalConfirmAutoriza] = useState(false);
    const [textModalConfirm, setTextModalConfirm] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [procesando, setProcesando] = useState<boolean>(false);
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const [data, setData] = useState<any[]>([]);
    const [documentos, setDocumentos] = useState<any[]>([]);
    const [deductivasAdicionales, setDeductivasAdicionales] = useState<any[]>([]);
    const [deduccionesConceptos, setDeduccionesConceptos] = useState<any[]>([]);
    const [exitoAutorizaRechaza, setExitoAutorizaRechaza] = useState<boolean>(false);
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => {
        setIsAlertOpen(false);
        if (exitoAutorizaRechaza) {
            navigate('/relacion-estimaciones');
        }
    };
    const token = useSelector((state: StoreType) => state?.app?.user?.token ?? '');

    useEffect(() => {
        setAhut(token);
    }, [token]);

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const getEstimacionesDefinitivas = useCallback(async () => {
        try {
            setProcesando(true);
            const data = await getListaEstimacionDetalleDefinitivasHttp(location?.state?.id);
            setData(data);
            setProcesando(false);
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message);
            setProcesando(false);
            handleisAlertOpen();
        }
    }, [location?.state?.id]);

    useEffect(() => {
        getEstimacionesDefinitivas();
    }, [getEstimacionesDefinitivas]);

    const getDocumentosEstimaciones = useCallback(async () => {
        try {
            setProcesando(true);
            const data = await getDocumentosEstimacionHttp(location?.state?.id);
            setDocumentos(data);
            setProcesando(false);
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message);
            setProcesando(false);
            handleisAlertOpen();
        }
    }, [location?.state?.id]);

    useEffect(() => {
        getDocumentosEstimaciones();
    }, [getDocumentosEstimaciones]);

    const getEstimacionesAdicionales = useCallback(async () => {
        try {
            setProcesando(true);
            const data = await getDeductivasAdicionalesEstimacionHttp(location?.state?.id);
            setDeductivasAdicionales(data);
            setProcesando(false);
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message);
            setProcesando(false);
            handleisAlertOpen();
        }
    }, [location?.state?.id]);

    useEffect(() => {
        getEstimacionesAdicionales();
    }, [getEstimacionesAdicionales]);


    const getDeduccionesConceptos = useCallback(async () => {
        try {
            setProcesando(true);
            const data = await getDeduccionesConceptosHttp(location?.state?.id);
            setDeduccionesConceptos(data);
            setProcesando(false);
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message);
            setProcesando(false);
            handleisAlertOpen();
        }
    }, [location?.state?.id]);

    useEffect(() => {
        getDeduccionesConceptos();
    }, [getDeduccionesConceptos]);

    const handleAutorizarPregunta = () => {
        setOpenModalConfirmAutoriza(true);
        setTextModalConfirm('¿Desea autorizar esta estimación?');
    }

    const handleAutorizar = async (comentario: string) => {
        setOpenModalConfirmAutoriza(false);
        try {
            setProcesando(true);
            await autorizarEstimacionHttp({ ...{ id: location?.state?.id, comentario } });
            setExitoAutorizaRechaza(true);
            setMensajeAlert('Exito al autorizar estimación');
            setProcesando(false);
            handleisAlertOpen();
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || 'Error al autorizar estimación');
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const handleRechazarPregunta = () => {
        setOpenModalConfirmRechazo(true);
        setTextModalConfirm('¿Desea rechazar esta estimación?');
    }

    const handleRechazar = async (comentario: string) => {
        setOpenModalConfirmRechazo(false);
        try {
            setProcesando(true);
            await rechazarEstimacionHttp({ ...{ id: location?.state?.id, comentario } });
            setExitoAutorizaRechaza(true);
            setMensajeAlert('Exito al rechazar estimación');
            setProcesando(false);
            handleisAlertOpen();
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || 'Error al rechazar estimación');
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container justifyContent="center" alignItems="center" sx={{ height: "100%", }} style={darkMode ? { backgroundColor: '#1f283e', padding: '25px' } : { backgroundColor: '#fff', padding: '25px' }}>
                {
                    location?.state?.id_estatus === 4 && perfil === 1 ?
                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                            <ButtonGroup>
                                <Button
                                    variant="primary"
                                    onClick={(e: any) => {
                                        handleAutorizarPregunta();
                                    }}
                                >
                                    Autorizar
                                </Button>
                                <Button
                                    variant="warning"
                                    onClick={(e: any) => {
                                        handleRechazarPregunta()
                                    }}
                                >
                                    Rechazar
                                </Button>
                            </ButtonGroup>
                        </Grid> :
                        null
                }
                {
                    location?.state?.id_estatus === 5 ?
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="warning">
                            La estimación fue rechazada.
                        </Alert>
                        :
                        null
                }
                {
                    location?.state?.id_estatus === 6 ?
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                            La estimación fue autorizada
                        </Alert>

                        : null
                }
                {
                    location?.state?.id_estatus === 7 ?
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="info">
                            La estimación fue enviada en un paquete generado
                        </Alert>
                        : null
                }
                <Grid item xs={12}>
                    <CaratulaEstimacionInfo darkMode={darkMode} item={
                        {
                            importe_estaEstimacion:data?.[0]?.importe_estaEstimacion,
                            numEstimacionDefinitiva: location?.state?.numero_estimacion,
                            fechaEstDefinitiva: location?.state?.fecha_est_definitiva,
                            cliente: data?.[0]?.cliente,
                            contratista: data?.[0]?.contratista,
                            origenRecursos: data?.[0]?.oficina_pagadora,
                            moneda: contrato?.moneda === 1 ? 'M.N' : contrato?.moneda === 2 ? 'Dolares' : 'Euros',
                            periodo: location?.state?.periodo ? location?.state?.periodo : location?.state?.fecha_inicio + ' al ' + location?.state?.fecha_fin,
                            contratoNumero: data?.[0]?.id_contrato,
                            descripcionContrato: data?.[0]?.contrato,
                            importeContratado: numericFormatter((data?.[0]?.importe || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' }),
                            acumuladoAnterior: numericFormatter((data?.[0]?.acumuladoAnterior || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' }),
                            estaEstimacion: numericFormatter((data?.[0]?.importe_estaEstimacion || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' }),
                            acumuladoActual: numericFormatter((+data?.[0]?.acumuladoAnterior || 0) + (+data?.[0]?.importe_estaEstimacion || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' }),
                            saldo: numericFormatter((+data?.[0]?.importe || 0) - ((+data?.[0]?.acumuladoAnterior || 0) + (+data?.[0]?.importe_estaEstimacion || 0)) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' }),
                            deduccionEstimacion: numericFormatter(data?.[0]?.deducciones + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' }),
                            amortizacion: numericFormatter(data?.[0]?.amortizacion + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' }),
                            subtotal: numericFormatter(data?.[0]?.subtotal + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' }),
                            impuestoIva: numericFormatter(data?.[0]?.impuesto_iva + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' }),
                            subTotal2: numericFormatter((+data?.[0]?.subtotal || 0) + (+data?.[0]?.impuesto_iva || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' }),
                            devolucionRetencion: numericFormatter((+data?.[0]?.total_deducciones) / ((+data?.[0]?.subtotal || 0) + (+data?.[0]?.impuesto_iva || 0)) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' }),
                            retencion: numericFormatter((+data?.[0]?.total_deducciones)+((+data?.[0]?.fondoGarantia) * (+('0.'+data?.[0]?.iva_aplicado_editado || 0))) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' }),
                            cargosAdicionales: numericFormatter((+data?.[0]?.cargosAdicionales) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' }),
                            saldoPagarEstimacionActual: numericFormatter((+data?.[0]?.alcance_liquido) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' }),
                            importePagar: numericFormatter((+data?.[0]?.alcance_liquido) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' }),

                            anticipo: numericFormatter((+data?.[0]?.anticipo) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' }),
                            amortizacionAcumuladoAnterior: numericFormatter((+data?.[0]?.amortizacionesAnteriores) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' }),
                            amortizacionActual: numericFormatter((+data?.[0]?.amortizacionActual) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' }),
                            anticipoAcumulado: numericFormatter(((+data?.[0]?.amortizacionesAnteriores || 0) + (+data?.[0]?.amortizacionActual || 0)) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' }),
                            saldoPorAmortizar: numericFormatter(((   ((data?.[0]?.anticipo || 0)/100)*(data?.[0]?.importe || 0)    ) - ((+data?.[0]?.amortizacionesAnteriores || 0) + (+data?.[0]?.amortizacionActual || 0)))  + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' }),
                            fondoGarantia: numericFormatter(data?.[0]?.fondoGarantia + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' }),
                            fondoGarantiaAnterior: numericFormatter(data?.[0]?.fondoGarantiaAcumulado + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' }),
                            fondoGarantiaAcumulado: numericFormatter(((+data?.[0]?.fondoGarantia || 0) + (+data?.[0]?.fondoGarantiaAcumulado || 0)) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' }),
                            ivaRetencion: numericFormatter(((+data?.[0]?.fondoGarantia) * (+('0.'+data?.[0]?.iva_aplicado_editado || 0))) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' }),
                            ivaCargosAdicionales: numericFormatter(((+data?.[0]?.cargosAdicionales || 0) * (+('0.'+data?.[0]?.iva_aplicado_editado || 0))) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' }),

                            cifraTexto: numero2word(data?.[0]?.alcance_liquido).toString(),
                            alcanceLiquido:data?.[0]?.alcance_liquido+''
                        }
                    } />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label={intl.formatMessage({ id: "ver_estimacion_tab_1_conceptos_estimados" })} {...a11yProps(0)} />
                                <Tab label={intl.formatMessage({ id: "ver_estimacion_tab_2_documentos_cargados_estimacion" })} {...a11yProps(1)} />
                                <Tab label={intl.formatMessage({ id: "ver_estimacion_tab_4_deductivas" })} {...a11yProps(2)} />
                                <Tab label={intl.formatMessage({ id: "ver_estimacion_tab_5_deductivas_adicionales" })} {...a11yProps(3)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <Grid container spacing={2}>
                                <Grid item xl={12} style={{ textAlign: 'center' }}>
                                    {data?.length ? <DinamicTableMejorada
                                    flex
                                    onValueVolumen={()=>{}}
                                        data={(data?.[0]?.elementosEstimar || []).map((e: any) => {
                                            return {
                                                id_concepto: e?.concepto,
                                                descripcion: e?.concepto_descripcion,
                                                volumen_estimado: e?.volumen_estimar,
                                                volumen_acumulado_anterior: e?.volumenAcumuladoAnterior,
                                                volumen_acumulado_actial: e?.volumenAcumuladoActual,
                                                precio: e?.precio_unitario,
                                                importe: e?.importe,
                                                importeAcumuladoAnterior: e?.importeAcumuladoAnterior,
                                                importeAcumuladoActual: e?.importeAcumuladoActual,
                                                comentarios_estimacion: e?.comentario,
                                            }
                                        })}
                                    /> : <p>Sin registros</p>}
                                </Grid>
                            </Grid>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <Grid container spacing={2}>
                                <Grid item xl={12} style={{ textAlign: 'center' }}>
                                    {documentos?.length ? <DinamicTable
                                        data={documentos}
                                    /> : <p>Sin registros</p>}
                                </Grid>
                            </Grid>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <Grid container spacing={2}>
                                <Grid item xl={12} style={{ textAlign: 'center' }}>
                                    {deduccionesConceptos?.length ? <DinamicTable
                                        data={deduccionesConceptos}
                                    /> : <p>Sin registros</p>}
                                </Grid>
                            </Grid>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3}>
                            <Grid container spacing={2}>
                                <Grid item xl={12} style={{ textAlign: 'center' }}>
                                    {deductivasAdicionales.length ? <DinamicTable
                                        data={deductivasAdicionales}
                                    /> : <p>Sin registros</p>}
                                </Grid>
                            </Grid>
                        </CustomTabPanel>
                    </Box>
                </Grid>
            </Grid>
            <ModalComponent handleClose={handleisAlerClose} isOpen={isAlertOpen} key={'alerta'}>
                <Grid container spacing={2} style={{ textAlign: 'center' }}>
                    <Grid item xs={12}>
                        <br></br>
                        <br></br>
                        <p>{mensajeAlert}</p>
                    </Grid>
                </Grid>
            </ModalComponent>
            <Backdrop className='BackdropClass' open={procesando}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <ModalConfirm key='confirmaRechazo' esCambioEstatusEstimacion onAcept={(comentario) => {
                handleRechazar(comentario || '');
            }} onCancel={() => {
                setOpenModalConfirmRechazo(false);
                setTextModalConfirm('');
            }} open={openModalConfirmRechazo} text={textModalConfirm} title={''} />

            <ModalConfirm key='confirmaAutorizacion' esCambioEstatusEstimacion onAcept={(comentario) => {
                handleAutorizar(comentario || '');
            }} onCancel={() => {
                setOpenModalConfirmAutoriza(false);
                setTextModalConfirm('');
            }} open={openModalConfirmAutoriza} text={textModalConfirm} title={''} />
        </DashboardLayout>
    )
}

export default VerEstimacionPage


