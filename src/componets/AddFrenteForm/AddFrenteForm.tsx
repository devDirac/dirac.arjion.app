import React from "react";
import { Button, Form } from "react-bootstrap";
import type { AddFrenteFormProps } from "./types";
import "./style.scss";
import ModalComponent from "../Modal";
import { Grid } from "@mui/material";
import {
  FormikProvider
} from "formik";
import _ from "lodash";
import InputField from "../../componets/InputField";
import SelectField from "../../componets/SelectField";
import CatalogoEspecialidades from "../../componets/CatalogosForms/CatalogoEspecialidades";
import FrentesHereditary from "../../componets/FrentesHereditary/FrentesHereditary";
import useAddFrenteForm from "./useAddFrenteForm";

const AddFrenteForm: React.FC<AddFrenteFormProps> = (
  props: AddFrenteFormProps
) => {

  const {
    formik,
    frente,
    setFrente,
    intl,
    descripcion,
    setDescripcion,
    fecha_inicio,
    setFecha_inicio,
    fecha_final,
    setFecha_final,
    id_clasificacion,
    clasificaciones,
    setId_clasificacion,
    setCatalogoSeleccionado,
    setTipoCatalogo,
    handleOpen,
    id_especialidad,
    catalogoEspecialidades,
    setId_especialidad,
    id_frente,
    setId_frente,
    handleOpenHistorial,
    handleCloseHistorial,
    isOpenHistorial,
    handleClose,
    isOpen,
    catalogoSeleccionado,
    espacio,
    tipoCatalogo,
    guardaCatalogoEspecialidades,
    handleisAlerClose,
    isAlertOpen,
    mensajeAlert
  } = useAddFrenteForm(props)
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
                    value={frente || ""}
                    name="frente"
                    onInput={(e: any) => {
                      const target = e.target as HTMLTextAreaElement;
                      formik.setFieldValue("frente", target?.value || "");
                      setFrente(target?.value);
                    }}
                    label={intl.formatMessage({ id: "input_frente" })}
                    placeholder={intl.formatMessage({
                      id: "input_frente_descripcion",
                    })}
                    type="text"
                    id="frente"
                    formik={formik?.getFieldMeta("frente")}
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
                <Grid item xs={12} md={6}>
                  <InputField
                    required
                    value={fecha_inicio || ""}
                    name="fecha_inicio"
                    onInput={(e: any) => {
                      const target = e.target as HTMLTextAreaElement;
                      formik.setFieldValue("fecha_inicio", target?.value || "");
                      setFecha_inicio(target?.value);
                    }}
                    label={intl.formatMessage({ id: "input_fecha_inicio" })}
                    type="date"
                    id="fecha_inicio"
                    formik={formik?.getFieldMeta("fecha_inicio")}
                  />
                  <br />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputField
                    required
                    value={fecha_final || ""}
                    name="fecha_final"
                    onInput={(e: any) => {
                      const target = e.target as HTMLTextAreaElement;
                      formik.setFieldValue("fecha_final", target?.value || "");
                      setFecha_final(target?.value);
                    }}
                    label={intl.formatMessage({ id: "input_fecha_final" })}
                    type="date"
                    id="fecha_final"
                    formik={formik?.getFieldMeta("fecha_final")}
                  />
                  <br />
                </Grid>
                <Grid item xs={12} md={12}>
                  <SelectField
                    label={intl.formatMessage({
                      id: "input_clasificacion_frente",
                    })}
                    value={id_clasificacion}
                    options={clasificaciones.map((e: any) => {
                      return {
                        label: e?.nombre || "",
                        value: e?.id,
                      };
                    })}
                    name="id_clasificacion"
                    id="id_clasificacion"
                    required
                    onInput={(e: any) => {
                      const target = e.target as HTMLTextAreaElement;
                      formik.setFieldValue(
                        "id_clasificacion",
                        target?.value || ""
                      );
                      setId_clasificacion(target?.value);
                    }}
                    formik={formik?.getFieldMeta("id_clasificacion")}
                  />
                  <br />
                </Grid>
                <Grid item xs={12} md={12}>
                  <SelectField
                    btnPlus
                    onAdd={() => {
                      setCatalogoSeleccionado("apm_cat_especialidades");
                      setTipoCatalogo("apm_cat_especialidades");
                      handleOpen();
                    }}
                    label={intl.formatMessage({ id: "input_especialidad" })}
                    value={id_especialidad}
                    options={catalogoEspecialidades.map((e: any) => {
                      return {
                        label: e?.nombre,
                        value: e?.id,
                      };
                    })}
                    name="id_especialidad"
                    id="id_especialidad"
                    required
                    onInput={(e: any) => {
                      const target = e.target as HTMLTextAreaElement;
                      formik.setFieldValue(
                        "id_especialidad",
                        target?.value || ""
                      );
                      setId_especialidad(target?.value);
                    }}
                    formik={formik?.getFieldMeta("id_especialidad")}
                  />
                  <br />
                </Grid>
                <Grid item xs={12} md={12}>
                  <SelectField
                    label={"ID " + intl.formatMessage({ id: "input_frente" })}
                    value={id_frente}
                    options={(props?.frentes || []).map((a) => {
                      return {
                        label: a?.frente,
                        value: a?.id,
                      };
                    })}
                    name="id_frente"
                    id="id_frente"
                    required
                    onInput={(e: any) => {
                      const target = e.target as HTMLTextAreaElement;
                      formik.setFieldValue("id_frente", target?.value || "");
                      setId_frente(target?.value || '');
                      target?.value && handleOpenHistorial();
                    }}
                    formik={formik?.getFieldMeta("id_frente")}
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
                          frente,
                          descripcion,
                          fecha_inicio,
                          fecha_final,
                          id_clasificacion: id_clasificacion
                            ? id_clasificacion
                            : "0",
                          id_especialidad: id_especialidad
                            ? id_especialidad
                            : "0",
                          id_frente: id_frente ? id_frente : "0",
                        },
                        ...(props?.item?.id ? { id: props?.item?.id } : {}),
                      });
                    }}
                  >
                    {_.isEmpty(props?.item)
                      ? intl.formatMessage({ id: "general_guardar" })
                      : intl.formatMessage({ id: "general_actualizar" })}
                  </Button>
                </Grid>
              </Grid>
            </Form.Group>
          </FormikProvider>
        </Grid>
        <ModalComponent
          handleClose={handleCloseHistorial}
          isOpen={isOpenHistorial}
        >
          <FrentesHereditary frentes={props?.frentes} frente={id_frente} />
        </ModalComponent>
        <ModalComponent handleClose={handleClose} isOpen={isOpen}>
          {catalogoSeleccionado === "apm_cat_especialidades" ? (
            <CatalogoEspecialidades
              idObra={espacio?.id}
              key={"actualizaItem_4"}
              catalogo={tipoCatalogo}
              titulo={""}
              action={guardaCatalogoEspecialidades}
              procesando={props?.procesando}
            />
          ) : null}
        </ModalComponent>
        <ModalComponent
          handleClose={handleisAlerClose}
          isOpen={isAlertOpen}
          key={"alerta"}
        >
          <Grid container spacing={2} style={{ textAlign: "center" }}>
            <Grid item xs={12}>
              <br />
              <br />
              <p>{mensajeAlert}</p>
            </Grid>
          </Grid>
        </ModalComponent>
      </Grid>
    </Grid>
  );
};

export default AddFrenteForm;
