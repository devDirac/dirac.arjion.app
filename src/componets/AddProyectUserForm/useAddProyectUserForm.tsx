import { useEffect, useState, useCallback } from 'react';
import type { AddProyectUserFormProps } from './types'
import { useMaterialUIController } from 'context';
import { getAllUserAsociacion, getObrasConRelaciones, setAsociacion, unSetAsociacion } from '../../actions/proyectos';
import { getErrorHttpMessage } from '../../utils/index';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { setFlujo } from '../../actions/flujoInicial';
import { getUserNuevosAjustes } from '../../actions/auth';
import { setUser } from '../../actions/auth';


export const useAddProyectUserForm = (props: AddProyectUserFormProps) => {
    const intl = useIntl();
    const [controller] = useMaterialUIController();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector((state: any) => state?.app?.user?.data?.id || false);
    const token = useSelector((state: any) => state?.app?.user?.token || '');
    const [ususariosAsignados, setUsuariosAsignados] = useState<any>(null);
    const [isOpenUserAsinados, setOpenUserAsinados] = useState(false);
    const handleOpenUserAsinados = () => setOpenUserAsinados(true);
    const handleCloseUserAsinados = () => setOpenUserAsinados(false);
    const superAdministrador = useSelector((state: any) => state?.app?.user?.data?.tipo_usuario || [])?.find((e: any) => e?.id === 3);
    const espacio = useSelector((state: any) => state?.app?.espacio || null);
    const esFlujoInicial = useSelector((state: any) => state?.app?.flujoInicial || null);
    const esCoordinador = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 1);
    const esSupervisor = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 2);
    const esModoDios = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 3);
    const {
        darkMode
    } = controller;
    const textTo = intl.formatMessage({ id: 'catalogos_error_obtener' });
    const [obras, setObras] = useState<any[]>([]);
    const [procesando, setProcesando] = useState<boolean>(false);
    const [izquierda, setIzquierda] = useState<any[]>([]);

    const [esExito, setEsExito] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => {
        setIsAlertOpen(false)
        if (esExito && esFlujoInicial && (esFlujoInicial?.esCoordinador || esFlujoInicial?.esModoDios)) {
            setOpenModalConfirm(true);
            setTextModalConfirm(intl.formatMessage({ id: 'add_proyectos_usuario_pregunta_asignar_contrato' }));
        }
    };
    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [textModalConfirm, setTextModalConfirm] = useState('');

    const fetchingRemoveItems = async (data: any) => {
        try {
            await unSetAsociacion(data);
        } catch (error) {
            console.log('error', error);
        }
    }

    const fetchingSetItems = async (data: any) => {
        try {
            await setAsociacion(data);
        } catch (error) {
            console.log('error', error);
        }
    }

    const enAccion = async (propyectoid: any, left: any, right: any) => {
        try {
            setProcesando(true);
            let eliminaAsociacion = '';
            left.forEach((element: any) => {
                eliminaAsociacion += element?.id + ','
            });
            let creaAsociacion = '';
            right.forEach((element: any) => {
                creaAsociacion += element?.id + ','
            });
            eliminaAsociacion !== '' && await fetchingRemoveItems({ id_obra: propyectoid, usuarios: eliminaAsociacion });
            creaAsociacion !== '' && await fetchingSetItems({ id_obra: propyectoid, usuarios: creaAsociacion });
            await getObras();
            const user = await getUserNuevosAjustes(userId, token);
            dispatch(setUser(user));
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_general_operacion' }));
            setProcesando(false);
            handleisAlertOpen();
            setEsExito(true);
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_general_operacion' }));
            setProcesando(false);
            handleisAlertOpen();
            setEsExito(false);
        }
    }

    const getObras = useCallback(async () => {
        try {
            setProcesando(true);
            const obras = await getObrasConRelaciones();
            const userIzquieda = await getAllUserAsociacion();
            setIzquierda(userIzquieda);
            setObras(obras);
            setProcesando(false);
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || textTo);
            setProcesando(false);
            handleisAlertOpen();
        }
    }, [textTo]);

    useEffect(() => {
        getObras();
    }, [getObras]);

    return {
        obras,
        darkMode,
        enAccion,
        izquierda,
        procesando,
        isAlertOpen,
        handleisAlerClose,
        mensajeAlert,
        superAdministrador,
        espacio,
        navigate,
        intl,
        openModalConfirm,
        setOpenModalConfirm,
        textModalConfirm,
        setTextModalConfirm,
        esSupervisor,
        esCoordinador,
        esModoDios,
        dispatch,
        setFlujo,
        setUsuariosAsignados,
        handleOpenUserAsinados,
        handleCloseUserAsinados,
        isOpenUserAsinados,
        ususariosAsignados
    }
}
