import { Backdrop, CircularProgress, Grid } from '@mui/material';
import AppAppBarC from '../componets/Carrusel/AppAppBarC';
import ModalComponent from '../componets/Modal';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import GacSolicitudDetalle from '../componets/GacSolicitudDetalle/GacSolicitudDetalle';
import { useSearchParams } from 'react-router-dom';
import { actualizaIdConceptoHttp, apruebaSolicitudJefeDirectoHttp, atualizaTipoSolicitudHttp, cambioEnSolicitudAutorizadorHttp, cambioEnSolicitudPagadorHttp, cambioEnSolicitudRevisorHttp, generarZipSolicitudHttp, getDetalleSolicitudHttp, handleDocumentosRevisorRevisaHttp, notificaNominaHttp, notificaRevisoresFiscalesAutorizadorHttp, notificaRevisoresFiscalesHttp, setDocumentoSolicitudHttp, solicitaAprobacionDireccionGeneralHttp, solicitaCargaDocumentalHttp } from '../actions/solicitud';
import { GacUserQueryParamsContext } from '../context/GacUserQueryParamsContexto';
import env from "react-dotenv";
import ModalConfirm from '../componets/ModalConfirm/ModalConfirm';
import { deleteDocumentHttp, getCritscoAnalisisHttp } from '../actions/documentos';
import { sleep } from '../utils';


