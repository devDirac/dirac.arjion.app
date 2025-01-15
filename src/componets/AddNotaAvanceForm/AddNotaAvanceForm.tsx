import React from 'react'
import type { AddNotaAvanceFormProps } from './AddNotaAvanceFormTypes'
import _ from 'lodash';
import { Grid } from '@mui/material';
import { FormikProvider} from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../../componets/InputField';
import SelectField from '../../componets/SelectField';
import useAddNotaAvanceForm from './useAddNotaAvanceForm';

const AddNotaAvanceForm: React.FC<AddNotaAvanceFormProps> = (props: AddNotaAvanceFormProps) => {
   
    const {
        formik,
        intl,
        tipo_nota,
        catalogoTipoNota,
        setTipo_nota,
        titulo,
        setTitulo,
        nota,
        setNota
    }  = useAddNotaAvanceForm(props)
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
                                        Nota
                                    </h5>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <SelectField
                                        label={intl.formatMessage({
                                            id: "input_tipo_nota",
                                        })}
                                        value={tipo_nota}
                                        options={catalogoTipoNota.filter((e: any) => e?.nombre === 'Volumen excedente').map((r: any) => {
                                            return {
                                                value: r?.id,
                                                label: r?.nombre || ''
                                            }
                                        })}
                                        name="tipo_nota"
                                        id="tipo_nota"
                                        required
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("tipo_nota", target?.value || "");
                                            setTipo_nota(target?.value);
                                        }}
                                        formik={formik?.getFieldMeta("tipo_nota")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={titulo || ""}
                                        name="titulo"
                                        autoFocus={!_.isEmpty(props?.item)}
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("titulo", target?.value || "");
                                            setTitulo(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_titulo" })}
                                        placeholder={intl.formatMessage({
                                            id: "input_titulo_descripcion",
                                        })}
                                        type="text"
                                        id="titulo"
                                        formik={formik?.getFieldMeta("titulo")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        value={nota || ""}
                                        name="nota"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("nota", target?.value || "");
                                            setNota(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_nota" })}
                                        placeholder={intl.formatMessage({ id: "input_nota_descripcion" })}
                                        type="textArea"
                                        id="nota"
                                        formik={formik?.getFieldMeta("nota")}
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
                                                id_tipo_nota:tipo_nota,
                                                nota,
                                                titulo,
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

export default AddNotaAvanceForm
