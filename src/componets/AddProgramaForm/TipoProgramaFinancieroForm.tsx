import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import _ from 'lodash';
import { Grid } from '@mui/material';
import { FormikProvider, FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../../componets/InputField';
import SelectField from '../../componets/SelectField';
import { useIntl } from 'react-intl';

export interface TipoProgramaFinancieroFormProps {
    procesando: boolean
    onAccion: (data: any) => void
    darkMode: boolean
    frentes:any[]
    item?: any
}

const TipoProgramaFinancieroForm: React.FC<TipoProgramaFinancieroFormProps> = (props: TipoProgramaFinancieroFormProps) => {

    const intl = useIntl();
    const [tipo, setTipo] = useState<string>("");
    const [frente, setFrente] = useState<string>("");
   
    const formik = useFormik({
        initialValues: {
            tipo: "",
            frente:""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            tipo: Yup.string()
                .required(intl.formatMessage({ id: 'input_validation_requerido' })),
            frente: Yup.string()
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
                                    <h5>Selecciona tipo de programa</h5>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <SelectField
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
                                    <Button
                                        variant="primary"
                                        disabled={
                                            props?.procesando || !formik.dirty || !formik.isValid
                                        }
                                        onClick={(e: any) => {
                                            props?.onAccion({
                                                tipo,
                                                frente
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

export default TipoProgramaFinancieroForm
