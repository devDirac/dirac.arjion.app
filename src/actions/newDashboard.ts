import axios from 'axios';
import env from "react-dotenv";
export const SET_INFO_NEW_DASHBOARD_ALERTAS = "@SET_INFO_NEW_DASHBOARD_ALERTAS";

export const setInfoNewDashboardAlertas = (value: any, seccion: string) => {
    return {
        type: SET_INFO_NEW_DASHBOARD_ALERTAS,
        value,
        dashboardSeccion: seccion
    };
};

export const getDataDashboardInicio = async (id: any): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/inicio-dashboard"}?id=${id}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getTotalContratadoPresupuestoHTTP  = async (id_obra_principal: any): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/getTotalContratadoPresupuesto"}?id_obra_principal=${id_obra_principal}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getTotalContratadoResumenHTTP  = async (id_obra_principal: any): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/getTotalContratadoResumen"}?id_obra_principal=${id_obra_principal}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getTotalContratadoAvanceHTTP  = async (id_obra_principal: any): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/getTotalContratadoAvance"}?id_obra_principal=${id_obra_principal}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getTotalContratadoListaContratosHTTP  = async (id_obra_principal: any): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/getTotalContratadoListaContratos"}?id_obra_principal=${id_obra_principal}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getTotalContratadoTotalImportePorTipoMonedaHTTP  = async (id_obra_principal: any): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/getTotalContratadoTotalImportePorTipoMoneda"}?id_obra_principal=${id_obra_principal}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const getTotalContratadohttp = async (id_obra_principal: any): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/getTotalContratado"}?id_obra_principal=${id_obra_principal}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getTotalContratadoUsuriohttp = async (id_obra_principal: any, usuario: any, contrato:string): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/getTotalContratadoUsurio"}?id_obra_principal=${id_obra_principal}&usuario=${usuario}&id_contrato=${contrato}`
        const response: any = await axios.get(
            url,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getResumenFinancieroHTTP = async (): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getResumenFinanciero"}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getDashboardAvanceFisicoGraficaHTTP = async (id_obra_principal:any): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getDashboardAvanceFisicoGrafica"}?id_obra_principal=${id_obra_principal}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getDashboardAvanceFisicoTablaHTTP = async (id_obra_principal:any): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getDashboardAvanceFisicoTabla"}?id_obra_principal=${id_obra_principal}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getDashboardAvanceFisicoHTTP = async (id_obra_principal:string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getDashboardAvanceFisico"}?id_obra_principal=${id_obra_principal}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const relacionContratosAPMHTTP = async (id_obra_principal:string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/relacionContratosAPM"}?id_obra_principal=${id_obra_principal}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const relacionContratosHTTP = async (id_obra_principal:string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/relacionContratos"}?id_obra_principal=${id_obra_principal}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const vencimientoContratosHTTP = async (fecha_inicio: string, fecha_fin: string, obra: any): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/vencimientoContratos"}?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}&obra=${obra}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const consultaCronoFinancieraContratosHTTP = async (id_obra_principal:string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/consultaCronoFinancieraContratos"}?id_obra_principal=${id_obra_principal}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getDataFiltrosBitacoraEstimacionesHTTP = async (id_obra_principal:string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getDataFiltrosBitacoraEstimaciones"}?id_obra_principal=${id_obra_principal}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getDataConsultaEstimacionesBitacoraHTTP = async (url: string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getDataConsultaEstimacionesBitacora"}${url}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getEstimacionesTiempoHTTP = async (url: string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getEstimacionesTiempo"}${url}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getActividadesCalendarioHTTP = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/getActividadesCalendario"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getContratosTiempoFiltroHTTP = async (usuario:string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getContratosTiempoFiltro"}?usuario=${usuario}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getDatosPlanMaestroHTTP = async (id_contrato:string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getDatosPlanMaestro"}?id_contrato=${id_contrato}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getPlanMaestroHTTP = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/getPlanMaestro"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getUsuariosProyectoHTTP = async (id_obra_principal:string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getUsuariosProyecto"}?id_obra_principal=${id_obra_principal}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};
export const getActualizacionesSapHTTP = async (id_obra_principal:string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getActualizacionesSap"}?id_obra_principal=${id_obra_principal}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getInfoGeneralHTTP = async (contrato:string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getInfoGeneral"}?id_contrato=${contrato}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getAlertasDashboardHTTP = async (id_obra_principal:string): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getAlertasDashboard"}?id_obra_principal=${id_obra_principal}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getBalanaceHTTP = async (data:any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/getBalanace"}`,data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getBalanaceDosHTTP = async (data:any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/getBalanaceDos"}`,data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const getBalanaceTresHTTP = async (data:any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/getBalanaceTres"}`,data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getCPOInicialHTP = async (id_obra_principal: any): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/getCPOInicial"}?id_obra_principal=${id_obra_principal}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getCPOProgramaFinancieroPorClasificacionHTTP = async (anio:string,id_obra_principal:string): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/getCPOProgramaFinancieroPorClasificacion"}?anio=${anio}&id_obra_principal=${id_obra_principal}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getPromedioAvanceHTTP = async (data:any): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/getPromedioAvance"}?contratista=${data?.contratista || 0}&fechaInicio=${data?.fechaInicio}&fechaFin=${data?.fechaFin}&id_obra_principal=${data?.id_obra_principal}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getPromedioValidacionHTTP = async (data:any): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/getPromedioValidacion"}?contratista=${data?.contratista || 0}&fechaInicio=${data?.fechaInicio}&fechaFin=${data?.fechaFin}&id_obra_principal=${data?.id_obra_principal}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const reclasificacionesHTP = async (id_obra_principal: any): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/reclasificaciones"}?id_obra_principal=${id_obra_principal}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getOrdenCompraHTTP = async (id_obra_principal: any): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/getOrdenCompra"}?id_obra_principal=${id_obra_principal}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getAhorroHTTP = async (id_obra_principal: any): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/getAhorro"}?id_obra_principal=${id_obra_principal}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getAnticiposHTTP = async (id_obra_principal: any): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/getAnticipos"}?id_obra_principal=${id_obra_principal}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getDeductivasHTTP = async (apm_usuario: any): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/getDeductivas"}?apm_usuario=${apm_usuario}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getFondoGarantiaHTTP = async (id_obra_principal: any): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/getFondoGarantia"}?id_obra_principal=${id_obra_principal}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getEstimacionesProcesoHTTP = async (id_obra_principal: any): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/getEstimacionesProceso"}?id_obra_principal=${id_obra_principal}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getPendientesContabilizarHTTP = async (id_obra_principal: any): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/getPendientesContabilizar"}?id_obra_principal=${id_obra_principal}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const getOENEHTTP = async (id_obra_principal: any, apm_usuario:any): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/getOENE"}?id_obra_principal=${id_obra_principal}&apm_usuario=${apm_usuario}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getContratosClasificacionesHTTP = async (id_clasificacion: any): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/getContratosClasificaciones"}?id_clasificacion=${id_clasificacion}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getAnticiposResponsablesHTTP = async (usuario: any): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/getAnticiposResponsables"}?usuario=${usuario}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getFondoGarantiaResponsablesHTTP = async (usuario: any): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/getFondoGarantiaResponsables"}?usuario=${usuario}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const getEstimacionesProcesoResponsablesHTTP = async (usuario: any): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/getEstimacionesProcesoResponsables"}?usuario=${usuario}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getPendientesContabilizarResponsablesHTTP = async (usuario: any): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/getPendientesContabilizarResponsables"}?usuario=${usuario}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const getBitacoraEstimacionesHTTP = async (id_estimacion: any): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/getBitacoraEstimaciones"}?id_estimacion=${id_estimacion}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const procesando360HTTP = async (id: any, estatus:any): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/procesando360"}?id=${id}&estatus=${estatus}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getDetalleDeductivasHTTP = async (id_contrato: any): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/getDetalleDeductivas"}?id_contrato=${id_contrato}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getDetalleFondoGarantiaHTTP = async (id_contrato: any): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/getDetalleFondoGarantia"}?id_contrato=${id_contrato}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getDetallePendienteContabilizarHTTP = async (id_contrato: any): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/getDetallePendienteContabilizar"}?id_contrato=${id_contrato}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getDetalleOENEHTTP = async (id_contrato: any): Promise<any> => {
    try {
        let url = '';
        url = `${env.API_URL}${"/getDetalleOENE"}?id_contrato=${id_contrato}`
        const response: any = await axios.get( url,);
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};



