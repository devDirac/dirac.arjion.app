import { useEffect, useState } from 'react';
import type { CatalogoEspecialidadProps } from './types';
import { FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import * as Yup from "yup";
import _ from 'lodash'
import { useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import { useIntl } from 'react-intl';


const useCatalogoEspecialidadesDocumento = (props: CatalogoEspecialidadProps) => {
    const intl = useIntl();
    const [clave, setClave] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [frecuencia, setFrecuencia] = useState('');
    const [id_estatus, setId_estatus] = useState('');
    const [id_proyecto, setId_proyecto] = useState('');
    const [id_especialidad, setId_especialidad] = useState('');
    const [subEspecialidad, setSubEspecialidad] = useState('');
    const [subEspecialidades, setSubEspecialidades] = useState([]);
    const estatusCatalogos = useSelector(
        (state: StoreType) => state?.app?.catalogos?.['apm_estatus_catalogos']
    );

    const proyectos = useSelector(
        (state: StoreType) => {
            if (props?.idObra) {
                return state?.app?.catalogos?.['apm_obras'].filter((e: any) => e?.id === props?.idObra)
            }
            return state?.app?.catalogos?.['apm_obras']
        }
    );

    const especialidades = useSelector(
        (state: StoreType) => state?.app?.catalogos?.['apm_cat_especialidades'] || []
    );

    useEffect(() => {
        setSubEspecialidades(especialidades.filter((w: any) => w?.especialidad === +id_especialidad))
    }, [id_especialidad])

    const formik = useFormik({
        initialValues: {
            clave: "",
            nombre: "",
            descripcion: "",
            frecuencia: "",
            id_estatus: "",
            id_proyecto: "",
            id_especialidad: "",
            subEspecialidad: "",
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            clave: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            nombre: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            descripcion: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            frecuencia: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).matches(/^[0-9]+$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            id_estatus: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            id_proyecto: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            id_especialidad: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            subEspecialidad: Yup.string()
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
        if (props?.item && props?.item?.frecuencia) {
            formik.setFieldValue("frecuencia", props?.item?.frecuencia || '');
            setFrecuencia(props?.item?.frecuencia || '');
        }
        if (props?.item && props?.item?.id_estatus) {
            setId_estatus(props?.item?.id_estatus + "");
            formik.setFieldValue("id_estatus", props?.item?.id_estatus + "");
        }
        if (props?.item && props?.item?.id_obra) {
            setId_proyecto(props?.item?.id_obra + '');
            formik.setFieldValue("id_proyecto", props?.item?.id_obra + '');
        }
        if (props?.item && props?.item?.id_especialidad) {
            setId_especialidad(props?.item?.id_especialidad + '');
            formik.setFieldValue("id_especialidad", props?.item?.id_especialidad + '');
        }

        if (props?.item && props?.item?.sub_especialidad) {
            setSubEspecialidad(props?.item?.sub_especialidad + '');
            formik.setFieldValue("sub_especialidad", props?.item?.sub_especialidad + '');
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
        frecuencia,
        setFrecuencia,
        id_estatus,
        estatusCatalogos,
        setId_estatus,
        proyectos,
        id_proyecto,
        setId_proyecto,
        id_especialidad,
        especialidades,
        setId_especialidad,
        subEspecialidad,
        subEspecialidades,
        setSubEspecialidad,
        intl
    }
}

export default useCatalogoEspecialidadesDocumento
