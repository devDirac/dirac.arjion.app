import { Backdrop, Button, CircularProgress, Grid } from '@mui/material';
import AppAppBarC from '../componets/Carrusel/AppAppBarC';
import ModalComponent from '../componets/Modal';
import React, { useState } from 'react';
import MDBox from '../componets/MDBox';
import ComplexStatisticsCard from '../examples/Cards/StatisticsCards/ComplexStatisticsCard';
const RevisorScreen: React.FC = () => {
    const [procesando, setProcesando] = useState<any>()
    /* Modal mensajes generales */
    const [mensajeAlert, setMensajeAlert] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const handleisAlertOpen = () => setIsAlertOpen(true);
    const handleisAlerClose = () => setIsAlertOpen(false);



    return (
        <>
            <AppAppBarC />
             <Grid container style={{ backgroundColor: '#fff', position: 'relative', top: 15, height: 'calc(100vh - 85px)' }} justifyContent="center">
                <Grid item xs={12} style={{ textAlign: 'center', marginBottom: 15, paddingTop: 15, padding: 25 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} style={{ textAlign: 'center', paddingLeft: 40 }}>
                            <h4 style={{ color: 'rgb(68, 94, 150)', fontWeight: 'bolder' }}>Revisor</h4>
                        </Grid>
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
export default RevisorScreen;