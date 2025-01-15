import { useCallback, useEffect, useState } from "react";
import { getUserPermisos, removeUserPermisos, setUserPermisos } from "../../actions/users";
import { getErrorHttpMessage } from "../../utils";
import { useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import { setAhut } from '../../actions/auth';
import { useIntl } from "react-intl";


export const usePermisosUsuarioPage = () => {
    const intl = useIntl();
    const espacio = useSelector((state: any) => state?.app?.espacio || null);
    const [dataUsuarios, setDataUsuarios] = useState<any[]>([]);
    const [procesando, setProcesando] = useState<boolean>(false);
    const [isAlertOpen,setIsAlertOpen] = useState(false);
    const [mensajeAlert,setMensajeAlert] = useState('');
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);
    const token = useSelector((state: StoreType) => state?.app?.user?.token || '');
    
    useEffect(() => {
        setAhut(token);
      }, [token]);


    const handelAccion = async(accion:string,row:any,permiso?:number)=> {
        try {
            const objectCreate = {id_permiso:permiso, id_usuario:row?.id};
            const accionTipo = accion.split('-')?.[1];
            if(accionTipo === 'add'){
                setProcesando(true);
                await setUserPermisos(objectCreate);
                getDatosUsuariosPermisos();
                setMensajeAlert(intl.formatMessage({ id: 'permiso_usuario_exito_asignacion' }));
                setProcesando(false);
                handleisAlertOpen();
            }
            if(accionTipo === 'remove'){
                setProcesando(true);
                await removeUserPermisos(objectCreate?.id_usuario,objectCreate?.id_permiso);
                getDatosUsuariosPermisos();
                setMensajeAlert(intl.formatMessage({ id: 'permiso_usuario_exito_elimina_asignacion' }));
                setProcesando(false);
                handleisAlertOpen();
            }
        } catch (error) {
            const message = getErrorHttpMessage(error);
            setMensajeAlert(message || intl.formatMessage({ id: 'http_error_general_operacion' }));
            setProcesando(false);
            handleisAlertOpen();
        }
    }

    const getDatosUsuariosPermisos = useCallback(async () => {
        try {
            setProcesando(true);
            const response: any = await getUserPermisos();
            setDataUsuarios(response);
            setProcesando(false);
        } catch (error) {
            setProcesando(false);
        }
    }, []);

    useEffect(() => {
        getDatosUsuariosPermisos();
    }, [getDatosUsuariosPermisos]);

    return {
        dataUsuarios,
        procesando,
        handelAccion,
        isAlertOpen,
        handleisAlerClose,
        mensajeAlert,
        espacio
    }
}