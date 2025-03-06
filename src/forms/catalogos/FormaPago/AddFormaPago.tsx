import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../../../componets/InputField';
import _ from 'lodash';
import * as Yup from "yup";
import { useIntl } from 'react-intl';

interface AddFormaPagoProps {
    item?: any
    resetForm?: any
    procesando: boolean
    enAction: (data: any) => void
}

const AddFormaPago: React.FC<AddFormaPagoProps> = (props: AddFormaPagoProps) => {
    const intl = useIntl();

    const [clave, setClave] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const formik = useFormik({
        initialValues: {
            clave: "",
            nombre: "",
            descripcion: "",
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            clave: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            nombre: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            descripcion: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
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
        if (props?.item && props?.item?.clave) {
            formik.setFieldValue("clave", props?.item?.clave || '');
            setClave(props?.item?.clave || '');
        }
        if (props?.item && props?.item?.nombre) {
            formik.setFieldValue("nombre", props?.item?.nombre || '');
            setNombre(props?.item?.nombre || '');
        }
        if (props?.item && props?.item?.descripcion) {
            formik.setFieldValue("descripcion", props?.item?.descripcion || '');
            setDescripcion(props?.item?.descripcion || '');
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
                    <Grid container spacing={2} mt={5} style={{ padding: 15 }}>
                    <Grid item xs={12} md={12}>
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
                            <br />
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
                                    props?.enAction({
                                        clave,
                                        nombre,
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

export default AddFormaPago
