import React, { useCallback, useMemo, useState } from 'react';
import env from "react-dotenv";
import PreviewIcon from '@mui/icons-material/Preview';
import * as Yup from "yup";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, Divider, Grid, Link, List, ListItem, ListItemText, Paper, Tooltip, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import _ from 'lodash';
import CloseIcon from '@mui/icons-material/Close';
import { numericFormatter } from 'react-number-format';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import InfoIcon from '@mui/icons-material/Info';
import TimelineList from '../../examples/Timeline/TimelineList';
import TimelineItem from '../../examples/Timeline/TimelineItem';
import DinamicTableMejorada from '../../componets/DinamicTableMejorada/DinamicTableMejorada';
import DragAndDropField from '../../componets/DragAndDropField';
import CheckIcon from '@mui/icons-material/Check';
import HistoryIcon from '@mui/icons-material/History';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FolderIcon from '@mui/icons-material/Folder';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import EditIcon from '@mui/icons-material/Edit';
import './style.scss'
import { Form } from 'react-bootstrap';
import { FormikProvider, useFormik } from 'formik';
import { useIntl } from 'react-intl';
import SelectMultipleAutoCompleteField from '../../componets/SelectMultipleAutoCompleteField/SelectMultipleAutoCompleteField';

interface GacSolicitudDetalleProps {
    item?: any
    procesando: boolean
    enAction: (data: any, accion: string, d?: any) => void
    idUsuario: any
    estaEnMiCancha: boolean
    esAutorizador: boolean
    esPagador: boolean
    esRevisor: boolean
    perfil: any
    conceptos: any[]
    tipoSolicitudes: any[]
    handleActualizaTipoSolicitud: (data: any) => void
    handleActualizaConcepto: (data: any) => void
    handlePreguntaEliminaArchivo?: (data: any) => void
}

