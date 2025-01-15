import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import _ from 'lodash';
import { Grid } from '@mui/material';
import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../../componets/InputField';
import SelectField from '../../componets/SelectField';
import { useIntl } from 'react-intl';

export interface AddHitosFormProps {
    procesando: boolean
    onAccion: (data: any) => void
    darkMode: boolean
    responsables:any[]
    item?:any
}

const AddHitosForm: React.FC<AddHitosFormProps> = (props: AddHitosFormProps) => {

    const intl = useIntl();
    const [fechaInicio, setFechaInicio] = useState<string>('');
    const [fechaFin, setFechaFin] = useState<string>('');
    const [cantidad, setCantidad] = useState<string>('');
    const [comentarios, setComentarios] = useState<string>('');
    const [diasNotificarInicio, setDiasNotificarInicio] = useState<string>('');
    const [diasNotificarFin, setDiasNotificarFin] = useState<string>('');
    const [responsable,setResponsable] = useState<string>('');
    const formik = useFormik({
        initialValues: {
            fechaInicio: "",
            fechaFin: "",
            cantidad: "",
            comentarios: "",
            diasNotificarInicio: "",
            diasNotificarFin: "",
            responsable:""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            fechaInicio: Yup.string()
                .required(intl.formatMessage({ id: 'input_validation_requerido' })),
            fechaFin: Yup.string()
                .required(intl.formatMessage({ id: 'input_validation_requerido' })),
            cantidad: Yup.string()
                .max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' }))
                .matches(/^[0-9]+$/, intl.formatMessage({ id: 'input_validation_solo_numeros' }))
                .required(intl.formatMessage({ id: 'input_validation_requerido' })),
            comentarios: Yup.string()
                .min(4, intl.formatMessage({ id: "input_validation_min_4" }))
                .max(500, intl.formatMessage({ id: "input_validation_max_500" }))
                .required(intl.formatMessage({ id: 'input_validation_requerido' })),
            diasNotificarInicio: Yup.string()
                .max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' }))
                .matches(/^[0-9]+$/, intl.formatMessage({ id: 'input_validation_solo_numeros' }))
                .required(intl.formatMessage({ id: 'input_validation_requerido' })),
            diasNotificarFin: Yup.string()
                .max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' }))
                .matches(/^[0-9]+$/, intl.formatMessage({ id: 'input_validation_solo_numeros' }))
                .required(intl.formatMessage({ id: 'input_validation_requerido' })),
            responsable: Yup.string()
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
        if (props?.item && props?.item?.fechaInicio) {
            formik.setFieldValue("fechaInicio", props?.item?.fechaInicio ? props?.item?.fechaInicio + "" : "");
            setFechaInicio(props?.item?.fechaInicio ? props?.item?.fechaInicio + "" : "");
            formik.setFieldTouched('fechaInicio', true)
        }
        if (props?.item && props?.item?.fechaFin) {
            formik.setFieldValue("fechaFin", props?.item?.fechaFin ? props?.item?.fechaFin + "" : "");
            setFechaFin(props?.item?.fechaFin ? props?.item?.fechaFin + "" : "");
            formik.setFieldTouched('fechaFin', true)
        }
        if (props?.item && props?.item?.cantidad) {
            formik.setFieldValue("cantidad", props?.item?.cantidad ? props?.item?.cantidad + "" : "");
            setCantidad(props?.item?.cantidad ? props?.item?.cantidad + "" : "");
            formik.setFieldTouched('cantidad', true)
        }
        if (props?.item && props?.item?.comentarios) {
            formik.setFieldValue("comentarios", props?.item?.comentarios ? props?.item?.comentarios + "" : "");
            setComentarios(props?.item?.comentarios ? props?.item?.comentarios + "" : "");
            formik.setFieldTouched('comentarios', true)
        }
        if (props?.item && props?.item?.diasNotificarInicio) {
            formik.setFieldValue("diasNotificarInicio", props?.item?.diasNotificarInicio ? props?.item?.diasNotificarInicio + "" : "");
            setDiasNotificarInicio(props?.item?.diasNotificarInicio ? props?.item?.diasNotificarInicio + "" : "");
            formik.setFieldTouched('diasNotificarInicio', true)
        }
        if (props?.item && props?.item?.diasNotificarFin) {
            formik.setFieldValue("diasNotificarFin", props?.item?.diasNotificarFin ? props?.item?.diasNotificarFin + "" : "");
            setDiasNotificarFin(props?.item?.diasNotificarFin ? props?.item?.diasNotificarFin + "" : "");
            formik.setFieldTouched('diasNotificarFin', true)
        }
        if (props?.item && props?.item?.responsable) {
            formik.setFieldValue("responsable", props?.item?.responsable ? props?.item?.responsable + "" : "");
            setResponsable(props?.item?.responsable ? props?.item?.responsable + "" : "");
            formik.setFieldTouched('responsable', true)
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
                                        value={fechaInicio || ""}
                                        name="fechaInicio"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("fechaInicio", target?.value || "");
                                            setFechaInicio(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_fecha_inicio" })}
                                        type="date"
                                        id="fechaInicio"
                                        formik={formik?.getFieldMeta("fechaInicio")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={fechaFin || ""}
                                        name="fechaFin"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("fechaFin", target?.value || "");
                                            setFechaFin(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_fecha_final" })}
                                        type="date"
                                        id="fechaFin"
                                        formik={formik?.getFieldMeta("fechaFin")}
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
                                        placeholder={intl.formatMessage({
                                            id: "input_descripcion_cantidad",
                                        })}
                                        type="text"
                                        id="cantidad"
                                        formik={formik?.getFieldMeta("cantidad")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={comentarios || ""}
                                        name="comentarios"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("comentarios", target?.value || "");
                                            setComentarios(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_comentarios" })}
                                        placeholder={intl.formatMessage({
                                            id: "input_comentarios_descripcion",
                                        })}
                                        type="textArea"
                                        id="comentarios"
                                        formik={formik?.getFieldMeta("comentarios")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={diasNotificarInicio || ""}
                                        name="diasNotificarInicio"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("diasNotificarInicio", target?.value || "");
                                            setDiasNotificarInicio(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_diasNotificarInicio" })}
                                        placeholder={intl.formatMessage({
                                            id: "input_diasNotificarInicio_descripcion",
                                        })}
                                        type="text"
                                        id="diasNotificarInicio"
                                        formik={formik?.getFieldMeta("diasNotificarInicio")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={diasNotificarFin || ""}
                                        name="diasNotificarFin"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("diasNotificarFin", target?.value || "");
                                            setDiasNotificarFin(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_diasNotificarFin" })}
                                        placeholder={intl.formatMessage({
                                            id: "input_diasNotificarFin_descripcion",
                                        })}
                                        type="text"
                                        id="diasNotificarFin"
                                        formik={formik?.getFieldMeta("diasNotificarFin")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'input_responsable' })}
                                        value={responsable}
                                        options={(props?.responsables || []).map(e=>{
                                            return {
                                                label:e?.name + ' - ' + e?.tipo,
                                                value:e?.id
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
                                                fechaInicio,
                                                fechaFin,
                                                cantidad,
                                                comentarios,
                                                diasNotificarInicio,
                                                diasNotificarFin,
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

export default AddHitosForm
