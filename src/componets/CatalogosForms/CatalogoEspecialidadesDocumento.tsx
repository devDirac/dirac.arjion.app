import React from 'react';
import type { CatalogoEspecialidadProps } from './types';
import { Grid } from '@mui/material';
import { FormikProvider} from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../InputField';
import _ from 'lodash'
import SelectField from '../SelectField';
import useCatalogoEspecialidadesDocumento from './useCatalogoEspecialidadesDocumento';
import './style.scss';

const CatalogoEspecialidadesDocumento: React.FC<CatalogoEspecialidadProps> = (props: CatalogoEspecialidadProps) => {
    const {
        formik,
        clave,
        setClave,
        nombre,
        setNombre,
        descripcion,
        setDescripcion,
        frecuencia,
        setFrecuencia,
        id_estatus,
        estatusCatalogos,
        setId_estatus,
        proyectos,
        id_proyecto,
        setId_proyecto,
        id_especialidad,
        especialidades,
        setId_especialidad,
        subEspecialidad,
        subEspecialidades,
        setSubEspecialidad,
        intl
    } = useCatalogoEspecialidadesDocumento(props);
  return (
    <div>
            <Grid container >
                <FormikProvider value={formik}>
                    <Form.Group style={{ width: '100%' }}>
                        <Grid item xs={12}>
                            <InputField
                                required
                                value={clave || ''}
                                name="clave"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("clave", target?.value || '');
                                    setClave(target?.value);
                                }}
                                label={intl.formatMessage({ id: 'input_clave' })}
                                placeholder={intl.formatMessage({ id: 'input_clave_descripcion' })}
                                type="text"
                                id="clave"
                                formik={formik?.getFieldMeta('clave')}
                            />
                            <br />
                        </Grid>
                        <Grid item xs={12}>
                            <InputField
                                required
                                value={nombre || ''}
                                name="nombre"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("nombre", target?.value || '');
                                    setNombre(target?.value);
                                }}
                                label={intl.formatMessage({ id: 'input_nombre' })}
                                placeholder={intl.formatMessage({ id: 'input_nombre_descripcion' })}
                                type="text"
                                id="nombre"
                                formik={formik?.getFieldMeta('nombre')}
                            />
                            <br />
                        </Grid>
                        <Grid item xs={12}>
                            <InputField
                                required
                                value={descripcion || ''}
                                name="descripcion"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("descripcion", target?.value || '');
                                    setDescripcion(target?.value);
                                }}
                                label={intl.formatMessage({ id: 'input_descripcion' })}
                                placeholder={intl.formatMessage({ id: 'input_descripcion_descripcion' })}
                                type="text"
                                id="descripcion"
                                formik={formik?.getFieldMeta('descripcion')}
                            />
                            <br />
                        </Grid>
                        <Grid item xs={12}>
                            <InputField
                                required
                                value={frecuencia || ''}
                                name="frecuencia"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("frecuencia", target?.value || '');
                                    setFrecuencia(target?.value);
                                }}
                                label={intl.formatMessage({ id: 'input_frecuencia' })}
                                placeholder={intl.formatMessage({ id: 'input_frecuencia_frecuencia' })}
                                type="text"
                                id="frecuencia"
                                formik={formik?.getFieldMeta('frecuencia')}
                            />
                            <br />
                        </Grid>
                        <Grid item xs={12}>
                            <SelectField
                                label={intl.formatMessage({ id: 'input_estatus' })}
                                value={id_estatus}
                                options={estatusCatalogos.map((e: any) => {
                                    return {
                                        label: e?.estatus,
                                        value: e?.id
                                    }
                                })}
                                name="id_estatus"
                                id="id_estatus"
                                required
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("id_estatus", target?.value || '');
                                    setId_estatus(target?.value);
                                }}
                                formik={formik?.getFieldMeta('id_estatus')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <SelectField
                                disabled={props?.esEdicion}
                                label={intl.formatMessage({ id: 'input_proyecto' })}
                                value={id_proyecto}
                                options={proyectos.map((e: any) => {
                                    return {
                                        label: e?.obra,
                                        value: e?.id
                                    }
                                })}
                                name="id_proyecto"
                                id="id_proyecto"
                                required
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("id_proyecto", target?.value || '');
                                    setId_proyecto(target?.value);
                                }}
                                formik={formik?.getFieldMeta('id_proyecto')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <SelectField
                                disabled={props?.esEdicion}
                                label={intl.formatMessage({ id: 'input_especialidad' })}
                                value={id_especialidad}
                                options={especialidades.filter((e:any)=> (e?.especialidad === 0) && (!props?.idObra ? true : props?.idObra === e?.id_obra)).map((e: any) => {
                                    return {
                                        label: e?.nombre,
                                        value: e?.id
                                    }
                                })}
                                required
                                name="id_especialidad"
                                id="id_especialidad"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("id_especialidad", target?.value || '');
                                    setId_especialidad(target?.value);
                                }}
                                formik={formik?.getFieldMeta('id_especialidad')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <SelectField
                                disabled={id_especialidad === '' || !subEspecialidades.length ||  props?.esEdicion}
                                label={intl.formatMessage({ id: 'input_sub_especialidad' })}
                                value={subEspecialidad}
                                options={subEspecialidades.map((e: any) => {
                                    return {
                                        label: e?.nombre,
                                        value: e?.id
                                    }
                                })}
                                name="sub_especialidad"
                                id="sub_especialidad"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("sub_especialidad", target?.value || '');
                                    setSubEspecialidad(target?.value);
                                }}
                                formik={formik?.getFieldMeta('sub_especialidad')}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            style={{ padding: "5px", paddingTop: "0", paddingBottom: "0" }}
                        >
                            <Button
                                variant="primary"
                                disabled={props?.procesando || !formik.dirty || !formik.isValid}
                                onClick={(e) => {
                                    props?.action({
                                        clave,
                                        nombre,
                                        descripcion,
                                        frecuencia,
                                        id_estatus,
                                        id_obra:id_proyecto,
                                        id_especialidad,
                                        subEspecialidad: _.isEmpty(subEspecialidad) ? 0 : subEspecialidad,
                                        BD: props?.catalogo
                                    });
                                }}
                            >
                                {intl.formatMessage({ id: 'general_guardar' })}
                            </Button>
                        </Grid>
                    </Form.Group>
                </FormikProvider>
            </Grid>
        </div>
  )
}

export default CatalogoEspecialidadesDocumento
