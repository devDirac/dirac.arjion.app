import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import _ from 'lodash';
import { Grid } from '@mui/material';
import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../../componets/InputField';
import SelectField from '../../componets/SelectField';
import { useIntl } from 'react-intl';

export interface AddProgramaClasificacionFormProps {
    procesando: boolean
    onAccion: (data: any) => void
    darkMode: boolean
    clasificaciones:any[]
    item?: any
}

const AddProgramaClasificacionForm: React.FC<AddProgramaClasificacionFormProps> = (props: AddProgramaClasificacionFormProps) => {

    const intl = useIntl();
    const [clasificacion, setClasificacion] = useState<string>("");
    const [fecha, setFecha] = useState<string>("");
    const [importe, setImporte] = useState<string>("");
   
    const formik = useFormik({
        initialValues: {
            clasificacion: "",
            fecha:"",
            importe:"",
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            clasificacion: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            fecha: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            importe: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
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
            setClasificacion(props?.item?.tipo ? props?.item?.tipo + "" : "");
            formik.setFieldTouched('clasificacion', true)
        }
        if (props?.item && props?.item?.fecha) {
            formik.setFieldValue("fecha", props?.item?.fecha ? props?.item?.fecha + "" : "");
            setFecha(props?.item?.fecha ? props?.item?.fecha + "" : "");
            formik.setFieldTouched('fecha', true)
        }
        if (props?.item && props?.item?.importe) {
            formik.setFieldValue("importe", props?.item?.importe ? props?.item?.importe + "" : "");
            setImporte(props?.item?.importe ? props?.item?.importe + "" : "");
            formik.setFieldTouched('importe', true)
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
                                    <h5>Realizar programa</h5>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'input_clasificacion' })}
                                        value={clasificacion}
                                        options={props?.clasificaciones.map((r:any)=> {
                                            return {
                                                label:r?.nombre,
                                                value:r?.id+''
                                            }
                                        
                                        })}
                                        name="clasificacion"
                                        id="clasificacion"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("clasificacion", target?.value || '');
                                            setClasificacion(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta('clasificacion')}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputField
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
                                    <Button
                                        variant="primary"
                                        disabled={
                                            props?.procesando || !formik.dirty || !formik.isValid
                                        }
                                        onClick={(e: any) => {
                                            props?.onAccion({
                                                clasificacion,
                                                fecha,
                                                importe
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

export default AddProgramaClasificacionForm
