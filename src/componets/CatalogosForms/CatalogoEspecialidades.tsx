import React from 'react';
import type { CatalogoEspecialidadProps } from './types';
import { Grid } from '@mui/material';
import { FormikProvider } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../InputField';
import _ from 'lodash'
import SelectField from '../SelectField';
import useCatalogoEspecialidades from './useCatalogoEspecialidades';
import './style.scss';

const CatalogoEspecialidades: React.FC<CatalogoEspecialidadProps> = (props: CatalogoEspecialidadProps) => {
    const {
        formik,
        clave,
        setClave,
        nombre,
        setNombre,
        id_estatus,
        estatusCatalogos,
        setId_estatus,
        id_proyecto,
        proyectos,
        setId_proyecto,
        id_especialidad,
        especialidades,
        setId_especialidad,
        intl
    } = useCatalogoEspecialidades(props);

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
                                disabled={props?.esEspecialidadPadre}
                                label={intl.formatMessage({ id: 'input_especialidad' })}
                                value={id_especialidad}
                                options={

                                    props?.idEspecialidadPadre ? especialidades.filter((da: any) => da?.id === +props?.idEspecialidadPadre).map((e: any) => {
                                        return {
                                            label: e?.nombre,
                                            value: e?.id
                                        }
                                    }) :
                                        especialidades.map((e: any) => {
                                            return {
                                                label: e?.nombre,
                                                value: e?.id
                                            }
                                        })

                                }
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
                                        id_estatus,
                                        id_obra: id_proyecto,
                                        especialidad: _.isEmpty(id_especialidad) ? 0 : id_especialidad,
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

export default CatalogoEspecialidades
