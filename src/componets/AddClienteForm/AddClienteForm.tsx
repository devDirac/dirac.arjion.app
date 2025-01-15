import React from 'react'
import type { AddClienteFormPros } from './types'
import { Grid } from '@mui/material';
import { FormikProvider } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../InputField';
import { useAddClienteForm } from './useAddClienteForm';
import { useIntl } from 'react-intl';
import "./style.scss";
const AddClienteForm: React.FC<AddClienteFormPros> = (props: AddClienteFormPros) => {
    const intl = useIntl();
    const {
        darkMode,
        formik,
        nombre,
        setNombre,
        nombreCorto,
        setNombreCorto,
        rfc,
        setRfc
    } = useAddClienteForm(props);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <Grid item xs={12} className='bordersContainers' style={darkMode ? { backgroundColor: '#1f283e', padding: '10px', minHeight: '600px' } : { backgroundColor: '#fff', padding: '10px', minHeight: '600px' }}>
                    <FormikProvider value={formik}>
                        <Form.Group className="mb-3 " >
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
                            <InputField
                                required
                                value={nombreCorto || ''}
                                name="nombreCorto"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("nombreCorto", target?.value || '');
                                    setNombreCorto(target?.value);
                                }}
                                label={intl.formatMessage({ id: 'input_nombre_corto' })}
                                placeholder={intl.formatMessage({ id: 'input_nombre_corto_descripcion' })}
                                type="text"
                                id="nombreCorto"
                                formik={formik?.getFieldMeta('nombreCorto')}
                            />
                            <br />
                            <InputField
                                required
                                value={rfc || ''}
                                name="rfc"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("rfc", target?.value || '');
                                    setRfc(target?.value);
                                }}
                                label={intl.formatMessage({ id: 'input_rfc' })}
                                placeholder={intl.formatMessage({ id: 'input_rfc_descripcion' })}
                                type="text"
                                id="rfc"
                                formik={formik?.getFieldMeta('rfc')}
                            />
                            <br />
                            <Button
                                variant="primary"
                                disabled={props?.procesando || !formik.dirty || !formik.isValid}
                                onClick={(e: any) => {
                                    props?.enAccion({
                                        nombre,
                                        nombre_corto:nombreCorto,
                                        rfc
                                    });
                                }}
                            >
                                {intl.formatMessage({ id: 'general_guardar' })}
                            </Button>
                        </Form.Group>
                    </FormikProvider>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default AddClienteForm
