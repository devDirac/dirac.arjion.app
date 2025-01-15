import { useCallback, useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import { setAhut } from '../../actions/auth';
import moment from 'moment';
import ComplexProjectCard from '../../examples/Cards/ProjectCards/ComplexProjectCard'
import { useIntl } from 'react-intl';
import { cambiaEstatusCatalogosGenericos, getCatalogoObras, getCatalogoTipoValorHTTP, getCatalogoContratistasPorObraHTTP } from '../../actions/catalogos';
import { getErrorHttpMessage, sleep } from '../../utils';
import { actualizaCatalogoObras } from '../../actions/catalogos';
import { deleteValoresConceptoHTTP, editValorProyetoHTTP, eliminarValorProyetoHTTP, getValoresHTTP, setCatalogoValorProyetoHTTP, setValorProyetoHTTP } from '../../actions/valoresProyecto';

const useGestionObrasPage = () => {
    const [dataSeleccionCatalogo, setDataSeleccionCatalogo] = useState<any[]>();
    const intl = useIntl();
    const textTo = intl.formatMessage({ id: 'catalogos_error_obtener' });
    const espacio = useSelector((state: any) => state?.app?.espacio || null);
    const [item, setItem] = useState<any>(null);
    const [procesando, setProcesando] = useState(false);
    const [openModalConfirmDelete, setOpenModalConfirmDelete] = useState(false);
    const [textModalConfirmDelete, setTextModalConfirmDelete] = useState('');
    const [openModalConfirmActualizar, setOpenModalConfirmActualizar] = useState(false);
    const [textModalConfirmActualizar, setTextModalConfirmActualizar] = useState('');
    const [openModalConfirmReactivar, setOpenModalConfirmReactivar] = useState(false);
    const [textModalConfirmReactivar, setTextModalConfirmReactivar] = useState('');
    const [openModalConfirmEliminarValor, setOpenModalConfirmEliminarValor] = useState(false);
    const [textModalConfirmEliminarValor, setTextModalConfirmEliminarValor] = useState('');

    const [openModalConfirmEliminarValorConcepto, setOpenModalConfirmEliminarValorConcepto] = useState(false);
    const [textModalConfirmEliminarValorConcepto, setTextModalConfirmEliminarValorConcepto] = useState('');

    const [rowsConceptos, setRowsConceptos] = useState<any[]>([]);
    const [itemValorEdit,setItemValorEdit] = useState<any>(null);
    const [itemValorEditConcepto,setItemValorEditConcepto] = useState<any>(null);
    const [tiposValor, setTiposValor] = useState<any[]>([]);
    const [contratista, setContratista] = useState<any[]>([]);
    const [valores, setValores] = useState<any[]>([]);
    const [valoresCatalogo, setValoresCatalogo] = useState<any[]>([]);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);

    const [itemCatalogoDetalle, setItemCatalogoDetall] = useState<any>({});
    const [isOpen, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [isOpenValores, setOpenValores] = useState(false);
    const handleOpenValores = () => setOpenValores(true);
    const handleCloseValores = () => setOpenValores(false);

    const [isOpenValoresVer, setOpenValoresVer] = useState(false);
    const handleOpenValoresVer = () => setOpenValoresVer(true);
    const handleCloseValoresVer = () => setOpenValoresVer(false);


    const [isOpenValoresEdit, setOpenValoresEdit] = useState(false);
    const handleOpenValoresEdit = () => setOpenValoresEdit(true);
    const handleCloseValoresEdit = () => setOpenValoresEdit(false);


    const [isOpenCargaCatalogo, setOpenCargaCatalogo] = useState(false);
    const handleOpenCargaCatalogo = () => setOpenCargaCatalogo(true);
    const handleCloseCargaCatalogo = () => setOpenCargaCatalogo(false);


    const [isOpenVerCatalogo, setOpenVerCatalogo] = useState(false);
    const handleOpenVerCatalogo = () => setOpenVerCatalogo(true);
    const handleCloseVerCatalogo = () => setOpenVerCatalogo(false);


    const proyectosUser = useSelector((state: StoreType) => (state?.app?.user?.data?.proyectos || []).map(e => { return e?.id }));

    const esModoDios = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 3);
    const token = useSelector((state: StoreType) => state?.app?.user?.token || '');
    useEffect(() => {
        setAhut(token);
    }, [token]);

    const getDatosCatalogo = useCallback(async (elemento: string) => {
        try {
            setProcesando(true);
            const dataCatRes = await getCatalogoObras();
            setDataSeleccionCatalogo(dataCatRes.filter((e: any) => esModoDios ? true : proyectosUser.includes(e?.id)).map((e: any) => {
                return { ...e, ...{ /* direccion: e?.address */ } }
            }));
            setProcesando(false);
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || textTo);
            setProcesando(false);
            handleisAlertOpen();
        }
    }, [textTo])

    useEffect(() => {
        getDatosCatalogo('apm_obras');
    }, [token, getDatosCatalogo]);


    const getDatosCatalogoTipoValor = useCallback(async () => {
        try {
            setProcesando(true);
            const resTipoValor = await getCatalogoTipoValorHTTP();
            setTiposValor(resTipoValor);
            setProcesando(false);
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || textTo);
            setProcesando(false);
            handleisAlertOpen();
        }
    }, [textTo])

    useEffect(() => {
        getDatosCatalogoTipoValor();
    }, [token, getDatosCatalogoTipoValor]);


    const getContratistasObraSeleccion = useCallback(async (id: any) => {
        try {
            setProcesando(true);
            const resTipoValor = await getCatalogoContratistasPorObraHTTP(id);
            setContratista(resTipoValor);
            setProcesando(false);
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || textTo);
            setProcesando(false);
            handleisAlertOpen();
        }
    }, [textTo])


    const configsButton: any = espacio ? (
        <ComplexProjectCard
            muestraAvances
            image={espacio?.foto}
            contratos={espacio?.ctaAsignados}
            title={espacio?.obra}
            element={espacio}
            description={espacio?.descripcion}
            dateTime={moment(espacio?.fecha_fin).format("DD-MM-YYYY")}
            members={espacio?.asignados}
        />
    ) as any : null;

    const eliminarValorPregunta = (item_: any) => {
        setItemValorEdit(item_);
        setOpenModalConfirmEliminarValor(true);
        setTextModalConfirmEliminarValor('¿Desea eliminar el valor de este proyecto y sus respectivos catálogos?');
    }
    

    const eliminarValorPreguntaConcepto = (item_: any) => {
        setItemValorEditConcepto(item_);
        setOpenModalConfirmEliminarValorConcepto(true);
        setTextModalConfirmEliminarValorConcepto('¿Desea eliminar el registro seleccionado?');
    }
    


    const actualizarElementoCatalogoPregunta = (item_: any) => {
        setItem(item_);
        setOpenModalConfirmActualizar(true);
        setTextModalConfirmActualizar(intl.formatMessage({ id: 'add_catalogo_form_hook_actualizar_pregnta' }));
    }
    const eliminaElementoCatalogoPregunta = (item_: any) => {
        setItem(item_);
        setOpenModalConfirmDelete(true);
        setTextModalConfirmDelete(intl.formatMessage({ id: 'add_catalogo_form_hook_eliminar_pregnta' }));
    }


    const reactivarElementoCatalogoPregunta = (item_: any) => {
        setItem(item_);
        setOpenModalConfirmReactivar(true);
        setTextModalConfirmReactivar(intl.formatMessage({ id: 'add_catalogo_form_hook_reactivar_pregnta' }));
    }

    const eliminaElementoCatalogo = async () => {
        try {
            const item_: any = item;
            setProcesando(true);
            await cambiaEstatusCatalogosGenericos({ ...item_, ...{ id_estatus: 2 + "", BD: 'apm_obras' } });
            setItem(null);
            setOpenModalConfirmDelete(false);
            setTextModalConfirmDelete('');
            getDatosCatalogo('apm_obras');
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

    const reactivarElementoCatalogo = async () => {
        try {
            const item_: any = item;
            setProcesando(true);
            await cambiaEstatusCatalogosGenericos({ ...item_, ...{ id_estatus: 1 + "", BD: 'apm_obras' } });
            getDatosCatalogo('apm_obras');
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

    const actualizaCatalogoObra = async (data: any) => {
        try {
            setProcesando(true);
            await actualizaCatalogoObras({ ...data, ...{ id: itemCatalogoDetalle?.id } });
            getDatosCatalogo('apm_obras');
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

    const AllowCell = [
        //"direccion",
        "descripcion",
        "fecha_fin",
        "fecha_inicio",
        "fecha_registro",
        //"foto",
        "id",
        "id_estatus",
        "usuario_alta",
        "limite_contratos",
        'presupuesto',
        "obra"
    ];


    const handleVerValores = async (detalle: any) => {
        try {
            setProcesando(true);
            const resValores = await getValoresHTTP(detalle?.id);
            setValores(resValores)
            handleOpenValoresVer();
            setProcesando(false);
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'get_elementos_error' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const handelAgregarValores = (detalle: any) => {
        setItem(detalle);
        handleOpenValores();
        getContratistasObraSeleccion(detalle?.id);
    }

    const handleAddValoresAccion = async (data: any) => {
        try {
            setProcesando(true);
            await setValorProyetoHTTP({ ...data, ... { id_obra: item?.id } });
            handleCloseValores();
            setItem(null);
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
            setProcesando(false);
            handleisAlertOpen();
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const handleEliminarValorConcepto = async ()=> {
        try {
            setProcesando(true);
            await deleteValoresConceptoHTTP(itemValorEditConcepto?.id);
            setOpenModalConfirmEliminarValorConcepto(false);
            handleCloseVerCatalogo();
            const resValores = await getValoresHTTP(item?.id);
            setValores(resValores)
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_eliminar' }));
            setProcesando(false);
            handleisAlertOpen();
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_eliminar' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const handleEliminarValor = async ()=> {
        try {
            setProcesando(true);
            await eliminarValorProyetoHTTP(itemValorEdit?.id);
            setOpenModalConfirmEliminarValor(false);
            const resValores = await getValoresHTTP(item?.id);
            setValores(resValores)
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_eliminar' }));
            setProcesando(false);
            handleisAlertOpen();
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_eliminar' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    }


    const handleEditValoresAccion = async (data: any) => {
        try {
            setProcesando(true);
            await editValorProyetoHTTP({ ...data, ... { id_obra: item?.id } });
            const resValores = await getValoresHTTP(item?.id);
            setValores(resValores)
            handleCloseValoresEdit();
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_editar' }));
            setProcesando(false);
            handleisAlertOpen();
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_editar' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const addConceptos = async (conceptos: any) => {
        setProcesando(true);
        const errores: any[] = [];
        await conceptos.reduce(async (_: any, cat: any) => {
            try {
                await _;
                const conceptoAlta = {
                    id_valor_proyecto:itemValorEdit?.id,
                    concepto: cat?.[0],
                    descripcion: cat?.[1],
                    unidad: cat?.[2],
                    cantidad: cat?.[3],
                    pu: cat?.[4],
                    fecha_inicio: moment(cat?.[5] || new Date()).add(1, 'days').format("YYYY-MM-DD"),
                    fecha_fin: moment(cat?.[6] || new Date()).add(1, 'days').format("YYYY-MM-DD"),
                };
                await setCatalogoValorProyetoHTTP(conceptoAlta);
            } catch (error: any) {
                const message = getErrorHttpMessage(error);
                const conceptoErrorAdd = { ...error?.response?.data?.data, ...{ error: message || intl.formatMessage({ id: 'http_error_registrar' }) } };
                errores.push(conceptoErrorAdd)
            }
        }, Promise.resolve());
        setProcesando(false);
        handleCloseCargaCatalogo()
        const resValores = await getValoresHTTP(item?.id);
        setValores(resValores)
        //setFrentesError(errores);
        setMensajeAlert(errores.length ? 'Hay conceptos que no se registrarón' : 'Exito al registrar los conceptos');
        handleisAlertOpen();
        //setBanderaEsProcesoCompletado(true);
        //setErroresToShow(oldErrores => [...oldErrores, ...errores]);
    }


    const handleExportarExcel = () => {
        const data_ = [
            {
                concepto: 'CODC001',
                descripcion: 'Superintendente del Servicio',
                unidad: 'MES',
                cantidad: '16.00',
                pu: '89,672.59',
                fecha_inicio: '01/01/2024',
                fecha_fin: '31/01/2024'
            }
        ]
        const worksheet = XLSX.utils.json_to_sheet(data_);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja 1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, `${'Documento de ejemplo para la carga masiva de los valores conceptos'}.xlsx`);
    }

    const handleVerCatalogo = (detalle:any) => {
        setValoresCatalogo(detalle?.valoresCatalogo || []);
        handleOpenVerCatalogo();
    }

    return {
        espacio,
        configsButton,
        dataSeleccionCatalogo,
        AllowCell,
        actualizarElementoCatalogoPregunta,
        eliminaElementoCatalogoPregunta,
        reactivarElementoCatalogoPregunta,
        procesando,
        eliminaElementoCatalogo,
        setOpenModalConfirmDelete,
        setTextModalConfirmDelete,
        openModalConfirmDelete,
        textModalConfirmDelete,
        actualizarElementoCatalogo,
        setOpenModalConfirmActualizar,
        setTextModalConfirmActualizar,
        openModalConfirmActualizar,
        textModalConfirmActualizar,
        reactivarElementoCatalogo,
        setOpenModalConfirmReactivar,
        setTextModalConfirmReactivar,
        openModalConfirmReactivar,
        textModalConfirmReactivar,
        handleisAlerClose,
        isAlertOpen,
        mensajeAlert,
        handleClose,
        isOpen,
        actualizaCatalogoObra,
        itemCatalogoDetalle,
        handelAgregarValores,
        isOpenValores,
        handleCloseValores,
        handleAddValoresAccion,
        tiposValor,
        contratista,
        handleVerValores,
        isOpenValoresVer,
        handleCloseValoresVer,
        valores,

        itemValorEdit,
        setItemValorEdit,

        isOpenValoresEdit,
        handleOpenValoresEdit,
        handleCloseValoresEdit,
        getContratistasObraSeleccion,
        handleEditValoresAccion,
        setItem,
        handleEliminarValor,
        setOpenModalConfirmEliminarValor,
        setTextModalConfirmEliminarValor,
        openModalConfirmEliminarValor,
        textModalConfirmEliminarValor,
        eliminarValorPregunta,
        isOpenCargaCatalogo,
        handleOpenCargaCatalogo,
        handleCloseCargaCatalogo,
        rowsConceptos,
        setMensajeAlert,
        handleisAlertOpen,
        handleExportarExcel,
        addConceptos,
        handleVerCatalogo,
        valoresCatalogo,
        isOpenVerCatalogo,
        handleCloseVerCatalogo        ,


        eliminarValorPreguntaConcepto,
        handleEliminarValorConcepto,
        setOpenModalConfirmEliminarValorConcepto,
        setTextModalConfirmEliminarValorConcepto,
        openModalConfirmEliminarValorConcepto,
        textModalConfirmEliminarValorConcepto
    }
}

export default useGestionObrasPage
