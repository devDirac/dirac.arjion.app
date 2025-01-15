import React from 'react'
import type { AddProyectUserFormProps } from './types'
import { Backdrop, Button, ButtonGroup, CircularProgress, Grid } from '@mui/material'
import CardProyectAsignacion from './CardProyectAsignacion';
import { useAddProyectUserForm } from './useAddProyectUserForm';
import ModalComponent from '../Modal';
import ModalConfirm from '../ModalConfirm/ModalConfirm';
import { setMenuRoutes } from '../../actions/menu';
import routes from '../../routes';
import DinamicTable from '../../componets/DinamicTable';
import './style.scss';

const AddProyectUserForm: React.FC<AddProyectUserFormProps> = (props: AddProyectUserFormProps) => {

  const {
    obras,
    darkMode,
    enAccion,
    izquierda,
    procesando,
    isAlertOpen,
    handleisAlerClose,
    mensajeAlert,
    superAdministrador,
    espacio,
    navigate,
    intl,
    openModalConfirm,
    setOpenModalConfirm,
    textModalConfirm,
    setTextModalConfirm,
    esSupervisor,
    esCoordinador,
    esModoDios,
    dispatch,
    setFlujo,
    setUsuariosAsignados,
    handleOpenUserAsinados,
    handleCloseUserAsinados,
    isOpenUserAsinados,
    ususariosAsignados
  } = useAddProyectUserForm(props)

  return (
    <Grid container spacing={2} style={
      darkMode
        ? {
          backgroundColor: "#1f283e",
          padding: "10px",
          minHeight: "600px",
        }
        : {
          backgroundColor: "#fff",
          padding: "10px",
          minHeight: "600px"
        }
    }>
      <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button
            variant="outlined"
            style={{ color: darkMode ? 'white' : '#344767' }}
            onClick={(e) => {
              navigate('/usuario-alta');
            }}
          >
            {intl.formatMessage({ id: 'add_proyectos_usuario_btn_agregar_nuevo' })}
          </Button>
          <Button
            variant="outlined"
            style={{ color: darkMode ? 'white' : '#344767' }}
            onClick={(e) => {
              dispatch(setFlujo({ paso: 3, desc: 'Se indico que desea terminar el proceso de asignación de usuarios del paso 2', esCoordinador, esSupervisor, esModoDios }));
              navigate(`/sesion-trabajo-contratos`);
              dispatch(setMenuRoutes(routes.find((e: any) => e?.key === 'sesion-trabajo')));
            }}
          >
            {intl.formatMessage({ id: 'add_proyectos_usuario_btn_terminar_proceso' })}
          </Button>
        </ButtonGroup>
      </Grid>
      {
        obras?.length ? superAdministrador ?
          <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
            <DinamicTable
              idProyectoActivo={espacio?.id}
              onVerUsuariosAsignados={(row) => {
                setUsuariosAsignados(row || {});
                handleOpenUserAsinados();
              }}
              data={obras.map((a: any) => {
                return {
                  id: a?.id,
                  obra: a?.obra,
                  descripcion: a?.descripcion,
                  fecha_inicio: a?.fecha_inicio,
                  fecha_fin: a?.fecha_fin,
                  fecha_registro: a?.fecha_registro,
                  foto: a?.foto,
                  id_estatus: a?.id_estatus === 1 ? 'Activo' : 'Inactivo',
                  usuariosAsignadosProyecto: (a?.asociacion || []).map((s: any) => { return { id: s?.id, usuario: s?.usuario } }),
                }
              })}
            /> </Grid> : [espacio]?.map((o: any) => {
              return (
                <Grid item xs={12} md={12} key={o?.id}>
                  <Grid item xs={12} md={12} className='bordersContainers' style={darkMode ? { backgroundColor: 'transparent', padding: '10px', minHeight: '600px' } : { backgroundColor: 'transparent', padding: '10px', minHeight: '600px' }}>
                    <CardProyectAsignacion enAccion={enAccion} alt={o?.obra || ''} foto={o?.foto || ''} darkMode={darkMode} idProyecto={o?.id} izquierda={izquierda} derecha={(o?.asociacion || []).map((s: any) => { return { id: s?.id, usuario: s?.usuario } })} />
                  </Grid>
                </Grid>
              )
            })
          : null
      }
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
      <ModalComponent procesando={procesando} handleClose={handleCloseUserAsinados} isOpen={isOpenUserAsinados} key={'verAsignados'}>
        <CardProyectAsignacion enAccion={enAccion} alt={ususariosAsignados?.obra || ''} foto={ususariosAsignados?.foto || ''} darkMode={darkMode} idProyecto={ususariosAsignados?.id} izquierda={izquierda} derecha={(ususariosAsignados?.usuariosAsignadosProyecto || []).map((s: any) => { return { id: s?.id, usuario: s?.usuario } })} />
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

    </Grid>
  )
}

export default AddProyectUserForm
