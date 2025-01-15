import { useEffect } from 'react'
import type { AddClienteFormPros } from './types'
import { useMaterialUIController } from "context";
import { useState } from 'react';
import { FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import * as Yup from "yup";
import { useIntl } from 'react-intl';

export const useEditClienteForm = (props: AddClienteFormPros) => {
  const intl = useIntl();
    const [nombre, setNombre] = useState('');
    const [nombreCorto, setNombreCorto] = useState('');
    const [rfc, setRfc] = useState('');
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;

    const formik = useFormik({
        initialValues: {
            nombre: "",
            nombreCorto: "",
            rfc: ""
        },
        onSubmit: async (values) => {
            
        },
        validationSchema: Yup.object({
          nombre: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(255, intl.formatMessage({ id: 'input_validation_max_255' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
          nombreCorto: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(255, intl.formatMessage({ id: 'input_validation_max_255' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
          rfc: Yup.string().min(12, intl.formatMessage({ id: 'input_validation_min_12' })).max(13, intl.formatMessage({ id: 'input_validation_max_13' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
        }),
    });

    const validate = async() =>{
        const errors = await formik.validateForm();
        if (Object.keys(errors).length === 0) {
        } else {
          formik.setTouched(setNestedObjectValues<FormikTouched<any>>(errors, true));
        }
      }
      useEffect(() => {
        if (props?.item && props?.item?.nombre) {
            formik.setFieldValue("nombre", props?.item?.nombre || '');
            setNombre(props?.item?.nombre || '');
        }
        if (props?.item && props?.item?.nombre_corto) {
          formik.setFieldValue("nombreCorto", props?.item?.nombre_corto || '');
          setNombreCorto(props?.item?.nombre_corto || '');
        }
        if (props?.item && props?.item?.rfc) {
          formik.setFieldValue("rfc", props?.item?.rfc || '');
          setRfc(props?.item?.rfc || '');
        }
        validate();
      }, [props?.item]);
      
    useEffect(()=>{
        if(props?.resetForm){
            setNombre('');
            setNombreCorto('');
            setRfc('');
            formik.resetForm();
        }
    },[props?.resetForm]);
    
    return {
        darkMode,
        formik,
        nombre,
        setNombre,
        nombreCorto,
        setNombreCorto,
        rfc,
        setRfc
    }
}