const GacSolicitudDetalleScreen: React.FC = () => {
    /* Para saber si el usuario que esta consultando la solicitud es el que esta en turno de interactuar con ella osea si esta en su "lado de la cancha" */
    const [estaEnMiCancha, setEstaEnMiCancha] = useState<any>(null);

    /* Extraemos el id del usuario de la url   */
    const perfil = React.useContext(GacUserQueryParamsContext);
    const [queryParameters] = useSearchParams();
    const idSolicitud: any = useMemo(() => (queryParameters.get("id_solicitud") || ''), []);
    const [solicitud, setSolicitud] = useState<any>(null);
    const [solicitudDocumentos, setSolicitudDocumentos] = useState<any>(null);
    const [procesando, setProcesando] = useState<any>(false);
    const [documentosCargadosMuestra, setDocumentosCargadosMuestra] = useState<any>(false);
    const [documentosCargados, setDocumentosCargados] = useState<any>(false);

    /* para la modal de la pregunta si desea eliminar el archivo  */
    const [openPreguntaDocumentoDelete, setOpenPreguntaDocumentoDelete] = useState<any>(false);
    const [documentoDelete, setDoocumentoDelete] = useState<any>(null);

    const [muestraConfirmAprobarJefe, setMuestraConfirmAprobarJefe] = useState<any>(false);
    const [txtAprobarJefe, setTxtAprobarJefe] = useState<any>(false);

    const [confirmDocumentosRevisorRevisa, setConfirmDocumentosRevisorRevisa] = useState<any>(false);
    const [txtConfirmDocumentosRevisorRevisa, setTxtConfirmDocumentosRevisorRevisa] = useState<any>('');

    const [jefe, setJefe] = useState<any>(null);
    const [esJefe, setEsJefe] = useState<any>(false);
    const [esRevisor, setRevisor] = useState<any>(false);
    const [esAutorizador, setEsAutorizador] = useState<any>(false);
    const [esPagador, setEsPagador] = useState<any>(false);
    const [solicitudDetalle, setSolicitudDetalle] = useState<any>(null);
    const [documentosSolicitudDetalle, setDocumentosSolicitudDetalle] = useState<any>(null);

    /* Modal mensajes generales */
    const [mensajeAlert, setMensajeAlert] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => {
        setIsAlertOpen(false);
        if (documentosCargadosMuestra && solicitudDocumentos?.length) {
            setDocumentosCargados(true)
        }
        if (documentosCargadosMuestra && !solicitudDocumentos?.length) {
            handleNotificaJefes()
            setDocumentosCargados(false);
        }
    };

    const esMiTurno = (arr: any, idUsuario: any) => {
        for (const item of arr) {
            if (item.id_usuario === idUsuario && (item.autorizo === null)) {
                setEstaEnMiCancha(true)
                break;
            }
            if (item.id_usuario === idUsuario && (item.autorizo === true)) {
                setEstaEnMiCancha(false)
                return false
            }
            if (item.autorizo === null || item.autorizo === false) {
                setEstaEnMiCancha(false)
                return false
            }
        }
    }

    const getData = useCallback(async () => {
        try {
            setProcesando(true);
            const res = await getDetalleSolicitudHttp(idSolicitud, perfil?.idHash);
            setSolicitud(res.map((r: any) => {
                const solicitaName = perfil?.usuariosTodos.find((w: any) => w?.id_usuario === r?.solicita)?.nombre + ' ' + perfil?.usuariosTodos.find((w: any) => w?.id_usuario === r?.solicita)?.apellidos;

                const beneficiarioName = r?.beneficiario === 0 ? 'Otro beneficiario' : perfil?.usuariosTodos.find((w: any) => w?.id_usuario === r?.beneficiario)?.nombre + ' ' + perfil?.usuariosTodos.find((w: any) => w?.id_usuario === r?.beneficiario)?.apellidos;

                const proyecto = perfil?.proyectos.find((w: any) => w?.id === r?.id_proyecto)?.nombre;
                const empresa = perfil?.empresas.find((w: any) => w?.id === r?.id_empresa)?.nombre;
                const proveedor = perfil?.proveedores.find((w: any) => w?.id === +r?.proveedor)?.nombre;

                return {
                    ...r,
                    ...{
                        solicitaName,
                        beneficiarioName,
                        proyecto,
                        empresa,
                        proveedor
                    }
                }
            }));
            const sol = res.map((r: any) => {
                return {
                    ...r,
                    ...{
                        //id_usuario_autorizador: 19,
                        //id_usuario_revisor: 1,
                        //id_usuario_pagada: 19
                    }
                }
            });

            if ((perfil?.idUsuario === sol?.[0]?.solicita && perfil?.idUsuario === sol?.[0]?.beneficiario)) {
                setEstaEnMiCancha(false)
            }

            const autorizadores = (sol?.[0]?.autorizadores || []).map((a: any) => {
                return {
                    ...a,
                    ...{
                        //autorizo: true
                    }
                }
            });
            setProcesando(false);
            esMiTurno(autorizadores, perfil?.idUsuario)
            const faltanAutorizadores = autorizadores.filter((r: any) => (r?.requiere_aprobacion === 1) && (r?.autorizo === false || r?.autorizo === null));

            /* Valida si es jefe */
            const esJefe = (autorizadores || []).filter((r: any) => r?.id_usuario === perfil?.idUsuario)
            setEsJefe(esJefe?.length ? true : false)
            /* Valida si es autorizador */
            const esAutorizador = (perfil?.usuariosPerfil || []).filter((r: any) => r?.id_usuario === perfil?.idUsuario && r?.id_perfil === 2)
            setEsAutorizador(esAutorizador?.length && sol?.[0]?.id_usuario_autorizador === null ? true : false);
            /* Valida si es revisor */
            const esRevisor = (perfil?.usuariosPerfil || []).filter((r: any) => r?.id_usuario === perfil?.idUsuario && r?.id_perfil === 1)
            setRevisor(esRevisor?.length ? true : false);
            /* Valida si es pagador */
            const esPagador = (perfil?.usuariosPerfil || []).filter((r: any) => r?.id_usuario === perfil?.idUsuario && r?.id_perfil === 3)
            setEsPagador(esPagador?.length && sol?.[0]?.id_usuario_pagada === null && sol?.[0]?.id_usuario_autorizador !== null ? true : false);
            /* si los autorizadores ya terminaron de autorizar*/
            if (!faltanAutorizadores?.length) {
                /* Turno autorizador */
                if (esAutorizador?.length && sol?.[0]?.id_usuario_autorizador === null) {
                    setEstaEnMiCancha(true)
                    return false;
                }
                if (esAutorizador?.length && sol?.[0]?.id_usuario_autorizador !== null) {
                    /* Turno pagador */
                    if ((esPagador?.length && sol?.[0]?.id_usuario_pagada === null) && (sol?.[0]?.id_usuario_revisor !== null && sol?.[0]?.id_usuario_autorizador !== null)) {
                        setEstaEnMiCancha(true)
                        return false;
                    }
                    if (esPagador?.length && sol?.[0]?.id_usuario_pagada !== null) {
                        setEstaEnMiCancha(false)
                        return false;
                    }
                    setEstaEnMiCancha(false)
                    return false;
                }
                /* Turno revisores */
                if (esRevisor?.length && sol?.[0]?.id_usuario_revisor === null && sol?.[0]?.id_usuario_autorizador !== null) {
                    setEstaEnMiCancha(true)
                    return false;
                }
                if (esRevisor?.length && sol?.[0]?.id_usuario_revisor !== null || (esRevisor?.length && sol?.[0]?.id_usuario_revisor === null && sol?.[0]?.id_usuario_autorizador === null)) {
                    setEstaEnMiCancha(false)
                    return false;
                }
            }
        } catch (error) {
            console.log(error, perfil?.idHash)
            setProcesando(false);
            if (perfil?.idHash) {
                setMensajeAlert('Error al obtener la información de la solicitud');
                handleisAlertOpen();
            }
        }
    }, [idSolicitud, perfil, perfil?.idHash]);

    useEffect(() => {
        getData()
    }, [getData]);

    const handleAddDocumentos = async (solicitud: any, documentos: any[]) => {
        try {
            setProcesando(true);
            setSolicitudDocumentos(solicitud?.documentos)
            await documentos.reduce(async (_: any, cat: any) => {
                try {
                    await _;
                    let crist = null;
                    if (cat?.documento_valido === "si" && cat?.rfc && cat?.fiscal_folio && cat?.importe) {
                        crist = await getCritscoAnalisisHttp({
                            user_rfc: 'DIR7610279E5',
                            recive_rfc: cat?.rfc,
                            fiscal_folio: cat?.fiscal_folio,
                            monto: cat?.importe
                        })
                    }
                    const data1: any = new FormData();
                    data1.append("importe", cat?.importe);
                    data1.append("fiscal_folio", cat?.fiscal_folio || '-');
                    data1.append("rfc", cat?.rfc || '-');
                    data1.append("nombre_corto", cat?.nombre);
                    data1.append("descripcion", cat?.descripcion);
                    data1.append("tipo_moneda", cat?.moneda);
                    data1.append("documento_valido", cat?.documento_valido === 'si' ? '1' : '0');
                    data1.append("descripcion_documento_validado", cat?.motivo_valido);
                    data1.append("nombre_documento", cat?.path);
                    data1.append("id_solicitud", solicitud?.id);
                    data1.append("id_usuario", perfil?.idUsuario);
                    data1.append("critsCoValidacion", JSON.stringify(crist));
                    data1.append("file", cat?.file);
                    await setDocumentoSolicitudHttp(data1);
                } catch (error: any) {

                }
            }, Promise.resolve());
            setProcesando(false);
            getData();
            setMensajeAlert('Exito al subir los documentos');
            handleisAlertOpen();
            setDocumentosCargadosMuestra(true)
        } catch (error) {
            setProcesando(true);
            setMensajeAlert('Error al subir los documentos');
            handleisAlertOpen();
        }
    }

    const handleNotificaJefes = async () => {
        try {
            setProcesando(true);
            setSolicitudDocumentos(solicitud?.[0]?.documentos)
            const data = {
                id_solicitud: solicitud?.[0]?.id
            }
            setDocumentosCargados(false);
            if (solicitud?.[0]?.requiere_aprobacion_revisor === 1) {
                await notificaRevisoresFiscalesHttp(data);
            }
            if (solicitud?.[0]?.requiere_aprobacion_revisor === 0) {
                await notificaRevisoresFiscalesAutorizadorHttp(data);
            }
            setDocumentosCargadosMuestra(false)
            setProcesando(false);
            setMensajeAlert(solicitud?.[0]?.requiere_aprobacion_revisor === 1 ? 'Se ha notificado a los revisores con exito' : 'Se ha notificado al autorizador con exito');
            handleisAlertOpen();
        } catch (error) {
            setDocumentosCargados(false);
            setDocumentosCargadosMuestra(false)
            setProcesando(true);
            setMensajeAlert(solicitud?.[0]?.requiere_aprobacion_revisor === 1 ? 'Error al notificar a los revisores' : 'Error al notificar al autorizador');
            handleisAlertOpen();
        }
    }

    const handleApruebaSolicitud = async (coments: string) => {
        try {
            setProcesando(true);
            const id_next = (solicitud?.[0]?.autorizadores || []).filter((r: any) => r?.requiere_aprobacion).find((r: any) => r?.id === jefe?.id + 1)
            const body = {
                id_solicitud: solicitudDetalle?.id,
                id_usuario: jefe?.id_usuario,
                usuario_nombre: jefe?.nombreUsuario,
                id_usuario_next: id_next?.id_usuario || 0,
                aprueba: true,
                comentarios: coments
            }
            await apruebaSolicitudJefeDirectoHttp(body);
            getData();
            setSolicitudDetalle(null)
            setJefe(null);
            setDocumentosCargadosMuestra(false)
            setProcesando(false);
            setMensajeAlert('Se ha aprobado la solicitud con exito');
            handleisAlertOpen();
        } catch (error) {
            setProcesando(false);
            setMensajeAlert('Error al notificar a los revisores');
            handleisAlertOpen();
        }
    }

    const handleRechazaSolicitud = async (coments: string) => {
        try {
            setProcesando(true);
            const id_next = (solicitud?.[0]?.autorizadores || []).filter((r: any) => r?.requiere_aprobacion).find((r: any) => r?.id === jefe?.id + 1)
            const body = {
                id_solicitud: solicitudDetalle?.id,
                id_usuario: jefe?.id_usuario,
                usuario_nombre: jefe?.nombreUsuario,
                id_usuario_next: id_next?.id_usuario || 0,
                aprueba: false,
                comentarios: coments
            }
            await apruebaSolicitudJefeDirectoHttp(body);
            getData();
            setSolicitudDetalle(null)
            setJefe(null);
            setDocumentosCargadosMuestra(false)
            setProcesando(false);
            setMensajeAlert('Se ha rechazado la solicitud con exito');
            handleisAlertOpen();
        } catch (error) {
            setProcesando(false);
            setMensajeAlert('Error al notificar a los revisores');
            handleisAlertOpen();
        }
    }

    const handleApruebaSolicitudAutorizador = async (coments: any) => {
        try {
            setProcesando(true);
            const body = {
                id_solicitud: solicitud?.[0]?.id,
                id_usuario: perfil?.idUsuario,
                aprueba: true,
                usuario_nombre: perfil?.nombre,
                comentarios: coments,
                requiere_doumentos: solicitud?.[0]?.requiere_documentos,
                requiere_aprobacion_revisor: solicitud?.[0]?.requiere_aprobacion_revisor,
            }
            await cambioEnSolicitudAutorizadorHttp(body);
            getData();
            setSolicitudDetalle(null)
            setJefe(null);
            setDocumentosCargadosMuestra(false)
            setProcesando(false);
            setMensajeAlert('Se ha autorizado la solicitud con exito');
            handleisAlertOpen();
        } catch (error) {
            setProcesando(false);
            setMensajeAlert('Error al notificar a los revisores');
            handleisAlertOpen();
        }
    }

    const handleRechazaSolicitudAutorizador = async (coments: any) => {
        try {
            setProcesando(true);
            const body = {
                id_solicitud: solicitud?.[0]?.id,
                id_usuario: perfil?.idUsuario,
                aprueba: false,
                usuario_nombre: perfil?.nombre,
                comentarios: coments,
                requiere_doumentos: solicitud?.[0]?.requiere_documentos
            }
            await cambioEnSolicitudAutorizadorHttp(body);
            getData();
            setSolicitudDetalle(null)
            setJefe(null);
            setDocumentosCargadosMuestra(false)
            setProcesando(false);
            setMensajeAlert('Se ha rechazado la solicitud con exito');
            handleisAlertOpen();
        } catch (error) {
            setProcesando(false);
            setMensajeAlert('Error al notificar a los revisores');
            handleisAlertOpen();
        }
    }

    const handleSolicitarAprobacionDireccionGeneral = async (sol: any) => {
        try {
            setProcesando(true);
            await solicitaAprobacionDireccionGeneralHttp({ id_solicitud: sol?.id })
            getData();
            setSolicitudDetalle(null)
            setJefe(null);
            setDocumentosCargadosMuestra(false)
            setProcesando(false);
            setMensajeAlert('Se ha solicitado la aprobacion de dirección general con exito');
            handleisAlertOpen();
        } catch (error) {
            setProcesando(false);
            setMensajeAlert('Error al solicitar la aprobacion de dirección general');
            handleisAlertOpen();
        }
    }

    /* El revisor aprueba o rechaza los documentos que selecciono */
    const handleDocumentosRevisorRevisa = async (apruebaOrechaza: any, coment: any) => {
        try {
            setProcesando(true);
            const body = {
                id_solicitud: solicitudDetalle?.id,
                documentos: documentosSolicitudDetalle,
                aprueba: apruebaOrechaza,
                comentarios_supervisor: coment,
                id_usuario: perfil?.idUsuario
            }
            await handleDocumentosRevisorRevisaHttp(body);
            setDocumentosSolicitudDetalle(null)
            setSolicitudDetalle(null)
            setConfirmDocumentosRevisorRevisa(false);
            getData();
            /* setProcesando(false); */
            const txt = 'Se han ' + (apruebaOrechaza ? 'aprobado' : 'rechazado') + ' los documentos seleccionados';
            setMensajeAlert(txt);
            handleisAlertOpen();
        } catch (error) {
            setDocumentosSolicitudDetalle(null)
            setSolicitudDetalle(null)
            setConfirmDocumentosRevisorRevisa(false);
            setProcesando(false);
            const txt = 'Error al ' + (apruebaOrechaza ? 'aprobar' : 'rechazar') + ' los documentos seleccionados';
            setMensajeAlert(txt);
            handleisAlertOpen();
        }
    }

    /*  para aprobar la solcitud como un revisor */
    const handleApruebaSolicitudRevisor = async (comentarios: string) => {
        try {
            setProcesando(true);

            const body = {
                id_solicitud: solicitudDetalle?.id,
                id_usuario: perfil?.idUsuario,
                aprueba: true,
                usuario_nombre: perfil?.nombre,
                comentarios
            }
            await cambioEnSolicitudRevisorHttp(body)
            setProcesando(false);
            setMensajeAlert('Exito al aprobar la solicitud');
            setMuestraConfirmAprobarJefe(false);
            setSolicitudDetalle(null);
            getData();
            handleisAlertOpen();
        } catch (error) {
            setProcesando(false);
            setMensajeAlert('Error al aprobar la solicitud');
            handleisAlertOpen();
        }
    }

    /*  para rechazar la solcitud como un revisor */
    const handleRechazaSolicitudRevisor = async (comentarios: string) => {
        try {
            setProcesando(true);
            const body = {
                id_solicitud: solicitudDetalle?.id,
                id_usuario: perfil?.idUsuario,
                aprueba: false,
                usuario_nombre: perfil?.nombre,
                comentarios
            }
            await cambioEnSolicitudRevisorHttp(body);
            setProcesando(false);
            setMensajeAlert('Exito al rechazar la solicitud');
            setMuestraConfirmAprobarJefe(false);
            setSolicitudDetalle(null);
            getData();
            handleisAlertOpen();
        } catch (error) {
            setProcesando(false);
            setMensajeAlert('Error al rechazar la solicitud');
            handleisAlertOpen();
        }
    }

    /* Handle aprueba solicitud  perfil pagador */
    const handleApruebaSolicitudPagador = async (d: any) => {
        try {
            setProcesando(true);
            const body = {
                id_usuario: perfil?.idUsuario,
                usuario_nombre: perfil?.nombre,
                id_solicitud: d?.id,
                comentarios: 'El pagador marco la solicitud como pagada'
            }
            await cambioEnSolicitudPagadorHttp(body)
            setProcesando(false);
            setMensajeAlert('Exito al realizar la operación');
            getData();
            handleisAlertOpen();
        } catch (error) {
            setProcesando(false);
            setMensajeAlert('Error al realizar la operación');
            handleisAlertOpen();
        }
    }

    /* para descargar el zip de las solicitudes con estatus de pagada  */
    const handleDescargaZip = async (sol: any) => {
        try {
            setProcesando(true);
            const resDocZip = await generarZipSolicitudHttp({ id_solicitud: sol?.id });
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

    /* para cuanbdo alguno de los admins quiere cambiar el tipo de solicitud */
    const handleActualizaTipoSolicitud = async (data: any) => {
        try {
            setProcesando(true);
            const body = {
                id_solicitud: solicitud?.[0]?.id,
                id_tipo_solicitud: data?.[0]?.value
            };
            await atualizaTipoSolicitudHttp(body);
            setProcesando(false);
            setMensajeAlert('Exito al actualizar el tipo de solicitud')
            getData();
            handleisAlertOpen()
        } catch (error) {
            setProcesando(false);
            setMensajeAlert('Error al actualizar el tipo de solicitud')
            handleisAlertOpen()
        }
    }

    /* para cuanbdo alguno de los admins quiere asignar el concepto */
    const handleActualizaConcepto = async (data: any) => {
        try {
            setProcesando(true);
            const body = {
                id_solicitud: solicitud?.[0]?.id,
                id_concepto: data?.[0]?.value
            };
            await actualizaIdConceptoHttp(body);
            setProcesando(false);
            setMensajeAlert('Exito al actualizar el concepto')
            getData();
            handleisAlertOpen()
        } catch (error) {
            setProcesando(false);
            setMensajeAlert('Error al actualizar el concepto')
            handleisAlertOpen()
        }
    }

    /* para cuanbdo se quiere solicitar la carga documental por parte del solicitante */
    const handleSolicitarCargaDocumental = async (data: any) => {
        try {
            setProcesando(true);
            const body = {
                id_solicitud: solicitud?.[0]?.id
            };
            await solicitaCargaDocumentalHttp(body);
            setProcesando(false);
            setMensajeAlert('Exito al solicitar la carga de documentos')
            getData();
            handleisAlertOpen()
        } catch (error) {
            setProcesando(false);
            setMensajeAlert('Error al solicitar la carga de documentos')
            handleisAlertOpen()
        }
    }

    /* para cuando el solicitante quiere eliminar alguno de los documentos no revisados se le pregunta primero */
    const handlePreguntaEliminaArchivo = (data: any) => {
        setOpenPreguntaDocumentoDelete(true);
        setDoocumentoDelete(data)
    }

    /* para cuando el solicitante quiere eliminar alguno de los documentos */
    const handleDeleteFile = async () => {
        try {
            setProcesando(true);
            await deleteDocumentHttp(documentoDelete?.id)
            setProcesando(false);
            setMensajeAlert('Exito al eliminar el documento')
            getData();
            handleisAlertOpen()
        } catch (error) {
            setProcesando(false);
            setMensajeAlert('Error al eliminar el documento')
            handleisAlertOpen()
        }
    }

    /* para notificar a nomina que hay que hacer un descuento  */

    const handleNotificaNomina = async (d:any,c:any) => {
        try {
            setProcesando(true);
            await notificaNominaHttp({id_solicitud:d?.id, id_usuario_notifica:perfil?.idUsuario, importe:c});
            setProcesando(false);
            setMensajeAlert('Exito al notificar a nomina')
            handleisAlertOpen()
        } catch (error) {
            setProcesando(false);
            setMensajeAlert('Error al notificar a nomina')
            handleisAlertOpen()
        }
    }

    return (
        <>
            <AppAppBarC esGastos />
            <Grid container style={{ backgroundColor: '#fff' }} justifyContent="center">
                <Grid item xs={12} style={{ textAlign: 'center', marginBottom: 15, paddingTop: 15, padding: 25 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} style={{ textAlign: 'center', paddingLeft: 40 }}>
                            {useMemo(() => <GacSolicitudDetalle
                                tipoSolicitudes={perfil?.tipoSolicitud || []}
                                handlePreguntaEliminaArchivo={(data) => handlePreguntaEliminaArchivo(data)}
                                handleActualizaTipoSolicitud={(data) => handleActualizaTipoSolicitud(data)}
                                handleActualizaConcepto={(data) => handleActualizaConcepto(data)}
                                esPagador={esPagador}
                                esAutorizador={esAutorizador}
                                esRevisor={esRevisor}
                                conceptos={perfil?.conceptos}
                                estaEnMiCancha={estaEnMiCancha}
                                idUsuario={perfil?.idUsuario}
                                perfil={perfil}
                                item={solicitud?.[0]}
                                procesando={procesando}
                                enAction={(d, a, c) => {
                                    console.log(d,a,c)

                                    if(a === 'notificar_nomina'){
                                        handleNotificaNomina(d, c)
                                    }

                                    if (a === 'documentos') {
                                        handleAddDocumentos(d, c)
                                    }

                                    if (a === 'aprobar') {
                                        setSolicitudDetalle(d)
                                        setJefe(c);
                                        setMuestraConfirmAprobarJefe(true)
                                        setTxtAprobarJefe('¿Desea aprobar esta solicitud?')
                                    }

                                    if (a === 'rechazar') {
                                        setSolicitudDetalle(d)
                                        setJefe(c);
                                        setMuestraConfirmAprobarJefe(true)
                                        setTxtAprobarJefe('¿Desea rechazar esta solicitud?')
                                    }

                                    if (a === 'aprobar_autorizador') {
                                        setMuestraConfirmAprobarJefe(true)
                                        setTxtAprobarJefe('¿Desea autorizar esta solicitud?')
                                    }

                                    if (a === 'rechazar_autorizador') {
                                        setMuestraConfirmAprobarJefe(true)
                                        setTxtAprobarJefe('¿Desea rechazar esta solicitud.?')
                                    }

                                    if (a === 'solicitar_apribacion_direccion_general') {
                                        handleSolicitarAprobacionDireccionGeneral(d)
                                    }

                                    if (a === 'aprobar_documentos_revisor') {
                                        setDocumentosSolicitudDetalle(c)
                                        setSolicitudDetalle(d)
                                        setConfirmDocumentosRevisorRevisa(true)
                                        setTxtConfirmDocumentosRevisorRevisa('¿Desea aprobar los documentos seleccionados?')
                                    }
                                    
                                    if (a === 'rechazar_documentos_revisor') {
                                        setDocumentosSolicitudDetalle(c)
                                        setSolicitudDetalle(d)
                                        setConfirmDocumentosRevisorRevisa(true)
                                        setTxtConfirmDocumentosRevisorRevisa('¿Desea rechzar los documentos seleccionados?')
                                    }

                                    if (a === 'aprobar_revisor') {
                                        setSolicitudDetalle(d)
                                        setMuestraConfirmAprobarJefe(true)
                                        setTxtAprobarJefe('¿Desea revisar esta solicitud como correcta?')
                                    }

                                    if (a === 'rechazar_revisor') {
                                        setSolicitudDetalle(d)
                                        setMuestraConfirmAprobarJefe(true)
                                        setTxtAprobarJefe('¿Desea revisar esta solicitud como incorrecta?')
                                    }

                                    if (a === 'aprobar_pagador') {
                                        handleApruebaSolicitudPagador(d)
                                    }
                                    if (a === 'descargaZIP') {
                                        handleDescargaZip(d);
                                    }

                                    if (a === 'solicitar_carga_documental') {
                                        handleSolicitarCargaDocumental(d)
                                    }

                                }} />, [estaEnMiCancha, esAutorizador, esRevisor, solicitud?.[0], procesando])}
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

                <ModalConfirm
                    onAcept={() => {
                        handleNotificaJefes();
                    }} onCancel={() => {
                        setDocumentosCargados(false);
                        setDocumentosCargadosMuestra(false)
                    }} open={documentosCargados} text={solicitud?.[0]?.requiere_aprobacion_revisor === 1 ? '¿Desea notificar a los revisores que se han cargado documentos?' : '¿Desea notificar al autorizador que se han cargado documentos?'} title={''} />

                <ModalConfirm
                    esCambioEstatusEstimacion
                    onAcept={(comentarios: any) => {
                        if (txtAprobarJefe === '¿Desea aprobar esta solicitud?') {
                            handleApruebaSolicitud(comentarios)
                        } else if (txtAprobarJefe === '¿Desea rechazar esta solicitud?') {
                            handleRechazaSolicitud(comentarios)
                        }
                        if (txtAprobarJefe === '¿Desea autorizar esta solicitud?') {
                            handleApruebaSolicitudAutorizador(comentarios)
                        } else if (txtAprobarJefe === '¿Desea rechazar esta solicitud.?') {
                            handleRechazaSolicitudAutorizador(comentarios)
                        }
                        /* TODO falta la seccion del revisor cuando aprueba la solicitud o cuando la rechaza */
                        if (txtAprobarJefe === '¿Desea revisar esta solicitud como correcta?') {
                            handleApruebaSolicitudRevisor(comentarios)
                        } else if (txtAprobarJefe === '¿Desea revisar esta solicitud como incorrecta?') {
                            handleRechazaSolicitudRevisor(comentarios)
                        }


                        setMuestraConfirmAprobarJefe(false);
                    }} onCancel={() => {
                        setMuestraConfirmAprobarJefe(false);
                        setSolicitudDetalle(null)
                        setJefe(null);
                    }} open={muestraConfirmAprobarJefe} text={txtAprobarJefe} title={''} />

                <ModalConfirm
                    esCambioEstatusEstimacion
                    onAcept={(coment) => {
                        handleDocumentosRevisorRevisa(txtConfirmDocumentosRevisorRevisa === '¿Desea aprobar los documentos seleccionados?' ? true : false, coment);
                    }} onCancel={() => {
                        setConfirmDocumentosRevisorRevisa(false);
                        setTxtConfirmDocumentosRevisorRevisa('')

                    }} open={confirmDocumentosRevisorRevisa} text={txtConfirmDocumentosRevisorRevisa} title={''} />

                <ModalConfirm
                    onAcept={() => {
                        handleDeleteFile();
                        setOpenPreguntaDocumentoDelete(false);
                    }} onCancel={() => {
                        setOpenPreguntaDocumentoDelete(false);
                        setDoocumentoDelete(null)
                    }} open={openPreguntaDocumentoDelete} text={'¿Desea eliminar el documentos seleccionado?'} title={''} />

            </Grid >
        </>
    );
}
export default GacSolicitudDetalleScreen;