const GacSolicitudDetalle: React.FC<GacSolicitudDetalleProps> = (props: GacSolicitudDetalleProps) => {
    const intl = useIntl();

    const [documentosSeleccionados, setDocumentosSeleccionados] = useState([]);
    const [editaTipoDeSoliitud, setEditaTipoDeSoliitud] = useState(false);
    const [editaConcepto, setEditaConcepto] = useState(false);

    const [id_tipo_solicitud, setId_tipo_solicitud] = useState<any>([]);
    const [id_concepto, setId_concepto] = useState<any>([]);

    const formik = useFormik({
        initialValues: {
            id_tipo_solicitud: [],
            id_concepto: [],
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            id_tipo_solicitud: Yup.array().min(1, intl.formatMessage({ id: "input_validation_requerido" })).required('Requerido'),
            id_concepto: Yup.array().min(1, intl.formatMessage({ id: "input_validation_requerido" })).required('Requerido')
        }),
    });
    return (
        <div>
            <Grid container spacing={2} mt={5} style={{ padding: 15 }}>

                <Grid item xs={12} md={8} style={{ paddingLeft: 30 }}>

                    <Card sx={{ position: "relative", p: 2, borderRadius: 2, boxShadow: 3, }} style={{ boxShadow: 'none', border: 'solid 1px rgb(218, 222, 230)' }}>
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
                                Tren de autorizaciones <FormatListNumberedIcon color='error' />
                            </Typography>
                        </Box>
                        <CardContent style={{ paddingLeft: 0, paddingRight: 0, width: '100%' }}>
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"

                                >
                                    <Typography component="span" style={{ fontSize: 12 }}>Todas las interacciones de los usuarios con la solicitud {
                                        props?.estaEnMiCancha ? <Tooltip title="La solicitud está esperando que usted emita su juicio"><InfoIcon className='pulsante' fontSize='medium' color='info' /></Tooltip> : null
                                    } </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={12} style={{ paddingLeft: 30 }}>
                                            <Paper style={{ padding: 16, width: '100%', margin: "auto" }}>
                                                <List>

                                                    {/* Sección para los autorizadores, jefes directos solamante y en caso de que el autorizador, tambien el mto inge lozano  */}
                                                    {(props?.item?.autorizadores || []).filter((r: any) => r?.requiere_aprobacion).map((registro: any, index: any) => (
                                                        <React.Fragment key={index} >
                                                            <ListItem
                                                                secondaryAction={
                                                                    <div style={{ padding: 15 }}>
                                                                        {props?.estaEnMiCancha && registro.autorizo === null && registro.requiere_aprobacion && (props?.idUsuario !== props?.item?.solicita && props?.idUsuario !== props?.item?.beneficiario) && registro?.id_usuario === props?.idUsuario ? <Grid item xs={12} md={12} style={{ paddingLeft: 30 }}>
                                                                            <Button
                                                                                size="small"
                                                                                variant="outlined"
                                                                                color='success'
                                                                                style={{ backgroundColor: '#75d175', color: '#ffff' }}
                                                                                onClick={() => {
                                                                                    props?.enAction(props?.item, 'aprobar', registro)
                                                                                }}
                                                                            > Aprobar  </Button>
                                                                            <br />
                                                                            <Button
                                                                                size="small"
                                                                                variant="outlined"
                                                                                color='warning'
                                                                                style={{ backgroundColor: '#f17171', color: '#ffff' }}
                                                                                onClick={() => {
                                                                                    props?.enAction(props?.item, 'rechazar', registro)
                                                                                }}
                                                                            > Rechazar  </Button>
                                                                        </Grid> : null}
                                                                    </div>
                                                                }
                                                                style={{ backgroundColor: registro?.id_usuario === props?.idUsuario ? 'rgb(247 247 247)' : '#fff', paddingLeft: 15, paddingRight: 15, borderRadius: 10 }}>
                                                                <ListItemText
                                                                    primary={`Usuario: ${registro.nombreUsuario}`}
                                                                    secondary={
                                                                        <>
                                                                            <Typography component="span" variant="body2" color="textPrimary">
                                                                                Fecha registro: {registro.fecha_registro}
                                                                            </Typography>
                                                                            <br />
                                                                            Aprobó la solicitud: {registro.autorizo === 1 ? <>Si <CheckIcon color='success' /></> : registro.autorizo === 0 ? <>No <CloseIcon color={'error'} /></> : <span style={{ color: '#f44336' }}>Pendiente de autorizar</span>}
                                                                            <br />
                                                                            Fecha aprobada: {registro.fecha_accion || 'El usuario aun no ejerce su opinión sobre esta solicitud'}
                                                                            <br />
                                                                            Comentarios: {registro.comentarios || "Sin comentarios registrados"}
                                                                            <br />
                                                                            Requiere aprobación: {registro.requiere_aprobacion ? <>Si <CheckIcon color='success' /></> : <>No <CloseIcon color={'error'} /></>}
                                                                            <br />
                                                                            Vista el: {registro.fecha_visto || 'El usuario aun no ve la solicitud'}
                                                                        </>
                                                                    }
                                                                />
                                                            </ListItem>
                                                            {index < (props?.item?.autorizadores || []).length - 1 && <Divider />}
                                                        </React.Fragment>
                                                    ))}

                                                    {/* El usuario autorizador va a ejercer su opinion sobre la solicitud */}
                                                    {props?.estaEnMiCancha && props?.esAutorizador && props?.item?.id_usuario_autorizador === null ?
                                                        <React.Fragment>
                                                            <Divider />
                                                            <ListItem
                                                                secondaryAction={
                                                                    <div style={{ padding: 15 }}>

                                                                        {props?.item?.requiere_documentos === 1 && props?.item?.requiere_aprobacion_revisor === 0 && !(props?.item?.documentos || []).filter((r: any) => r?.es_valido_revisor === 1)?.length && (props?.item?.documentos || [])?.length ?
                                                                            <Link
                                                                                style={{ fontSize: 14, backgroundColor: '#f17171', color: '#ffff', padding: 5, borderRadius: 5, fontWeight: 500 }}
                                                                                href={`#documentos_seccion`}
                                                                                className='pulsante'
                                                                            >
                                                                                Aun hay documentos que tienes que revisar
                                                                            </Link> : null}
                                                                        {props?.item?.requiere_documentos === 1 && props?.item?.requiere_aprobacion_revisor === 0 && !(props?.item?.documentos || []).filter((r: any) => r?.es_valido_revisor === 1)?.length && (props?.item?.documentos || [])?.length ? <br /> : null}


                                                                        {props?.item?.requiere_documentos === 1 && !(props?.item?.documentos || []).filter((r: any) => r?.es_valido_revisor === 1)?.length && !(props?.item?.documentos || [])?.length && props?.item?.requiere_aprobacion_revisor === 0 ? <Button
                                                                            size="small"
                                                                            variant="outlined"
                                                                            color='error'
                                                                            style={{ backgroundColor: '#f17171', color: '#ffff' }}
                                                                            onClick={() => {
                                                                                props?.enAction(props?.item, 'solicitar_carga_documental', null)
                                                                            }}
                                                                        >Notificar al solicitante que cargue documentos</Button> : null}
                                                                        {props?.item?.requiere_documentos === 1 && !(props?.item?.documentos || []).filter((r: any) => r?.es_valido_revisor === 1)?.length && !(props?.item?.documentos || [])?.length && props?.item?.requiere_aprobacion_revisor === 0 ? <br /> : null}


                                                                        {(props?.item?.requiere_documentos === 1 && (props?.item?.documentos || []).filter((r: any) => r?.es_valido_revisor === 1)?.length) || (props?.item?.requiere_documentos === 0 || props?.item?.requiere_aprobacion_revisor === 1) ? <Button
                                                                            size="small"
                                                                            variant="outlined"
                                                                            color='success'
                                                                            style={{ backgroundColor: '#75d175', color: '#ffff' }}
                                                                            onClick={() => {
                                                                                props?.enAction(props?.item, 'aprobar_autorizador', null)
                                                                            }}
                                                                        > Aprobar como autorizador </Button> : null}
                                                                        {(props?.item?.requiere_documentos === 1 && (props?.item?.documentos || []).filter((r: any) => r?.es_valido_revisor === 1)?.length) || (props?.item?.requiere_documentos === 0 || props?.item?.requiere_aprobacion_revisor === 1) ? <br /> : null}


                                                                        {((props?.item?.autorizadores || []).filter((r: any) => r?.autorizo === 1)?.length !== (props?.item?.autorizadores || [])?.length) && ((props?.item?.requiere_documentos === 1 && (props?.item?.documentos || []).filter((r: any) => r?.es_valido_revisor === 1)?.length) || (props?.item?.requiere_documentos === 0 || props?.item?.requiere_aprobacion_revisor === 1)) ? <Button
                                                                            size="small"
                                                                            variant="outlined"
                                                                            color='warning'
                                                                            style={{ backgroundColor: '#f17171', color: '#ffff' }}
                                                                            onClick={() => {
                                                                                props?.enAction(props?.item, 'rechazar_autorizador', null)
                                                                            }}
                                                                        > Rechazar como autorizador </Button> : null}
                                                                        {((props?.item?.autorizadores || []).filter((r: any) => r?.autorizo === 1)?.length !== (props?.item?.autorizadores || [])?.length) && ((props?.item?.requiere_documentos === 1 && (props?.item?.documentos || []).filter((r: any) => r?.es_valido_revisor === 1)?.length) || (props?.item?.requiere_documentos === 0 || props?.item?.requiere_aprobacion_revisor === 1)) ? <br /> : null}


                                                                        {(props?.item?.autorizadores || []).filter((r: any) => r?.requiere_aprobacion === 0 && r?.autorizo === null)?.length ? <Button
                                                                            size="small"
                                                                            variant="outlined"
                                                                            color='info'
                                                                            style={{ backgroundColor: 'rgb(241 200 107)', color: '#ffff' }}
                                                                            onClick={() => {
                                                                                props?.enAction(props?.item, 'solicitar_apribacion_direccion_general', null)
                                                                            }}
                                                                        > Solicitar aprobación de dirección general </Button> : null}
                                                                    </div>
                                                                }
                                                                style={{ backgroundColor: 'rgb(247 247 247)', paddingLeft: 15, paddingRight: 15, borderRadius: 10 }}>
                                                                <ListItemText
                                                                    primary={`Usuario: ${props?.perfil?.nombre}`}
                                                                    secondary={
                                                                        <>
                                                                            <Typography component="span" variant="body2" color="textPrimary">
                                                                                Estatus: {props?.item?.autorizo_usuario_autorizador === 1 ? <>Si <CheckIcon color='success' /></> : props?.item?.autorizo_usuario_autorizador === 0 ? <>No <CloseIcon color={'error'} /></> : <span style={{ color: '#f44336' }}>Pendiente de autorizar</span>}
                                                                            </Typography>
                                                                            <br />
                                                                            Fecha aprobada: {props?.item?.fecha_id_usuario_autorizador || 'El usuario aun no ejerce su opinión sobre esta solicitud'}
                                                                            <br />
                                                                            Comentarios: {props?.item?.comentarios_usuario_autorizador || "Sin comentarios registrados"}
                                                                        </>
                                                                    }
                                                                />
                                                            </ListItem>
                                                        </React.Fragment> : null}

                                                    {/* El usuario autorizador ya emitio un juicio sobre esta solicitud */}
                                                    {
                                                        props?.item?.id_usuario_autorizador ?
                                                            <React.Fragment>
                                                                <Divider />
                                                                <ListItem
                                                                    secondaryAction={
                                                                        <div style={{ padding: 15 }}>
                                                                        </div>
                                                                    }
                                                                    style={{ backgroundColor: +props?.item?.id_usuario_autorizador === +props?.idUsuario ? 'rgb(247 247 247)' : '#FFFF', paddingLeft: 15, paddingRight: 15, borderRadius: 10 }}>
                                                                    <ListItemText
                                                                        primary={`Usuario autorizador: ${(props?.perfil?.usuariosTodos || []).find((r: any) => +r?.id_usuario === +props?.item?.id_usuario_autorizador)?.nombre || ''} ${(props?.perfil?.usuariosTodos || []).find((r: any) => +r?.id_usuario === +props?.item?.id_usuario_autorizador)?.apellidos || ''}`}
                                                                        secondary={
                                                                            <>
                                                                                <Typography component="span" variant="body2" color="textPrimary">
                                                                                    Aprobó la solicitud: {props?.item?.autorizo_usuario_autorizador === 1 ? <>Si <CheckIcon color='success' /></> : props?.item?.autorizo_usuario_autorizador === 0 ? <>No <CloseIcon color={'error'} /></> : <span style={{ color: '#f44336' }}>Pendiente de autorizar</span>}
                                                                                </Typography>
                                                                                <br />
                                                                                Fecha aprobada: {props?.item?.fecha_id_usuario_autorizador || 'El autorizador aun no ejerce su opinión sobre esta solicitud'}
                                                                                <br />
                                                                                Comentarios: {props?.item?.comentarios_usuario_autorizador || "Sin comentarios registrados"}
                                                                            </>
                                                                        }
                                                                    />
                                                                </ListItem>
                                                            </React.Fragment> :
                                                            null
                                                    }
                                                    {/* El usuario revisor va a ejercer su opinion sobre la solicitud */}

                                                    {
                                                        props?.estaEnMiCancha && props?.esRevisor && props?.item?.id_usuario_revisor === null ?
                                                            <React.Fragment>
                                                                <Divider />
                                                                <ListItem
                                                                    secondaryAction={
                                                                        <div style={{ padding: 15 }}>
                                                                            {props?.item?.requiere_documentos === 1 && !(props?.item?.documentos || []).filter((r: any) => r?.es_valido_revisor === 1)?.length ? <Link
                                                                                style={{ fontSize: 14, backgroundColor: '#f17171', color: '#ffff', padding: 5, borderRadius: 5, fontWeight: 500 }}
                                                                                href={`#documentos_seccion`}
                                                                                className='pulsante'
                                                                            >
                                                                                Aun hay documentos que tienes que revisar
                                                                            </Link> : null}
                                                                            {props?.item?.requiere_documentos === 0 || (props?.item?.documentos || []).filter((r: any) => +r?.es_valido_revisor === 1)?.length ? <Button
                                                                                size="small"
                                                                                variant="outlined"
                                                                                color='success'
                                                                                style={{ backgroundColor: '#75d175', color: '#ffff' }}
                                                                                onClick={() => {
                                                                                    props?.enAction(props?.item, 'aprobar_revisor', null)
                                                                                }}
                                                                            > Aprobar como revisor fiscal </Button> : null}
                                                                            {(props?.item?.documentos || []).filter((r: any) => r?.es_valido_revisor === 1)?.length ? <br /> : null}
                                                                            {/*  {props?.item?.requiere_documentos === 0 || (props?.item?.documentos || []).filter((r: any) => r?.es_valido_revisor === 1)?.length ? <Button
                                                                                size="small"
                                                                                variant="outlined"
                                                                                color='warning'
                                                                                style={{ backgroundColor: '#f17171', color: '#ffff' }}
                                                                                onClick={() => {
                                                                                    props?.enAction(props?.item, 'rechazar_revisor', null)
                                                                                }}
                                                                            > Rechazar como revisor </Button> : null}
                                                                            <br /> */}
                                                                        </div>
                                                                    }
                                                                    style={{ backgroundColor: 'rgb(247 247 247)', paddingLeft: 15, paddingRight: 15, borderRadius: 10 }}>
                                                                    <ListItemText
                                                                        primary={`Usuario: ${props?.perfil?.nombre}`}
                                                                        secondary={
                                                                            <>
                                                                                <Typography component="span" variant="body2" color="textPrimary">
                                                                                    Estatus: {props?.item?.autorizo_usuario_revisor === 1 ? <>Si <CheckIcon color='success' /></> : props?.item?.autorizo_usuario_revisor === 0 ? <>No <CloseIcon color={'error'} /></> : 'La solicitud se encuentra en revisión'}
                                                                                </Typography>
                                                                                <br />
                                                                                Fecha aprobada: {props?.item?.fecha_id_usuario_revisor || 'aaaa-mm-dd'}
                                                                                <br />
                                                                                Comentarios: {props?.item?.comentarios_usuario_revisor || "Sin comentarios registrados"}
                                                                            </>
                                                                        }
                                                                    />
                                                                </ListItem>
                                                            </React.Fragment> : null
                                                    }

                                                    {/* El usuario revisor ya emitio un juicio sobre esta solicitud */}
                                                    {
                                                        props?.item?.id_usuario_revisor ?
                                                            <React.Fragment>
                                                                <Divider />
                                                                <ListItem
                                                                    secondaryAction={
                                                                        <div style={{ padding: 15 }}>
                                                                        </div>
                                                                    }
                                                                    style={{ backgroundColor: +props?.item?.id_usuario_revisor === +props?.idUsuario ? 'rgb(247 247 247)' : '#FFFF', paddingLeft: 15, paddingRight: 15, borderRadius: 10 }}>
                                                                    <ListItemText
                                                                        primary={`Usuario revisor fiscal: ${(props?.perfil?.usuariosTodos || []).find((r: any) => +r?.id_usuario === +props?.item?.id_usuario_revisor)?.nombre || ''} ${(props?.perfil?.usuariosTodos || []).find((r: any) => +r?.id_usuario === +props?.item?.id_usuario_revisor)?.apellidos || ''}`}
                                                                        secondary={
                                                                            <>
                                                                                <Typography component="span" variant="body2" color="textPrimary">
                                                                                    Aprobó la solicitud: {props?.item?.autorizo_usuario_revisor === 1 ? <>Si <CheckIcon color='success' /></> : props?.item?.autorizo_usuario_revisor === 0 ? <>No <CloseIcon color={'error'} /></> : <span style={{ color: '#f44336' }}>Pendiente de autorizar</span>}
                                                                                </Typography>
                                                                                <br />
                                                                                Fecha aprobada: {props?.item?.fecha_id_usuario_revisor || 'El autorizador aun no ejerce su opinión sobre esta solicitud'}
                                                                                <br />
                                                                                Comentarios: {props?.item?.comentarios_usuario_revisor || "Sin comentarios registrados"}
                                                                            </>
                                                                        }
                                                                    />
                                                                </ListItem>
                                                            </React.Fragment> :
                                                            null
                                                    }

                                                    {/* El usuario pagador ya emitio un juicio sobre esta solicitud */}
                                                    {
                                                        props?.item?.id_usuario_pagada ?
                                                            <React.Fragment>
                                                                <Divider />
                                                                <ListItem
                                                                    secondaryAction={
                                                                        <div style={{ padding: 15 }}>
                                                                        </div>
                                                                    }
                                                                    style={{ backgroundColor: +props?.item?.id_usuario_pagada === +props?.idUsuario ? 'rgb(247 247 247)' : '#FFFF', paddingLeft: 15, paddingRight: 15, borderRadius: 10 }}>
                                                                    <ListItemText
                                                                        primary={`Usuario pagador: ${(props?.perfil?.usuariosTodos || []).find((r: any) => +r?.id_usuario === +props?.item?.id_usuario_pagada)?.nombre || ''} ${(props?.perfil?.usuariosTodos || []).find((r: any) => +r?.id_usuario === +props?.item?.id_usuario_pagada)?.apellidos || ''}`}
                                                                        secondary={
                                                                            <>
                                                                                <Typography component="span" variant="body2" color="textPrimary">
                                                                                    Aprobó la solicitud: {props?.item?.autorizo_usuario_pagada === 1 ? <>Si <CheckIcon color='success' /></> : props?.item?.autorizo_usuario_pagada === 0 ? <>No <CloseIcon color={'error'} /></> : <span style={{ color: '#f44336' }}>Pendiente de autorizar</span>}
                                                                                </Typography>
                                                                                <br />
                                                                                Fecha aprobada: {props?.item?.fecha_id_usuario_pagada || 'El autorizador aun no ejerce su opinión sobre esta solicitud'}
                                                                                <br />
                                                                                Comentarios: {props?.item?.comentarios_usuario_pagada || "Sin comentarios registrados"}
                                                                            </>
                                                                        }
                                                                    />
                                                                </ListItem>
                                                            </React.Fragment> :
                                                            null
                                                    }

                                                    {/* El usuario pagador va a ejercer su opinion sobre la solicitud */}
                                                    {props?.estaEnMiCancha && props?.esPagador && props?.item?.id_usuario_pagada === null ?
                                                        <React.Fragment>
                                                            <Divider />
                                                            <ListItem
                                                                secondaryAction={
                                                                    <div style={{ padding: 15 }}>
                                                                        <Button
                                                                            size="small"
                                                                            variant="outlined"
                                                                            color='success'
                                                                            style={{ backgroundColor: '#75d175', color: '#ffff' }}
                                                                            onClick={() => {
                                                                                props?.enAction(props?.item, 'aprobar_pagador', null)
                                                                            }}
                                                                        > Registrar como pagado </Button>
                                                                    </div>
                                                                }
                                                                style={{ backgroundColor: 'rgb(247 247 247)', paddingLeft: 15, paddingRight: 15, borderRadius: 10 }}>
                                                                <ListItemText
                                                                    primary={`Usuario pagador: ${props?.perfil?.nombre}`}
                                                                    secondary={
                                                                        <>
                                                                            <Typography component="span" variant="body2" color="textPrimary">
                                                                                Estatus: {props?.item?.autorizo_usuario_pagada === 1 ? <>Si <CheckIcon color='success' /></> : props?.item?.autorizo_usuario_pagada === 0 ? <>No <CloseIcon color={'error'} /></> : <span style={{ color: '#f44336' }}>Pendiente de autorizar</span>}
                                                                            </Typography>
                                                                            <br />
                                                                            Fecha aprobada: {props?.item?.fecha_id_usuario_pagada || 'El usuario aun no ejerce su opinión sobre esta solicitud'}
                                                                            <br />
                                                                            Comentarios: {props?.item?.comentarios_usuario_pagada || "Sin comentarios registrados"}
                                                                        </>
                                                                    }
                                                                />
                                                            </ListItem>
                                                        </React.Fragment> : null}
                                                </List>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4} style={{ paddingLeft: 30 }}>
                    <Card sx={{ position: "relative", p: 2, borderRadius: 2, boxShadow: 3, }} style={{ boxShadow: 'none', border: 'solid 1px rgb(218, 222, 230)' }}>
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
                                Historia de la solicitud <HistoryIcon color='error' />
                            </Typography>
                        </Box>
                        <CardContent style={{ paddingLeft: 0, paddingRight: 0, width: '100%' }}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography component="span" style={{ fontSize: 12 }}>Bitácora de eventos de la solicitud</Typography>
                                </AccordionSummary>
                                <AccordionDetails >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={12} style={{ paddingLeft: 30 }}>
                                            <TimelineList title="">
                                                {
                                                    (props?.item?.bitacora || []).map((r: any, key: any) => {
                                                        return (
                                                            <TimelineItem
                                                                key={key}
                                                                onSelec={() => { }}
                                                                color="info"
                                                                icon="info"
                                                                title={r?.evento}
                                                                subtitle={r?.descripcion}
                                                                dateTime={r?.creado}
                                                                lastItem={(props?.item?.bitacora || []).length === key + 1}
                                                            />
                                                        )
                                                    })
                                                }
                                            </TimelineList>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>

                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={12} style={{ textAlign: 'left', paddingLeft: 30 }}>
                    <Card sx={{ position: "relative", p: 2, borderRadius: 2, boxShadow: 3 }} style={{ boxShadow: 'none', border: 'solid 1px rgb(218, 222, 230)' }}>
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
                            <Typography variant="h6" fontWeight="medium"> Información general <InfoIcon color='error' /> </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
                            {(!props?.esAutorizador && !props?.esPagador && !props?.esRevisor) ? <p style={{ fontSize: 15 }}> <strong>Tipo de solicitud: </strong>{props?.item?.tipo_solicitud} </p> : null}

                            {props?.item?.id_estatus !== 1 ? <p style={{ fontSize: 15 }}> <strong>Tipo de solicitud: </strong>{props?.item?.tipo_solicitud} </p> : null}

                            {(props?.esAutorizador || props?.esPagador || props?.esRevisor) && props?.item?.id_estatus === 1 && !editaTipoDeSoliitud ?
                                <p style={{ fontSize: 15 }}> <strong>Tipo de solicitud: </strong>{props?.item?.tipo_solicitud}
                                    <span onClick={() => {
                                        setEditaTipoDeSoliitud(true)
                                    }} style={{ cursor: 'pointer' }} title='Cambiar el tipo de solicitud'><EditIcon color='info' /></span>

                                </p> : (props?.esAutorizador || props?.esPagador || props?.esRevisor) && props?.item?.id_estatus === 1 && editaTipoDeSoliitud ? <div style={{ width: '250px' }}>
                                    <FormikProvider value={formik}>
                                        <Form.Group style={{ width: '100%' }}>
                                            <SelectMultipleAutoCompleteField
                                                label={'Tipo de solicitud'}
                                                placeholder={'Seleccione una opción'}
                                                defaultValue={id_tipo_solicitud?.[0]?.value}
                                                options={(props?.tipoSolicitudes || []).map((e: any) => {
                                                    return {
                                                        label: e?.nombre,
                                                        value: e?.id,
                                                    };
                                                })}
                                                EsMultiple
                                                name="id_tipo_solicitud"
                                                id="id_tipo_solicitud"
                                                key="id_tipo_solicitud"
                                                required
                                                onInput={(e: any) => {
                                                    formik.setFieldValue("id_tipo_solicitud", [e]);
                                                    setId_tipo_solicitud([e]);
                                                }}
                                                formik={formik?.getFieldMeta("id_tipo_solicitud")}
                                            />
                                            <span onClick={() => {
                                                props?.handleActualizaTipoSolicitud(id_tipo_solicitud)
                                                formik.setFieldValue("id_tipo_solicitud", []);
                                                setId_tipo_solicitud([]);
                                                setEditaTipoDeSoliitud(false)
                                            }} style={{ cursor: 'pointer' }} title='guarda el cambios'><SaveIcon color='info' /></span>
                                            <span onClick={() => {
                                                setEditaTipoDeSoliitud(false)
                                            }} style={{ cursor: 'pointer' }} title='cancelar'><CancelIcon color='error' /></span>
                                        </Form.Group>
                                    </FormikProvider>
                                </div> : null}



                            <p style={{ fontSize: 15 }}> <strong>Fecha de solicitud: </strong>{props?.item?.fecha_solicitud} </p>
                        </Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
                            <p style={{ fontSize: 15 }}> <strong>Estatus de solicitud: </strong>{props?.item?.estatus} </p>
                        </Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center" px={2} pt={1}>
                            <p style={{ fontSize: 15 }}> <strong>Nombre del solicitante: </strong>{props?.item?.solicitaName} </p>
                        </Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center" px={2} pt={1} >
                            <p style={{ fontSize: 15 }}><strong>Tipo de cambio: </strong>{numericFormatter(props?.item?.valor_en_dolar_moneda + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: ' $' })} </p>
                        </Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center" px={2} pt={1} >
                            <p style={{ fontSize: 15 }}> <strong>Importe en pesos MXN: </strong>{numericFormatter(props?.item?.importe_pesos + '', { thousandSeparator: ',', decimalScale: 5, fixedDecimalScale: false, prefix: ' $' })} </p>
                        </Box>
                        {props?.item?.requiere_documentos === 1 ? <Box display="flex" justifyContent="space-between" alignItems="center" px={2} pt={1} >
                            <p style={{ fontSize: 15 }}><strong>Importe capturado en todos los documentos: </strong>{numericFormatter(((props?.item?.documentos || []).reduce((a: any, c: any) => { return a + (+c?.importe) }, 0)) + '', { thousandSeparator: ',', decimalScale: 5, fixedDecimalScale: false, prefix: ' $' })} </p>
                        </Box> : null}
                        {props?.item?.requiere_documentos === 1 ? <Box display="flex" justifyContent="space-between" alignItems="center" px={2} pt={1} >
                            <p style={{ fontSize: 15 }}><strong>Importe capturado en los documentos validos:</strong>{numericFormatter(((props?.item?.documentos || []).filter((r: any) => r?.es_valido_revisor === 1).reduce((a: any, c: any) => { return a + (+c?.importe) }, 0)) + '', { thousandSeparator: ',', decimalScale: 5, fixedDecimalScale: false, prefix: ' $' })} </p>
                        </Box> : null}


                        {props?.item?.requiere_documentos === 1 ? <Box display="flex" justifyContent="space-between" alignItems="center" px={2} pt={1} >
                            <p style={{ fontSize: 15}}><strong>Importe por validar:</strong> <span style={{ fontSize: 15, fontWeight:'bold', color:'red' }}>{numericFormatter( ((props?.item?.importe_pesos) - ((props?.item?.documentos || []).filter((r: any) => r?.es_valido_revisor === 1).reduce((a: any, c: any) => { return a + (+c?.importe) }, 0))) + '', { thousandSeparator: ',', decimalScale: 5, fixedDecimalScale: false, prefix: ' $' })} </span></p>
                        </Box> : null}



                        {props?.item?.id_estatus === 5 && props?.item?.requiere_documentos === 1 ? <Box display="flex" justifyContent="space-between" alignItems="center" px={2} pt={1} >
                            <p style={{ fontSize: 15, cursor: 'pointer' }} onClick={() => {
                                props?.enAction(props?.item, 'descargaZIP', null);
                            }}><strong>Descargar zip:</strong> <FolderZipIcon fontSize='medium' color='info' /> </p>
                        </Box> : null}
                    </Card>
                </Grid>
                <Grid item xs={12} md={12} style={{ paddingLeft: 30 }}>
                    <Card sx={{ position: "relative", p: 2, borderRadius: 2, boxShadow: 3, }} style={{ boxShadow: 'none', border: 'solid 1px rgb(218, 222, 230)' }}>
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
                            <Typography variant="h6" fontWeight="medium"> Detalles de la solicitud <AssignmentIcon color='error' /> </Typography>
                        </Box>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4} style={{ paddingLeft: 30, textAlign: 'left' }}>
                                    <p style={{ fontSize: 15 }}> <strong>Empresa: </strong>{props?.item?.empresa} </p>
                                </Grid>
                                <Grid item xs={12} md={props?.item?.proyecto_sr ? 4 : 8} style={{ paddingLeft: 30, textAlign: 'left' }}>
                                    <p style={{ fontSize: 15 }}> <strong>Proyecto: </strong>{props?.item?.proyecto} </p>
                                </Grid>
                                {props?.item?.proyecto_sr ? <Grid item xs={12} md={4} style={{ paddingLeft: 30, textAlign: 'left' }}>
                                    <p style={{ fontSize: 15 }}> <strong>Otro proyecto: </strong>{props?.item?.proyecto_sr} </p>
                                </Grid> : null}
                                {props?.item?.requiere_beneficiario === 1 ? <Grid item xs={12} md={4} style={{ paddingLeft: 30, textAlign: 'left' }}>
                                    <p style={{ fontSize: 15 }}> <strong>Beneficiario: </strong>{props?.item?.beneficiarioName} </p>
                                </Grid> : null}
                                {props?.item?.proveedor ? <Grid item xs={12} md={4} style={{ paddingLeft: 30, textAlign: 'left' }}>
                                    <p style={{ fontSize: 15 }}> <strong>Otro beneficiario: </strong>{props?.item?.proveedor} </p>
                                </Grid> : null}


                                <Grid item xs={12} md={props?.item?.proveedor ? 4 : 8} style={{ paddingLeft: 30, textAlign: 'left' }}>

                                    {/*    <p style={{ fontSize: 15 }}> <strong>Concepto: </strong>{props?.item?.concepto} </p> */}


                                    {(props?.esAutorizador || props?.esPagador || props?.esRevisor) && props?.item?.id_estatus === 1 && !editaConcepto ?
                                        <p style={{ fontSize: 15 }}> <strong>Concepto: </strong> <span style={{ color: !props?.item?.concepto ? 'orange' : 'black', fontWeight: !props?.item?.concepto ? '700' : '400' }} >{props?.item?.concepto || 'Asigne un concepto'}</span>
                                            <span onClick={() => {
                                                setEditaConcepto(true)
                                            }} style={{ cursor: 'pointer' }} title='Asignar un concepto'><EditIcon color='info' /></span>

                                        </p> : (props?.esAutorizador || props?.esPagador || props?.esRevisor) && props?.item?.id_estatus === 1 && editaConcepto ? <div style={{ width: '250px' }}>
                                            <FormikProvider value={formik}>
                                                <Form.Group style={{ width: '100%' }}>
                                                    <SelectMultipleAutoCompleteField
                                                        placeholder={'Seleccione una opción'}
                                                        label={intl.formatMessage({
                                                            id: "input_concepto_gac",
                                                        })}
                                                        EsMultiple
                                                        defaultValue={id_concepto?.[0]?.value}
                                                        options={(props?.conceptos || []).map((e: any) => {
                                                            return {
                                                                label: e?.nombre,
                                                                value: e?.id,
                                                            };
                                                        })}
                                                        name="id_concepto"
                                                        id="id_concepto"
                                                        required
                                                        onInput={(e: any) => {
                                                            formik.setFieldValue("id_concepto", [e]);
                                                            setId_concepto([e]);
                                                        }}
                                                        formik={formik?.getFieldMeta("id_concepto")}
                                                    />
                                                    <span onClick={() => {
                                                        props?.handleActualizaConcepto(id_concepto)
                                                        formik.setFieldValue("id_concepto", []);
                                                        setId_concepto([]);
                                                        setEditaConcepto(false)
                                                    }} style={{ cursor: 'pointer' }} title='guarda el cambios'><SaveIcon color='info' /></span>
                                                    <span onClick={() => {
                                                        setEditaConcepto(false)
                                                    }} style={{ cursor: 'pointer' }} title='cancelar'><CancelIcon color='error' /></span>
                                                </Form.Group>
                                            </FormikProvider>
                                        </div> : null}

                                </Grid>





                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={12} style={{ paddingLeft: 30 }}>
                    <Card sx={{ position: "relative", p: 2, borderRadius: 2, boxShadow: 3, }} style={{ boxShadow: 'none', border: 'solid 1px rgb(218, 222, 230)' }}>
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
                                Información de Pago <MonetizationOnIcon color='error' />
                            </Typography>
                        </Box>
                        <CardContent>
                            <Grid container spacing={2}>
                                {props?.item?.mostrar_pago_quincenas ?
                                    <Grid item xs={12} md={4} style={{ paddingLeft: 30, textAlign: 'left' }}>
                                        <p style={{ fontSize: 15 }}> <strong>Número de quincenas: </strong>{props?.item?.quincenas_numero} </p>
                                    </Grid> : null
                                }
                                {props?.item?.mostrar_pago_quincenas ?
                                    <Grid item xs={12} md={4} style={{ paddingLeft: 30, textAlign: 'left' }}>
                                        <p style={{ fontSize: 15 }}> <strong>Importe por quincena: </strong>{numericFormatter(props?.item?.quincenas_valor + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: ' $' })} </p>
                                    </Grid> : null
                                }
                                {props?.item?.mostrar_pago_quincenas ?
                                    <Grid item xs={12} md={4} style={{ paddingLeft: 30, textAlign: 'left' }} /> : null
                                }
                                <Grid item xs={12} md={4} style={{ paddingLeft: 30, textAlign: 'left' }}>
                                    <p style={{ fontSize: 15 }}> <strong>Moneda: </strong>{props?.item?.moneda} </p>
                                </Grid>
                                <Grid item xs={12} md={4} style={{ paddingLeft: 30, textAlign: 'left' }}>
                                    <p style={{ fontSize: 15 }}> <strong>Forma de pago: </strong>{props?.item?.forma_pago} </p>
                                </Grid>
                                <Grid item xs={12} md={4} style={{ paddingLeft: 30, textAlign: 'left' }}>
                                    <p style={{ fontSize: 15 }}> <strong>Importe: </strong>{numericFormatter(props?.item?.importe + '', { thousandSeparator: ',', decimalScale: 5, fixedDecimalScale: false, prefix: ' $' })} </p>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={12} style={{ paddingLeft: 30 }}>
                    <Card sx={{ position: "relative", p: 2, borderRadius: 2, boxShadow: 3, }} style={{ boxShadow: 'none', border: 'solid 1px rgb(218, 222, 230)' }}>
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
                                Información bancaria <AccountBalanceIcon color='error' />
                            </Typography>
                        </Box>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4} style={{ paddingLeft: 30, textAlign: 'left' }} >
                                    <p style={{ fontSize: 15 }}> <strong>Banco: </strong>{props?.item?.banco} </p>
                                </Grid>
                                <Grid item xs={12} md={4} style={{ paddingLeft: 30, textAlign: 'left' }}>
                                    <p style={{ fontSize: 15 }}> <strong>Cuenta: </strong>{props?.item?.cuenta} </p>
                                </Grid>
                                <Grid item xs={12} md={4} style={{ paddingLeft: 30, textAlign: 'left' }}>
                                    <p style={{ fontSize: 15 }}> <strong>Clabe: </strong>{props?.item?.clabe} </p>
                                </Grid>

                                {props?.item?.fecha_pago ? <Grid item xs={12} md={4} style={{ paddingLeft: 30, textAlign: 'left' }}>
                                    <p style={{ fontSize: 15 }}> <strong>Fecha limite para realizar el pago: </strong>{props?.item?.fecha_pago} </p>
                                </Grid> : null}


                                {props?.item?.muestra_notificar_nomina && props?.item?.id_usuario_autorizador && props?.item?.id_usuario_revisor && (props?.esAutorizador ||  props?.esPagador) && !props?.item?.id_usuario_pagada ? <Grid item xs={12} md={4} style={{ paddingLeft: 30, textAlign: 'left' }}>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        color='info'
                                        style={{ backgroundColor: '#fcbf6a', color: '#ffff', position:'relative', top:'-12px' }}
                                        onClick={() => {
                                            props?.enAction(props?.item, 'notificar_nomina', ((props?.item?.importe_pesos) - ((props?.item?.documentos || []).filter((r: any) => r?.es_valido_revisor === 1).reduce((a: any, c: any) => { return a + (+c?.importe) }, 0))))
                                        }}
                                    > Notificar a nomina  </Button>
                                </Grid> : null}



                                <Grid item xs={12} md={12} style={{ paddingLeft: 30, textAlign: 'left' }} >
                                    {props?.item?.infoBancaria?.ruta ? <Link
                                        target="_blank"
                                        style={{ fontSize: 14 }}
                                        href={`${env.API_URL_DOCUMENTOS}/${env.API_URL_DOCUMENTOS === 'https://dirac.api.arjion.com/' ? `${(props?.item?.infoBancaria?.ruta || "").replaceAll('storage/app/', '')} ` : props?.item?.infoBancaria?.ruta || ""}`}
                                    >
                                        <PreviewIcon color='primary' /> Ver documento bancario
                                    </Link> : <p style={{ color: 'red', fontSize: 14 }}>Sin documento asociado al la información bancaria seleccionada</p>}
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={12} style={{ paddingLeft: 30 }}>
                    <Card sx={{ position: "relative", p: 2, borderRadius: 2, boxShadow: 3, }} style={{ boxShadow: 'none', border: 'solid 1px rgb(218, 222, 230)' }}>
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
                                Descripción de la solicitud <DescriptionIcon color='error' />
                            </Typography>
                        </Box>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12} style={{ paddingLeft: 30, textAlign: 'left' }}>
                                    <p style={{ fontSize: 15 }}> <strong>Descripción: </strong>{props?.item?.descripcion} </p>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={12} style={{ paddingLeft: 30 }} id='documentos_seccion'>
                    <Card sx={{ position: "relative", p: 2, borderRadius: 2, boxShadow: 3, }} style={{ boxShadow: 'none', border: 'solid 1px rgb(218, 222, 230)' }}>
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
                                Documentos de la solicitud <FolderIcon color='error' />
                            </Typography>
                        </Box>
                        <CardContent>
                            <>
                                {props?.estaEnMiCancha && ((props?.esRevisor && props?.item?.id_usuario_revisor === null && props?.item?.requiere_aprobacion_revisor === 1) || (props?.esAutorizador && props?.item?.id_usuario_autorizador === null && props?.item?.requiere_aprobacion_revisor === 0)) && documentosSeleccionados?.length ? <>
                                    <Grid item xs={12} md={12} style={{ paddingLeft: 30 }}>
                                        <p style={{ fontSize: 15 }}>Autoriza o rechaza los documentos</p>
                                    </Grid>
                                    <Grid item xs={12} md={12} style={{ paddingLeft: 30 }}>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color='success'
                                            style={{ backgroundColor: '#75d175', color: '#ffff' }}
                                            onClick={() => {
                                                props?.enAction(props?.item, 'aprobar_documentos_revisor', documentosSeleccionados)
                                                setDocumentosSeleccionados([])
                                            }}
                                        > Aprobar  </Button>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color='warning'
                                            style={{ backgroundColor: '#f17171', color: '#ffff' }}
                                            onClick={() => {
                                                props?.enAction(props?.item, 'rechazar_documentos_revisor', documentosSeleccionados)
                                                setDocumentosSeleccionados([])
                                            }}
                                        > Rechazar  </Button>
                                    </Grid></> : null}
                                {
                                    useMemo(() => {
                                        return (
                                            <>
                                                {(props?.item?.documentos || []).filter((r: any) => r?.es_valido_revisor === null)?.length && !props?.procesando ? <Accordion>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1-content"
                                                        id="panel1-header"
                                                    >
                                                        <Typography component="span" style={{ fontSize: 12 }}>Documentos no revisados</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} style={{ paddingLeft: 30 }}>
                                                                <DinamicTableMejorada
                                                                    //flex
                                                                    key={JSON.stringify(props?.item?.documentos) + '0'}
                                                                    showCheckBox={props?.estaEnMiCancha && ((props?.esRevisor && props?.item?.id_usuario_revisor === null && props?.item?.requiere_aprobacion_revisor === 1) || (props?.esAutorizador && props?.item?.id_usuario_autorizador === null && props?.item?.requiere_aprobacion_revisor === 0))}
                                                                    enCheckBox={(e) => {
                                                                        setDocumentosSeleccionados(e)
                                                                    }}
                                                                    enAccion={(a, b) => {
                                                                        props?.handlePreguntaEliminaArchivo && props?.handlePreguntaEliminaArchivo(b)
                                                                    }}
                                                                    actions={(props?.idUsuario === props?.item?.solicita || props?.idUsuario === props?.item?.beneficiario)}
                                                                    esVistaSolicitante={(props?.idUsuario === props?.item?.solicita || props?.idUsuario === props?.item?.beneficiario)}
                                                                    esGastoSolicitante
                                                                    pinned={[{ columna: 'importe', lado: 'left' },{ columna: 'fiscal_folio', lado: 'left' },{ columna: 'nombre_corto', lado: 'left' }]}
                                                                    columnsToShow={[
                                                                        'fiscal_folio',
                                                                        'critsCoValidacion',
                                                                        'descripcion',
                                                                        'descripcion_documento_validado',
                                                                        'documento_valido',
                                                                        'estatus',
                                                                        'fecha_registro',
                                                                        'importe',
                                                                        'nombre_corto',
                                                                        'nombre_documento',
                                                                        'ruta',
                                                                        'tipo_moneda'
                                                                    ]}
                                                                    data={(props?.item?.documentos || []).filter((r: any) => r?.es_valido_revisor === null).map((r: any) => {
                                                                        return {
                                                                            ...r,
                                                                            ...{
                                                                                importe: numericFormatter(r?.importe + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: ' $' }),
                                                                                estatus: r?.estatus === 0 ? 'Inactivo' : 'Activo',
                                                                                documento_valido: +r?.documento_valido === 0 ? 'Documento invalido' : 'Documento valido',
                                                                            }
                                                                        }
                                                                    })}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </AccordionDetails>
                                                </Accordion> : null}
                                            </>
                                        )
                                    }, [props?.estaEnMiCancha, props?.esRevisor, props?.esAutorizador, props?.item?.id_usuario_revisor, props?.procesando, props?.item?.documentos, props?.item?.requiere_aprobacion_revisor])
                                }

                                {(props?.item?.documentos || []).filter((r: any) => r?.es_valido_revisor === 1)?.length && !props?.procesando ? <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <Typography component="span" style={{ fontSize: 12 }}>Documentos aprobados por el revisor fiscal</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12} style={{ paddingLeft: 30 }}>
                                                <DinamicTableMejorada
                                                    //flex
                                                    esGastoSolicitante
                                                    pinned={[{ columna: 'importe', lado: 'left' },{ columna: 'fiscal_folio', lado: 'left' },{ columna: 'nombre_corto', lado: 'left' }]}
                                                    columnsToShow={[
                                                        'fiscal_folio',
                                                        'critsCoValidacion',
                                                        'descripcion',
                                                        'descripcion_documento_validado',
                                                        'documento_valido',
                                                        'estatus',
                                                        'fecha_registro',
                                                        'importe',
                                                        'nombre_corto',
                                                        'nombre_documento',
                                                        'ruta',
                                                        'tipo_moneda'
                                                    ]}
                                                    key={JSON.stringify(props?.item?.documentos) + '1'}
                                                    data={(props?.item?.documentos || []).filter((r: any) => r?.es_valido_revisor === 1).map((r: any) => {
                                                        return {
                                                            ...r,
                                                            ...{
                                                                importe: numericFormatter(r?.importe + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: ' $' }),
                                                                estatus: r?.estatus === 0 ? 'Inactivo' : 'Activo',
                                                                documento_valido: +r?.documento_valido === 0 ? 'Documento invalido' : 'Documento valido',
                                                            }
                                                        }
                                                    })}
                                                />
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion> : null}

                                {(props?.item?.documentos || []).filter((r: any) => r?.es_valido_revisor === 0)?.length && !props?.procesando ? <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <Typography component="span" style={{ fontSize: 12 }}>Documentos rechazados por el revisor fiscal</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12} style={{ paddingLeft: 30 }}>
                                                <DinamicTableMejorada
                                                    //flex
                                                    pinned={[{ columna: 'importe', lado: 'left' },{ columna: 'fiscal_folio', lado: 'left' },{ columna: 'nombre_corto', lado: 'left' }]}
                                                    esGastoSolicitante
                                                    columnsToShow={[
                                                        'fiscal_folio',
                                                        'critsCoValidacion',
                                                        'descripcion',
                                                        'descripcion_documento_validado',
                                                        'documento_valido',
                                                        'estatus',
                                                        'fecha_registro',
                                                        'importe',
                                                        'nombre_corto',
                                                        'nombre_documento',
                                                        'ruta',
                                                        'tipo_moneda'
                                                    ]}
                                                    key={JSON.stringify(props?.item?.documentos) + '2'}
                                                    data={(props?.item?.documentos || []).filter((r: any) => r?.es_valido_revisor === 0).map((r: any) => {
                                                        return {
                                                            ...r,
                                                            ...{
                                                                importe: numericFormatter(r?.importe + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: ' $' }),
                                                                estatus: r?.estatus === 0 ? 'Inactivo' : 'Activo',
                                                                documento_valido: +r?.documento_valido === 0 ? 'Documento invalido' : 'Documento valido',
                                                            }
                                                        }
                                                    })}
                                                />
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion> : null}

                                {(props?.idUsuario === props?.item?.solicita || props?.idUsuario === props?.item?.beneficiario)
                                    && props?.item?.id_usuario_revisor === null
                                    && !props?.procesando
                                    && ((props?.item?.autorizadores || []).filter((r: any) => r?.autorizo === null)?.length === (props?.item?.autorizadores || [])?.length || (props?.item?.id_estatus === 2) || (props?.item?.id_estatus === 6) || (props?.item?.id_estatus === 1))
                                    && props?.item?.requiere_documentos === 1 ?
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                        >
                                            <Typography component="span" style={{ fontSize: 12 }}>Carga de documentos</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={12} style={{ paddingLeft: 30 }}>
                                                    <>
                                                        <br></br>
                                                        <h5>Carga de documentos</h5>
                                                        <br></br>
                                                        <DragAndDropField
                                                            acepted={{
                                                                "image/jpeg": [],
                                                                "image/jpg": [],
                                                                "image/png": [],
                                                                "application/pdf": [],
                                                                "text/xml": []
                                                            }}
                                                            onAction={(d) => {
                                                                props?.enAction(props?.item, 'documentos', d)
                                                            }}
                                                            multiple
                                                            muestraBoton
                                                            resultadosTabla
                                                        />
                                                    </>
                                                </Grid>
                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion> : props?.item?.requiere_documentos === 0 ? 'Este tipo de solicitud no requiere carga documental' : '...'}
                            </>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default GacSolicitudDetalle
