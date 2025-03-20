import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { 
    Backdrop, 
    CircularProgress, 
    Grid 
} from '@mui/material';
import ModalComponent from '../componets/Modal';
import { useSearchParams } from 'react-router-dom';
import { getErrorHttpMessage } from '../utils';
import { 
    gacGetSolicitudesJefesAreaHttp, 
    gacGetUserDataHttp, 
    getGetUsuariosAdministradoresHttp, 
    getGetUsuariosPerfilesSolicitudHttp, 
    getUserIdHashHttp 
} from '../actions/user';
import { 
    getAllTiposSolicitudesHttp, 
    getGacBeneficiariosHttp, 
    getGacCatConceptosHttp, 
    getGacCatFormaPagoHttp, 
    getGacEmpresasHttp, 
    getGacEquivalenciaMonedaExtDolHttp, 
    getGacProveedoresHttp, 
    getGacProyectosSgiHttp, 
    getGacTipoCambioDolarHttp, 
    getGactodosLosUsuariosHTTP 
} from '../actions/catalogos';

export const GacUserQueryParamsContext = React.createContext<any>(null);

export const ProviderContextUserComponent: any = ({ children }: any) => {
    /* Para el loader del contexto */
    const [procesando, setProcesando] = useState(false);
    const [esError, setEsError] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [tipoSolicitud, setTipoSolicitud] = useState<any>([]);
    const [proyectos, setProyectos] = useState<any>([]);
    const [beneficiarios, setBeneficiarios] = useState<any>([]);
    const [usuariosTodos, setUsuariosTodos] = useState<any>([]);
    const [empresas, setEmpresas] = useState<any>([]);
    const [monedas, setMonedas] = useState([]);
    const [formasPago, setFormasPago] = useState([]);
    const [conceptos, setConceptos] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [tipoCambio, setTipoCambio] = useState<any>(null);
    const [usuariosPerfil, setUsuariosPerfil] = useState<any>(null);
    const [admins, setAdmins] = useState<any>(null);
    const [esRevisor,setEsRevisor] = useState<boolean>(false);
    const [esAutorizador,setEsAutorizador] = useState<boolean>(false);
    const [esPagador,setEsPagador] = useState<boolean>(false);
    const [esJefe,setEsJefe] = useState<boolean>(false);
    /* Para las solicitudes donde el usuario tuvo que ver o tiene que ver */
    const [misSolicitudes, setMisSolicitudes] = useState<any>([]);
    /* Modal mensajes generales */
    const [mensajeAlert, setMensajeAlert] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => {
        setIsAlertOpen(false);
        if (mensajeAlert === 'El id del usuario es requerido, el sistema no reconoce esta sesión y la pagina se cerrara al confirmar este mensaje') {
            window.location.replace("http://arjion.com");
        }
        if(esError){
            window.location.replace("http://arjion.com");
        }
    };
    /* Extraemos el id del usuario de la url   */
    const [queryParameters] = useSearchParams();
    const idUsuario: any = useMemo(() => (queryParameters.get("id") || ''), []);

    const getData = useCallback(async () => {
        try {
            setProcesando(true);
            if (idUsuario === "") {
                setProcesando(false);
                setMensajeAlert('El id del usuario es requerido, el sistema no reconoce esta sesión y la pagina se cerrara al confirmar este mensaje');
                handleisAlertOpen();
            }
            const idHash = await getUserIdHashHttp(idUsuario);
            console.log('aqui esta decodificado', idHash)
            const usuariosPerfilesSolicitud = await getGetUsuariosPerfilesSolicitudHttp();
            const esRevisor = (usuariosPerfilesSolicitud || []).filter((r: any) => +r?.id_usuario === +idHash && +r?.id_perfil === 1)
            const esAutorizador = (usuariosPerfilesSolicitud || []).filter((r: any) => +r?.id_usuario === +idHash && +r?.id_perfil === 2)
            const esPagador = (usuariosPerfilesSolicitud || []).filter((r: any) => +r?.id_usuario === +idHash && +r?.id_perfil === 3)
            const responseUser = await gacGetUserDataHttp(idHash,(esRevisor?.length || esAutorizador?.length || esPagador?.length) ? 'admin' : 'noAdmin' );
            const responseProyectosSgi = await getGacProyectosSgiHttp();
            const responseBeneficiarios = await getGacBeneficiariosHttp(responseUser?.id_director_area);
            const responseTodosUsuarios = await getGactodosLosUsuariosHTTP();
            const responseEmpresas = await getGacEmpresasHttp();
            const response = await getAllTiposSolicitudesHttp();
            const responseMonedas = await getGacEquivalenciaMonedaExtDolHttp();
            const responseFormasPago = await getGacCatFormaPagoHttp();
            const responseCatConceptos = await getGacCatConceptosHttp();
            const responseTipoCambioDolar = await getGacTipoCambioDolarHttp();
            const usuariosAdministradores = await getGetUsuariosAdministradoresHttp();
            const comProveedores = await getGacProveedoresHttp();
            if(esRevisor?.length || esAutorizador?.length || esPagador?.length){
                /* const resultSolicitudes = await gacGetSolicitudesAdminsHttp(responseUser?.id_usuario);
                setMisSolicitudes(resultSolicitudes) */
            }else{
                const resultSolicitudes = await gacGetSolicitudesJefesAreaHttp(responseUser?.id_usuario);
                setMisSolicitudes(resultSolicitudes)
                setEsJefe(true)
            }
            setUser(responseUser);
            setProyectos(responseProyectosSgi.concat([{ id: 0, nombre: 'Otro' }]));
            setBeneficiarios(responseBeneficiarios.concat([{ id_usuario: 0, correo: 'Otro' }]).filter((r:any)=>  !responseUser?.jerarquiaJefes?.map((a:any)=> a?.id_usuario)?.includes(r?.id_usuario)  ));
            setUsuariosTodos(responseTodosUsuarios);
            setEmpresas(responseEmpresas);
            setTipoSolicitud(response);
            setMonedas(responseMonedas);
            setFormasPago(responseFormasPago);
            setConceptos(responseCatConceptos);
            setTipoCambio(responseTipoCambioDolar);
            setAdmins(usuariosAdministradores);
            setUsuariosPerfil(usuariosPerfilesSolicitud);
            setProveedores(comProveedores);
            setEsRevisor(esRevisor?.length ? true : false);
            setEsAutorizador(esAutorizador?.length ? true : false);
            setEsPagador(esPagador?.length   ? true : false);
            setProcesando(false);
        } catch (error) {
            const mensajeerror = getErrorHttpMessage(error);
            setProcesando(true);
            setMensajeAlert(mensajeerror || 'Error al obtener la información del usuario');
            handleisAlertOpen();
            setEsError(true);
        }
    }, []);


    useEffect(() => {
        getData()
    }, [getData])




    return (
        <GacUserQueryParamsContext.Provider value={{
            getData: () => {
                getData()
            },
            id_director_area: user?.id_director_area,
            idUsuario: user?.id_usuario,
            idHash:user?.id_hash,
            bancos: user?.bancos,
            nombre: user?.nombre + ' ' + user?.apellidos,
            solicitudes: (user?.solicitudesCreadas || []).map((r: any) => {
                const solicitaName = beneficiarios.find((w: any) => w?.id_usuario === r?.solicita)?.nombre + ' ' + beneficiarios.find((w: any) => w?.id_usuario === r?.solicita)?.apellidos;
                const beneficiarioName = beneficiarios.find((w: any) => w?.id_usuario === r?.beneficiario)?.nombre + ' ' + beneficiarios.find((w: any) => w?.id_usuario === r?.beneficiario)?.apellidos;
                const proyecto = proyectos.find((w: any) => w?.id === r?.id_proyecto)?.nombre;
                const empresa = empresas.find((w: any) => w?.id === r?.id_empresa)?.nombre;
                return {
                    ...r,
                    ...{
                        solicitaName,
                        beneficiarioName,
                        proyecto,
                        empresa
                    }
                }
            }),

            organigrama: user?.jerarquiaJefes,
            beneficiarios,
            proyectos,
            empresas,
            tipoSolicitud,
            monedas,
            formasPago,
            conceptos,
            tipoCambio,
            procesando,
            usuariosPerfil: usuariosPerfil,
            admins,
            usuariosTodos,
            esRevisor,
            esAutorizador,
            esPagador,
            misSolicitudes,
            esJefe,
            proveedores
        }}>
            <>
                {children}
                {/* Modal mensajes en general */}
                <ModalComponent handleClose={handleisAlerClose} isOpen={isAlertOpen} key={'alerta____________.'}>
                    <Grid container spacing={2} style={{ textAlign: 'center' }}>
                        <Grid item xs={12}>
                            <br />
                            <br />
                            <p>{mensajeAlert}</p>
                        </Grid>
                    </Grid>
                </ModalComponent>
                <Backdrop className='BackdropClass' open={procesando}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </>

        </GacUserQueryParamsContext.Provider>
    );
}