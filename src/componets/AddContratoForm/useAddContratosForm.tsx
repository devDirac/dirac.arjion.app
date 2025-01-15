import { useContext, useEffect, useState } from 'react'
import { FormikTouched, useFormik } from 'formik';
import * as Yup from "yup";
import {
    saveCatalogosGereicos,
    getCatalogoContratistas,
    getCatalogoEspecialidad,
    getCatalogoPEP,
    getCatalogosGereicos,
    guardaCatalogoContratista,
    guardaCatalogoPEPHttp,
    guardaCatalogoTipoContratoHttp,
    saveCatalogosEspecialidad,
    setCatalogo
} from '../../actions/catalogos';
import { getErrorHttpMessage } from '../../utils';
import { setNestedObjectValues } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import type { AddContratosFormProps } from './types';
import _ from 'lodash';
import moment from 'moment';
import { useIntl } from 'react-intl';
import { perfilContext } from '../../context/perfilContexto';
import { setCliente } from '../../actions/clientes';

export const useAddContratosForm = (props: AddContratosFormProps) => {
    const perfil = useContext(perfilContext);
    const intl = useIntl();
    const [contrato, setContrato] = useState('');
    const [id_contrato, setId_contrato] = useState('');
    const [id_contratista, setId_contratista] = useState('');
    const [fecha_inicio, setFecha_inicio] = useState('');
    const [fecha_final, setFecha_final] = useState('');
    const [importe, setImporte] = useState('');
    const [estatus, setEstatus] = useState('');
    const [id_cliente, setId_cliente] = useState('');
    const [id_responsable, setId_responsable] = useState('');
    const [autorizado, setAutorizado] = useState('');
    const [id_autorizador, setId_autorizador] = useState('');
    const [plantilla, setPlantilla] = useState('');
    const [terminado, setTerminado] = useState('');
    const [nota, setNota] = useState('');
    const [id_tipo_contrato, setId_tipo_contrato] = useState('');
    const [id_obra_principal, setId_obra_principal] = useState('');
    const [id_tipo_proyecto, setId_tipo_proyecto] = useState('');
    const [pep, setPep] = useState('');
    const [peps, setPeps] = useState<any[]>([]);
    const [moneda, setMoneda] = useState('');
    const [anticipo, setAnticipo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [alertas, setAlertas] = useState('');
    const [fecha_limite, setFecha_limite] = useState('');
    const [reclasificacion, setReclasificacion] = useState('');
    const [propietario, setPropietario] = useState('');
    const [tipo_contrato_ext, setTipo_contrato_ext] = useState('');
    const [tolerancia, setTolerancia] = useState('');
    const [estatus_firma, setEstatus_firma] = useState('');
    const [contrato_liberado, setContrato_liberado] = useState('');
    const [clasificacion_contrato, setClasificacion_contrato] = useState('');
    const [tipo_cambio, setTipo_cambio] = useState('');
    const [id_especialidad, setId_especialidad] = useState('');
    const [subEspecialidad, setSubEspecialidad] = useState<any[]>([]);
    const [subEspecialidades, setSubEspecialidades] = useState([]);
    const [catalogoSeleccionado, setCatalogoSeleccionado] = useState('');
    const [tipoCatalogo, setTipoCatalogo] = useState('');
    const [isOpen, setOpen] = useState(false);

    const [resetForm, setResetForm] = useState<boolean>(false);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);


    const dispatch = useDispatch();
    const espacio = useSelector((state: any) => state?.app?.espacio || null);
    /* Combos */
    const contratistas = useSelector(
        (state: StoreType) => {
            if (props?.obra) {
                return (state?.app?.catalogos?.['apm_contratistas'] || []).filter((o: any) => o?.id_obra === +(props?.obra || 0));
            }
            return (state?.app?.catalogos?.['apm_contratistas'] || []);
        }
    );
    const catalogoTiposContrato = useSelector(
        (state: StoreType) => state?.app?.catalogos?.['apm_cat_tipo_contrato'] || []
    );
    const catalogoObras = useSelector(
        (state: StoreType) => {
            if (props?.obra) {
                return (state?.app?.catalogos?.['apm_obras'] || []).filter((o: any) => o?.id === +(props?.obra || 0));
            }
            return (state?.app?.catalogos?.['apm_obras'] || []);
        }
    );
    const catalogoPeps = useSelector(
        (state: StoreType) => {
            if (props?.obra) {
                return (state?.app?.catalogos?.['apm_pep'] || []).filter((o: any) => o?.id_obra === +(props?.obra || 0));
            }
            return (state?.app?.catalogos?.['apm_pep'] || []);
        }
    );

    const catalogoTipoContratoExt = useSelector(
        (state: StoreType) => {
            if (props?.obra) {
                return (state?.app?.catalogos?.['apm_cat_tipo_contrato_ext'] || []).filter((o: any) => o?.id_obra === +(props?.obra || 0));
            }
            return (state?.app?.catalogos?.['apm_cat_tipo_contrato_ext'] || []);
        }
    );

    const catalogoEspecialidades = useSelector(
        (state: StoreType) => {
            if (props?.obra) {
                return (state?.app?.catalogos?.['apm_cat_especialidades'] || []).filter((o: any) => o?.id_obra === +(props?.obra || 0) && o?.especialidad === 0);
            }
            return (state?.app?.catalogos?.['apm_cat_especialidades'] || []).filter((o: any) => o?.especialidad === 0);
        }
    );


    const catalogoSubEspecialidades = useSelector(
        (state: StoreType) => {

            if (props?.obra) {
                return (state?.app?.catalogos?.['apm_cat_especialidades'] || []).filter((o: any) => o?.id_obra === +(props?.obra || 0) && o?.especialidad !== 0);
            }
            return (state?.app?.catalogos?.['apm_cat_especialidades'] || []).filter((o: any) => o?.especialidad !== 0);
        }
    );

    const catalogoClasificacionContrato = useSelector(
        (state: StoreType) => {
            if (props?.obra) {
                return (state?.app?.catalogos?.['apm_cat_clasificacion_contrato'] || []).filter((o: any) => o?.id_obra === +(props?.obra || 0));
            }
            return (state?.app?.catalogos?.['apm_cat_clasificacion_contrato'] || []);
        }
    );

    useEffect(() => {
        setSubEspecialidades(catalogoSubEspecialidades.filter((w: any) => w?.especialidad === +id_especialidad))
    }, [id_especialidad]);


    const setCliente_ = async (data: any) => {
        try {

            await setCliente({ ...data, ...{ perfil, id_obra: espacio?.id } });
            const catalogo = await getCatalogosGereicos('apm_clientes');
            catalogo?.length && dispatch(setCatalogo(catalogo, 'apm_clientes'));
            props?.onCliente && props?.onCliente();
            setResetForm(true);
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar_cliente' }));
            handleClose();
            handleisAlertOpen();
        } catch (error) {
            handleClose();
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
            handleisAlertOpen();
        }
    }




    const formik = useFormik({
        initialValues: {
            contrato: "",
            id_contrato: "",
            id_contratista: "",
            fecha_inicio: "",
            fecha_final: "",
            importe: "",
            estatus: "",
            id_cliente: "",
            id_responsable: "",
            autorizado: "",
            id_autorizador: "",
            plantilla: "",
            terminado: "",
            nota: "",
            id_tipo_contrato: "",
            id_obra_principal: "",
            id_tipo_proyecto: "",
            pep: "",
            peps: [],
            moneda: "",
            anticipo: "",
            categoria: "",
            alertas: "",
            fecha_limite: "",
            reclasificacion: "",
            propietario: "",
            tipo_contrato_ext: "",
            tolerancia: "",
            estatus_firma: "",
            contrato_liberado: "",
            clasificacion_contrato: "",
            tipo_cambio: "",
            id_especialidad: "",
            sub_especialidad: [],
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            contrato: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(150, intl.formatMessage({ id: 'input_validation_max_150' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            id_contrato: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(50, intl.formatMessage({ id: 'input_validation_max_50' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            id_contratista: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            fecha_inicio: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })).test("GratherThanFin1", intl.formatMessage({ id: 'input_validation_GratherThanFin1' }), (value) => {
                const date1 = moment(fecha_final);
                const date2 = moment(value);
                return !date1?.isValid || fecha_final === '' ? true : date1.diff(date2, 'days') >= 0;
            }),
            fecha_final: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })).test("lessThanIni", intl.formatMessage({ id: 'input_validation_lessThanIni' }), (value) => {
                const date1 = moment(fecha_inicio);
                const date2 = moment(value);
                return !date1?.isValid || fecha_inicio === '' ? true : date2.diff(date1, 'days') >= 0;
            }),
            importe: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            estatus: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            alertas: Yup.string(),
            categoria: Yup.string(),
            id_cliente: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            id_responsable: Yup.string(),
            autorizado: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            id_autorizador: Yup.string(),
            plantilla: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).matches(/^[0-9]+$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            terminado: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            nota: Yup.string().max(500, intl.formatMessage({ id: 'input_validation_max_500' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            id_tipo_contrato: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            id_obra_principal: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            id_tipo_proyecto: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            moneda: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            anticipo: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).test("GratherThanFin1", 'El anticipo no puede ser mayor al importe capturado', (value) => {
                return +importe > +(value || 0);
            }).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            fecha_limite: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })).test("GratherThanFin", intl.formatMessage({ id: 'input_validation_GratherThanFin' }), (value) => {
                const date1 = moment(fecha_final);
                const date2 = moment(value);
                return !date1?.isValid || fecha_final === '' ? true : date1.diff(date2, 'days') <= 0;
            }),
            reclasificacion: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            propietario: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            tipo_contrato_ext: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            tolerancia: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).matches(/^[0-9]+$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            estatus_firma: Yup.string().min(4, intl.formatMessage({ id: 'input_validation_min_4' })).max(150, intl.formatMessage({ id: 'input_validation_max_150' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            contrato_liberado: Yup.string().min(1, intl.formatMessage({ id: 'input_validation_min_1' })).max(150, intl.formatMessage({ id: 'input_validation_max_150' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            tipo_cambio: Yup.string().max(50, intl.formatMessage({ id: 'input_validation_max_50_digitos' })).matches(/^-?\d{1,46}(\.\d{1,10})?$/, intl.formatMessage({ id: 'input_validation_solo_numeros' })).required(intl.formatMessage({ id: 'input_validation_requerido' })),
            id_especialidad: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' })),
            sub_especialidad: Yup.lazy((value) => Yup.array().when('id_especialidad', (id_especialidad, schema) => {
                return id_especialidad ? schema.min(1, intl.formatMessage({ id: "input_validation_requerido" })).required(intl.formatMessage({ id: 'input_validation_requerido' })) : schema;
            })),
            pep: Yup.string(),
            peps: Yup.array()/* .min(1, intl.formatMessage({ id: "input_validation_requerido" })).required(intl.formatMessage({ id: "input_validation_requerido" })) */
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
            formik.setTouched(setNestedObjectValues<FormikTouched<any>>(errors, true));
        }
    }
    useEffect(() => {

        if (props?.item && props?.item?.contrato) {
            formik.setFieldValue("contrato", props?.item?.contrato || '');
            setContrato(props?.item?.contrato);
        }
        if (props?.item && props?.item?.id_contrato) {
            formik.setFieldValue("id_contrato", props?.item?.id_contrato || '');
            setId_contrato(props?.item?.id_contrato);
        }
        if (props?.item && props?.item?.id_contratista) {
            formik.setFieldValue("id_contratista", props?.item?.id_contratista || '');
            setId_contratista(props?.item?.id_contratista);
        }
        if (props?.item && props?.item?.fecha_inicio) {
            formik.setFieldValue("fecha_inicio", (new Date(props?.item?.fecha_inicio || '')).toISOString().split('T')[0]);
            setFecha_inicio(props?.item?.fecha_inicio);
        }
        if (props?.item && props?.item?.fecha_final) {
            formik.setFieldValue("fecha_final", (new Date(props?.item?.fecha_final || '')).toISOString().split('T')[0]);
            setFecha_final(props?.item?.fecha_final);
        }
        if (props?.item && props?.item?.importe) {
            formik.setFieldValue("importe", props?.item?.importe || '');
            setImporte(props?.item?.importe);
        }
        if (props?.item && props?.item?.estatus) {
            formik.setFieldValue("estatus", props?.item?.estatus || '');
            setEstatus(props?.item?.estatus);
        }
        if (props?.item && props?.item?.id_cliente) {
            formik.setFieldValue("id_cliente", props?.item?.id_cliente || '');
            setId_cliente(props?.item?.id_cliente);
        }
        if (props?.item && props?.item?.id_responsable) {
            formik.setFieldValue("id_responsable", props?.item?.id_responsable || '');
            setId_responsable(props?.item?.id_responsable);
        }
        if (props?.item && props?.item?.autorizado) {
            formik.setFieldValue("autorizado", props?.item?.autorizado || '');
            setAutorizado(props?.item?.autorizado);
        }
        if (props?.item && props?.item?.id_autorizador) {
            formik.setFieldValue("id_autorizador", props?.item?.id_autorizador || '');
            setId_autorizador(props?.item?.id_autorizador);
        }
        if (props?.item && props?.item?.plantilla) {
            formik.setFieldValue("plantilla", props?.item?.plantilla || '');
            setPlantilla(props?.item?.plantilla);
        }
        if (props?.item && props?.item?.terminado) {
            formik.setFieldValue("terminado", props?.item?.terminado || '');
            setTerminado(props?.item?.terminado);
        }
        if (props?.item && props?.item?.nota) {
            formik.setFieldValue("nota", props?.item?.nota || '');
            setNota(props?.item?.nota);
        }
        if (props?.item && props?.item?.id_tipo_contrato) {
            formik.setFieldValue("id_tipo_contrato", props?.item?.id_tipo_contrato || '');
            setId_tipo_contrato(props?.item?.id_tipo_contrato);
        }
        if (props?.item && props?.item?.id_obra_principal) {
            formik.setFieldValue("id_obra_principal", props?.item?.id_obra_principal || '');
            setId_obra_principal(props?.item?.id_obra_principal);
        }
        if (props?.item && props?.item?.id_tipo_proyecto) {
            formik.setFieldValue("id_tipo_proyecto", props?.item?.id_tipo_proyecto || '');
            setId_tipo_proyecto(props?.item?.id_tipo_proyecto);
        }
        if (props?.item && props?.item?.pep) {
            formik.setFieldValue("pep", props?.item?.pep || '');
            setPep(props?.item?.pep);
        }
        if (props?.item && (props?.item?.peps || []).length) {
            formik.setFieldValue("peps", catalogoPeps.filter((obj: any) => (props?.item?.peps || []).includes(obj.id)).map((e: any) => {
                return {
                    label: e?.pep,
                    value: e?.id
                }
            }));
            setPeps(catalogoPeps.filter((obj: any) => (props?.item?.peps || []).includes(obj.id)).map((e: any) => {
                return {
                    label: e?.pep,
                    value: e?.id
                }
            }));


        }

        if (props?.item && props?.item?.moneda) {
            formik.setFieldValue("moneda", props?.item?.moneda || '');
            setMoneda(props?.item?.moneda);
        }
        if (props?.item && (props?.item?.anticipo !== null || props?.item?.anticipo !== '')) {
            formik.setFieldValue("anticipo", (props?.item?.anticipo || 0) + '');
            setAnticipo((props?.item?.anticipo || 0) + '');
        }
        if (props?.item && props?.item?.categoria) {
            formik.setFieldValue("categoria", props?.item?.categoria || '');
            setCategoria(props?.item?.categoria);
        }
        if (props?.item && props?.item?.alertas) {
            formik.setFieldValue("alertas", props?.item?.alertas || '');
            setAlertas(props?.item?.alertas);
        }
        if (props?.item && props?.item?.fecha_limite) {
            formik.setFieldValue("fecha_limite", (new Date(props?.item?.fecha_limite || '')).toISOString().split('T')[0]);
            setFecha_limite(props?.item?.fecha_limite);
        }
        if (props?.item && props?.item?.reclasificacion) {
            formik.setFieldValue("reclasificacion", props?.item?.reclasificacion || '');
            setReclasificacion(props?.item?.reclasificacion);
        }
        if (props?.item && props?.item?.propietario) {
            formik.setFieldValue("propietario", props?.item?.propietario || '');
            setPropietario(props?.item?.propietario);
        }
        if (props?.item && props?.item?.tipo_contrato_ext) {
            formik.setFieldValue("tipo_contrato_ext", props?.item?.tipo_contrato_ext || '');
            setTipo_contrato_ext(props?.item?.tipo_contrato_ext);
        }
        if (props?.item && props?.item?.tolerancia) {
            formik.setFieldValue("tolerancia", props?.item?.tolerancia || '');
            setTolerancia(props?.item?.tolerancia);
        }
        if (props?.item && props?.item?.estatus_firma) {
            formik.setFieldValue("estatus_firma", props?.item?.estatus_firma || '');
            setEstatus_firma(props?.item?.estatus_firma);
        }
        if (props?.item && props?.item?.contrato_liberado) {
            formik.setFieldValue("contrato_liberado", props?.item?.contrato_liberado || '');
            setContrato_liberado(props?.item?.contrato_liberado);
        }
        if (props?.item && props?.item?.clasificacion_contrato) {
            formik.setFieldValue("clasificacion_contrato", props?.item?.clasificacion_contrato || '');
            setClasificacion_contrato(props?.item?.clasificacion_contrato);
        }
        if (props?.item && props?.item?.tipo_cambio) {
            formik.setFieldValue("tipo_cambio", props?.item?.tipo_cambio || '');
            setTipo_cambio(props?.item?.tipo_cambio);
        }
        if (props?.item && props?.item?.id_especialidad) {
            formik.setFieldValue("id_especialidad", props?.item?.id_especialidad || '');
            setId_especialidad(props?.item?.id_especialidad);
        }
        if (props?.item && (props?.item?.subEspecialidad || []).length) {
            formik.setFieldValue("sub_especialidad", subEspecialidades.filter((obj: any) => (props?.item?.subEspecialidad || []).includes(obj.id)).map((e: any) => {
                return {
                    label: e?.nombre,
                    value: e?.id
                }
            }));
            setSubEspecialidad(subEspecialidades.filter((obj: any) => (props?.item?.subEspecialidad || []).includes(obj.id)).map((e: any) => {
                return {
                    label: e?.nombre,
                    value: e?.id
                }
            }))
        }
        if (!_.isEmpty(props?.item)) {
            validate();
        }
    }, [props?.item, subEspecialidades]);

    const guardaCatalogoContratistas = async (data: any) => {
        try {
            await guardaCatalogoContratista({ ...data, ...{ perfil } });
            const catalogoContratistas = await getCatalogoContratistas();
            catalogoContratistas?.length && dispatch(setCatalogo(catalogoContratistas, 'apm_contratistas'));
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
            handleClose();
            handleisAlertOpen();
        } catch (err) {
            handleClose();
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
            handleisAlertOpen();
        }
    }

    const guardaCatalogoTipoContrato = async (data: any) => {
        try {
            await guardaCatalogoTipoContratoHttp({ ...data, ...{ perfil } });
            const catalogoTipoContrato = await getCatalogosGereicos('apm_cat_tipo_contrato');
            catalogoTipoContrato?.length && dispatch(setCatalogo(catalogoTipoContrato, 'apm_cat_tipo_contrato'));
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
            handleClose();
            handleisAlertOpen();
        } catch (err) {
            handleClose();
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
            handleisAlertOpen();
        }
    }


    const guardaCataPEP = async (data: any) => {
        try {
            await guardaCatalogoPEPHttp({ ...data, ...{ perfil } });
            const catalogoPEP = await getCatalogoPEP();
            catalogoPEP?.length && dispatch(setCatalogo(catalogoPEP, 'apm_pep'));
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
            handleClose();
            handleisAlertOpen();
        } catch (err) {
            handleClose();
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
            handleisAlertOpen();
        }
    }

    const guardaCatalogoEspecialidades = async (data: any) => {
        try {
            await saveCatalogosEspecialidad({ ...data, ...{ perfil } });
            const catalogoEspecialidad = await getCatalogoEspecialidad();
            catalogoEspecialidad?.length && dispatch(setCatalogo(catalogoEspecialidad, 'apm_cat_especialidades'));

            setSubEspecialidades(catalogoEspecialidad.filter((w: any) => w?.especialidad === +id_especialidad))

            setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
            handleClose();
            handleisAlertOpen();
        } catch (err) {
            handleClose();
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
            handleisAlertOpen();
        }
    }

    const guardaCatalogo = async (data: any) => {
        try {
            await saveCatalogosGereicos({ ...data, ...{ perfil } });
            const catalogo = await getCatalogosGereicos('apm_cat_tipo_contrato_ext');
            catalogo?.length && dispatch(setCatalogo(catalogo, 'apm_cat_tipo_contrato_ext'));
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
            handleClose();
            handleisAlertOpen();
        } catch (err) {
            handleClose();
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
            handleisAlertOpen();
        }
    }

    const guardaCatalogoClasificacionContrato = async (data: any) => {
        try {
            await saveCatalogosGereicos({ ...data, ...{ perfil } });
            const catalogo = await getCatalogosGereicos('apm_cat_clasificacion_contrato');
            catalogo?.length && dispatch(setCatalogo(catalogo, 'apm_cat_clasificacion_contrato'));
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
            handleClose();
            handleisAlertOpen();
        } catch (err) {
            handleClose();
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
            handleisAlertOpen();
        }
    }

    return {
        formik,
        contrato,
        setContrato,
        id_contrato,
        setId_contrato,
        id_contratista,
        contratistas,
        setCatalogoSeleccionado,
        setTipoCatalogo,
        handleOpen,
        setId_contratista,
        importe,
        setImporte,
        fecha_inicio,
        setFecha_inicio,
        fecha_final,
        setFecha_final,
        estatus,
        setEstatus,
        id_cliente,
        setId_cliente,
        id_responsable,
        setId_responsable,
        autorizado,
        setAutorizado,
        id_autorizador,
        setId_autorizador,
        plantilla,
        setPlantilla,
        terminado,
        setTerminado,
        nota,
        setNota,
        id_tipo_contrato,
        catalogoTiposContrato,
        setId_tipo_contrato,
        id_obra_principal,
        catalogoObras,
        setId_obra_principal,
        id_tipo_proyecto,
        setId_tipo_proyecto,
        pep,
        catalogoPeps,
        setPep,
        moneda,
        setMoneda,
        anticipo,
        setAnticipo,
        categoria,
        setCategoria,
        alertas,
        setAlertas,
        fecha_limite,
        setFecha_limite,
        reclasificacion,
        setReclasificacion,
        propietario,
        setPropietario,
        tipo_contrato_ext,
        catalogoTipoContratoExt,
        setTipo_contrato_ext,
        tolerancia,
        setTolerancia,
        estatus_firma,
        setEstatus_firma,
        contrato_liberado,
        setContrato_liberado,
        clasificacion_contrato,
        setClasificacion_contrato,
        tipo_cambio,
        setTipo_cambio,
        id_especialidad,
        catalogoEspecialidades,
        setId_especialidad,

        handleClose,
        isOpen,
        catalogoSeleccionado,
        tipoCatalogo,
        guardaCatalogoContratistas,
        guardaCatalogoTipoContrato,
        guardaCataPEP,
        guardaCatalogoEspecialidades,
        guardaCatalogo,
        catalogoClasificacionContrato,
        isAlertOpen,
        handleisAlerClose,
        mensajeAlert,
        guardaCatalogoClasificacionContrato,
        intl,
        subEspecialidades,
        subEspecialidad,
        setSubEspecialidad,
        resetForm, setResetForm,
        setCliente_,
        peps,
        setPeps
    }
}