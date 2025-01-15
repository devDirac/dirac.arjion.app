import { useCallback, useState, useEffect } from 'react'
import type CatalogosFormsProps from './types'
import { StoreType, TiposCatalogos } from '../../types/geericTypes'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { catalogos } from '../../utils/constants'
import { getErrorHttpMessage } from '../../utils'
import {
    actualizaCatalogoContratistaHttp,
    actualizaCatalogoEspecialidad,
    actualizaCatalogoMonedaHttp,
    actualizaCatalogoObras,
    actualizaCatalogoPEPHttp,
    actualizaCatalogoPerfilClienteHttp,
    actualizaCatalogoTipoAvanceHttp,
    actualizaCatalogoTipoConceptoHttp,
    actualizaCatalogoTipoContratoHttp,
    actualizaCatalogosGenericos,
    cambiaEstatusCatalogosGenericos,
    editaCatalogoEquipoMaquinaria,
    editaCatalogoEspecialidadDocumento,
    getCatalogoEspecialidad,
    getCatalogoSubEspecialidad,
    getCatalogosGereicos,
    guardaCatalogoContratista,
    guardaCatalogoEquipoMaquinaria,
    guardaCatalogoEspecialidadDocumento,
    guardaCatalogoMonedaHttp,
    guardaCatalogoObras,
    guardaCatalogoPEPHttp,
    guardaCatalogoPerfilClienteHTTP,
    guardaCatalogoTipoAvanceHttp,
    guardaCatalogoTipoConceptoHttp,
    guardaCatalogoTipoContratoHttp,
    saveCatalogosEspecialidad,
    saveCatalogosGereicos,
    setCatalogo
} from '../../actions/catalogos'
import { useDispatch, useSelector } from 'react-redux';
import { useMaterialUIController } from 'context'
import { useIntl } from 'react-intl';



