import React, { useEffect, useState } from 'react'
import { AddParametrosAnalisisFormProps } from './types'
import * as Yup from "yup";
import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import { useIntl } from 'react-intl';
import _ from 'lodash';
import { Button, Form } from 'react-bootstrap';
import { Grid } from '@mui/material';
import InputField from '../../componets/InputField';

const AddParametrosAnalisisForm: React.FC<AddParametrosAnalisisFormProps> = (props: AddParametrosAnalisisFormProps) => {

    const intl = useIntl();
    const [clasificacion, setClasificacion] = useState<string>('');
    const [descripcion, setDescripcion] = useState<string>('');


    const formik = useFormik({
        initialValues: {
            "clasificacion": "",
            "descripcion": "",

        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            clasificacion: Yup.string()
                .min(1, intl.formatMessage({ id: "input_validation_min_1" }))
                .max(150, intl.formatMessage({ id: "input_validation_max_150" }))
                .required(intl.formatMessage({ id: "input_validation_requerido" })),
            descripcion: Yup.string()
                .min(1, intl.formatMessage({ id: "input_validation_min_1" }))
                .max(500, intl.formatMessage({ id: "input_validation_max_500" }))
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
        if (props?.item && props?.item?.clasificacion) {
            formik.setFieldValue("clasificacion", props?.item?.clasificacion ? props?.item?.clasificacion + "" : "");
            setClasificacion(props?.item?.clasificacion ? props?.item?.clasificacion + "" : "");
            formik.setFieldTouched('clasificacion', true)
        }
        if (props?.item && props?.item?.descripcion) {
            formik.setFieldValue("descripcion", props?.item?.descripcion ? props?.item?.descripcion + "" : "");
            setDescripcion(props?.item?.descripcion ? props?.item?.descripcion + "" : "");
            formik.setFieldTouched('descripcion', true)
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

                                <Grid item xs={12} md={12} style={{textAlign:'left'}}>
                                    <InputField
                                        required
                                        value={clasificacion || ""}
                                        name="clasificacion"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("clasificacion", target?.value || "");
                                            setClasificacion(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_clasificacion" })}
                                        placeholder={intl.formatMessage({ id: "input_clasificacion_descripcion" })}
                                        type="text"
                                        id="clasificacion"
                                        formik={formik?.getFieldMeta("clasificacion")}
                                    />
                                    <br />
                                </Grid>

                                <Grid item xs={12} md={12} style={{textAlign:'left'}}>
                                    <InputField
                                        required
                                        value={descripcion || ""}
                                        name="descripcion"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("descripcion", target?.value || "");
                                            setDescripcion(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_descripcion" })}
                                        placeholder={intl.formatMessage({ id: "input_descripcion_descripcion" })}
                                        type="textArea"
                                        id="descripcion"
                                        formik={formik?.getFieldMeta("descripcion")}
                                    />
                                    <br />
                                </Grid>

                                <Grid item xs={12} md={12}  style={{textAlign:'left'}}>
                                    <Button
                                        variant="primary"
                                        disabled={
                                            props?.procesando || !formik.dirty || !formik.isValid
                                        }
                                        onClick={(e: any) => {
                                            props?.enAccion(
                                                {
                                                    ...{
                                                        clasificacion,
                                                        descripcion,
                                                    },
                                                    ...props?.item?.id ? {
                                                        id: props?.item?.id
                                                    } : {}
                                                }
                                            );
                                        }}
                                    >
                                        {props?.item?.id ? intl.formatMessage({ id: "general_actualizar" }) : intl.formatMessage({ id: "general_guardar" })}
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

export default AddParametrosAnalisisForm
