import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../../componets/InputField';
import _ from 'lodash';
import * as Yup from "yup";
import { useIntl } from 'react-intl';

const SolicitudGasto: React.FC<any> = (props: any) => {
    const intl = useIntl();

    const [descripcion, setDescripcion] = useState('');
    
    const formik = useFormik({
        initialValues: {
            descripcion: ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            descripcion: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' }))
        }),
    });
    
    const validate = async () => {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length === 0) {
        } else {
            formik.setTouched(setNestedObjectValues<FormikTouched<any>>(errors, true));
        }
    }

    useEffect(() => {
        if (props?.item && props?.item?.description) {
            formik.setFieldValue("descripcion", props?.item?.description || '');
            setDescripcion(props?.item?.description || '');
        }
        if (props?.item) {
            validate();
        }


    }, [props?.item]);

    useEffect(() => {
        if (props?.resetForm) {
            setDescripcion('');
            formik.resetForm();
        }
    }, [props?.resetForm]);

    return (
        <div>
            <FormikProvider value={formik}>
                <Form.Group style={{ width: '100%' }}>
                    <Grid container spacing={2} mt={5} style={{padding:15}}>
                        
                        
                        
                        <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
                            <h5 style={{color:'rgb(68, 94, 150)'}}>Solicitud de prestamo</h5>
                        </Grid>
                        
                        
                        
                        
                        <Grid item xs={12} md={12}>
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
                                type="textArea"
                                id="descripcion"
                                formik={formik?.getFieldMeta('descripcion')}
                            />
                            <br />
                        </Grid>
                       
                        <Grid
                            item
                            xs={12}
                            style={{ padding: "5px", paddingTop: "0", paddingBottom: "0", textAlign: 'right' }}
                        >
                            <Button
                                variant="primary"
                                disabled={props?.procesando || !formik.dirty || !formik.isValid}
                                onClick={(e) => {
                                    props?.action({
                                        descripcion
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

export default SolicitudGasto
