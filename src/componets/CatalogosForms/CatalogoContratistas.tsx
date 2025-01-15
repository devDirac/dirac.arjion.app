import React from 'react';
import type { CatalogoEspecialidadProps } from './types';
import { Grid } from '@mui/material';
import { FormikProvider } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../InputField';
import SelectField from '../SelectField';
import useCatalogoContratistas from './useCatalogoContratistas';
import './style.scss';

const CatalogoContratistas: React.FC<CatalogoEspecialidadProps> = (props: CatalogoEspecialidadProps) => {
    const{ 
        formik,
        contratista,
        setContratista,
        correo_contratista,
        setCorreo_contratista,
        descripcion,
        setDescripcion,
        rfc,
        setRFC,
        id_externo,
        setId_externo,
        id_proyecto,
        proyectos,
        id_estatus,
        setId_proyecto,
        estatusCatalogos,
        setId_estatus,
        estatus_bloqueo,
        setEstatus_bloqueo,
        extranjero,
        setExtranjero,
        intl
    } = useCatalogoContratistas(props);
    

    return (
        <div>
            <FormikProvider value={formik}>
                <Form.Group style={{ width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <InputField
                                required
                                value={contratista || ''}
                                name="contratista"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("contratista", target?.value || '');
                                    setContratista(target?.value);
                                }}
                                label={intl.formatMessage({ id: 'input_contratista' })}
                                placeholder={intl.formatMessage({ id: 'input_contratista_descripcion' })}
                                type="text"
                                id="contratista"
                                formik={formik?.getFieldMeta('contratista')}
                            />
                            <br />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputField
                                required
                                value={correo_contratista || ''}
                                name="correo_contratista"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("correo_contratista", target?.value || '');
                                    setCorreo_contratista(target?.value);
                                }}
                                label={intl.formatMessage({ id: 'general_correo' })}
                                placeholder={intl.formatMessage({ id: 'input_correo_descripcion' })}
                                type="text"
                                id="correo_contratista"
                                formik={formik?.getFieldMeta('correo_contratista')}
                            />
                            <br />
                        </Grid>
                        <Grid item xs={12} md={6}>
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
                        <Grid item xs={12} md={6}>
                            <InputField
                                required
                                value={rfc || ''}
                                name="rfc"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("rfc", target?.value || '');
                                    setRFC(target?.value);
                                }}
                                label={intl.formatMessage({ id: 'input_rfc' })}
                                placeholder={intl.formatMessage({ id: 'input_rfc_descripcion' })}
                                type="text"
                                id="rfc"
                                formik={formik?.getFieldMeta('rfc')}
                            />
                            <br />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <InputField
                                required
                                value={id_externo || ''}
                                name="id_externo"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("id_externo", target?.value || '');
                                    setId_externo(target?.value);
                                }}
                                label={intl.formatMessage({ id: 'input_id_externo' })}
                                placeholder={intl.formatMessage({ id: 'input_id_externo_descripcion' })}
                                type="text"
                                id="id_externo"
                                formik={formik?.getFieldMeta('id_externo')}
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
                        <Grid item xs={12} md={6}>
                            <SelectField
                                label={intl.formatMessage({ id: 'input_estatus_bloqueo' })}
                                value={estatus_bloqueo}
                                options={[{
                                    label: 'ACTIVO',
                                    value: 'ACTIVO'
                                }, {
                                    label: 'INACTIVO',
                                    value: 'INACTIVO'
                                }, {
                                    label: 'SIN REGISTRO REPSE',
                                    value: 'SIN REGISTRO REPSE'
                                }]}
                                name="estatus_bloqueo"
                                id="estatus_bloqueo"
                                required
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("estatus_bloqueo", target?.value || '');
                                    setEstatus_bloqueo(target?.value);
                                }}
                                formik={formik?.getFieldMeta('estatus_bloqueo')}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SelectField
                                label={intl.formatMessage({ id: 'input_extranjero' })}
                                value={extranjero}
                                options={[{
                                    label: 'SI',
                                    value: 'SI'
                                }, {
                                    label: 'NO',
                                    value: 'NO'
                                }]}
                                name="extranjero"
                                id="extranjero"
                                required
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("extranjero", target?.value || '');
                                    setExtranjero(target?.value);
                                }}
                                formik={formik?.getFieldMeta('extranjero')}
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
                                        contratista,
                                        correo_contratista,
                                        descripcion,
                                        rfc,
                                        id_externo,
                                        id_obra:id_proyecto,
                                        id_estatus,
                                        estatus_bloqueo,
                                        extranjero,
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

export default CatalogoContratistas
