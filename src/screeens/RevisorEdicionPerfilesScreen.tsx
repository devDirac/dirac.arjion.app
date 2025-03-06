import { Backdrop, Button, CircularProgress, Grid } from '@mui/material';
import AppAppBarC from '../componets/Carrusel/AppAppBarC';
import ModalComponent from '../componets/Modal';
import React, { useState } from 'react';
import { getGacCatPerfilesHttp } from '../actions/catalogos';
import TransferList from '../componets/TransferList/TransferList';
import { sleep } from '../utils';
import { getGetUsuariosAdministradoresHttp, getGetUsuariosPerfilesSolicitudHttp, setPerfilSolicitudHttp } from '../actions/user';


const RevisorEdicionPerfilesScreen: React.FC = () => {

    const [usuariosPerfil, setUsuariosPerfil] = useState<any>([]);
    const [admins, setAdmins] = useState<any>([]);
    const [perfilesData, setPerfilesData] = useState<any>(null);
    const [procesando, setProcesando] = useState<any>(false);

    const [muestraVista, setMuestraVista] = useState<any>('Revisor fiscal');

    /* Modal mensajes generales */
    const [mensajeAlert, setMensajeAlert] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);

    const getData = React.useCallback(async () => {
        try {
            setProcesando(true);
            const response = await getGacCatPerfilesHttp();
            setPerfilesData(response);
            const usuariosAdministradores = await getGetUsuariosAdministradoresHttp();
            setAdmins(usuariosAdministradores);
            const usuariosPerfilesSolicitud = await getGetUsuariosPerfilesSolicitudHttp();
            setUsuariosPerfil(usuariosPerfilesSolicitud);
            setProcesando(false);
        } catch (error) {
            setProcesando(false);
            setMensajeAlert('error al registrar la forma de pago');
            handleisAlertOpen();
        }
    }, []);

    /* Inicializa el componente */
    React.useEffect(() => {
        getData();
    }, [getData]);

    /* Para guardar los revisores fiscales */
    const handleGuardarRevisores = async (l: any, r: any) => {
        try {
            if(!r?.length){
                setProcesando(false);
                setMensajeAlert('No hay usuarios para asignar como revisores fiscales');
                handleisAlertOpen();
                return false;    
            }
            setProcesando(true);
            await setPerfilSolicitudHttp({right : r});
            getData();
            setProcesando(false);
            setMensajeAlert('Exito al guardar la configuración de los revisores fiscales');
            handleisAlertOpen();
        } catch (error) {
            setProcesando(false);
            setMensajeAlert('error al guardar la configuración de los revisores fiscales');
            handleisAlertOpen();
        }
    }

    return (
        <>
            <AppAppBarC />
            <Grid container style={{ backgroundColor: '#fff', position: 'relative', top: 15, height: 'calc(100vh - 85px)' }} justifyContent="center">
                <Grid item xs={12} style={{ textAlign: 'center', marginBottom: 15, paddingTop: 15, padding: 25 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
                            <h4 style={{ color: 'rgb(68, 94, 150)', fontWeight: 'bolder' }}>Edición de perfiles</h4>
                        </Grid>
                        <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
                            <Button onClick={() => {
                                setMuestraVista('Revisor fiscal')
                            }}
                                size="small"
                                variant="outlined"
                                style={{ color: muestraVista === 'Revisor fiscal' ? '#ffff' : '#1A73E8', marginLeft: 5, marginRight: 5, backgroundColor: muestraVista === 'Revisor fiscal' ? '#1A73E8' : '#fff' }}>
                                Revisores fiscales
                            </Button>
                            <Button onClick={() => {
                                setMuestraVista('Autorizador')
                            }} size="small" variant="outlined" style={{ color: muestraVista === 'Autorizador' ? '#ffff' : '#1A73E8', marginLeft: 5, marginRight: 5, backgroundColor: muestraVista === 'Autorizador' ? '#1A73E8' : '#fff' }}> Autorizador </Button>
                            <Button onClick={() => {
                                setMuestraVista('Pagador')
                            }} size="small" variant="outlined" style={{ color: muestraVista === 'Pagador' ? '#ffff' : '#1A73E8', marginLeft: 5, marginRight: 5, backgroundColor: muestraVista === 'Pagador' ? '#1A73E8' : '#fff' }}> Pagador </Button>
                        </Grid>
                        {

                            muestraVista === 'Revisor fiscal' ? <Grid item xs={12} md={12} style={{ textAlign: 'center', marginTop: 100 }}>
                                <TransferList
                                    enguardar={(l, r) => handleGuardarRevisores(l, r)}
                                    left_={admins.filter((r:any)=> !usuariosPerfil.map((r:any)=>r?.id_usuario).includes(r.id_usuario) && r?.nivel !== 'A').map((r:any) => {
                                        return {
                                            id:r?.id_usuario, 
                                            nombre: r?.nombre + ' ' + r?.apellidos
                                        }
                                    }) }
                                    right_={admins.filter((r:any)=> usuariosPerfil.map((r:any)=>r?.id_usuario).includes(r.id_usuario) && r?.nivel !== 'A').map((r:any) => {
                                        return {
                                            id:r?.id_usuario, 
                                            nombre: r?.nombre + ' ' + r?.apellidos
                                        }
                                    }) }
                                /></Grid> : null
                        }
                        {
                            muestraVista === 'Autorizador' ?
                                <Grid item xs={12} md={12} style={{ textAlign: 'center', marginTop: 100 }}>
                                    <h5 style={{ color: 'rgb(68, 94, 150)', fontWeight: 'bolder' }}>El perfil autorizador esta asignado a:</h5>
                                    <p style={{ color: 'rgb(68, 94, 150)' }}>  {admins.find((r: any) => r?.nivel === 'A')?.direccion}</p>
                                    <p style={{ color: 'rgb(68, 94, 150)' }}>  {admins.find((r: any) => r?.nivel === 'A')?.nombre} {admins.find((r: any) => r?.nivel === 'A')?.apellidos} </p>
                                </Grid> : null
                        }
                        {
                            muestraVista === 'Pagador' ? <Grid item xs={12} md={12} style={{ textAlign: 'center', marginTop: 100 }}>
                                <h5 style={{ color: 'rgb(68, 94, 150)', fontWeight: 'bolder' }}>El perfil pagador esta asignado a:</h5>
                                <p style={{ color: 'rgb(68, 94, 150)' }}>  {admins.find((r: any) => r?.nivel === 'A')?.direccion}</p>
                                <p style={{ color: 'rgb(68, 94, 150)' }}>  {admins.find((r: any) => r?.nivel === 'A')?.nombre} {admins.find((r: any) => r?.nivel === 'A')?.apellidos} </p>
                            </Grid> : null
                        }
                    </Grid>
                </Grid>
                <Backdrop className='BackdropClass' open={procesando}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <ModalComponent handleClose={handleisAlerClose} isOpen={isAlertOpen} key={'alerta'}>
                    <Grid container spacing={2} style={{ textAlign: 'center' }}>
                        <Grid item xs={12}>
                            <br />
                            <br />
                            <p>{mensajeAlert}</p>
                        </Grid>
                    </Grid>
                </ModalComponent>

            </Grid >
        </>
    );
}
export default RevisorEdicionPerfilesScreen;