import React from 'react';
import type { CatalogoEspecialidadProps } from './types';
import { Grid } from '@mui/material';
import { FormikProvider } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../InputField';
import SelectField from '../SelectField';
import useCatalogoEquipoMaquinaria from './useCatalogoEquipoMaquinaria';
import './style.scss';

const CatalogoEquipoMaquinaria: React.FC<CatalogoEspecialidadProps> = (props: CatalogoEspecialidadProps) => {
    const {
        formik,
        nombre,
        setNombre,
        unidad,
        setUnidad,
        precio,
        setPrecio,
        id_proyecto,
        proyectos,
        setId_proyecto,
        tiposCatalogos,
        id_tipo,
        setId_tipo,
        id_estatus,
        estatusCatalogos,
        setId_estatus,
        intl
    }   = useCatalogoEquipoMaquinaria(props);

    return (
        <div>
            <FormikProvider value={formik}>
                <Form.Group style={{ width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
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
                        <Grid item xs={12} md={6}>
                            <InputField
                                required
                                value={unidad || ''}
                                name="unidad"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("unidad", target?.value || '');
                                    setUnidad(target?.value);
                                }}
                                label={intl.formatMessage({ id: 'input_unidad' })}
                                placeholder={intl.formatMessage({ id: 'input_unidad_descripcion' })}
                                type="text"
                                id="unidad"
                                formik={formik?.getFieldMeta('unidad')}
                            />
                            <br />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <InputField
                                required
                                value={precio || ''}
                                name="precio"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("precio", target?.value || '');
                                    setPrecio(target?.value);
                                }}
                                label={intl.formatMessage({ id: 'input_precio' })}
                                placeholder={intl.formatMessage({ id: 'input_precio_descripcion' })}
                                type="text"
                                id="descripcion"
                                formik={formik?.getFieldMeta('descripcion')}
                            />
                            <br />
                        </Grid>

                        <Grid item xs={12} md={6}>
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

                        <Grid item xs={12} md={6}>
                            <SelectField
                                label={intl.formatMessage({ id: 'input_id_tipo' })}
                                value={id_tipo}
                                options={tiposCatalogos.map((e: any) => {
                                    return {
                                        label: e?.nombre,
                                        value: e?.id
                                    }
                                })}
                                name="id_tipo"
                                id="id_tipo"
                                required
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("id_tipo", target?.value || '');
                                    setId_tipo(target?.value);
                                }}
                                formik={formik?.getFieldMeta('id_tipo')}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
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

                                        nombre,
                                        unidad,
                                        precio,
                                        id_obra:id_proyecto,
                                        id_tipo,
                                        id_estatus,
                                        BD: props?.catalogo
                                    });
                                }}
                            >
                                {intl.formatMessage({ id: 'general_guardar' })}
                            </Button>
                        </Grid>

                    </Grid>
                </Form.Group>
            </FormikProvider>
        </div>
    )
}

export default CatalogoEquipoMaquinaria
