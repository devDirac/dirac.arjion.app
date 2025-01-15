import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginAction } from "../../componets/LoginForm/types";
import { loginHttp, setUser } from "../../actions/auth";
import { getErrorHttpMessage } from "../../utils";
import { catalogos } from "../../utils/constants";
import {
  getCatalogoContratistas,
  getCatalogoEquipoMaquinaria,
  getCatalogoEspecialidad,
  getCatalogoEstatus,
  getCatalogoMoneda,
  getCatalogoObras,
  getCatalogoPEP,
  getCatalogoSubEspecialidad,
  getCatalogoTipoAvance,
  getCatalogoTipoConcepto,
  getCatalogoTipoUsuario,
  getCatalogosGereicos,
  setCatalogo
} from "../../actions/catalogos";
import { useIntl } from "react-intl";
import { getNotificacionesPorUsuarioHTTP, setNotificaciones } from "../../actions/notificaciones";

export const useLoginPage = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const navigate = useNavigate();
  const [procesando, setProcesando] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [mensajeAlert, setMensajeAlert] = useState('');
  const [errorLogin, setErrorLogin] = useState(false);
  const handleisAlertOpen = () => setIsAlertOpen(true);
  const handleisAlerClose = () => setIsAlertOpen(false);

  const fetching = async () => {
    const data = catalogos.filter(e => e?.esgenerico);
    await data.reduce(async (a: any, cat: any) => {
      try {
        await a;
        const catalogo = await getCatalogosGereicos(cat.value);
        catalogo?.length && dispatch(setCatalogo(catalogo, cat.value));
      } catch (error) {
        dispatch(setCatalogo([], cat.value));
      }
    }, Promise.resolve());
  }

  const login = async (data: LoginAction) => {
    try {
      setProcesando(true);
      const user = await loginHttp(data);

      await fetching();

      const catalogoEstatus = await getCatalogoEstatus();
      catalogoEstatus?.length && dispatch(setCatalogo(catalogoEstatus, 'apm_estatus_catalogos'));

      const catalogoEspecialidad = await getCatalogoEspecialidad();
      catalogoEspecialidad?.length && dispatch(setCatalogo(catalogoEspecialidad, 'apm_cat_especialidades'));

      const catalogoSubEspecialidad = await getCatalogoSubEspecialidad();
      catalogoSubEspecialidad?.length && dispatch(setCatalogo(catalogoSubEspecialidad, 'apm_cat_especialidades_documentos'));

      const catalogoContratistas = await getCatalogoContratistas();
      catalogoContratistas?.length && dispatch(setCatalogo(catalogoContratistas, 'apm_contratistas'));

      const catalogoEquipoMaquinaria = await getCatalogoEquipoMaquinaria();
      catalogoEquipoMaquinaria?.length && dispatch(setCatalogo(catalogoEquipoMaquinaria, 'apm_equipo_maquinaria'));

      const catalogoObras = await getCatalogoObras();
      catalogoObras?.length && dispatch(setCatalogo(catalogoObras, 'apm_obras'));

      const catalogoPEP = await getCatalogoPEP();
      catalogoPEP?.length && dispatch(setCatalogo(catalogoPEP, 'apm_pep'));

      const catalogoTipoConcepto = await getCatalogoTipoConcepto();
      catalogoTipoConcepto?.length && dispatch(setCatalogo(catalogoTipoConcepto, 'apm_cat_tipo_concepto'));

      const catalogoMoneda = await getCatalogoMoneda();
      catalogoMoneda?.length && dispatch(setCatalogo(catalogoMoneda, 'apm_cat_moneda'));

      const catalogoTipoAvance = await getCatalogoTipoAvance();
      catalogoTipoAvance?.length && dispatch(setCatalogo(catalogoTipoAvance, 'apm_cat_tipo_avance'));


      const catalogoTipoUsuario = await getCatalogoTipoUsuario();
      catalogoTipoUsuario?.length && dispatch(setCatalogo(catalogoTipoUsuario, 'apm_tipo_usuarios'));

      const catalogoTipoContrato = await getCatalogosGereicos('apm_cat_tipo_contrato');
      catalogoTipoContrato?.length && dispatch(setCatalogo(catalogoTipoContrato, 'apm_cat_tipo_contrato'));

      const catalogoPep = await getCatalogosGereicos('apm_pep');
      catalogoPep?.length && dispatch(setCatalogo(catalogoPep, 'apm_pep'));

      const catalogoPerfilCliente = await getCatalogosGereicos('apm_cat_perfiles_cliente');
      catalogoPerfilCliente?.length && dispatch(setCatalogo(catalogoPerfilCliente, 'apm_cat_perfiles_cliente'));

      const catalogoPuestos = await getCatalogosGereicos('apm_cat_puestos');
      catalogoPuestos?.length && dispatch(setCatalogo(catalogoPuestos, 'apm_cat_puestos'));

      const catalogoPaginasInicio = await getCatalogosGereicos('apm_cat_pagina_inicio');
      catalogoPaginasInicio?.length && dispatch(setCatalogo(catalogoPaginasInicio, 'apm_cat_pagina_inicio'));

      const notificacionesUsuario = await getNotificacionesPorUsuarioHTTP(user?.data?.id);
      dispatch(setNotificaciones(notificacionesUsuario));

      dispatch(setUser(user));
      setProcesando(false);
      navigate(`/`);

    } catch (error) {
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'login_error' }));
      setProcesando(false);
      handleisAlertOpen();
      setErrorLogin(true);
    }
  }
  return {
    procesando,
    login,
    isAlertOpen,
    handleisAlerClose,
    mensajeAlert,
    intl,
    errorLogin
  }
}