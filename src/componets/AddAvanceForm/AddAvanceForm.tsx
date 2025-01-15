import React from 'react'
import type { AddAvanceFormProps } from './types'
import { Grid } from '@mui/material';
import './style.scss';
import { FormikProvider } from 'formik';
import { Button, Form } from 'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';
import InputField from '../../componets/InputField';
import useAddAvanceForm from './useAddAvanceForm';

const AddAvanceForm: React.FC<AddAvanceFormProps> = (props: AddAvanceFormProps) => {
    const {
        formik,
        fecha_ejecucion,
        setFecha_ejecucion,
        intl,
        cantidad,
        setCantidad,
        comentarios,
        setComentarios
    } = useAddAvanceForm(props)
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
                                minHeight: "600px",
                            }
                            : { backgroundColor: "#fff", padding: "10px", minHeight: "600px" }
                    }
                >
                    <FormikProvider value={formik}>
                        <Form.Group className="mb-3 ">
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                    <h5>
                                        Avance diario
                                    </h5>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <p>
                                        Fecha: {moment(new Date()).format('DD-MM-YYYY')}
                                    </p>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={fecha_ejecucion || ""}
                                        name="fecha_ejecucion"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("fecha_ejecucion", target?.value || "");
                                            setFecha_ejecucion(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_fecha_ejecucion" })}
                                        placeholder={intl.formatMessage({ id: "input_fecha_ejecucion_descripcion" })}
                                        type="date"
                                        id="fecha_ejecucion"
                                        formik={formik?.getFieldMeta("fecha_ejecucion")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={cantidad || ""}
                                        name="cantidad"
                                        autoFocus={!_.isEmpty(props?.item)}
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("cantidad", target?.value || "");
                                            setCantidad(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_cantidad" })}
                                        placeholder={intl.formatMessage({
                                            id: "input_descripcion_cantidad",
                                        })}
                                        type="text"
                                        id="cantidad"
                                        formik={formik?.getFieldMeta("cantidad")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        value={comentarios || ""}
                                        name="comentarios"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("comentarios", target?.value || "");
                                            setComentarios(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_comentarios" })}
                                        placeholder={intl.formatMessage({ id: "input_comentarios_descripcion" })}
                                        type="textArea"
                                        id="comentarios"
                                        formik={formik?.getFieldMeta("comentarios")}
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
                                                fecha_ejecucion,
                                                cantidad_visual: cantidad,
                                                comentarios
                                            });
                                        }}
                                    >
                                        {_.isEmpty(props?.item)
                                            ? intl.formatMessage({ id: "general_guardar" })
                                            : intl.formatMessage({ id: "general_confirmar" })}
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

export default AddAvanceForm
