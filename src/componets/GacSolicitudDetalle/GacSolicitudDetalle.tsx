import React, { useCallback, useMemo, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, Divider, Grid, List, ListItem, ListItemText, Paper, Tooltip, Typography } from '@mui/material';
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
import './style.scss'

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
}

const GacSolicitudDetalle: React.FC<GacSolicitudDetalleProps> = (props: GacSolicitudDetalleProps) => {
    const [documentosSeleccionados, setDocumentosSeleccionados] = useState([]);

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
                                                                            Aprobo la solicitud: {registro.autorizo === 1 ? <>Si <CheckIcon color='success' /></> : registro.autorizo === 0 ? <>No <CloseIcon color={'error'} /></> : 'Sin interacción con la solicitud'}
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
                                                                        <Button
                                                                            size="small"
                                                                            variant="outlined"
                                                                            color='success'
                                                                            style={{ backgroundColor: '#75d175', color: '#ffff' }}
                                                                            onClick={() => {
                                                                                props?.enAction(props?.item, 'aprobar_autorizador', null)
                                                                            }}
                                                                        > Aprobar como autorizador </Button>
                                                                        <br />
                                                                        <Button
                                                                            size="small"
                                                                            variant="outlined"
                                                                            color='warning'
                                                                            style={{ backgroundColor: '#f17171', color: '#ffff' }}
                                                                            onClick={() => {
                                                                                props?.enAction(props?.item, 'rechazar_autorizador', null)
                                                                            }}
                                                                        > Rechazar como autorizador </Button>
                                                                        <br />
                                                                        {(props?.item?.autorizadores || []).filter((r: any) => r?.requiere_aprobacion === 0 && r?.autorizo === null)?.length ? <Button
                                                                            size="small"
                                                                            variant="outlined"
                                                                            color='info'
                                                                            style={{ backgroundColor: 'rgb(241 200 107)', color: '#ffff' }}
                                                                            onClick={() => {
                                                                                props?.enAction(props?.item, 'solicitar_apribacion_direccion_general', null)
                                                                            }}
                                                                        > Solicitar aprobación de direccion general </Button> : null}
                                                                    </div>
                                                                }
                                                                style={{ backgroundColor: 'rgb(247 247 247)', paddingLeft: 15, paddingRight: 15, borderRadius: 10 }}>
                                                                <ListItemText
                                                                    primary={`Usuario: ${props?.perfil?.nombre}`}
                                                                    secondary={
                                                                        <>
                                                                            <Typography component="span" variant="body2" color="textPrimary">
                                                                                Estatus: {props?.item?.autorizo_usuario_autorizador === 1 ? <>Si <CheckIcon color='success' /></> : props?.item?.autorizo_usuario_autorizador === 0 ? <>No <CloseIcon color={'error'} /></> : 'Sin interacción con la solicitud'}
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
                                                                                    Aprobo la solicitud: {props?.item?.autorizo_usuario_autorizador === 1 ? <>Si <CheckIcon color='success' /></> : props?.item?.autorizo_usuario_autorizador === 0 ? <>No <CloseIcon color={'error'} /></> : 'Sin interacción con la solicitud'}
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
                                                    {props?.estaEnMiCancha && props?.esRevisor && props?.item?.id_usuario_revisor === null ?
                                                        <React.Fragment>
                                                            <Divider />
                                                            <ListItem
                                                                secondaryAction={
                                                                    <div style={{ padding: 15 }}>

                                                                        {!(props?.item?.documentos || []).filter((r: any) => r?.es_valido_revisor === 1)?.length ? <Button
                                                                            size="small"
                                                                            variant="outlined"
                                                                            color='error'
                                                                            style={{ backgroundColor: '#f17171', color: '#ffff' }}
                                                                        >Aun hay documentos que tienes que revisar</Button> : null}

                                                                        {(props?.item?.documentos || []).filter((r: any) => +r?.es_valido_revisor === 1)?.length ? <Button
                                                                            size="small"
                                                                            variant="outlined"
                                                                            color='success'
                                                                            style={{ backgroundColor: '#75d175', color: '#ffff' }}
                                                                            onClick={() => {
                                                                                props?.enAction(props?.item, 'aprobar_revisor', null)
                                                                            }}
                                                                        > Aprobar como revisor </Button> : null}
                                                                        {(props?.item?.documentos || []).filter((r: any) => r?.es_valido_revisor === 1)?.length ? <br /> : null}

                                                                        {(props?.item?.documentos || []).filter((r: any) => r?.es_valido_revisor === 1)?.length ? <Button
                                                                            size="small"
                                                                            variant="outlined"
                                                                            color='warning'
                                                                            style={{ backgroundColor: '#f17171', color: '#ffff' }}
                                                                            onClick={() => {
                                                                                props?.enAction(props?.item, 'rechazar_revisor', null)
                                                                            }}
                                                                        > Rechazar como revisor </Button> : null}
                                                                        <br />
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
                                                        </React.Fragment> : null}



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
                                                                        primary={`Usuario revisor: ${(props?.perfil?.usuariosTodos || []).find((r: any) => +r?.id_usuario === +props?.item?.id_usuario_revisor)?.nombre || ''} ${(props?.perfil?.usuariosTodos || []).find((r: any) => +r?.id_usuario === +props?.item?.id_usuario_revisor)?.apellidos || ''}`}
                                                                        secondary={
                                                                            <>
                                                                                <Typography component="span" variant="body2" color="textPrimary">
                                                                                    Aprobo la solicitud: {props?.item?.autorizo_usuario_revisor === 1 ? <>Si <CheckIcon color='success' /></> : props?.item?.autorizo_usuario_revisor === 0 ? <>No <CloseIcon color={'error'} /></> : 'Sin interacción con la solicitud'}
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
                                                                                    Aprobo la solicitud: {props?.item?.autorizo_usuario_pagada === 1 ? <>Si <CheckIcon color='success' /></> : props?.item?.autorizo_usuario_pagada === 0 ? <>No <CloseIcon color={'error'} /></> : 'Sin interacción con la solicitud'}
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
                                                                        > Enterado </Button>
                                                                    </div>
                                                                }
                                                                style={{ backgroundColor: 'rgb(247 247 247)', paddingLeft: 15, paddingRight: 15, borderRadius: 10 }}>
                                                                <ListItemText
                                                                    primary={`Usuario pagador: ${props?.perfil?.nombre}`}
                                                                    secondary={
                                                                        <>
                                                                            <Typography component="span" variant="body2" color="textPrimary">
                                                                                Estatus: {props?.item?.autorizo_usuario_pagada === 1 ? <>Si <CheckIcon color='success' /></> : props?.item?.autorizo_usuario_pagada === 0 ? <>No <CloseIcon color={'error'} /></> : 'Sin interacción con la solicitud'}
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
                            <p style={{ fontSize: 15 }}> <strong>Tipo de solicitud: </strong>{props?.item?.tipo_solicitud} </p>
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
                            <p style={{ fontSize: 15 }}> <strong>importe en pesos MXN: </strong>{numericFormatter(props?.item?.importe_pesos + '', { thousandSeparator: ',', decimalScale: 5, fixedDecimalScale: false, prefix: ' $' })} </p>
                        </Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center" px={2} pt={1} >
                            <p style={{ fontSize: 15 }}><strong>importe capturado en todos los documentos: </strong>{numericFormatter(((props?.item?.documentos || []).reduce((a: any, c: any) => { return a + (+c?.importe) }, 0)) + '', { thousandSeparator: ',', decimalScale: 5, fixedDecimalScale: false, prefix: ' $' })} </p>
                        </Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center" px={2} pt={1} >
                            <p style={{ fontSize: 15 }}><strong>importe capturado en los documentos validos:</strong>{numericFormatter(((props?.item?.documentos || []).filter((r: any) => r?.es_valido_revisor === 1).reduce((a: any, c: any) => { return a + (+c?.importe) }, 0)) + '', { thousandSeparator: ',', decimalScale: 5, fixedDecimalScale: false, prefix: ' $' })} </p>
                        </Box>
                        {props?.item?.id_estatus === 5 ? <Box display="flex" justifyContent="space-between" alignItems="center" px={2} pt={1} >
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
                                <Grid item xs={12} md={4} style={{ paddingLeft: 30, textAlign: 'left' }}>
                                    <p style={{ fontSize: 15 }}> <strong>Beneficiario: </strong>{props?.item?.beneficiarioName} </p>
                                </Grid>
                                {props?.item?.proveedor ? <Grid item xs={12} md={4} style={{ paddingLeft: 30, textAlign: 'left' }}>
                                    <p style={{ fontSize: 15 }}> <strong>Otro beneficiario: </strong>{props?.item?.proveedor} </p>
                                </Grid> : null}
                                <Grid item xs={12} md={props?.item?.proveedor ? 4 : 8} style={{ paddingLeft: 30, textAlign: 'left' }}>
                                    <p style={{ fontSize: 15 }}> <strong>Concepto: </strong>{props?.item?.concepto} </p>
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
                                Documentos de la solicitud <FolderIcon color='error' />
                            </Typography>
                        </Box>
                        <CardContent>
                            <>
                                {props?.estaEnMiCancha && props?.esRevisor && props?.item?.id_usuario_revisor === null && documentosSeleccionados?.length ? <>
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
                                                                    flex
                                                                    key={JSON.stringify(props?.item?.documentos) + '0'}
                                                                    showCheckBox={props?.estaEnMiCancha && props?.esRevisor && props?.item?.id_usuario_revisor === null}
                                                                    enCheckBox={(e) => {
                                                                        setDocumentosSeleccionados(e)
                                                                    }}
                                                                    esGastoSolicitante
                                                                    columnsToShow={[
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
                                    }, [props?.estaEnMiCancha, props?.esRevisor, props?.item?.id_usuario_revisor, props?.procesando, props?.item?.documentos])
                                }




                                {(props?.item?.documentos || []).filter((r: any) => r?.es_valido_revisor === 1)?.length && !props?.procesando ? <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <Typography component="span" style={{ fontSize: 12 }}>Documentos aprobados por el revisor</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12} style={{ paddingLeft: 30 }}>
                                                <DinamicTableMejorada
                                                    flex
                                                    esGastoSolicitante
                                                    columnsToShow={[
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
                                        <Typography component="span" style={{ fontSize: 12 }}>Documentos rechazados por el revisor</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12} style={{ paddingLeft: 30 }}>
                                                <DinamicTableMejorada
                                                    flex
                                                    esGastoSolicitante
                                                    columnsToShow={[
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
                                    && props?.item?.id_usuario_revisor === null && !props?.procesando
                                    && ((props?.item?.autorizadores || []).filter((r: any) => r?.autorizo === null)?.length === (props?.item?.autorizadores || [])?.length || (props?.item?.id_estatus === 2)) ?
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
                                    </Accordion> : null}
                            </>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </div>
    )
}

export default GacSolicitudDetalle
