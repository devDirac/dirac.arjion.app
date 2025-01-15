import { setAhut } from '../../actions/auth';
import { useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import ComplexProjectCard from '../../examples/Cards/ProjectCards/ComplexProjectCard';
import moment from 'moment';
import { useMaterialUIController } from 'context';
import { getErrorHttpMessage } from '../../utils';
import { useIntl } from 'react-intl';
import { getFrentesByIdContratoHttp, guardaFrenteHttp } from '../../actions/frentes';
import { useNavigate } from 'react-router-dom';
import { getContratoDetalleHttp, setContratoEspacio } from '../../actions/contratos';
import { perfilContext } from '../../context/perfilContexto';


const useAddFrentesPage = () => {
    const perfil = useContext(perfilContext);
    const intl = useIntl();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [frentes, setFrentes] = useState<any[]>([]);
    const [errorFlujo, setErrorFlujo] = useState<boolean>(false);
    const [errorFlujoContrato, setErrorFlujoContrato] = useState<boolean>(false);
    const [procesando, setProcesando] = useState<boolean>(false);
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
    const [mensajeAlert, setMensajeAlert] = useState<string>('');
    const esSupervisor = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 2);
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => {
        if (errorFlujo) {
            navigate('/inicio');
        }
        if (errorFlujoContrato) {
            navigate('/sesion-trabajo-contratos');
        }
        setIsAlertOpen(false);
    };
    const espacio = useSelector((state: any) => state?.app?.espacio || null);
    const token = useSelector((state: StoreType) => state?.app?.user?.token || '');
    const contrato = useSelector((state: any) => state?.app?.contrato || null);

    useEffect(() => {
        setAhut(token);
    }, [token]);


    const handleSelectContrato = useCallback((data: any) => {
        setProcesando(true);
        moment.locale('es', {
            months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
            monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
            weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
            weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
            weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
        } as any
        );
        const dates = data?.usuarios_asignados || [];
        let maximumDate = data?.usuarios_asignados?.length > 0 ? new Date(Math.max.apply(null, dates.map((e: any) => new Date(e.fecha_registro)))) : null;
        let minimumDate = data?.usuarios_asignados?.length > 0 ? new Date(Math.min.apply(null, dates.map((e: any) => new Date(e.fecha_registro)))) : null;
        dispatch(setContratoEspacio({
            id: data?.id,
            id_contrato:data?.id_contrato,
            tipo_contrato:data?.tipo_contrato,
            fecha_contrato:data?.fecha_contrato,
            id_tipo_contrato:data?.id_tipo_contrato,
            modalidad:data?.modalidad,
            numero:data?.numero,
            moneda:data?.moneda,
            clave_presupuestaria:data?.clave_presupuestaria,
            asignacion_iva:data?.asignacion_iva,
            oficina_pagadora:data?.oficina_pagadora,
            anticipo:data?.anticipo,
            amortizacion:data?.amortizacion,
            fondo_gtia:data?.fondo_gtia,
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
            importe:+(data?.importe || 0),
            tolerancia:data?.tolerancia || 0,
            actividades:data?.actividades || [],
            avances_pendientes_estimar:data?.avances_pendientes_estimar || 0
        }));
        setTimeout(() => {
            setProcesando(false);
        }, 400);
    }, [dispatch]);

    const guardaFrente = async (data: any) => {
        try {
            setProcesando(true);
            await guardaFrenteHttp({ ...data, ...{ id_contrato: contrato?.id, perfil } });
            const contratos: any = await getContratoDetalleHttp(esSupervisor);
            const contrato_ = contratos.filter((e_: any) => e_?.id === +(contrato?.id||0)).map((e: any) => {
                return {
                    ...e, ...{
                        fecha_inicio: (new Date(e?.fecha_inicio || '')).toISOString().split('T')[0],
                        fecha_final: (new Date(e?.fecha_final || '')).toISOString().split('T')[0],
                        fecha_limite: (new Date(e?.fecha_limite || '')).toISOString().split('T')[0],
                        autorizado: e?.autorizado + "",
                        terminado: e?.terminado + "",
                        id_tipo_proyecto: e?.id_tipo_proyecto + "",
                        id_contratista: e?.id_contratista + "",
                        alertas: e?.alertas + "",
                        estatus: e?.estatus + "",
                        id_autorizador: e?.id_autorizador + "",
                        id_cliente: e?.id_cliente + "",
                        id_especialidad: e?.id_especialidad + "",
                        id_obra_principal: e?.id_obra_principal + "",
                        id_responsable: e?.id_responsable + "",
                        id_tipo_contrato: e?.id_tipo_contrato + "",
                        moneda: e?.moneda + "",
                        pep: e?.pep ? (e?.pep + "") : null,
                        propietario: e?.propietario + "",
                        reclasificacion: e?.reclasificacion + "",
                        tipo_contrato_ext: e?.tipo_contrato_ext + "",
                        plantilla: e?.plantilla + "",
                        clasificacion_contrato: e?.clasificacion_contrato ? (e?.clasificacion_contrato + "") : null,
                        tolerancia: e?.tolerancia + "",
                        programa_financiero:e?.programa_financiero+""
                    }
                }
            });
            handleSelectContrato(contrato_?.[0]);
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
            handleisAlertOpen();
            setProcesando(false);
            getDataFrentes();
        } catch (error) {
            setProcesando(false);
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
            handleisAlertOpen();
        }
    }

    const getDataFrentes = useCallback(async () => {
        try {
            setProcesando(true);
            const frentes = await getFrentesByIdContratoHttp(contrato?.id);
            setFrentes(frentes);
            setProcesando(false);
        } catch (err) {
            setProcesando(false);
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
            handleisAlertOpen();
        }
    }, [contrato])


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
    ) as any : null;

    useEffect(() => {
        getDataFrentes();
    }, [getDataFrentes]);

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
    }, [espacio, contrato]);

    useEffect(() => {
        validaContratoSeleccionado();
    }, [validaContratoSeleccionado]);

    return {
        espacio,
        configsButton,
        darkMode,
        frentes,
        procesando,
        handleisAlerClose,
        isAlertOpen,
        mensajeAlert,
        guardaFrente
    }
}

export default useAddFrentesPage
