import * as React from 'react';
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';
import Box from '@mui/material/Box';
import AppBarC from './AppBarC';
import ToolbarC from './ToolbarC';
import logo from "../../assets/images/sdsd.png";
import logoArjion from "../../assets/images/arjion_b.png";
import { Button, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SpeedDial, styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useLocation, useNavigate } from 'react-router-dom';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ModalComponent from '../../componets/Modal';
import { useState } from 'react';
import PaymentsIcon from '@mui/icons-material/Payments';
import {
  setGacEquivalenciaMonedaExtDolHttp,
  setGacTipoCambioDolarHttp,
  setProveedorHttp
} from '../../actions/catalogos';
import { GacUserQueryParamsContext } from '../../context/GacUserQueryParamsContexto';
import moment from 'moment';
import { getCurrentDate, getErrorHttpMessage } from '../../utils';
import { firmarDocumentoHttp, setDocumentoSolicitudHttp, setSolicitudHttp } from '../../actions/solicitud';
import GacStepperForm from '../../forms/GacStepperForm/GacStepperForm';
import AddProveedor from '../../forms/catalogos/Proveedores/AddProveedor';
import { addBancoHttp } from '../../actions/user';
import { getCritscoAnalisisHttp } from '../../actions/documentos';
import AsistenteForm from '../../forms/asistente/AsistenteForm';
import { AsistenteVirtualHTTP, setPreguntaCorrectaHTTP } from '../../actions/asistente';

const CustomListItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiListItemText-primary': {
    fontSize: '15px', // Tamaño de fuente para el texto primario,
    color: 'rgb(44, 75, 143)',
    fontWeight: 'bold'
  }
}));

interface AppAppBarCProps {
  idUsuario?: any
  esGastos?: boolean
}

