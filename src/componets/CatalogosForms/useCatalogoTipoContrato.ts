import { useEffect, useState } from 'react';
import type { CatalogosGenericosProps } from './types';
import { FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import * as Yup from "yup";
import { useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import { useIntl } from 'react-intl';
import _ from 'lodash';

export const useCatalogoTipoContrato = (props: CatalogosGenericosProps) => {
  const intl = useIntl();
  const [clave, setClave] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [id_estatus, setId_estatus] = useState('');
  const estatusCatalogos = useSelector(
    (state: StoreType) => state?.app?.catalogos?.['apm_estatus_catalogos']
  );

  const formik = useFormik({
    initialValues: {
      clave: "",
      nombre: "",
      descripcion: "",
      id_estatus: ""
    },
    onSubmit: async (values) => { },
    validationSchema: Yup.object({
      clave: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
      nombre: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
      descripcion: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
      id_estatus: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' }))
    }),
  });

  const validate = async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length === 0) {
    } else {
        formik.setTouched(setNestedObjectValues<FormikTouched<any>>(errors, true));
    }
}

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

    if (!_.isEmpty(props?.item)) {
      validate();
    }
    
  }, [props?.item]);
  return {
    formik,
    clave,
    setClave,
    nombre,
    setNombre,
    descripcion,
    setDescripcion,
    id_estatus,
    estatusCatalogos,
    setId_estatus,
    intl
  };
};
