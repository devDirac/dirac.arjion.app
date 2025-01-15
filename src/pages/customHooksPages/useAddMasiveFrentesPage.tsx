import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver';
import { useCallback, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { StoreType } from '../../types/geericTypes'
import { setAhut } from '../../actions/auth'
import ComplexProjectCard from '../../examples/Cards/ProjectCards/ComplexProjectCard'
import moment from 'moment'
import { useMaterialUIController } from 'context'
import { useIntl } from 'react-intl'
import { getErrorHttpMessage } from '../../utils';
import { getFrentesByIdContratoHttp, guardaFrenteHttp } from '../../actions/frentes';
import { useNavigate } from 'react-router-dom';
import readXlsxFile from 'read-excel-file'
import _ from 'lodash';
import { guardaConceptoHttp } from '../../actions/conceptos';
import { perfilContext } from '../../context/perfilContexto';

const useAddMasiveFrentesPage = () => {
    const perfil = useContext(perfilContext);
    const navigate = useNavigate();
    const intl = useIntl();
    const columns = ["inciso", "concepto", "descripcion", "unidad", "cantidad", "pu", "fecha_inicio", "fecha_fin", "frente"];
    const [data, setData] = useState<any[]>([]);
    const [procesando, setProcesando] = useState<boolean>(false);
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
    const [mensajeAlert, setMensajeAlert] = useState<string>('');
    const [errorFlujoContrato, setErrorFlujoContrato] = useState<boolean>(false);
    const [errorFlujo, setErrorFlujo] = useState<boolean>(false);
    const [file, setFile] = useState<any>();
    const espacio = useSelector((state: any) => state?.app?.espacio || null);
    const token = useSelector((state: StoreType) => state?.app?.user?.token || '');
    const contrato = useSelector((state: any) => state?.app?.contrato || null);
    const [frentesError, setFrentesError] = useState<any[]>([]);
    const [erroresToShow, setErroresToShow] = useState<any[]>([]);
    const [banderaEsProcesoCompletado, setBanderaEsProcesoCompletado] = useState<boolean>(false);
    const [rowsConceptos, setRowsConceptos] = useState<any[]>([]);
    const [importeCatalogo, setImporteCatalogo] = useState<string>('');
    const [diferencia, setDiferencia] = useState<string>('');
    const [tolerancia, setTolerancia] = useState<string>('');
    const [openMuestraTolerancia, setopenMuestraTolerancia] = useState<boolean>(false);

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
    const catalogoTipoConceptos = useSelector((state: StoreType) => {
        return state?.app?.catalogos?.["apm_cat_tipo_concepto"] || [];
    });
    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [textModalConfirm, setTextModalConfirm] = useState('');
    const [isAlertOpenErrores, setIsAlertOpenErrores] = useState<boolean>(false);
    const handleisAlertOpenErrores = () => setIsAlertOpenErrores(true);
    const handleisAlerCloseErrores = () => {
        setIsAlertOpenErrores(false)
        if (!banderaEsProcesoCompletado) {
            setFrentesError([]);
            handleAddConceptos()
        }
    };
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => {
        if (errorFlujo) {
            navigate('/inicio');
        }
        if (errorFlujoContrato) {
            navigate('/sesion-trabajo-contratos');
        }
        setIsAlertOpen(false);
        if (frentesError.length) {
            handleisAlertOpenErrores();
        } else if (!banderaEsProcesoCompletado) {
            handleAddConceptos()
        }
    };
    useEffect(() => {
        setAhut(token);
    }, [token]);

    const configsButton: any = espacio ? (
        <ComplexProjectCard
            muestraAvances
            image={espacio?.foto}
            title={espacio?.obra}
            element={espacio}
            contratos={espacio?.ctaAsignados}
            description={espacio?.descripcion}
            dateTime={moment(espacio?.fecha_fin).format("DD-MM-YYYY")}
            members={espacio?.asignados}
        />
    ) as any : null;

    const validaContratoSeleccionado = useCallback(() => {
        if (!espacio) {
            setErrorFlujo(true);
            setMensajeAlert(intl.formatMessage({ id: 'general_mensaje_navega_sin_espacio' }));
            handleisAlertOpen();
        }
        if (espacio && !contrato) {
            setErrorFlujoContrato(true);
            setMensajeAlert(intl.formatMessage({ id: 'general_mensaje_navega_sin_contrato' }));
            handleisAlertOpen();
        }
    }, [espacio, contrato])

    useEffect(() => {
        validaContratoSeleccionado();
    }, [validaContratoSeleccionado]);

    const handleExportarExcelErrores = () => {
        const datosFrentes = erroresToShow.filter((e: any) => !e.hasOwnProperty('inciso')).map((ew: any) => {
            return {
                frente: ew?.frente,
                descripcion: ew?.descripcion,
                error: ew?.error,
            }
        })
        const datosConceptos = erroresToShow.filter((e: any) => e.hasOwnProperty('inciso')).map((ew: any) => {
            return {
                inciso: ew?.inciso,
                concepto: ew?.concepto,
                descripcion: ew?.descripcion,
                frente: ew?.frente,
                error: ew?.error,
            }
        });
        const worksheet = XLSX.utils.json_to_sheet(datosFrentes);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Frentes');
        const worksheetDos = XLSX.utils.json_to_sheet(datosConceptos);
        XLSX.utils.book_append_sheet(workbook, worksheetDos, 'Conceptos');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, `${'Detalle de frentes y conceptos no registrados'}.xlsx`);
    }

    const handleExportarExcel = () => {
        const data_ = [
            {
                frente: 'Nombre del frente HOJA 1',
                descripcion: 'Descripción del frente',
                fecha_inicio: '01/01/2024',
                fecha_final: '31/01/2024',
                clasificacion: 'nombre de la clasificación exacto',
                especialidad: 'Nombre exacto de la especialidad',
                frente_padre: 'Nombre exacto del frente, en caso de ser un sub frente'
            }
        ]
        const dataDos = [
            {
                inciso: 'CODC001',
                concepto: 'CODC001',
                descripcion: 'Superintendente del Servicio',
                unidad: 'MES',
                cantidad: '16.00',
                pu: '89,672.59',
                fecha_inicio: '01/01/2024',
                fecha_fin: '31/01/2024',
                frente: 'Nombre del frente HOJA 1'
            }
        ]
        const worksheet = XLSX.utils.json_to_sheet(data_);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja 1');
        const worksheetDos = XLSX.utils.json_to_sheet(dataDos);
        XLSX.utils.book_append_sheet(workbook, worksheetDos, 'Hoja 2');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, `${'Documento de ejemplo para la carga masiva de frentes'}.xlsx`);
    }

    const addFrentePregunta = (data: any[], file: File) => {
        setTextModalConfirm('La validación del archivo de excel fue exitosa, ¿Desea cargar la información de este archivo?');
        setData(data);
        setOpenModalConfirm(true);
        setFile(file)
    }

    const addFrentes = async () => {
        setErroresToShow([]);
        setBanderaEsProcesoCompletado(false)
        setOpenModalConfirm(false);
        setProcesando(true);
        const errores: any[] = [];
        await data.reduce(async (_: any, cat: any) => {
            try {
                await _;
                const frentes_ = await getFrentesByIdContratoHttp(contrato?.id);
                const id_frente = frentes_.find((f: any) => f?.frente === cat?.[6])?.id || '0';
                const id_clasificacion = clasificaciones.find((c: any) => c?.nombre === cat?.[4])?.id || '0';
                const id_especialidad = catalogoEspecialidades.find((c: any) => c?.nombre === cat?.[5])?.id || '0';
                const frenteAlta = {
                    frente: cat?.[0] || '',
                    descripcion: cat?.[1] || '',
                    fecha_inicio: moment(cat?.[2] || new Date()).add(1, 'days').format("YYYY-MM-DD"),
                    fecha_final: moment(cat?.[3] || new Date()).add(1, 'days').format("YYYY-MM-DD"),
                    id_clasificacion: id_clasificacion + "",
                    id_especialidad: id_especialidad + "",
                    id_frente: id_frente + "",
                    id_contrato: contrato?.id + ""
                };
                await guardaFrenteHttp(frenteAlta);
            } catch (error: any) {
                const message = getErrorHttpMessage(error);
                const frenteErrorAdd = { ...error?.response?.data?.data, ...{ error: message || intl.formatMessage({ id: 'http_error_registrar' }) } };
                errores.push(frenteErrorAdd)
            }
        }, Promise.resolve());
        setProcesando(false);
        setFrentesError(errores);
        setMensajeAlert(errores.length ? 'Hay frentes que no se registrarón' : 'Exito al registrar los frentes');
        setErroresToShow(errores);
        handleisAlertOpen();
    };

    const sumaImporteConceptos = (conceptos: any) => {
        const importeConceptos = conceptos.reduce((a: any, c: any) => {
            return a + ((+c?.[4]) * (+c?.[5]))
        }, 0);
        return importeConceptos;
    }

    const addConceptos = async (conceptos: any) => {
        setopenMuestraTolerancia(false);
        setProcesando(true);
        const errores: any[] = [];
        await conceptos.reduce(async (_: any, cat: any) => {
            try {
                await _;
                const frentes_ = await getFrentesByIdContratoHttp(contrato?.id);
                const id_frente = frentes_.find((f: any) => f?.frente === cat?.[8])?.id || '0';
                const tipo_concepto = catalogoTipoConceptos.find((c: any) => c?.nombre === 'Original')?.id || '0';
                const conceptoAlta = {
                    inciso: cat?.[0],
                    id_contrato: contrato?.id + "",
                    id_frente: id_frente + "",
                    concepto: cat?.[1],
                    descripcion: cat?.[2],
                    unidad: cat?.[3],
                    cantidad: cat?.[4],
                    pu: cat?.[5],
                    fecha_inicio: moment(cat?.[6] || new Date()).add(1, 'days').format("YYYY-MM-DD"),
                    fecha_fin: moment(cat?.[7] || new Date()).add(1, 'days').format("YYYY-MM-DD"),
                    linea_base: moment(cat?.[7] || new Date()).add(1, 'days').format("YYYY-MM-DD"),
                    tipo_concepto: tipo_concepto + "",
                    homologado: 0,
                    cerrado: 0,
                    plaza: 0,
                    tarea: 0,
                    frente: cat?.[8]
                };
                await guardaConceptoHttp({...conceptoAlta,...{perfil}});
            } catch (error: any) {
                const message = getErrorHttpMessage(error);
                const conceptoErrorAdd = { ...error?.response?.data?.data, ...{ error: message || intl.formatMessage({ id: 'http_error_registrar' }) } };
                errores.push(conceptoErrorAdd)
            }
        }, Promise.resolve());
        setProcesando(false);
        setFrentesError(errores);
        setMensajeAlert(errores.length ? 'Hay conceptos que no se registrarón' : 'Exito al registrar los conceptos');
        handleisAlertOpen();
        setBanderaEsProcesoCompletado(true);
        setErroresToShow(oldErrores => [...oldErrores, ...errores]);
    }

    const handleAddConceptos = async () => {
        readXlsxFile(file, { sheet: 2 }).then(async (rows: any) => {
            if (_.isEqual(rows[0], columns)) {
                rows.shift();
                setRowsConceptos(rows);
                const sumaImporteCo = sumaImporteConceptos(rows);
                const tmp = contrato?.tolerancia + '';
                const posString = tmp.indexOf('.');
                const toleranciaSinDecimales = posString === -1 ? contrato?.tolerancia + '' : (contrato?.tolerancia + '').substring(0, posString);
                const tolerancia_g = (toleranciaSinDecimales + '').length === 1 ? '0' + toleranciaSinDecimales : toleranciaSinDecimales;
                const estimadoConPorcentajeAnticipoAplicado = (contrato?.importe === '' ? 0 : isNaN(+contrato?.importe) ? 0 : +contrato?.importe) * (+('0.' + tolerancia_g));
                if ((contrato?.importe - sumaImporteCo) < 0) {
                    setImporteCatalogo(sumaImporteCo + '')
                    setDiferencia((contrato?.importe - sumaImporteCo) + '');
                    setTolerancia(estimadoConPorcentajeAnticipoAplicado + '')
                    setopenMuestraTolerancia(true)
                }else{
                    addConceptos(rows)
                }
            } else {
                setBanderaEsProcesoCompletado(true)
                setMensajeAlert('La hoja dos del documento no cumple con el layout esperado, ajuste el archivo y vuelva a intentarlo');
                handleisAlertOpen();
            }
        }).catch(() => {
            setBanderaEsProcesoCompletado(true)
            setMensajeAlert('La hoja dos del documento no cumple con el layout esperado, ajuste y vuelva a intentarlo ');
            handleisAlertOpen();
        });

    }
    return {
        espacio,
        configsButton,
        darkMode,
        handleExportarExcel,
        handleExportarExcelErrores,
        erroresToShow,
        setMensajeAlert,
        addFrentes,
        handleisAlertOpen,
        handleisAlerClose,
        procesando,
        setOpenModalConfirm,
        setTextModalConfirm,
        setData,
        isAlertOpen,
        mensajeAlert,
        addFrentePregunta,
        openModalConfirm,
        textModalConfirm,
        handleisAlerCloseErrores,
        isAlertOpenErrores,
        frentesError,

        importeCatalogo,
        diferencia,
        tolerancia,
        openMuestraTolerancia,
        addConceptos,
        rowsConceptos,
        setopenMuestraTolerancia
    }
}

export default useAddMasiveFrentesPage
