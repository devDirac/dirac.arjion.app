import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PublicRouter from "./hocs/PublicRoutes";
import NotFoundPage from "./pages/NotFoundPage";
import { IntlProvider, ReactIntlErrorCode } from "react-intl";
import textosMx from "./idioms/mx";
import textoEn from "./idioms/en";
import { useSelector } from "react-redux";
import { StoreType } from "./types/geericTypes";
import {
  useMaterialUIController,
} from "context";
import { CssBaseline } from "@mui/material";
import themeDarkRTL from "./assets/theme-dark/theme-rtl";
import themeRTL from "./assets/theme/theme-rtl";
import { ThemeProvider } from "@mui/material/styles";
import CarruselPage from "./pages/CarruselPage";
import SeleccionCarruselPage from "./pages/SeleccionCarruselPage";  
import CrudCarruselPage from "./pages/CrudCarruselPage";
import SolicitantePage from "./pages/SolicitantePage";
import RevisionCrudConceptosPage from "./pages/RevisionCrudConceptosPage";
import RevisionCrudTipoSolicitudPage from "./pages/RevisionCrudTipoSolicitudPage";
import RevisionEdicionPerfilesPage from "./pages/RevisionEdicionPerfilesPage";
import RevisionAdministrarSolicitudesPage from "./pages/RevisionAdministrarSolicitudesPage";
import RevisionCrudFormaPagoPage from "./pages/RevisionCrudFormaPagoPage";
import { ProviderContextUserComponent } from "./context/GacUserQueryParamsContexto";
import GacDetalleSolicitudPage from "./pages/GacDetalleSolicitudPage";

export default function App() {

  const [controller] = useMaterialUIController();

  const {
    direction, darkMode,
  } = controller;
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement && (document.scrollingElement.scrollTop = 0);
  }, [pathname]);

  const local = useSelector(
    (state: StoreType) => state?.app?.idioma || 'mx'
  );

  const loadLocaleData = (locale: string) => {
    if (locale === 'en') {
      return textoEn;
    }
    return textosMx;
  };

  const onError = (e: any) => {
    if (e.code === ReactIntlErrorCode.MISSING_DATA) {
      return;
    }
  };

  return (
    <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
      <CssBaseline />
      <IntlProvider onError={onError} locale={local} messages={loadLocaleData(local)}>
        <Routes>
          {/* inicia rutas publicas */}
          <Route path="/" element={<PublicRouter />}>
            <Route path="/" element={<CrudCarruselPage />} />
          </Route>
          <Route path="/info-dirac-seleccion" element={<PublicRouter />}>
            <Route path="/info-dirac-seleccion" element={<SeleccionCarruselPage />} />
          </Route>
          <Route path="/info-dirac" element={<PublicRouter />}>
            <Route path="/info-dirac" element={<CarruselPage />} />
          </Route>
          <Route path="/gac-home" element={<PublicRouter />}>
            <Route path="/gac-home" element={ <ProviderContextUserComponent> <SolicitantePage /> </ProviderContextUserComponent>} />
          </Route>
          {/* CRUD CATALOGO DE CONCEPTOS */}
          <Route path="/gac-revisor-catalogo-conceptos-crud" element={<PublicRouter />}>
            <Route path="/gac-revisor-catalogo-conceptos-crud" element={<ProviderContextUserComponent> <RevisionCrudConceptosPage /> </ProviderContextUserComponent>} />
          </Route>
          {/* CRUD TIPOS DE SOLICITUD */}
          <Route path="/gac-revisor-catalogo-tipo-solicitud-crud" element={<PublicRouter />}>
            <Route path="/gac-revisor-catalogo-tipo-solicitud-crud" element={<ProviderContextUserComponent> <RevisionCrudTipoSolicitudPage /> </ProviderContextUserComponent>} />
          </Route>

          {/* CRUD FORMAS DE PAGO  */}
          <Route path="/gac-revisor-catalogo-forma-pago-crud" element={<PublicRouter />}>
            <Route path="/gac-revisor-catalogo-forma-pago-crud" element={<ProviderContextUserComponent> <RevisionCrudFormaPagoPage /> </ProviderContextUserComponent>} />
          </Route>


          {/* EDICION DE PERFILES */}
          <Route path="/gac-revisor-ediion-perfiles" element={<PublicRouter />}>
            <Route path="/gac-revisor-ediion-perfiles" element={<ProviderContextUserComponent> <RevisionEdicionPerfilesPage /> </ProviderContextUserComponent>} />
          </Route>
          {/* ADMINISTRAR SOLICITUDES */}
          <Route path="/gac-administrar-solicitudes" element={<PublicRouter />}>
            <Route path="/gac-administrar-solicitudes" element={<ProviderContextUserComponent> <RevisionAdministrarSolicitudesPage /> </ProviderContextUserComponent>} />
          </Route>

          {/* Detalle de la solicitud */}
          <Route path="/gac-detalle-solicitud" element={<PublicRouter />}>
            <Route path="/gac-detalle-solicitud" element={<ProviderContextUserComponent> <GacDetalleSolicitudPage /> </ProviderContextUserComponent>} />
          </Route>


          {/* fin rutas publicas */}
          <Route path="*" element={<NotFoundPage />} />
          {/* fin pagina no encontrada */}
        </Routes>
      </IntlProvider>
    </ThemeProvider>
  );
}