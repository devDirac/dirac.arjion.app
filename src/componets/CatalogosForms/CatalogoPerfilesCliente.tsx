import React from 'react';
import type { CatalogosGenericosProps } from './types';
import { Grid } from '@mui/material';
import { FormikProvider } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../InputField';
import SelectField from '../SelectField';
import useCatalogoPerfilesCliente from './useCatalogoPerfilesCliente';
import './style.scss';

const CatalogoPerfilesCliente: React.FC<CatalogosGenericosProps> = (props: CatalogosGenericosProps) => {
    
    const {
        formik,
        clave,
        setClave,
        nombre,
        setNombre,
        descripcion,
        setDescripcion,
        id_estatus,
        estatusCatalogos,
        setId_estatus,
        tiposUsuario,
        id_tipo_usuario,
        setId_tipo_usuario,
        intl
    } = useCatalogoPerfilesCliente(props);

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
                                placeholder={intl.formatMessage({ id: 'input_nombre' })}
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
                                label={intl.formatMessage({ id: 'input_tipo_usuario' })}
                                value={id_tipo_usuario}
                                options={tiposUsuario.map((e: any) => {
                                    return {
                                        label: e?.tipo,
                                        value: e?.id
                                    }
                                })}
                                name="id_tipo_usuario"
                                id="id_tipo_usuario"
                                required
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("id_tipo_usuario", target?.value || '');
                                    setId_tipo_usuario(target?.value);
                                }}
                                formik={formik?.getFieldMeta('id_tipo_usuario')}
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
                                        id_estatus,
                                        id_tipo: id_tipo_usuario,
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

export default CatalogoPerfilesCliente
