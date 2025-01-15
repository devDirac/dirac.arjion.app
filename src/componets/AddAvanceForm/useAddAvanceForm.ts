import { useEffect, useState } from 'react'
import * as Yup from "yup";
import { useIntl } from 'react-intl';
import { FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import _ from 'lodash';
import moment from 'moment';
import type { AddAvanceFormProps } from './types'

const useAddAvanceForm = (props: AddAvanceFormProps) => {
    const intl = useIntl();
    const [fecha_ejecucion, setFecha_ejecucion] = useState<string>(moment(new Date()).format('DD/MM/YYYY'));
    const [cantidad, setCantidad] = useState<string>('');
    const [comentarios, setComentarios] = useState<string>('');
    useEffect(() => {
        formik.setFieldValue("fecha_ejecucion", (new Date()).toISOString().split('T')[0]);
        setFecha_ejecucion((new Date()).toISOString().split('T')[0]);
    }, []);

    const formik = useFormik({
        initialValues: {
            "fecha_ejecucion": (new Date()).toISOString().split('T')[0],
            "cantidad": "",
            "comentarios": ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            fecha_ejecucion: Yup.string().required(intl.formatMessage({ id: "input_validation_requerido" })),
            cantidad: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            comentarios: Yup.string()
                .min(4, intl.formatMessage({ id: "input_validation_min_4" }))
                .max(500, intl.formatMessage({ id: "input_validation_max_500" })),
        }),
    });

    useEffect(() => {
        if (props?.resetForm) {
            formik.setFieldValue("fecha_ejecucion", (new Date()).toISOString().split('T')[0]);
            setFecha_ejecucion((new Date()).toISOString().split('T')[0]);
            setCantidad('');
            setComentarios('');
            formik.resetForm();
        }
    }, [props?.resetForm]);

    const validate = async () => {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length === 0) {
        } else {
            formik.setTouched(
                setNestedObjectValues<FormikTouched<any>>(errors, true)
            );
        }
    };

    useEffect(() => {
        if (props?.item && props?.item?.fecha_hora) {
            formik.setFieldValue("fecha_ejecucion", (new Date(props?.item?.fecha_hora || "")).toISOString().split('T')[0]);
            setFecha_ejecucion(props?.item?.fecha_hora);
        }

        if (props?.item && props?.item?.cantidad_visual) {
            formik.setFieldValue("cantidad", props?.item?.cantidad_visual ? props?.item?.cantidad_visual + "" : "");
            setCantidad(props?.item?.cantidad_visual ? props?.item?.cantidad_visual + "" : "");
            formik.setFieldTouched('cantidad',true)
        }

        if (props?.item && props?.item?.comentarios) {
            formik.setFieldValue("comentarios", props?.item?.comentarios || "");
            setComentarios(props?.item?.comentarios);
        }

        if (!_.isEmpty(props?.item)) {
            validate();
        }
    }, [props?.item]);


    return {
        formik,
        fecha_ejecucion,
        setFecha_ejecucion,
        intl,
        cantidad,
        setCantidad,
        comentarios,
        setComentarios
    }
}

export default useAddAvanceForm
