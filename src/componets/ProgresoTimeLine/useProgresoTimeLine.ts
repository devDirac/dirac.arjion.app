import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFlujo } from '../../actions/flujoInicial';
import { setMenuRoutes } from '../../actions/menu';
import routes from '../../routes'


const useProgresoTimeLine = (props:any) => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const contrato = useSelector((state:any) => state?.app?.contrato || null);
    
    const handleSelectParametros = (id:any) => {
        dispatch(setFlujo(null));
        dispatch(setMenuRoutes(routes.find(e=>e?.key === 'parametros-sistema')));
        navigate(`/gestion-contratos?id=${id}`);
        props?.onSelect();
    }

    const handleUsuarios = (id:any) => {
        dispatch(setFlujo(null));
        dispatch(setMenuRoutes(routes.find(e=>e?.key === 'parametros-sistema')));
        navigate(`/gestion-contratos?id=${id}`);
        props?.onSelect();
    }

    const handleAsignacionPEP = (id:any) => {
        dispatch(setFlujo(null));
        dispatch(setMenuRoutes(routes.find(e=>e?.key === 'parametros-sistema')));
        navigate(`/gestion-contratos?id=${id}`);
        props?.onSelect();
    }

    const handleAsignacionClasificacion = (id:any)=> {
        dispatch(setFlujo(null));
        dispatch(setMenuRoutes(routes.find(e=>e?.key === 'parametros-sistema')));
        navigate(`/gestion-contratos?id=${id}`);
        props?.onSelect();
    }

    const handleFrentes = () =>{ 
        dispatch(setFlujo(null));
        dispatch(setMenuRoutes(routes.find(e=>e?.key === 'parametros-sistema')));
        navigate(`/catalogo-de-conceptos-por-frentes`);
        props?.onSelect();
    }

    const handleCatalogoConceptos = () => {
        dispatch(setFlujo(null));
        dispatch(setMenuRoutes(routes.find(e=>e?.key === 'parametros-sistema')));
        navigate(`/catalogo-de-conceptos-por-frentes`);
        props?.onSelect();
    }

    const handleProgramaFinanciero = () => {
        
        dispatch(setFlujo(null));
        dispatch(setMenuRoutes(routes.find(e=>e?.key === 'matriz-avance')));
        navigate(`/programa-financiero`);
        props?.onSelect();

    }


  return {
    contrato,
    handleSelectParametros,
    handleUsuarios,
    handleAsignacionPEP,
    handleAsignacionClasificacion,
    handleFrentes,
    handleCatalogoConceptos,
    handleProgramaFinanciero
  }
}

export default useProgresoTimeLine
