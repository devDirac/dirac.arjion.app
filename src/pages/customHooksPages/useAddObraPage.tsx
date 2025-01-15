import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import { getUserNuevosAjustes, setAhut, setUser } from '../../actions/auth';
import moment from 'moment';
import ComplexProjectCard from '../../examples/Cards/ProjectCards/ComplexProjectCard'
import { getCatalogosGereicos, guardaCatalogoObras } from '../../actions/catalogos';
import { setCatalogo } from '../../actions/catalogos';
import { getErrorHttpMessage } from '../../utils';
import { useIntl } from 'react-intl';
import { useMaterialUIController } from 'context';

const useAddObraPage = () => {
    const intl = useIntl();
    const dispatch = useDispatch();
    const userId = useSelector((state: any) => state?.app?.user?.data?.id || false);
    const espacio = useSelector((state: any) => state?.app?.espacio || null);
    const permisoCrearProyecto = useSelector((state: any) => (state?.app?.user?.data?.permisos || [])?.find((e:any)=>e?.permiso === "Crear proyectos") );
    const token = useSelector((state: StoreType) => state?.app?.user?.token || '');
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [procesando, setProcesando] = useState<boolean>(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const [espacioGuardado, setEspacioGuardado] = useState<any>(null);
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => {
        setResetForm(false);         
        setIsAlertOpen(false)        
    };
    const [resetForm, setResetForm] = useState(false);

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

    const fetching = async () => {
        const catalogo = await getCatalogosGereicos('apm_obras');
        catalogo?.length && dispatch(setCatalogo(catalogo, 'apm_obras'));
    }

    const guardaCatalogoObra = async (data: any) => {
        try {
            setProcesando(true);
            const res = await guardaCatalogoObras(data);
            setEspacioGuardado(res?.id)
            await fetching();
            const user = await getUserNuevosAjustes(userId, token);
            dispatch(setUser(user));
            setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
            setProcesando(false);
            setResetForm(true);
            handleisAlertOpen();
        } catch (err) {
            const message = getErrorHttpMessage(err);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    return {
        espacio,
        configsButton,
        darkMode,
        setResetForm,
        resetForm,
        guardaCatalogoObra,
        handleisAlerClose,
        isAlertOpen,
        mensajeAlert,
        procesando,
        permisoCrearProyecto,
        setMensajeAlert,
        intl,
        setProcesando,
        espacioGuardado, setEspacioGuardado
    }
}

export default useAddObraPage
