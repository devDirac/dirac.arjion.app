import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import _ from 'lodash';
import { Grid } from '@mui/material';
import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../../componets/InputField';
import SelectField from '../../componets/SelectField';
import { useIntl } from 'react-intl';
import { AaddInsumoFormProps } from './types';
import "./style.scss";

const AaddInsumoForm: React.FC<AaddInsumoFormProps> = (props: AaddInsumoFormProps) => {

    const intl = useIntl();
    const [prioridad, setPrioridad] = useState<string>('');
    const [codigo, setCodigo] = useState<string>('');
    const [concepto, setConcepto] = useState<string>('');
    const [unidad, setUnidad] = useState<string>('');
    const [cantidad, setCantidad] = useState<string>('');
    const [precio, setPrecio] = useState<string>('');
    const [importe, setImporte] = useState<string>('');
    const [incidencia, setIncidencia] = useState<string>('');

    const formik = useFormik({
        initialValues: {
            "prioridad": "",
            "codigo": "",
            "concepto": "",
            "unidad": "",
            "cantidad": "",
            "precio": "",
            "importe": "",
            "incidencia": ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            prioridad: Yup.string().required(intl.formatMessage({ id: "input_validation_requerido" })),
            codigo: Yup.string()
                .min(1, intl.formatMessage({ id: "input_validation_min_1" }))
                .max(150, intl.formatMessage({ id: "input_validation_max_150" }))
                .required(intl.formatMessage({ id: "input_validation_requerido" })),
            concepto: Yup.string()
                .min(1, intl.formatMessage({ id: "input_validation_min_1" }))
                .max(150, intl.formatMessage({ id: "input_validation_max_150" }))
                .required(intl.formatMessage({ id: "input_validation_requerido" })),
            unidad: Yup.string()
                .min(1, intl.formatMessage({ id: "input_validation_min_1" }))
                .max(150, intl.formatMessage({ id: "input_validation_max_150" }))
                .required(intl.formatMessage({ id: "input_validation_requerido" })),
            cantidad: Yup.string()
                .max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' }))
                .matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' }))
                .required(intl.formatMessage({ id: 'input_validation_requerido' })),
            precio: Yup.string()
                .max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' }))
                .matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' }))
                .required(intl.formatMessage({ id: 'input_validation_requerido' })),
            importe: Yup.string()
                .max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' }))
                .matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' }))
                .required(intl.formatMessage({ id: 'input_validation_requerido' })),
            incidencia: Yup.string()
                .max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' }))
                .matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' }))
                .required(intl.formatMessage({ id: 'input_validation_requerido' })),
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
        if (props?.item && props?.item?.prioridad) {
            formik.setFieldValue("prioridad", props?.item?.prioridad ? props?.item?.prioridad + "" : "");
            setPrioridad(props?.item?.prioridad ? props?.item?.prioridad + "" : "");
            formik.setFieldTouched('prioridad', true)
        }
        if (props?.item && props?.item?.codigo) {
            formik.setFieldValue("codigo", props?.item?.codigo ? props?.item?.codigo + "" : "");
            setCodigo(props?.item?.codigo ? props?.item?.codigo + "" : "");
            formik.setFieldTouched('codigo', true)
        }
        if (props?.item && props?.item?.concepto_) {
            formik.setFieldValue("concepto", props?.item?.concepto_ ? props?.item?.concepto_ + "" : "");
            setConcepto(props?.item?.concepto_ ? props?.item?.concepto_ + "" : "");
            formik.setFieldTouched('concepto', true)
        }
        if (props?.item && props?.item?.unidad) {
            formik.setFieldValue("unidad", props?.item?.unidad ? props?.item?.unidad + "" : "");
            setUnidad(props?.item?.unidad ? props?.item?.unidad + "" : "");
            formik.setFieldTouched('unidad', true)
        }
        if (props?.item && props?.item?.cantidad_proyecto) {
            formik.setFieldValue("cantidad", props?.item?.cantidad_proyecto ? props?.item?.cantidad_proyecto + "" : "");
            setCantidad(props?.item?.cantidad_proyecto ? props?.item?.cantidad_proyecto + "" : "");
            formik.setFieldTouched('cantidad', true)
        }
        if (props?.item && props?.item?.precio) {
            formik.setFieldValue("precio", props?.item?.precio ? props?.item?.precio + "" : "");
            setPrecio(props?.item?.precio ? props?.item?.precio + "" : "");
            formik.setFieldTouched('precio', true)
        }
        if (props?.item && props?.item?.importe) {
            formik.setFieldValue("importe", props?.item?.importe ? props?.item?.importe + "" : "");
            setImporte(props?.item?.importe ? props?.item?.importe + "" : "");
            formik.setFieldTouched('importe', true)
        }
        if (props?.item && props?.item?.incidencia) {
            formik.setFieldValue("incidencia", props?.item?.incidencia ? props?.item?.incidencia + "" : "");
            setIncidencia(props?.item?.incidencia ? props?.item?.incidencia + "" : "");
            formik.setFieldTouched('incidencia', true)
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
                                    <SelectField
                                        label={intl.formatMessage({
                                            id: "input_prioridad",
                                        })}
                                        value={prioridad}
                                        options={[{ label: 'Normal', value: 'Normal' },{ label: 'Alta', value: 'Alta' }]}
                                        name="prioridad"
                                        id="prioridad"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("prioridad", target?.value || "");
                                            setPrioridad(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta("prioridad")}
                                    />
                                    <br />
                                </Grid>
                                 <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={codigo || ""}
                                        name="codigo"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("codigo", target?.value || "");
                                            setCodigo(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_codigo" })}
                                        placeholder={intl.formatMessage({ id: "input_codigo_descripcion" })}
                                        type="text"
                                        id="codigo"
                                        formik={formik?.getFieldMeta("codigo")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={concepto || ""}
                                        name="concepto"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("concepto", target?.value || "");
                                            setConcepto(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_concepto_" })}
                                        placeholder={intl.formatMessage({ id: "input_concepto__descripcion" })}
                                        type="text"
                                        id="concepto"
                                        formik={formik?.getFieldMeta("concepto")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={unidad || ""}
                                        name="unidad"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("unidad", target?.value || "");
                                            setUnidad(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_unidad" })}
                                        placeholder={intl.formatMessage({ id: "input_unidad_descripcion" })}
                                        type="text"
                                        id="unidad"
                                        formik={formik?.getFieldMeta("unidad")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={cantidad || ""}
                                        name="cantidad"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("cantidad", target?.value || "");
                                            setCantidad(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_cantidad" })}
                                        placeholder={intl.formatMessage({ id: "input_cantidad_descripcion" })}
                                        type="text"
                                        id="cantidad"
                                        formik={formik?.getFieldMeta("cantidad")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={precio || ""}
                                        name="precio"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("precio", target?.value || "");
                                            setPrecio(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_precio" })}
                                        placeholder={intl.formatMessage({ id: "input_precio_descripcion" })}
                                        type="text"
                                        id="precio"
                                        formik={formik?.getFieldMeta("precio")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={importe || ""}
                                        name="importe"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("importe", target?.value || "");
                                            setImporte(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_importe" })}
                                        placeholder={intl.formatMessage({ id: "input_importe_descripcion" })}
                                        type="text"
                                        id="importe"
                                        formik={formik?.getFieldMeta("importe")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={incidencia || ""}
                                        name="incidencia"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("incidencia", target?.value || "");
                                            setIncidencia(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_incidencia" })}
                                        placeholder={intl.formatMessage({ id: "input_incidencia_descripcion" })}
                                        type="text"
                                        id="incidencia"
                                        formik={formik?.getFieldMeta("incidencia")}
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
                                                    prioridad:prioridad === 'Alta' ? '2' : '1',
                                                    codigo,
                                                    concepto,
                                                    unidad,
                                                    cantidad,
                                                    precio,
                                                    importe,
                                                    incidencia
                                                }
                                            );
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

export default AaddInsumoForm;