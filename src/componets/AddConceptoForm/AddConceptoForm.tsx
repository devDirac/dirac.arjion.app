import React from 'react'
import type { AddConceptoProps } from './types';
import { Grid } from '@mui/material';
import { FormikProvider } from 'formik';
import { Button, Form } from "react-bootstrap";
import _ from 'lodash';
import InputField from '../../componets/InputField';
import SelectField from '../../componets/SelectField';
import CampoSwitch from '../../componets/CampoSwitch';
import ModalComponent from '../../componets/Modal';
import FrentesHereditary from '../../componets/FrentesHereditary/FrentesHereditary';
import CatalogoEspecialidadesDocumento from '../../componets/CatalogosForms/CatalogoEspecialidadesDocumento';
import SelectMultipleField from '../../componets/SelectMultipleField/SelectMultipleField';
import useAddConceptoForm from './useAddConceptoForm';
import "./style.scss";
import SelectMultipleAutoCompleteField from '../SelectMultipleAutoCompleteField/SelectMultipleAutoCompleteField';

const AddConceptoForm: React.FC<AddConceptoProps> = (props: AddConceptoProps) => {

  const {
    formik,
    inciso,
    setInciso,
    intl,
    id_contrato,
    contrato,
    setId_contrato,
    id_frente,
    setId_frente,
    handleOpenHistorial,
    concepto,
    setConcepto,
    descripcion,
    setDescripcion,
    unidad,
    setUnidad,
    cantidad,
    setCantidad,
    pu,
    setPu,
    fecha_inicio,
    setFecha_inicio,
    fecha_fin,
    setFecha_fin,
    linea_base,
    setLinea_base,
    tipo_concepto,
    catalogoTipoConcepto,
    setTipo_concepto,
    id_subespecialidadM,
    subEspecialidades,
    setCatalogoSeleccionado,
    setTipoCatalogo,
    handleOpen,
    setId_subespecialidadM,
    homologado,
    setHomologado,
    cerrado,
    setCerrado,
    plaza,
    setPlaza,
    tarea,
    setTarea,
    handleCloseHistorial,
    isOpenHistorial,
    handleClose,
    isOpen,
    catalogoSeleccionado,
    tipoCatalogo,
    espacio,
    guardaCatalogoSubEspecialidades,
    procesando,
    handleisAlerClose,
    isAlertOpen,
    mensajeAlert,
    num_convenio, setNum_convenio
  } = useAddConceptoForm(props);

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
                <Grid item xs={12} md={6}>
                  <SelectField
                    label={intl.formatMessage({
                      id: "input_contrato",
                    })}
                    disabled
                    value={id_contrato}
                    options={[{ label: contrato?.contrato, value: contrato?.id }]}
                    name="id_contrato"
                    id="id_contrato"
                    required
                    onInput={(e: any) => {
                      const target = e.target as HTMLTextAreaElement;
                      formik.setFieldValue("id_contrato", target?.value || "");
                      setId_contrato(target?.value);
                    }}
                    formik={formik?.getFieldMeta("id_contrato")}
                  />
                  <br />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SelectField
                    label={intl.formatMessage({
                      id: "input_frente",
                    })}
                    disabled={((props?.frentes || []))?.length === 1}
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
                      setId_frente(target?.value);
                      !props?.esDesdeConceptos && target?.value && handleOpenHistorial();
                    }}
                    formik={formik?.getFieldMeta("id_frente")}
                  />
                  <br />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputField
                    required
                    value={concepto || ""}
                    name="concepto"
                    onInput={(e: any) => {
                      const target = e.target as HTMLTextAreaElement;
                      formik.setFieldValue("concepto", target?.value || "");
                      setConcepto(target?.value);
                    }}
                    label={intl.formatMessage({ id: "input_concepto" })}  
                    placeholder={intl.formatMessage({
                      id: "input_descripcion_concepto",
                    })}
                    type="text"
                    id="concepto"
                    formik={formik?.getFieldMeta("concepto")}
                  />
                  <br />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputField
                    required
                    value={inciso || ""}
                    name="inciso"
                    onInput={(e: any) => {
                      const target = e.target as HTMLTextAreaElement;
                      formik.setFieldValue("inciso", target?.value || "");
                      setInciso(target?.value);
                    }}
                    label={intl.formatMessage({ id: "input_inciso" })}
                    placeholder={intl.formatMessage({
                      id: "input_inciso_descripcion",
                    })}
                    type="text"
                    id="inciso"
                    formik={formik?.getFieldMeta("inciso")}
                  />
                  <br />
                </Grid>


                <Grid item xs={12} md={6}>
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
                    value={num_convenio || ""}
                    name="num_convenio"
                    onInput={(e: any) => {
                      const target = e.target as HTMLTextAreaElement;
                      formik.setFieldValue("num_convenio", target?.value || "");
                      setNum_convenio(target?.value);
                    }}
                    label={intl.formatMessage({ id: "input_num_convenio" })}
                    placeholder={intl.formatMessage({
                      id: "input_num_convenio_descripcion",
                    })}
                    type="text"
                    id="num_convenio"
                    formik={formik?.getFieldMeta("num_convenio")}
                  />
                  <br />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputField
                    required
                    value={unidad || ""}
                    name="unidad"
                    onInput={(e: any) => {
                      const target = e.target as HTMLTextAreaElement;
                      formik.setFieldValue("unidad", target?.value || "");
                      setUnidad(target?.value);
                    }}
                    label={intl.formatMessage({ id: "input_unidad" })}
                    placeholder={intl.formatMessage({
                      id: "input_descripcion_unidad",
                    })}
                    type="text"
                    id="unidad"
                    formik={formik?.getFieldMeta("unidad")}
                  />
                  <br />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputField
                    required
                    value={cantidad || ""}
                    name="cantidad"
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
                <Grid item xs={12} md={6}>
                  <InputField
                    required
                    value={pu || ""}
                    name="pu"
                    onInput={(e: any) => {
                      const target = e.target as HTMLTextAreaElement;
                      formik.setFieldValue("pu", target?.value || "");
                      setPu(target?.value);
                    }}
                    label={intl.formatMessage({ id: "input_pu" })}
                    placeholder={intl.formatMessage({
                      id: "input_descripcion_pu",
                    })}
                    type="text"
                    id="pu"
                    formik={formik?.getFieldMeta("pu")}
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
                    value={fecha_fin || ""}
                    name="fecha_fin"
                    onInput={(e: any) => {
                      const target = e.target as HTMLTextAreaElement;
                      formik.setFieldValue("fecha_fin", target?.value || "");
                      setFecha_fin(target?.value);
                    }}
                    label={intl.formatMessage({ id: "input_fecha_final" })}
                    type="date"
                    id="fecha_fin"
                    formik={formik?.getFieldMeta("fecha_fin")}
                  />
                  <br />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputField
                    required
                    value={linea_base || ""}
                    name="linea_base"
                    onInput={(e: any) => {
                      const target = e.target as HTMLTextAreaElement;
                      formik.setFieldValue("linea_base", target?.value || "");
                      setLinea_base(target?.value);
                    }}
                    label={intl.formatMessage({ id: "input_linea_base" })}
                    type="date"
                    id="linea_base"
                    formik={formik?.getFieldMeta("linea_base")}
                  />
                  <br />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SelectField
                    label={intl.formatMessage({
                      id: "input_tipo_concepto",
                    })}
                    value={tipo_concepto}
                    options={catalogoTipoConcepto.map((e: any) => {
                      return {
                        label: e?.nombre || "",
                        value: e?.id,
                      };
                    })}
                    name="tipo_concepto"
                    id="tipo_concepto"
                    required
                    onInput={(e: any) => {
                      const target = e.target as HTMLTextAreaElement;
                      formik.setFieldValue("tipo_concepto", target?.value || "");
                      setTipo_concepto(target?.value);
                    }}
                    formik={formik?.getFieldMeta("tipo_concepto")}
                  />
                  <br />
                </Grid>
                <Grid item xs={12} md={12}>
                  <SelectMultipleAutoCompleteField
                    label={intl.formatMessage({
                      id: "input_sub_especialidad",
                    })}
                    defaultValue={id_subespecialidadM}
                    options={subEspecialidades.map((e: any) => {
                      return {
                        label: e?.nombre,
                        value: e?.id
                      }
                    })}
                    btnPlus
                    onAdd={() => {
                      setCatalogoSeleccionado("apm_cat_especialidades");
                      setTipoCatalogo("apm_cat_especialidades");
                      handleOpen();
                    }}
                    name="id_subespecialidadM"
                    id="id_subespecialidadM"
                    required
                    onInput={(e: any) => {
                      formik.setFieldValue("id_subespecialidadM", e);
                      setId_subespecialidadM(e);
                    }}
                    formik={formik?.getFieldMeta("id_subespecialidadM")}
                  />
                  <br />
                </Grid>

                <Grid item xs={12} md={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={3} style={{ padding: "12px", textAlign: "center" }}>
                      <CampoSwitch
                        key={"switch3"}
                        label={intl.formatMessage({ id: 'input_homologado' })}
                        value={homologado}
                        onAction={(v: any) => setHomologado(v)}
                      />
                      <br />
                    </Grid>
                    <Grid item xs={12} md={3} style={{ padding: "12px", textAlign: "center" }}>
                      <CampoSwitch
                        key={"switch"}
                        label={intl.formatMessage({ id: 'input_cerrado' })}
                        value={cerrado}
                        onAction={(v: any) => setCerrado(v)}
                      />
                      <br />
                    </Grid>
                    <Grid item xs={12} md={3} style={{ padding: "12px", textAlign: "center" }}>
                      <CampoSwitch
                        key={"switch2"}
                        label={intl.formatMessage({ id: 'input_plaza' })}
                        value={plaza}
                        onAction={(v: any) => setPlaza(v)}
                      />
                      <br />
                    </Grid>
                    <Grid item xs={12} md={3} style={{ padding: "12px", textAlign: "center" }}>
                      <CampoSwitch
                        key={"switch1"}
                        label={intl.formatMessage({ id: 'input_tarea' })}
                        value={tarea}
                        onAction={(v: any) => setTarea(v)}
                      />
                      <br />
                    </Grid>
                  </Grid>
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
                          inciso,
                          id_contrato,
                          id_frente,
                          concepto,
                          descripcion,
                          num_convenio,
                          unidad,
                          cantidad,
                          pu,
                          fecha_inicio,
                          fecha_fin,
                          linea_base,
                          tipo_concepto,
                          homologado: homologado ? 1 : 0,
                          cerrado: cerrado ? 1 : 0,
                          plaza: plaza ? 1 : 0,
                          tarea: tarea ? 1 : 0,
                          id_subespecialidad: id_subespecialidadM.map((r: any) => r?.value),
                        }, ...props?.item ? { id: props?.item?.id } : {}
                      });
                    }}
                  >
                    {_.isEmpty(props?.item)
                      ? intl.formatMessage({ id: "general_guardar" })
                      : props?.esTemporal ? intl.formatMessage({ id: "general_temporal" }) :intl.formatMessage({ id: "general_actualizar" })}
                  </Button>
                </Grid>
              </Grid>
            </Form.Group>
          </FormikProvider>
          <ModalComponent
            handleClose={handleCloseHistorial}
            isOpen={isOpenHistorial}
          >
            <FrentesHereditary frentes={props?.frentes} frente={id_frente} />
          </ModalComponent>
          <ModalComponent handleClose={handleClose} isOpen={isOpen}>
            {catalogoSeleccionado === "apm_cat_especialidades" ? (
              <CatalogoEspecialidadesDocumento
                key={'agregaNuevo'}
                catalogo={tipoCatalogo}
                titulo={''}
                idObra={espacio?.id}
                action={guardaCatalogoSubEspecialidades}
                procesando={procesando} />
            ) : null}
          </ModalComponent>
          <ModalComponent handleClose={handleisAlerClose} isOpen={isAlertOpen} key={'alerta'}>
            <Grid container spacing={2} style={{ textAlign: 'center' }}>
              <Grid item xs={12}>
                <br />
                <br />
                <p>{mensajeAlert}</p>
              </Grid>
            </Grid>
          </ModalComponent>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AddConceptoForm
