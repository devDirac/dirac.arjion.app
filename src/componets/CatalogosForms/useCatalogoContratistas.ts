import { useEffect, useState } from 'react';
import type { CatalogoEspecialidadProps } from './types';
import { FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import * as Yup from "yup";
import { useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import { useIntl } from 'react-intl';
import _ from 'lodash';


const useCatalogoContratistas = (props: CatalogoEspecialidadProps) => {
    const intl = useIntl();
    const [contratista, setContratista] = useState('');
    const [correo_contratista, setCorreo_contratista] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [rfc, setRFC] = useState('');
    const [id_externo, setId_externo] = useState('');
    const [id_proyecto, setId_proyecto] = useState('');
    const [id_estatus, setId_estatus] = useState('');
    const [estatus_bloqueo, setEstatus_bloqueo] = useState('');
    const [extranjero, setExtranjero] = useState('');

    const proyectos = useSelector(
        (state: StoreType) => {
            if(props?.idObra){
                return (state?.app?.catalogos?.['apm_obras'] || []).filter((o:any)=> o?.id === +(props?.idObra || 0) );
            }
            return (state?.app?.catalogos?.['apm_obras'] || []);
        }
    );

    const estatusCatalogos = useSelector(
        (state: StoreType) => state?.app?.catalogos?.['apm_estatus_catalogos']
    );

    const formik = useFormik({
        initialValues: {
            contratista: "",
            correo_contratista: "",
            descripcion: "",
            rfc: "",
            id_externo: "",
            id_proyecto: "",
            id_estatus: "",
            estatus_bloqueo: "",
            extranjero: ""
        },
        onSubmit: async (values) => {},
        validationSchema: Yup.object({
            contratista: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            correo_contratista: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            descripcion: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            rfc: Yup.string().min(10,intl.formatMessage({ id: 'input_validation_min_10' })).max(15,intl.formatMessage({ id: 'input_validation_max_15' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            id_externo: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            id_proyecto: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            id_estatus: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            estatus_bloqueo: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            extranjero: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
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

        if (props?.item && props?.item?.contratista) {
            formik.setFieldValue("contratista", props?.item?.contratista || '');
            setContratista(props?.item?.contratista || '');
        }
        
        if (props?.item && props?.item?.correo_contratista) {
            formik.setFieldValue("correo_contratista", props?.item?.correo_contratista || '');
            setCorreo_contratista(props?.item?.correo_contratista || '');
        }

        if (props?.item && props?.item?.descripcion) {
            formik.setFieldValue("descripcion", props?.item?.descripcion || '');
            setDescripcion(props?.item?.descripcion || '');
        }

        if (props?.item && props?.item?.rfc) {
            formik.setFieldValue("rfc", props?.item?.rfc || '');
            setRFC(props?.item?.rfc || '');
        }

        if (props?.item && props?.item?.id_externo) {
            formik.setFieldValue("id_externo", props?.item?.id_externo+'' || '');
            setId_externo(props?.item?.id_externo+'' || '');
        }

        if (props?.item && props?.item?.id_obra) {
            setId_proyecto(props?.item?.id_obra+'' );
            formik.setFieldValue("id_proyecto", props?.item?.id_obra+'' );
        }

        if (props?.item && props?.item?.id_estatus) {
            setId_estatus(props?.item?.id_estatus+'' );
            formik.setFieldValue("id_estatus", props?.item?.id_estatus+'' );
        }

        if (props?.item && props?.item?.estatus_bloqueo) {
            setEstatus_bloqueo(props?.item?.estatus_bloqueo+'' );
            formik.setFieldValue("estatus_bloqueo", props?.item?.estatus_bloqueo+'' );
        }

        if (props?.item && props?.item?.extranjero) {
            setExtranjero(props?.item?.extranjero+'' );
            formik.setFieldValue("extranjero", props?.item?.extranjero+'' );
        }

        if (!_.isEmpty(props?.item)) {
            validate();
        }

    }, [props?.item]);
  
    return {
        formik,
        contratista,
        setContratista,
        correo_contratista,
        setCorreo_contratista,
        descripcion,
        setDescripcion,
        rfc,
        setRFC,
        id_externo,
        setId_externo,
        id_proyecto,
        proyectos,
        id_estatus,
        setId_proyecto,
        estatusCatalogos,
        setId_estatus,
        estatus_bloqueo,
        setEstatus_bloqueo,
        extranjero,
        setExtranjero,
        intl
    }
}

export default useCatalogoContratistas
