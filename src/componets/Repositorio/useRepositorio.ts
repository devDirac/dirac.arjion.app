import { useState } from 'react'
import './index.scss'
import type { RepositorioProps } from './types';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useMaterialUIController } from 'context';
import { useIntl } from 'react-intl';

const useRepositorio = (props: RepositorioProps) => {
    const intl = useIntl();
    const [nombre, setNombre] = useState<string>('');
    const [descripcion, setDescripcion] = useState<string>('');
    const [file, setFile] = useState<File[]>();
    const [controller] = useMaterialUIController();
    const {
      darkMode
    } = controller;
    const formik = useFormik({
        initialValues: {
            nombre: "",
            descripcion: ""
        },
        onSubmit: async (values) => {},
        validationSchema: Yup.object({
            nombre: Yup.string()
                .min(4, intl.formatMessage({ id: 'input_validation_min_4' }))
                .max(
                    50,
                    intl.formatMessage({ id: 'input_validation_max_50' })
                ).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            descripcion: Yup.string()
                .min(
                    4,
                    intl.formatMessage({ id: 'input_validation_min_4' })
                )
                .max(
                    500,
                    intl.formatMessage({ id: 'input_validation_max_500' })
                ).required(intl.formatMessage({ id: 'input_validation_requerido' }))
        }),
    });

    const saveImages = async (file_: any) => {
        setFile(file_?.[0]);
    };

    return {
        darkMode,
        formik,
        nombre,
        setNombre,
        descripcion,
        setDescripcion,
        saveImages,
        file,
        intl
    }
}

export default useRepositorio
