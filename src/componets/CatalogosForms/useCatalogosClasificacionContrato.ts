import { useCallback, useEffect, useState } from 'react';
import type { CatalogosGenericosProps } from './types';
import { FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import * as Yup from "yup";
import { useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import { useIntl } from 'react-intl';
import _ from 'lodash';

export const useCatalogosClasificacionContrato = (props: CatalogosGenericosProps) => {
  const intl = useIntl();
  const [clave, setClave] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [id_estatus, setId_estatus] = useState('');
  const [id_proyecto, setId_proyecto] = useState('');
  const [presupuesto_param,setPresupuesto_param] = useState('');
  const [presupuesto , setPresupuesto] = useState('');
  const [cotizado,setCotizado] = useState('');

  const estatusCatalogos = useSelector(
    (state: StoreType) => state?.app?.catalogos?.['apm_estatus_catalogos']
  );

  const proyectos = useSelector(
    (state: StoreType) => {
      if (props?.idObra) {
        return (state?.app?.catalogos?.['apm_obras'] || []).filter((o: any) => o?.id === +(props?.idObra || 0));
      }
      return state?.app?.catalogos?.['apm_obras'];

    }
  );

  const formik = useFormik({
    initialValues: {
      clave: "",
      nombre: "",
      descripcion: "",
      id_estatus: "",
      id_proyecto: "",
      presupuesto_param:"",
      presupuesto:"",
      cotizado:""
    },
    onSubmit: async (values) => { },
    validationSchema: Yup.object({
      clave: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
      nombre: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
      descripcion: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
      id_estatus: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
      id_proyecto: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
      presupuesto_param: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
      presupuesto: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
      cotizado: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
    }),
  });

  const validate = useCallback(async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length === 0) {
    } else {
      formik.setTouched(setNestedObjectValues<FormikTouched<any>>(errors, true));
    }
  },[]);

  useEffect(() => {

    if (props?.item && props?.item?.clave) {
      formik.setFieldValue("clave", props?.item?.clave || '');
      setClave(props?.item?.clave || '');
    }

    if (props?.item && props?.item?.nombre) {
      formik.setFieldValue("nombre", props?.item?.nombre || '');
      setNombre(props?.item?.nombre || '');
    }

    if (props?.item && props?.item?.descripcion) {
      formik.setFieldValue("descripcion", props?.item?.descripcion || '');
      setDescripcion(props?.item?.descripcion || '');
    }

    if (props?.item && props?.item?.id_estatus) {
      setId_estatus(props?.item?.id_estatus + "");
      formik.setFieldValue("id_estatus", props?.item?.id_estatus + "");
    }

    if (props?.item && props?.item?.id_obra) {
      setId_proyecto(props?.item?.id_obra + '');
      formik.setFieldValue("id_proyecto", props?.item?.id_obra + "");
    }

    if (props?.item && props?.item?.presupuesto_param) {
      setPresupuesto_param(props?.item?.presupuesto_param + '');
      formik.setFieldValue("presupuesto_param", props?.item?.presupuesto_param + "");
    }

    if (props?.item && props?.item?.presupuesto) {
      setPresupuesto(props?.item?.presupuesto + '');
      formik.setFieldValue("presupuesto", props?.item?.presupuesto + "");
    }

    if (props?.item && props?.item?.cotizado) {
      setCotizado(props?.item?.cotizado + '');
      formik.setFieldValue("cotizado", props?.item?.cotizado + "");
    }

    if (!_.isEmpty(props?.item)) {
      validate();
    }

  }, [props?.item, validate]);

  return {
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
  };
};
