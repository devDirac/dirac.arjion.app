import React from 'react'
import { Grid } from '@mui/material';
import { FormikProvider } from 'formik';
import { Form } from 'react-bootstrap';
import SelectField from '../SelectField';
import type { SeleccionProyectoProps } from './types';
import { useSeleccionProyecto } from './useSeleccionProyecto';
import './style.scss';

const SeleccionProyecto: React.FC<SeleccionProyectoProps> = (props: SeleccionProyectoProps) => {
   
    const {
        formik,
        obra,
        obras,
        setObra,
        espacio,
        intl,
        superAdministrador
    } = useSeleccionProyecto(props);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <Grid item xs={12} className='bordersContainers' style={props?.darkMode ? { backgroundColor: '#1f283e', padding: '10px' } : { backgroundColor: '#fff', padding: '10px' }}>
                    <FormikProvider value={formik}>
                        <Form.Group className="mb-3 ">
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'gestion_contratos_proyecto_titulo' })}
                                        value={obra}
                                        options={superAdministrador ? obras.map((e: any) => {
                                            return {
                                                label: e?.obra,
                                                value: e?.id
                                            }
                                        }) : [{
                                            label: espacio?.obra,
                                            value: espacio?.id
                                        }]}
                                        name="obra"
                                        id="obra"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("obra", target?.value || '');
                                            setObra(target?.value);
                                            props?.enAccion({
                                                obra: target?.value
                                            });
                                        }}
                                        formik={formik?.getFieldMeta('obra')}
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

export default SeleccionProyecto
