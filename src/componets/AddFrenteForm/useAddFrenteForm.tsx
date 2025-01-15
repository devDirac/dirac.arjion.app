import { useEffect, useState } from "react";
import type { AddFrenteFormProps } from "./types";
import {
    FormikTouched,
    setNestedObjectValues,
    useFormik,
} from "formik";
import _ from "lodash";
import * as Yup from "yup";
import moment from "moment";
import { useIntl } from "react-intl";
import { StoreType } from "../../types/geericTypes";
import { useDispatch, useSelector } from "react-redux";
import {
    saveCatalogosEspecialidad,
    setCatalogo,
} from "../../actions/catalogos";
import { getCatalogoEspecialidad } from "../../actions/catalogos";
import { getErrorHttpMessage } from "../../utils";


const useAddFrenteForm = (props: AddFrenteFormProps) => {
    const intl = useIntl();
    const dispatch = useDispatch();
    const [frente, setFrente] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fecha_inicio, setFecha_inicio] = useState("");
    const [fecha_final, setFecha_final] = useState("");
    const [id_clasificacion, setId_clasificacion] = useState("");
    const [id_especialidad, setId_especialidad] = useState("");
    const [id_frente, setId_frente] = useState("");
    const [isOpen, setOpen] = useState(false);
    const [catalogoSeleccionado, setCatalogoSeleccionado] = useState("");
    const [tipoCatalogo, setTipoCatalogo] = useState("");
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState("");
    const [isOpenHistorial, setOpenHistorial] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);
    const handleOpenHistorial = () => setOpenHistorial(true);
    const handleCloseHistorial = () => setOpenHistorial(false);

    const espacio = useSelector((state: any) => state?.app?.espacio || null);

    const clasificaciones = useSelector((state: StoreType) => {
        if (espacio) {
            return (
                state?.app?.catalogos?.["apm_cat_clasificacion_frentes"] || []
            ).filter((o: any) => o?.id_obra === +(espacio?.id || 0));
        }
        return state?.app?.catalogos?.["apm_cat_clasificacion_frentes"] || [];
    });

    const catalogoEspecialidades = useSelector((state: StoreType) => {
        if (espacio) {
            return (state?.app?.catalogos?.["apm_cat_especialidades"] || []).filter(
                (o: any) => o?.id_obra === +(espacio?.id || 0)
            );
        }
        return state?.app?.catalogos?.["apm_cat_especialidades"] || [];
    });

    const guardaCatalogoEspecialidades = async (data: any) => {
        try {
            await saveCatalogosEspecialidad(data);
            const catalogoEspecialidad = await getCatalogoEspecialidad();
            catalogoEspecialidad?.length &&
                dispatch(setCatalogo(catalogoEspecialidad, "apm_cat_especialidades"));
            setMensajeAlert(intl.formatMessage({ id: "http_exito_registrar" }));
            handleClose();
            handleisAlertOpen();
        } catch (err) {
            handleClose();
            const message = getErrorHttpMessage(err);
            setMensajeAlert(
                message || intl.formatMessage({ id: "http_error_registrar" })
            );
            handleisAlertOpen();
        }
    };

    const formik = useFormik({
        initialValues: {
            frente: "",
            descripcion: "",
            fecha_inicio: "",
            fecha_final: "",
            id_clasificacion: "",
            id_especialidad: "",
            id_frente: "",
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            frente: Yup.string()
                .min(1, intl.formatMessage({ id: "input_validation_min_1" }))
                .max(150, intl.formatMessage({ id: "input_validation_max_150" }))
                .required(intl.formatMessage({ id: "input_validation_requerido" })),
            descripcion: Yup.string()
                .min(4, intl.formatMessage({ id: "input_validation_min_4" }))
                .max(500, intl.formatMessage({ id: "input_validation_max_500" }))
                .required(intl.formatMessage({ id: "input_validation_requerido" })),
            fecha_inicio: Yup.string()
                .required(intl.formatMessage({ id: "input_validation_requerido" }))
                .test(
                    "GratherThanFin1",
                    intl.formatMessage({ id: "input_validation_GratherThanFin1" }),
                    (value) => {
                        const date1 = moment(fecha_final);
                        const date2 = moment(value);
                        return !date1?.isValid || fecha_final === ""
                            ? true
                            : date1.diff(date2, "days") >= 0;
                    }
                ),
            fecha_final: Yup.string()
                .required(intl.formatMessage({ id: "input_validation_requerido" }))
                .test(
                    "lessThanIni",
                    intl.formatMessage({ id: "input_validation_lessThanIni" }),
                    (value) => {
                        const date1 = moment(fecha_inicio);
                        const date2 = moment(value);
                        return !date1?.isValid || fecha_inicio === ""
                            ? true
                            : date2.diff(date1, "days") >= 0;
                    }
                ),
            id_clasificacion: Yup.string(),
            id_especialidad: Yup.string(),
            id_frente: Yup.string(),
        }),
    });

    useEffect(() => {
        if (props?.resetForm) {
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
        if (props?.item && props?.item?.frente) {
            formik.setFieldValue("frente", props?.item?.frente || "");
            setFrente(props?.item?.frente);
        }
        if (props?.item && props?.item?.descripcion) {
            formik.setFieldValue("descripcion", props?.item?.descripcion || "");
            setDescripcion(props?.item?.descripcion);
        }
        if (props?.item && props?.item?.fecha_inicio) {
            formik.setFieldValue("fecha_inicio", (new Date(props?.item?.fecha_inicio || "")).toISOString().split('T')[0]);
            setFecha_inicio(props?.item?.fecha_inicio);
        }
        if (props?.item && props?.item?.fecha_fin) {
            formik.setFieldValue("fecha_final", (new Date(props?.item?.fecha_fin || "")).toISOString().split('T')[0]);
            setFecha_final(props?.item?.fecha_fin);
        }
        if (props?.item && props?.item?.id_clasificacion) {
            formik.setFieldValue("id_clasificacion", (props?.item?.id_clasificacion + "" || ""));
            setId_clasificacion(props?.item?.id_clasificacion + "" || "");
        }

        if (props?.item && props?.item?.id_especialidad) {
            formik.setFieldValue("id_especialidad", props?.item?.id_especialidad + "" || "");
            setId_especialidad(props?.item?.id_especialidad + "" + "");
        }
        if (props?.item && props?.item?.id_frente) {
            formik.setFieldValue("id_frente", props?.item?.id_frente + "" || "");
            setId_frente(props?.item?.id_frente + "" || "");
        }

        if (!_.isEmpty(props?.item)) {
            validate();
        }
    }, [props?.item]);

    return {
        formik,
        frente,
        setFrente,
        intl,
        descripcion,
        setDescripcion,
        fecha_inicio,
        setFecha_inicio,
        fecha_final,
        setFecha_final,
        id_clasificacion,
        clasificaciones,
        setId_clasificacion,
        setCatalogoSeleccionado,
        setTipoCatalogo,
        handleOpen,
        id_especialidad,
        catalogoEspecialidades,
        setId_especialidad,
        id_frente,
        setId_frente,
        handleOpenHistorial,
        handleCloseHistorial,
        isOpenHistorial,
        handleClose,
        isOpen,
        catalogoSeleccionado,
        espacio,
        tipoCatalogo,
        guardaCatalogoEspecialidades,
        handleisAlerClose,
        isAlertOpen,
        mensajeAlert
    }
}

export default useAddFrenteForm
