import React from 'react'
import DashboardLayout from '../examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from '../examples/Navbars/DashboardNavbar';
import { Backdrop, CircularProgress, Grid } from '@mui/material';
import ModalComponent from '../componets/Modal';
import AltaMasivaUsuarios from '../componets/AltaMasivaUsuarios/AltaMasivaUsuarios';
import ModalConfirm from '../componets/ModalConfirm/ModalConfirm';
import useAddMultiUsersPage from './customHooksPages/useAddMultiUsersPage';
import "./styles.scss";

const AddMultiUsersPage: React.FC = () => {
    const {
        espacio,
        configsButton,
        setMensajeAlert,
        handleisAlertOpen,
        procesando,
        addUserPregunta,
        handleisAlerClose,
        isAlertOpen,
        mensajeAlert,
        addUser,
        setOpenModalConfirm,
        setTextModalConfirm,
        setData,
        openModalConfirm,
        textModalConfirm
    } = useAddMultiUsersPage()
    return (
        <DashboardLayout>
            <DashboardNavbar />
            {espacio ? <Grid container spacing={2}>
                <Grid item xs={12}>
                    {configsButton}
                </Grid>
            </Grid> : null}
            <Grid container justifyContent="center" alignItems="center" sx={{ height: "100%", mt: 3 }}>
                <Grid item xs={12} lg={12}>
                    <AltaMasivaUsuarios onErrorDocumento={()=>{
                        setMensajeAlert('El documento proporcionado no es válido para hacer la carga de usuarios, por favor seleccione el documento con el formato correcto he intente de nuevo');
                        handleisAlertOpen();
                    }} procesando={procesando} onSelect={addUserPregunta} />
                </Grid>
            </Grid>
            <Backdrop style={{ zIndex: 1000, color: "#fff" }} open={procesando}>
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

            <ModalConfirm onAcept={() => {
                addUser();
            }} onCancel={() => {
                setOpenModalConfirm(false);
                setTextModalConfirm('');
                setData([]);
            }} open={openModalConfirm} text={textModalConfirm} title={''} />

        </DashboardLayout>
    )
}

export default AddMultiUsersPage
