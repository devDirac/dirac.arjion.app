import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import _ from 'lodash';
import { Grid } from '@mui/material';
import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../../componets/InputField';
import SelectField from '../../componets/SelectField';
import { useIntl } from 'react-intl';

export interface SeleccionDeObraProgramaProps {
    procesando: boolean
    onAccion: (data: any) => void
    darkMode: boolean
    programas: any[]
    item?: any
}

const SeleccionDeObraPrograma: React.FC<SeleccionDeObraProgramaProps> = (props: SeleccionDeObraProgramaProps) => {
    const intl = useIntl();
    const [fecha, setFecha] = useState<string>("");
    const [motivo, setMotivo] = useState<string>("");
    const [convenio, setConvenio] = useState<string>("");

    const formik = useFormik({
        initialValues: {
            fecha: "",
            motivo: "",
            convenio: "",
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            fecha: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            motivo: Yup.string().max(500, intl.formatMessage({ id: 'input_validation_max_500' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            convenio: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
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

        if (props?.item && props?.item?.fecha) {
            formik.setFieldValue("fecha", props?.item?.fecha ? props?.item?.fecha + "" : "");
            setFecha(props?.item?.fecha ? props?.item?.fecha + "" : "");
            formik.setFieldTouched('fecha', true)
        }

        if (props?.item && props?.item?.motivo) {
            formik.setFieldValue("motivo", props?.item?.motivo ? props?.item?.motivo + "" : "");
            setMotivo(props?.item?.motivo ? props?.item?.motivo + "" : "");
            formik.setFieldTouched('motivo', true)
        }
        if (props?.item && props?.item?.convenio) {
            formik.setFieldValue("convenio", props?.item?.convenio ? props?.item?.convenio + "" : "");
            setConvenio(props?.item?.convenio ? props?.item?.convenio + "" : "");
            formik.setFieldTouched('convenio', true)
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
                                    <h5>Guardar programa y reprogramar</h5>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <SelectField
                                        label={intl.formatMessage({
                                            id: "input_programa",
                                        })}
                                        value={fecha}
                                        options={(props?.programas || []).map((e: any) => {
                                            return {
                                                label: (e?.fecha || "") + ' ' + e?.motivo,
                                                value: e?.id,
                                            };
                                        })}
                                        name="usuario"
                                        id="usuario"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("fecha", target?.value || "");
                                            setFecha(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta("fecha")}
                                    />
                                    {/*  <InputField
                                        required
                                        value={fecha || ""}
                                        name="fecha"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("fecha", target?.value || "");
                                            setFecha(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_fecha" })}
                                        type="date"
                                        id="fecha"
                                        formik={formik?.getFieldMeta("fecha")}
                                    /> */}
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={motivo || ""}
                                        name="motivo"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("motivo", target?.value || "");
                                            setMotivo(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_motivo" })}
                                        placeholder={intl.formatMessage({ id: "input_motivo_descripcion" })}
                                        type="textArea"
                                        id="motivo"
                                        formik={formik?.getFieldMeta("motivo")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={convenio || ""}
                                        name="convenio"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("convenio", target?.value || "");
                                            setConvenio(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_convenio" })}
                                        placeholder={intl.formatMessage({ id: "input_convenio_descripcion" })}
                                        type="text"
                                        id="convenio"
                                        formik={formik?.getFieldMeta("convenio")}
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
                                            props?.onAccion({
                                                fecha,
                                                motivo,
                                                convenio
                                            });
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

export default SeleccionDeObraPrograma
