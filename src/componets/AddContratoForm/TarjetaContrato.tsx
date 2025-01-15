import React from 'react'
import type { TarjetaContratoProps } from './types'
import { Card } from 'react-bootstrap'
import { Alert, Divider, Grid } from '@mui/material'
import { useTarjetaContrato } from './useTarjetaContrato'
import InfoIcon from '@mui/icons-material/Info';
import { useIntl } from 'react-intl'
import { numericFormatter } from 'react-number-format';
import './style.scss';

const TarjetaContrato: React.FC<TarjetaContratoProps> = (props: TarjetaContratoProps) => {
    const intl = useIntl();
    const {
        contratistas,
        estatus,
        cientes,
        responsables,
        autorizado,
        id_autorizador,
        terminado,
        catalogoTiposContrato,
        catalogoObras,
        id_tipo_proyecto,
        catalogoPeps,
        moneda,
        alertas,
        catalogoEspecialidades,
        reclasificacion,
        propietario,
        catalogoTipoContratoExt,
        catalogoClasificacionContrato
    } = useTarjetaContrato(props);
    return (
        <div>
            <Card style={props?.darkMode ? { backgroundColor: '#1f283e', width: '100%' } : { backgroundColor: '#fff', width: '100%' }}>
                <Card.Body style={{ textAlign: 'center' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} >
                        <Alert icon={<InfoIcon fontSize="inherit" />} severity="success">
                            {intl.formatMessage({ id: 'add_contrato_tarjeta_contrato_vista_previa_info' })}
                        </Alert>
                        </Grid>
                        <Grid item xs={12} md={4} >
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_contrato' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{props?.contrato?.contrato}</p>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_id_contrato' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{props?.contrato?.id_contrato}</p>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_contratista' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{contratistas.find((c: any) => c?.id === +props?.contrato?.id_contratista)?.contratista || ''}</p>
                        </Grid>
                        <Divider />
                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_fecha_inicio' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{props?.contrato?.fecha_inicio}</p>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_fecha_final' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{props?.contrato?.fecha_final}</p>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_importe' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{numericFormatter(props?.contrato?.importe + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: ' $' })}</p>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_estatus' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{estatus.find((e: any) => e?.value === props?.contrato?.estatus)?.label}</p>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_cliente' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{cientes.find((c:any) => c?.id === +props?.contrato?.id_cliente)?.nombre}</p>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_responsable' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{responsables.find((r:any) => r?.id === +props?.contrato?.id_responsable)?.email}</p>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_autorizado' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{autorizado.find((a: any) => a?.value === props?.contrato?.autorizado)?.label}</p>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_autorizador' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{id_autorizador.find((r:any) => r?.id === +props?.contrato?.id_autorizador)?.email}</p>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_plantilla' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{props?.contrato?.plantilla}</p>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_terminado' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{terminado.find((t: any) => t?.value === props?.contrato?.terminado)?.label}</p>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_nota' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{props?.contrato?.nota}</p>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'inpput_tipo_contrato' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{catalogoTiposContrato.find((c: any) => c?.id === +props?.contrato?.id_tipo_contrato)?.nombre}</p>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_obra_principal' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{catalogoObras.find((o: any) => o?.id === +props?.contrato?.id_obra_principal)?.obra}</p>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_tipo_de_proyecto' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{id_tipo_proyecto.find((i: any) => i?.value === props?.contrato?.id_tipo_proyecto)?.label}</p>
                        </Grid>
                        {props?.contrato?.pep ? <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_pep' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{catalogoPeps.find((p: any) => p?.id === +props?.contrato?.pep)?.pep}</p>
                        </Grid> : ''}

                        {props?.contrato?.peps ? <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>Cuentas contables multiples</h5>
                            {(props?.contrato?.peps || []).map((element:any, key:any) => {
                               return ( <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{catalogoPeps.find((p: any) => p?.id === +element)?.pep}</p>)
                            })}
                        </Grid> : ''}

                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_moneda' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{moneda.find((m: any) => m?.value === props?.contrato?.moneda)?.label}</p>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_anticipo' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{numericFormatter(props?.contrato?.anticipo + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: ' $' })}</p>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_categoria' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{props?.contrato?.categoria}</p>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_alertas' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{alertas.find((a: any) => a?.value === props?.contrato?.alertas)?.label}</p>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_fecha_limite' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{props?.contrato?.fecha_limite}</p>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_reclasificacion' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{reclasificacion.find((r: any) => r?.value === props?.contrato?.reclasificacion)?.label}</p>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_propietario' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{propietario.find((p: any) => p?.value === props?.contrato?.propietario)?.label}</p>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_tipo_contrato_externo' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{catalogoTipoContratoExt.find((tc: any) => tc?.id === +props?.contrato?.tipo_contrato_ext)?.nombre}</p>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_tolerancia' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{numericFormatter(props?.contrato?.tolerancia + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: ' $' })}</p>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_estatus_firma' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{props?.contrato?.estatus_firma}</p>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_contrato_liberado' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{props?.contrato?.contrato_liberado}</p>
                        </Grid>
                        {props?.contrato?.clasificacion_contrato ? <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_clasificacion_contrato' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{catalogoClasificacionContrato.find((tc: any) => tc?.id === +props?.contrato?.clasificacion_contrato)?.nombre }</p>
                        </Grid>: ''}
                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_tipo_de_cambio' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{numericFormatter(props?.contrato?.tipo_cambio + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: ' $' })}</p>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_especialidad' })}</h5>
                            <p className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{catalogoEspecialidades.find((e: any) => e?.id === +props?.contrato?.id_especialidad)?.nombre}</p>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{intl.formatMessage({ id: 'input_sub_especialidad' })}</h5>
                            {catalogoEspecialidades.filter((e: any) => props?.contrato?.subEspecialidad.includes(e?.id)  ).map((d:any)=>{

                                return (<p key={d?.id} className='form-control' style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { textAlign: 'left' }}>{d?.nombre} </p>)
                            }) }

                            
                        </Grid>
                    </Grid>
                </Card.Body>
            </Card>

        </div>
    )
}

export default TarjetaContrato
