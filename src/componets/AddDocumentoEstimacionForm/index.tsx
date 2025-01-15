import { Grid } from '@mui/material';
import React, { useState } from 'react'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useMaterialUIController } from 'context';
import { FormikProvider, useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../InputField';
import DragAndDropField from '../DragAndDropField';
import { AddDocumentoEstimacionFormProps } from './types';
import * as Yup from "yup";
import { useIntl } from 'react-intl';
import _ from 'lodash';



const AddDocumentoEstimacionForm:React.FC<AddDocumentoEstimacionFormProps> = (props:AddDocumentoEstimacionFormProps) => {
    const [descripcion, setDescripcion] = useState<string>('');
    const [file, setFile] = useState<File[]>();
    const intl = useIntl();
    const formik = useFormik({
        initialValues: {
            descripcion: ""
        },
        onSubmit: async (values) => {},
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

    const saveImages = async (file_: any) => {
        setFile(file_?.[0]);
    };

    const [controller] = useMaterialUIController();
    const {
      darkMode
    } = controller;
    
    return (
        <Grid container >

                
            
                <Grid item xs={12} className='bordersContainers' style={darkMode ? { backgroundColor: '#1f283e', padding: '20px', minHeight: '600px',  } : { backgroundColor: '#fff', padding: '20px', minHeight: '600px' }}>
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
                            <DragAndDropField multiple={false} muestraBoton={false} onAction={(files) => saveImages(files)} />
                            <br />
                            <Button
                                variant="primary"
                                disabled={props?.procesando || !formik.dirty || !formik.isValid || _.isEmpty(file)}
                                onClick={() => {
                                    props?.enAccion({descripcion, file });
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

export default AddDocumentoEstimacionForm
