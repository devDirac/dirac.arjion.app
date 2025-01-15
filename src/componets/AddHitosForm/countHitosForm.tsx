import React, { useState } from 'react'
import * as Yup from "yup";
import _ from 'lodash';
import { Grid } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../../componets/InputField';
import SelectField from '../../componets/SelectField';
import { useIntl } from 'react-intl';

export interface countHitosFormProps {
    procesando: boolean
    onAccion: (data: any) => void
    darkMode: boolean
    titulo?:string
}

const CountHitosForm: React.FC<countHitosFormProps> = (props: countHitosFormProps) => {
    const [numero, setNumero] = useState<string>('1');
    const intl = useIntl();

    const formik = useFormik({
        initialValues: {
            "numero": ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            numero: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).matches(/^[0-9]+$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
        }),
    });

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
                                    <h5>{props?.titulo} </h5>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={numero || ""}
                                        name="numero"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("numero", target?.value || "");
                                            setNumero(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_numero" })}
                                        placeholder={intl.formatMessage({
                                            id: "input_numero_descripcion",
                                        })}
                                        type="text"
                                        id="numero"
                                        formik={formik?.getFieldMeta("numero")}
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
                                                numero
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

export default CountHitosForm
