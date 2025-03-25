import { GacUserQueryParamsContext } from "../context/GacUserQueryParamsContexto";
import * as Yup from "yup";
import env from "react-dotenv";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { groupByProperty } from "../utils";
import { generarZipSolicitudHttp } from "../actions/solicitud";
import { useFormik } from "formik";

const useSolicitanteScreen = () => {

    const navigate = useNavigate();
    const perfil = React.useContext(GacUserQueryParamsContext);

    /* Para el tab */
    const [value, setValue] = React.useState(0);
    
    /* Para la data de las solicitudes */
    const [data, setData] = useState([]);
    const [dataTodasPerfil, setDataTodasPerfil] = useState<any>([]);
    const [dataTodasPerfilMuestra, setDataTodasPerfilMuestra] = useState<any>([]);
    const [dataTodasMuestra, setDataTodasMuestra] = useState<any>([]);
    const [dataPie, setDataPie] = useState([]);
    
    /* Para el filtro por fecha */
    const [tipo, setTipo] = useState('todas');

    /* // Estado para saber si el DatePicker está abierto o cerrado */
    const [isOpen, setIsOpen] = useState(false);
    
    /* Para el detalle del tipo de solicitud */
    const [itemDetalle, setItemDetalle] = useState<any>([]);
    
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

    /* Filtros  */
    const [area, setArea] = useState<any>([]);
    const [tipoSolicitud, setTipoSolicitud] = useState<any>([]);
    const [proyecto, setProyecto] = useState<any>([]);
    const [empresa, setEmpresa] = useState<any>([]);
    const [banco, setBanco] = useState<any>([]);
    const [concepto, setConcepto] = useState<any>([]);
    const [estatus, setEstatus] = useState<any>([]);
    const [moneda, setMoneda] = useState<any>([]);
    const [formaPago, setFormaPago] = useState<any>([]);

    /* seccion dashboard */
    const [seccion, setSeccion] = useState<number>(1);

    /* para controlar el colapso del contenido de los filtros  */
    const [open, setOpen] = useState(true); // Estado para controlar el colapso

    const filtrarDatos = useCallback(() => {
        const filtros: any = {
            area:area.map((r: any) => r?.value),
            id_tipo_solicitud: tipoSolicitud.map((r: any) => r?.value),
            id_proyecto: proyecto.map((r: any) => r?.value),
            id_empresa: empresa.map((r: any) => r?.value),
            banco: banco.map((r: any) => r?.value),
            id_concepto: concepto.map((r: any) => r?.value),
            id_estatus: estatus.map((r: any) => r?.value),
            id_moneda: moneda.map((r: any) => r?.value),
            id_forma_pago: formaPago.map((r: any) => r?.value)
        };
        const respuestaFiltrada = (tipo === 'todas' ? dataTodasPerfil : perfil?.solicitudes || []).filter((item: any) => {
            return Object.keys(filtros).every(key => {
                if (!filtros[key] || filtros[key].length === 0) return true;
                return filtros[key].includes(item[key]);
            });
        });
        const resultadoestatus: any = groupByProperty(respuestaFiltrada, 'agrupaadmin');
        if (tipo === 'todas') {
            setDataTodasPerfilMuestra(respuestaFiltrada);
            setDataTodasMuestra(resultadoestatus);
        } else {
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
    }, [area, tipo, tipoSolicitud, proyecto, empresa, banco, concepto, estatus, moneda, formaPago, dataTodasPerfil]);

    const setDashboard = useCallback(() => {
        const dataOrigen = perfil?.solicitudes;
        const resultado: any = groupByProperty(dataOrigen || [], tipo);
        setData(resultado);
        const resultadoestatus: any = groupByProperty(dataOrigen || [], 'agrupaadmin');
        setDataTodasPerfil(dataOrigen || []);

        /* Para mostrar en el dashboard */
        setDataTodasMuestra(resultadoestatus)
        setDataTodasPerfilMuestra(dataOrigen || [])

        const sumaTotalPesos = (resultado || []).reduce((a: any, c: any) => { return a + (+c?.suma_importe_en_pesos) }, 0)
        const dataPieResult = resultado.map((r: any) => {
            return {
                category: r?.[tipo],
                value: ((r?.suma_importe_en_pesos / sumaTotalPesos) * 100),
                valor: r?.suma_importe_en_pesos
            }
        });
        setDataPie(dataPieResult);
        filtrarDatos();
    }, [perfil, tipo, filtrarDatos, seccion]);

    useEffect(() => {
        setDashboard();
    }, [setDashboard, tipo, seccion]);

    const filterByDateRange = (data_: any, dateRange: any) => {
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
        if (tipo === 'todas') {
            const resultadoestatus: any = groupByProperty(resultado || [], 'agrupaadmin');
            setDataTodasMuestra(resultadoestatus)
            setDataTodasPerfilMuestra(resultado)
        } else {
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
        setValue(tipo === 'todas' && newValue === 1 ? 2 : newValue);
    };

    const handleDescargaZip = async (sol: any) => {
        try {
            setProcesando(true);
            const resDocZip = await generarZipSolicitudHttp({ id_solicitud: sol?.id });
            window.open(`${env.API_URL_DOCUMENTOS}${resDocZip}`);
            setProcesando(false);
            setMensajeAlert('Éxito al descargar los documentos')
            handleisAlertOpen()
        } catch (error) {
            setProcesando(false);
            setMensajeAlert('Error al descargar los documentos')
            handleisAlertOpen()
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

    useEffect(() => {
        filtrarDatos()
    }, [area, tipo, tipoSolicitud, proyecto, empresa, banco, concepto, estatus, moneda, formaPago]);


    const handleDataSolicitudes = useCallback((ele: any) => {
        setSeccion(ele === 'second' ? 2 : 1);
    }, [perfil])


    const esMiTurno = (arr: any, idUsuario: any) => {
        for (const item of arr) {
            
            if (item.id_usuario !== idUsuario && (item.autorizo === null || item.autorizo === false)) {
                return 'no';
            }

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



    return {
        setValue,
        area,
        setArea,
        setTipo,
        formik,
        setTipoSolicitud,
        setProyecto,
        setEmpresa,
        setBanco,
        setConcepto,
        setEstatus,
        setMoneda,
        setFormaPago,
        tipo,
        setIsOpen,
        filterByDateRange,
        dataTodasPerfilMuestra,
        perfil,
        tipoSolicitud,
        dataTodasPerfil,
        proyecto,
        empresa,
        banco,
        concepto,
        estatus,
        moneda,
        formaPago,
        handleDataSolicitudes,
        isOpen,
        value,
        handleChange,
        setItemDetalle,
        handleisAlertOpenDetalle,
        dataTodasMuestra,
        data,
        dataPie, 
        procesando,
        handleisAlerClose,
        isAlertOpen,
        handleisAlerCloseDetalle,
        isAlertOpenDetalle,
        mensajeAlert,        
        itemDetalle,
        handleDescargaZip,
        navigate,
        seccion,
        esMiTurno,
        miTurnoDos,
        open, 
        setOpen
    }
}

export default useSolicitanteScreen
