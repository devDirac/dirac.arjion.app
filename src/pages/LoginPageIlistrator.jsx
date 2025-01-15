import IllustrationLayout from '../layouts/authentication/components/IllustrationLayout'
import bgImage from "assets/images/illustrations/illustration-reset.jpg";
import MDBox from '../componets/MDBox';
import MDTypography from '../componets/MDTypography';
import { Link } from 'react-router-dom';
import ModalComponent from "../componets/Modal";
import { useLoginPage } from "./customHooksPages/useLoginPage";
import LoginForm from "../componets/LoginForm";
import { Grid } from '@mui/material';
import "./styles.scss";

const LoginPageIlistrator = () => {
  
  const {
    procesando,
    login,
    isAlertOpen,
    handleisAlerClose,
    mensajeAlert,
    intl,
    errorLogin
  } = useLoginPage();
  return (
    <IllustrationLayout
      title={intl.formatMessage({ id: 'login_page_titulo' })}
      description={intl.formatMessage({ id: 'login_page_ingrese_credenciales' })}
      illustration={bgImage}
    >
      <MDBox component="form" role="form">
        <LoginForm procesando={procesando} enAccion={login} captchaRecet={errorLogin} />
        <MDBox mt={3} textAlign="center">
          <MDTypography variant="button" color="text">
          {intl.formatMessage({ id: 'login_page_texto_recuperar_contrasena_1' })} {' '}
            <MDTypography
              component={Link}
              to="/recupera-password"
              variant="button"
              color="warning"
              fontWeight="medium"
              textGradient
            >
              {intl.formatMessage({ id: 'login_page_texto_recuperar_contrasena_2' })}
            </MDTypography>
            {' '} {intl.formatMessage({ id: 'login_page_texto_recuperar_contrasena_3' })}
          </MDTypography>
        </MDBox>
      </MDBox>
      <ModalComponent handleClose={handleisAlerClose} isOpen={isAlertOpen} key={'alerta'}>
        <Grid container spacing={2} style={{ textAlign: 'center' }}>
          <Grid item xs={12}>
            <br />
            <br />
            <p>{mensajeAlert}</p>
          </Grid>
        </Grid>
      </ModalComponent>
    </IllustrationLayout>
  )
}

export default LoginPageIlistrator
