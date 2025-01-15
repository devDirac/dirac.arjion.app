import React from 'react'
import type { ShareCarpetaCompartidaProps } from './type'
import { Grid } from '@mui/material';
import { FormikProvider } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../InputField';
import { useMaterialUIController } from "context";
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useIntl } from 'react-intl';
import "./style.scss";
import SelectField from '../SelectField/index';



const ShareCarpetaCompartida: React.FC<ShareCarpetaCompartidaProps> = (props: ShareCarpetaCompartidaProps) => {

    const intl = useIntl();
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [usuario, setUsuario] = useState('');
    const [carpeta, setCarpeta] = useState('');

    const formik = useFormik({
        initialValues: {
            usuario: "",
            carpeta: ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            usuario: Yup.string().required(intl.formatMessage({ id: "input_validation_requerido" })),
            carpeta: Yup.string().required(intl.formatMessage({ id: "input_validation_requerido" })),
        }),
    });


    return (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <Grid item xs={12} className='bordersContainers' style={darkMode ? { backgroundColor: '#1f283e', padding: '10px' } : { backgroundColor: '#fff', padding: '10px' }}>
                    <FormikProvider value={formik}>
                        <Form.Group className="mb-3 " >
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                    <SelectField
                                        label={intl.formatMessage({
                                            id: "input_usuario",
                                        })}
                                        value={usuario}
                                        options={(props?.usuarios || []).map((e: any) => {
                                            return {
                                                label: (e?.nombre || "") + ' - ' + (e?.email || ""),
                                                value: e?.id,
                                            };
                                        })}
                                        name="usuario"
                                        id="usuario"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("usuario", target?.value || "");
                                            setUsuario(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta("usuario")}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <SelectField
                                        label={intl.formatMessage({
                                            id: "input_carpeta",
                                        })}
                                        value={carpeta}
                                        options={(props?.carpetas || []).map((e: any) => {
                                            return {
                                                label: (e?.path || "").replaceAll('storage/app/documentos/41/elFinder/files/',''),
                                                value: e?.id,
                                            };
                                        })}
                                        name="carpeta"
                                        id="carpeta"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("carpeta", target?.value || "");
                                            setCarpeta(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta("carpeta")}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Button
                                        variant="primary"
                                        disabled={props?.procesando || !formik.dirty || !formik.isValid}
                                        onClick={(e: any) => {
                                            props?.enAccion({
                                                usuario,
                                                carpeta
                                            });
                                        }}
                                    >
                                        {intl.formatMessage({ id: 'general_guardar' })}
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

export default ShareCarpetaCompartida
