import { useEffect, useState } from 'react'
import * as Yup from "yup";
import _ from 'lodash';
import { useIntl } from 'react-intl';
import { FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import type { AddNotaAvanceFormProps } from './AddNotaAvanceFormTypes';


const useAddNotaAvanceForm = (props: AddNotaAvanceFormProps) => {

    const intl = useIntl();
    const [tipo_nota, setTipo_nota] = useState<string>();
    const [titulo, setTitulo] = useState<string>();
    const [nota, setNota] = useState<string>();
    const espacio = useSelector((state: any) => state?.app?.espacio || null);
    const catalogoTipoNota = useSelector(
        (state: StoreType) => {
            if (espacio) {
                return (state?.app?.catalogos?.['apm_cat_tipo_nota'] || []).filter((o: any) => o?.id_obra === +(espacio?.id || 0));
            }
            return (state?.app?.catalogos?.['apm_cat_tipo_nota'] || []);
        }
    );

    const formik = useFormik({
        initialValues: {
            "tipo_nota": "",
            "titulo": "",
            "nota": ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            tipo_nota: Yup.string().required(intl.formatMessage({ id: "input_validation_requerido" })),
            titulo: Yup.string()
                .min(4, intl.formatMessage({ id: "input_validation_min_4" }))
                .max(150, intl.formatMessage({ id: "input_validation_max_150" })),
            nota: Yup.string()
                .min(4, intl.formatMessage({ id: "input_validation_min_4" }))
                .max(500, intl.formatMessage({ id: "input_validation_max_500" })),
        }),
    });

    useEffect(() => {
        if (props?.resetForm) {
            setTipo_nota('');
            setTitulo('');
            setNota('');
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
        if (props?.item && props?.item?.tipo_nota) {
            formik.setFieldValue("tipo_nota", props?.item?.tipo_nota ? props?.item?.tipo_nota + "" : "");
            setTipo_nota(props?.item?.tipo_nota ? props?.item?.tipo_nota + "" : "");
            formik.setFieldTouched('tipo_nota', true)
        }
        if (props?.item && props?.item?.titulo) {
            formik.setFieldValue("titulo", props?.item?.titulo ? props?.item?.titulo + "" : "");
            setTitulo(props?.item?.titulo ? props?.item?.titulo + "" : "");
            formik.setFieldTouched('titulo', true)
        }
        if (props?.item && props?.item?.nota) {
            formik.setFieldValue("nota", props?.item?.nota || "");
            setNota(props?.item?.nota);
            formik.setFieldTouched('nota', true)
        }
        if (!_.isEmpty(props?.item)) {
            validate();
        }
    }, [props?.item]);


    return {
        formik,
        intl,
        tipo_nota,
        catalogoTipoNota,
        setTipo_nota,
        titulo,
        setTitulo,
        nota,
        setNota
    }
}

export default useAddNotaAvanceForm
