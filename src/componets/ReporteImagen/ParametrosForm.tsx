import { Grid } from '@mui/material';
import { FormikProvider } from 'formik';
import React from 'react'
import { Form } from 'react-bootstrap';

import { FormikTouched, setNestedObjectValues, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import * as Yup from "yup";
import _ from "lodash";
import { useSelector } from "react-redux";
import { StoreType } from "../../types/geericTypes";
import SelectField from '../SelectField/index';
import { ParametrosFormProps } from './types';



const ParametrosForm:React.FC<ParametrosFormProps> = (props:ParametrosFormProps) => {

    const intl = useIntl();

  const [parametro, setParametro] = useState<string>('');
  

  const formik = useFormik({
    initialValues: {
      parametro: ""
    },
    onSubmit: async (values) => { },
    validationSchema: Yup.object({
      parametro: Yup.string()
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
                            }
                            : { backgroundColor: "#fff" }
                    }
                >
                    <FormikProvider value={formik}>
                        <Form.Group className="mb-3 ">
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'input_parametro' })}
                                        value={parametro}
                                        options={(props?.parametros || []).map((r:any)=>{
                                            return {
                                                value:r?.id,
                                                label:r?.nombre
                                            }
                                        })}
                                        name="contrato"
                                        id="contrato"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("contrato", target?.value || '');
                                            setParametro(target?.value);
                                            props?.enAccion(target?.value) 
                                        }}
                                        formik={formik?.getFieldMeta('contrato')}
                                    />
                                    <br />
                                </Grid>                                
                            </Grid>
                        </Form.Group>
                    </FormikProvider>

                </Grid>
            </Grid>
        </Grid>
    )
}

export default ParametrosForm
