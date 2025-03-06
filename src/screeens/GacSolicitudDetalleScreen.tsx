import { Backdrop, CircularProgress, Grid } from '@mui/material';
import AppAppBarC from '../componets/Carrusel/AppAppBarC';
import ModalComponent from '../componets/Modal';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import GacSolicitudDetalle from '../componets/GacSolicitudDetalle/GacSolicitudDetalle';
import { useSearchParams } from 'react-router-dom';
import { apruebaSolicitudJefeDirectoHttp, cambioEnSolicitudAutorizadorHttp, cambioEnSolicitudPagadorHttp, cambioEnSolicitudRevisorHttp, generarZipSolicitudHttp, getDetalleSolicitudHttp, handleDocumentosRevisorRevisaHttp, notificaRevisoresFiscalesHttp, setDocumentoSolicitudHttp, solicitaAprobacionDireccionGeneralHttp } from '../actions/solicitud';
import { GacUserQueryParamsContext } from '../context/GacUserQueryParamsContexto';
import env from "react-dotenv";
import ModalConfirm from '../componets/ModalConfirm/ModalConfirm';


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
        if (documentosCargadosMuestra && !solicitudDocumentos?.length && solicitud?.[0]?.id_usuario_autorizador) {
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
            const res = await getDetalleSolicitudHttp(idSolicitud, perfil?.idUsuario);
            setSolicitud(res.map((r: any) => {
                const solicitaName = perfil?.usuariosTodos.find((w: any) => w?.id_usuario === r?.solicita)?.nombre + ' ' + perfil?.usuariosTodos.find((w: any) => w?.id_usuario === r?.solicita)?.apellidos;
                const beneficiarioName = perfil?.usuariosTodos.find((w: any) => w?.id_usuario === r?.beneficiario)?.nombre + ' ' + perfil?.usuariosTodos.find((w: any) => w?.id_usuario === r?.beneficiario)?.apellidos;
                const proyecto = perfil?.proyectos.find((w: any) => w?.id === r?.id_proyecto)?.nombre;
                const empresa = perfil?.empresas.find((w: any) => w?.id === r?.id_empresa)?.nombre;
                return {
                    ...r,
                    ...{
                        solicitaName,
                        beneficiarioName,
                        proyecto,
                        empresa
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
            setProcesando(false);
            setMensajeAlert('Error al obtener la información de la solicitud');
            handleisAlertOpen();
        }
    }, [idSolicitud, perfil, perfil?.idUsuario]);

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
                    const data1: any = new FormData();
                    data1.append("importe", cat?.importe);
                    data1.append("nombre_corto", cat?.nombre);
                    data1.append("descripcion", cat?.descripcion);
                    data1.append("tipo_moneda", cat?.moneda);
                    data1.append("documento_valido", cat?.documento_valido === 'si' ? '1' : '0');
                    data1.append("descripcion_documento_validado", cat?.motivo_valido);
                    data1.append("nombre_documento", cat?.path);
                    data1.append("id_solicitud", solicitud?.id);
                    data1.append("id_usuario", perfil?.idUsuario);
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
            await notificaRevisoresFiscalesHttp(data);
            setDocumentosCargadosMuestra(false)
            setProcesando(false);
            setMensajeAlert('Se ha notificado a los revisores con exito');
            handleisAlertOpen();
        } catch (error) {
            setDocumentosCargados(false);
            setDocumentosCargadosMuestra(false)
            setProcesando(true);
            setMensajeAlert('Error al notificar a los revisores');
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
                comentarios: coments
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
                comentarios: coments
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
    const handleDocumentosRevisorRevisa = async (apruebaOrechaza:any, coment:any) => {
        try {
            setProcesando(true);
            const body = {
                id_solicitud:solicitudDetalle?.id,
                documentos:documentosSolicitudDetalle,
                aprueba:apruebaOrechaza,
                comentarios_supervisor : coment,
                id_usuario:perfil?.idUsuario
            }
            await handleDocumentosRevisorRevisaHttp(body);
            setDocumentosSolicitudDetalle(null)
            setSolicitudDetalle(null)
            setConfirmDocumentosRevisorRevisa(false);
            getData();
            /* setProcesando(false); */
            const txt = 'Se han '+ (apruebaOrechaza ? 'aprobado' : 'rechazado')  +' los documentos seleccionados';
            setMensajeAlert(txt);
            handleisAlertOpen();
        } catch (error) {
            setDocumentosSolicitudDetalle(null)
            setSolicitudDetalle(null)
            setConfirmDocumentosRevisorRevisa(false);
            setProcesando(false);
            const txt = 'Error al '+ (apruebaOrechaza ? 'aprobar' : 'rechazar')  +' los documentos seleccionados';
            setMensajeAlert(txt);
            handleisAlertOpen();
        }
    }


    /*  para aprobar la solcitud como un revisor */
    const handleApruebaSolicitudRevisor = async (comentarios:string) => {
        try {
            setProcesando(true);
            
            const body = {
                id_solicitud : solicitudDetalle?.id,
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
    const handleRechazaSolicitudRevisor = async (comentarios:string) => {
        try {
            setProcesando(true);
            const body = {
                id_solicitud : solicitudDetalle?.id,
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


    const handleApruebaSolicitudPagador = async (d:any)=>{
        try {
            setProcesando(true);
            const body = {
                id_usuario: perfil?.idUsuario,
                usuario_nombre: perfil?.nombre,
                id_solicitud : d?.id,
                comentarios:'El pagador se dio por enterado'
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


    const handleDescargaZip = async (sol:any) => {
            try {
                setProcesando(true);
                console.log(solicitudDetalle)
                const resDocZip = await generarZipSolicitudHttp({ id_solicitud: sol?.id });
                window.open(`${env.API_URL_DOCUMENTOS}${resDocZip }`);
                setProcesando(false);
                setMensajeAlert('Exito al descargar los documentos')
                handleisAlertOpen()
            } catch (error) {
                setProcesando(false);
                setMensajeAlert('Error al descargar los documentos')
                handleisAlertOpen()
            }
        }


    return (
        <>
            <AppAppBarC />
            <Grid container style={{ backgroundColor: '#fff', position: 'relative', top: 15, height: 'auto' }} justifyContent="center">
                <Grid item xs={12} style={{ textAlign: 'center', marginBottom: 15, paddingTop: 15, padding: 25 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} style={{ textAlign: 'center', paddingLeft: 40 }}>
                            {useMemo(() => <GacSolicitudDetalle
                                esPagador={esPagador}
                                esAutorizador={esAutorizador}
                                esRevisor={esRevisor}
                                estaEnMiCancha={estaEnMiCancha}
                                idUsuario={perfil?.idUsuario}
                                perfil={perfil}
                                item={solicitud?.[0]} 
                                procesando={procesando} 
                                enAction={(d, a, c) => {
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
                                    if(a==='aprobar_pagador'){
                                        handleApruebaSolicitudPagador(d)
                                    }
                                    if(a === 'descargaZIP'){
                                        handleDescargaZip(d);
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
                    }} open={documentosCargados} text={'¿Desea notificar a los revisores que se han cargado documentos?'} title={''} />

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
                        handleDocumentosRevisorRevisa(txtConfirmDocumentosRevisorRevisa === '¿Desea aprobar los documentos seleccionados?' ? true : false , coment);
                    }} onCancel={() => {
                        setConfirmDocumentosRevisorRevisa(false);
                        setTxtConfirmDocumentosRevisorRevisa('')

                    }} open={confirmDocumentosRevisorRevisa} text={txtConfirmDocumentosRevisorRevisa} title={''} />


            </Grid >
        </>
    );
}
export default GacSolicitudDetalleScreen;