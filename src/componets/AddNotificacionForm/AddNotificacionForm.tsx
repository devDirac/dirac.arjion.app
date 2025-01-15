import React from 'react'
import type { AddNotificacionFormProps } from './types';
import { Grid } from '@mui/material';
import { FormikProvider } from 'formik';
import { Button, Form } from "react-bootstrap";
import _ from 'lodash';
import InputField from '../../componets/InputField';
import SelectField from '../../componets/SelectField';
import CampoSwitch from '../../componets/CampoSwitch';
import ModalComponent from '../../componets/Modal';
import useAddNotificacionForm from './useAddNotificacionForm';
import SelectMultipleAutoCompleteField from '../SelectMultipleAutoCompleteField/SelectMultipleAutoCompleteField';
import "./style.scss";

const AddNotificacionForm: React.FC<AddNotificacionFormProps> = (props: AddNotificacionFormProps) => {

  const {
    formik,
    intl,
    tareas,
    tarea_id, setTarea_id,
    reenviar, setReenviar,
    horario, setHorario,
    correo, setCorreo,
    telefono_whats, setTelefono_whats,
    notificacion_en_sistema, setNotificacion_en_sistema
  } = useAddNotificacionForm(props);

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
                  <SelectMultipleAutoCompleteField
                    label={intl.formatMessage({
                      id: "input_tarea_id",
                    })}
                    defaultValue={tarea_id}
                    options={tareas.map((e: any) => {
                      return {
                        label: e?.nombre,
                        value: e?.id
                      }
                    })}
                    name="tarea_id"
                    id="tarea_id"
                    required
                    onInput={(e: any) => {
                      formik.setFieldValue("tarea_id", e);
                      setTarea_id(e);
                      console.log(e)
                      const re = e.filter((r: any) => [10, 11, 12, 13].includes(r?.value))?.length;
                      if (!re) {
                        formik.setFieldValue("reenviar", "1");
                        setReenviar('1');
                        formik.setFieldValue("horario", "1");
                        setHorario('1');
                      }

                    }}
                    formik={formik?.getFieldMeta("tarea_id")}
                  />
                  <br />
                </Grid>
                {tarea_id.filter((r: any) => [9, 10, 11, 12, 13].includes(r?.value))?.length ? <Grid item xs={12} md={6}>
                  <SelectField
                    label={intl.formatMessage({
                      id: "input_reenviar",
                    })}
                    value={reenviar}
                    options={[{ label: 'Lunes', value: 1 }, { label: 'Martes', value: 2 }, { label: 'Miercoles', value: 3 }, { label: 'Jueves', value: 4 }, { label: 'Viernes', value: 5 }, { label: 'Toda la semana', value: 6 } ]}
                    name="reenviar"
                    id="reenviar"
                    required
                    onInput={(e: any) => {
                      const target = e.target as HTMLTextAreaElement;
                      formik.setFieldValue("reenviar", target?.value || "");
                      setReenviar(target?.value);
                    }}
                    formik={formik?.getFieldMeta("reenviar")}
                  />
                  <br />
                </Grid> : null}
                {tarea_id.filter((r: any) => [9, 10, 11, 12, 13].includes(r?.value))?.length ? <Grid item xs={12} md={6}>
                  <SelectField
                    label={intl.formatMessage({
                      id: "input_horario",
                    })}
                    value={horario}
                    options={[
                      { label: '08:00 AM', value: 1 },
                      { label: '09:00 AM', value: 2 },
                      { label: '10:00 AM', value: 3 },
                      { label: '11:00 AM', value: 4 },
                      { label: '12:00 PM', value: 5 },
                      { label: '13:00 PM', value: 6 },
                      { label: '14:00 PM', value: 7 },
                      { label: '15:00 PM', value: 8 },
                      { label: '16:00 PM', value: 9 },
                      { label: '17:00 PM', value: 10 },
                      { label: '18:00 PM', value: 11 },
                      { label: '19:00 PM', value: 12 },
                      { label: '20:00 PM', value: 13 }
                    ]}
                    name="horario"
                    id="horario"
                    required
                    onInput={(e: any) => {
                      const target = e.target as HTMLTextAreaElement;
                      formik.setFieldValue("horario", target?.value || "");
                      setHorario(target?.value);
                    }}
                    formik={formik?.getFieldMeta("horario")}
                  />
                  <br />
                </Grid> : null}
                <Grid item xs={12} md={6}>
                  <InputField
                    required
                    value={correo || ""}
                    name="correo"
                    onInput={(e: any) => {
                      const target = e.target as HTMLTextAreaElement;
                      formik.setFieldValue("correo", target?.value || "");
                      setCorreo(target?.value);
                    }}
                    label={intl.formatMessage({ id: "input_correo" })}
                    placeholder={intl.formatMessage({
                      id: "input_descripcion_correo",
                    })}
                    type="text"
                    id="correo"
                    formik={formik?.getFieldMeta("correo")}
                  />
                  <br />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputField
                    required
                    value={telefono_whats || ""}
                    name="telefono_whats"
                    onInput={(e: any) => {
                      const target = e.target as HTMLTextAreaElement;
                      formik.setFieldValue("telefono_whats", target?.value || "");
                      setTelefono_whats(target?.value);
                    }}
                    label={intl.formatMessage({ id: "input_telefono_whats" })}
                    placeholder={intl.formatMessage({
                      id: "input_descripcion_telefono_whats",
                    })}
                    type="text"
                    id="telefono_whats"
                    formik={formik?.getFieldMeta("telefono_whats")}
                  />
                  <br />
                </Grid>
                {/* <Grid item xs={12} md={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={3} style={{ padding: "12px", textAlign: "center" }}>
                      <CampoSwitch
                        key={"switch3"}
                        label={intl.formatMessage({ id: 'input_notificacion_en_sistema' })}
                        value={notificacion_en_sistema}
                        onAction={(v: any) => setNotificacion_en_sistema(v)}
                      />
                      <br />
                    </Grid>

                  </Grid>
                </Grid> */}
                <Grid item xs={12} md={12}>
                  <Button
                    variant="primary"
                    disabled={
                      props?.procesando || !formik.dirty || !formik.isValid
                    }
                    onClick={(e: any) => {
                      props?.enAccion({
                        ...{
                          reenviar,
                          horario,
                          correo,
                          telefono_whats,
                          notificacion_en_sistema,
                          tarea_id: tarea_id.map((r: any) => r?.value).toString(),
                        }, ...props?.item ? { id: props?.item?.id } : {}
                      });
                    }}
                  >
                    {_.isEmpty(props?.item)
                      ? intl.formatMessage({ id: "general_guardar" })
                      : intl.formatMessage({ id: "general_actualizar" })
                    }
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

export default AddNotificacionForm;