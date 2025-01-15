import React from 'react'
import type { DetalleConceptoProps } from './types'
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';
import { Divider, Grid } from '@mui/material'
import './style.scss'
import BillingInformation from '../../layouts/ecommerce/orders/order-details/components/BillingInformation'
import moment from 'moment'
import { Button, ButtonGroup } from 'react-bootstrap';
import PreviewIcon from '@mui/icons-material/Preview';
import { useDispatch, useSelector } from 'react-redux'
import { setMenuRoutes } from '../../actions/menu'
import routes from '../../routes'
import { numericFormatter } from 'react-number-format';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
const DetalleConcepto: React.FC<DetalleConceptoProps> = (props: DetalleConceptoProps) => {
    const dispatch = useDispatch();
    const esModoDios = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 3);
    const esCoordinador = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 1);
    return (
        <Grid container p={1} className={!props?.enAvance ? 'container-main' : ''}>
            <Grid item xs={12}>
                <Grid
                    item
                    xs={12}
                    className="bordersContainers"
                    style={
                        props?.darkMode
                            ? {
                                backgroundColor: "#1f283e",
                                padding: "10px",
                                minHeight: "600px",
                            }
                            : {
                                backgroundColor: "#fff",
                                padding: "10px",
                                minHeight: "600px"
                            }
                    }
                >
                    <h5>Detalle del concepto</h5>
                    <BillingInformation title={'Proyecto'} itemsToshow={
                        [
                            { label: 'Nombre del proyecto', value: props?.espacio?.obra },
                            { label: '', value: props?.espacio?.descripcion },
                            { label: 'Dirección', value: props?.espacio?.direccion },
                            { label: 'Fecha de registro', value: moment(props?.espacio?.fecha_registro || new Date()).format("MMMM DD YYYY") },
                            { label: 'Fecha de inicio', value: moment(props?.espacio?.fecha_inicio || new Date()).format("MMMM DD YYYY") },
                            { label: 'Fecha de terminación', value: moment(props?.espacio?.fecha_fin || new Date()).format("MMMM DD YYYY") }
                        ]} />
                    <BillingInformation title={'Contrato'} itemsToshow={
                        [
                            { label: 'Nombre del contrato', value: props?.contrato?.contrato },
                            { label: 'ID contrato', value: props?.contrato?.id_contrato || '' },
                            { label: 'Fecha de registro', value: props?.contrato?.fecha_registro },
                        ]
                    } />

                    <BillingInformation title={'Frente'} itemsToshow={
                        [
                            { label: 'Nombre del Frente', value: props?.frente?.frente },
                            { label: '', value: props?.frente?.descripcion },
                            { label: 'Fecha de registro', value: moment(props?.frente?.fecha_registro || new Date()).format("MMMM DD YYYY") },
                            { label: 'Fecha de inicio', value: moment(props?.frente?.fecha_inicio || new Date()).format("MMMM DD YYYY") },
                            { label: 'Fecha de terminación', value: moment(props?.frente?.fecha_fin || new Date()).isValid() ? moment(props?.frente?.fecha_fin || new Date()).format("MMMM DD YYYY") : 'Complete este dato' }
                        ]} />

                    <BillingInformation title={'Concepto'} itemsToshow={
                        !props?.enAvance ? [
                            { label: 'ID concepto', value: props?.concepto?.concepto },
                            { label: '', value: props?.concepto?.descripcion },
                            { label: 'ID auxiliar', value: props?.concepto?.inciso },
                            { label: 'Número de convenio', value: props?.concepto?.num_convenio },
                            { label: 'Fecha de registro', value: moment(props?.concepto?.fecha_hoy || new Date()).format("MMMM DD YYYY") },
                            { label: 'Fecha de inicio', value: moment(props?.concepto?.fecha_inicio || new Date()).format("MMMM DD YYYY") },
                            { label: 'Fecha de terminación', value: moment(props?.concepto?.fecha_fin || new Date()).format("MMMM DD YYYY") },
                            { label: 'Unidad', value: props?.concepto?.unidad },
                            { label: 'Cantidad', value: numericFormatter((props?.concepto?.cantidad || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '' }) },
                            { label: 'PU', value: numericFormatter((props?.concepto?.pu || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }) },
                            { label: 'Importe', value: numericFormatter(((+props?.concepto?.cantidad || 0) * (+props?.concepto?.pu || 0)) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }) },
                            { label: 'Acumulado', value: numericFormatter((+props?.concepto?.acumulado || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: ' ' + props?.concepto?.unidad }) },
                            { label: 'Avance', value: numericFormatter((+props?.concepto?.avance || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: '%' }) },
                            { label: 'Avance físico', value: numericFormatter((+props?.concepto?.avance_fisico || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }) },
                            { label: 'Avance físico por confirmar', value: numericFormatter((+props?.concepto?.avance_por_confirmar || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }) },
                            /* { label: 'Avance financiero estimado', value: numericFormatter((+props?.concepto?.avance_financiero_estimado || 0) + '', { thousandSeparator: ',', decimalScale: 6, fixedDecimalScale: false, prefix: '$' }) }, */
                            { label: 'Obra ejecutada no estimada (OENE)', value: numericFormatter((+props?.concepto?.obra_ejecutada_no_estimada || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }) },
                        ] : [
                            { label: 'ID concepto', value: props?.concepto?.concepto },
                            { label: '', value: props?.concepto?.descripcion },
                            { label: 'ID auxiliar', value: props?.concepto?.inciso },
                            { label: 'Número de convenio', value: props?.concepto?.num_convenio },
                            { label: 'Fecha de registro', value: moment(props?.concepto?.fecha_hoy || new Date()).format("MMMM DD YYYY") },
                            { label: 'Fecha de inicio', value: moment(props?.concepto?.fecha_inicio || new Date()).format("MMMM DD YYYY") },
                            { label: 'Fecha de terminación', value: moment(props?.concepto?.fecha_fin || new Date()).format("MMMM DD YYYY") },
                            { label: 'Unidad', value: props?.concepto?.unidad },
                            { label: 'Cantidad', value: props?.concepto?.cantidad },
                            { label: 'PU', value: numericFormatter((props?.concepto?.pu || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }) },
                            { label: 'Importe', value: numericFormatter(((+props?.concepto?.cantidad || 0) * (+props?.concepto?.pu || 0)) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' }) },
                            { label: 'Acumulado', value: numericFormatter((+props?.concepto?.acumulado || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: ' ' + props?.concepto?.unidad }) },
                            { label: 'Avance', value: numericFormatter((+props?.concepto?.avance || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: '%' }) },
                        ]} />
                </Grid>
                {!props?.enAvance && !props?.esConfirmarAvance && !props?.esInfo ? <Divider /> : null}
                {!props?.enAvance && !props?.esConfirmarAvance && !props?.esInfo ? <Grid item xs={12} md={12} style={{ textAlign: 'left' }}>
                    <Button
                        variant="outline-primary"
                        onClick={(e: any) => {
                            props?.enAccion && props?.enAccion('ver_proveedor_concepto', props?.concepto);
                        }}
                        style={{ color: props?.darkMode ? '#fff' : 'rgb(31, 40, 62)' }}
                    >
                        <PreviewIcon /> <small>Ver información del proveedor</small>
                    </Button>
                    <Button
                        variant="outline-warning"
                        onClick={(e: any) => {
                            props?.enAccion && props?.enAccion('agregar_not_voz', props?.concepto);
                        }}
                        style={{ color: props?.darkMode ? '#fff' : 'rgb(31, 40, 62)' }}
                    >
                        <SettingsVoiceIcon /> <small>Reportes IA voz/imagen</small>
                    </Button>
                    {(+props?.concepto?.avance || 0) !== 0 ? <Button
                        variant="outline-warning"
                        onClick={(e: any) => {
                            props?.enAccion && props?.enAccion('ver_prediccion', props?.concepto);
                        }}
                        style={{ color: props?.darkMode ? '#fff' : 'rgb(31, 40, 62)' }} >
                        <SmartToyTwoToneIcon fontSize="medium" /> <small>Ver predicción del avance</small>
                    </Button> : null }
                </Grid> : null}
                <Divider />

                {props?.esConfirmarAvance && !props?.esInfo ? <Grid item xs={12} md={12} style={{ textAlign: 'left' }}>
                    <Button
                        disabled={!esCoordinador && !esModoDios}
                        variant="outline-primary"
                        onClick={(e: any) => {
                            props?.navigate('/confirmar-avance-fisico?idConcepto=' + props?.concepto?.id + '&idFrente=' + props?.frente?.id + '&idAvance=' + props?.id_avance)
                        }}
                        style={{ color: props?.darkMode ? '#fff' : 'rgb(31, 40, 62)' }}
                    >
                        <CheckBoxIcon /> <small>Confirmar avance</small>
                    </Button>
                </Grid> : null}

                {!props?.esConfirmarAvance && !props?.esInfo ? <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
                    <ButtonGroup>
                        <Button variant="outline-primary">
                            Foto({props?.concepto?.fotos || 0})
                        </Button>
                        <Button variant="outline-primary">
                            Video({props?.concepto?.videos || 0})
                        </Button>
                        <Button variant="outline-primary">
                            Audio({props?.concepto?.audio || 0})
                        </Button>
                        <Button variant="outline-primary">
                            Notas({props?.concepto?.notas || 0})
                        </Button>
                        <Button variant="outline-primary">
                            Documentos({props?.concepto?.documentos || 0})
                        </Button>
                        <Button variant="outline-primary" onClick={(e: any) => {
                            props?.enAccion && props?.enAccion('ver_responsables', props?.concepto);
                        }}>
                            responsables({props?.concepto?.responsables || 0})
                        </Button>
                        {!props?.enAvance ? <Button
                            variant="outline-primary"
                            onClick={(e: any) => {
                                props?.enAccion && props?.enAccion('analizar_avance_concepto', props?.concepto);
                            }}
                        >
                            Analizar avance ({props?.concepto?.movimientos_avance || 0} {(props?.concepto?.movimientos_avance || 0) > 1 || (props?.concepto?.movimientos_avance || 0) === 0 ? 'movimientos' : 'movimiento'})
                        </Button> : null}
                        {!props?.enAvance ? <Button
                            variant="outline-primary"
                            onClick={(e: any) => {
                                props?.enAccion && props?.enAccion('consultar_hitos_concepto', props?.concepto);
                            }}
                        >
                            Consultar hitos
                        </Button> : null}
                        {!props?.enAvance ? <Button
                            variant="outline-primary"
                            onClick={(e: any) => {
                                props?.enAccion && props?.enAccion('agregar_proveedor_concepto', props?.concepto);
                            }}
                        >
                            Agregar proveedor
                        </Button> : null}
                    </ButtonGroup>
                    {!props?.enAvance && !props?.esInfo ? <Divider /> : null}
                    {!props?.enAvance && !props?.esInfo ? <ButtonGroup>
                        <Button
                            variant="outline-success"
                            onClick={(e: any) => {
                                props?.navigate('/avance-fisico?idConcepto=' + props?.concepto?.id + '&idFrente=' + props?.frente?.id)
                            }}
                        >
                            Reportar avance físico
                        </Button>
                        <Button
                            variant="outline-success"
                            onClick={(e: any) => {
                                props?.enAccion && props?.enAccion(!props?.concepto?.estatus ? 'habilitar_concepto' : 'deshabilitar_concepto', props?.concepto);
                            }}
                        >
                            {!props?.concepto?.estatus ? 'Habilitar concepto' : 'Deshabilitar concepto '}
                        </Button>
                        <Button
                            variant="outline-success"
                            onClick={(e: any) => {
                                props?.enAccion && props?.enAccion('subir_foto_video_concepto', props?.concepto);
                            }}
                        >
                            Subir foto / video
                        </Button>
                        <Button
                            variant="outline-success"
                            onClick={(e: any) => {
                                props?.enAccion && props?.enAccion('subir_archivo_concepto', props?.concepto);
                            }}
                        >
                            Subir archivo
                        </Button>
                        <Button
                            variant="outline-success"
                            onClick={(e: any) => {
                                props?.enAccion && props?.enAccion('programar_hitos_concepto', props?.concepto);
                            }}
                        >
                            Programar hitos
                        </Button>
                        <Button
                            variant="outline-success"
                            onClick={(e: any) => {
                                props?.enAccion && props?.enAccion('asignar_responsables_concepto', props?.concepto);
                            }}
                        >
                            Asignar responsables
                        </Button>
                        <Button
                            variant="outline-success"
                            onClick={(e: any) => {
                                dispatch(setMenuRoutes(routes.find((e: any) => e?.key === 'conceptos')));
                                props?.navigate('/gestion-conceptos?id=' + props?.concepto?.id)
                            }}
                        >
                            Editar concepto
                        </Button>
                    </ButtonGroup> : null}
                </Grid> : null}
            </Grid>
        </Grid>
    )
}

export default DetalleConcepto
