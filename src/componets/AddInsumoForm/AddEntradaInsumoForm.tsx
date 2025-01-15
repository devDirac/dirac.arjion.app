import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import _ from 'lodash';
import { Grid } from '@mui/material';
import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../../componets/InputField';
import SelectField from '../../componets/SelectField';
import { useIntl } from 'react-intl';
import { AddEntradaInsumoFormProps } from './types';
import "./style.scss";
import DragAndDropField from '../../componets/DragAndDropField';

const AddEntradaInsumoForm: React.FC<AddEntradaInsumoFormProps> = (props: AddEntradaInsumoFormProps) => {

    const intl = useIntl();
    const [fecha, setFecha] = useState<string>('');
    const [cantidad, setCantidad] = useState<string>('');
    const [precio, setPrecio] = useState<string>('');
    const [origen, setOrigen] = useState<string>('');
    const [file, setFile] = useState<File[]>();

    const formik = useFormik({
        initialValues: {
            "fecha": "",
            "cantidad": "",
            "precio": "",
            "origen": ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            fecha: Yup.string()
            .required(intl.formatMessage({ id: "input_validation_requerido" })),
            cantidad: Yup.string()
            .max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' }))
            .matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' }))
            .required(intl.formatMessage({ id: 'input_validation_requerido' })),
            precio: Yup.string()
            .max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' }))
            .matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' }))
            .required(intl.formatMessage({ id: 'input_validation_requerido' })),
            origen: Yup.string().required(intl.formatMessage({ id: "input_validation_requerido" })),
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
        if (props?.item && props?.item?.cantidad) {
            formik.setFieldValue("cantidad", props?.item?.cantidad ? props?.item?.cantidad + "" : "");
            setCantidad(props?.item?.cantidad ? props?.item?.cantidad + "" : "");
            formik.setFieldTouched('cantidad', true)
        }
        if (props?.item && props?.item?.precio) {
            formik.setFieldValue("precio", props?.item?.precio ? props?.item?.precio + "" : "");
            setPrecio(props?.item?.precio ? props?.item?.precio + "" : "");
            formik.setFieldTouched('precio', true)
        }
        if (props?.item && props?.item?.origen) {
            formik.setFieldValue("origen", props?.item?.origen ? props?.item?.origen + "" : "");
            setOrigen(props?.item?.origen ? props?.item?.origen + "" : "");
            formik.setFieldTouched('origen', true)
        }
        if (!_.isEmpty(props?.item)) {
            validate();
        }
    }, [props?.item]);

    const saveImages = async (file_: any) => {
        setFile(file_?.[0]);
    };


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
                                        value={fecha || ""}
                                        name="fecha"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("fecha", target?.value || "");
                                            setFecha(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_fecha" })}
                                        placeholder={intl.formatMessage({ id: "input_fecha_descripcion" })}
                                        type="date"
                                        id="fecha"
                                        formik={formik?.getFieldMeta("fecha")}
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
                                    <SelectField
                                        label={intl.formatMessage({
                                            id: "input_origen",
                                        })}
                                        value={origen}
                                        options={(props?.origenes||[]).map((s:any)=>{

                                            return { label: s?.nombre, value: s?.id+'' }
                                        })}
                                        btnPlus
                                        onAdd={()=>props.addOrigen()}
                                        name="origen"
                                        id="origen"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("origen", target?.value || "");
                                            setOrigen(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta("origen")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <DragAndDropField multiple={false} muestraBoton={false} onAction={(files:any) => saveImages(files)} />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Button
                                        variant="primary"
                                        disabled={
                                            props?.procesando || !formik.dirty || !formik.isValid || _.isEmpty(file)
                                        }
                                        onClick={(e: any) => {
                                            props?.onAccion(
                                                {
                                                   fecha,
                                                   cantidad,
                                                   precio,
                                                   origen,
                                                   file
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

export default AddEntradaInsumoForm;