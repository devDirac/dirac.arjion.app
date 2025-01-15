import { Grid } from '@mui/material';
import React, { useState } from 'react'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useMaterialUIController } from 'context';
import { FormikProvider, useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../InputField';
import DragAndDropField from '../DragAndDropField';

import * as Yup from "yup";
import { useIntl } from 'react-intl';
import _ from 'lodash';
import { AddComentarioDocmentoCalidadFormProps } from './types';


const AddComentarioDocmentoCalidadForm: React.FC<AddComentarioDocmentoCalidadFormProps> = (props: AddComentarioDocmentoCalidadFormProps) => {
    const [descripcion, setDescripcion] = useState<string>('');
    const intl = useIntl();
    const formik = useFormik({
        initialValues: {
            descripcion: ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            descripcion: Yup.string()
                .min(
                    4,
                    intl.formatMessage({ id: 'input_validation_min_4' })
                )
                .max(
                    500,
                    intl.formatMessage({ id: 'input_validation_max_500' })
                ).required(intl.formatMessage({ id: 'input_validation_requerido' }))
        }),
    });



    const [controller] = useMaterialUIController();
    const {
        darkMode
    } = controller;
    return (
        <Grid container >
            <Grid item xs={12} className='bordersContainers' style={darkMode ? { backgroundColor: '#1f283e', padding: '20px' } : { backgroundColor: '#fff', padding: '20px' }}>
                <h3>{props?.title ? props?.title : 'No aplica documento'}</h3>
            </Grid>
            <Grid item xs={12} className='bordersContainers' style={darkMode ? { backgroundColor: '#1f283e', padding: '20px' } : { backgroundColor: '#fff', padding: '20px' }}>
                <FormikProvider value={formik}>
                    <Form.Group className="mb-3 " >
                        <InputField
                            required
                            value={descripcion}
                            name="descripcion"
                            onInput={(e: any) => {
                                const target = e.target as HTMLTextAreaElement;
                                formik.setFieldValue("descripcion", target?.value);
                                setDescripcion(target?.value);
                            }}
                            label={intl.formatMessage({ id: 'input_comentarios' })}
                            placeholder={intl.formatMessage({ id: 'input_comentarios_descripcion' })}
                            type="textArea"
                            id="descripcion"
                            formik={formik?.getFieldMeta('descripcion')}
                        />
                        <br />

                        <Button
                            variant="primary"
                            disabled={props?.procesando || !formik.dirty || !formik.isValid}
                            onClick={() => {
                                props?.enAccion({ descripcion });
                            }}
                        >
                            {intl.formatMessage({ id: 'general_guardar' })}
                        </Button>
                    </Form.Group>
                </FormikProvider>

            </Grid>


        </Grid>
    )
}

export default AddComentarioDocmentoCalidadForm
