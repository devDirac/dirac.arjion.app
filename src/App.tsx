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
import _ from "lodash";
import CarruselPage from "./pages/CarruselPage";
import SeleccionCarruselPage from "./pages/SeleccionCarruselPage";
import CrudCarruselPage from "./pages/CrudCarruselPage";

export default function App() {
  const [controller ] = useMaterialUIController();
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
          {/* fin rutas publicas */}
          <Route path="*" element={<NotFoundPage />} />
          {/* fin pagina no encontrada */}
        </Routes>
      </IntlProvider>
    </ThemeProvider>
  );
}