import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import _ from 'lodash';
import { Grid } from '@mui/material';
import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../../componets/InputField';
import SelectField from '../../componets/SelectField';
import { useIntl } from 'react-intl';

export interface AddProgramaFormProps {
    procesando: boolean
    onAccion: (data: any) => void
    darkMode: boolean
    frentes:any[]
    item?: any
    editProgramaAdministracion?:boolean
}

const AddProgramaForm: React.FC<AddProgramaFormProps> = (props: AddProgramaFormProps) => {

    const intl = useIntl();
    const [tipo, setTipo] = useState<string>("");
    const [frente, setFrente] = useState<string>("");
    const [fecha, setFecha] = useState<string>("");
    const [importe, setImporte] = useState<string>("");
   
    const formik = useFormik({
        initialValues: {
            tipo: "",
            frente:"",
            fecha:"",
            importe:"",
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            tipo: Yup.string()
                .required(intl.formatMessage({ id: 'input_validation_requerido' })),
            frente: Yup.string(),
            fecha: Yup.string()
                .required(intl.formatMessage({ id: 'input_validation_requerido' })),
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
        if (props?.item && props?.item?.tipo) {
            formik.setFieldValue("tipo", props?.item?.tipo ? props?.item?.tipo + "" : "");
            setTipo(props?.item?.tipo ? props?.item?.tipo + "" : "");
            formik.setFieldTouched('tipo', true)
        }
        if (props?.item && props?.item?.frente) {
            formik.setFieldValue("frente", props?.item?.frente ? props?.item?.frente + "" : "");
            setFrente(props?.item?.frente ? props?.item?.frente + "" : "");
            formik.setFieldTouched('frente', true)
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
                                    <h5>{props?.editProgramaAdministracion ? 'Editar programa' : 'Realizar programa'}</h5>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <SelectField
                                        disabled={props?.editProgramaAdministracion}
                                        label={intl.formatMessage({ id: 'input_tipo' })}
                                        value={tipo}
                                        options={[
                                            { label: 'Programa financiero por obra', value: "1" },
                                            { label: 'Programa financiero por frente', value: "2" },
                                        ]}
                                        name="tipo"
                                        id="tipo"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("tipo", target?.value || '');
                                            setTipo(target?.value);
                                            if(target?.value === '1'){
                                                setFrente('')
                                                formik.setFieldValue("frente",'');
                                            }
                                        }}
                                        formik={formik?.getFieldMeta('tipo')}
                                    />
                                </Grid>
                                {
                                    tipo === "2" ? <Grid item xs={12} md={12}>
                                        <SelectField
                                            label={intl.formatMessage({ id: 'input_frente' })}
                                            value={frente}
                                            options={(props?.frentes || []).map((a:any)=>{
                                                return {
                                                    label:a?.frente,
                                                    value:a?.id
                                                }
                                            })}
                                            name="frente"
                                            id="frente"
                                            onInput={(e: any) => {
                                                const target = e.target as HTMLTextAreaElement;
                                                formik.setFieldValue("frente", target?.value || '');
                                                setFrente(target?.value);
                                            }}
                                            formik={formik?.getFieldMeta('frente')}
                                        />
                                    </Grid> : null
                                }
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
                                                tipo,
                                                frente,
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

export default AddProgramaForm
