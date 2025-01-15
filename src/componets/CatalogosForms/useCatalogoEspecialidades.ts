import { useEffect, useState } from 'react';
import type { CatalogoEspecialidadProps } from './types';
import { FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import * as Yup from "yup";
import _ from 'lodash'
import { useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import { useIntl } from 'react-intl';

const useCatalogoEspecialidades = (props: CatalogoEspecialidadProps) => {
    const intl = useIntl();
    const [clave, setClave] = useState('');
    const [nombre, setNombre] = useState('');
    const [id_estatus, setId_estatus] = useState('');
    const [id_proyecto, setId_proyecto] = useState('');
    const [id_especialidad, setId_especialidad] = useState('');

    const estatusCatalogos = useSelector(
        (state: StoreType) => state?.app?.catalogos?.['apm_estatus_catalogos']
    );

    const proyectos = useSelector(
        (state: StoreType) =>{
            if(props?.idObra){
                return (state?.app?.catalogos?.['apm_obras'] || []).filter((o:any)=> o?.id === +(props?.idObra || 0) );  
            }
             return (state?.app?.catalogos?.['apm_obras'] || []);
    }
    );

    const especialidades = useSelector(
        (state: StoreType) => (state?.app?.catalogos?.['apm_cat_especialidades'] || []).filter((o:any)=> o?.id_obra === +(props?.idObra || 0) )
    );

    const formik = useFormik({
        initialValues: {
            clave: "",
            nombre: "",
            id_estatus: "",
            id_proyecto: "",
            id_especialidad: ""
        },
        onSubmit: async (values) => {},
        validationSchema: Yup.object({
            clave: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            nombre: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            id_estatus: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            id_proyecto: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            id_especialidad: Yup.string()
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

        if (props?.item && props?.item?.id_estatus) {
            setId_estatus(props?.item?.id_estatus+'' );
            formik.setFieldValue("id_estatus", props?.item?.id_estatus+'' );
        }
        if (props?.item && props?.item?.id_obra) {
            setId_proyecto(props?.item?.id_obra+'' );
            formik.setFieldValue("id_proyecto", props?.item?.id_obra+'' );
        }
        if (props?.item && props?.item?.especialidad) {
            setId_especialidad(props?.item?.especialidad+'' );
            formik.setFieldValue("id_especialidad", props?.item?.especialidad+'' );
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
        id_estatus,
        estatusCatalogos,
        setId_estatus,
        id_proyecto,
        proyectos,
        setId_proyecto,
        id_especialidad,
        especialidades,
        setId_especialidad,
        intl
  }
}

export default useCatalogoEspecialidades
