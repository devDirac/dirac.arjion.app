import { combineReducers } from "redux";
import { RESET_STATE, SET_USER } from "../actions/auth";
import { SET_UPLOAD } from "../actions/uploads";
import { SET_IDIOMA } from "../actions/idiomas";
import { SET_CATALOGO } from "../actions/catalogos";
import { SET_ESPACIO_TRABAJO } from '../actions/espacioTrabajo';
import { SET_MENU_ROUTES, SET_MENU_ROUTES_DASHBOARD, SET_MENU_ROUTES_DASHBOARD_INFO } from "../actions/menu";
import { SET_FLUJO } from '../actions/flujoInicial';
import { SET_CONTRATO_ESPACIO } from "../actions/contratos";
import { SET_NOTIFICACIONES } from "../actions/notificaciones";
import { SET_ELEMENTOS_ESTIMAR } from '../actions/estimaciones';
import { SET_FIRMA_ALLOW } from '../actions/firma';
import { SET_INFO_NEW_DASHBOARD_ALERTAS } from '../actions/newDashboard';



const appReducer = (state: any = { app: { user: {}, employees: { data: [], detail: {} }, upload: [] } }, action: any) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...{ user: (action?.value || {}) } };
    case SET_UPLOAD:
      return { ...state, ...{ upload: [...(state?.upload || []), action?.value] } };
    case SET_IDIOMA:
      return { ...state, ...{ idioma: action?.value || 'mx' } };
    case SET_CATALOGO:
      return { ...state, ...{ catalogos: { ...state?.catalogos, ...{ [action.cat]: action?.value } } } };
    case SET_ESPACIO_TRABAJO:
      return { ...state, ...{ espacio: action?.value || null } };
    case SET_MENU_ROUTES:
      return { ...state, ...{ ruta: action?.value || null } };
    case SET_MENU_ROUTES_DASHBOARD:
      return { ...state, ...{ ruta1: action?.value || null } };
    case SET_MENU_ROUTES_DASHBOARD_INFO:
      return { ...state, ...{ ruta2: action?.value || null } };
    case SET_FLUJO:
      return { ...state, ...{ flujoInicial: action?.value || null } };
    case SET_CONTRATO_ESPACIO:
      return { ...state, ...{ contrato: action?.value || null } };
    case SET_NOTIFICACIONES:
      return { ...state, ...{ notificaciones: action?.value || null } };
    case SET_ELEMENTOS_ESTIMAR:
      return { ...state, ...{ elementos_estimar: action?.value || [] } };
    case SET_FIRMA_ALLOW:
      return { ...state, ...{ firmaAllow: action?.value || false } };
    case SET_INFO_NEW_DASHBOARD_ALERTAS:
      return { ...state, ...{ new_dashboard: { ...state?.new_dashboard, ... { [action.dashboardSeccion]: action?.value } } } };

    case RESET_STATE:
      return {};
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;
