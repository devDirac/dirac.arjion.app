import { Grid } from '@mui/material';
import React, { useState } from 'react'
import { useMaterialUIController } from 'context';
import { FormikProvider, useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../InputField';
import DragAndDropField from '../DragAndDropField';
import { AddDocumentoConceptoFormProps } from './types';
import * as Yup from "yup";
import { useIntl } from 'react-intl';
import _ from 'lodash';



const AddDocumentoConceptoForm: React.FC<AddDocumentoConceptoFormProps> = (props: AddDocumentoConceptoFormProps) => {
    const [nombre, setNombre] = useState<string>('');
    const [fecha, setFecha] = useState<string>('');
    const [descripcion, setDescripcion] = useState<string>('');
    const [file, setFile] = useState<File[]>();
    const intl = useIntl();
    const formik = useFormik({
        initialValues: {
            descripcion: "",
            fecha: "",
            nombre: ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            nombre: Yup.string().min(
                4,
                intl.formatMessage({ id: 'input_validation_min_4' })
            )
                .max(
                    150,
                    intl.formatMessage({ id: 'input_validation_max_150' })
                ).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            fecha: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
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



            <Grid item xs={12} className='bordersContainers' style={darkMode ? { backgroundColor: '#1f283e', padding: '20px', minHeight: '600px', } : { backgroundColor: '#fff', padding: '20px', minHeight: '600px' }}>
                <FormikProvider value={formik}>
                    <Form.Group className="mb-3 " >
                    <InputField
                            required
                            value={nombre}
                            name="nombre"
                            onInput={(e: any) => {
                                const target = e.target as HTMLTextAreaElement;
                                formik.setFieldValue("nombre", target?.value);
                                setNombre(target?.value);
                            }}
                            label={intl.formatMessage({ id: 'input_nombre' })}
                            type="text"
                            id="nombre"
                            formik={formik?.getFieldMeta('nombre')}
                        />
                        <br />
                        <InputField
                            required
                            value={fecha}
                            name="fecha"
                            onInput={(e: any) => {
                                const target = e.target as HTMLTextAreaElement;
                                formik.setFieldValue("fecha", target?.value);
                                setFecha(target?.value);
                            }}
                            label={intl.formatMessage({ id: 'input_fecha' })}
                            type="date"
                            id="fecha"
                            formik={formik?.getFieldMeta('fecha')}
                        />
                        <br />
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
                                props?.enAccion({ descripcion, file, nombre, fecha });
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

export default AddDocumentoConceptoForm
