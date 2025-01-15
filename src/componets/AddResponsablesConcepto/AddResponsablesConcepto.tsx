import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import _ from 'lodash';
import { Grid } from '@mui/material';
import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../../componets/InputField';
import SelectField from '../../componets/SelectField';
import { useIntl } from 'react-intl';

export interface AddResponsablesConceptoProps {
    procesando: boolean
    onAccion: (data: any) => void
    darkMode: boolean
    responsables: any[]
    item?: any
}

const AddResponsablesConcepto: React.FC<AddResponsablesConceptoProps> = (props: AddResponsablesConceptoProps) => {

    const intl = useIntl();

    const [porcentaje, setPorcentaje] = useState<string>('');
    const [responsable, setResponsable] = useState<string>('');
    const formik = useFormik({
        initialValues: {
            responsable: "",
            porcentaje: ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            responsable: Yup.string()
                .required(intl.formatMessage({ id: 'input_validation_requerido' })),
            porcentaje: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),

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

        if (props?.item && props?.item?.responsable) {
            formik.setFieldValue("responsable", props?.item?.responsable ? props?.item?.responsable + "" : "");
            setResponsable(props?.item?.responsable ? props?.item?.responsable + "" : "");
            formik.setFieldTouched('responsable', true)
        }
        if (props?.item && props?.item?.porcentaje) {
            formik.setFieldValue("porcentaje", props?.item?.porcentaje ? props?.item?.porcentaje + "" : "");
            setPorcentaje(props?.item?.porcentaje ? props?.item?.porcentaje + "" : "");
            formik.setFieldTouched('porcentaje', true)
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
                                    <h5>Cuantos hitos desea agregar</h5>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={porcentaje || ""}
                                        name="porcentaje"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("porcentaje", target?.value || "");
                                            setPorcentaje(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_porcentaje" })}
                                        type="text"
                                        id="porcentaje"
                                        formik={formik?.getFieldMeta("porcentaje")}
                                    />
                                    <br />
                                </Grid>

                                <Grid item xs={12}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'input_responsable' })}
                                        value={responsable}
                                        options={(props?.responsables || []).map(e => {
                                            return {
                                                label: e?.name + ' - ' + e?.tipo,
                                                value: e?.id
                                            }
                                        })}
                                        name="responsable"
                                        id="responsable"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("responsable", target?.value || '');
                                            setResponsable(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta('responsable')}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Button
                                        variant="primary"
                                        disabled={
                                            props?.procesando || !formik.dirty || !formik.isValid
                                        }
                                        onClick={(e: any) => {
                                            props?.onAccion({
                                                porcentaje,
                                                responsable
                                            });
                                        }}
                                    >
                                        {intl.formatMessage({ id: "general_continuar" })}
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

export default AddResponsablesConcepto
