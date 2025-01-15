import { useContext, useEffect, useState } from 'react'
import { getErrorHttpMessage } from '../../utils/index';
import { setCliente } from '../../actions/clientes';
import { useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import { setAhut } from '../../actions/auth';
import { useIntl } from 'react-intl';
import { perfilContext } from '../../context/perfilContexto';

const useAddClientePage = () => {
    const perfil = useContext(perfilContext);
    const intl = useIntl();
    const espacio = useSelector((state: any) => state?.app?.espacio || null);
    const [procesando, setProcesando] = useState<boolean>(false);
    const [resetForm,setResetForm]  = useState<boolean>(false);
    const token = useSelector((state: StoreType) => state?.app?.user?.token || '');
    const [isAlertOpen,setIsAlertOpen] = useState(false);
    const [mensajeAlert,setMensajeAlert] = useState('');
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);
    const setCliente_ = async (data:any) => {
        try {
            setProcesando(true);
            await setCliente({...data,...{perfil, id_obra:espacio?.id}});
            setResetForm(true);
            setProcesando(false);
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar_cliente' }));
            handleisAlertOpen();
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar_cliente' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    }
    useEffect(() => {
        setAhut(token);
    }, [token]);

    return {
        setResetForm,
        resetForm,
        procesando,
        setCliente_,
        isAlertOpen,
        handleisAlerClose,
        mensajeAlert,
        espacio
    }
}

export default useAddClientePage
