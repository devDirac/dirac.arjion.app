import React from 'react'
import type { AddDeductivaFormProps } from './types'
import useAddDeductivaForm from './useAddDeductivaForm';
import './style.scss';
import { Grid } from '@mui/material';
import { FormikProvider } from 'formik';
import { Button, Form } from 'react-bootstrap';
import _ from 'lodash';
import InputField from '../../componets/InputField';
import SelectField from '../../componets/SelectField';

const AddDeductivaForm: React.FC<AddDeductivaFormProps> = (props: AddDeductivaFormProps) => {

    const {
        intl,
        formik,
        folio,
        setFolio,
        contratista,
        contratistas,
        setContratista,
        contrato,
        setContrato,
        concepto,
        setConcepto,
        descripcion,
        setDescripcion,
        monto,
        setMonto
    } = useAddDeductivaForm(props);

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
                                <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
                                    <h5>
                                        Carga de deductivas
                                    </h5>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <label htmlFor=''>
                                        Folio anterior: {props?.folioAnterior || ''}
                                    </label>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={folio || ""}
                                        name="folio"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("folio", target?.value || "");
                                            setFolio(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_folio" })}
                                        placeholder={intl.formatMessage({ id: "input_folio_descripcion" })}
                                        type="text"
                                        id="folio"
                                        formik={formik?.getFieldMeta("folio")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'input_contratista' })}
                                        value={contratista}
                                        options={contratistas.map((a: any) => {
                                            return {
                                                value: a?.id,
                                                label: a?.contratista
                                            }
                                        })}
                                        name="contratista"
                                        id="contratista"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("contratista", target?.value || '');
                                            setContratista(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta('contratista')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <SelectField
                                        label={intl.formatMessage({ id: 'input_contrato' })}
                                        value={contrato}
                                        options={[{
                                            value: props?.contrato?.id,
                                            label: props?.contrato?.contrato
                                        }]}
                                        name="contrato"
                                        id="contrato"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("contrato", target?.value || '');
                                            setContrato(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta('contrato')}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={concepto || ""}
                                        name="concepto"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("concepto", target?.value || "");
                                            setConcepto(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_concepto_titulo" })}
                                        placeholder={intl.formatMessage({ id: "input_descripcion_concepto_titulo" })}
                                        type="text"
                                        id="concepto"
                                        formik={formik?.getFieldMeta("concepto")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={descripcion || ""}
                                        name="descripcion"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("descripcion", target?.value || "");
                                            setDescripcion(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_descripcion" })}
                                        placeholder={intl.formatMessage({
                                            id: "input_descripcion_descripcion",
                                        })}
                                        type="textArea"
                                        id="descripcion"
                                        formik={formik?.getFieldMeta("descripcion")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={monto || ""}
                                        name="monto"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("monto", target?.value || "");
                                            setMonto(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_monto" })}
                                        placeholder={intl.formatMessage({ id: "input_monto_descripcion" })}
                                        type="text"
                                        id="monto"
                                        formik={formik?.getFieldMeta("monto")}
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
                                                ...{
                                                    folio,
                                                    id_contratista:contratista,
                                                    id_contrato:contrato,
                                                    concepto,
                                                    descripcion,
                                                    monto
                                                }, ...props?.item?.id ? { id: props?.item?.id } : {}
                                            });
                                        }}
                                    >
                                        {_.isEmpty(props?.item)
                                            ? intl.formatMessage({ id: "general_agregar" })
                                            : intl.formatMessage({ id: "general_actualizar" })}
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

export default AddDeductivaForm
