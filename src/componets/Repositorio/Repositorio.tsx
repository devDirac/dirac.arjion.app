import React from 'react'
import { Grid } from '@mui/material'
import './index.scss'
import InventoryIcon from '@mui/icons-material/Inventory';
import DinamicTable from '../DinamicTable';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import type { RepositorioProps } from './types';
import { FormikProvider } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../InputField';
import DragAndDropField from '../DragAndDropField';
import _ from 'lodash';
import useRepositorio from './useRepositorio';

const Repositorio: React.FC<RepositorioProps> = (props: RepositorioProps) => {
    
    const {
        darkMode,
        formik,
        nombre,
        setNombre,
        descripcion,
        setDescripcion,
        saveImages,
        file,
        intl
    } = useRepositorio(props)

    return (
        <Grid container spacing={2}>
            <Grid item xs={6} >
                <Grid item xs={12} className='bordersContainers' style={darkMode ? { backgroundColor: '#1f283e', padding: '10px', minHeight: '600px' } : { backgroundColor: '#fff', padding: '10px', minHeight: '600px' }}>
                    <h5 className='colorOrange'><InventoryIcon color='primary' /> Lista de documentos</h5>
                    {!_.isEmpty(props?.data || []) ? <DinamicTable
                        key={'Carpetas'}
                        data={props?.data}
                        titulo={''}
                        opcionesRepo
                        enAccion={props?.accion}
                    /> : <p>Sin documentos</p>}

                </Grid>
            </Grid>

            <Grid item xs={6} >
                <Grid item xs={12} className='bordersContainers' style={darkMode ? { backgroundColor: '#1f283e', padding: '10px', minHeight: '600px' } : { backgroundColor: '#fff', padding: '10px', minHeight: '600px' }}>

                    <h5 className='colorOrange'><UploadFileIcon color='primary' /> Carga documentos</h5>
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
                                placeholder={intl.formatMessage({ id: 'input_nombre_descripcion' })}
                                type="text"
                                id="nombre"
                                formik={formik?.getFieldMeta('nombre')}
                            />
                            <InputField
                                required
                                value={descripcion}
                                name="descripcion"
                                onInput={(e: any) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    formik.setFieldValue("descripcion", target?.value);
                                    setDescripcion(target?.value);
                                }}
                                label={intl.formatMessage({ id: 'input_descripcion' })}
                                placeholder={intl.formatMessage({ id: 'input_descripcion_descripcion' })}
                                type="text"
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
                                    props?.enAccion({ nombre, descripcion, file });
                                }}
                            >
                                {intl.formatMessage({ id: 'general_guardar' })}
                            </Button>
                        </Form.Group>
                    </FormikProvider>

                </Grid>

            </Grid>

        </Grid>
    )
}

export default Repositorio
