import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import moment from 'moment';
import ComplexProjectCard from '../../examples/Cards/ProjectCards/ComplexProjectCard';
import { useMaterialUIController } from 'context';
import { useNavigate } from 'react-router-dom';
import { setAhut } from '../../actions/auth';
import { StoreType } from '../../types/geericTypes';
import { useIntl } from 'react-intl';
import { getErrorHttpMessage } from '../../utils';
import { getAvancesPorConfirmarHttp } from '../../actions/avance';
import { numericFormatter } from 'react-number-format';

const useAvancesPorConfirmarPage = () => {

    const intl = useIntl();
    const navigate = useNavigate();
    const espacio = useSelector((state: any) => state?.app?.espacio || null);
    const token = useSelector((state: StoreType) => state?.app?.user?.token || '');
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [avances, setAvances] = useState([]);
    const [procesando, setProcesando] = useState<boolean>(false);
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
    const [mensajeAlert, setMensajeAlert] = useState<string>('');
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => {
        if(!avances?.length){
            navigate('/catalogo-de-conceptos-por-frentes');
         }
        setIsAlertOpen(false)
    };
    const contrato = useSelector((state: any) => state?.app?.contrato || null);
    const [conceptoParaConfirmar, setConceptoParaConfirmar] = useState<any>(null);
    const [frenteDetalle, setFrenteDetalle] = useState<any>(null);
    const [isAlertOpenConfirmarAvance, setIsAlertOpenConfirmarAvance] = useState<boolean>(false);
    const handleisAlertOpenConfirmarAvance = () => setIsAlertOpenConfirmarAvance(true);
    const handleisAlerCloseConfirmarAvance = () => setIsAlertOpenConfirmarAvance(false);
    const [idAvance, setIdAvance] = useState<number>(0);

    const esCoordinador = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 1);
    const esSupervisor = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 2);
    const esModoDios = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 3);

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
        setAhut(token);
    }, [token]);

    const getAvances = useCallback(async () => {
        try {
            setProcesando(true);
            const avancesPorConfirmar = await getAvancesPorConfirmarHttp(contrato?.id);
            setAvances(avancesPorConfirmar.filter((w: any) => esSupervisor ? w?.estatus === 1 : (esCoordinador || esModoDios) ? w?.estatus >= 1 : true).map((a: any) => {
                return {
                    detalleConcepto: a?.detalleConcepto,
                    frentes: a?.frentes || {},
                    fecha_registro: a?.fecha_registro,
                    usuario: a?.usuario,
                    concepto: a?.concepto,
                    cantidad_contrato: a?.cantidad_contrato,
                    cantidad_visual: a?.cantidad_visual,
                    cantidad_confirmada: a?.cantidad_confirmada,
                    comentarios: a?.comentarios,
                    descripcion_estatus: a?.descripcion_estatus,
                    estatus: a?.estatus,
                    avance: numericFormatter((+(a?.cantidad_confirmada / a?.cantidad_contrato) * 100) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, suffix: '%' }),
                    fecha_hora: a?.fecha_hora,
                    fecha_hora_c: a?.fecha_hora_c,
                    id: a?.id,
                    id_concepto: a?.id_concepto,
                    id_estimacion: a?.id_estimacion,
                    id_usuario: a?.id_usuario,
                    tipo: a?.tipo,
                    tipo_descripcion: a?.tipo_descripcion
                }
            }));
            if(!avancesPorConfirmar?.length){
                setMensajeAlert(intl.formatMessage({ id: 'general_sin_resultados_avances_confirmar' }));
                handleisAlertOpen();
             }
            setProcesando(false)
        } catch (error) {
            setProcesando(false);
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'get_elementos_error' }));
            handleisAlertOpen();
        }
    }, [contrato?.id, esCoordinador, esModoDios, esSupervisor]);

    useEffect(() => {
        getAvances();
    }, [getAvances])

    return {
        espacio,
        configsButton,
        darkMode,
        avances,
        setConceptoParaConfirmar,
        setFrenteDetalle,
        setIdAvance,
        handleisAlertOpenConfirmarAvance,
        handleisAlerClose,
        intl,
        isAlertOpen,
        mensajeAlert,
        procesando,
        handleisAlerCloseConfirmarAvance,
        isAlertOpenConfirmarAvance,
        navigate,
        conceptoParaConfirmar,
        contrato,
        frenteDetalle,
        idAvance
    }
}

export default useAvancesPorConfirmarPage
