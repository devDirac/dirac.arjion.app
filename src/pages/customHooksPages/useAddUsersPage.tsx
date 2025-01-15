import { useCallback, useEffect, useState } from 'react'
import { getErrorHttpMessage } from '../../utils/index';
import { saveUser } from '../../actions/users';
import { setAhut } from '../../actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import { useIntl } from 'react-intl';
import { setFlujo } from '../../actions/flujoInicial';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import ComplexProjectCard from '../../examples/Cards/ProjectCards/ComplexProjectCard'
import _ from 'lodash';
import { getContratoDetalleByIdContratoHttp } from '../../actions/contratos';
import { getContratoDetalleByIdContratoSupervisorHttp } from '../../actions/contratos';


const useAddUsersPage = () => {
  const intl = useIntl();

  const [procesando, setProcesando] = useState(false);
  const token = useSelector((state: StoreType) => state?.app?.user?.token || '');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [resetForm, setResetForm] = useState<boolean>(false);
  const [mensajeAlert, setMensajeAlert] = useState('');
  const handleisAlertOpen = () => setIsAlertOpen(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleisAlerClose = () => {
    setIsAlertOpen(false)
    if (esExito && esFlujoInicial && (esFlujoInicial?.esCoordinador || esFlujoInicial?.esModoDios)) {
      setOpenModalConfirm(true);
      setTextModalConfirm(intl.formatMessage({ id: 'add_proyectos_usuario_pregunta_asignar_contrato_desde_formulario' }))
    }
  };

  const [esExito, setEsExito] = useState(false);
  const esFlujoInicial = useSelector((state: any) => state?.app?.flujoInicial || null);
  const esCoordinador = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 1);
  const esSupervisor = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 2);
  const esModoDios = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 3);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [textModalConfirm, setTextModalConfirm] = useState('');
  const [isAlertOpenContratos, setIsAlertOpenContratos] = useState(false);
  const handleisAlertOpenContratos = () => setIsAlertOpenContratos(true);
  const handleisAlerCloseContratos = () => {
    setIsAlertOpenContratos(false)
  };

  const saveUserNew = async (data_: any) => {
    setProcesando(true);
    try {
      setProcesando(true);
      const contratos = data.filter(s => s?.check)
      await saveUser({ ...data_, ...{ contratos } });
      setData([])
      setResetForm(true);
      setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
      setProcesando(false);
      setEsExito(true);
      handleisAlertOpen();
    } catch (error) {
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
      setProcesando(false);
      handleisAlertOpen();
      setEsExito(false);
    }
  }

  useEffect(() => {
    setAhut(token);
  }, [token]);

  const espacio = useSelector((state: any) => state?.app?.espacio || null);
  const configsButton: any = !_.isEmpty(espacio) ? (
    <ComplexProjectCard
      muestraAvances
      image={espacio?.foto}
      title={espacio?.obra}
      contratos={espacio?.ctaAsignados}
      element={espacio}
      description={espacio?.descripcion}
      dateTime={moment(espacio?.fecha_fin).format("DD-MM-YYYY")}
      members={espacio?.asignados}
    />
  ) as any : null;

  const [data, setData] = useState<any[]>([]);
  const getData = useCallback(async (id: any) => {
    try {
      setProcesando(true);
      let contratos: any = null;
      if (esCoordinador || esModoDios) {
        contratos = await getContratoDetalleByIdContratoHttp(id, esSupervisor);
      }
      if (esSupervisor) {
        contratos = await getContratoDetalleByIdContratoSupervisorHttp(id, esSupervisor);
      }
      setData(contratos);
      handleisAlertOpenContratos()
      setProcesando(false);
    } catch (error) {
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || '');
      setProcesando(false);
      handleisAlertOpen();
    }
  }, [esCoordinador, esModoDios, esSupervisor]);

  const handleCheck = (a: boolean, b: any) => {
    setData(data?.map((e: any) => {
      const c = e?.id === b?.id ? { ...e, ...{ check: a } } : e;
      return { ...c };
    }))
  }

  const handleCheckAll = (a: boolean) => {
    setData(data?.map((e: any) => {
      const c = { ...e, ...{ check: a } };
      return { ...c };
    }))
  }

  const handleAsignacion = (formuario: any, contrato: any) => {
    setData(data?.map((e: any) => {
      const c = contrato ? (e?.id === contrato?.id ? { ...e, ...{ formuario } } : { ...e }) : { ...e, ...{ formuario } };
      return { ...c };
    }));
    !contrato && handleisAlerCloseContratos();
  }

  return {
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
    ComplexProjectCard,
    configsButton,
    handleisAlerCloseContratos,
    isAlertOpenContratos,
    getData,
    setData,
    handleCheck,
    data,
    handleCheckAll,
    handleAsignacion
  }
}

export default useAddUsersPage; 