import { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import { setAhut } from '../../actions/auth';
import moment from 'moment';
import ComplexProjectCard from '../../examples/Cards/ProjectCards/ComplexProjectCard'
import { getContratoDetalleByIdContratoHttp, getContratoDetalleByIdContratoSupervisorHttp, setContratoEspacio } from '../../actions/contratos';
import { getErrorHttpMessage } from '../../utils';
import { useIntl } from 'react-intl';
import { useMaterialUIController } from 'context';
import { useNavigate } from 'react-router-dom';
import { setFlujo } from '../../actions/flujoInicial';
import { setMenuRoutes } from '../../actions/menu';
import routes from '../../routes';

const useContratosPage = () => {
    const intl = useIntl();
    const textTo = intl.formatMessage({ id: 'repositorio_obten_documentos' });
    const noContratos = intl.formatMessage({ id: 'contratos_page_no_contratos_asignados' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const espacio = useSelector((state: any) => state?.app?.espacio || null);
    const token = useSelector((state: StoreType) => state?.app?.user?.token || '');
    const [procesando, setProcesando] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => {
        if (esSupervisor && !data?.length) {
            navigate('/inicio');
        }
        setIsAlertOpen(false);
    };

    const [isAlertOpenAsignados, setIsAlertOpenAsignados] = useState(false);
    const handleisAlertOpenAsignados = () => setIsAlertOpenAsignados(true);
    const handleisAlerCloseAsignados = () => setIsAlertOpenAsignados(false);
    const [dataAsignados, setDataAsignados] = useState<any>([]);

    const [controller] = useMaterialUIController();
    const { darkMode } = controller;

    const esCoordinador = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 1);
    const esSupervisor = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 2);
    const esModoDios = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 3);
    const esContratista = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 5);
    const esCliente = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 4);
    const esCalidad = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 7);
    const contratosUsuario = useSelector((state: any) => state?.app?.user?.data?.perfiles_contratos || []);
    const contratoSeleccionado = useSelector((state: any) => state?.app?.contrato || {});
    const getData = useCallback(async () => {
        try {
            setProcesando(true);
            let contratos: any = null;
            if (esCoordinador || esModoDios || esContratista) {
                contratos = await getContratoDetalleByIdContratoHttp(espacio?.id, esSupervisor);
            }
            if (esSupervisor || esCliente || esCalidad) {
                contratos = await getContratoDetalleByIdContratoSupervisorHttp(espacio?.id, esSupervisor);
                if (!contratos.length) {
                    setMensajeAlert(noContratos);
                    handleisAlertOpen();
                }
            }
            setData(contratos);
            setProcesando(false);
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || textTo);
            setProcesando(false);
            handleisAlertOpen();
        }
    }, [espacio?.id, esCoordinador, esModoDios, esSupervisor, noContratos, textTo, esCalidad]);

    useEffect(() => {
        setAhut(token);
    }, [token]);

    useEffect(() => {
        getData();
    }, [getData]);

    const handleSelectContrato = (data: any) => {
        const perfilContratoSeleccion = contratosUsuario.find((r: any) => r?.id_contrato === data?.id);
        setProcesando(true);
        moment.locale('es', {
            months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
            monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
            weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
            weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
            weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
        });
        const dates = data?.usuarios_asignados || [];
        let maximumDate = data?.usuarios_asignados?.length > 0 ? new Date(Math.max.apply(null, dates.map((e: any) => new Date(e.fecha_registro)))) : null;
        let minimumDate = data?.usuarios_asignados?.length > 0 ? new Date(Math.min.apply(null, dates.map((e: any) => new Date(e.fecha_registro)))) : null;
        dispatch(setContratoEspacio({
            id: data?.id,
            id_contrato: data?.id_contrato,
            tipo_contrato: data?.tipo_contrato,
            fecha_contrato: data?.fecha_contrato,
            id_tipo_contrato: data?.id_tipo_contrato,
            modalidad: data?.modalidad,
            numero: data?.numero,
            moneda: data?.moneda,
            clave_presupuestaria: data?.clave_presupuestaria,
            asignacion_iva: data?.asignacion_iva,
            oficina_pagadora: data?.oficina_pagadora,
            anticipo: data?.anticipo,
            amortizacion: data?.amortizacion,
            fondo_gtia: data?.fondo_gtia,
            contrato: data?.contrato,
            fecha_registro: moment(data?.fecha_registro).format('MMMM DD YYYY, H:mm:ss'),
            estatus_parametro: data?.estatus_parametro,
            fecha_registro_parametro: moment(data?.fecha_registro_parametro).format('MMMM DD YYYY, H:mm:ss'),
            usuarios_asignados: data?.usuarios_asignados?.length,
            fecha_usuarios_asignados: data?.usuarios_asignados?.length === 0 ? '' : data?.usuarios_asignados?.length === 1 ? `${moment(maximumDate).format('MMMM DD YYYY, H:mm:ss')}` : `${moment(minimumDate).format('MMMM DD YYYY, H:mm:ss')} y ${moment(maximumDate).format('MMMM DD YYYY, H:mm:ss')}`,
            pep: data?.pep,
            pep_nombre: data?.nombre_pep,
            pep_fecha_registro: moment(data?.fecha_registro).format('MMMM DD YYYY, H:mm:ss'),
            clasificacion_contrato: data?.clasificacion_contrato,
            nombre_clasificacion_contrato: data?.nombre_clasificacion_contrato,
            clasificacion_contrato_fecha_registro: moment(data?.fecha_registro).format('MMMM DD YYYY, H:mm:ss'),
            frentes: data?.frentes,
            frentes_fecha_registro: moment(data?.frentes_fecha_registro).format('MMMM DD YYYY, H:mm:ss'),
            catalogo_conceptos: data?.catalogo_conceptos,
            catalogo_conceptos_fecha_registro: moment(data?.catalogo_conceptos_fecha_registro).format('MMMM DD YYYY, H:mm:ss'),
            programa_financiero: data?.programa_financiero,
            programa_financiero_fecha_registro: data?.programa_financiero_fecha_registro,
            id_especialidad: data?.id_especialidad,
            id_especialidad_fecha_registro: moment(data?.fecha_registro).format('MMMM DD YYYY, H:mm:ss'),
            nombre_especialidad_contrato: data?.nombre_especialidad,
            avances_confirmados: data?.avances_confirmados || 0,
            avances_por_confirmar: data?.avances_por_confirmar || 0,
            contratista: data?.contratista || '',
            importe: +(data?.importe || 0),
            tolerancia: data?.tolerancia || 0,
            actividades: data?.actividades || [],
            avances_pendientes_estimar: data?.avances_pendientes_estimar || 0,
        }));
        setTimeout(() => {
            setProcesando(false);
            dispatch(setFlujo({ paso: 4, desc: 'Se selecciono un contrato', esCoordinador, esSupervisor, esModoDios }));
            if (esCalidad) {
                dispatch(setMenuRoutes(routes.find((e: any) => e?.key === 'conceptos')));
                navigate(`/alta-documentos-calidad`);
            } else {
               handleRedireccion(perfilContratoSeleccion);
            }
        }, 400);
    }

    const handleRedireccion = (perfilRedireccion: any) => {
        switch (perfilRedireccion?.pagina_aterrizaje || '') {
            case 'Principal de conceptos':
                dispatch(setMenuRoutes(routes.find((e: any) => e?.key === 'parametros-sistema')));
                navigate(`/catalogo-de-conceptos-por-frentes`);
                break;
            case 'Dashboard':
                dispatch(setMenuRoutes(routes.find((e: any) => e?.key === 'Indicadores financieros y de productividad')));
                navigate(`/dashboard-apm-info`);
                break;
            case 'Archivos compartidos':
                dispatch(setMenuRoutes(routes.find((e: any) => e?.key === 'expediente-unico')));
                navigate(`/navegacion`);
                break;
            case 'Pantalla contratista':
                dispatch(setMenuRoutes(routes.find((e: any) => e?.key === 'estimaciones')));
                navigate(`/realizar-estimacion`);
                break;
            case 'Pantalla cliente':
                dispatch(setMenuRoutes(routes.find((e: any) => e?.key === 'estimaciones')));
                navigate(`/relacion-estimaciones`);
                break;
            case 'Dashboard de proyecto':
                dispatch(setMenuRoutes(routes.find((e: any) => e?.key === 'Indicadores financieros y de productividad')));
                navigate(`/dashboard-apm-info`);
                break;
            default:
                dispatch(setMenuRoutes(routes.find((e: any) => e?.key === 'Indicadores financieros y de productividad')));
                navigate(`/dashboard-apm-info`);
                break;
        }
    }

    const configsButton: any = espacio ? (
        <ComplexProjectCard
            muestraAvances
            image={espacio?.foto}
            title={espacio?.obra}
            contratos={espacio?.ctaAsignados}
            element={espacio}
            description={espacio?.descripcion}
            dateTime={moment(espacio?.fecha_fin).format("DD-MM-YYYY")}
            members={espacio?.asignados}
        />
    ) : null;

    return {
        espacio,
        configsButton,
        darkMode,
        data,
        handleSelectContrato,
        procesando,
        handleisAlerClose,
        isAlertOpen,
        mensajeAlert,
        intl,
        setDataAsignados,
        handleisAlertOpenAsignados,
        handleisAlerCloseAsignados,
        isAlertOpenAsignados,
        dataAsignados
    }
}

export default useContratosPage
