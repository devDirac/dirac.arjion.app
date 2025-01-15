import React from 'react'
import { Avatar, Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material';
import { FormikProvider } from 'formik';
import { Button, Form } from 'react-bootstrap';
import SelectField from '../SelectField';
import InputField from '../InputField';
import { useCardsUsuariosAsignacionContrato } from './useCardsUsuariosAsignacionContrato';
import './style.scss';

export interface CardsUsuariosAsignacionContratoProps {
  usuario: any
  procesando: boolean
  enAccion: (data: any) => void
  darkMode: boolean
  onCheck: (valueCheck: any, item: any) => void
  obra: any
  contratoId: number
  elementosOrden: any[]
  onOrden: (orden: any,idUser:any) => void
}

const CardsUsuariosAsignacionContrato: React.FC<CardsUsuariosAsignacionContratoProps> = (props: CardsUsuariosAsignacionContratoProps) => {
 
  const {
    darkMode,
    formik,
    esRegistroPorBoton,
    handleChange,
    id_perfil,
    catalogoPerfiles,
    setId_perfil,
    id_puesto,
    setId_puesto,
    catalogoPuestos,
    id_landin_page,
    setId_landin_page,
    orden,
    setOrden,
    setEsRegistroPorBoton,
    catalogoPaginasInicio,
    isChecked,
    intl
  } = useCardsUsuariosAsignacionContrato(props);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} >
        <Grid item xs={12} className='bordersContainers' style={darkMode ? { backgroundColor: '#1f283e', padding: '25px', minHeight: '370px' } : { backgroundColor: '#fff', padding: '25px', minHeight: '370px' }}>
          <FormikProvider value={formik}>
            <Form.Group className="mb-3 " >
              <Grid container spacing={2}>
                <Grid item xs={5} md={5} >
                  <Grid item xs={12} md={12} >
                    <Avatar
                      alt={props?.usuario?.nombre || ''}
                      src={props?.usuario?.foto}
                      sx={{ width: 60, height: 60 }}
                      variant="rounded"
                    />
                  </Grid>
                  <Grid item xs={12} md={12} >
                    <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { color: '#344767', textAlign: 'left' }}>{intl.formatMessage({ id: 'general_usuario' })}</h5>
                    <p style={props?.darkMode ? { color: '#fff', textAlign: 'left', fontSize: '14px', fontWeight: '500' } : { color: '#344767', textAlign: 'left', fontSize: '14px', fontWeight: '500' }}>{props?.usuario?.usuario || '' }</p>

                    <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { color: '#344767', textAlign: 'left' }}>{intl.formatMessage({ id: 'general_nombre' })}</h5>
                    <p style={props?.darkMode ? { color: '#fff', textAlign: 'left', fontSize: '14px', fontWeight: '500' } : { color: '#344767', textAlign: 'left', fontSize: '14px', fontWeight: '500' }}>{props?.usuario?.nombre  }</p>

                  </Grid>
                  <Grid item xs={12} md={12} >
                    <h5 style={props?.darkMode ? { color: '#fff', textAlign: 'left' } : { color: '#344767', textAlign: 'left' }}>{intl.formatMessage({ id: 'general_correo' })}</h5>
                    <p style={props?.darkMode ? { color: '#fff', textAlign: 'left', fontSize: '14px', fontWeight: '500' } : { color: '#344767', textAlign: 'left', fontSize: '14px', fontWeight: '500' }}>{props?.usuario?.email}</p>
                  </Grid>
                  {!esRegistroPorBoton ? <Grid item xs={12} md={12} style={{ textAlign: 'left' }}>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox disabled={props?.procesando || !formik.dirty || !formik.isValid} onChange={(v) => {
                        handleChange(v);
                      }} />} label="Seleccionar" />
                    </FormGroup>
                  </Grid> : null}
                </Grid>
                <Grid item xs={7} md={7} style={{ borderLeft: props?.darkMode ? 'solid 1px #d2d2d2' : 'solid 1px #d2d2d2' }} >
                  <SelectField
                    label={intl.formatMessage({ id: 'input_perfil' })}
                    value={id_perfil}
                    options={catalogoPerfiles.map((e: any) => {
                      return {
                        label: e?.nombre,
                        value: e?.id
                      }
                    })}
                    name="id_perfil"
                    id="id_perfil"
                    required
                    disabled={esRegistroPorBoton}
                    onInput={(e: any) => {
                      const target = e.target as HTMLTextAreaElement;
                      formik.setFieldValue("id_perfil", target?.value || '');
                      setId_perfil(target?.value);
                    }}
                    formik={formik?.getFieldMeta('id_perfil')}
                  />
                  
                  <SelectField
                    disabled={esRegistroPorBoton}
                    label={intl.formatMessage({ id: 'general_puesto' })}
                    value={id_puesto}
                    options={catalogoPuestos.map((e: any) => {
                      return {
                        label: e?.nombre,
                        value: e?.id
                      }
                    })}
                    name="id_puesto"
                    id="id_puesto"
                    required
                    onInput={(e: any) => {
                      const target = e.target as HTMLTextAreaElement;
                      formik.setFieldValue("id_puesto", target?.value || '');
                      setId_puesto(target?.value);
                    }}
                    formik={formik?.getFieldMeta('id_puesto')}
                  />
                  <SelectField
                    disabled={esRegistroPorBoton}
                    label={intl.formatMessage({ id: 'input_pagina_inicio' })}
                    value={id_landin_page}
                    options={catalogoPaginasInicio.map((e: any) => {
                      return {
                        label: e?.nombre,
                        value: e?.id
                      }
                    })}
                    name="id_landin_page"
                    id="id_landin_page"
                    required
                    onInput={(e: any) => {
                      const target = e.target as HTMLTextAreaElement;
                      formik.setFieldValue("id_landin_page", target?.value || '');
                      setId_landin_page(target?.value);
                    }}
                    formik={formik?.getFieldMeta('id_landin_page')}
                  />
                  <InputField
                    required
                    value={orden || ''}
                    name="orden"
                    onInput={(e: any) => {
                      const target = e.target as HTMLTextAreaElement;
                      formik.setFieldValue("orden", target?.value || '');
                      setOrden(target?.value);
                      props?.onOrden(target?.value,props?.usuario?.id);
                    }}
                    label={intl.formatMessage({ id: 'input_orden' })}
                    placeholder={intl.formatMessage({ id: 'input_orden_descripcion' })}
                    type="text"
                    id="orden"
                    formik={formik?.getFieldMeta('orden')}
                  />

                </Grid>
                <Grid item xs={12} md={12} style={{textAlign:'right'}}>
                  <Button
                    variant="primary"
                    disabled={props?.procesando || !formik.dirty || !formik.isValid || isChecked || esRegistroPorBoton}
                    onClick={(e: any) => {
                      setEsRegistroPorBoton(true);
                      props?.enAccion({
                        id_perfil,
                        id_puesto,
                        id_contrato: props?.contratoId,
                        id_usuario: props?.usuario?.id,
                        orden,
                        id_landin_page
                      });
                    }}
                  >
                    {intl.formatMessage({ id: 'general_asignar' })}
                  </Button>
                </Grid>
              </Grid>
            </Form.Group>
          </FormikProvider>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CardsUsuariosAsignacionContrato
