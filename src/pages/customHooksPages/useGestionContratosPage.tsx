import { useCallback, useEffect, useState, useContext } from 'react'
import { numericFormatter } from 'react-number-format';
import { Button, Card, Grid } from '@mui/material';
import { getErrorHttpMessage } from '../../utils';
import { deleteContratoHttp, getContratoDetalleHttp, saveUserContrato, setContratoEspacio, setParametroToContratoHttp, setUserToContractHTTP, unSetUserToContractHTTP, updateContratoHttp } from '../../actions/contratos';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import { setAhut } from '../../actions/auth';
import { ListGroup } from 'react-bootstrap';
import moment from 'moment';
import dayjs from 'dayjs';
import { useMaterialUIController } from 'context';
import { getObrasConRelaciones } from '../../actions/proyectos';
import { getClientes } from '../../actions/clientes';
import DeleteIcon from '@mui/icons-material/Delete';
import { useIntl } from 'react-intl';
import { useSearchParams } from 'react-router-dom';
import _ from 'lodash';
import ComplexProjectCard from '../../examples/Cards/ProjectCards/ComplexProjectCard'
import { perfilContext } from '../../context/perfilContexto';
import { getCatalogosGereicos } from '../../actions/catalogos';
import { setCatalogo } from '../../actions/catalogos';

import 'dayjs/locale/es'; // Importar el idioma

dayjs.locale('es'); // Establecer el idioma globalmente

