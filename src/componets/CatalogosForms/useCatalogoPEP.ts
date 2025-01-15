import { useEffect, useState } from 'react';
import type { CatalogoEspecialidadProps } from './types';
import { FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import * as Yup from "yup";
import { useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import { useIntl } from 'react-intl';
import _ from 'lodash';


const useCatalogoPEP = (props: CatalogoEspecialidadProps) => {
    const intl = useIntl();
    const [pep, setPep] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [cotizacion, setCotizacion] = useState('');
    const [presupuesto, setPresupuesto] = useState('');
    const [cuenta, setCuenta] = useState('');
    const [orden, setOrden] = useState('');
    const [imputable, setImputable] = useState('');
    const [id_proyecto, setId_proyecto] = useState('');

    const proyectos = useSelector(
        (state: StoreType) => {
            if (props?.idObra) {
                return (state?.app?.catalogos?.['apm_obras'] || []).filter((o: any) => o?.id === +(props?.idObra || 0));
            }
            return (state?.app?.catalogos?.['apm_obras'] || []);

        }
    );


    useEffect(() => {
        if (props?.resetForm) {

            formik.setFieldValue("pep", '');
            setPep('');

            formik.setFieldValue("descripcion", '');
            setDescripcion('');

            formik.setFieldValue("cotizacion", '');
            setCotizacion('');

            formik.setFieldValue("presupuesto", '');
            setPresupuesto('');

            formik.setFieldValue("cuenta", '');
            setCuenta('');

            formik.setFieldValue("orden", '');
            setOrden('');

            formik.setFieldValue("imputable", '');
            setImputable('');

            formik.setFieldValue("id_proyecto", '');
            setId_proyecto('');

            formik.resetForm();
        }
    }, [props?.resetForm]);

    const formik = useFormik({
        initialValues: {
            pep: "",
            descripcion: "",
            cotizacion: "",
            presupuesto: "",
            cuenta: "",
            orden: "",
            imputable: "",
            id_proyecto: ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            pep: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            descripcion: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            cotizacion: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })).matches(
                /^-?\d{1,46}(\.\d{1,10})?$/,
                intl.formatMessage({ id: 'input_validation_solo_numeros' })),
            presupuesto: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })).matches(
                /^-?\d{1,46}(\.\d{1,10})?$/,
                intl.formatMessage({ id: 'input_validation_solo_numeros' })),
            cuenta: Yup.string(),
            orden: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })).matches(
                /^[0-9]+$/,
                intl.formatMessage({ id: 'input_validation_solo_numeros' })),
            imputable: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            id_proyecto: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
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

        if (props?.item && props?.item?.pep) {
            formik.setFieldValue("pep", props?.item?.pep || '');
            setPep(props?.item?.pep || '');
        }

        if (props?.item && props?.item?.descripcion) {
            formik.setFieldValue("descripcion", props?.item?.descripcion || '');
            setDescripcion(props?.item?.descripcion || '');
        }

        if (props?.item && props?.item?.cotizacion) {
            formik.setFieldValue("cotizacion", props?.item?.cotizacion || '');
            setCotizacion(props?.item?.cotizacion || '');
        }

        if (props?.item && props?.item?.presupuesto) {
            formik.setFieldValue("presupuesto", props?.item?.presupuesto || '');
            setPresupuesto(props?.item?.presupuesto || '');
        }

        if (props?.item && props?.item?.cuenta) {
            formik.setFieldValue("cuenta", props?.item?.cuenta || '');
            setCuenta(props?.item?.cuenta || '');
        }

        if (props?.item && props?.item?.orden) {
            formik.setFieldValue("orden", props?.item?.orden || '');
            setOrden(props?.item?.orden || '');
        }

        if (props?.item && props?.item?.imputable) {
            formik.setFieldValue("imputable", props?.item?.imputable || '');
            setImputable(props?.item?.imputable || '');
        }

        if (props?.item && props?.item?.id_obra) {
            formik.setFieldValue("id_proyecto", props?.item?.id_obra + '' || '');
            setId_proyecto(props?.item?.id_obra + '' || '');
        }

        if (!_.isEmpty(props?.item)) {
            validate();
        }

    }, [props?.item]);

    return {
        formik,
        pep,
        setPep,
        descripcion,
        setDescripcion,
        cotizacion,
        setCotizacion,
        presupuesto,
        setPresupuesto,
        setCuenta,
        cuenta,
        orden,
        setOrden,
        imputable,
        setImputable,
        id_proyecto,
        proyectos,
        setId_proyecto,
        intl
    }
}

export default useCatalogoPEP
