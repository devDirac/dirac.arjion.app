import { useState } from "react";
import _ from "lodash";
import type { CardsUsuariosContratoProps } from "./CardsUsuariosContrato";
import { useIntl } from "react-intl";

export const useCardsUsuariosContrato = (props: CardsUsuariosContratoProps) => {
  const intl = useIntl();
  const [esNuevo, setEsNuevo] = useState(0);
  const [usersSeleccion, setUsersSeleccion] = useState([]);
  const [elementosOrden, setElementosOrden] = useState<any[]>([]);
  const [usuariosMap, setUsuariosMap] = useState<any[]>(props?.usuarios);
  const [isAlertOpen,setIsAlertOpen] = useState(false);
  const [resetForm,setResetForm]  = useState<boolean>(false);
  const [mensajeAlert,setMensajeAlert] = useState('');
  const handleisAlertOpen = () => setIsAlertOpen(true);
  const handleisAlerClose = () => setIsAlertOpen(false);
  const handleOrden = (orden: any, idUser: any) => {
    if (_.isEmpty(orden) || isNaN(orden)) {
      return;
    }
    const existeOrden = elementosOrden.find(
      (e) => e?.orden === orden && e?.idUser !== idUser
    );
    if (existeOrden) {
      setMensajeAlert(
        intl.formatMessage({ id: 'card_usuarios_contrato_existe_orden' })
      );
      handleisAlertOpen();
      const newOrden = Object.assign([], elementosOrden);
      newOrden.filter((e: any) => e?.idUser !== idUser);
      setElementosOrden(_.uniqBy(newOrden, "idUser"));
      return;
    }
    const newOrden = Object.assign(
      [],
      elementosOrden.filter((e: any) => e?.idUser !== idUser)
    );
    newOrden.push({ orden, idUser });
    setElementosOrden(_.uniqBy(newOrden, "idUser"));
  };

  const handleFiltro = (textoFiltrar: string) => {
    const clonUser = Object.assign([], props?.usuarios);
    if (_.isEmpty(textoFiltrar)) {
      setUsuariosMap(props?.usuarios);
      return;
    }

    setUsuariosMap(
      clonUser.filter(
        (c: any) =>
          c?.usuario.includes(textoFiltrar.trim()) ||
          c?.nombre.includes(textoFiltrar.trim()) ||
          c?.email.includes(textoFiltrar.trim())
      )
    );
  };
  return {
    esNuevo,
    setEsNuevo,
    usersSeleccion,
    handleFiltro,
    usuariosMap,
    elementosOrden,
    handleOrden,
    setUsersSeleccion,
    isAlertOpen,
    handleisAlerClose,
    mensajeAlert,
    resetForm,setResetForm,
    intl
  };
};
