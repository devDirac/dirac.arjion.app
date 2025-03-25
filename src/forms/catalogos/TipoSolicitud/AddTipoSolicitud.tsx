import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../../../componets/InputField';
import _ from 'lodash';
import * as Yup from "yup";
import { useIntl } from 'react-intl';
import CampoSwitch from '../../../componets/CampoSwitch';

interface AddTipoSolicitudProps {
    item?: any
    resetForm?: any
    procesando: boolean
    enAction: (data: any) => void
}


const AddTipoSolicitud: React.FC<AddTipoSolicitudProps> = (props: AddTipoSolicitudProps) => {
    const intl = useIntl();

    const [clave, setClave] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [requiere_beneficiario, setRequiere_beneficiario] = useState(true);
    const [requiere_documentos, setRequiere_documentos] = useState(true);
    const [mostrar_pago_quincenas, setMostrar_pago_quincenas] = useState(false);
    const [requiereAprobacionRevisor, setRequiereAprobacionRevisor] = useState(true);
    const [requiereFechaPago, setRequiereFechaPago] = useState(false);
    const [muestra_notificar_nomina, setMuestra_notificar_nomina] = useState(false);
    const [dias_notifica_pago, setDias_notifica_pago] = useState('0');

    const formik = useFormik({
        initialValues: {
            clave: "",
            nombre: "",
            descripcion: "",
            dias_notifica_pago:"0"
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            clave: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            nombre: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            descripcion: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            dias_notifica_pago: Yup.string().max(2, 'Debe de tener máximo de 2 dígitos').matches(/^-?\d{1,2}(\.\d{1,2})?$/, 'Solo numeros son validos'),//.required('Requerido'),
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

        if (props?.item && props?.item?.dias_notifica_pago) {
            formik.setFieldValue("dias_notifica_pago", props?.item?.dias_notifica_pago || '');
            setDias_notifica_pago(props?.item?.dias_notifica_pago || '');
        }

        if (props?.item && props?.item?.requiere_beneficiario) {
            setRequiere_beneficiario(props?.item?.requiere_beneficiario === "Si" ? true : false);
        }

        if (props?.item && props?.item?.requiere_documentos) {
            setRequiere_documentos(props?.item?.requiere_documentos === "Si" ? true : false);
        }

        if (props?.item && props?.item?.mostrar_pago_quincenas) {
            setMostrar_pago_quincenas(props?.item?.mostrar_pago_quincenas === "Si" ? true : false);
        }

        if (props?.item && props?.item?.muestra_notificar_nomina) {
            setMuestra_notificar_nomina(props?.item?.muestra_notificar_nomina === "Si" ? true : false);
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
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <InputField
                                required
                                value={dias_notifica_pago || ''}
                                name="dias_notifica_pago"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("dias_notifica_pago", target?.value || '');
                                    setDias_notifica_pago(target?.value);
                                }}
                                label={intl.formatMessage({ id: 'input_dias_notifica_pago' })}
                                placeholder={intl.formatMessage({ id: 'input_dias_notifica_pago_descripcion' })}
                                type="text"
                                id="dias_notifica_pago"
                                formik={formik?.getFieldMeta('dias_notifica_pago')}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CampoSwitch
                                label={'Requiere beneficiario'}
                                value={requiere_beneficiario}
                                onAction={(v) => setRequiere_beneficiario(v)}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <CampoSwitch
                                label={'Requiere documentos'}
                                value={requiere_documentos}
                                onAction={(v) => setRequiere_documentos(v)}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <CampoSwitch
                                label={'Mostrar pago en quincenas'}
                                value={mostrar_pago_quincenas}
                                onAction={(v) => setMostrar_pago_quincenas(v)}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <CampoSwitch
                                label={'Requiere aprobación del revisor fiscal'}
                                value={requiereAprobacionRevisor}
                                onAction={(v) => setRequiereAprobacionRevisor(v)}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <CampoSwitch
                                label={'Requiere fecha de pago'}
                                value={requiereFechaPago}
                                onAction={(v) => setRequiereFechaPago(v)}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <CampoSwitch
                                label={'Muestra botón notificar a nomina'}
                                value={muestra_notificar_nomina}
                                onAction={(v) => setMuestra_notificar_nomina(v)}
                            />
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
                                        descripcion,
                                        requiere_fechaPago:requiereFechaPago ? 1 : 0,
                                        requiere_beneficiario: requiere_beneficiario ? 1 : 0,
                                        requiere_documentos: requiere_documentos ? 1 : 0,
                                        requiere_concepto: 1,
                                        mostrar_pago_quincenas: mostrar_pago_quincenas ? 1 : 0,
                                        requiere_aprobacion_revisor: requiereAprobacionRevisor ? 1 : 0,
                                        muestra_notificar_nomina:muestra_notificar_nomina ? 1 : 0,
                                        dias_notifica_pago:dias_notifica_pago === '' ? '0' : dias_notifica_pago 
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

export default AddTipoSolicitud
