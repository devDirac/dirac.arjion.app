//import Echo from "laravel-echo";
import { useCallback, useEffect, /* useMemo, */ useState } from "react";
//import { pusherCondig } from "../../config/webSockets";
import { useSelector } from "react-redux";
import { StoreType } from "../../types/geericTypes";
import { eliminaGraficaHttp, getChartsDinamicas, getDataChartsDinamicas } from "../../actions/charts";
import { setAhut } from "../../actions/auth";
import "pusher-js"
import { useMaterialUIController } from "context";
import moment from 'moment';
import ComplexProjectCard from '../../examples/Cards/ProjectCards/ComplexProjectCard'
import { useIntl } from 'react-intl';
import _ from "lodash";


export const useDashboardPage = () => {
  const intl = useIntl();
  const get_elementos_error = intl.formatMessage({ id: 'get_elementos_error' });
  const http_error_eliminar = intl.formatMessage({ id: 'http_error_eliminar' });
  const http_exito_eliminar = intl.formatMessage({ id: 'http_exito_eliminar' });
  const [controller] = useMaterialUIController();
  const {
    darkMode
  } = controller;
  const token = useSelector((state: StoreType) => state?.app?.user?.token || '');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [mensajeAlert, setMensajeAlert] = useState('');
  const handleisAlertOpen = () => setIsAlertOpen(true);
  const handleisAlerClose = () => setIsAlertOpen(false);

  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [textModalConfirm, setTextModalConfirm] = useState('');
  const [idElimina, setIdElimina] = useState(null);

  useEffect(() => {
    setAhut(token);
  }, [token]);

  const [procesando, setProcesando] = useState(false);
  const [graficas, setGraficas] = useState<any>([]);
  const [isOpen, setOpen] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const espacio = useSelector((state: any) => state?.app?.espacio || null);
  const configsButton: any =  !_.isEmpty(espacio) ? (
    <ComplexProjectCard
      image={espacio?.foto}
      title={espacio?.obra}
      element={espacio}
      contratos={espacio?.ctaAsignados}
      description={espacio?.descripcion}
      dateTime={moment(espacio?.fecha_fin).format("DD-MM-YYYY")}
      members={espacio?.asignados}
    />
  ) as any : null;

  /* const echo = useMemo(() => {
    return new Echo(pusherCondig)
  }, []) */

  const inSession = useSelector(
    (state: StoreType) => state?.app?.user?.token || ''
  );

  const elimina = async (id: any) => {
    setIdElimina(id);
    setOpenModalConfirm(true);
    setTextModalConfirm(intl.formatMessage({ id: 'main_page_pregunta_asignar_usuarios' }));
  }

  const getCharts = useCallback(async () => {
    try {
      setProcesando(true);
      const dina: any = await getChartsDinamicas();
      let response: any = [];
      const bar = new Promise((resolve, reject) => {
        dina.forEach(async (element: any, index: any, array: any) => {
          try {
            const respuestaData: any = await getDataChartsDinamicas({ store: element?.scriptSQL });
            response.push({ id: element?.id, size: element?.size, titulo: element?.titulo, data: respuestaData, tipoGrafica: element?.tipoGrafica, esVertical: element?.esVertical, esApilado: element?.esApilado, rellenaEspacioEnlineal: element?.rellenaEspacioEnlineal });
            if (index === array.length - 1) {
              resolve(true);
            }
          } catch (error) {
            if (index === array.length - 1) {
              resolve(true);
            }
            response.push({ id: element?.id, size: element?.size, titulo: element?.titulo, data: [], tipoGrafica: element?.tipoGrafica, esVertical: element?.esVertical, esApilado: element?.esApilado, rellenaEspacioEnlineal: element?.rellenaEspacioEnlineal });
          }
        });
      });
      bar.then(() => {
        setProcesando(false);
        setGraficas(response);
      });
      setError(false);
    } catch (error_) {
      setError(true);
      setProcesando(false);
      setMensajeAlert(get_elementos_error );
      handleisAlertOpen();
    }
  }, [get_elementos_error]);

  const eliminaGrafica = useCallback(
    async () => {
      try {
        setProcesando(true);
        await eliminaGraficaHttp({ id: idElimina });
        await getCharts();
        setOpenModalConfirm(false);
        setTextModalConfirm('');
        setIdElimina(null);
        setProcesando(false);
        setMensajeAlert(http_exito_eliminar );
        handleisAlertOpen();
      } catch (error_) {
        setOpenModalConfirm(false);
        setTextModalConfirm('');
        setIdElimina(null);
        setProcesando(false);
        setMensajeAlert(http_error_eliminar );
        handleisAlertOpen();
      }
    },
    [getCharts, idElimina, http_exito_eliminar, http_error_eliminar]
  );

  /* useEffect(() => {
    echo.channel('chart').subscribed(() => { }).listen(".chart-refresh", (e: any) => getCharts());

    return ()=>{
      echo.disconnect();
    }
  }, [echo, getCharts]); */

  useEffect(() => {
    setAhut(inSession);
  }, [inSession]);

  useEffect(() => {
    getCharts();
  }, [getCharts]);

  return {
    graficas,
    elimina,
    setDatos,
    setTitleModal,
    handleOpen,
    procesando,
    handleClose,
    isOpen,
    datos,
    titleModal,
    darkMode,
    error,
    getCharts,
    isAlertOpen,
    handleisAlerClose,
    mensajeAlert,
    setOpenModalConfirm,
    setTextModalConfirm,
    openModalConfirm,
    textModalConfirm,
    setIdElimina,
    eliminaGrafica,
    espacio,
    configsButton,
    intl
  }
}