const useCatalogosForms = (props: CatalogosFormsProps) => {
    const intl = useIntl();
    const [controller] = useMaterialUIController();
    const {
        darkMode
    } = controller;
    const dispatch = useDispatch();
    const [tipoCatalogo, setTipoCatalogo] = useState<string>("");
    const [tiposCatalogos] = useState<TiposCatalogos[]>(catalogos);
    const [catalogoSeleccionado, setCatalogoSeleccionado] = useState<TiposCatalogos>();
    const [procesando, setProcesando] = useState<boolean>(false);
    const [dataSeleccionCatalogo, setDataSeleccionCatalogo] = useState<any[]>();

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);
    const espacio = useSelector((state: any) => state?.app?.espacio || null);
    const [openModalConfirmDelete, setOpenModalConfirmDelete] = useState(false);
    const [textModalConfirmDelete, setTextModalConfirmDelete] = useState('');
    const [openModalConfirmActualizar, setOpenModalConfirmActualizar] = useState(false);
    const [textModalConfirmActualizar, setTextModalConfirmActualizar] = useState('');
    const [openModalConfirmReactivar, setOpenModalConfirmReactivar] = useState(false);
    const [textModalConfirmReactivar, setTextModalConfirmReactivar] = useState('');
    const [peps, setPeps] = useState<any>([]);
    const [item, setItem] = useState(null);

    const [itemCatalogoDetalle, setItemCatalogoDetall] = useState<any>({});
    const [isOpen, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const formik = useFormik({
        initialValues: {
            tipoCatalogo: ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({
            tipoCatalogo: Yup.string().required(intl.formatMessage({ id: 'input_validation_requerido' }))
        }),
    });

    const handleSeleccionCatalogo = (e: string) => {
        setTipoCatalogo(e);
        const seleccion = catalogos.find(es => es?.value === e);
        setCatalogoSeleccionado(seleccion);
        getDatosCatalogo(e);
    }

    const proyectos = useSelector(
        (state: StoreType) => {
            return (state?.app?.catalogos?.['apm_obras'] || []);
        }
    );

    const getDatosCatalogoPEP = useCallback(async () => {
        try {
            setProcesando(true);
            const dataCatRes = await getCatalogosGereicos('apm_pep');
            setPeps(dataCatRes.filter((r: any) => r?.id_obra === espacio?.id))
            setProcesando(false);
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'catalogos_error_obtener' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    }, []);

    useEffect(() => {
        getDatosCatalogoPEP()
    }, [getDatosCatalogoPEP])



    const getDatosCatalogo = async (elemento: string) => {
        try {
            setProcesando(true);
            const dataCatRes = await getCatalogosGereicos(elemento);
            setDataSeleccionCatalogo(dataCatRes.map((s: any) => {
                delete s.id_usuario;
                const existEstatus = s.hasOwnProperty('id_estatus');
                const existId_obra = s.hasOwnProperty('id_obra');
                let obra = null;
                if (existId_obra) {
                    obra = proyectos.find((p: any) => p?.id === s?.id_obra)?.obra;
                }
                const a = {
                    ...s, ...existEstatus ? { id_estatus: s?.id_estatus === 1 ? 'Activo' : 'Inactivo' } : {}
                }
                const b = {
                    ...a, ...obra ? { proyecto: obra } : {}
                }
                return b;
            }));
            setProcesando(false);
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'catalogos_error_obtener' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const fetching = async () => {
        catalogos.filter(e => e?.esgenerico).forEach(async cat => {
            const catalogo = await getCatalogosGereicos(cat.value);
            catalogo?.length && dispatch(setCatalogo(catalogo, cat.value));
        });
    }

    const guardaCatalogoTipoContrato = async (data: any) => {
        try {
            setProcesando(true);
            await guardaCatalogoTipoContratoHttp(data);
            getDatosCatalogo(tipoCatalogo);
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

    const actualizaCatalogoTipoContrato = async (data: any) => {
        try {
            setProcesando(true);
            await actualizaCatalogoTipoContratoHttp({ ...data, ...{ id: itemCatalogoDetalle?.id } });
            getDatosCatalogo(tipoCatalogo);
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_actualizar' }));
            setProcesando(false);
            handleClose();
            handleisAlertOpen();
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_actualizar' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const guardaCatalogoPerfilCliente = async (data: any) => {
        try {
            setProcesando(true);
            await guardaCatalogoPerfilClienteHTTP(data);
            getDatosCatalogo(tipoCatalogo);
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

    const actualizaCatalogoTipoCliente = async (data: any) => {
        try {
            setProcesando(true);
            await actualizaCatalogoPerfilClienteHttp({ ...data, ...{ id: itemCatalogoDetalle?.id } });
            getDatosCatalogo(tipoCatalogo);
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_actualizar' }));
            setProcesando(false);
            handleClose();
            handleisAlertOpen();
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_actualizar' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const guardaCatalogo = async (data: any) => {
        try {
            setProcesando(true);
            await saveCatalogosGereicos(data);
            await fetching();
            getDatosCatalogo(tipoCatalogo);
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

    const guardaCataPEP = async (data: any) => {
        try {
            setProcesando(true);
            await guardaCatalogoPEPHttp(data);
            await fetching();
            getDatosCatalogo(tipoCatalogo);
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

    const actualizaCatalPEP = async (data: any) => {
        try {
            setProcesando(true);
            await actualizaCatalogoPEPHttp({ ...data, ...{ id: itemCatalogoDetalle?.id } });
            getDatosCatalogo(tipoCatalogo);
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_actualizar' }));
            setProcesando(false);
            handleClose();
            handleisAlertOpen();
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_actualizar' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const guardaCatalogoObra = async (data: any) => {
        try {
            setProcesando(true);
            await guardaCatalogoObras(data);
            await fetching();
            getDatosCatalogo(tipoCatalogo);
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

    const actualizaCatalogoObra = async (data: any) => {
        try {
            setProcesando(true);
            await actualizaCatalogoObras({ ...data, ...{ id: itemCatalogoDetalle?.id } });
            getDatosCatalogo(tipoCatalogo);
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_actualizar' }));
            setProcesando(false);
            handleClose();
            handleisAlertOpen();
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_actualizar' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const guardaCatalogoEquipoMaquinarias = async (data: any) => {
        try {
            setProcesando(true);
            await guardaCatalogoEquipoMaquinaria(data);
            await fetching();
            getDatosCatalogo(tipoCatalogo);
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

    const actualizaCatalogoEquipoMaquinaria = async (data: any) => {
        try {
            setProcesando(true);
            await editaCatalogoEquipoMaquinaria({ ...data, ...{ id: itemCatalogoDetalle?.id } });
            getDatosCatalogo(tipoCatalogo);
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_actualizar' }));
            setProcesando(false);
            handleClose();
            handleisAlertOpen();
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_actualizar' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const guardaCatalogoContratistas = async (data: any) => {
        try {
            setProcesando(true);
            await guardaCatalogoContratista(data);
            await fetching();
            getDatosCatalogo(tipoCatalogo);
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

    const editaCatalogoContratistas = async (data: any) => {
        try {
            setProcesando(true);
            await actualizaCatalogoContratistaHttp({ ...data, ...{ id: itemCatalogoDetalle?.id } });
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_actualizar' }));
            getDatosCatalogo(tipoCatalogo);
            handleClose();
            setProcesando(false);
            handleisAlertOpen();
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_actualizar' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const actualizaCatalogoTipoAvance = async (data: any) => {
        try {
            setProcesando(true);
            await actualizaCatalogoTipoAvanceHttp({ ...data, ...{ id: itemCatalogoDetalle?.id } });
            getDatosCatalogo(tipoCatalogo);
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_actualizar' }));
            setProcesando(false);
            handleClose();
            handleisAlertOpen();
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_actualizar' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const actualizaCatalogoMoneda = async (data: any) => {
        try {
            setProcesando(true);
            await actualizaCatalogoMonedaHttp({ ...data, ...{ id: itemCatalogoDetalle?.id } });
            getDatosCatalogo(tipoCatalogo);
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_actualizar' }));
            setProcesando(false);
            handleClose();
            handleisAlertOpen();
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_actualizar' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    }
    const actualizaCatalogoTipoConcepto = async (data: any) => {
        try {
            setProcesando(true);
            await actualizaCatalogoTipoConceptoHttp({ ...data, ...{ id: itemCatalogoDetalle?.id } });
            getDatosCatalogo(tipoCatalogo);
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_actualizar' }));
            setProcesando(false);
            handleClose();
            handleisAlertOpen();
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || 'error al registrar');
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const guardaCatalogoTipoAvance = async (data: any) => {
        try {
            setProcesando(true);
            await guardaCatalogoTipoAvanceHttp(data);
            getDatosCatalogo(tipoCatalogo);
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
    const guardaCatalogoMoneda = async (data: any) => {
        try {
            setProcesando(true);
            await guardaCatalogoMonedaHttp(data);
            getDatosCatalogo(tipoCatalogo);
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

    const guardaCatalogoTipoConcepto = async (data: any) => {
        try {
            setProcesando(true);
            await guardaCatalogoTipoConceptoHttp(data);
            getDatosCatalogo(tipoCatalogo);
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

    const guardaCatalogoEspecialidades = async (data: any) => {
        try {
            setProcesando(true);
            await saveCatalogosEspecialidad(data);
            await fetching();
            getDatosCatalogo(tipoCatalogo);
            const catalogoEspecialidad = await getCatalogoEspecialidad();
            catalogoEspecialidad?.length && dispatch(setCatalogo(catalogoEspecialidad, 'apm_cat_especialidades'));
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

    const guardaCatalogoSubEspecialidades = async (data: any) => {
        try {
            setProcesando(true);
            await guardaCatalogoEspecialidadDocumento(data);
            await fetching();
            getDatosCatalogo(tipoCatalogo);
            const catalogoSubEspecialidad = await getCatalogoSubEspecialidad();
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

    const editaElementoCatalogoEspecialidad = async (data: any) => {
        try {
            setProcesando(true);
            await actualizaCatalogoEspecialidad({ ...data, ...{ id: itemCatalogoDetalle?.id } });
            getDatosCatalogo(tipoCatalogo);
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_actualizar' }));
            setProcesando(false);
            handleClose();
            handleisAlertOpen();
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_actualizar' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const editaCatalogoSubEspecialidades = async (data: any) => {
        try {
            setProcesando(true);
            await editaCatalogoEspecialidadDocumento({ ...data, ...{ id: itemCatalogoDetalle?.id } });
            getDatosCatalogo(tipoCatalogo);
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_actualizar' }));
            setProcesando(false);
            handleClose();
            handleisAlertOpen();
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_actualizar' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const editaElementoCatalogo = async (data: any) => {
        try {
            setProcesando(true);
            await actualizaCatalogosGenericos({ ...data, ...{ id: itemCatalogoDetalle?.id } });
            getDatosCatalogo(tipoCatalogo);
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_actualizar' }));
            setProcesando(false);
            handleClose();
            handleisAlertOpen();
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_actualizar' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const eliminaElementoCatalogoPregunta = (item_: any) => {
        setItem(item_);
        setOpenModalConfirmDelete(true);
        setTextModalConfirmDelete(intl.formatMessage({ id: 'add_catalogo_form_hook_eliminar_pregnta' }));
    }

    const eliminaElementoCatalogo = async () => {
        try {
            const item_: any = item;
            setProcesando(true);
            await cambiaEstatusCatalogosGenericos({ ...item_, ...{ id_estatus: 2 + "", BD: tipoCatalogo } });
            setItem(null);
            setOpenModalConfirmDelete(false);
            setTextModalConfirmDelete('');
            getDatosCatalogo(tipoCatalogo);
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_actualizar' }));
            setProcesando(false);
            handleisAlertOpen();
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_actualizar' }));
            setItem(null);
            setOpenModalConfirmDelete(false);
            setTextModalConfirmDelete('');
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const reactivarElementoCatalogoPregunta = (item_: any) => {
        setItem(item_);
        setOpenModalConfirmReactivar(true);
        setTextModalConfirmReactivar(intl.formatMessage({ id: 'add_catalogo_form_hook_reactivar_pregnta' }));
    }

    const reactivarElementoCatalogo = async () => {
        try {
            const item_: any = item;
            setProcesando(true);
            await cambiaEstatusCatalogosGenericos({ ...item_, ...{ id_estatus: 1 + "", BD: tipoCatalogo } });
            getDatosCatalogo(tipoCatalogo);
            setItem(null);
            setOpenModalConfirmReactivar(false);
            setTextModalConfirmReactivar('');
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_actualizar' }));
            setProcesando(false);
            handleisAlertOpen();
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_actualizar' }));
            setItem(null);
            setOpenModalConfirmReactivar(false);
            setTextModalConfirmReactivar('');
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const actualizarElementoCatalogoPregunta = (item_: any) => {
        setItem(item_);
        setOpenModalConfirmActualizar(true);
        setTextModalConfirmActualizar(intl.formatMessage({ id: 'add_catalogo_form_hook_actualizar_pregnta' }));
    }

    const actualizarElementoCatalogo = async () => {
        try {
            const item_ = item;
            setItemCatalogoDetall(item_);
            handleOpen();
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_actualizar' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    return {
        darkMode,
        formik,
        tipoCatalogo,
        tiposCatalogos,
        handleSeleccionCatalogo,
        catalogoSeleccionado,
        guardaCatalogo,
        procesando,
        guardaCatalogoEspecialidades,
        guardaCatalogoSubEspecialidades,
        guardaCatalogoContratistas,
        guardaCatalogoEquipoMaquinarias,
        guardaCatalogoObra,
        guardaCataPEP,
        guardaCatalogoTipoConcepto,
        guardaCatalogoMoneda,
        guardaCatalogoTipoAvance,
        guardaCatalogoTipoContrato,
        guardaCatalogoPerfilCliente,
        handleClose,
        isOpen,
        editaElementoCatalogo,
        itemCatalogoDetalle,
        editaElementoCatalogoEspecialidad,
        editaCatalogoSubEspecialidades,
        editaCatalogoContratistas,
        actualizaCatalogoEquipoMaquinaria,
        actualizaCatalogoObra,
        actualizaCatalPEP,
        actualizaCatalogoTipoConcepto,
        actualizaCatalogoMoneda,
        actualizaCatalogoTipoAvance,
        actualizaCatalogoTipoContrato,
        actualizaCatalogoTipoCliente,
        dataSeleccionCatalogo,
        actualizarElementoCatalogo,
        actualizarElementoCatalogoPregunta,
        eliminaElementoCatalogo,
        eliminaElementoCatalogoPregunta,
        reactivarElementoCatalogoPregunta,
        reactivarElementoCatalogo,
        isAlertOpen,
        handleisAlerClose,
        mensajeAlert,
        setOpenModalConfirmDelete,
        setTextModalConfirmDelete,
        openModalConfirmDelete,
        textModalConfirmDelete,
        setOpenModalConfirmActualizar,
        setTextModalConfirmActualizar,
        openModalConfirmActualizar,
        textModalConfirmActualizar,
        setOpenModalConfirmReactivar,
        setTextModalConfirmReactivar,
        openModalConfirmReactivar,
        textModalConfirmReactivar,
        intl,
        peps
    }
}

export default useCatalogosForms
