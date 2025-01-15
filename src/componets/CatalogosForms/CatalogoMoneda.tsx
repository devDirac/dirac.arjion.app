import React from 'react';
import type { CatalogoEspecialidadProps } from './types';
import { Grid } from '@mui/material';
import { FormikProvider } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../InputField';
import SelectField from '../SelectField';
import useCatalogoMoneda from './useCatalogoMoneda';
import './style.scss';

const CatalogoMoneda: React.FC<CatalogoEspecialidadProps> = (props: CatalogoEspecialidadProps) => {
    const {
        formik,
        nombre,
        setNombre,
        id_estatus,
        estatusCatalogos,
        setId_estatus,
        intl
    } = useCatalogoMoneda(props);
    return (
        <div>
            <Grid container >
                <FormikProvider value={formik}>
                    <Form.Group style={{ width: '100%' }}>
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
                                        id_estatus,
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

export default CatalogoMoneda