const useGestionContratosPage = () => {
  const perfil = useContext(perfilContext);
  const intl = useIntl();
  const dispatch = useDispatch();
  const espacio = useSelector((state: any) => state?.app?.espacio || null);
  const [clientes, setClientes] = useState<any[]>([]);
  const [responsables, setResponsables] = useState<any[]>([]);
  const [obraSeleccion, setObraSeleccion] = useState<any>('');
  const [contrato, setContrato] = useState<any[]>([]);
  const [contrato_item_id, setContrato_item_id] = useState<number>(0);
  const [resetForm, setResetForm] = useState<boolean>(false);
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const esSupervisor = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 2);
  const esModoDios = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 3);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [mensajeAlert, setMensajeAlert] = useState('');
  const handleisAlertOpen = () => setIsAlertOpen(true);
  const handleisAlerClose = () => setIsAlertOpen(false);

  const [isOpenUser, setOpenUser] = useState(false);
  const handleOpenUser = () => setOpenUser(true);
  const handleCloseUser = () => setOpenUser(false);

  const [isOpenUserAsinados, setOpenUserAsinados] = useState(false);
  const handleOpenUserAsinados = () => setOpenUserAsinados(true);
  const handleCloseUserAsinados = () => setOpenUserAsinados(false);

  const [isOpenParametros, setOpenParametros] = useState(false);
  const handleOpenParametros = () => setOpenParametros(true);
  const handleCloseParametros = () => setOpenParametros(false);

  const [procesando, setProcesando] = useState<boolean>(false);
  const [procesandoData, setProcesandoData] = useState<boolean>(false);
  const token = useSelector((state: StoreType) => state?.app?.user?.token || '')
  const [datos_tabla, setDatos_tabla] = useState<any[]>([]);

  const [ususariosAsignados, setUsuariosAsignados] = useState([]);
  const get_elementos_error = intl.formatMessage({ id: 'get_elementos_error' });
  const catalogos_error_obtener = intl.formatMessage({ id: 'catalogos_error_obtener' });
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [textModalConfirm, setTextModalConfirm] = useState('');
  const [itemActualizaEstatusContrato, setItemActualizaEstatusContrato] = useState(null);

  const [openModalConfirm_2, setOpenModalConfirm_2] = useState(false);
  const [textModalConfirm_2, setTextModalConfirm_2] = useState('');
  const [itemActualizaEstatusContrato_2, setItemActualizaEstatusContrato_2] = useState(null);

  const [parametros, setParametros] = useState<any>(null);

  const [queryParameters] = useSearchParams();
  const id_filtro: string = queryParameters.get("id") || '';

  useEffect(() => {
    setAhut(token);
  }, [token]);

  const getResponsablesState = useCallback(async () => {
    try {
      setProcesando(true);
      const response = await getObrasConRelaciones();
      setResponsables(response.filter((r: any) => r?.id === +obraSeleccion)?.[0]?.asociacion || []);
      setProcesando(false);
    } catch (err) {
      const message = getErrorHttpMessage(err);
      setMensajeAlert(message || catalogos_error_obtener);
      setProcesando(false);
      handleisAlertOpen();
    }
  }, [obraSeleccion, catalogos_error_obtener]);



  const getCatalogo_ = useCallback(async () => {
    try {
      setProcesando(true);
      const catalogo = await getCatalogosGereicos('apm_cat_tipo_contrato_ext');
      catalogo?.length && dispatch(setCatalogo(catalogo, 'apm_cat_tipo_contrato_ext'));
      const catalogo_ = await getCatalogosGereicos('apm_cat_clasificacion_contrato');
      catalogo_?.length && dispatch(setCatalogo(catalogo_, 'apm_cat_clasificacion_contrato'));

      setProcesando(false);
    } catch (err) {
      const message = getErrorHttpMessage(err);
      setMensajeAlert(message || catalogos_error_obtener);
      setProcesando(false);
      handleisAlertOpen();
    }
  }, []);

  useEffect(() => {
    getCatalogo_()
  }, [getCatalogo_])

  const getClientesState = useCallback(async () => {
    try {
      setProcesando(true);
      const response = await getClientes();
      setClientes(response);
      setProcesando(false);
    } catch (err) {
      const message = getErrorHttpMessage(err);
      setMensajeAlert(message || catalogos_error_obtener);
      setProcesando(false);
      handleisAlertOpen();
    }
  }, [catalogos_error_obtener]);

  useEffect(() => {
    getClientesState();
    getResponsablesState();
  }, [getClientesState, getResponsablesState]);

  const AllowCell = [
    "id",
    "contrato",
    "id_contrato",
    "fecha_inicio",
    "fecha_reii",
    "fecha_final",
    "importe",
    "id_estatus",
    "plantilla",
    "terminado",
    "nota",
    "moneda",
    "usuarios_asignados"
  ];

  const handleSelectContrato = useCallback((data: any) => {
    setProcesando(true);
    moment.locale('es', {
      months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
      monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
      weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
      weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
      weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
    } as any
    );
    const dates = data?.usuarios_asignados || [];
    let maximumDate = data?.usuarios_asignados?.length > 0 ? new Date(Math.max.apply(null, dates.map((e: any) => new Date(e.fecha_registro)))) : null;
    let minimumDate = data?.usuarios_asignados?.length > 0 ? new Date(Math.min.apply(null, dates.map((e: any) => new Date(e.fecha_registro)))) : null;
    dispatch(setContratoEspacio({
      id: data?.id,
      id_contrato: data?.id_contrato,
      tipo_contrato: data?.tipo_contrato,
      fecha_contrato: data?.fecha_contrato,
      id_tipo_contrato: data?.id_tipo_contrato,
      modalidad: data?.modalidad,
      numero: data?.numero,
      moneda:data?.moneda,
      clave_presupuestaria: data?.clave_presupuestaria,
      asignacion_iva: data?.asignacion_iva,
      oficina_pagadora: data?.oficina_pagadora,
      anticipo: data?.anticipo,
      amortizacion: data?.amortizacion,
      fondo_gtia: data?.fondo_gtia,
      contrato: data?.contrato,
      fecha_registro: moment(data?.fecha_registro).format('MMMM DD YYYY, H:mm:ss'),
      estatus_parametro: data?.estatus_parametro,
      fecha_registro_parametro: moment(data?.fecha_registro_parametro).format('MMMM DD YYYY, H:mm:ss'),
      usuarios_asignados: data?.usuarios_asignados?.length,
      fecha_usuarios_asignados: data?.usuarios_asignados?.length === 0 ? '' : data?.usuarios_asignados?.length === 1 ? `${moment(maximumDate).format('MMMM DD YYYY, H:mm:ss')}` : `${moment(minimumDate).format('MMMM DD YYYY, H:mm:ss')} y ${moment(maximumDate).format('MMMM DD YYYY, H:mm:ss')}`,
      pep: data?.pep,
      pep_nombre: data?.nombre_pep,
      pep_fecha_registro: moment(data?.fecha_registro).format('MMMM DD YYYY, H:mm:ss'),
      clasificacion_contrato: data?.clasificacion_contrato,
      nombre_clasificacion_contrato: data?.nombre_clasificacion_contrato,
      clasificacion_contrato_fecha_registro: moment(data?.fecha_registro).format('MMMM DD YYYY, H:mm:ss'),
      frentes: data?.frentes,
      frentes_fecha_registro: moment(data?.frentes_fecha_registro).format('MMMM DD YYYY, H:mm:ss'),
      catalogo_conceptos: data?.catalogo_conceptos,
      catalogo_conceptos_fecha_registro: moment(data?.catalogo_conceptos_fecha_registro).format('MMMM DD YYYY, H:mm:ss'),
      programa_financiero: data?.programa_financiero,
      programa_financiero_fecha_registro: data?.programa_financiero_fecha_registro,
      id_especialidad: data?.id_especialidad,
      id_especialidad_fecha_registro: moment(data?.fecha_registro).format('MMMM DD YYYY, H:mm:ss'),
      nombre_especialidad_contrato: data?.nombre_especialidad,
      avances_confirmados: data?.avances_confirmados || 0,
      avances_por_confirmar: data?.avances_por_confirmar || 0,
      contratista: data?.contratista || '',
      importe: +(data?.importe || 0),
      tolerancia: data?.tolerancia || 0,
      actividades:data?.actividades || [],
      avances_pendientes_estimar:data?.avances_pendientes_estimar || 0,
    }));
    setTimeout(() => {
      setProcesando(false);
    }, 400);
  }, [dispatch]);
  const contratosUser = useSelector((state: StoreType) => (state?.app?.user?.data?.contratos || []).map(e=> { return e?.id  } ) );
  
  const getData = useCallback(async () => {
    try {
      setProcesandoData(true);
      const contratos: any = await getContratoDetalleHttp(esSupervisor);
      const contrato_ = contratos.filter((e_: any) => _.isEmpty(id_filtro) ? true : e_?.id === +id_filtro).map((e: any) => {
        return {
          ...e, ...{
            fecha_inicio: (new Date(e?.fecha_inicio || '')).toISOString().split('T')[0],
            fecha_final: (new Date(e?.fecha_final || '')).toISOString().split('T')[0],
            fecha_limite: (new Date(e?.fecha_limite || '')).toISOString().split('T')[0],
            autorizado: e?.autorizado + "",
            terminado: e?.terminado + "",
            id_tipo_proyecto: e?.id_tipo_proyecto + "",
            id_contratista: e?.id_contratista + "",
            alertas: e?.alertas + "",
            estatus: e?.estatus + "",
            id_autorizador: e?.id_autorizador + "",
            id_cliente: e?.id_cliente + "",
            id_especialidad: e?.id_especialidad + "",
            id_obra_principal: e?.id_obra_principal + "",
            id_responsable: e?.id_responsable + "",
            id_tipo_contrato: e?.id_tipo_contrato + "",
            moneda: e?.moneda + "",
            pep: e?.pep ? (e?.pep + "") : null,
            propietario: e?.propietario + "",
            reclasificacion: e?.reclasificacion + "",
            tipo_contrato_ext: e?.tipo_contrato_ext + "",
            plantilla: e?.plantilla + "",
            clave_clasificacion_contrato:e?.clave_clasificacion_contrato || '',
            nombre_clasificacion_contrato:e?.nombre_clasificacion_contrato || '',
            clasificacion_contrato: e?.clasificacion_contrato ? (e?.clasificacion_contrato + "") : null,
            tolerancia: e?.tolerancia + "",
            programa_financiero: e?.programa_financiero + "",
            subEspecialidad:e?.subespecialidad,
            peps:(e?.peps || []).map((pep:any) => pep.id_pep)
          }
        }
      })
      setContrato(contrato_);
      setDatos_tabla(contratos.filter((e:any)=> esModoDios ? true : contratosUser.includes(e?.id) ).filter((e_: any) => _.isEmpty(id_filtro) ? true : e_?.id === +id_filtro).map((c: any) => {
        return {
          "id": c?.id,
          "contrato": c?.contrato,
          "id_contrato": c?.id_contrato,
          "id_contratista": c?.id_contratista,
          "contratista": c?.contratista,
          "correo_contratista": c?.correo_contratista,
          "descripcion_contratista": c?.descripcion_contratista,
          "rfc_contratista": c?.rfc_contratista,
          "fecha_inicio": c?.fecha_inicio,// moment(c?.fecha_inicio, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY, H:mm:ss"),
          //'fecha_reii': dayjs( c?.fecha_inicio.includes(" ") ? c?.fecha_inicio.split(" ")[0] : c?.fecha_inicio, "YYYY-MM-DD HH:mm:ss").format('MMMM D, YYYY'),
          "fecha_final": c?.fecha_final, // dayjs(c?.fecha_final, "YYYY-MM-DD HH:mm:ss").format('MMMM D, YYYY'),//moment(c?.fecha_final, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY"),
          "importe": numericFormatter(c?.importe + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: ' $' }),
          "id_estatus": c?.estatus === 0 ? 'Inactivo' : 'Activo',
          "estatus": c?.estatus,
          "id_cliente": c?.id_cliente,
          "nombre_cliente": c?.nombre_cliente,
          "nombre_corto_cliente": c?.nombre_corto_cliente,
          "rfc_cliente": c?.rfc_cliente,
          "id_responsable": c?.id_responsable,
          "nombre_responsable": c?.nombre_responsable,
          "correo_responsable": c?.correo_responsable,
          "autorizado": +c?.autorizado === 0 ? 'Sin envío' : +c?.autorizado === 1 ? 'Por autorizar' : +c?.autorizado === 2 ? 'Autorizado' : 'Cancelado',
          "id_autorizador": c?.id_autorizador,
          "nombre_autorizador": c?.nombre_autorizador,
          "correo_autorizador": c?.correo_autorizador,
          "plantilla": c?.plantilla,
          "terminado": +c?.terminado === 0 ? 'Activo' : +c?.terminado === 1 ? 'Terminado' : 'Rescindido',
          "nota": c?.nota,
          "id_tipo_contrato": c?.id_tipo_contrato,
          "clave_tipo_contrato": c?.clave_tipo_contrato,
          "clave_clasificacion_contrato":c?.clave_clasificacion_contrato || '',
          "nombre_clasificacion_contrato":c?.nombre_clasificacion_contrato || '',
          "nombre_tipo_contrato": c?.nombre_tipo_contrato,
          "id_obra_principal": c?.id_obra_principal,
          "obra": c?.obra,
          "descrpcion_obra": c?.descrpcion_obra,
          "tipo_proyecto": +c?.tipo_proyecto === 1 ? 'Presupuesto' : +c?.tipo_proyecto === 2 ? 'Cotizado' : 'Contratado',
          "pep": c?.pep,
          "nombre_pep": c?.nombre_pep,
          "descriocion_pep": c?.descriocion_pep,
          "moneda": +c?.moneda === 1 ? 'Pesos' : +c?.moneda === 1 ? 'Dolares' : 'Euros',
          "anticipo": c?.anticipo,
          "categoria": c?.categoria,
          "alertas": +c?.alertas === 0 ? 'No' : 'Si',
          "fecha_limite": c?.fecha_limite,  // dayjs(c?.fecha_limite, "YYYY-MM-DD HH:mm:ss").format('MMMM D, YYYY'),//moment(c?.fecha_limite, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY"),
          "reclasificacion": +c?.reclasificacion === 0 ? 'No' : 'Si',
          "propietario": +c?.propietario === 0 ? 'No' : 'Si',
          "fecha_registro": c?.fecha_registro, // dayjs(c?.fecha_registro, "YYYY-MM-DD HH:mm:ss").format('MMMM D, YYYY'),//moment(c?.fecha_registro, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY"),
          "tipo_contrato_ext": c?.tipo_contrato_ext,
          "clave_contrato_ext": c?.clave_contrato_ext,
          "nombre_contrato_ext": c?.nombre_contrato_ext,
          "tolerancia": c?.tolerancia,
          "estatus_firma": c?.estatus_firma,
          "contrato_liberado": c?.contrato_liberado,
          "clasificacion_contrato": c?.clasificacion_contrato,
          "tipo_cambio": c?.tipo_cambio,
          "id_especialidad": c?.id_especialidad,
          "clave_especialidad": c?.clave_especialidad,
          "nombre_especialidad": c?.nombre_especialidad,
          "id_usuario": c?.id_usuario,
          "usuarios_asignados": c?.usuarios_asignados,
          "area_expide": c?.area_expide + "",
          "tipo_contrato": c?.tipo_contrato + "",
          "fecha_contrato": c?.fecha_contrato + "",
          "modalidad": c?.modalidad + "",
          "clave_presupuestaria": c?.clave_presupuestaria + "",
          "oficina_pagadora": c?.oficina_pagadora + "",
          "numero": c?.numero + "",
          "amortizacion": c?.amortizacion + "",
          "estatus_parametro": c?.estatus_parametro + "",
          "fecha_registro_parametro": c?.fecha_registro_parametro + "",
          "asignacion_iva": c?.asignacion_iva + "",
          "numero_pedido": c?.numero_pedido ? c?.numero_pedido + "" : null,
          "fecha_pedido": c?.fecha_pedido ? c?.fecha_pedido + "" : null,
          "contabilizado": c?.contabilizado + "",
          "pagado": c?.pagado ? c?.pagado + "" : false,
          "pendiente_contabilizar": c?.pendiente_contabilizar ? c?.pendiente_contabilizar + "" : false,
          "tipo_cambio_parametro": c?.tipo_cambio_parametro ? c?.tipo_cambio_parametro + "" : null,
          "fondo_gtia": c?.fondo_gtia ? c?.fondo_gtia + "" : null,
          "fecha_contabilizado": c?.fecha_contabilizado + "",
          "fecha_pago_lvpl": c?.fecha_pago_lvpl ? c?.fecha_pago_lvpl + "" : null,
          "peps":(c?.peps || []).map((pep:any) => pep.id_pep)
        }
      }));
      if (!_.isEmpty(id_filtro)) {
        handleSelectContrato(contrato_?.[0]);
      }
      setProcesandoData(false);
    } catch (error) {
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || get_elementos_error)
      setProcesandoData(false);
      handleisAlertOpen();
    }
  }, [id_filtro, handleSelectContrato, get_elementos_error, esSupervisor]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleActualizaContrato = async (data: any) => {
    try {
      setProcesando(true);
      await updateContratoHttp({ ...data, ...{ perfil } });
      handleClose();
      setProcesando(false);
      setMensajeAlert(intl.formatMessage({ id: 'http_exito_actualizar' }));
      getData();
      handleisAlertOpen();
    } catch (error) {
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_error_actualizar' }));
      setProcesando(false);
      handleisAlertOpen();
    }
  }

  const handleAsignaUsuariosContrato = (contrato: any) => {
    setContrato_item_id(contrato?.id);
    setObraSeleccion(contrato?.id_obra_principal);
    handleOpenUser();
  }

  const handleActualizaEstatusContratoPregunta = (data: any) => {
    setItemActualizaEstatusContrato(data);
    setOpenModalConfirm(true);
    setTextModalConfirm(intl.formatMessage({ id: 'gestion_contratos_pregunta_actualizar_estatus' }));
  }

  const handleParametrosContrato = async (data: any) => {
    setContrato_item_id(data?.id);
    setParametros(data?.area_expide !== 'null' ? {
      "area_expide": data?.area_expide + "",
      "tipo_contrato": data?.tipo_contrato + "",
      "fecha_contrato": (new Date((data?.fecha_contrato + "") || new Date())).toISOString().split('T')[0],
      "modalidad": data?.modalidad + "",
      "clave_presupuestaria": data?.clave_presupuestaria + "",
      "oficina_pagadora": data?.oficina_pagadora + "",
      "numero": data?.numero + "",
      "fecha_pago_lvpl": (new Date((data?.fecha_pago_lvpl ? data?.fecha_pago_lvpl + "" : null) || new Date())).toISOString().split('T')[0],
      "amortizacion": data?.amortizacion + "",
      "estatus_parametro": data?.estatus_parametro + "",
      "fecha_registro_parametro": (new Date((data?.fecha_registro_parametro + "") || new Date())).toISOString().split('T')[0],
      "asignacion_iva": data?.asignacion_iva + "",
      "numero_pedido": data?.numero_pedido ? data?.numero_pedido + "" : null,
      "fecha_pedido": (new Date((data?.fecha_pedido ? (data?.fecha_pedido + "") : null) || new Date())).toISOString().split('T')[0],
      "contabilizado": (data?.contabilizado + "") === "1" ? true : false,
      "pagado": (data?.pagado + "") === "1" ? true : false,
      "pendiente_contabilizar": (data?.pendiente_contabilizar + "") === "1" ? true : false,
      "tipo_cambio": data?.tipo_cambio_parametro ? data?.tipo_cambio_parametro + "" : null,
      "fondo_gtia": data?.fondo_gtia ? data?.fondo_gtia + "" : null,
      "fecha_contabilizado": (new Date((data?.fecha_contabilizado + "") || new Date())).toISOString().split('T')[0]
    } : null);
    handleOpenParametros();
  }

  const handleActualizaEstatusContrato = async () => {
    try {
      const data = itemActualizaEstatusContrato;
      setProcesando(true);
      await deleteContratoHttp(data);
      handleClose();
      setOpenModalConfirm(false);
      setTextModalConfirm('');
      setItemActualizaEstatusContrato(null);
      setProcesando(false);
      setMensajeAlert(intl.formatMessage({ id: 'http_exito_actualizar' }));
      getData();
      handleisAlertOpen();
    } catch (error) {
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_error_actualizar' }))
      setOpenModalConfirm(false);
      setTextModalConfirm('');
      setItemActualizaEstatusContrato(null);
      setProcesando(false);
      handleisAlertOpen();
    }
  }

  const handleGuardaSeleccionados = async (data: any) => {
    try {
      setProcesando(true);
      await data.reduce(async (a: any, usr: any) => {
        try {
          await a;
          await setUserToContractHTTP({ ...usr, ...{ perfil } });
        } catch (error) {
          setMensajeAlert(intl.formatMessage({ id: 'http_error_asignacion_usuario' }) + ': ' + usr?.email);
          handleisAlertOpen();
        }
      }, Promise.resolve());
      handleCloseUser();
      setProcesando(false);
      getData();
      setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar_asignaciones' }));
      handleisAlertOpen();
    } catch (error) {
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar_asignaciones' }));
      setProcesando(false);
      handleisAlertOpen();
    }
  }

  const handleGuardaUsuario = async (data: any) => {
    try {
      setProcesando(true);
      await setUserToContractHTTP({ ...data, ...{ perfil } });
      setProcesando(false);
      handleCloseUser();
      getData();
      setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar_asignacion' }));
      handleisAlertOpen();
    } catch (error) {
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_error_asignacion_usuario' }));
      setProcesando(false);
      handleisAlertOpen();
    }
  }

  const handleGuardaUsuarioFormulario = async (data: any) => {
    try {
      setProcesando(true);
      await saveUserContrato({ ...data, ...{ perfil } });
      setProcesando(false);
      handleCloseUser();
      getData();
      setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar_asignacion' }));
      handleisAlertOpen();
    } catch (error) {
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_exito_registrar_asignacion' }));
      setProcesando(false);
      handleisAlertOpen();
    }
  }

  const setFormularioParametros = async (data: any) => {
    try {
      setProcesando(true);
      await setParametroToContratoHttp({ ...data, ...{ perfil } });
      setProcesando(false);
      setMensajeAlert(intl.formatMessage({ id: 'http_exito_general_operacion' }));
      getData();
      handleCloseParametros();
      handleisAlertOpen();
    } catch (error) {
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_error_general_operacion' }));
      setProcesando(false);
      handleCloseParametros();
      handleisAlertOpen();
    }
  }

  const ExpandedComponent = (datos_expandible: any) => {
    const itera = Object.assign({}, datos_expandible);
    delete itera.id;
    delete itera.contrato;
    delete itera.id_contrato;
    delete itera.fecha_inicio;
    delete itera.fecha_final;
    delete itera.importe;
    delete itera.estatus;
    delete itera.autorizado;
    delete itera.plantilla;
    delete itera.terminado;
    delete itera.nota;
    delete itera.moneda;
    return (
      <Grid container spacing={2} style={{ backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}>
        <Grid item xs={12} lg={12} style={{ margin: '10px' }}>
          <Card style={{ boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.80)', textAlign: 'center' }}>
            <Grid container>
              <Grid item xs={12} lg={12} >
                <Grid container >
                  <Grid item xs={6} lg={6}>
                    <ListGroup style={{ backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_alertas' })}:</strong> {itera?.alertas}</ListGroup.Item>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_anticipo' })}:</strong> {itera?.anticipo}</ListGroup.Item>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_categoria' })}:</strong> {itera?.categoria}</ListGroup.Item>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_contrato_liberado' })}:</strong> {itera?.contrato_liberado}</ListGroup.Item>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_estatus_firma' })}:</strong> {itera?.estatus_firma}</ListGroup.Item>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_tipo_proyecto' })}:</strong> {+itera?.tipo_proyecto === 1 ? 'Presupuesto' : +itera?.tipo_proyecto === 2 ? 'Cotizado' : 'Contratado'}</ListGroup.Item>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_fecha_limite' })}:</strong> {moment(itera?.fecha_limite).format("DD-MM-YYYY")}</ListGroup.Item>
                    </ListGroup>
                  </Grid>
                  <Grid item xs={6} lg={6} >
                    <ListGroup>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_fecha_registro' })}:</strong> {itera?.fecha_registro}</ListGroup.Item>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_propietario' })}:</strong> {itera?.propietario}</ListGroup.Item>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_reclasificacion' })}:</strong> {itera?.reclasificacion}</ListGroup.Item>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_tipo_cambio' })}:</strong> {itera?.tipo_cambio}</ListGroup.Item>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_tolerancia' })}:</strong> {itera?.tolerancia}</ListGroup.Item>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_autorizado' })}:</strong> {+itera?.autorizado === 0 ? 'Sin envío' : +itera?.autorizado === 1 ? 'Por autorizar' : +itera?.autorizado === 2 ? 'Autorizado' : 'Cancelado'}</ListGroup.Item>
                    </ListGroup>
                  </Grid>
                </Grid>
              </Grid>
              {itera?.area_expide !== 'null' ? <Grid item xs={12} lg={12}>
                <h5 style={{ color: darkMode ? '#fff' : '#344767' }}>{intl.formatMessage({ id: 'gestion_contratos_titulo_parametros_contrato' })}</h5>
                <Grid container spacing={2}>
                  <Grid item xs={3} lg={3}>
                    <ListGroup>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}>
                      <strong>{intl.formatMessage({ id: 'input_area_expide' })}:</strong> {itera?.area_expide}
                      </ListGroup.Item>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}>
                      <strong>{intl.formatMessage({ id: 'inpput_tipo_contrato' })}:</strong> {itera?.tipo_contrato}
                      </ListGroup.Item>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}>
                      <strong>{intl.formatMessage({ id: 'input_fecha_contrato' })}:</strong> {moment(itera?.fecha_contrato).format("DD-MM-YYYY")}
                      </ListGroup.Item>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}>
                      <strong>{intl.formatMessage({ id: 'input_modalidad' })}:</strong> {itera?.modalidad}
                      </ListGroup.Item>
                    </ListGroup>
                  </Grid>
                  <Grid item xs={3} lg={3}>
                    <ListGroup>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}>
                      <strong>{intl.formatMessage({ id: 'input_clave_presupuestaria' })}:</strong> {itera?.clave_presupuestaria}
                      </ListGroup.Item>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}>
                      <strong>{intl.formatMessage({ id: 'input_oficina_pagadora' })}:</strong> {itera?.oficina_pagadora}
                      </ListGroup.Item>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}>
                      <strong>{intl.formatMessage({ id: 'input_amoritzacion' })}:</strong> {itera?.amortizacion}
                      </ListGroup.Item>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}>
                      <strong>{intl.formatMessage({ id: 'input_estatus_parametro' })}:</strong> {itera?.estatus_parametro === "1" ? 'Activo' : 'Inactivo'}
                      </ListGroup.Item>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}>
                      <strong>{intl.formatMessage({ id: 'input_fondo_gtia' })}:</strong> {itera?.fondo_gtia}
                      </ListGroup.Item>
                    </ListGroup>
                  </Grid>
                  <Grid item xs={3} lg={3}>
                    <ListGroup>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}>
                      <strong>{intl.formatMessage({ id: 'input_fecha_registro' })}:</strong> {moment(itera?.fecha_registro_parametro).format("DD-MM-YYYY")}
                      </ListGroup.Item>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}>
                      <strong>{intl.formatMessage({ id: 'input_asignacion_iva' })}:</strong> {itera?.asignacion_iva}
                      </ListGroup.Item>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}>
                      <strong>{intl.formatMessage({ id: 'input_numero_pedido' })}:</strong> {itera?.numero_pedido}
                      </ListGroup.Item>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}>
                      <strong>{intl.formatMessage({ id: 'input_fecha_pedido' })}:</strong> {moment(itera?.fecha_pedido).format("DD-MM-YYYY")}
                      </ListGroup.Item>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}>
                      <strong>{intl.formatMessage({ id: 'input_fecha_contabilizado' })}:</strong> {moment(itera?.fecha_contabilizado).format("DD-MM-YYYY")}
                      </ListGroup.Item>
                    </ListGroup>
                  </Grid>
                  <Grid item xs={3} lg={3}>
                    <ListGroup>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}>
                      <strong>{intl.formatMessage({ id: 'input_contabilizado' })}:</strong> {itera?.contabilizado === "1" ? 'Si' : 'No'}
                      </ListGroup.Item>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}>
                      <strong>{intl.formatMessage({ id: 'input_pagado' })}:</strong> {itera?.pagado === "1" ? 'Si' : 'No'}
                      </ListGroup.Item>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}>
                      <strong>{intl.formatMessage({ id: 'input_pendiente_contabilizar' })}:</strong> {itera?.pendiente_contabilizar === "1" ? 'Si' : 'No'}
                      </ListGroup.Item>
                      <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}>
                      <strong>{intl.formatMessage({ id: 'gestion_contratos_tipo_cambio' })}:</strong> {itera?.tipo_cambio_parametro}
                      </ListGroup.Item>

                    </ListGroup>
                  </Grid>
                </Grid>
              </Grid> : null}
              {itera?.clasificacion_contrato ? <Grid item xs={3} lg={3}>
                <h5 style={{ color: darkMode ? '#fff' : '#344767' }}>{intl.formatMessage({ id: 'gestion_contratos_titulo_clasificacion_contrato' })}</h5>
                <ListGroup>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_id_clasificacion_contrato' })}:</strong> {itera?.clasificacion_contrato}</ListGroup.Item>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_clave_clasificacion_contrato' })}:</strong> {itera?.clave_clasificacion_contrato}</ListGroup.Item>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_nombre_clasificacon_contrato' })}:</strong> {itera?.nombre_clasificacion_contrato}</ListGroup.Item>
                </ListGroup>
              </Grid> : null}
              {itera?.id_contratista ? <Grid item xs={3} lg={3}>
                <h5 style={{ color: darkMode ? '#fff' : '#344767' }}>{intl.formatMessage({ id: 'gestion_contratos_titulo_contratista' })}</h5>
                <ListGroup>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_id_contratista' })}:</strong> {itera?.id_contratista}</ListGroup.Item>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_contratista' })}:</strong> {itera?.contratista}</ListGroup.Item>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_contratista_correo' })}:</strong> {itera?.correo_contratista}</ListGroup.Item>
                </ListGroup>
              </Grid> : null}
              {itera?.pep ? <Grid item xs={3} lg={3}>
                <h5 style={{ color: darkMode ? '#fff' : '#344767' }}>{intl.formatMessage({ id: 'gestion_contratos_titulo_pep' })}</h5>
                <ListGroup>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_pep_id' })}:</strong> {itera?.pep}</ListGroup.Item>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_pep_nombre' })}:</strong> {itera?.nombre_pep}</ListGroup.Item>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_pep_descripcion' })}:</strong> {itera?.descriocion_pep}</ListGroup.Item>
                </ListGroup>
              </Grid> : null}
              {itera?.id_cliente ? <Grid item xs={3} lg={3}>
                <h5 style={{ color: darkMode ? '#fff' : '#344767' }}>{intl.formatMessage({ id: 'gestion_contratos_cliente_titulo' })}</h5>
                <ListGroup>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_cliente_id' })}:</strong> {itera?.id_cliente}</ListGroup.Item>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_cliente_nombre' })}:</strong> {itera?.nombre_cliente}</ListGroup.Item>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_cliente_rfc' })}:</strong> {itera?.rfc_cliente}</ListGroup.Item>
                </ListGroup>
              </Grid> : null}
              {itera?.id_responsable ? <Grid item xs={3} lg={3}>
                <h5 style={{ color: darkMode ? '#fff' : '#344767' }}>{intl.formatMessage({ id: 'gestion_contratos_responsable_titulo' })}</h5>
                <ListGroup>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_responsable_id' })}:</strong> {itera?.id_responsable}</ListGroup.Item>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_responsable_nombre' })}:</strong> {itera?.nombre_responsable}</ListGroup.Item>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_responsable_correo' })}:</strong> {itera?.correo_responsable}</ListGroup.Item>
                </ListGroup>
              </Grid> : null}
              {itera?.id_tipo_contrato ? <Grid item xs={3} lg={3}>
                <h5 style={{ color: darkMode ? '#fff' : '#344767' }}>{intl.formatMessage({ id: 'gestion_contratos_tipo_contrato_titulo' })}</h5>
                <ListGroup>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_tipo_contrato_id' })}:</strong> {itera?.id_tipo_contrato}</ListGroup.Item>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_tipo_contrato_clave' })}:</strong> {itera?.clave_tipo_contrato}</ListGroup.Item>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_tipos_contrato_nombre' })}:</strong> {itera?.nombre_tipo_contrato}</ListGroup.Item>
                </ListGroup>
              </Grid> : null}
              {itera?.tipo_contrato_ext ? <Grid item xs={3} lg={3}>
                <h5 style={{ color: darkMode ? '#fff' : '#344767' }}>{intl.formatMessage({ id: 'gestion_contratos_tipo_contrato_ext_titulo' })}</h5>
                <ListGroup>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_tipo_contrato_ext_id' })}:</strong> {itera?.tipo_contrato_ext}</ListGroup.Item>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_tipo_contrato_ext_clave' })}:</strong> {itera?.clave_contrato_ext}</ListGroup.Item>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_tipos_contrato_ext_nombre' })}:</strong> {itera?.nombre_contrato_ext}</ListGroup.Item>
                </ListGroup>
              </Grid> : null}
              {itera?.id_especialidad ? <Grid item xs={3} lg={3}>
                <h5 style={{ color: darkMode ? '#fff' : '#344767' }}>{intl.formatMessage({ id: 'gestion_contratos_especialidad_titulo' })}</h5>
                <ListGroup>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_especialidad_id' })}:</strong> {itera?.id_especialidad}</ListGroup.Item>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_especialidad_clave' })}:</strong> {itera?.clave_especialidad}</ListGroup.Item>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_especialidad_nombre' })}:</strong> {itera?.nombre_especialidad}</ListGroup.Item>
                </ListGroup>
              </Grid> : null}
              {itera?.id_obra_principal ? <Grid item xs={6} lg={6}>
                <h5 style={{ color: darkMode ? '#fff' : '#344767' }}>{intl.formatMessage({ id: 'gestion_contratos_proyecto_titulo' })}</h5>
                <ListGroup>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_proyecto_id' })}:</strong> {itera?.id_obra_principal}</ListGroup.Item>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_proyecto_nombre' })}:</strong> {itera?.obra}</ListGroup.Item>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_proyecto_descripcion' })}:</strong> {itera?.descrpcion_obra}</ListGroup.Item>
                </ListGroup>
              </Grid> : null}
              {itera?.id_autorizador ? <Grid item xs={6} lg={6}>
                <h5 style={{ color: darkMode ? '#fff' : '#344767' }}>{intl.formatMessage({ id: 'gestion_contratos_autorizador_titulo' })}</h5>
                <ListGroup>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_autorizador_id' })}:</strong> {itera?.id_autorizador}</ListGroup.Item>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_autorizador_nombre' })}:</strong> {itera?.nombre_autorizador}</ListGroup.Item>
                  <ListGroup.Item style={{ fontSize: '14px', backgroundColor: darkMode ? '#1f283e' : 'trasparent', color: darkMode ? '#fff' : 'black' }}><strong>{intl.formatMessage({ id: 'gestion_contratos_autorizador_correo' })}:</strong> {itera?.correo_autorizador}</ListGroup.Item>
                </ListGroup>
              </Grid> : null}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    );
  }

  const handleDesasignarUsuarioPregunta = (usr: any) => {
    setItemActualizaEstatusContrato_2(usr);
    setOpenModalConfirm_2(true);
    setTextModalConfirm_2(intl.formatMessage({ id: 'gestion_contratos_pregunta_eliminar_asignacion_usuario_contrato' }));
  }

  const handleDesasignarUsuario = async () => {
    try {
      const usr = itemActualizaEstatusContrato_2;
      setProcesando(true);
      await unSetUserToContractHTTP(usr);
      handleCloseUserAsinados();
      getData();
      setItemActualizaEstatusContrato_2(null);
      setOpenModalConfirm_2(false);
      setTextModalConfirm_2('');
      setMensajeAlert(intl.formatMessage({ id: 'gestion_contratos_exito_eliminar_asignacion' }));
      handleisAlertOpen();
    } catch (error) {
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'gestion_contratos_error_eliminar_asignacion' }));
      setItemActualizaEstatusContrato_2(null);
      setOpenModalConfirm_2(false);
      setTextModalConfirm_2('');
      setProcesando(false);
      handleCloseUserAsinados();
    }
  }

  const UsuariosAsigados = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12} style={{ margin: '10px' }}>
          <ListGroup style={ususariosAsignados?.length ? {} : { textAlign: 'center' }}>
            {ususariosAsignados?.length ? ususariosAsignados?.map((e: any, key: number) => {
              return (
                <ListGroup.Item key={key} style={{ fontSize: '14px' }}>
                  <Card style={{ padding: '10px' }}>
                    <label>
                      {intl.formatMessage({ id: 'general_nombre' })}:
                      <p className='form-control'>{e?.nombre_usuario} </p>
                    </label>
                    <br />
                    <label>
                      {intl.formatMessage({ id: 'general_correo' })}:
                      <p className='form-control'>{e?.correo_usuario} </p>
                    </label>
                    <br />
                    <label>
                      {intl.formatMessage({ id: 'general_puesto' })}:
                      <p className='form-control'>{e?.puesto} </p>
                    </label>
                    <br />
                    <label>
                      {intl.formatMessage({ id: 'general_perfil' })}:
                      <p className='form-control'>{e?.nombre_perfil} </p>
                    </label>
                    <br />
                    <Button
                      id="basic-button"
                      aria-haspopup="true"
                      onClick={() => {
                        handleDesasignarUsuarioPregunta(e);
                      }}
                    >
                      <DeleteIcon fontSize="large" /> {intl.formatMessage({ id: 'gestion_contratos_btn_eliminar_asignacion_usuario' })}
                    </Button>
                  </Card>
                </ListGroup.Item>
              )
            }) : <h1>{intl.formatMessage({ id: 'gestion_contratos_info_sin_usuarios_asignados' })}</h1>}
          </ListGroup>
        </Grid>
      </Grid>
    );
  }


  const configsButton: any = !_.isEmpty(espacio) ? (
    <ComplexProjectCard
      muestraAvances
      image={espacio?.foto}
      title={espacio?.obra}
      element={espacio}
      contratos={espacio?.ctaAsignados}
      description={espacio?.descripcion}
      dateTime={moment(espacio?.fecha_fin).format("DD-MM-YYYY")}
      members={espacio?.asignados}
    />
  ) as any : null;

  return {
    datos_tabla,
    setUsuariosAsignados,
    handleOpenUserAsinados,
    setContrato_item_id,
    setObraSeleccion,
    handleOpen,
    handleActualizaEstatusContrato,
    handleActualizaEstatusContratoPregunta,
    handleAsignaUsuariosContrato,
    AllowCell,
    ExpandedComponent,
    procesando,
    handleClose,
    isOpen,
    obraSeleccion,
    darkMode,
    responsables,
    clientes,
    setResetForm,
    resetForm,
    handleActualizaContrato,
    contrato_item_id,
    handleCloseUser,
    isOpenUser,
    contrato,
    handleGuardaSeleccionados,
    handleGuardaUsuario,
    handleGuardaUsuarioFormulario,
    handleCloseUserAsinados,
    isOpenUserAsinados,
    UsuariosAsigados,
    handleisAlerClose,
    isAlertOpen,
    mensajeAlert,
    openModalConfirm,
    setOpenModalConfirm,
    textModalConfirm,
    setTextModalConfirm,
    setItemActualizaEstatusContrato,
    openModalConfirm_2,
    setOpenModalConfirm_2,
    textModalConfirm_2,
    setTextModalConfirm_2,
    handleDesasignarUsuario,
    setItemActualizaEstatusContrato_2,
    handleCloseParametros,
    isOpenParametros,
    handleParametrosContrato,
    parametros,
    setFormularioParametros,
    configsButton,
    espacio,
    procesandoData
  }
}

export default useGestionContratosPage
