import React from 'react'
import type { AddCarpetaCompartidaProps } from './type'
import { Grid } from '@mui/material';
import { FormikProvider } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../InputField';
import { useMaterialUIController } from "context";
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useIntl } from 'react-intl';
import "./style.scss";


const AddCarpetaCompartida: React.FC<AddCarpetaCompartidaProps> = (props: AddCarpetaCompartidaProps) => {

    const intl = useIntl();
    const [nombre, setNombre] = useState('');

    const [controller] = useMaterialUIController();
    const { darkMode } = controller;

    const formik = useFormik({
        initialValues: {
            nombre: ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .min(4, intl.formatMessage({ id: 'input_validation_min_4' }))
                .max(255, intl.formatMessage({ id: 'input_validation_max_255' }))
                .required(intl.formatMessage({ id: 'input_validation_requerido' }))
        }),
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <Grid item xs={12} className='bordersContainers' style={darkMode ? { backgroundColor: '#1f283e', padding: '10px' } : { backgroundColor: '#fff', padding: '10px' }}>
                    <FormikProvider value={formik}>
                        <Form.Group className="mb-3 " >
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
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
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Button
                                        variant="primary"
                                        disabled={props?.procesando || !formik.dirty || !formik.isValid}
                                        onClick={(e: any) => {
                                            props?.enAccion({
                                                nombre
                                            });
                                        }}
                                    >
                                        {intl.formatMessage({ id: 'general_guardar' })}
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

export default AddCarpetaCompartida
