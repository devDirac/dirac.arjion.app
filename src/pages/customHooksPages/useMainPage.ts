import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setEspacioTrabajo } from '../../actions/espacioTrabajo'
import { useIntl } from 'react-intl';
import logo from "assets/images/logo.png";
import { setAhut } from '../../actions/auth';
import { useNavigate } from "react-router-dom";
import { setFlujo } from '../../actions/flujoInicial';
import { setContratoEspacio } from '../../actions/contratos';
import { getEspacioUtilizadoProyectoHTTP, getFotoProyectoHTTP } from '../../actions/proyectos';

const useMainPage = () => {

    const intl = useIntl();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userName = useSelector((state: any) => state?.app?.user?.data?.name || false);
    const fotoUser = useSelector((state: any) => state?.app?.user?.data?.foto || logo);
    const perfilUser = useSelector((state: any) => state?.app?.user?.data?.tipo_usuario?.[0]?.tipo || '');
    const proyectosUser = useSelector((state: any) => state?.app?.user?.data?.proyectos || []);
    const token = useSelector((state: any) => state?.app?.user?.token || '');
    const espacio = useSelector((state: any) => state?.app?.espacio || null);
    const [proyectosUser_,setProyectosUser_] = useState<any>([]);
    const esCoordinador = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 1);
    const esSupervisor = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 2);
    const esModoDios = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 3);
    const [procesando,setProcesando] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => {
        setIsAlertOpen(false);
        if ((esCoordinador || esModoDios) && (espacio?.asignados === 0 || !espacio?.asignados)) {
            setOpenModalConfirm(true);
            setTextModalConfirm(intl.formatMessage({ id: 'main_page_pregunta_asignar_usuarios' }));
        } else {
            dispatch(setFlujo(null));
            navigate(`/sesion-trabajo-contratos`);
        }

    };

    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [textModalConfirm, setTextModalConfirm] = useState('');

    const handleEstablecerEspacioDeTrabajo = async (proyecto: any) => {
        try {
            setProcesando(true);
            const espacio = await getEspacioUtilizadoProyectoHTTP(proyecto?.id)
            dispatch(setFlujo({ paso: 1, desc: 'Se selecciono un proyecto', esCoordinador, esSupervisor, esModoDios }));
            dispatch(setEspacioTrabajo({ ...proyecto, ...{ espacio: espacio?.data } }));
            dispatch(setContratoEspacio(null));
            setMensajeAlert(`${intl.formatMessage({ id: 'main_page_se_establecio_espacio_1' })} (` + proyecto?.obra + `) ${intl.formatMessage({ id: 'main_page_se_establecio_espacio_2' })}`);
            handleisAlertOpen();
            setProcesando(false);
        } catch (error) {
            dispatch(setFlujo({ paso: 1, desc: 'Se selecciono un proyecto', esCoordinador, esSupervisor, esModoDios }));
            dispatch(setEspacioTrabajo({ ...proyecto, ...{ espacio: 0 } }));
            dispatch(setContratoEspacio(null));
            setMensajeAlert(`${intl.formatMessage({ id: 'main_page_se_establecio_espacio_1' })} (` + proyecto?.obra + `) ${intl.formatMessage({ id: 'main_page_se_establecio_espacio_2' })}`);
            handleisAlertOpen();
            setProcesando(false);
        }
    }

    const setFlujoToNull = useCallback(() => {
        dispatch(setFlujo(null));
    }, [dispatch]);

    useEffect(() => {
        setAhut(token);
        setFlujoToNull();
    }, [token, setFlujoToNull]);

    const setProytectoFoto = useCallback(async() => {
        try {
            setProcesando(true);
            const users___:any = [];
            await (proyectosUser || []).reduce(async (_: any, d: any) => {
                try {
                  await _;
                  const foto = await getFotoProyectoHTTP(d?.id);
                  users___.push({
                    ...d,
                    ...{ foto: foto?.data?.[0]?.foto || '' }
                })
                } catch (error: any) {
                    users___.push({
                        ...d,
                        ...{ foto: '' }
                    })
                }
              }, Promise.resolve());
              setProyectosUser_(users___);
              setProcesando(false);
        } catch (error) {
            setProcesando(false);
            console.log('error al obtener la foto', error)
        }
    }, [])

    useEffect(() => {
        setProytectoFoto()
    }, [proyectosUser])

    return {
        userName,
        fotoUser,
        perfilUser,
        intl,
        proyectosUser,
        handleEstablecerEspacioDeTrabajo,
        navigate,
        setOpenModalConfirm,
        setTextModalConfirm,
        openModalConfirm,
        textModalConfirm,
        handleisAlerClose,
        isAlertOpen,
        mensajeAlert,
        esSupervisor,
        esCoordinador,
        esModoDios,
        dispatch,
        setFlujo,
        proyectosUser_,
        setProyectosUser_,
        procesando,
        setProcesando
    }
}

export default useMainPage
