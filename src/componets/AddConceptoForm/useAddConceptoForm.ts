import { useEffect, useState } from 'react'
import { FormikTouched, setNestedObjectValues, useFormik } from 'formik';
import * as Yup from "yup";
import { useIntl } from 'react-intl';
import _ from 'lodash';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import { getCatalogoSubEspecialidad, guardaCatalogoEspecialidadDocumento, setCatalogo } from '../../actions/catalogos';
import { getErrorHttpMessage } from '../../utils';
import type { AddConceptoProps } from './types';


const useAddConceptoForm = (props: AddConceptoProps) => {
    const intl = useIntl();
    const dispatch = useDispatch();
    const espacio = useSelector((state: any) => state?.app?.espacio || null);
    const [catalogoSeleccionado, setCatalogoSeleccionado] = useState("");
    const [tipoCatalogo, setTipoCatalogo] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isOpen, setOpen] = useState(false);
    const [inciso, setInciso] = useState('');
    const [id_contrato, setId_contrato] = useState('');
    const [id_frente, setId_frente] = useState('');
    const [concepto, setConcepto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [num_convenio, setNum_convenio] = useState('');
    const [unidad, setUnidad] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [pu, setPu] = useState('');
    const [fecha_inicio, setFecha_inicio] = useState('');
    const [fecha_fin, setFecha_fin] = useState('');
    const [linea_base, setLinea_base] = useState('');
    const [tipo_concepto, setTipo_concepto] = useState('');
    const [homologado, setHomologado] = useState(false);
    const [cerrado, setCerrado] = useState(false);
    const [plaza, setPlaza] = useState(false);
    const [tarea, setTarea] = useState(false);
    const [id_subespecialidadM, setId_subespecialidadM] = useState<any[]>([]);
    const contrato = useSelector((state: any) => state?.app?.contrato || null);
    const [procesando, setProcesando] = useState<boolean>(false);
    const [isOpenHistorial, setOpenHistorial] = useState(false);
    const handleOpenHistorial = () => setOpenHistorial(true);
    const handleCloseHistorial = () => setOpenHistorial(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);

    const catalogoTipoConcepto = useSelector(
        (state: StoreType) => (state?.app?.catalogos?.['apm_cat_tipo_concepto'] || []).filter((e: any) => e?.nombre !== 'Extraordinario')
    );

    const subEspecialidades = useSelector(
        (state: StoreType) => (state?.app?.catalogos?.['apm_cat_especialidades_documentos'] || []).filter((r:any)=> r?.id_obra === espacio?.id)
    );

    const guardaCatalogoSubEspecialidades = async (data: any) => {
        try {
            setProcesando(true);
            await guardaCatalogoEspecialidadDocumento(data);
            const catalogoSubEspecialidad = await getCatalogoSubEspecialidad();
            handleClose();
            catalogoSubEspecialidad?.length && dispatch(setCatalogo(catalogoSubEspecialidad, 'apm_cat_especialidades_documentos'));
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
            setProcesando(false);
            handleisAlertOpen();
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const formik = useFormik({
        initialValues: {
            "inciso": "",
            "id_contrato": "",
            "id_frente": "",
            "concepto": "",
            "descripcion": "",
            "num_convenio": "",
            "unidad": "",
            "cantidad": "",
            "pu": "",
            "fecha_inicio": "",
            "fecha_fin": "",
            "linea_base": "",
            "tipo_concepto": "",
            "id_subespecialidadM": []
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            inciso: Yup.string()
                .min(4, intl.formatMessage({ id: "input_validation_min_4" }))
                .max(150, intl.formatMessage({ id: "input_validation_max_150" }))
                .required(intl.formatMessage({ id: "input_validation_requerido" })),
            id_contrato: Yup.string().required(intl.formatMessage({ id: "input_validation_requerido" })),
            id_frente: Yup.string().required(intl.formatMessage({ id: "input_validation_requerido" })),
            concepto: Yup.string()
                .min(4, intl.formatMessage({ id: "input_validation_min_4" }))
                .max(150, intl.formatMessage({ id: "input_validation_max_150" }))
                .required(intl.formatMessage({ id: "input_validation_requerido" })),
            descripcion: Yup.string()
                .min(4, intl.formatMessage({ id: "input_validation_min_4" }))
                .max(500, intl.formatMessage({ id: "input_validation_max_500" }))
                .required(intl.formatMessage({ id: "input_validation_requerido" })),
            num_convenio: Yup.string()
                .min(4, intl.formatMessage({ id: "input_validation_min_4" }))
                .max(500, intl.formatMessage({ id: "input_validation_max_500" })),
            unidad: Yup.string()
                .max(150, intl.formatMessage({ id: "input_validation_max_150" }))
                .required(intl.formatMessage({ id: "input_validation_requerido" })),
            cantidad: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            pu: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            fecha_inicio: Yup.string()
                .required(intl.formatMessage({ id: "input_validation_requerido" }))
                .test(
                    "GratherThanFin1",
                    intl.formatMessage({ id: "input_validation_GratherThanFin1" }),
                    (value) => {
                        const date1 = moment(fecha_fin);
                        const date2 = moment(value);
                        return !date1?.isValid || fecha_fin === ""
                            ? true
                            : date1.diff(date2, "days") >= 0;
                    }
                ),
            fecha_fin: Yup.string()
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
            linea_base: Yup.string().required(intl.formatMessage({ id: "input_validation_requerido" })),
            tipo_concepto: Yup.string().required(intl.formatMessage({ id: "input_validation_requerido" })),
            id_subespecialidadM: Yup.array()
            //id_subespecialidadM: Yup.array().min(1, intl.formatMessage({ id: "input_validation_requerido" })).required(intl.formatMessage({ id: "input_validation_requerido" }))
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
        if (props?.item && props?.item?.inciso) {
            formik.setFieldValue("inciso", props?.item?.inciso || "");
            setInciso(props?.item?.inciso);
        }

        if (props?.item && props?.item?.id_frente) {
            formik.setFieldValue("id_frente", (props?.item?.id_frente + '') || "");
            setId_frente((props?.item?.id_frente + '') || "");
        }
        if (props?.item && props?.item?.concepto) {
            formik.setFieldValue("concepto", (props?.item?.concepto + '') || "");
            setConcepto((props?.item?.concepto + '') || "");
        }
        if (props?.item && props?.item?.descripcion) {
            formik.setFieldValue("descripcion", props?.item?.descripcion || "");
            setDescripcion(props?.item?.descripcion || "");
        }
        if (props?.item && props?.item?.num_convenio) {
            formik.setFieldValue("num_convenio", props?.item?.num_convenio || "");
            setNum_convenio(props?.item?.num_convenio || "");
        }
        if (props?.item && props?.item?.unidad) {
            formik.setFieldValue("unidad", props?.item?.unidad || "");
            setUnidad(props?.item?.unidad || "");
        }
        if (props?.item && props?.item?.cantidad) {
            formik.setFieldValue("cantidad", props?.item?.cantidad || "");
            setCantidad(props?.item?.cantidad || "");
        }
        if (props?.item && props?.item?.pu) {
            formik.setFieldValue("pu", props?.item?.pu || "");
            setPu(props?.item?.pu || "");
        }
        if (props?.item && props?.item?.fecha_inicio) {
            formik.setFieldValue("fecha_inicio", (new Date(props?.item?.fecha_inicio || "")).toISOString().split('T')[0]);
            setFecha_inicio(props?.item?.fecha_inicio || "");
        }
        if (props?.item && props?.item?.fecha_fin) {
            formik.setFieldValue("fecha_fin", (new Date(props?.item?.fecha_fin || "")).toISOString().split('T')[0]);
            setFecha_fin(props?.item?.fecha_fin || "");
        }
        if (props?.item && props?.item?.linea_base) {
            formik.setFieldValue("linea_base", (new Date(props?.item?.linea_base || "")).toISOString().split('T')[0]);
            setLinea_base(props?.item?.linea_base || "");
        }
        if (props?.item && props?.item?.tipo_concepto) {
            formik.setFieldValue("tipo_concepto", (props?.item?.tipo_concepto + '') || "");
            setTipo_concepto((props?.item?.tipo_concepto + '') || "");
        }
        if (props?.item && props?.item?.homologado) {
            setHomologado(props?.item?.homologado === 1 ? true : false);
        }
        if (props?.item && props?.item?.cerrado) {
            setCerrado(props?.item?.cerrado === 1 ? true : false);
        }
        if (props?.item && props?.item?.plaza) {
            setPlaza(props?.item?.plaza === 1 ? true : false);
        }
        if (props?.item && props?.item?.tarea) {
            setTarea(props?.item?.tarea === 1 ? true : false);
        }
        
        if (props?.item && props?.item?.id_subespecialidad) {
            formik.setFieldValue("id_subespecialidadM", subEspecialidades.filter((obj: any) => (props?.item?.id_subespecialidad || []).includes(obj.id)).map((e: any) => {
                return {
                    label: e?.nombre,
                    value: e?.id
                }
            }));
            setId_subespecialidadM(subEspecialidades.filter((obj: any) => (props?.item?.id_subespecialidad || []).includes(obj.id)).map((e: any) => {
                return {
                    label: e?.nombre,
                    value: e?.id
                }
            }))
        }
        if (!_.isEmpty(props?.item)) {
            validate();
        }
    }, [props?.item]);

    useEffect(() => {
        if (((props?.frentes || []))?.length === 1) {
            formik.setFieldValue("id_frente", (props?.frentes?.[0]?.id + '') || "");
            setId_frente((props?.frentes?.[0]?.id + '') || "");
        }
    }, [props?.frentes])


    useEffect(() => {
        if (contrato?.id) {
            formik.setFieldValue("id_contrato", (contrato?.id + '') || "");
            setId_contrato((contrato?.id + '') || "");
        }
    }, [contrato?.id]);

    return {
        formik,
        inciso,
        setInciso,
        intl,
        id_contrato,
        contrato,
        setId_contrato,
        id_frente,
        setId_frente,
        handleOpenHistorial,
        concepto,
        setConcepto,
        descripcion,
        setDescripcion,
        unidad,
        setUnidad,
        cantidad,
        setCantidad,
        pu,
        setPu,
        fecha_inicio,
        setFecha_inicio,
        fecha_fin,
        setFecha_fin,
        linea_base,
        setLinea_base,
        tipo_concepto,
        catalogoTipoConcepto,
        setTipo_concepto,
        id_subespecialidadM,
        subEspecialidades,
        setCatalogoSeleccionado,
        setTipoCatalogo,
        handleOpen,
        setId_subespecialidadM,
        homologado,
        setHomologado,
        cerrado,
        setCerrado,
        plaza,
        setPlaza,
        tarea,
        setTarea,
        handleCloseHistorial,
        isOpenHistorial,
        handleClose,
        isOpen,
        catalogoSeleccionado,
        tipoCatalogo,
        espacio,
        guardaCatalogoSubEspecialidades,
        procesando,
        handleisAlerClose,
        isAlertOpen,
        mensajeAlert,
        num_convenio, setNum_convenio
    }
}

export default useAddConceptoForm
