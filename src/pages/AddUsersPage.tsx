import DashboardNavbar from '../examples/Navbars/DashboardNavbar'
import DashboardLayout from '../examples/LayoutContainers/DashboardLayout/index'
import React, { useCallback, useMemo, useState } from 'react'
import Grid from "@mui/material/Grid";
import AddUserForm from '../componets/AddUserForm/index'
import { Backdrop, CircularProgress } from '@mui/material';
import useAddUsersPage from './customHooksPages/useAddUsersPage';
import ModalComponent from '../componets/Modal';
import ModalConfirm from '../componets/ModalConfirm/ModalConfirm';
import "./styles.scss";
import ContratosList from '../componets/ContratosList/ContratosList';

const AddUsersPage: React.FC = () => {

  const {
    procesando,
    saveUserNew,
    isAlertOpen,
    handleisAlerClose,
    mensajeAlert,
    resetForm,
    setResetForm,
    openModalConfirm,
    setOpenModalConfirm,
    textModalConfirm,
    setTextModalConfirm,
    esSupervisor,
    esCoordinador,
    esModoDios,
    dispatch,
    setFlujo,
    navigate,
    espacio,
    configsButton,
    handleisAlerCloseContratos,
    isAlertOpenContratos,
    getData,
    setData,
    handleCheck,
    data,
    handleCheckAll,
    handleAsignacion
  } = useAddUsersPage();

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
          <AddUserForm procesando={procesando} action={saveUserNew} onReset={() => setResetForm(false)} resetForm={resetForm} onSelectObra={(value) => {
            if (value) {
              getData(value);
            } else {
              setData([]);
            }
          }} />
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
      <ModalComponent size={'xl'} handleClose={handleisAlerCloseContratos} isOpen={isAlertOpenContratos} key={'listaContratos'}>
        <Grid container spacing={2} style={{ textAlign: 'center' }}>
          <Grid item xs={12}>
            {useMemo(
              () => (
                <ContratosList
                  esAsigacion
                  enAccionFormulario={(formulario, contrato) => {
                    handleAsignacion(formulario, contrato)
                  }}
                  onCheckAll={(a) => {
                    handleCheckAll(a)
                  }}
                  onCheck={(a: any, b: any) => {
                    handleCheck(a, b)
                  }} procesando={procesando} data={data} />
              ),
              [data]
            )}
          </Grid>
        </Grid>
      </ModalComponent>
      <ModalConfirm onAcept={() => {
        dispatch(setFlujo({ paso: 3, desc: 'Se indico que si desea asignar contratos al proyecto seleccionado en el paso 1', esCoordinador, esSupervisor, esModoDios }));
        navigate(`/alta-contratos`);
      }} onCancel={() => {
        setOpenModalConfirm(false);
        setTextModalConfirm('');
        dispatch(setFlujo({ paso: 3, desc: 'Se indico que no desea asignar contratos al proyecto seleccionado en el paso 1', esCoordinador, esSupervisor, esModoDios }));
        navigate(`/sesion-trabajo-contratos`);
      }} open={openModalConfirm} text={textModalConfirm} title={''} />

    </DashboardLayout>
  )
}

export default AddUsersPage
