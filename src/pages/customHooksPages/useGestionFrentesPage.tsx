import { setAhut } from '../../actions/auth';
import env from "react-dotenv";
import React, {
  useCallback,
  useEffect,
  useState,
  useContext
} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../types/geericTypes';
import ComplexProjectCard from '../../examples/Cards/ProjectCards/ComplexProjectCard';
import moment from 'moment';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import { useMaterialUIController } from 'context';
import {
  actualizaEstatusHttp,
  actualizaFrenteHttp,
  addMediaFrenteHttp,
  deleteNotasFrenteHttp,
  editNotasFrenteHttp,
  getFrentesByIdContratoHttp,
  removeMediaFrenteHttp,
  setNotasFrenteHttp
} from '../../actions/frentes';
import { getErrorHttpMessage, sleep } from '../../utils';
import { useIntl } from 'react-intl';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { actualizaEstatusConceptoHttp, actualizaProveedorPorConceptoHttp, addHitosConceptoHttp, addMediaHttp, agregaProveedorConceptoHttp, eliminaProveedorPorConceptoHttp, getResponsablesHttp, guardaConceptoHttp, setResponsablesConceptoHttp, verProveedorPorConceptoHttp } from '../../actions/conceptos';
import { useNavigate } from 'react-router-dom';
import MenuExpandible from '../../componets/MenuExpandible';
import { perfilContext } from '../../context/perfilContexto';
import { getEspacioUtilizadoProyectoHTTP } from '../../actions/proyectos';
import {prediccionConceptosHTTP} from '../../actions/dinamic.dashboard'
import { setEspacioTrabajo } from '../../actions/espacioTrabajo';
import { analizaImagenHttp, creaParametroHttp, editaParametroHttp, eliminaGrabacionHttp, eliminaParametroHttp, generaReportePeriodosVariosHttp, getDataQueryReportesCreadoshHttp, getDataQueryVozhHttp, getParametrosHttp, reportSpeachHttp } from '../../actions/reportesIA';