const AppAppBarC: React.FC<AppAppBarCProps> = (props: AppAppBarCProps) => {

  const location = useLocation()
  const [url, setUrl] = useState('');
  const [firma, setFirma] = useState(false);
  const setUrlToShow = () => {
    switch (location.pathname) {
      case '/gac-home':
        setUrl('Inicio')
        break;
      case '/gac-revisor-catalogo-conceptos-crud':
        setUrl('Administrción de los conceptos')
        break;
      case '/gac-revisor-catalogo-tipo-solicitud-crud':
        setUrl('Administrar los tipos de solicitud')
        break;
      case '/gac-revisor-catalogo-forma-pago-crud':
        setUrl('Administrar las formas de pago')
        break;
      case '/gac-revisor-ediion-perfiles':
        setUrl('Edición de perfiles')
        break;
      case '/gac-administrar-solicitudes':
        setUrl('Administración de solicitudes')
        break;
      case '/gac-detalle-solicitud':
        setUrl('Detalle de solicitud')
        break;
      default:
        break;
    }
  }

  React.useEffect(() => {
    setUrlToShow()
  }, [location.pathname, setUrlToShow])


  const navigate = useNavigate();
  /* aqui esta la información del usuario y catalogos */
  const perfil = React.useContext(GacUserQueryParamsContext);
  /* Para el loader */
  const [procesando, setProcesando] = useState<any>();
  /* Para guardar el tipo de solicitud seleccionada */
  const [tipoSolicitud, setTipoSolicitud] = useState<any>(null);
  /* Para guardar el formulario  */
  const [solicitudForm, setSolicitudForm] = useState<any>(null);

  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  /* Modal alta de solicitud */
  const [isAlertOpenForm, setIsAlertOpenForm] = useState(false);
  const handleisAlertOpenForm = () => setIsAlertOpenForm(true);
  const handleisAlerCloseForm = () => {
    setActiveStep(0);
    setIsAlertOpenForm(false);
    setIsDisabledNext(true);
    setSteps([
      { name: 'Tipo de solicitud', step: 0 },
      { name: 'Formulario alta de solicitud', step: 1 },
      { name: 'Carga de documentos pregunta', step: 2 },
    ])
    setFirma(false)
    perfil?.getData()
  };

  /* Modal mensajes generales */
  const [mensajeAlert, setMensajeAlert] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const handleisAlertOpen = () => setIsAlertOpen(true);
  const handleisAlerClose = () => setIsAlertOpen(false);

  /* Para el modal del proveedor */
  const [isAlertOpenProveedor, setIsAlertOpenProveedor] = useState(false);
  const handleisAlertOpenProveedor = () => setIsAlertOpenProveedor(true);
  const handleisAlerCloseProveedor = () => setIsAlertOpenProveedor(false);

  /* Para el alta de solicitud */
  const [activeStep, setActiveStep] = React.useState(0);
  const [isDisabledNext, setIsDisabledNext] = useState<boolean>(true);
  const [steps, setSteps] = useState<any[]>([
    { name: 'Tipo de solicitud', step: 0 },
    { name: 'Formulario alta de solicitud', step: 1 },
    { name: 'Carga de documentos pregunta', step: 2 },
  ]);

  /* Para el asistente */
  const [urlInteligente, setUrlInteligente] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [respuestaId, setRespuestaId] = useState(null);
  const [mensajeBienvenida, setMensajeBienvenida] = useState('');
  const [isAlertAsistente, setIsAlertAsistente] = useState(false);
  const handleisAlertAsistenteOpen = () => setIsAlertAsistente(true);
  const handleisAlertAsistenteClose = () => {
    setIsAlertAsistente(false);
    setMensajeBienvenida('')
    setRespuesta('')
    setRespuestaId(null)
  };

  const handleStep = (step: number) => {
    setActiveStep(step);
    if (step === 1) {
      setIsDisabledNext(true)
    }
    if (step === 0) {
      setActiveStep(0);
      setIsDisabledNext(true);
      setSteps([
        { name: 'Tipo de solicitud', step: 0 },
        { name: 'Formulario alta de solicitud', step: 1 },
        { name: 'Carga de documentos pregunta', step: 2 },
      ])
    }
  }


  const initAsistente = async () => {
    try {
      setMensajeBienvenida('Hola soy Sandra el asistente virtual, ¿en que te puedo ayudar?')
      handleisAlertAsistenteOpen();
    } catch (error) {
      setMensajeAlert('Error al obtener los datos');
      handleisAlertOpen();
    }

  }


  /* Selecciona el tipo de solicitud alta */
  const handleSeleccionaTipoSolicitud = (tipo: any) => {
    console.log('aqui ', tipo)
    setTipoSolicitud(tipo)
    setIsDisabledNext(false)
    setSolicitudForm(null)
  }

  /* Para actualizar el catalogo de moneda */
  const handleRefreshMonedas = async () => {
    try {
      setProcesando(true);
      await setGacEquivalenciaMonedaExtDolHttp({ fecha: moment().format("YYYY-MM-DD") });
      setMensajeAlert('Éxito al actualizar el catalogo de monedas');
      handleisAlertOpen();
      setProcesando(false);
      perfil?.getData();
    } catch (error) {
      setProcesando(false);
      setMensajeAlert('error al actualizar el catalogo de monedas, intente de nuevo más tarde');
      handleisAlertOpen();
    }
  }

  /* Para actualizar el tipo de cambio */
  const handleRefreshTipoCambio = async () => {
    try {
      setProcesando(true);
      await setGacTipoCambioDolarHttp({ fecha: moment().format("YYYY-MM-DD") })
      perfil?.getData();
      setMensajeAlert('Éxito al actualizar el catalogo de tipo de cambio');
      handleisAlertOpen();
      setProcesando(false);
    } catch (error) {
      setProcesando(false);
      setMensajeAlert('error al actualizar el tipo de cambio, intente de nuevo más tarde');
      handleisAlertOpen();
    }
  }

  /* Para guardar el formulario del tipo de solicitud */
  const handleGuardaFormulario = (f: any) => {
    const actualSteps = Object.assign([], steps);
    setSolicitudForm(f)
    if (tipoSolicitud?.requiere_documentos === 1) {
      setActiveStep(2);
      setIsDisabledNext(true)
    } else {
      setSteps(actualSteps.filter((e: any) => e?.name != 'Formulario carga de documentos'));
      setActiveStep(3);
      setIsDisabledNext(true);
      handleGuardaSinDocumentos(f);
    }
  }

  /* Para preguntar si va a subir documentos o no  */
  const handlePregunta = (tipo: number) => {
    const actualSteps = Object.assign([], steps);
    if (tipo === 1) {
      actualSteps.push({ name: 'Formulario carga de documentos', step: 3 });
      setSteps(actualSteps);
      setActiveStep(3);
    }
    if (tipo === 0) {
      setSteps(actualSteps.filter((e: any) => e?.name != 'Formulario carga de documentos'));
      setActiveStep(3);
      setIsDisabledNext(true);
      handleGuardaDocumentos([]);
    }
  }

  /* Para guardar sin los documentos */
  const handleGuardaSinDocumentos = async (d: any) => {
    try {
      setProcesando(true);
      /* Guarda solicitud */
      await setSolicitudHttp({
        ...d,
        ...{
          id_beneficiario: d?.id_beneficiario?.[0]?.value,
          id_proyecto: d?.id_proyecto?.[0]?.value,
          id_moneda: d?.id_moneda?.[0]?.value,
          importe_pesos: d?.importePesos,
          id_forma_pago: d?.id_forma_pago?.[0]?.value,
          id_empresa: d?.id_empresa?.[0]?.value,
          id_concepto: d?.id_concepto?.[0]?.value,
          proveedor: d?.proveedor?.[0]?.value + '',
        },
        ...{
          id_tipo_solicitud: tipoSolicitud?.id,
          fecha_solicitud: getCurrentDate(),
          solicita: perfil?.idUsuario,
          id_usuario: perfil?.idUsuario,
          organigrama: perfil?.organigrama.map((r: any) => {
            return {
              ...r,
              ...{
                correo: 'cruz.sergio@dirac.mx',
                telefono: '5635309370'
              }
            }
          })
        }
      });
      setProcesando(false)
      setActiveStep(activeStep + 2);
      setMensajeAlert('Éxito al dar de alta la solicitud')
      handleisAlertOpen()
      setTipoSolicitud(null)
    } catch (error) {
      setProcesando(false)
    }
  }

  /* Para guardar los documentos */
  const handleGuardaDocumentos = async (d: any) => {
    try {
      setProcesando(true);
      /* Guarda solicitud */
      const responseSolicitud = await setSolicitudHttp({
        ...solicitudForm,
        ...{
          id_beneficiario: solicitudForm?.id_beneficiario?.[0]?.value,
          id_proyecto: solicitudForm?.id_proyecto?.[0]?.value,
          id_moneda: solicitudForm?.id_moneda?.[0]?.value,
          importe_pesos: solicitudForm?.importePesos,
          id_forma_pago: solicitudForm?.id_forma_pago?.[0]?.value,
          id_empresa: solicitudForm?.id_empresa?.[0]?.value,
          id_concepto: solicitudForm?.id_concepto?.[0]?.value,
          proveedor: solicitudForm?.proveedor?.[0]?.value + '',
        },
        ...{
          id_tipo_solicitud: tipoSolicitud?.id,
          fecha_solicitud: getCurrentDate(),
          solicita: perfil?.idUsuario,
          id_usuario: perfil?.idUsuario,
          organigrama: perfil?.organigrama.map((r: any) => {
            return {
              ...r,
              ...{
                correo: 'cruz.sergio@dirac.mx',
                telefono: '5635309370'
              }
            }
          })
        }
      });
      /* Guarda documentos */
      await d.reduce(async (_: any, cat: any) => {
        try {
          await _;
          let crist = null;
          if (cat?.documento_valido === "si" && cat?.rfc && cat?.fiscal_folio && cat?.importe) {
            crist = await getCritscoAnalisisHttp({
              user_rfc: 'DIR7610279E5',
              recive_rfc: cat?.rfc,
              fiscal_folio: cat?.fiscal_folio,
              monto: cat?.importe
            })
          }
          const data1: any = new FormData();
          data1.append("importe", cat?.importe);
          data1.append("fiscal_folio", cat?.fiscal_folio || '-');
          data1.append("rfc", cat?.rfc || '-');
          data1.append("nombre_corto", cat?.nombre);
          data1.append("descripcion", cat?.descripcion);
          data1.append("tipo_moneda", cat?.moneda);
          data1.append("documento_valido", cat?.documento_valido === 'si' ? '1' : '0');
          data1.append("descripcion_documento_validado", cat?.motivo_valido);
          data1.append("nombre_documento", cat?.path);
          data1.append("id_solicitud", responseSolicitud?.id);
          data1.append("id_usuario", perfil?.idUsuario);
          data1.append("file", cat?.file);
          data1.append("critsCoValidacion", JSON.stringify(crist));
          await setDocumentoSolicitudHttp(data1);
        } catch (error: any) {
        }
      }, Promise.resolve());
      setProcesando(false)
      setActiveStep(activeStep + 1);
      const a = d?.length ? 'Éxito al dar de alta la solicitud y sus documentos' : 'Éxito al dar de alta la solicitud'
      setMensajeAlert(a)
      handleisAlertOpen()
      setTipoSolicitud(null)
    } catch (error) {
      setProcesando(false)
    }
  }


  const handleFirma = async (firma: any) => {
    try {
      setProcesando(true);
      const body = {
        id_usuario: perfil?.idUsuario,
        firma: firma?.firma
      }
      await firmarDocumentoHttp(body);
      setFirma(true);
      setMensajeAlert('Éxito al establecer la firma digital');
      handleisAlertOpen();
      setProcesando(false);
    } catch (error) {
      setProcesando(false);
      setMensajeAlert('Error al estableces la firma digital');
      handleisAlertOpen();
    }
  }

  const addProveedorAPI = async (form: any) => {
    try {
      setProcesando(true);
      await setProveedorHttp({ ...form, ...{ id_usuario: perfil?.idUsuario, } });
      handleisAlerCloseProveedor();
      perfil?.getData();
      setMensajeAlert('Éxito al guardar a el proveedor');
      handleisAlertOpen();
      setProcesando(false);
    } catch (error) {
      setProcesando(false);
      setMensajeAlert('Error al guardar a el proveedor');
      handleisAlertOpen();
    }
  }



  const handleAddBancoUsuario = async (dataBanco: any) => {
    try {
      setProcesando(true);
      const data1 = new FormData();
      data1.append("alias", dataBanco?.alias);
      data1.append("banco", dataBanco?.banco);
      data1.append("clabe", dataBanco?.clabe);
      data1.append("cuenta", dataBanco?.cuenta);
      data1.append("id_usuario", dataBanco?.id_usuario);
      if (dataBanco?.file) {
        data1.append("file", dataBanco?.file?.[0]);
      }
      await addBancoHttp(data1);
      setMensajeAlert('Éxito al guardar la información bancaria');
      handleisAlertOpen();
      setProcesando(false);
    } catch (error) {
      const mensajeerror = getErrorHttpMessage(error)
      setProcesando(false);
      setMensajeAlert(mensajeerror || 'Error al guardar la información bancaria');
      handleisAlertOpen();
    }
  }

  const handleContacto = async (data: any) => {
    try {
      setProcesando(true);
      setRespuestaId(null);
      const res = await AsistenteVirtualHTTP({ ...data, ...{ name: perfil?.nombre } });
      setMensajeBienvenida('');
      setRespuesta(res?.respuestaInteligente);
      setRespuestaId(res);
      setUrlInteligente(res?.sql?.URL || '')
      setProcesando(false)
    } catch (error) {
      setProcesando(false);
      setRespuestaId(null);
    }

  }

  const handleRespuestaCorrecta = async (id: any) => {
    try {
      await setPreguntaCorrectaHTTP({ pregunta: id?.pregunta, embedding: id?.embedding_pregunta, id_contenido: id?.sql?.id });
      setMensajeAlert('exito al asignar esta respuesta como correcta');
      setRespuestaId(null);
      handleisAlertOpen();
    } catch (error) {
      setMensajeAlert('Error al realizar la operación');
      handleisAlertOpen();
    }
  }


  const DrawerList = (
    <Box sx={{ width: '100%' }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton style={{ textAlign: 'center' }} >
            <CustomListItemText
              primary="Menú de navegación"
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        {/* mODULO DE DASHBOARD */}
        <ListItem disablePadding onClick={() => navigate(`/gac-home?id=${perfil?.idUsuarioURL}`)}>
          <ListItemButton style={{ borderBottom: 'solid 1px #f5f5f5', }}>
            <ListItemIcon>
              <AnalyticsIcon color='info' fontSize='large' />
            </ListItemIcon>
            <CustomListItemText
              primary="Dashboard"
            />
          </ListItemButton>
        </ListItem>
        {/* mODULO PARA EL CRUD DE CONCEPTOS */}
        {perfil?.esRevisor || perfil?.esAutorizador || perfil?.esPagador ? <ListItem disablePadding onClick={() => navigate(`/gac-revisor-catalogo-conceptos-crud?id=${perfil?.idUsuarioURL}`)}>
          <ListItemButton style={{ borderBottom: 'solid 1px #f5f5f5' }}>
            <ListItemIcon>
              <DisplaySettingsIcon color='info' fontSize='large' />
            </ListItemIcon>
            <CustomListItemText
              primary="Administración de conceptos"
            />
          </ListItemButton>
        </ListItem> : null}
        {/* mODULO PARA EL CRUD DE TIPO DE SOLICITUD */}
        {perfil?.esRevisor || perfil?.esAutorizador || perfil?.esPagador ? <ListItem disablePadding onClick={() => navigate(`/gac-revisor-catalogo-tipo-solicitud-crud?id=${perfil?.idUsuarioURL}`)}>
          <ListItemButton style={{ borderBottom: 'solid 1px #f5f5f5' }}>
            <ListItemIcon>
              <Inventory2Icon color='info' fontSize='large' />
            </ListItemIcon>
            <CustomListItemText
              primary="Administración de tipo de solicitud"
            />
          </ListItemButton>
        </ListItem> : null}

        {/* mODULO PARA EL CRUD DE FORMA DE PAGO */}
        {perfil?.esRevisor || perfil?.esAutorizador || perfil?.esPagador ? <ListItem disablePadding onClick={() => navigate(`/gac-revisor-catalogo-forma-pago-crud?id=${perfil?.idUsuarioURL}`)}>
          <ListItemButton style={{ borderBottom: 'solid 1px #f5f5f5' }}>
            <ListItemIcon>
              <PaymentsIcon color='info' fontSize='large' />
            </ListItemIcon>
            <CustomListItemText
              primary="Administración de formas de pago"
            />
          </ListItemButton>
        </ListItem> : null}


        {/* mODULO PARA la edición de perfiles*/}
        {perfil?.esRevisor || perfil?.esAutorizador || perfil?.esPagador ? <ListItem disablePadding onClick={() => navigate(`/gac-revisor-ediion-perfiles?id=${perfil?.idUsuarioURL}`)}>
          <ListItemButton style={{ borderBottom: 'solid 1px #f5f5f5' }}>
            <ListItemIcon>
              <ManageAccountsIcon color='info' fontSize='large' />
            </ListItemIcon>
            <CustomListItemText
              primary="Edición de perfiles"
            />
          </ListItemButton>
        </ListItem> : null}
        {/* mODULO PARA la creación de una solicitud*/}
        <ListItem disablePadding onClick={() => handleisAlertOpenForm()}>
          <ListItemButton style={{ borderBottom: 'solid 1px #f5f5f5' }}>
            <ListItemIcon>
              <RequestQuoteIcon color='info' fontSize='large' />
            </ListItemIcon>
            <CustomListItemText
              primary="Nueva solicitud"
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <AppBarC position="fixed" style={{ backgroundColor: 'rgb(32 47 80)', height: 84 }}>
        <ToolbarC sx={{ justifyContent: 'space-between' }}>

          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }} >
            {url ? <Button style={{ backgroundColor: 'rgb(32 47 80)', border: 'solid 1px #fff', color: '#ffff' }} onClick={toggleDrawer(true)}><MenuIcon /></Button> : null}
            {url ? <span style={{ color: '#ffff', marginLeft: 10, fontSize: 15, position: 'relative', top: 15 }}>{perfil?.nombre || ''} / <small>{url}</small>   </span> : null}
            <Drawer open={open} onClose={toggleDrawer(false)}
              anchor="top"
              key="sadsadsad"
              ModalProps={{ keepMounted: true }}
              sx={{
                '& .MuiDrawer-paper': {
                  position: 'absolute',
                  width: 330,
                  boxSizing: 'border-box',
                  top: 75,
                  height: 'calc(100vh - 100px)'
                },
              }} >
              {DrawerList}
            </Drawer>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }} >
            {!props?.esGastos ? <img width={170} src={logo} alt="profile-image" style={{ position: 'relative', top: 3 }} /> : null}
            {props?.esGastos ? <img width={170} src={logoArjion} alt="profile-image" style={{ position: 'relative', top: 3 }} /> : null}
          </Box>
        </ToolbarC>
      </AppBarC>
      <ToolbarC />

      {location.pathname.includes("gac") ? <SpeedDial
        onClick={() => {
          initAsistente();
        }}
        FabProps={{
          sx: {
            bgcolor: '#0a58ca',
            '&:hover': {
              bgcolor: '#0a58ca',
            }
          }
        }}
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: '30px', right: '10px', width: '100px' }}
        icon={<SmartToyTwoToneIcon fontSize="medium" />}
      /> : null}

      <ModalComponent titleBoton={'MINIMIZAR'} size={'xl'} handleClose={handleisAlertAsistenteClose} isOpen={isAlertAsistente} key={'______Asistente'}>
        <AsistenteForm
          enAccion={(data) => { handleContacto(data) }}
          enAccionCorrecta={(data) => { handleRespuestaCorrecta(data) }}
          mensajeBienvenida={mensajeBienvenida}
          respuestaId={respuestaId}
          respuesta={respuesta}
          urlInteligente={urlInteligente}
          procesando={procesando}
        />
      </ModalComponent>


      <ModalComponent handleClose={handleisAlerCloseForm} isOpen={isAlertOpenForm} key={'alertasaz'} esFullScreen={firma ? true : false}>
        <GacStepperForm
          firma={firma}
          isDisabledNext={isDisabledNext}
          activeStep={activeStep}
          handleStep={handleStep}
          steps={steps}
          handleSeleccionaTipoSolicitud={handleSeleccionaTipoSolicitud}
          tipoSolicitud={tipoSolicitud}
          perfil={perfil}
          procesando={procesando}
          solicitudForm={solicitudForm}
          handleGuardaFormulario={handleGuardaFormulario}
          handleRefreshMonedas={(form) => {
            setSolicitudForm(form)
            handleRefreshMonedas()
          }}
          handleRefreshTipoCambio={(form) => {
            setSolicitudForm(form)
            handleRefreshTipoCambio()
          }}
          handlePregunta={handlePregunta}
          handleGuardaDocumentos={handleGuardaDocumentos}
          setFirma={(firma: any) => {
            handleFirma(firma)
          }}
          handleAddProveedor={(form) => {
            setSolicitudForm(form)
            handleisAlertOpenProveedor()
          }}
          handleAddBancoUsuario={(d) => {
            handleAddBancoUsuario(d)
          }}
        />
      </ModalComponent>

      <ModalComponent handleClose={handleisAlerClose} isOpen={isAlertOpen} key={'alertasss'}>
        <Grid container spacing={2} style={{ textAlign: 'center' }}>
          <Grid item xs={12}>
            <br />
            <br />
            <p>{mensajeAlert}</p>
          </Grid>
        </Grid>
      </ModalComponent>

      <ModalComponent handleClose={handleisAlerCloseProveedor} isOpen={isAlertOpenProveedor} key={'alertasssProveedor'}>
        <AddProveedor procesando={procesando} enAction={(d) => {
          addProveedorAPI(d)
        }} />
      </ModalComponent>

    </div>
  );
}

export default AppAppBarC;