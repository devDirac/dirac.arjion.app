import { Backdrop, CircularProgress, Grid } from '@mui/material';
import { Container } from "react-bootstrap";
import PasswordResetForm from '../componets/passwordResetForm';
import { usePasswordRecoverValidationPage } from './customHooksPages/usePasswordRecoverValidationPage';
import ModalComponent from '../componets/Modal';
import "./styles.scss";

const PasswordRecoverValidationPage = () => {
    const {
        queryParameters,
        isValidToken,
        procesando,
        actualizaPassword,
        isAlertOpen,
        handleisAlerClose,
        mensajeAlert,
        intl
    } = usePasswordRecoverValidationPage();

    return (
        <div>
            <Container fluid>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <h3 className='titlePages'>{intl.formatMessage({ id: 'password_recover_validacion_page_titulo' })}</h3>
                    <br></br>
                </Grid>
                {(!queryParameters.get("token") || !isValidToken) && !procesando ? <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <h1>{intl.formatMessage({ id: 'password_recover_validacion_page_token_invalido' })}</h1>
                </Grid> : null}
                {queryParameters.get("token") && isValidToken && !procesando ? <Grid item xs={12}>
                    <PasswordResetForm procesando={procesando} enAccion={actualizaPassword} />
                </Grid> : null}
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
            </Container>
        </div>
    )
}

export default PasswordRecoverValidationPage
