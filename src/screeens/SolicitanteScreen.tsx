import { Backdrop, Box, Button, Card, CardContent, CircularProgress, Divider, Grid, Tab, Tabs, Typography } from '@mui/material';
import * as Yup from "yup";
import AppAppBarC from '../componets/Carrusel/AppAppBarC';
import env from "react-dotenv";
import ModalComponent from '../componets/Modal';
import React, { useCallback, useEffect, useState } from 'react';
import ComplexStatisticsCard from '../examples/Cards/StatisticsCards/ComplexStatisticsCard';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import DinamicTableMejorada from '../componets/DinamicTableMejorada/DinamicTableMejorada';
import SolicitudCard from '../componets/SolicitudCard/SolicitudCard';
import TimelineList from '../examples/Timeline/TimelineList';
import TimelineItem from '../examples/Timeline/TimelineItem';
import DragAndDropField from '../componets/DragAndDropField';
import { GacUserQueryParamsContext } from '../context/GacUserQueryParamsContexto';
import { groupByProperty } from '../utils';
import DateRangePickerFiltro from '../componets/DateRangePickerFiltro/DateRangePickerFiltro';
import ColumnasChartGac from '../componets/Amcharts/ColumnasChartGac';
import PieChart from '../componets/Amcharts/pieChart';
import FilterListIcon from '@mui/icons-material/FilterList';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { useNavigate } from 'react-router-dom';
import { generarZipSolicitudHttp } from '../actions/solicitud';
import SelectMultipleAutoCompleteField from '../componets/SelectMultipleAutoCompleteField/SelectMultipleAutoCompleteField';
import { FormikProvider, useFormik } from 'formik';
import { Form } from 'react-bootstrap';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
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
const SolicitanteScreen: React.FC = () => {
    const navigate = useNavigate();
    const perfil = React.useContext(GacUserQueryParamsContext);
    /* Para el tab */
    const [value, setValue] = React.useState(0);
    /* Para la data de las solicitudes */
    const [data, setData] = useState([]);
    
    const [dataTodasPerfil, setDataTodasPerfil] = useState<any>([]);
    const [dataTodas, setDataTodas] = useState<any>([]);

    const [dataTodasPerfilMuestra, setDataTodasPerfilMuestra] = useState<any>([]);
    const [dataTodasMuestra, setDataTodasMuestra] = useState<any>([]);

    const [dataPie, setDataPie] = useState([]);

    /* Para el filtro por fecha */
    const [tipo, setTipo] = useState('todas');
    /* // Estado para saber si el DatePicker está abierto o cerrado */
    const [isOpen, setIsOpen] = useState(false);
    /* Para el detalle del tipo de solicitud */
    const [itemDetalle, setItemDetalle] = useState<any>([]);
    /* Detalle de la solicitud */
    const [item, setItem] = useState<any>(null);
    const [itemId, setItemId] = useState<any>(null);
    /* Para el loader */
    const [procesando, setProcesando] = useState<any>()
    /* Modal mensajes generales */
    const [mensajeAlert, setMensajeAlert] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);
    /* Modal DETALLE DE SOLICITUDES */
    const [isAlertOpenDetalle, setIsAlertOpenDetalle] = useState(false);
    const handleisAlertOpenDetalle = () => setIsAlertOpenDetalle(true);
    const handleisAlerCloseDetalle = () => setIsAlertOpenDetalle(false);
    /* Modal DETALLE DE una solicitud en particular */
    const [isAlertOpenDetalleSolicitud, setIsAlertOpenDetalleSolicitud] = useState(false);
    const handleisAlertOpenDetalleSolicitud = () => setIsAlertOpenDetalleSolicitud(true);
    const handleisAlerCloseDetalleSolicitud = () => setIsAlertOpenDetalleSolicitud(false);

    /* Filtros  */
    const [tipoSolicitud, setTipoSolicitud] = useState<any>([]);
    const [proyecto, setProyecto] = useState<any>([]);
    const [empresa, setEmpresa] = useState<any>([]);
    const [banco, setBanco] = useState<any>([]);
    const [concepto, setConcepto] = useState<any>([]);
    const [estatus, setEstatus] = useState<any>([]);
    const [moneda, setMoneda] = useState<any>([]);
    const [formaPago, setFormaPago] = useState<any>([]);


    const filtrarDatos = useCallback(() => {
        const filtros: any = {
            id_tipo_solicitud: tipoSolicitud.map((r:any)=> r?.value),
            id_proyecto: proyecto.map((r:any)=> r?.value),
            id_empresa: empresa.map((r:any)=> r?.value),
            banco: banco.map((r:any)=> r?.value),
            id_concepto: concepto.map((r:any)=> r?.value),
            id_estatus: estatus.map((r:any)=> r?.value),
            id_moneda: moneda.map((r:any)=> r?.value),
            id_forma_pago: formaPago.map((r:any)=> r?.value)
        };
        const respuestaFiltrada = (tipo === 'todas' ? dataTodasPerfil : perfil?.solicitudes || []).filter((item: any) => {
            return Object.keys(filtros).every(key => {
                if (!filtros[key] || filtros[key].length === 0) return true;
                return filtros[key].includes(item[key]);
            });
        });
        const resultadoestatus: any = groupByProperty(respuestaFiltrada, 'solicita');
        if(tipo === 'todas'){
            setDataTodasPerfilMuestra(respuestaFiltrada);
            setDataTodasMuestra(resultadoestatus);
        }else{
            const resultado: any = groupByProperty(respuestaFiltrada, tipo);
            setData(resultado);

            const sumaTotalPesos = (resultado || []).reduce((a: any, c: any) => { return a + (+c?.suma_importe_en_pesos) }, 0)
            const dataPieResult = resultado.map((r: any) => {
                return {
                    category: r?.[tipo],
                    value: ((r?.suma_importe_en_pesos / sumaTotalPesos) * 100),
                    valor: r?.suma_importe_en_pesos
                }
            });
            setDataPie(dataPieResult);

        }
    }, [tipo, tipoSolicitud,proyecto, empresa, banco, concepto, estatus, moneda, formaPago, dataTodasPerfil])

    const setDashboard = useCallback(() => {
        const resultado: any = groupByProperty(perfil?.solicitudes || [], tipo);
        setData(resultado);
        const resultadoestatus: any = groupByProperty(perfil?.solicitudes || [], 'solicita');
        setDataTodas(resultadoestatus);
        setDataTodasPerfil(perfil?.solicitudes || [])

        /* Para mostrar en el dashboard */
        setDataTodasMuestra(resultadoestatus)
        setDataTodasPerfilMuestra(perfil?.solicitudes || [])

        const sumaTotalPesos = (resultado || []).reduce((a: any, c: any) => { return a + (+c?.suma_importe_en_pesos) }, 0)
        const dataPieResult = resultado.map((r: any) => {
            return {
                category: r?.[tipo],
                value: ((r?.suma_importe_en_pesos / sumaTotalPesos) * 100),
                valor: r?.suma_importe_en_pesos
            }
        });
        setDataPie(dataPieResult);
        filtrarDatos()
    }, [perfil, tipo, filtrarDatos]);

    useEffect(() => {
        setDashboard();
    }, [setDashboard, tipo]);

    const filterByDateRange = (data_: any, dateRange: any) => {
        console.log(data_)
        if (!dateRange) {
            setDashboard();
            return false;
        }
        const [startDate, endDate] = dateRange.map((date: any) => new Date(date));
        const a = data_.filter((item: any) => {
            const itemDate = new Date(item.fecha_solicitud);
            return itemDate >= startDate && itemDate <= endDate;
        });
        const resultado: any = tipo === 'todas' ? a : groupByProperty(a, tipo);
        if(tipo === 'todas'){
            const resultadoestatus: any = groupByProperty(resultado || [], 'solicita');
            setDataTodasMuestra(resultadoestatus)
            setDataTodasPerfilMuestra(resultado)
        }else{
            setData(resultado)
            const sumaTotalPesos = (resultado || []).reduce((a: any, c: any) => { return a + (+c?.suma_importe_en_pesos) }, 0)
            const dataPieResult = resultado.map((r: any) => {
                return {
                    category: r?.[tipo],
                    value: ((r?.suma_importe_en_pesos / sumaTotalPesos) * 100),
                    valor: r?.suma_importe_en_pesos
                }
            });
            setDataPie(dataPieResult);
        }
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(newValue,  tipo)
        setValue(tipo === 'todas' && newValue === 1 ? 2 : newValue);
    };

    const handleDescargaZip = async (sol: any) => {
        try {
            setProcesando(true);
            const resDocZip = await generarZipSolicitudHttp({ id_solicitud: sol?.id });
            console.log(resDocZip)
            window.open(`${env.API_URL_DOCUMENTOS}${resDocZip}`);
            setProcesando(false);
            setMensajeAlert('Exito al descargar los documentos')
            handleisAlertOpen()
        } catch (error) {
            setProcesando(false);
            setMensajeAlert('Error al descargar los documentos')
            handleisAlertOpen()
        }
    }

    const esMiTurno = (arr: any, idUsuario: any) => {
        for (const item of arr) {
            if (item.id_usuario === idUsuario && (item.autorizo === null || item.autorizo === false)) {
                return 'si';
            }
        }
    }

    const miTurnoDos = (faltanAutorizadores: any, sol: any) => {
        if (!faltanAutorizadores?.length) {
            /* Turno autorizador */
            if (perfil?.esAutorizador && sol?.id_usuario_autorizador === null) {
                return 'si';
            }
            if (perfil?.esAutorizador && sol?.id_usuario_autorizador !== null) {
                /* Turno pagador */
                if ((perfil?.esPagador && sol?.id_usuario_pagada === null) && (sol?.id_usuario_revisor !== null && sol?.id_usuario_autorizador !== null)) {
                    return 'si';
                }
                if (perfil?.esPagador && sol?.id_usuario_pagada !== null) {
                    return 'no';
                }
                return 'no';
            }
            /* Turno revisores */
            if (perfil?.esRevisor && sol?.id_usuario_revisor === null && sol?.id_usuario_autorizador !== null && (sol?.documentos || [])?.length) {
                return 'si';
            }
            if (perfil?.esRevisor && sol?.id_usuario_revisor !== null || (perfil?.esRevisor && sol?.id_usuario_revisor === null && sol?.id_usuario_autorizador === null)) {
                return 'no';
            }
        }
    }


    const formik = useFormik({
        initialValues: {
            tipo_solicitud: []
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            tipo_solicitud: Yup.array()
        }),
    });

    useEffect(()=>{
        filtrarDatos()
    },[tipo,tipoSolicitud,proyecto, empresa, banco, concepto, estatus, moneda, formaPago])


    return (
        <>
            <AppAppBarC />
            <Grid container style={{ backgroundColor: '#fff', position: 'relative', top: 15, height: 'auto', minHeight: '110vh' }} justifyContent="center">
                <Grid item xs={12} style={{ textAlign: 'center', marginBottom: 15, paddingTop: 15, padding: 25 }}>
                    <Grid container spacing={2}>
                        {/* Seccion de los filtros */}
                        {value !== 2 ? <Grid item xs={12} md={12} style={{ margin: 14 }}>
                            <Card sx={{ position: "relative", p: 2, borderRadius: 2, boxShadow: 3, }} style={{ boxShadow: 'none', border: 'solid 1px rgb(218, 222, 230)' }}>
                                {/* Título en el borde superior */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 16,
                                        transform: "translateY(-50%)",
                                        backgroundColor: "white",
                                        px: 1,
                                        fontWeight: "bold",
                                        background: '#ffff'
                                    }}
                                >
                                    <Typography variant="h6" fontWeight="medium">
                                        Filtros <FilterListIcon />
                                    </Typography>
                                </Box>
                                {/* Contenido del formulario */}
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={7} style={{ textAlign: 'left' }}>
                                            <Button onClick={() => {
                                                setValue(0);
                                                setTipo('todas');
                                                formik.setFieldValue("tipo_solicitud", []);
                                                setTipoSolicitud([]);
                                                formik.setFieldValue("proyecto", []);
                                                setProyecto([]);
                                                formik.setFieldValue("empresa", []);
                                                setEmpresa([]);
                                                formik.setFieldValue("banco", []);
                                                setBanco([]);
                                                formik.setFieldValue("concepto", []);
                                                setConcepto([]);
                                                formik.setFieldValue("estatus", []);
                                                setEstatus([]);
                                                formik.setFieldValue("moneda", []);
                                                setMoneda([]);
                                                formik.setFieldValue("forma_pago", []);
                                                setFormaPago([]);
                                            }}
                                                size="small"
                                                variant="outlined"
                                                style={{ color: tipo === 'todas' ? '#ffff' : '#1A73E8', marginLeft: 5, marginRight: 5, backgroundColor: tipo === 'todas' ? '#1A73E8' : '#fff' }}>
                                                Todas
                                            </Button>
                                            <Button onClick={() => {
                                                setTipo('tipo_solicitud');
                                                formik.setFieldValue("tipo_solicitud", []);
                                                setTipoSolicitud([]);
                                                formik.setFieldValue("proyecto", []);
                                                setProyecto([]);
                                                formik.setFieldValue("empresa", []);
                                                setEmpresa([]);
                                                formik.setFieldValue("banco", []);
                                                setBanco([]);
                                                formik.setFieldValue("concepto", []);
                                                setConcepto([]);
                                                formik.setFieldValue("estatus", []);
                                                setEstatus([]);
                                                formik.setFieldValue("moneda", []);
                                                setMoneda([]);
                                                formik.setFieldValue("forma_pago", []);
                                                setFormaPago([]);
                                            }}
                                                size="small"
                                                variant="outlined"
                                                style={{ color: tipo === 'tipo_solicitud' ? '#ffff' : '#1A73E8', marginLeft: 5, marginRight: 5, backgroundColor: tipo === 'tipo_solicitud' ? '#1A73E8' : '#fff' }}>
                                                Tipo
                                            </Button>
                                            <Button onClick={() => {
                                                setTipo('proyecto');
                                                formik.setFieldValue("tipo_solicitud", []);
                                                setTipoSolicitud([]);
                                                formik.setFieldValue("proyecto", []);
                                                setProyecto([]);
                                                formik.setFieldValue("empresa", []);
                                                setEmpresa([]);
                                                formik.setFieldValue("banco", []);
                                                setBanco([]);
                                                formik.setFieldValue("concepto", []);
                                                setConcepto([]);
                                                formik.setFieldValue("estatus", []);
                                                setEstatus([]);
                                                formik.setFieldValue("moneda", []);
                                                setMoneda([]);
                                                formik.setFieldValue("forma_pago", []);
                                                setFormaPago([]);
                                            }}
                                                size="small"
                                                variant="outlined"
                                                style={{ color: tipo === 'proyecto' ? '#ffff' : '#1A73E8', marginLeft: 5, marginRight: 5, backgroundColor: tipo === 'proyecto' ? '#1A73E8' : '#fff' }}>
                                                Proyecto
                                            </Button>
                                            <Button onClick={() => {
                                                setTipo('empresa');
                                                formik.setFieldValue("tipo_solicitud", []);
                                                setTipoSolicitud([]);
                                                formik.setFieldValue("proyecto", []);
                                                setProyecto([]);
                                                formik.setFieldValue("empresa", []);
                                                setEmpresa([]);
                                                formik.setFieldValue("banco", []);
                                                setBanco([]);
                                                formik.setFieldValue("concepto", []);
                                                setConcepto([]);
                                                formik.setFieldValue("estatus", []);
                                                setEstatus([]);
                                                formik.setFieldValue("moneda", []);
                                                setMoneda([]);
                                                formik.setFieldValue("forma_pago", []);
                                                setFormaPago([]);
                                            }}
                                                size="small"
                                                variant="outlined"
                                                style={{ color: tipo === 'empresa' ? '#ffff' : '#1A73E8', marginLeft: 5, marginRight: 5, backgroundColor: tipo === 'empresa' ? '#1A73E8' : '#fff' }}>
                                                Empresa
                                            </Button>

                                            <Button onClick={() => {
                                                setTipo('banco');
                                                formik.setFieldValue("tipo_solicitud", []);
                                                setTipoSolicitud([]);
                                                formik.setFieldValue("proyecto", []);
                                                setProyecto([]);
                                                formik.setFieldValue("empresa", []);
                                                setEmpresa([]);
                                                formik.setFieldValue("banco", []);
                                                setBanco([]);
                                                formik.setFieldValue("concepto", []);
                                                setConcepto([]);
                                                formik.setFieldValue("estatus", []);
                                                setEstatus([]);
                                                formik.setFieldValue("moneda", []);
                                                setMoneda([]);
                                                formik.setFieldValue("forma_pago", []);
                                                setFormaPago([]);
                                            }}
                                                size="small"
                                                variant="outlined"
                                                style={{ color: tipo === 'banco' ? '#ffff' : '#1A73E8', marginLeft: 5, marginRight: 5, backgroundColor: tipo === 'banco' ? '#1A73E8' : '#fff' }}>
                                                Banco
                                            </Button>
                                            <Button onClick={() => {
                                                setTipo('concepto');
                                                formik.setFieldValue("tipo_solicitud", []);
                                                setTipoSolicitud([]);
                                                formik.setFieldValue("proyecto", []);
                                                setProyecto([]);
                                                formik.setFieldValue("empresa", []);
                                                setEmpresa([]);
                                                formik.setFieldValue("banco", []);
                                                setBanco([]);
                                                formik.setFieldValue("concepto", []);
                                                setConcepto([]);
                                                formik.setFieldValue("estatus", []);
                                                setEstatus([]);
                                                formik.setFieldValue("moneda", []);
                                                setMoneda([]);
                                                formik.setFieldValue("forma_pago", []);
                                                setFormaPago([]);
                                            }}
                                                size="small"
                                                variant="outlined"
                                                style={{ color: tipo === 'concepto' ? '#ffff' : '#1A73E8', marginLeft: 5, marginRight: 5, backgroundColor: tipo === 'concepto' ? '#1A73E8' : '#fff' }}>
                                                Concepto
                                            </Button>
                                            <Button onClick={() => {
                                                setTipo('estatus');
                                                formik.setFieldValue("tipo_solicitud", []);
                                                setTipoSolicitud([]);
                                                formik.setFieldValue("proyecto", []);
                                                setProyecto([]);
                                                formik.setFieldValue("empresa", []);
                                                setEmpresa([]);
                                                formik.setFieldValue("banco", []);
                                                setBanco([]);
                                                formik.setFieldValue("concepto", []);
                                                setConcepto([]);
                                                formik.setFieldValue("estatus", []);
                                                setEstatus([]);
                                                formik.setFieldValue("moneda", []);
                                                setMoneda([]);
                                                formik.setFieldValue("forma_pago", []);
                                                setFormaPago([]);
                                            }}
                                                size="small"
                                                variant="outlined"
                                                style={{ color: tipo === 'estatus' ? '#ffff' : '#1A73E8', marginLeft: 5, marginRight: 5, backgroundColor: tipo === 'estatus' ? '#1A73E8' : '#fff' }}>
                                                Estatus
                                            </Button>
                                            <Button onClick={() => {
                                                setTipo('moneda');
                                                formik.setFieldValue("tipo_solicitud", []);
                                                setTipoSolicitud([]);
                                                formik.setFieldValue("proyecto", []);
                                                setProyecto([]);
                                                formik.setFieldValue("empresa", []);
                                                setEmpresa([]);
                                                formik.setFieldValue("banco", []);
                                                setBanco([]);
                                                formik.setFieldValue("concepto", []);
                                                setConcepto([]);
                                                formik.setFieldValue("estatus", []);
                                                setEstatus([]);
                                                formik.setFieldValue("moneda", []);
                                                setMoneda([]);
                                                formik.setFieldValue("forma_pago", []);
                                                setFormaPago([]);
                                            }}
                                                size="small"
                                                variant="outlined"
                                                style={{ color: tipo === 'moneda' ? '#ffff' : '#1A73E8', marginLeft: 5, marginRight: 5, backgroundColor: tipo === 'moneda' ? '#1A73E8' : '#fff' }}>
                                                Moneda
                                            </Button>
                                            <Button onClick={() => {
                                                setTipo('forma_pago');
                                                formik.setFieldValue("tipo_solicitud", []);
                                                setTipoSolicitud([]);
                                                formik.setFieldValue("proyecto", []);
                                                setProyecto([]);
                                                formik.setFieldValue("empresa", []);
                                                setEmpresa([]);
                                                formik.setFieldValue("banco", []);
                                                setBanco([]);
                                                formik.setFieldValue("concepto", []);
                                                setConcepto([]);
                                                formik.setFieldValue("estatus", []);
                                                setEstatus([]);
                                                formik.setFieldValue("moneda", []);
                                                setMoneda([]);
                                                formik.setFieldValue("forma_pago", []);
                                                setFormaPago([]);
                                            }}
                                                size="small"
                                                variant="outlined"
                                                style={{ color: tipo === 'forma_pago' ? '#ffff' : '#1A73E8', marginLeft: 5, marginRight: 5, backgroundColor: tipo === 'forma_pago' ? '#1A73E8' : '#fff' }}>
                                                Forma de pago
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} md={5} style={{ textAlign: 'left' }}>
                                            <DateRangePickerFiltro
                                                handleOpen={() => {
                                                    setIsOpen(true)
                                                }}
                                                handleClose={() => {
                                                    setIsOpen(false)
                                                }}
                                                title='Seleccione el rango de fecha para filtrar sus resultados' 
                                                enAccion={(r: any) => {
                                                    filterByDateRange(tipo === 'todas' ? dataTodasPerfilMuestra  : perfil?.solicitudes || [], r)
                                                }} />
                                        </Grid>
                                        <Grid item xs={12} md={12} style={{ textAlign: 'left' }}>
                                            <Grid container spacing={2}>
                                                {tipo === 'todas' || tipo !== 'tipo_solicitud' ? <Grid item xs={12} md={3}>
                                                    <FormikProvider value={formik}>
                                                        <Form.Group style={{ width: '100%' }}>
                                                            <SelectMultipleAutoCompleteField
                                                                label={'Tipo de solicitud'}
                                                                placeholder={'Seleccione una opción'}
                                                                defaultValue={tipoSolicitud}
                                                                options={dataTodasPerfil.map((r: any) => {
                                                                    return {
                                                                        label: r?.tipo_solicitud || '',
                                                                        value: r?.id_tipo_solicitud,
                                                                    }
                                                                }).filter(
                                                                    (item: any, index: any, self: any) => index === self.findIndex((t: any) => t.value === item.value)
                                                                )}
                                                                name="tipo_solicitud"
                                                                id="tipo_solicitud"
                                                                required
                                                                onInput={(e: any) => {
                                                                    console.log([e])
                                                                    formik.setFieldValue("tipo_solicitud", e);
                                                                    setTipoSolicitud(e);
                                                                }}
                                                                formik={formik?.getFieldMeta("tipo_solicitud")}
                                                            />
                                                        </Form.Group>
                                                    </FormikProvider>
                                                </Grid> : null}
                                                {tipo === 'todas' || tipo !== 'proyecto' ? <Grid item xs={12} md={3} >
                                                    <FormikProvider value={formik}>
                                                        <Form.Group style={{ width: '100%' }}>
                                                            <SelectMultipleAutoCompleteField
                                                                label={'Proyecto'}
                                                                placeholder={'Seleccione una opción'}
                                                                defaultValue={proyecto}
                                                                options={dataTodasPerfil.map((r: any) => {
                                                                    return {
                                                                        label: r?.proyecto || '',
                                                                        value: r?.id_proyecto,
                                                                    }
                                                                }).filter(
                                                                    (item: any, index: any, self: any) => index === self.findIndex((t: any) => t.value === item.value)
                                                                )}
                                                                name="proyecto"
                                                                id="proyecto"
                                                                required
                                                                onInput={(e: any) => {
                                                                    console.log([e])
                                                                    formik.setFieldValue("proyecto", e);
                                                                    setProyecto(e);
                                                                }}
                                                                formik={formik?.getFieldMeta("proyecto")}
                                                            />
                                                        </Form.Group>
                                                    </FormikProvider>
                                                </Grid> : null}
                                                {tipo === 'todas' || tipo !== 'empresa' ? <Grid item xs={12} md={3} >
                                                    <FormikProvider value={formik}>
                                                        <Form.Group style={{ width: '100%' }}>
                                                            <SelectMultipleAutoCompleteField
                                                                label={'Empresa'}
                                                                placeholder={'Seleccione una opción'}
                                                                defaultValue={empresa}
                                                                options={dataTodasPerfil.map((r: any) => {
                                                                    return {
                                                                        label: r?.empresa || '',
                                                                        value: r?.id_empresa,
                                                                    }
                                                                }).filter(
                                                                    (item: any, index: any, self: any) => index === self.findIndex((t: any) => t.value === item.value)
                                                                )}
                                                                name="empresa"
                                                                id="empresa"
                                                                required
                                                                onInput={(e: any) => {
                                                                    console.log([e])
                                                                    formik.setFieldValue("empresa", e);
                                                                    setEmpresa(e);
                                                                }}
                                                                formik={formik?.getFieldMeta("empresa")}
                                                            />
                                                        </Form.Group>
                                                    </FormikProvider>
                                                </Grid> : null}
                                                {tipo === 'todas' || tipo !== 'banco' ? <Grid item xs={12} md={3} >
                                                    <FormikProvider value={formik}>
                                                        <Form.Group style={{ width: '100%' }}>
                                                            <SelectMultipleAutoCompleteField
                                                                label={'Banco'}
                                                                placeholder={'Seleccione una opción'}
                                                                defaultValue={banco}
                                                                options={dataTodasPerfil.map((r: any) => {
                                                                    return {
                                                                        label: r?.banco || '',
                                                                        value: r?.banco,
                                                                    }
                                                                }).filter(
                                                                    (item: any, index: any, self: any) => index === self.findIndex((t: any) => t.value === item.value)
                                                                )}
                                                                name="banco"
                                                                id="banco"
                                                                required
                                                                onInput={(e: any) => {
                                                                    console.log([e])
                                                                    formik.setFieldValue("banco", e);
                                                                    setBanco(e);
                                                                }}
                                                                formik={formik?.getFieldMeta("banco")}
                                                            />
                                                        </Form.Group>
                                                    </FormikProvider>
                                                </Grid> : null}
                                                {tipo === 'todas' || tipo !== 'concepto' ? <Grid item xs={12} md={3} >
                                                    <FormikProvider value={formik}>
                                                        <Form.Group style={{ width: '100%' }}>
                                                            <SelectMultipleAutoCompleteField
                                                                label={'Concepto'}
                                                                placeholder={'Seleccione una opción'}
                                                                defaultValue={concepto}
                                                                options={dataTodasPerfil.map((r: any) => {
                                                                    return {
                                                                        label: r?.concepto || '',
                                                                        value: r?.id_concepto,
                                                                    }
                                                                }).filter(
                                                                    (item: any, index: any, self: any) => index === self.findIndex((t: any) => t.value === item.value)
                                                                )}
                                                                name="concepto"
                                                                id="concepto"
                                                                required
                                                                onInput={(e: any) => {
                                                                    console.log([e])
                                                                    formik.setFieldValue("concepto", e);
                                                                    setConcepto(e);
                                                                }}
                                                                formik={formik?.getFieldMeta("concepto")}
                                                            />
                                                        </Form.Group>
                                                    </FormikProvider>
                                                </Grid> : null}
                                                {tipo === 'todas' || tipo !== 'estatus' ? <Grid item xs={12} md={3} >
                                                    <FormikProvider value={formik}>
                                                        <Form.Group style={{ width: '100%' }}>
                                                            <SelectMultipleAutoCompleteField
                                                                label={'Estatus'}
                                                                placeholder={'Seleccione una opción'}
                                                                defaultValue={estatus}
                                                                options={dataTodasPerfil.map((r: any) => {
                                                                    return {
                                                                        label: r?.estatus || '',
                                                                        value: r?.id_estatus,
                                                                    }
                                                                }).filter(
                                                                    (item: any, index: any, self: any) => index === self.findIndex((t: any) => t.value === item.value)
                                                                )}
                                                                name="estatus"
                                                                id="estatus"
                                                                required
                                                                onInput={(e: any) => {
                                                                    console.log([e])
                                                                    formik.setFieldValue("estatus", e);
                                                                    setEstatus(e);
                                                                }}
                                                                formik={formik?.getFieldMeta("estatus")}
                                                            />
                                                        </Form.Group>
                                                    </FormikProvider>
                                                </Grid> : null}
                                                {tipo === 'todas' || tipo !== 'moneda' ? <Grid item xs={12} md={3} >
                                                    <FormikProvider value={formik}>
                                                        <Form.Group style={{ width: '100%' }}>
                                                            <SelectMultipleAutoCompleteField
                                                                label={'Moneda'}
                                                                placeholder={'Seleccione una opción'}
                                                                defaultValue={moneda}
                                                                options={dataTodasPerfil.map((r: any) => {
                                                                    return {
                                                                        label: r?.moneda || '',
                                                                        value: r?.id_moneda,
                                                                    }
                                                                }).filter(
                                                                    (item: any, index: any, self: any) => index === self.findIndex((t: any) => t.value === item.value)
                                                                ) }
                                                                name="moneda"
                                                                id="moneda"
                                                                required
                                                                onInput={(e: any) => {
                                                                    console.log([e])
                                                                    formik.setFieldValue("moneda", e);
                                                                    setMoneda(e);
                                                                }}
                                                                formik={formik?.getFieldMeta("moneda")}
                                                            />
                                                        </Form.Group>
                                                    </FormikProvider>
                                                </Grid> : null}
                                                {tipo === 'todas' || tipo !== 'forma_pago' ? <Grid item xs={12} md={3} >
                                                    <FormikProvider value={formik}>
                                                        <Form.Group style={{ width: '100%' }}>
                                                            <SelectMultipleAutoCompleteField
                                                                label={'Forma de pago'}
                                                                placeholder={'Seleccione una opción'}
                                                                defaultValue={formaPago}
                                                                options={dataTodasPerfil.map((r: any) => {
                                                                    return {
                                                                        label: r?.forma_pago || '',
                                                                        value: r?.id_forma_pago,
                                                                    }
                                                                }).filter(
                                                                    (item: any, index: any, self: any) => index === self.findIndex((t: any) => t.value === item.value)
                                                                ) }
                                                                name="forma_pago"
                                                                id="forma_pago"
                                                                required
                                                                onInput={(e: any) => {
                                                                    console.log([e])
                                                                    formik.setFieldValue("forma_pago", e);
                                                                    setFormaPago(e);
                                                                }}
                                                                formik={formik?.getFieldMeta("forma_pago")}
                                                            />
                                                        </Form.Group>
                                                    </FormikProvider>
                                                </Grid> : null}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid> : null}
                        {/* Seccion de los datos */}
                        <Grid item xs={12}>
                            {!isOpen ? <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                        <Tab label="Tarjetas con mis solicitudes" {...a11yProps(0)} />
                                        {tipo !== 'todas' ? <Tab label="Graficas con mis solicitudes" {...a11yProps(1)} /> :null}
                                        {perfil?.misSolicitudes?.length ? <Tab label="Solicitudes en seguimiento asignadas o atendedias por mi" {...a11yProps(2)} /> : null}                                    </Tabs>
                                </Box>
                                <CustomTabPanel value={value} index={0}>
                                    <Grid container spacing={2}>
                                        {tipo === 'todas' ? <Grid item xs={12} md={3} sm={12} lg={4} style={{ marginBottom: 5 }}>
                                            <ComplexStatisticsCard
                                                detalle={(tipo_: string, title: any) => {
                                                    let resut = null;
                                                    const re: any = dataTodasPerfilMuestra.filter((r: any) => r?.estatus === tipo_);
                                                    resut = tipo_ === 'todas' ? dataTodasPerfilMuestra || [] : re;
                                                    setItemDetalle(resut);
                                                    handleisAlertOpenDetalle();
                                                }}
                                                icon={<CurrencyExchangeIcon />}
                                                title={'Todas las solicitudes'}
                                                count={dataTodasPerfilMuestra?.length}
                                                datas={dataTodasMuestra?.[0]?.conteo_estatus}
                                            />
                                        </Grid> : null}
                                        {!perfil?.procesando && tipo !== 'todas' ? data?.map((r: any, key: number) => (
                                            <Grid item xs={12} md={3} sm={12} lg={4} key={key} style={{ marginBottom: 5 }}>
                                                <ComplexStatisticsCard
                                                    detalle={(tipo_: string, title: any) => {
                                                        let resut = null;
                                                        const re: any = data.filter((r: any) => r?.[tipo] === title);
                                                        resut = tipo_ === 'todas' ? re?.[0]?.registros || [] : (re?.[0]?.registros || []).filter((w: any) => w?.estatus === tipo_);
                                                        setItemDetalle(resut);
                                                        handleisAlertOpenDetalle();
                                                    }}
                                                    icon={<RequestPageIcon />}
                                                    title={r?.[tipo]}
                                                    count={r?.registros?.length}
                                                    datas={r?.conteo_estatus}
                                                />
                                            </Grid>
                                        )) : perfil?.procesando ? '' : ''}
                                        {
                                            tipo !== 'todas' && !data?.length ? <Grid item xs={12} md={3} sm={12} lg={4} style={{ marginBottom: 5 }}>
                                            <ComplexStatisticsCard
                                                detalle={(tipo_: string, title: any) => {
                                                   
                                                }}
                                                icon={<CurrencyExchangeIcon />}
                                                title={'Sin resultados'}
                                                count={0}
                                                datas={[]}
                                            />
                                        </Grid> : null
                                        }
                                    </Grid>
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6} style={{ maxHeight: 250 }} >
                                            {data?.length && !perfil?.procesando ? <ColumnasChartGac
                                                detalle={(item: any) => {
                                                    const re: any = data.filter((r: any) => r?.[tipo] === item?.[tipo]);
                                                    setItemDetalle(re?.[0]?.registros || []);
                                                    handleisAlertOpenDetalle();
                                                }}
                                                data={data} categoria={tipo} /> : perfil?.procesando ? '' : 'Sin resultados para graficar'}
                                        </Grid>
                                        <Grid item xs={12} md={6} style={{ maxHeight: 250 }}>
                                            {data?.length && !perfil?.procesando ? <PieChart data={dataPie} detalle={(item: any) => {
                                                const re: any = data.filter((r: any) => r?.[tipo] === item?.category);
                                                setItemDetalle(re?.[0]?.registros || []);
                                                handleisAlertOpenDetalle();
                                            }} /> : perfil?.procesando ? '' : 'Sin resultados para graficar'}
                                        </Grid>
                                    </Grid>
                                </CustomTabPanel>
                                {perfil?.misSolicitudes?.length ? <CustomTabPanel value={value} index={2}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={12} sm={12} lg={12} style={{ marginBottom: 5 }}>
                                            <DinamicTableMejorada
                                                flex
                                                esGastoSolicitante
                                                actions
                                                key={'playList_'}
                                                data={perfil?.misSolicitudes.map((r: any) => {
                                                    let esMiTurno_:any = 'no'
                                                    esMiTurno_ = esMiTurno(r?.autorizadores, perfil?.idUsuario);
                                                    const faltanAutorizadores = r?.autorizadores.filter((x: any) => (x?.requiere_aprobacion === 1) && (x?.autorizo === false || x?.autorizo === null));
                                                    if (!faltanAutorizadores?.length) {
                                                        esMiTurno_ = miTurnoDos(faltanAutorizadores, r)
                                                    }
                                                    return {
                                                        ...{
                                                            id: r?.id,
                                                            tipo_solicitud: r?.tipo_solicitud,
                                                            estatus: r?.estatus,
                                                            importe_pesos: r?.importe_pesos,
                                                            pais_moneda: r?.pais_moneda,
                                                            descripcion: r?.descripcion,
                                                            esMiTurno: esMiTurno_
                                                        },
                                                        ...r
                                                    }
                                                })}
                                                columnsToShow={['id', 'tipo_solicitud', 'estatus', 'importe_pesos', 'pais_moneda', 'descripcion', 'fecha_solicitud', 'esMiTurno']}
                                                enAccion={(accion, row) => {
                                                    if (accion === 'descargarDocumentos') {
                                                        handleDescargaZip(row)
                                                    }
                                                    if (accion === 'verDetalle') {
                                                        navigate('/gac-detalle-solicitud?' + 'id=' + perfil?.idUsuario + '&id_solicitud=' + row?.id)
                                                    }
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </CustomTabPanel> : null}
                            </Box> : null}
                        </Grid>
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
                <ModalComponent handleClose={handleisAlerCloseDetalle} isOpen={isAlertOpenDetalle} key={'alertasazDetalle'} esFullScreen>
                    <Grid container spacing={2}>
                        {itemDetalle?.length && !item ? <Grid item xs={12} sm={12} md={12} lg={12} style={{ textAlign: 'center' }}>
                            <DinamicTableMejorada
                                flex
                                esGastoSolicitante
                                actions
                                key={'playList_'}
                                data={itemDetalle.map((r: any) => {
                                    return {
                                        ...{
                                            id: r?.id,
                                            tipo_solicitud: r?.tipo_solicitud,
                                            estatus: r?.estatus,
                                            importe_pesos: r?.importe_pesos,
                                            pais_moneda: r?.pais_moneda,
                                            descripcion: r?.descripcion
                                        },
                                        ...r
                                    }
                                })}
                                columnsToShow={['id', 'tipo_solicitud', 'estatus', 'importe_pesos', 'pais_moneda', 'descripcion', 'fecha_solicitud']}
                                enAccion={(accion, row) => {
                                    if (accion === 'descargarDocumentos') {
                                        handleDescargaZip(row)
                                    }
                                    if (accion === 'verDetalle') {
                                        navigate('/gac-detalle-solicitud?' + 'id=' + perfil?.idUsuario + '&id_solicitud=' + row?.id)
                                    }
                                }}
                            />
                        </Grid> : null}
                    </Grid>
                </ModalComponent>
                <ModalComponent handleClose={handleisAlerCloseDetalleSolicitud} isOpen={isAlertOpenDetalleSolicitud} key={'alertasazDetalleSolicitud'}>
                    <TimelineList title="Bitacora de eventos para la solicitud">
                        <TimelineItem
                            onSelec={() => { }}
                            color="success"
                            icon="notifications"
                            title="Solicitud creada"
                            dateTime="22 DEC 7:20 PM"
                        />
                        <TimelineItem
                            onSelec={() => { }}
                            color="success"
                            icon="notifications"
                            title="Revisada"
                            dateTime="22 DEC 7:21 AM"
                        />
                        <TimelineItem
                            onSelec={() => { }}
                            color="success"
                            icon="notifications"
                            title="Carga de documentos"
                            dateTime="22 DEC 8:10 AM"
                        />
                        <TimelineItem
                            onSelec={() => { }}
                            color="success"
                            icon="done"
                            title="Solicitud liberada"
                            dateTime="22 DEC 4:54 PM"
                            lastItem
                        />
                    </TimelineList>
                </ModalComponent>
            </Grid >
        </>
    );
}
export default SolicitanteScreen;