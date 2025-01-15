import { useCallback, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import { setAhut } from '../../actions/auth';
import { getErrorHttpMessage } from '../../utils/index';
import { editCliente, editEstatusCliente, getClientes } from '../../actions/clientes';
import { useIntl } from 'react-intl';
import { perfilContext } from '../../context/perfilContexto';


const useAdminClientesPage = () => {
    const perfil = useContext(perfilContext);
    const intl = useIntl();
    const espacio = useSelector((state: any) => state?.app?.espacio || null);
    const catalogos_error_obtener = intl.formatMessage({ id: 'catalogos_error_obtener' });
    const token = useSelector((state: StoreType) => state?.app?.user?.token || '');
    const [procesando, setProcesando] = useState<boolean>(false);
    const [clientes, setClientes] = useState<any[]>([]);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);

    useEffect(() => {
        setAhut(token);
    }, [token]);


    const edit = async (data: any) => {
        try {
            setProcesando(true);
            await editCliente({...data,...{perfil}});
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_actualizar' }));
            getClientesState();
            handleisAlertOpen();
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_actualizar' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    };


    const deleteUser = async (data: any) => {
        try {
            setProcesando(true);
            await editEstatusCliente(data);
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_actualizar' }));
            getClientesState();
            handleisAlertOpen();
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_actualizar' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    };

    const getClientesState = useCallback(async () => {
        try {
            setProcesando(true);
            const response = await getClientes();
            setClientes(response);
            setProcesando(false);
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || catalogos_error_obtener);
            setProcesando(false);
            handleisAlertOpen();
        }
    }, [catalogos_error_obtener]);

    useEffect(() => {
        getClientesState();
    }, [getClientesState]);

    return {
        procesando,
        clientes,
        edit,
        deleteUser,
        isAlertOpen,
        handleisAlerClose,
        mensajeAlert,
        espacio
    }
}

export default useAdminClientesPage
