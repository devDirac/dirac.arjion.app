import React from 'react';
import type { CatalogosClasificacionContratoProps } from './types';
import { Grid } from '@mui/material';
import { FormikProvider } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../InputField';
import SelectField from '../SelectField';
import { useCatalogosClasificacionContrato } from './useCatalogosClasificacionContrato';
import './style.scss';

const CatalogosClasificacionContrato: React.FC<CatalogosClasificacionContratoProps> = (props: CatalogosClasificacionContratoProps) => {

  const {
    formik,
    clave,
    setClave,
    nombre,
    setNombre,
    descripcion,
    setDescripcion,
    estatusCatalogos,
    id_estatus,
    setId_estatus,
    id_proyecto,
    proyectos,
    setId_proyecto,
    presupuesto_param,
    setPresupuesto_param,
    presupuesto,
    setPresupuesto,
    cotizado,
    setCotizado,
    intl
  } = useCatalogosClasificacionContrato(props);
  return (
    <div>
      <Grid container >
        <FormikProvider value={formik}>
          <Form.Group style={{ width: '100%' }}>
            <Grid item xs={12}>
              <InputField
                required
                value={clave || ''}
                name="clave"
                onInput={(e: any) => {
                  const target = e.target as HTMLTextAreaElement;
                  formik.setFieldValue("clave", target?.value || '');
                  setClave(target?.value);
                }}
                label={intl.formatMessage({ id: 'input_clave' })}
                placeholder={intl.formatMessage({ id: 'input_clave_descripcion' })}
                type="text"
                id="clave"
                formik={formik?.getFieldMeta('clave')}
              />
              <br />
            </Grid>
            <Grid item xs={12}>
              <InputField
                required
                value={nombre || ''}
                name="nombre"
                onInput={(e: any) => {
                  const target = e.target as HTMLTextAreaElement;
                  formik.setFieldValue("nombre", target?.value || '');
                  setNombre(target?.value);
                }}
                label={intl.formatMessage({ id: 'input_nombre' })}
                placeholder={intl.formatMessage({ id: 'input_nombre_descripcion' })}
                type="text"
                id="nombre"
                formik={formik?.getFieldMeta('nombre')}
              />
              <br />
            </Grid>
            <Grid item xs={12}>
              <InputField
                required
                value={descripcion || ''}
                name="descripcion"
                onInput={(e: any) => {
                  const target = e.target as HTMLTextAreaElement;
                  formik.setFieldValue("descripcion", target?.value || '');
                  setDescripcion(target?.value);
                }}
                label={intl.formatMessage({ id: 'input_descripcion' })}
                placeholder={intl.formatMessage({ id: 'input_descripcion_descripcion' })}
                type="text"
                id="descripcion"
                formik={formik?.getFieldMeta('descripcion')}
              />
              <br />
            </Grid>
            <Grid item xs={12}>
              <SelectField
                label={intl.formatMessage({ id: 'input_estatus' })}
                value={id_estatus}
                options={estatusCatalogos.map((e: any) => {
                  return {
                    label: e?.estatus,
                    value: e?.id
                  }
                })}
                name="id_estatus"
                id="id_estatus"
                required
                onInput={(e: any) => {
                  const target = e.target as HTMLTextAreaElement;
                  formik.setFieldValue("id_estatus", target?.value || '');
                  setId_estatus(target?.value);
                }}
                formik={formik?.getFieldMeta('id_estatus')}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <InputField
                required
                value={presupuesto_param || ''}
                name="presupuesto_param"
                onInput={(e: any) => {
                  const target = e.target as HTMLTextAreaElement;
                  formik.setFieldValue("presupuesto_param", target?.value + "" || '');
                  setPresupuesto_param(target?.value + "");
                }}
                label={intl.formatMessage({ id: 'input_presupuesto_param' })}
                placeholder={intl.formatMessage({ id: 'input_presupuesto_param_descripcion' })}
                type="text"
                id="presupuesto_param"
                formik={formik?.getFieldMeta('presupuesto_param')}
              />
              <br />
            </Grid>
            <Grid item xs={12} md={12}>
              <InputField
                required
                value={presupuesto || ''}
                name="presupuesto"
                onInput={(e: any) => {
                  const target = e.target as HTMLTextAreaElement;
                  formik.setFieldValue("presupuesto", target?.value + "" || '');
                  setPresupuesto(target?.value + "");
                }}
                label={intl.formatMessage({ id: 'input_presupuesto' })}
                placeholder={intl.formatMessage({ id: 'input_presupuesto_descripcion' })}
                type="text"
                id="presupuesto"
                formik={formik?.getFieldMeta('presupuesto')}
              />
              <br />
            </Grid>
            <Grid item xs={12} md={12}>
              <InputField
                required
                value={cotizado || ''}
                name="cotizado"
                onInput={(e: any) => {
                  const target = e.target as HTMLTextAreaElement;
                  formik.setFieldValue("cotizado", target?.value + "" || '');
                  setCotizado(target?.value + "");
                }}
                label={intl.formatMessage({ id: 'input_cotizado' })}
                placeholder={intl.formatMessage({ id: 'input_cotizado_descripcion' })}
                type="text"
                id="cotizado"
                formik={formik?.getFieldMeta('cotizado')}
              />
              <br />
            </Grid>
            <Grid item xs={12}>
              <SelectField
                label={intl.formatMessage({ id: 'input_proyecto' })}
                value={id_proyecto}
                options={proyectos.map((e: any) => {
                  return {
                    label: e?.obra,
                    value: e?.id
                  }
                })}
                name="id_proyecto"
                id="id_proyecto"
                required
                onInput={(e: any) => {
                  const target = e.target as HTMLTextAreaElement;
                  formik.setFieldValue("id_proyecto", target?.value || '');
                  setId_proyecto(target?.value);
                }}
                formik={formik?.getFieldMeta('id_proyecto')}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{ padding: "5px", paddingTop: "0", paddingBottom: "0" }}
            >
              <Button
                variant="primary"
                disabled={props?.procesando || !formik.dirty || !formik.isValid}
                onClick={(e) => {
                  props?.action({
                    clave,
                    nombre,
                    descripcion,
                    id_estatus,
                    id_obra: id_proyecto,
                    presupuesto_param,
                    presupuesto,
                    cotizado,
                    BD: props?.catalogo
                  });
                }}
              >
                {intl.formatMessage({ id: 'general_guardar' })}
              </Button>
            </Grid>
          </Form.Group>
        </FormikProvider>


      </Grid>
    </div>
  )
}

export default CatalogosClasificacionContrato;
