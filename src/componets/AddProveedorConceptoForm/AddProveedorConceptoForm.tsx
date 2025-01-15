import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import type { AddProveedorConceptoFormProps } from "./types";
import "./style.scss";
import * as Yup from "yup";
import ModalComponent from "../Modal";
import { Grid } from "@mui/material";
import {
    FormikProvider,
    FormikTouched,
    setNestedObjectValues,
    useFormik
} from "formik";
import _ from "lodash";
import InputField from "../../componets/InputField";
import { useIntl } from "react-intl";

const AddProveedorConceptoForm: React.FC<AddProveedorConceptoFormProps> = (
    props: AddProveedorConceptoFormProps
) => {
    const intl = useIntl();
    const [nombre, setNombre] = useState<string>('');
    const [direccion, setDireccion] = useState<string>('');
    const [correo, setCorreo] = useState<string>('');
    const [telefono, setTelefono] = useState<string>('');
    const [notas, setNotas] = useState<string>('');

    const formik = useFormik({
        initialValues: {
            nombre: "",
            direccion: "",
            correo: "",
            telefono: "",
            notas: ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .min(1, intl.formatMessage({ id: "input_validation_min_1" }))
                .max(150, intl.formatMessage({ id: "input_validation_max_150" }))
                .required(intl.formatMessage({ id: "input_validation_requerido" })),
            direccion: Yup.string()
                .min(1, intl.formatMessage({ id: "input_validation_min_1" }))
                .max(255, intl.formatMessage({ id: "input_validation_max_255" }))
                .required(intl.formatMessage({ id: "input_validation_requerido" })),
            correo: Yup.string().email(intl.formatMessage({ id: 'input_validation_formato_invalido' })).required(intl.formatMessage({ id: "input_validation_requerido" })),
            telefono: Yup.string().matches(/^[0-9]{7,12}$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            notas: Yup.string()
                .min(1, intl.formatMessage({ id: "input_validation_min_1" }))
                .max(500, intl.formatMessage({ id: "input_validation_max_500" }))
                .required(intl.formatMessage({ id: "input_validation_requerido" })),
        }),
    });

    const validate = async () => {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length === 0) {
        } else {
            formik.setTouched(
                setNestedObjectValues<FormikTouched<any>>(errors, true)
            );
        }
    };

    useEffect(() => {
        if (props?.item && props?.item?.nombre) {
            formik.setFieldValue("nombre", props?.item?.nombre || "");
            setNombre(props?.item?.nombre);
        }

        if (props?.item && props?.item?.direccion) {
            formik.setFieldValue("direccion", props?.item?.direccion || "");
            setDireccion(props?.item?.direccion);
        }

        if (props?.item && props?.item?.correo) {
            formik.setFieldValue("correo", props?.item?.correo || "");
            setCorreo(props?.item?.correo);
        }

        if (props?.item && props?.item?.telefono) {
            formik.setFieldValue("telefono", props?.item?.telefono || "");
            setTelefono(props?.item?.telefono);
        }

        if (props?.item && props?.item?.notas) {
            formik.setFieldValue("notas", props?.item?.notas || "");
            setNotas(props?.item?.notas);
        }

        if (!_.isEmpty(props?.item)) {
            validate();
        }
    }, [props?.item]);


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
                                    <InputField
                                        required
                                        value={nombre || ""}
                                        name="nombre"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("nombre", target?.value || "");
                                            setNombre(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_nombre" })}
                                        placeholder={intl.formatMessage({
                                            id: "input_nombre_descripcion",
                                        })}
                                        type="text"
                                        id="nombre"
                                        formik={formik?.getFieldMeta("nombre")}
                                    />
                                    <br />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={direccion || ""}
                                        name="direccion"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("direccion", target?.value || "");
                                            setDireccion(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_direccion" })}
                                        placeholder={intl.formatMessage({
                                            id: "input_direccion_descripcion",
                                        })}
                                        type="text"
                                        id="direccion"
                                        formik={formik?.getFieldMeta("direccion")}
                                    />
                                    <br />
                                </Grid>

                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={correo || ""}
                                        name="correo"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("correo", target?.value || "");
                                            setCorreo(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_correo_contacto" })}
                                        placeholder={intl.formatMessage({
                                            id: "input_correo_descripcion",
                                        })}
                                        type="text"
                                        id="correo"
                                        formik={formik?.getFieldMeta("correo")}
                                    />
                                    <br />
                                </Grid>

                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={telefono || ""}
                                        name="telefono"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("telefono", target?.value || "");
                                            setTelefono(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_telefono" })}
                                        placeholder={intl.formatMessage({
                                            id: "input_telefono_descripcion",
                                        })}
                                        type="text"
                                        id="telefono"
                                        formik={formik?.getFieldMeta("telefono")}
                                    />
                                    <br />
                                </Grid>

                                <Grid item xs={12} md={12}>
                                    <InputField
                                        required
                                        value={notas || ""}
                                        name="notas"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("notas", target?.value || "");
                                            setNotas(target?.value);
                                        }}
                                        label={intl.formatMessage({ id: "input_nota" })}
                                        placeholder={intl.formatMessage({
                                            id: "input_nota_descripcion",
                                        })}
                                        type="textArea"
                                        id="notas"
                                        formik={formik?.getFieldMeta("notas")}
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
                                            props?.enAccion({
                                                ...{
                                                    nombre,
                                                    direccion,
                                                    correo,
                                                    telefono,
                                                    notas
                                                }, ...props?.item?.id ? { id: props?.item?.id } : {}
                                            });
                                        }}
                                    >
                                        {intl.formatMessage({ id: "general_guardar" })}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form.Group>
                    </FormikProvider>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AddProveedorConceptoForm;
