import { useEffect, useState } from 'react';
import type { CatalogoEspecialidadProps } from './types';
import { FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import * as Yup from "yup";
import { useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import { useIntl } from 'react-intl';
import _ from 'lodash';

const useCatalogoEquipoMaquinaria = (props: CatalogoEspecialidadProps) => {
    const intl = useIntl();
    const [nombre, setNombre] = useState('');
    const [unidad, setUnidad] = useState('');
    const [precio, setPrecio] = useState('');
    const [id_proyecto, setId_proyecto] = useState('');
    const [id_tipo, setId_tipo] = useState('');
    const [id_estatus, setId_estatus] = useState('');

    const proyectos = useSelector(
        (state: StoreType) => state?.app?.catalogos?.['apm_obras']
    );

    const estatusCatalogos = useSelector(
        (state: StoreType) => state?.app?.catalogos?.['apm_estatus_catalogos']
    );

    const tiposCatalogos = useSelector(
        (state: StoreType) => state?.app?.catalogos?.['apm_cat_equipo_maquinaria']
    );

    const formik = useFormik({
        initialValues: {
            nombre: "",
            unidad: "",
            precio: "",
            id_proyecto: "",
            id_tipo: "",
            id_estatus: "",
        },
        onSubmit: async (values) => {},
        validationSchema: Yup.object({
            nombre: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            unidad: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            precio: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            id_proyecto: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            id_tipo: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            id_estatus: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
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

        if (props?.item && props?.item?.nombre) {
            formik.setFieldValue("nombre", props?.item?.nombre || '');
            setNombre(props?.item?.nombre || '');
        }

        if (props?.item && props?.item?.unidad) {
            formik.setFieldValue("unidad", props?.item?.unidad || '');
            setUnidad(props?.item?.unidad || '');
        }

        if (props?.item && props?.item?.precio) {
            formik.setFieldValue("precio", props?.item?.precio || '');
            setPrecio(props?.item?.precio || '');
        }

        if (props?.item && props?.item?.id_obra) {
            formik.setFieldValue("id_proyecto", props?.item?.id_obra+"" || '');
            setId_proyecto(props?.item?.id_obra+'' || '');
        }

        if (props?.item && props?.item?.id_tipo) {
            formik.setFieldValue("id_tipo", props?.item?.id_tipo+"" || '');
            setId_tipo(props?.item?.id_tipo+'' || '');
        }

        if (props?.item && props?.item?.id_estatus) {
            formik.setFieldValue("id_estatus", props?.item?.id_estatus+"" || '');
            setId_estatus(props?.item?.id_estatus+'' || '');
        }

        if (!_.isEmpty(props?.item)) {
            validate();
        }

    }, [props?.item]);
    
    return {
        formik,
        nombre,
        setNombre,
        unidad,
        setUnidad,
        precio,
        setPrecio,
        id_proyecto,
        proyectos,
        setId_proyecto,
        tiposCatalogos,
        id_tipo,
        setId_tipo,
        id_estatus,
        estatusCatalogos,
        setId_estatus,
        intl
    }
}

export default useCatalogoEquipoMaquinaria
