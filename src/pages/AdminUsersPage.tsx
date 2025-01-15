import React from 'react'
import { Backdrop, CircularProgress, Grid } from '@mui/material';
import DashboardNavbar from '../examples/Navbars/DashboardNavbar'
import DashboardLayout from '../examples/LayoutContainers/DashboardLayout/index'
import GestionUsuarios from '../componets/GestionUsuarios/GestionUsuarios';
import useAdminUsersPage from './customHooksPages/useAdminUsersPage';
import ModalComponent from '../componets/Modal';
import "./styles.scss";

const AdminUsersPage: React.FC = () => {

    const {
        procesando,
        users,
        edit,
        deleteUser,
        isAlertOpen,
        handleisAlerClose,
        mensajeAlert,
        espacio,
        configsButton
    } = useAdminUsersPage();


    return (
        <DashboardLayout>
            <DashboardNavbar />
            {espacio ? <Grid container spacing={2}>
                <Grid item xs={12}>
                    {configsButton}
                </Grid>
            </Grid> : null}
            <Grid container justifyContent="center" alignItems="center" sx={{ height: "100%", mt: 3 }}>
                <Grid item xs={12}>
                    <GestionUsuarios procesando={procesando} users={users} onEdit={(data) => edit(data)} onDelete={(data) => deleteUser(data)} />
                </Grid>
            </Grid>
            <Backdrop style={{ zIndex: 10, color: "#fff", }} open={procesando}>
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
        </DashboardLayout>
    )
}

export default AdminUsersPage
