import axios from 'axios';
import env from "react-dotenv";

export const getReporteCalendarioHTTP = async (id_contrato:any,actividadesProgramadas:any, avances_fecha_captura:any , avances_fecha_ejecucion:any,estimaciones:any): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getReporteCalendario"}?id_contrato=${id_contrato}&actividadesProgramadas=${actividadesProgramadas}&avances_fecha_captura=${avances_fecha_captura}&avances_fecha_ejecucion=${avances_fecha_ejecucion}&estimaciones=${estimaciones}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};


export const getReportePlanMaestroContratistaHTTP = async (id_espacio:any,contratos=''): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getReportePlanMaestroContratista"}?espacio=${id_espacio}&contratosIds=${contratos}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const getReportePlanMaestroClasificacionHTTP = async (id_espacio:any,contratos=''): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getReportePlanMaestroClasificacion"}?espacio=${id_espacio}&contratosIds=${contratos}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

