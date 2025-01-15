import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import _ from 'lodash';
import { Grid } from '@mui/material';
import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../../componets/InputField';
import SelectField from '../../componets/SelectField';
import { useIntl } from 'react-intl';
import { AddOrigenDestinoFormProps } from './types';
import "./style.scss";

const AddOrigenDestinoForm: React.FC<AddOrigenDestinoFormProps> = (props: AddOrigenDestinoFormProps) => {

    const intl = useIntl();
    const [nombre, setNombre] = useState<string>('');
    

    const formik = useFormik({
        initialValues: {
            "nombre": ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            nombre: Yup.string()
            .min(1, intl.formatMessage({ id: "input_validation_min_1" }))
            .max(150, intl.formatMessage({ id: "input_validation_max_150" }))
            .required(intl.formatMessage({ id: "input_validation_requerido" })),
        }),
    });


    const validate = async () => {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length === 0) {
        } else {
            formik.setTouched(
                setNestedObjectValues<FormikTouched<any>>(errors, true)
            );
        }
    };

    useEffect(() => {
        if (props?.item && props?.item?.nombre) {
            formik.setFieldValue("nombre", props?.item?.nombre ? props?.item?.nombre + "" : "");
            setNombre(props?.item?.nombre ? props?.item?.nombre + "" : "");
            formik.setFieldTouched('nombre', true)
        }
        if (!_.isEmpty(props?.item)) {
            validate();
        }
    }, [props?.item]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid
                    item
                    xs={12}
                    className="bordersContainers"
                    style={
                        props?.darkMode
                            ? {
                                backgroundColor: "#1f283e",
                                padding: "10px",
                            }
                            : { backgroundColor: "#fff", padding: "10px" }
                    }
                >
                    <FormikProvider value={formik}>
                        <Form.Group className="mb-3 ">
                            <Grid container spacing={2}>
                               
                                
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={nombre || ""}
                                        name="nombre"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("nombre", target?.value || "");
                                            setNombre(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_nombre" })}
                                        placeholder={intl.formatMessage({ id: "input_nombre_descripcion" })}
                                        type="text"
                                        id="nombre"
                                        formik={formik?.getFieldMeta("nombre")}
                                    />
                                    <br />
                                </Grid>
                                
                                <Grid item xs={12} md={12}>
                                    <Button
                                        variant="primary"
                                        disabled={
                                            props?.procesando || !formik.dirty || !formik.isValid
                                        }
                                        onClick={(e: any) => {
                                            props?.onAccion(
                                                {
                                                   nombre
                                                }
                                            );
                                        }}
                                    >
                                        {intl.formatMessage({ id: "general_guardar" })}
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

export default AddOrigenDestinoForm;