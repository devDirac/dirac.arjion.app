import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import { setAhut } from '../../actions/auth';
import { getAllUserAsociacion } from '../../actions/proyectos';
import { getErrorHttpMessage } from '../../utils/index';
import { editUser, setActiveUser } from '../../actions/users';
import { useIntl } from 'react-intl';
import moment from 'moment';
import ComplexProjectCard from '../../examples/Cards/ProjectCards/ComplexProjectCard'
import _ from 'lodash';


const useAdminUsersPage = () => {
    const intl = useIntl();
    const get_elementos_error = intl.formatMessage({ id: 'get_elementos_error' });
    const token = useSelector((state: StoreType) => state?.app?.user?.token || '');
    const [procesando, setProcesando] = useState<boolean>(false);
    const [users, setUsers] = useState<any[]>([]);
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
            await editUser(data);
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_actualizar' }));
            getUsers();
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
            await setActiveUser(data);
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_actualizar_estatus' }));
            getUsers();
            handleisAlertOpen();
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_actualizar_estatus' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    };

    const getUsers = useCallback(async () => {
        try {
            setProcesando(true);
            const response = await getAllUserAsociacion();
            setUsers(response);
            setProcesando(false);
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || get_elementos_error);
            setProcesando(false);
            handleisAlertOpen();
        }
    }, [get_elementos_error]);

    useEffect(() => {
        getUsers();
    }, [getUsers]);
    const espacio = useSelector((state: any) => state?.app?.espacio || null);
    const configsButton: any = !_.isEmpty(espacio) ? (
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

    return {
        procesando,
        users,
        edit,
        deleteUser,
        isAlertOpen,
        handleisAlerClose,
        mensajeAlert,
        espacio,
        configsButton
    }
}

export default useAdminUsersPage
