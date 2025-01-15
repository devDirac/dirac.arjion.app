import { useEffect, useState } from 'react'
import { FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import * as Yup from "yup";
import { useIntl } from 'react-intl';
import _ from 'lodash';
import type { AddNotificacionFormProps } from './types';


const useAddNotificacionForm = (props: AddNotificacionFormProps) => {
    const intl = useIntl();
    const [tarea_id, setTarea_id] = useState<any[]>([]);
    const [reenviar, setReenviar] = useState('');
    const [horario, setHorario] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono_whats, setTelefono_whats] = useState('');
    const [notificacion_en_sistema, setNotificacion_en_sistema] = useState(false);

    const tareas = [
        /* {
            nombre: 'Notificarme cuando se crea un contrato', id: 1
        },
        {
            nombre: 'Notificarme cuando se agregan frentes', id: 2
        },
        {
            nombre: 'Notificarme cuando se agregan conceptos', id: 3
        },
        {
            nombre: 'Notificarme cuando se agregan avances', id: 4
        },
        {
            nombre: 'Notificarme cuando se realiza una estimación', id: 5
        },
        {
            nombre: 'Notificarme cuando se edita una estimación', id: 6
        },
        {
            nombre: 'Notificarme cuando se cree un paquete zip de una estimación', id: 7
        }, */
        {
            nombre: 'Notificarme cuando se va a vencer un hito', id: 9
        },
        {
            nombre: 'Notificarme hacerca de los avances del contrato', id: 10
        },
        {
            nombre: 'Notificarme hacerca de mis estimaciones', id: 11
        },
        {
            nombre: 'Notificarme el avance de mis contratos', id: 12
        },
       /*  {
            nombre: 'Notificarme el avance del proyecto actual', id: 13
        } */
    ];

    const formik = useFormik({
        initialValues: {
            "tarea_id": [],
            "reenviar": "",
            "horario": "",
            "correo": "",
            "telefono_whats": ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            tarea_id: Yup.array().min(1, intl.formatMessage({ id: "input_validation_requerido" })).required(intl.formatMessage({ id: "input_validation_requerido" })),
            reenviar: Yup.string().required(intl.formatMessage({ id: "input_validation_requerido" })),
            horario: Yup.string().required(intl.formatMessage({ id: "input_validation_requerido" })),
            correo: Yup.string().email(intl.formatMessage({ id: 'input_validation_formato_invalido' })),
            telefono_whats: Yup.string().matches(/^[0-9]{7,12}$/, intl.formatMessage({ id: 'input_validation_solo_numeros' }))
        }),
    });


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
        if (props?.item && props?.item?.tarea_id) {
            formik.setFieldValue("tarea_id", tareas.filter((obj: any) => (props?.item?.tarea_id || []).includes(obj.id)).map((e: any) => {
                return {
                    label: e?.nombre,
                    value: e?.id
                }
            }));
            setTarea_id(tareas.filter((obj: any) => (props?.item?.tarea_id || []).includes(obj.id)).map((e: any) => {
                return {
                    label: e?.nombre,
                    value: e?.id
                }
            }))
        }

        if (props?.item && props?.item?.reenviar) {
            formik.setFieldValue("reenviar", (props?.item?.reenviar + '') || "");
            setReenviar((props?.item?.reenviar + '') || "");
        }

        if (props?.item && props?.item?.horario) {
            formik.setFieldValue("horario", (props?.item?.horario + '') || "");
            setHorario((props?.item?.horario + '') || "");
        }

        if (props?.item && props?.item?.correo) {
            formik.setFieldValue("correo", (props?.item?.correo + '') || "");
            setCorreo((props?.item?.correo + '') || "");
        }

        if (props?.item && props?.item?.telefono_whats) {
            formik.setFieldValue("telefono_whats", (props?.item?.telefono_whats + '') || "");
            setTelefono_whats((props?.item?.telefono_whats + '') || "");
        }

        if (props?.item && props?.item?.notificacion_en_sistema) {
            setNotificacion_en_sistema(props?.item?.notificacion_en_sistema === 1 ? true : false);
        }

        if (!_.isEmpty(props?.item)) {
            validate();
        }
    }, [props?.item]);

    return {
        formik,
        intl,
        tareas,
        tarea_id, setTarea_id,
        reenviar, setReenviar,
        horario, setHorario,
        correo, setCorreo,
        telefono_whats, setTelefono_whats,
        notificacion_en_sistema, setNotificacion_en_sistema
    }
}

export default useAddNotificacionForm