const useGestionFrentesPage = () => {
  const perfil = useContext(perfilContext);
  const intl = useIntl();
  const navigate = useNavigate();
  const [errorFlujoContrato, setErrorFlujoContrato] = useState<boolean>(false);
  const [errorFlujo, setErrorFlujo] = useState<boolean>(false);
  const id_usuario = useSelector((state: any) => state?.app?.user?.data?.id || 0);
  const esCoordinador = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 1);
  const esModoDios = useSelector((state: any) => (state?.app?.user?.data?.id_tipo_usuario || 0) === 3);
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [mediaEdit, setMediaEdit] = useState<any>(null);

  const [notaEdit, setNotaEdit] = useState<any>();
  const [isAlertOpenNotaEdit, setIsAlertOpenNotaEdit] = useState(false);
  const handleisAlertOpenNotaEdit = () => setIsAlertOpenNotaEdit(true);
  const handleisAlerCloseNotaEdit = () => setIsAlertOpenNotaEdit(false);


  const [isAlertOpenIA, setIsAlertOpenIA] = useState(false);
  const handleisAlertOpenIA = () => setIsAlertOpenIA(true);
  const handleisAlerCloseIA = () => setIsAlertOpenIA(false);

  const [conceptoIdIA, setConceptoIdIA] = useState<any>(0);
  const [isAlertOpenIAConcepto, setIsAlertOpenIAConcepto] = useState(false);
  const handleisAlertOpenIAConcepto = () => setIsAlertOpenIAConcepto(true);
  const handleisAlerCloseIAConcepto = () => setIsAlertOpenIAConcepto(false);


  const [frentes_, setFrentes_] = useState<any[]>([]);
  const [frentes, setFrentes] = useState<any[] | null>(null);
  const [procesando, setProcesando] = useState(false);
  const [esExitoEditaFrente, setEsExitoEditaFrente] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [mensajeAlert, setMensajeAlert] = useState('');
  const handleisAlertOpen = () => setIsAlertOpen(true);
  const handleisAlerClose = () => {
    if (errorFlujo) {
      navigate('/inicio');
    }
    if (errorFlujoContrato) {
      navigate('/sesion-trabajo-contratos');
    }
    if (esExitoEditaFrente) {
      window.location.reload();
    }
    setIsAlertOpen(false)
  };
  const espacio = useSelector((state: any) => state?.app?.espacio || null);
  const token = useSelector((state: StoreType) => state?.app?.user?.token || '');
  const contrato = useSelector((state: any) => state?.app?.contrato || null);
  const [itemEdit, setItemEdit] = useState<any>(null);

  const [isAlertOpenEdit, setIsAlertOpenEdit] = useState(false);
  const handleisAlertOpenEdit = () => setIsAlertOpenEdit(true);
  const handleisAlerCloseEdit = () => setIsAlertOpenEdit(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [textModalConfirm, setTextModalConfirm] = useState('');

  const [openModalConfirmDocumento, setOpenModalConfirmDocumento] = useState(false);
  const [textModalConfirmDocumento, setTextModalConfirmDocumento] = useState('');


  const [frentesForm, setFrentesForm] = useState<any[]>([]);
  const [isAlertOpenConcepto, setIsAlertOpenConcepto] = useState(false);
  const handleisAlertOpenConcepto = () => setIsAlertOpenConcepto(true);
  const handleisAlerCloseConcepto = () => setIsAlertOpenConcepto(false);
  const [responsables, setResponsables] = useState<any[]>([]);

  const [openModalConfirmProveedor, setOpenModalConfirmProveedor] = useState(false);
  const [textModalConfirmProveedor, setTextModalConfirmProveedor] = useState('');


  const [openModalConfirmNotaDelete, setOpenModalConfirmNotaDelete] = useState(false);
  const [textModalConfirmNotaDelete, setTextModalConfirmNotaDelete] = useState('');


  const [isAlertOpenHitos, setIsAlertOpenHitos] = useState(false);
  const handleisAlertOpenHitos = () => setIsAlertOpenHitos(true);
  const handleisAlerCloseHitos = () => setIsAlertOpenHitos(false);


  const [isAlertOpenResponsables, setIsAlertOpenResponsables] = useState(false);
  const handleisAlertOpenResponsables = () => setIsAlertOpenResponsables(true);
  const handleisAlerCloseResponsables = () => setIsAlertOpenResponsables(false);


  const [isAlertOpenProveedorConcepto, setIsAlertOpenProveedorConcepto] = useState(false);
  const handleisAlertOpenProveedorConcepto = () => setIsAlertOpenProveedorConcepto(true);
  const handleisAlerCloseProveedorConcepto = () => setIsAlertOpenProveedorConcepto(false);
  const [proveedoresConcepto, setProveedoresConcepto] = useState<any[]>([]);
  const [isAlertOpenProveedorConceptoInfo, setIsAlertOpenProveedorConceptoInfo] = useState(false);
  const handleisAlertOpenProveedorConceptoInfo = () => setIsAlertOpenProveedorConceptoInfo(true);
  const handleisAlerCloseProveedorConceptoInfo = () => setIsAlertOpenProveedorConceptoInfo(false);
  const [proveedoreDetalleConcepto, setProveedoreDetalleConcepto] = useState<any[]>([]);

  const [detalleConcepto, setDetalleConcepto] = useState<any>(null)
  const [isAlertOpenConceptoDetalle, setIsAlertOpenConceptoDetalle] = useState(false);
  const handleisAlertOpenConceptoDetalle = () => setIsAlertOpenConceptoDetalle(true);
  const handleisAlerCloseConceptoDetalle = () => setIsAlertOpenConceptoDetalle(false);


  const [isAlertOpenVerFrente, setIsAlertOpenVerFrente] = useState(false);
  const handleisAlertOpenVerFrente = () => setIsAlertOpenVerFrente(true);
  const handleisAlerCloseVerFrente = () => {
    setIsAlertOpenVerFrente(false)
    setItemEdit(null);
  };


  const [isAlertOpenVerDocumentos, setIsAlertOpenVerDocumentos] = useState(false);
  const handleisAlertOpenVerDocumentos = () => setIsAlertOpenVerDocumentos(true);
  const handleisAlerCloseVerDocumentos = () => {
    setIsAlertOpenVerDocumentos(false)

  };


  const [isAlertOpenSubirDocumentos, setIsAlertOpenSubirDocumentos] = useState(false);
  const handleisAlertOpenSubirDocumentos = () => setIsAlertOpenSubirDocumentos(true);
  const handleisAlerCloseSubirDocumentos = () => {
    setIsAlertOpenSubirDocumentos(false);
    setItemEdit(null);
  }


  const [isAlertOpenVerNotas, setIsAlertOpenVerNotas] = useState(false);
  const handleisAlertOpenVerNotas = () => setIsAlertOpenVerNotas(true);
  const handleisAlerCloseVerNotas = () => {
    setIsAlertOpenVerNotas(false);
    setItemEdit(null);
  }


  const [isAlertOpenSubirNotas, setIsAlertOpenSubirNotas] = useState(false);
  const handleisAlertOpenSubirNotas = () => setIsAlertOpenSubirNotas(true);
  const handleisAlerCloseSubirNotas = () => {
    setIsAlertOpenSubirNotas(false);
    setItemEdit(null);
  }

  const [isAlertOpenMediaConcepto, setIsAlertOpenMediaConcepto] = useState(false);
  const handleisAlertOpenMediaConcepto = () => setIsAlertOpenMediaConcepto(true);
  const handleisAlerCloseMediaConcepto = () => setIsAlertOpenMediaConcepto(false);

  const dispatch = useDispatch();
  const handleGuardaConceptos = async (data: any) => {
    try {
      setProcesando(true);
      await guardaConceptoHttp({ ...data, ...{ perfil } });
      getDataFrentes()
      handleisAlerCloseConcepto();
      setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
      handleisAlertOpen();
    } catch (err) {
      setProcesando(false);
      const message = getErrorHttpMessage(err);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
      handleisAlertOpen();
    }
  }

  useEffect(() => {
    setAhut(token);
  }, [token]);

  const configsButton: any = espacio ? (
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


  const nivelVeinte = (frentes_: any, all: any) => {
    const d = (frentes_ || []).map((a: any) => {
      const frentesNivelDos = (a?.nivelUno || []).map((s: any) => {
        const frentesNivelTres = (s?.nivelDos || []).map((r: any) => {
          const frentesNivelCuatro = (r?.nivelTres || []).map((w: any) => {
            const FrentesNivelCinco = (w?.nivelCuatro || []).map((z: any) => {
              const frentesNivelSeis = (z?.nivelCinco || []).map((t: any) => {
                const frentesNivelSiete = (t?.nivelSeis || []).map((p: any) => {
                  const frenteNivelOcho = (p?.nivelSiete || []).map((l: any) => {
                    const frenteNivelNueve = (l?.nivelOcho || []).map((m: any) => {
                      const frenteNivelDiez = (m?.nivelNueve || []).map((n: any) => {
                        const FrenteNivelOnce = (n?.nivelDiez || []).map((o: any) => {
                          const frenteNivelDoce = (o?.nivelOnce || []).map((q: any) => {
                            const frenteNivelTrece = (q?.nivelDoce || []).map((u: any) => {
                              const frenteNivelCatorce = (u?.nivelTrece || []).map((w: any) => {
                                const frenteNivelQuince = (w?.nivelCatorce || []).map((x: any) => {
                                  const frenteNivelDieciseis = (x?.nivelQuince || []).map((y: any) => {
                                    const frenteNivelDiecisiete = (y?.nivelDieciseis || []).map((z: any) => {
                                      const frenteNivelDieciocho = (z?.nivelDiecisiete || []).map((za: any) => {
                                        const frenteNivelDiecinueve = (za?.nivelDieciocho || []).map((zb: any) => {
                                          const frenteNivelVeinte = (zb?.nivelDiecinueve || []).map((zc: any) => {
                                            const nivelVeinte = (all || []).filter((e: any) => +e?.id_frente === zc?.id);
                                            return { ...zc, ...{ nivelVeinte } }
                                          })
                                          return { ...zb, ...{ nivelDiecinueve: frenteNivelVeinte } }
                                        })
                                        return { ...za, ...{ nivelDieciocho: frenteNivelDiecinueve } }
                                      })
                                      return { ...z, ...{ nivelDiecisiete: frenteNivelDieciocho } }
                                    })
                                    return { ...y, ...{ nivelDieciseis: frenteNivelDiecisiete } }
                                  })
                                  return { ...x, ...{ nivelQuince: frenteNivelDieciseis } }
                                })
                                return { ...w, ...{ nivelCatorce: frenteNivelQuince } }
                              })
                              return { ...u, ...{ nivelTrece: frenteNivelCatorce } }
                            })
                            return { ...q, ...{ nivelDoce: frenteNivelTrece } }
                          })
                          return { ...o, ...{ nivelOnce: frenteNivelDoce } }
                        })
                        return { ...n, ...{ nivelDiez: FrenteNivelOnce } }
                      });
                      return { ...m, ...{ nivelNueve: frenteNivelDiez } }
                    })
                    return { ...l, ...{ nivelOcho: frenteNivelNueve } }
                  })
                  return { ...p, ...{ nivelSiete: frenteNivelOcho } }
                })
                return { ...t, ...{ nivelSeis: frentesNivelSiete } }
              })
              return { ...z, ...{ nivelCinco: frentesNivelSeis } }
            })
            return { ...w, ...{ nivelCuatro: FrentesNivelCinco } }
          })
          return { ...r, ...{ nivelTres: frentesNivelCuatro } }
        })
        return { ...s, ...{ nivelDos: frentesNivelTres } }
      })
      return { ...a, ...{ nivelUno: frentesNivelDos } }
    });
    setFrentes(d);
  }

  const nivelDiecinueve = (frentes_: any, all: any) => {
    const d = (frentes_ || []).map((a: any) => {
      const frentesNivelDos = (a?.nivelUno || []).map((s: any) => {
        const frentesNivelTres = (s?.nivelDos || []).map((r: any) => {
          const frentesNivelCuatro = (r?.nivelTres || []).map((w: any) => {
            const FrentesNivelCinco = (w?.nivelCuatro || []).map((z: any) => {
              const frentesNivelSeis = (z?.nivelCinco || []).map((t: any) => {
                const frentesNivelSiete = (t?.nivelSeis || []).map((p: any) => {
                  const frenteNivelOcho = (p?.nivelSiete || []).map((l: any) => {
                    const frenteNivelNueve = (l?.nivelOcho || []).map((m: any) => {
                      const frenteNivelDiez = (m?.nivelNueve || []).map((n: any) => {
                        const FrenteNivelOnce = (n?.nivelDiez || []).map((o: any) => {
                          const frenteNivelDoce = (o?.nivelOnce || []).map((q: any) => {
                            const frenteNivelTrece = (q?.nivelDoce || []).map((u: any) => {
                              const frenteNivelCatorce = (u?.nivelTrece || []).map((w: any) => {
                                const frenteNivelQuince = (w?.nivelCatorce || []).map((x: any) => {
                                  const frenteNivelDieciseis = (x?.nivelQuince || []).map((y: any) => {
                                    const frenteNivelDiecisiete = (y?.nivelDieciseis || []).map((z: any) => {
                                      const frenteNivelDieciocho = (z?.nivelDiecisiete || []).map((za: any) => {
                                        const frenteNivelDiecinueve = (za?.nivelDieciocho || []).map((zb: any) => {
                                          const nivelDiecinueve = (all || []).filter((e: any) => +e?.id_frente === zb?.id);
                                          return { ...zb, ...{ nivelDiecinueve } }
                                        })
                                        return { ...za, ...{ nivelDieciocho: frenteNivelDiecinueve } }
                                      })

                                      return { ...z, ...{ nivelDiecisiete: frenteNivelDieciocho } }
                                    })
                                    return { ...y, ...{ nivelDieciseis: frenteNivelDiecisiete } }
                                  })
                                  return { ...x, ...{ nivelQuince: frenteNivelDieciseis } }
                                })
                                return { ...w, ...{ nivelCatorce: frenteNivelQuince } }
                              })
                              return { ...u, ...{ nivelTrece: frenteNivelCatorce } }
                            })
                            return { ...q, ...{ nivelDoce: frenteNivelTrece } }
                          })
                          return { ...o, ...{ nivelOnce: frenteNivelDoce } }
                        })
                        return { ...n, ...{ nivelDiez: FrenteNivelOnce } }
                      });
                      return { ...m, ...{ nivelNueve: frenteNivelDiez } }
                    })
                    return { ...l, ...{ nivelOcho: frenteNivelNueve } }
                  })
                  return { ...p, ...{ nivelSiete: frenteNivelOcho } }
                })
                return { ...t, ...{ nivelSeis: frentesNivelSiete } }
              })
              return { ...z, ...{ nivelCinco: frentesNivelSeis } }
            })
            return { ...w, ...{ nivelCuatro: FrentesNivelCinco } }
          })
          return { ...r, ...{ nivelTres: frentesNivelCuatro } }
        })
        return { ...s, ...{ nivelDos: frentesNivelTres } }
      })
      return { ...a, ...{ nivelUno: frentesNivelDos } }
    });
    nivelVeinte(d, all);
  }

  const nivelDieciocho = (frentes_: any, all: any) => {
    const d = (frentes_ || []).map((a: any) => {
      const frentesNivelDos = (a?.nivelUno || []).map((s: any) => {
        const frentesNivelTres = (s?.nivelDos || []).map((r: any) => {
          const frentesNivelCuatro = (r?.nivelTres || []).map((w: any) => {
            const FrentesNivelCinco = (w?.nivelCuatro || []).map((z: any) => {
              const frentesNivelSeis = (z?.nivelCinco || []).map((t: any) => {
                const frentesNivelSiete = (t?.nivelSeis || []).map((p: any) => {
                  const frenteNivelOcho = (p?.nivelSiete || []).map((l: any) => {
                    const frenteNivelNueve = (l?.nivelOcho || []).map((m: any) => {
                      const frenteNivelDiez = (m?.nivelNueve || []).map((n: any) => {
                        const FrenteNivelOnce = (n?.nivelDiez || []).map((o: any) => {
                          const frenteNivelDoce = (o?.nivelOnce || []).map((q: any) => {
                            const frenteNivelTrece = (q?.nivelDoce || []).map((u: any) => {
                              const frenteNivelCatorce = (u?.nivelTrece || []).map((w: any) => {
                                const frenteNivelQuince = (w?.nivelCatorce || []).map((x: any) => {
                                  const frenteNivelDieciseis = (x?.nivelQuince || []).map((y: any) => {
                                    const frenteNivelDiecisiete = (y?.nivelDieciseis || []).map((z: any) => {
                                      const frenteNivelDieciocho = (z?.nivelDiecisiete || []).map((za: any) => {
                                        const nivelDieciocho = (all || []).filter((e: any) => +e?.id_frente === za?.id);
                                        return { ...za, ...{ nivelDieciocho } }
                                      })
                                      return { ...z, ...{ nivelDiecisiete: frenteNivelDieciocho } }
                                    })
                                    return { ...y, ...{ nivelDieciseis: frenteNivelDiecisiete } }
                                  })
                                  return { ...x, ...{ nivelQuince: frenteNivelDieciseis } }
                                })
                                return { ...w, ...{ nivelCatorce: frenteNivelQuince } }
                              })
                              return { ...u, ...{ nivelTrece: frenteNivelCatorce } }
                            })
                            return { ...q, ...{ nivelDoce: frenteNivelTrece } }
                          })
                          return { ...o, ...{ nivelOnce: frenteNivelDoce } }
                        })
                        return { ...n, ...{ nivelDiez: FrenteNivelOnce } }
                      });
                      return { ...m, ...{ nivelNueve: frenteNivelDiez } }
                    })
                    return { ...l, ...{ nivelOcho: frenteNivelNueve } }
                  })
                  return { ...p, ...{ nivelSiete: frenteNivelOcho } }
                })
                return { ...t, ...{ nivelSeis: frentesNivelSiete } }
              })
              return { ...z, ...{ nivelCinco: frentesNivelSeis } }
            })
            return { ...w, ...{ nivelCuatro: FrentesNivelCinco } }
          })
          return { ...r, ...{ nivelTres: frentesNivelCuatro } }
        })
        return { ...s, ...{ nivelDos: frentesNivelTres } }
      })
      return { ...a, ...{ nivelUno: frentesNivelDos } }
    });
    nivelDiecinueve(d, all);
  }

  const nivelDiecisiete = (frentes_: any, all: any) => {
    const d = (frentes_ || []).map((a: any) => {
      const frentesNivelDos = (a?.nivelUno || []).map((s: any) => {
        const frentesNivelTres = (s?.nivelDos || []).map((r: any) => {
          const frentesNivelCuatro = (r?.nivelTres || []).map((w: any) => {
            const FrentesNivelCinco = (w?.nivelCuatro || []).map((z: any) => {
              const frentesNivelSeis = (z?.nivelCinco || []).map((t: any) => {
                const frentesNivelSiete = (t?.nivelSeis || []).map((p: any) => {
                  const frenteNivelOcho = (p?.nivelSiete || []).map((l: any) => {
                    const frenteNivelNueve = (l?.nivelOcho || []).map((m: any) => {
                      const frenteNivelDiez = (m?.nivelNueve || []).map((n: any) => {
                        const FrenteNivelOnce = (n?.nivelDiez || []).map((o: any) => {
                          const frenteNivelDoce = (o?.nivelOnce || []).map((q: any) => {
                            const frenteNivelTrece = (q?.nivelDoce || []).map((u: any) => {
                              const frenteNivelCatorce = (u?.nivelTrece || []).map((w: any) => {
                                const frenteNivelQuince = (w?.nivelCatorce || []).map((x: any) => {
                                  const frenteNivelDieciseis = (x?.nivelQuince || []).map((y: any) => {
                                    const frenteNivelDiecisiete = (y?.nivelDieciseis || []).map((z: any) => {
                                      const nivelDiecisiete = (all || []).filter((e: any) => +e?.id_frente === z?.id);
                                      return { ...z, ...{ nivelDiecisiete } }
                                    })
                                    return { ...y, ...{ nivelDieciseis: frenteNivelDiecisiete } }
                                  })
                                  return { ...x, ...{ nivelQuince: frenteNivelDieciseis } }
                                })
                                return { ...w, ...{ nivelCatorce: frenteNivelQuince } }
                              })
                              return { ...u, ...{ nivelTrece: frenteNivelCatorce } }
                            })
                            return { ...q, ...{ nivelDoce: frenteNivelTrece } }
                          })
                          return { ...o, ...{ nivelOnce: frenteNivelDoce } }
                        })
                        return { ...n, ...{ nivelDiez: FrenteNivelOnce } }
                      });
                      return { ...m, ...{ nivelNueve: frenteNivelDiez } }
                    })
                    return { ...l, ...{ nivelOcho: frenteNivelNueve } }
                  })
                  return { ...p, ...{ nivelSiete: frenteNivelOcho } }
                })
                return { ...t, ...{ nivelSeis: frentesNivelSiete } }
              })
              return { ...z, ...{ nivelCinco: frentesNivelSeis } }
            })
            return { ...w, ...{ nivelCuatro: FrentesNivelCinco } }
          })
          return { ...r, ...{ nivelTres: frentesNivelCuatro } }
        })
        return { ...s, ...{ nivelDos: frentesNivelTres } }
      })
      return { ...a, ...{ nivelUno: frentesNivelDos } }
    });
    nivelDieciocho(d, all);
  }

  const nivelDieciseis = (frentes_: any, all: any) => {
    const d = (frentes_ || []).map((a: any) => {
      const frentesNivelDos = (a?.nivelUno || []).map((s: any) => {
        const frentesNivelTres = (s?.nivelDos || []).map((r: any) => {
          const frentesNivelCuatro = (r?.nivelTres || []).map((w: any) => {
            const FrentesNivelCinco = (w?.nivelCuatro || []).map((z: any) => {
              const frentesNivelSeis = (z?.nivelCinco || []).map((t: any) => {
                const frentesNivelSiete = (t?.nivelSeis || []).map((p: any) => {
                  const frenteNivelOcho = (p?.nivelSiete || []).map((l: any) => {
                    const frenteNivelNueve = (l?.nivelOcho || []).map((m: any) => {
                      const frenteNivelDiez = (m?.nivelNueve || []).map((n: any) => {
                        const FrenteNivelOnce = (n?.nivelDiez || []).map((o: any) => {
                          const frenteNivelDoce = (o?.nivelOnce || []).map((q: any) => {
                            const frenteNivelTrece = (q?.nivelDoce || []).map((u: any) => {
                              const frenteNivelCatorce = (u?.nivelTrece || []).map((w: any) => {
                                const frenteNivelQuince = (w?.nivelCatorce || []).map((x: any) => {
                                  const frenteNivelDieciseis = (x?.nivelQuince || []).map((y: any) => {
                                    const nivelDieciseis = (all || []).filter((e: any) => +e?.id_frente === y?.id);
                                    return { ...y, ...{ nivelDieciseis } }
                                  })
                                  return { ...x, ...{ nivelQuince: frenteNivelDieciseis } }
                                })
                                return { ...w, ...{ nivelCatorce: frenteNivelQuince } }
                              })
                              return { ...u, ...{ nivelTrece: frenteNivelCatorce } }
                            })
                            return { ...q, ...{ nivelDoce: frenteNivelTrece } }
                          })
                          return { ...o, ...{ nivelOnce: frenteNivelDoce } }
                        })
                        return { ...n, ...{ nivelDiez: FrenteNivelOnce } }
                      });
                      return { ...m, ...{ nivelNueve: frenteNivelDiez } }
                    })
                    return { ...l, ...{ nivelOcho: frenteNivelNueve } }
                  })
                  return { ...p, ...{ nivelSiete: frenteNivelOcho } }
                })
                return { ...t, ...{ nivelSeis: frentesNivelSiete } }
              })
              return { ...z, ...{ nivelCinco: frentesNivelSeis } }
            })
            return { ...w, ...{ nivelCuatro: FrentesNivelCinco } }
          })
          return { ...r, ...{ nivelTres: frentesNivelCuatro } }
        })
        return { ...s, ...{ nivelDos: frentesNivelTres } }
      })
      return { ...a, ...{ nivelUno: frentesNivelDos } }
    });
    nivelDiecisiete(d, all);
  }

  const nivelQuince = (frentes_: any, all: any) => {
    const d = (frentes_ || []).map((a: any) => {
      const frentesNivelDos = (a?.nivelUno || []).map((s: any) => {
        const frentesNivelTres = (s?.nivelDos || []).map((r: any) => {
          const frentesNivelCuatro = (r?.nivelTres || []).map((w: any) => {
            const FrentesNivelCinco = (w?.nivelCuatro || []).map((z: any) => {
              const frentesNivelSeis = (z?.nivelCinco || []).map((t: any) => {
                const frentesNivelSiete = (t?.nivelSeis || []).map((p: any) => {
                  const frenteNivelOcho = (p?.nivelSiete || []).map((l: any) => {
                    const frenteNivelNueve = (l?.nivelOcho || []).map((m: any) => {
                      const frenteNivelDiez = (m?.nivelNueve || []).map((n: any) => {
                        const FrenteNivelOnce = (n?.nivelDiez || []).map((o: any) => {
                          const frenteNivelDoce = (o?.nivelOnce || []).map((q: any) => {
                            const frenteNivelTrece = (q?.nivelDoce || []).map((u: any) => {
                              const frenteNivelCatorce = (u?.nivelTrece || []).map((w: any) => {
                                const frenteNivelQuince = (w?.nivelCatorce || []).map((x: any) => {
                                  const nivelQuince = (all || []).filter((e: any) => +e?.id_frente === x?.id);
                                  return { ...x, ...{ nivelQuince } }
                                })
                                return { ...w, ...{ nivelCatorce: frenteNivelQuince } }
                              })
                              return { ...u, ...{ nivelTrece: frenteNivelCatorce } }
                            })
                            return { ...q, ...{ nivelDoce: frenteNivelTrece } }
                          })
                          return { ...o, ...{ nivelOnce: frenteNivelDoce } }
                        })
                        return { ...n, ...{ nivelDiez: FrenteNivelOnce } }
                      });
                      return { ...m, ...{ nivelNueve: frenteNivelDiez } }
                    })
                    return { ...l, ...{ nivelOcho: frenteNivelNueve } }
                  })
                  return { ...p, ...{ nivelSiete: frenteNivelOcho } }
                })
                return { ...t, ...{ nivelSeis: frentesNivelSiete } }
              })
              return { ...z, ...{ nivelCinco: frentesNivelSeis } }
            })
            return { ...w, ...{ nivelCuatro: FrentesNivelCinco } }
          })
          return { ...r, ...{ nivelTres: frentesNivelCuatro } }
        })
        return { ...s, ...{ nivelDos: frentesNivelTres } }
      })
      return { ...a, ...{ nivelUno: frentesNivelDos } }
    });
    nivelDieciseis(d, all);
  }

  const nivelCatorce = (frentes_: any, all: any) => {
    const d = (frentes_ || []).map((a: any) => {
      const frentesNivelDos = (a?.nivelUno || []).map((s: any) => {
        const frentesNivelTres = (s?.nivelDos || []).map((r: any) => {
          const frentesNivelCuatro = (r?.nivelTres || []).map((w: any) => {
            const FrentesNivelCinco = (w?.nivelCuatro || []).map((z: any) => {
              const frentesNivelSeis = (z?.nivelCinco || []).map((t: any) => {
                const frentesNivelSiete = (t?.nivelSeis || []).map((p: any) => {
                  const frenteNivelOcho = (p?.nivelSiete || []).map((l: any) => {
                    const frenteNivelNueve = (l?.nivelOcho || []).map((m: any) => {
                      const frenteNivelDiez = (m?.nivelNueve || []).map((n: any) => {
                        const FrenteNivelOnce = (n?.nivelDiez || []).map((o: any) => {
                          const frenteNivelDoce = (o?.nivelOnce || []).map((q: any) => {
                            const frenteNivelTrece = (q?.nivelDoce || []).map((u: any) => {
                              const frenteNivelCatorce = (u?.nivelTrece || []).map((w: any) => {
                                const nivelCatorce = (all || []).filter((e: any) => +e?.id_frente === w?.id);
                                return { ...w, ...{ nivelCatorce } }
                              })
                              return { ...u, ...{ nivelTrece: frenteNivelCatorce } }
                            })
                            return { ...q, ...{ nivelDoce: frenteNivelTrece } }
                          })
                          return { ...o, ...{ nivelOnce: frenteNivelDoce } }
                        })
                        return { ...n, ...{ nivelDiez: FrenteNivelOnce } }
                      });
                      return { ...m, ...{ nivelNueve: frenteNivelDiez } }
                    })
                    return { ...l, ...{ nivelOcho: frenteNivelNueve } }
                  })
                  return { ...p, ...{ nivelSiete: frenteNivelOcho } }
                })
                return { ...t, ...{ nivelSeis: frentesNivelSiete } }
              })
              return { ...z, ...{ nivelCinco: frentesNivelSeis } }
            })
            return { ...w, ...{ nivelCuatro: FrentesNivelCinco } }
          })
          return { ...r, ...{ nivelTres: frentesNivelCuatro } }
        })
        return { ...s, ...{ nivelDos: frentesNivelTres } }
      })
      return { ...a, ...{ nivelUno: frentesNivelDos } }
    });
    nivelQuince(d, all);
  }

  const nivelTrese = (frentes_: any, all: any) => {
    const d = (frentes_ || []).map((a: any) => {
      const frentesNivelDos = (a?.nivelUno || []).map((s: any) => {
        const frentesNivelTres = (s?.nivelDos || []).map((r: any) => {
          const frentesNivelCuatro = (r?.nivelTres || []).map((w: any) => {
            const FrentesNivelCinco = (w?.nivelCuatro || []).map((z: any) => {
              const frentesNivelSeis = (z?.nivelCinco || []).map((t: any) => {
                const frentesNivelSiete = (t?.nivelSeis || []).map((p: any) => {
                  const frenteNivelOcho = (p?.nivelSiete || []).map((l: any) => {
                    const frenteNivelNueve = (l?.nivelOcho || []).map((m: any) => {
                      const frenteNivelDiez = (m?.nivelNueve || []).map((n: any) => {
                        const FrenteNivelOnce = (n?.nivelDiez || []).map((o: any) => {
                          const frenteNivelDoce = (o?.nivelOnce || []).map((q: any) => {
                            const frenteNivelTrece = (q?.nivelDoce || []).map((u: any) => {
                              const nivelTrece = (all || []).filter((e: any) => +e?.id_frente === u?.id);
                              return { ...u, ...{ nivelTrece } }
                            })
                            return { ...q, ...{ nivelDoce: frenteNivelTrece } }
                          })
                          return { ...o, ...{ nivelOnce: frenteNivelDoce } }
                        })
                        return { ...n, ...{ nivelDiez: FrenteNivelOnce } }
                      });
                      return { ...m, ...{ nivelNueve: frenteNivelDiez } }
                    })
                    return { ...l, ...{ nivelOcho: frenteNivelNueve } }
                  })
                  return { ...p, ...{ nivelSiete: frenteNivelOcho } }
                })
                return { ...t, ...{ nivelSeis: frentesNivelSiete } }
              })
              return { ...z, ...{ nivelCinco: frentesNivelSeis } }
            })
            return { ...w, ...{ nivelCuatro: FrentesNivelCinco } }
          })
          return { ...r, ...{ nivelTres: frentesNivelCuatro } }
        })
        return { ...s, ...{ nivelDos: frentesNivelTres } }
      })
      return { ...a, ...{ nivelUno: frentesNivelDos } }
    });
    nivelCatorce(d, all);
  }

  const nivelDoce = (frentes_: any, all: any) => {
    const d = (frentes_ || []).map((a: any) => {
      const frentesNivelDos = (a?.nivelUno || []).map((s: any) => {
        const frentesNivelTres = (s?.nivelDos || []).map((r: any) => {
          const frentesNivelCuatro = (r?.nivelTres || []).map((w: any) => {
            const FrentesNivelCinco = (w?.nivelCuatro || []).map((z: any) => {
              const frentesNivelSeis = (z?.nivelCinco || []).map((t: any) => {
                const frentesNivelSiete = (t?.nivelSeis || []).map((p: any) => {
                  const frenteNivelOcho = (p?.nivelSiete || []).map((l: any) => {
                    const frenteNivelNueve = (l?.nivelOcho || []).map((m: any) => {
                      const frenteNivelDiez = (m?.nivelNueve || []).map((n: any) => {
                        const FrenteNivelOnce = (n?.nivelDiez || []).map((o: any) => {
                          const frenteNivelDoce = (o?.nivelOnce || []).map((q: any) => {
                            const nivelDoce = (all || []).filter((e: any) => +e?.id_frente === q?.id);
                            return { ...q, ...{ nivelDoce } }
                          })
                          return { ...o, ...{ nivelOnce: frenteNivelDoce } }
                        })
                        return { ...n, ...{ nivelDiez: FrenteNivelOnce } }
                      });
                      return { ...m, ...{ nivelNueve: frenteNivelDiez } }
                    })
                    return { ...l, ...{ nivelOcho: frenteNivelNueve } }
                  })
                  return { ...p, ...{ nivelSiete: frenteNivelOcho } }
                })
                return { ...t, ...{ nivelSeis: frentesNivelSiete } }
              })
              return { ...z, ...{ nivelCinco: frentesNivelSeis } }
            })
            return { ...w, ...{ nivelCuatro: FrentesNivelCinco } }
          })
          return { ...r, ...{ nivelTres: frentesNivelCuatro } }
        })
        return { ...s, ...{ nivelDos: frentesNivelTres } }
      })
      return { ...a, ...{ nivelUno: frentesNivelDos } }
    });
    nivelTrese(d, all);
  }

  const nivelOnce = (frentes_: any, all: any) => {
    const d = (frentes_ || []).map((a: any) => {
      const frentesNivelDos = (a?.nivelUno || []).map((s: any) => {
        const frentesNivelTres = (s?.nivelDos || []).map((r: any) => {
          const frentesNivelCuatro = (r?.nivelTres || []).map((w: any) => {
            const FrentesNivelCinco = (w?.nivelCuatro || []).map((z: any) => {
              const frentesNivelSeis = (z?.nivelCinco || []).map((t: any) => {
                const frentesNivelSiete = (t?.nivelSeis || []).map((p: any) => {
                  const frenteNivelOcho = (p?.nivelSiete || []).map((l: any) => {
                    const frenteNivelNueve = (l?.nivelOcho || []).map((m: any) => {
                      const frenteNivelDiez = (m?.nivelNueve || []).map((n: any) => {
                        const FrenteNivelOnce = (n?.nivelDiez || []).map((o: any) => {
                          const nivelOnce = (all || []).filter((e: any) => +e?.id_frente === o?.id);
                          return { ...o, ...{ nivelOnce } }
                        })
                        return { ...n, ...{ nivelDiez: FrenteNivelOnce } }
                      });
                      return { ...m, ...{ nivelNueve: frenteNivelDiez } }
                    })
                    return { ...l, ...{ nivelOcho: frenteNivelNueve } }
                  })
                  return { ...p, ...{ nivelSiete: frenteNivelOcho } }
                })
                return { ...t, ...{ nivelSeis: frentesNivelSiete } }
              })
              return { ...z, ...{ nivelCinco: frentesNivelSeis } }
            })
            return { ...w, ...{ nivelCuatro: FrentesNivelCinco } }
          })
          return { ...r, ...{ nivelTres: frentesNivelCuatro } }
        })
        return { ...s, ...{ nivelDos: frentesNivelTres } }
      })
      return { ...a, ...{ nivelUno: frentesNivelDos } }
    });
    nivelDoce(d, all);
  }

  const nivelDiez = (frentes_: any, all: any) => {
    const d = (frentes_ || []).map((a: any) => {
      const frentesNivelDos = (a?.nivelUno || []).map((s: any) => {
        const frentesNivelTres = (s?.nivelDos || []).map((r: any) => {
          const frentesNivelCuatro = (r?.nivelTres || []).map((w: any) => {
            const FrentesNivelCinco = (w?.nivelCuatro || []).map((z: any) => {
              const frentesNivelSeis = (z?.nivelCinco || []).map((t: any) => {
                const frentesNivelSiete = (t?.nivelSeis || []).map((p: any) => {
                  const frenteNivelOcho = (p?.nivelSiete || []).map((l: any) => {
                    const frenteNivelNueve = (l?.nivelOcho || []).map((m: any) => {
                      const frenteNivelDiez = (m?.nivelNueve || []).map((n: any) => {
                        const nivelDiez = (all || []).filter((e: any) => +e?.id_frente === n?.id);
                        return { ...n, ...{ nivelDiez } }
                      });
                      return { ...m, ...{ nivelNueve: frenteNivelDiez } }
                    })
                    return { ...l, ...{ nivelOcho: frenteNivelNueve } }
                  })
                  return { ...p, ...{ nivelSiete: frenteNivelOcho } }
                })
                return { ...t, ...{ nivelSeis: frentesNivelSiete } }
              })
              return { ...z, ...{ nivelCinco: frentesNivelSeis } }
            })
            return { ...w, ...{ nivelCuatro: FrentesNivelCinco } }
          })
          return { ...r, ...{ nivelTres: frentesNivelCuatro } }
        })
        return { ...s, ...{ nivelDos: frentesNivelTres } }
      })
      return { ...a, ...{ nivelUno: frentesNivelDos } }
    });
    nivelOnce(d, all);
  }

  const nivelNueve = (frentes_: any, all: any) => {
    const d = (frentes_ || []).map((a: any) => {
      const frentesNivelDos = (a?.nivelUno || []).map((s: any) => {
        const frentesNivelTres = (s?.nivelDos || []).map((r: any) => {
          const frentesNivelCuatro = (r?.nivelTres || []).map((w: any) => {
            const FrentesNivelCinco = (w?.nivelCuatro || []).map((z: any) => {
              const frentesNivelSeis = (z?.nivelCinco || []).map((t: any) => {
                const frentesNivelSiete = (t?.nivelSeis || []).map((p: any) => {
                  const frenteNivelOcho = (p?.nivelSiete || []).map((l: any) => {
                    const frenteNivelNueve = (l?.nivelOcho || []).map((m: any) => {
                      const nivelNueve = (all || []).filter((e: any) => +e?.id_frente === m?.id);
                      return { ...m, ...{ nivelNueve } }
                    })
                    return { ...l, ...{ nivelOcho: frenteNivelNueve } }
                  })
                  return { ...p, ...{ nivelSiete: frenteNivelOcho } }
                })
                return { ...t, ...{ nivelSeis: frentesNivelSiete } }
              })
              return { ...z, ...{ nivelCinco: frentesNivelSeis } }
            })
            return { ...w, ...{ nivelCuatro: FrentesNivelCinco } }
          })
          return { ...r, ...{ nivelTres: frentesNivelCuatro } }
        })
        return { ...s, ...{ nivelDos: frentesNivelTres } }
      })
      return { ...a, ...{ nivelUno: frentesNivelDos } }
    })
    nivelDiez(d, all);
  }

  const nivelOcho = (frentes_: any, all: any) => {
    const d = (frentes_ || []).map((a: any) => {
      const frentesNivelDos = (a?.nivelUno || []).map((s: any) => {
        const frentesNivelTres = (s?.nivelDos || []).map((r: any) => {
          const frentesNivelCuatro = (r?.nivelTres || []).map((w: any) => {
            const FrentesNivelCinco = (w?.nivelCuatro || []).map((z: any) => {
              const frentesNivelSeis = (z?.nivelCinco || []).map((t: any) => {
                const frentesNivelSiete = (t?.nivelSeis || []).map((p: any) => {
                  const frenteNivelOcho = (p?.nivelSiete || []).map((l: any) => {
                    const nivelOcho = (all || []).filter((e: any) => +e?.id_frente === l?.id);
                    return { ...l, ...{ nivelOcho } }
                  })
                  return { ...p, ...{ nivelSiete: frenteNivelOcho } }
                })
                return { ...t, ...{ nivelSeis: frentesNivelSiete } }
              })
              return { ...z, ...{ nivelCinco: frentesNivelSeis } }
            })
            return { ...w, ...{ nivelCuatro: FrentesNivelCinco } }
          })
          return { ...r, ...{ nivelTres: frentesNivelCuatro } }
        })
        return { ...s, ...{ nivelDos: frentesNivelTres } }
      })
      return { ...a, ...{ nivelUno: frentesNivelDos } }
    })
    nivelNueve(d, all);
  }

  const nivelSiete = (frentes_: any, all: any) => {
    const d = (frentes_ || []).map((a: any) => {
      const frentesNivelDos = (a?.nivelUno || []).map((s: any) => {
        const frentesNivelTres = (s?.nivelDos || []).map((r: any) => {
          const frentesNivelCuatro = (r?.nivelTres || []).map((w: any) => {
            const FrentesNivelCinco = (w?.nivelCuatro || []).map((z: any) => {
              const frentesNivelSeis = (z?.nivelCinco || []).map((t: any) => {
                const frentesNivelSiete = (t?.nivelSeis || []).map((p: any) => {
                  const nivelSiete = (all || []).filter((e: any) => +e?.id_frente === p?.id);
                  return { ...p, ...{ nivelSiete } }
                })
                return { ...t, ...{ nivelSeis: frentesNivelSiete } }
              })
              return { ...z, ...{ nivelCinco: frentesNivelSeis } }
            })
            return { ...w, ...{ nivelCuatro: FrentesNivelCinco } }
          })
          return { ...r, ...{ nivelTres: frentesNivelCuatro } }
        })
        return { ...s, ...{ nivelDos: frentesNivelTres } }
      })
      return { ...a, ...{ nivelUno: frentesNivelDos } }
    })
    nivelOcho(d, all)
  }

  const nivelSeis = (frentes_: any, all: any) => {
    const d = (frentes_ || []).map((a: any) => {
      const frentesNivelDos = (a?.nivelUno || []).map((s: any) => {
        const frentesNivelTres = (s?.nivelDos || []).map((r: any) => {
          const frentesNivelCuatro = (r?.nivelTres || []).map((w: any) => {
            const FrentesNivelCinco = (w?.nivelCuatro || []).map((z: any) => {
              const frentesNivelSeis = (z?.nivelCinco || []).map((t: any) => {
                const nivelSeis = (all || []).filter((e: any) => +e?.id_frente === t?.id);
                return { ...t, ...{ nivelSeis } }
              })
              return { ...z, ...{ nivelCinco: frentesNivelSeis } }
            })
            return { ...w, ...{ nivelCuatro: FrentesNivelCinco } }
          })
          return { ...r, ...{ nivelTres: frentesNivelCuatro } }
        })
        return { ...s, ...{ nivelDos: frentesNivelTres } }
      })
      return { ...a, ...{ nivelUno: frentesNivelDos } }
    })
    nivelSiete(d, all);
  }

  const nivelCinco = (frentes_: any, all: any) => {
    const d = (frentes_).map((a: any) => {
      const frentesNivelDos = (a?.nivelUno || []).map((s: any) => {
        const frentesNivelTres = (s?.nivelDos || []).map((r: any) => {
          const frentesNivelCuatro = (r?.nivelTres || []).map((w: any) => {
            const FrentesNivelCinco = (w?.nivelCuatro || []).map((z: any) => {
              const nivelCinco = (all || []).filter((e: any) => +e?.id_frente === z?.id);
              return { ...z, ...{ nivelCinco } }
            })
            return { ...w, ...{ nivelCuatro: FrentesNivelCinco } }
          })
          return { ...r, ...{ nivelTres: frentesNivelCuatro } }
        })
        return { ...s, ...{ nivelDos: frentesNivelTres } }
      })
      return { ...a, ...{ nivelUno: frentesNivelDos } }
    })
    nivelSeis(d, all)
  }

  const nivelCuatro = (frentes_: any, all: any) => {
    const c = (frentes_ || []).map((x: any) => {
      const frentesNivelDos = (x?.nivelUno || []).map((s: any) => {
        const frentesNivelTres = (s?.nivelDos || []).map((r: any) => {
          const frentesNivelCuatro = (r?.nivelTres || []).map((w: any) => {
            const nivelCuatro = (all || []).filter((e: any) => +e?.id_frente === w?.id);
            return { ...w, ...{ nivelCuatro } }
          })
          return { ...r, ...{ nivelTres: frentesNivelCuatro } }
        })
        return { ...s, ...{ nivelDos: frentesNivelTres } }
      })
      return { ...x, ...{ nivelUno: frentesNivelDos } }
    })
    nivelCinco(c, all);
  }

  const nivelTres = (frentes_: any, all: any) => {
    const b = (frentes_ || []).map((x: any) => {
      const frentesNivelDos = (x?.nivelUno || []).map((a: any) => {
        const frentesNivelTres = (a?.nivelDos || []).map((r: any) => {
          const nivelTres = (all || []).filter((e: any) => +e?.id_frente === r?.id);
          return { ...r, ...{ nivelTres } }
        })
        return { ...a, ...{ nivelDos: frentesNivelTres } }
      });
      return { ...x, ...{ nivelUno: frentesNivelDos } }
    });
    nivelCuatro(b, all);
  }

  const nivelDos = (frentes_: any, all: any) => {
    const a = (frentes_ || []).map((x: any) => {
      const frentesNivelDos = (x?.nivelUno || []).map((a: any) => {
        const nivelDos = (all || []).filter((e: any) => +e?.id_frente === a?.id);
        return { ...a, ...{ nivelDos } }
      });
      return { ...x, ...{ nivelUno: frentesNivelDos } }
    });
    nivelTres(a, all);
  }

  const getDataFrentes = useCallback(async () => {
    try {
      setProcesando(true);
      const frentes_ = await getFrentesByIdContratoHttp(contrato?.id);
      setFrentesForm(frentes_);
      setFrentes_(frentes_.map((a: any) => {
        return {
          ...a, ...{ estatus: a?.estatus ? 'Activo' : 'Inactivo' }
        }
      }));
      const frentesParent = (frentes_ || []).map((a: any) => {
        return {
          ...a, ...{ estatus: a?.estatus ? 'Activo' : 'Inactivo' }
        }
      }).filter((e: any) => +e?.id_frente === 0).map((a: any) => {
        const nivelUno = (frentes_ || []).map((a: any) => {
          return {
            ...a, ...{ estatus: a?.estatus ? 'Activo' : 'Inactivo' }
          }
        }).filter((e: any) => +e?.id_frente === a?.id);
        return { ...a, ...{ nivelUno } }
      });
      setFrentes(frentesParent);
      nivelDos(frentesParent, frentes_.map((a: any) => {
        return {
          ...a, ...{ estatus: a?.estatus ? 'Activo' : 'Inactivo' }
        }
      }));
      setProcesando(false);
    } catch (err) {
      setProcesando(false);
      const message = getErrorHttpMessage(err);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
      handleisAlertOpen();
    }
  }, [contrato])

  useEffect(() => {
    getDataFrentes();
  }, [getDataFrentes]);

  const AllowCell = [
    "descripcion",
    "estatus",
    "fecha_fin",
    "fecha_inicio",
    "fecha_registro",
    "frente",
    "id"
  ];

  const creaAcordeon = (item: any, color = '#f5abab') => {

    return (
      <Accordion style={{ backgroundColor: item?.estatus === 'Inactivo' ? 'rgb(255 113 113)' : '#f9f9f9', boxShadow: '1px 1px 4px 4px ' + color, marginLeft: '3px', marginRight: '3px', }}>
        <AccordionSummary
          style={{ height: '30px' }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls={"panel1-content" + item?.id}
          id={"panel1-header" + item?.id}
        >
          <p style={{ color: darkMode ? 'white' : '#344767', fontWeight: 'bolder', marginRight: '10px', fontSize: '15px', position: 'relative', top: '6px' }}><span>{item?.frente}</span></p>
          <div style={{ zIndex: 99 }}><MenuExpandible key={item?.id} item={item} esModoDios={esModoDios} esCoordinador={esCoordinador} color={color} setItemEdit={setItemEdit} handleisAlertOpenEdit={handleisAlertOpenEdit} deletePregunta={deletePregunta} handleisAlertOpenConcepto={handleisAlertOpenConcepto} /></div>
        </AccordionSummary>
        <AccordionDetails>
          {
            (item?.nivelVeinte || [])?.length ? (item?.nivelVeinte || []).map((item_: any, key: number) => (<div key={key}>{creaAcordeon(item_, '#78fad3')}</div>)) : null
          }
          {
            (item?.nivelDiecinueve || [])?.length ? (item?.nivelDiecinueve || []).map((item_: any, key: number) => (<div key={key}>{creaAcordeon(item_, '#78fad3')}</div>)) : null
          }
          {
            (item?.nivelDieciocho || [])?.length ? (item?.nivelDieciocho || []).map((item_: any, key: number) => (<div key={key}>{creaAcordeon(item_, '#78fad3')}</div>)) : null
          }
          {
            (item?.nivelDiecisiete || [])?.length ? (item?.nivelDiecisiete || []).map((item_: any, key: number) => (<div key={key}>{creaAcordeon(item_, '#78fad3')}</div>)) : null
          }
          {
            (item?.nivelDieciseis || [])?.length ? (item?.nivelDieciseis || []).map((item_: any, key: number) => (<div key={key}>{creaAcordeon(item_, '#78fad3')}</div>)) : null
          }
          {
            (item?.nivelQuince || [])?.length ? (item?.nivelQuince || []).map((item_: any, key: number) => (<div key={key}>{creaAcordeon(item_, '#78fad3')}</div>)) : null
          }
          {
            (item?.nivelCatorce || [])?.length ? (item?.nivelCatorce || []).map((item_: any, key: number) => (<div key={key}>{creaAcordeon(item_, '#78fad3')}</div>)) : null
          }
          {
            (item?.nivelTrece || [])?.length ? (item?.nivelTrece || []).map((item_: any, key: number) => (<div key={key}>{creaAcordeon(item_, '#78fad3')}</div>)) : null
          }
          {
            (item?.nivelDoce || [])?.length ? (item?.nivelDoce || []).map((item_: any, key: number) => (<div key={key}>{creaAcordeon(item_, '#78fad3')}</div>)) : null
          }
          {
            (item?.nivelOnce || [])?.length ? (item?.nivelOnce || []).map((item_: any, key: number) => (<div key={key}>{creaAcordeon(item_, '#78fad3')}</div>)) : null
          }
          {
            (item?.nivelDiez || [])?.length ? (item?.nivelDiez || []).map((item_: any, key: number) => (<div key={key}>{creaAcordeon(item_, '#78fad3')}</div>)) : null
          }
          {
            (item?.nivelNueve || [])?.length ? (item?.nivelNueve || []).map((item_: any, key: number) => (<div key={key}>{creaAcordeon(item_, '#4d95e8')}</div>)) : null
          }
          {
            (item?.nivelOcho || [])?.length ? (item?.nivelOcho || []).map((item_: any, key: number) => (<div key={key}>{creaAcordeon(item_, '#83a847')}</div>)) : null
          }
          {
            (item?.nivelSiete || [])?.length ? (item?.nivelSiete || []).map((item_: any, key: number) => (<div key={key}>{creaAcordeon(item_, '#52b8d1')}</div>)) : null
          }
          {
            (item?.nivelSeis || [])?.length ? (item?.nivelSeis || []).map((item_: any, key: number) => (<div key={key}>{creaAcordeon(item_, '#6958ed')}</div>)) : null
          }
          {
            (item?.nivelCinco || [])?.length ? (item?.nivelCinco || []).map((item_: any, key: number) => (<div key={key}>{creaAcordeon(item_, '#ca88e5')}</div>)) : null
          }
          {
            (item?.nivelCuatro || [])?.length ? (item?.nivelCuatro || []).map((item_: any, key: number) => (<div key={key}>{creaAcordeon(item_, '#ffd27e')}</div>)) : null
          }
          {
            (item?.nivelTres || [])?.length ? (item?.nivelTres || []).map((item_: any, key: number) => (<div key={key}>{creaAcordeon(item_, '#88df88')}</div>)) : null
          }
          {
            (item?.nivelDos || [])?.length ? (item?.nivelDos || []).map((item_: any, key: number) => (<div key={key}>{creaAcordeon(item_, '#7c7ce5')}</div>)) : null
          }
          {item?.conceptos?.length ?
            <List style={{ width: '100%', marginTop: '20px' }}>
              <h5 style={{ color: darkMode ? 'white' : '#344767' }}><strong> {item?.conceptos?.length} </strong> Conceptos del frente <span>({item?.frente})</span>  </h5>
              {
                item?.conceptos.map((c: any) => {
                  return (
                    <div key={c?.id}>
                      <ListItem alignItems="flex-start" style={{ cursor: 'pointer' }} onClick={() => {
                        setItemEdit(item)
                        setDetalleConcepto(c);
                        handleisAlertOpenConceptoDetalle();
                      }}>
                        <ListItemText
                          primary={c?.concepto}
                          style={{ color: c?.avance ? '' : '#fb8c00' }}
                          secondary={
                            <span style={{ color: c?.avance ? '' : '#fb8c00' }}>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                style={{ color: c?.avance ? '' : '#fb8c00' }}
                                variant="body2"
                                color="text.primary"
                              >
                                {(c?.inciso || '') + ' '}
                              </Typography>
                              {c?.descripcion}
                            </span>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </div>
                  )
                })
              }
            </List> : null}
        </AccordionDetails>
      </Accordion>
    )
  }

  const ExpandedComponent = (datos_expandible: any) => {
    const row = datos_expandible;
    return (
      <Grid container spacing={2}>
        {(row?.nivelUno || [])?.length ? (row?.nivelUno || []).map((item: any, key: number) => (<Grid item xs={12} key={key}>{creaAcordeon(item, '#f5abab')}</Grid>)) : null}
        {row?.conceptos?.length ?
          <List style={{ width: '100%', marginTop: '20px', marginLeft: '20px', marginRight: '20px' }}>
            <h5 style={{ color: darkMode ? 'white' : '#344767' }}><strong> {row?.conceptos?.length} </strong> Conceptos del frente <span>({row?.frente})</span>  </h5>
            {
              row?.conceptos.map((c: any) => {
                return (
                  <div key={c?.id}>
                    <ListItem alignItems="flex-start" style={{ cursor: 'pointer' }} onClick={() => {
                      setItemEdit(row)
                      setDetalleConcepto(c);
                      handleisAlertOpenConceptoDetalle();
                    }}>
                      <ListItemText
                        primary={c?.concepto}
                        style={{ color: c?.avance ? '' : '#fb8c00' }}
                        secondary={
                          <span style={{ color: c?.avance ? '' : '#fb8c00' }}>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              style={{ color: c?.avance ? '' : '#fb8c00' }}
                            >
                              {(c?.inciso || '') + ' '}
                            </Typography>
                            {c?.descripcion}
                          </span>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
                )
              })
            }
          </List> : null}
      </Grid>
    )
  }

  const editaFrente = async (data: any) => {
    try {
      setProcesando(true);
      await actualizaFrenteHttp({ ...data, ...{ perfil } });
      handleisAlerCloseEdit();
      setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
      handleisAlertOpen();
      setEsExitoEditaFrente(true)
      getDataFrentes();
    } catch (error) {
      setProcesando(false);
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
      handleisAlertOpen();
    }
  }

  const deletePregunta = (data: any) => {
    setItemEdit(data);
    setOpenModalConfirm(true);
    setTextModalConfirm('¿Desea cambiar el estatus del frente seleccionado?');
  }

  const deleteProveedorPregunta = (data: any) => {
    setProveedoreDetalleConcepto(data);
    setOpenModalConfirmProveedor(true);
    setTextModalConfirmProveedor('¿Desea el proveedor seleccionado?');
  }

  const actualizaEstatus = async () => {
    try {
      setProcesando(true);
      await actualizaEstatusHttp({ ...itemEdit, ...{ perfil } });
      setItemEdit(null);
      setOpenModalConfirm(false);
      setTextModalConfirm('');
      setMensajeAlert(intl.formatMessage({ id: 'http_exito_actualizar' }));
      handleisAlertOpen();
      getDataFrentes();
    } catch (error) {
      setProcesando(false);
      setItemEdit(null);
      setOpenModalConfirm(false);
      setTextModalConfirm('');
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_error_actualizar' }));
      handleisAlertOpen();
    }
  }

  const validaContratoSeleccionado = useCallback(() => {
    if (!espacio) {
      setErrorFlujo(true);
      setMensajeAlert(intl.formatMessage({ id: 'general_mensaje_navega_sin_espacio' }));
      handleisAlertOpen();
    }
    if (espacio && !contrato) {
      setErrorFlujoContrato(true);
      setMensajeAlert(intl.formatMessage({ id: 'general_mensaje_navega_sin_contrato' }));
      handleisAlertOpen();
    }
  }, [espacio, contrato])

  useEffect(() => {
    validaContratoSeleccionado();
  }, [validaContratoSeleccionado]);


  const habilitaConcepto = async (elemento: any) => {
    try {
      handleisAlerCloseConceptoDetalle()
      setProcesando(true);
      await actualizaEstatusConceptoHttp({ ...elemento, ...{ perfil } });
      setMensajeAlert(intl.formatMessage({ id: 'http_exito_actualizar' }));
      handleisAlertOpen();
      getDataFrentes();
    } catch (error) {
      setProcesando(false);
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_error_actualizar' }));
      handleisAlertOpen();
    }
  }

  const desHabilitaConcepto = async (elemento: any) => {
    try {
      handleisAlerCloseConceptoDetalle()
      setProcesando(true);
      await actualizaEstatusConceptoHttp({ ...elemento, ...{ perfil } });
      setMensajeAlert(intl.formatMessage({ id: 'http_exito_actualizar' }));
      handleisAlertOpen();
      getDataFrentes();
    } catch (error) {
      setProcesando(false);
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_error_actualizar' }));
      handleisAlertOpen();
    }
  }

  const analizarAvanceConcepto = (elemento: any) => {
    navigate('/consulta-de-avances', {
      state: elemento
    });
  }

  const agregarProveedorConcepto = async (elemento: any) => {
    try {
      setProcesando(true);
      agregaProveedorConceptoHttp({ ...{ id_concepto: detalleConcepto?.id }, ...elemento });
      setProcesando(false);
      getDataFrentes();
      handleisAlerCloseConcepto();
      handleisAlerCloseProveedorConcepto();
      setMensajeAlert(intl.formatMessage({ id: 'http_exito_general_operacion' }));
      handleisAlertOpen();
    } catch (error) {
      setProcesando(false);
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_error_general_operacion' }));
      handleisAlertOpen();
    }
  }

  const actualizaProveedorConcepto = async (elemento: any) => {
    try {
      setProcesando(true);
      actualizaProveedorPorConceptoHttp({ ...{ id_concepto: detalleConcepto?.id }, ...elemento });
      setProcesando(false);
      getDataFrentes();
      handleisAlerCloseConcepto();
      handleisAlerCloseProveedorConcepto();
      setMensajeAlert(intl.formatMessage({ id: 'http_exito_general_operacion' }));
      handleisAlertOpen();
    } catch (error) {
      setProcesando(false);
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_error_general_operacion' }));
      handleisAlertOpen();
    }
  }

  const consultarHitosConcepto = (elemento: any) => {
    navigate('/consulta-de-hitos', {
      state: elemento
    });
  }

  const subirFotoVideoConcepto = (elemento: any) => {
    handleisAlertOpenMediaConcepto()
    handleisAlerCloseConceptoDetalle()
  }

  const subirArchivoConcepto = (elemento: any) => {
    handleisAlertOpenMediaConcepto()
    handleisAlerCloseConceptoDetalle()
  }

  const programarHitosConcepto = (elemento: any) => {
    handleisAlertOpenHitos()
    handleisAlerCloseConceptoDetalle();
  }

  const asignarResponsablesConcepto = (elemento: any) => {
    handleisAlerCloseConceptoDetalle();
    handleisAlertOpenResponsables();

  }

  const verProveedorConcepto = async (elemento: any) => {
    try {
      setProcesando(true);
      const proveedores = await verProveedorPorConceptoHttp(detalleConcepto?.id);
      setProveedoresConcepto(proveedores.map((s: any) => {
        return { ...s, ...{ id_estatus: 'Activo', ubicacion: s?.direccion } }
      }));
      handleisAlertOpenProveedorConceptoInfo()
      setProcesando(false);
    } catch (error) {
      setProcesando(false);
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_error_general_operacion' }));
      handleisAlertOpen();
    }
  }

  const eliminaProveedorPorConcepto = async (elemento: any) => {
    try {
      setProcesando(true);
      eliminaProveedorPorConceptoHttp(elemento?.id);
      setProcesando(false);
      setOpenModalConfirmProveedor(false)
      verProveedorConcepto(elemento);
      setMensajeAlert(intl.formatMessage({ id: 'http_exito_general_operacion' }));
      handleisAlertOpen();
    } catch (error) {
      setProcesando(false);
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_error_general_operacion' }));
      handleisAlertOpen();
    }
  }

  const handelAccion = (accion: string, elemento: any) => {
    switch (accion) {
      case 'habilitar_concepto':
        habilitaConcepto(elemento);
        break;
      case 'deshabilitar_concepto':
        desHabilitaConcepto(elemento);
        break;
      case 'analizar_avance_concepto':
        analizarAvanceConcepto(elemento);
        break;
      case 'agregar_proveedor_concepto':
        handleisAlertOpenProveedorConcepto();
        handleisAlerCloseConceptoDetalle();
        break;
      case 'consultar_hitos_concepto':
        consultarHitosConcepto(elemento);
        break;
      case 'subir_foto_video_concepto':
        subirFotoVideoConcepto(elemento);
        break;
      case 'subir_archivo_concepto':
        subirArchivoConcepto(elemento);
        break;
      case 'programar_hitos_concepto':
        const actualSteps = Object.assign([], [
          { name: 'Número de hitos', step: 0 }
        ]);
        setActiveStep(0)
        setSteps(actualSteps);
        programarHitosConcepto(elemento);
        break;
      case 'asignar_responsables_concepto':
        asignarResponsablesConcepto(elemento);
        break;
      case 'ver_proveedor_concepto':
        verProveedorConcepto(elemento);
        break;
      case 'ver_responsables':
        navigate('/consulta-de-responsables-concepto', {
          state: elemento
        });
        break;
      case 'agregar_not_voz':
        setItemEdit({id:elemento?.id_frente})
        handleisAlertOpenIAConcepto();
        setConceptoIdIA(elemento?.id);
        break;
      case 'ver_prediccion':
          handleVerPrediccion(elemento)
          break;
      default:
        break;
    }
  }

  const [hitosCrea, setHitosCrea] = useState<any[]>([])
  const handleAddNumerHitos = (a: any) => {
    const actualSteps = Object.assign([], [
      { name: 'Número de hitos', step: 0 }
    ]);
    for (let index = 0; index < a?.numero; index++) {
      actualSteps.push({ name: 'Hito' + (+actualSteps.length), step: (+index) + 1 });
      setSteps(actualSteps);
    }
    actualSteps.push({ name: 'Guardar hitos', step: actualSteps.length });
    setSteps(actualSteps);
    handleStep(activeStep + 1)
    setHitosCrea([]);
  }

  const [activeStep, setActiveStep] = React.useState(0);
  const [isDisabledNext, setIsDisabledNext] = useState<boolean>(false);
  const [steps, setSteps] = useState<any[]>([
    { name: 'Número de hitos', step: 0 }
  ]);

  const handleVerPrediccion = async (elemento:any) => {
    try {
      setProcesando(true);
      const prediccion = await prediccionConceptosHTTP({id_concepto: elemento?.id})
      setMensajeAlert(prediccion);
      handleisAlertOpen();
      setProcesando(false);
    } catch (error) {
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_error_prediccion' }));
      setProcesando(false);
      handleisAlertOpen();
    }
  }

  const handleStep = (step: number) => {
    setActiveStep(step);
    if (step === 1) {
      setIsDisabledNext(!hitosCrea.length ? true : false)
    }
    if (step === 0 && steps.length > 1 && hitosCrea.length) {
      setHitosCrea([]);
      setSteps([
        { name: 'Número de hitos', step: 0 }
      ])
    }
  }

  const handleAddHito = (h: any) => {
    const hitosCrea_ = Object.assign([], hitosCrea);
    hitosCrea_.push(h);
    handleStep(activeStep + 1)
    setHitosCrea(hitosCrea_);
  }

  const handleAddHitos = async () => {
    try {
      handleStep(activeStep + 1)
      setProcesando(true);
      await hitosCrea.reduce(async (a: any, hito: any) => {
        try {
          await a;
          await addHitosConceptoHttp({ ...hito, ...{ id_concepto: detalleConcepto?.id } });
        } catch (error) {
          setMensajeAlert('Error al registrar el hito ');
          handleisAlertOpen();
        }
      }, Promise.resolve());
      setProcesando(false)
      setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar_asignaciones' }));
      handleisAlertOpen();
    } catch (error) {
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar_asignaciones' }));
      setProcesando(false);
      handleisAlertOpen();
    }
  }

  const getResponsables = useCallback(async () => {
    try {
      setProcesando(true)
      const responsables_ = await getResponsablesHttp(contrato?.id);
      setResponsables(responsables_)
      setProcesando(false);
    } catch (error) {
      setProcesando(false);
    }
  }, [])

  useEffect(() => {
    getResponsables()
  }, [getResponsables])


  const handleAddDocumentoFrente = async (data: any) => {
    try {
      setProcesando(true);
      const data1 = new FormData();
      data1.append("file", data?.file);
      data1.append("id_frente", itemEdit?.id);
      data1.append("fecha", data?.fecha);
      data1.append("nombre", data?.nombre);
      data1.append("comentarios", data?.descripcion);
      data1.append("espacio", espacio?.id);
      data1.append("contrato", contrato?.id);
      await addMediaFrenteHttp(data1);
      handleisAlerCloseSubirDocumentos()
      const espacio_ = await getEspacioUtilizadoProyectoHTTP(espacio?.id)
      dispatch(setEspacioTrabajo({ ...espacio, ...{ espacio: espacio_?.data } }));
      getDataFrentes();
      handleisAlerCloseMediaConcepto();
      setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
      handleisAlertOpen();
    } catch (error) {
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
      setProcesando(false);
      handleisAlertOpen();
    }
  }

  const handleAddDocumento = async (data: any) => {
    try {
      setProcesando(true);
      const data1 = new FormData();
      data1.append("file", data?.file);
      data1.append("id_concepto", detalleConcepto?.id);
      data1.append("fecha", data?.fecha);
      data1.append("nombre", data?.nombre);
      data1.append("comentarios", data?.descripcion);
      data1.append("espacio", espacio?.id);
      data1.append("contrato", contrato?.id);
      await addMediaHttp(data1);
      const espacio_ = await getEspacioUtilizadoProyectoHTTP(espacio?.id)
      dispatch(setEspacioTrabajo({ ...espacio, ...{ espacio: espacio_?.data } }));
      getDataFrentes();
      handleisAlerCloseMediaConcepto();
      setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
      handleisAlertOpen();
    } catch (error) {
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
      setProcesando(false);
      handleisAlertOpen();
    }
  }

  const [responsablesCrea, setResponsablesCrea] = useState<any[]>([])
  const handleAddNumerResponsables = (a: any) => {
    const actualSteps = Object.assign([], [
      { name: 'Número de responsables', step: 0 }
    ]);
    for (let index = 0; index < a?.numero; index++) {
      actualSteps.push({ name: 'Responsable #' + (+actualSteps.length), step: (+index) + 1 });
      setStepsResponsables(actualSteps);
    }
    actualSteps.push({ name: 'Guardar responsables', step: actualSteps.length });
    setStepsResponsables(actualSteps);
    handleStepResponsables(activeStep + 1)
    setResponsablesCrea([]);
  }

  const [activeStepResponsables, setActiveStepResponsables] = React.useState(0);
  const [isDisabledNextResponsables, setIsDisabledNextResponsables] = useState<boolean>(false);
  const [stepsResponsables, setStepsResponsables] = useState<any[]>([
    { name: 'Número de responsables', step: 0 }
  ]);

  const handleStepResponsables = (step: number) => {
    setActiveStepResponsables(step);
    if (step === 1) {
      setIsDisabledNextResponsables(!responsablesCrea.length ? true : false)
    }
    if (step === 0 && steps.length > 1 && responsablesCrea.length) {
      setResponsablesCrea([]);
      setSteps([
        { name: 'Número de hitos', step: 0 }
      ])
    }
  }

  const handleAddResponsable = (h: any) => {
    const hitosCrea_ = Object.assign([], responsablesCrea);
    hitosCrea_.push(h);
    handleStepResponsables(activeStepResponsables + 1)
    setResponsablesCrea(hitosCrea_);
  }

  const handleAddResponsables = async () => {
    try {
      handleStepResponsables(activeStepResponsables + 1)
      setProcesando(true);
      await responsablesCrea.reduce(async (a: any, res: any) => {
        try {
          await a;
          await sleep(1000)
          await setResponsablesConceptoHttp({ id_concepto: detalleConcepto?.id, id_responsable: res?.responsable, porcentaje: res?.porcentaje });
        } catch (error) {
          setMensajeAlert('Error al registrar el responsable ');
          handleisAlertOpen();
        }
      }, Promise.resolve());
      getDataFrentes();

      setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
      handleisAlertOpen();
    } catch (error) {
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
      setProcesando(false);
      handleisAlertOpen();
    }
  }

  const handlEliminarDocumentoFrente = async () => {
    try {
      setOpenModalConfirmDocumento(false);
      handleisAlerCloseVerDocumentos();
      setProcesando(true);
      await removeMediaFrenteHttp(mediaEdit?.id, espacio?.id, contrato?.id)
      setItemEdit(null);
      const espacio_ = await getEspacioUtilizadoProyectoHTTP(espacio?.id)
      dispatch(setEspacioTrabajo({ ...espacio, ...{ espacio: espacio_?.data } }));
      getDataFrentes();
      handleisAlerCloseMediaConcepto();
      setMensajeAlert(intl.formatMessage({ id: 'http_exito_eliminar' }));
      handleisAlertOpen();
    } catch (error) {
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_error_eliminar' }));
      setProcesando(false);
      handleisAlertOpen();
    }
  }

  const handleAddNotaFrente = async (nota: any) => {
    try {
      handleisAlerCloseSubirNotas();
      setProcesando(true);
      await setNotasFrenteHttp({ ...nota, ...{ id_frente: itemEdit?.id } });
      setItemEdit(null);
      getDataFrentes();
      setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
      handleisAlertOpen();
    } catch (error) {
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
      setProcesando(false);
      handleisAlertOpen();
    }
  }

  const handleEditNotaFrente = async (nota: any) => {
    try {
      handleisAlerCloseSubirNotas();
      handleisAlerCloseNotaEdit();
      setProcesando(true);
      await editNotasFrenteHttp({ ...nota, ...{ id_frente: notaEdit?.id_frente, id: notaEdit?.id } })
      setItemEdit(null);
      getDataFrentes();
      setMensajeAlert(intl.formatMessage({ id: 'http_exito_actualizar' }));
      handleisAlertOpen();
    } catch (error) {
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_error_actualizar' }));
      setProcesando(false);
      handleisAlertOpen();
    }
  }

  const deleteNotaPregunta = (data: any) => {
    setNotaEdit(data);
    setOpenModalConfirmNotaDelete(true);
    setTextModalConfirmNotaDelete('¿Desea eliminar la nota seleccionada?');
  }

  const handleEliminaNotaFrente = async () => {
    try {
      setProcesando(true);
      handleisAlerCloseVerNotas()
      setOpenModalConfirmNotaDelete(false);
      setTextModalConfirmNotaDelete('');
      await deleteNotasFrenteHttp(notaEdit?.id)
      setNotaEdit(null);
      getDataFrentes();
      setMensajeAlert(intl.formatMessage({ id: 'http_exito_eliminar' }));
      handleisAlertOpen();
    } catch (error) {
      handleisAlerCloseVerNotas()
      setOpenModalConfirmNotaDelete(false);
      setTextModalConfirmNotaDelete('');
      const message = getErrorHttpMessage(error);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_error_eliminar' }));
      setProcesando(false);
      handleisAlertOpen();
    }
  }


  const setFotos = useCallback(async (fotos: string[], user: string) => {
    try {
        setProcesando(true);
        const data = fotos.map((e: any) => {
            return e?.parametro ?
                {
                    image: e?.foto,
                    titulo: e?.titulo,
                    user,
                    proyecto: espacio?.id,
                    contrato: contrato?.id,
                    frente: itemEdit?.id,
                    parametros: e?.parametro
                } :
                {
                    titulo: e?.titulo,
                    image: e?.foto,
                    user,
                    proyecto: espacio?.id,
                    contrato: contrato?.id,
                    frente: itemEdit?.id
                }
        });
        await data.reduce(async (_: any, fEnviar: any) => {
            try {
                await _;
                await analizaImagenHttp(fEnviar);
            } catch (error: any) {
                console.log('error', error)
            }
        }, Promise.resolve());
        setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
        setProcesando(false);
        handleisAlertOpen();
    } catch (err) {
        const message = getErrorHttpMessage(err);
        setMensajeAlert(message || intl.formatMessage({ id: 'http_error_obtener' }));
        setProcesando(false);
        handleisAlertOpen();
    }
}, [itemEdit]);


const setFoto = useCallback(async (foto: any, user: string) => {
    try {
        setProcesando(true);
        const dataEnvia = foto?.parametro ? { titulo:foto?.titulo, image: foto?.foto, user, proyecto: espacio?.id, contrato: contrato?.id, frente: itemEdit?.id, parametros: foto?.parametro } : { image: foto?.foto, user, proyecto: espacio?.id, contrato: contrato?.id, frente: itemEdit?.id, titulo:foto?.titulo }
        await analizaImagenHttp(dataEnvia);
        setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
        setProcesando(false);
        handleisAlertOpen();
    } catch (err) {
        const message = getErrorHttpMessage(err);
        setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
        setProcesando(false);
        handleisAlertOpen();
    }
}, [itemEdit]);

const setVoz = useCallback(async (voz: any, user: string) => {
    try {
        setProcesando(true);
        var formData = new FormData();
        formData.append("file", voz?.audio?.blob);
        formData.append("titulo", voz?.titulo);
        formData.append("id_usuario", user);
        formData.append("proyecto", espacio?.id);
        formData.append("contrato", contrato?.id);
        formData.append("frente", itemEdit?.id);
        await reportSpeachHttp(formData);
        setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
        setProcesando(false);
        handleisAlertOpen();
    } catch (err) {
        const message = getErrorHttpMessage(err);
        setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
        setProcesando(false);
        handleisAlertOpen();
    }
}, [itemEdit]);

const setVoces = useCallback(async (voces: string[], user: string) => {
  try {
      setProcesando(true);
      const data = voces.map((e: any) => {
          return {
              titulo:e?.titulo,
              voz: e?.audio?.blob,
              user,
              proyecto: espacio?.id,
              contrato: contrato?.id
          }
      });
      await data.reduce(async (_: any, fEnviar: any) => {
          try {
              await _;
              var formData = new FormData();
              formData.append("titulo", fEnviar?.titulo);
              formData.append("file", fEnviar?.voz);
              formData.append("id_usuario", user);
              formData.append("proyecto", espacio?.id);
              formData.append("contrato", contrato?.id);
              formData.append("frente", itemEdit?.id);
              await reportSpeachHttp(formData);
          } catch (error: any) {
              console.log('error', error)
          }
      }, Promise.resolve());
      setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
      setProcesando(false);
      handleisAlertOpen();
  } catch (err) {
      const message = getErrorHttpMessage(err);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_error_obtener' }));
      setProcesando(false);
      handleisAlertOpen();
  }
}, [itemEdit]);



const setFotosConcepto = useCallback(async (fotos: string[], user: string) => {
  try {
      setProcesando(true);
      const data = fotos.map((e: any) => {
          return e?.parametro ?
              {
                  image: e?.foto,
                  titulo: e?.titulo,
                  user,
                  proyecto: espacio?.id,
                  contrato: contrato?.id,
                  frente: itemEdit?.id,
                  concepto: conceptoIdIA,
                  parametros: e?.parametro
              } :
              {
                 titulo: e?.titulo,
                  image: e?.foto,
                  user,
                  proyecto: espacio?.id,
                  contrato: contrato?.id,
                  frente: itemEdit?.id,
                  concepto: conceptoIdIA,
              }
      });
      await data.reduce(async (_: any, fEnviar: any) => {
          try {
              await _;
              await analizaImagenHttp(fEnviar);
          } catch (error: any) {
              console.log('error', error)
          }
      }, Promise.resolve());
      setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
      setProcesando(false);
      handleisAlertOpen();
  } catch (err) {
      const message = getErrorHttpMessage(err);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_error_obtener' }));
      setProcesando(false);
      handleisAlertOpen();
  }
}, [itemEdit]);


const setFotoConcepto = useCallback(async (foto: any, user: string) => {
  try {
      setProcesando(true);
      const dataEnvia = foto?.parametro ? { titulo: foto?.titulo, image: foto?.foto, user, proyecto: espacio?.id, contrato: contrato?.id, frente: itemEdit?.id, parametros: foto?.parametro, concepto: conceptoIdIA, } : { image: foto?.foto, user, proyecto: espacio?.id, contrato: contrato?.id, frente: itemEdit?.id, concepto: conceptoIdIA,titulo: foto?.titulo,  }
      await analizaImagenHttp(dataEnvia);
      setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
      setProcesando(false);
      handleisAlertOpen();
  } catch (err) {
      const message = getErrorHttpMessage(err);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
      setProcesando(false);
      handleisAlertOpen();
  }
}, [itemEdit]);

const setVozConcepto = useCallback(async (voz: any, user: string) => {
  try {
      setProcesando(true);
      var formData = new FormData();
      formData.append("titulo", voz?.titulo);
      formData.append("file", voz?.audio?.blob);
      formData.append("id_usuario", user);
      formData.append("proyecto", espacio?.id);
      formData.append("contrato", contrato?.id);
      formData.append("frente", itemEdit?.id);
      formData.append("concepto", conceptoIdIA);
      await reportSpeachHttp(formData);
      setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
      setProcesando(false);
      handleisAlertOpen();
  } catch (err) {
      const message = getErrorHttpMessage(err);
      setMensajeAlert(message || intl.formatMessage({ id: 'http_error_registrar' }));
      setProcesando(false);
      handleisAlertOpen();
  }
}, [itemEdit]);

const setVocesConcepto = useCallback(async (voces: string[], user: string) => {
try {
    setProcesando(true);
    const data = voces.map((e: any) => {
        return {
            titulo: e?.titulo,
            voz: e?.audio?.blob,
            user,
            proyecto: espacio?.id,
            contrato: contrato?.id
        }
    });
    await data.reduce(async (_: any, fEnviar: any) => {
        try {
            await _;
            var formData = new FormData();
            formData.append("titulo", fEnviar?.titulo);
            formData.append("file", fEnviar?.voz);
            formData.append("id_usuario", user);
            formData.append("proyecto", espacio?.id);
            formData.append("contrato", contrato?.id);
            formData.append("frente", itemEdit?.id);
            formData.append("concepto", conceptoIdIA);
            await reportSpeachHttp(formData);
        } catch (error: any) {
            console.log('error', error)
        }
    }, Promise.resolve());
    setMensajeAlert(intl.formatMessage({ id: 'http_exito_registrar' }));
    setProcesando(false);
    handleisAlertOpen();
} catch (err) {
    const message = getErrorHttpMessage(err);
    setMensajeAlert(message || intl.formatMessage({ id: 'http_error_obtener' }));
    setProcesando(false);
    handleisAlertOpen();
}
}, [itemEdit]);

  return {
    espacio,
    contrato,
    configsButton,
    darkMode,
    frentes,
    AllowCell,
    setItemEdit,
    handleisAlertOpenEdit,
    deletePregunta,
    ExpandedComponent,
    handleisAlerClose,
    isAlertOpen,
    mensajeAlert,
    handleisAlerCloseEdit,
    isAlertOpenEdit,
    itemEdit,
    frentes_,
    procesando,
    setProcesando,
    editaFrente,
    actualizaEstatus,
    setOpenModalConfirm,
    setTextModalConfirm,
    openModalConfirm,
    textModalConfirm,
    isAlertOpenConcepto,
    setIsAlertOpenConcepto,
    handleisAlertOpenConcepto,
    handleisAlerCloseConcepto,
    frentesForm,
    handleGuardaConceptos,
    navigate,
    handleisAlerCloseConceptoDetalle,
    isAlertOpenConceptoDetalle,
    detalleConcepto,
    perfil,
    habilitaConcepto,
    desHabilitaConcepto,
    analizarAvanceConcepto,
    agregarProveedorConcepto,
    consultarHitosConcepto,
    subirFotoVideoConcepto,
    subirArchivoConcepto,
    programarHitosConcepto,
    asignarResponsablesConcepto,
    verProveedorConcepto,
    isAlertOpenProveedorConcepto,
    handleisAlertOpenProveedorConcepto,
    handleisAlerCloseProveedorConcepto,
    handleisAlerCloseProveedorConceptoInfo,
    isAlertOpenProveedorConceptoInfo,
    proveedoresConcepto,
    proveedoreDetalleConcepto,
    setProveedoreDetalleConcepto,
    actualizaProveedorConcepto,
    deleteProveedorPregunta,
    eliminaProveedorPorConcepto,
    setOpenModalConfirmProveedor,
    setTextModalConfirmProveedor,
    openModalConfirmProveedor,
    textModalConfirmProveedor,


    isAlertOpenHitos,
    handleisAlerCloseHitos,
    handleisAlertOpenHitos,
    intl,
    handelAccion,
    isDisabledNext,
    activeStep,
    handleStep,
    steps,
    handleAddNumerHitos,
    handleAddHito,
    hitosCrea,
    handleAddHitos,
    responsables,
    handleisAlerCloseMediaConcepto,
    isAlertOpenMediaConcepto,
    handleAddDocumento,

    handleisAlerCloseResponsables,
    isAlertOpenResponsables,
    isDisabledNextResponsables,
    activeStepResponsables,
    handleStepResponsables,
    stepsResponsables,
    responsablesCrea,
    handleAddNumerResponsables,
    handleAddResponsable,
    handleAddResponsables,

    isAlertOpenVerFrente,
    handleisAlerCloseVerFrente,
    handleisAlertOpenVerFrente,


    isAlertOpenVerDocumentos,
    handleisAlerCloseVerDocumentos,
    handleisAlertOpenVerDocumentos,


    isAlertOpenSubirDocumentos,
    handleisAlerCloseSubirDocumentos,
    handleisAlertOpenSubirDocumentos,

    isAlertOpenVerNotas,
    handleisAlerCloseVerNotas,
    handleisAlertOpenVerNotas,

    isAlertOpenSubirNotas,
    handleisAlerCloseSubirNotas,
    handleisAlertOpenSubirNotas,
    handleAddDocumentoFrente,

    mediaEdit,
    setMediaEdit,
    handlEliminarDocumentoFrente,
    handleisAlertOpen,

    setOpenModalConfirmDocumento,
    setTextModalConfirmDocumento,
    openModalConfirmDocumento,
    textModalConfirmDocumento,
    handleAddNotaFrente,

    handleisAlerCloseNotaEdit,
    isAlertOpenNotaEdit,
    notaEdit,

    handleisAlertOpenNotaEdit,
    setNotaEdit,

    handleEditNotaFrente,


    setOpenModalConfirmNotaDelete,
    setTextModalConfirmNotaDelete,
    openModalConfirmNotaDelete,
    textModalConfirmNotaDelete,
    deleteNotaPregunta,
    handleEliminaNotaFrente,

    isAlertOpenIA,
    handleisAlertOpenIA,
    handleisAlerCloseIA,

    setFotos,
    setFoto,
    setVoz,
    setVoces,


    setFotosConcepto,
    setFotoConcepto,
    setVozConcepto,
    setVocesConcepto,

    handleisAlerCloseIAConcepto,
    isAlertOpenIAConcepto

  }

}
export default useGestionFrentesPage
