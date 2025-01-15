import axios from 'axios';
import env from "react-dotenv";
import { GeneralHttpResponseCatalogo } from '../types/geericTypes';
export const SET_CATALOGO = "@SET_CATALOGO";

export const setCatalogo = (value: any, catalogo: string) => {
  return {
    type: SET_CATALOGO,
    value,
    cat: catalogo
  };
};

export const getCatalogoEstatus = async (): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.get(
      `${env.API_URL}${"/getCatalogoEstatus"}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const getCatalogoEspecialidad = async (): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.get(
      `${env.API_URL}${"/getCatalogoEspecialidad"}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const getCatalogoSubEspecialidad = async (): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.get(
      `${env.API_URL}${"/getCatalogoSubEspecialidad"}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const getCatalogosGereicos = async (BD: string): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.get(
      `${env.API_URL}${"/getCatalogoGenerico"}?BD=${BD}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const saveCatalogosGereicos = async (data: { 
  clave: string, 
  nombre: string, 
  descripcion: string, 
  id_estatus: string, 
  BD: string 
}): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.post(
      `${env.API_URL}${"/guardaCatalogoGenerico"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const guardaCatalogoTipoContratoHttp = async (data: { 
  clave: string, 
  nombre: string, 
  descripcion: string, 
  id_estatus: string, 
  BD: string 
}) => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.post(
      `${env.API_URL}${"/guardaCatalogoTipoContrato"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}

export const actualizaCatalogoTipoContratoHttp = async (data: { 
  clave: string, 
  nombre: string, 
  descripcion: string, 
  id_estatus: string, 
  BD: string, 
  id: string 
}) => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.post(
      `${env.API_URL}${"/actualizaCatalogoTipoContrato"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}

export const actualizaCatalogoEspecialidad = async (data: { 
  clave: string, 
  nombre: string, 
  id_estatus: string, 
  id_proyecto: string, 
  especialidad: string, 
  id: string 
}): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.post(
      `${env.API_URL}${"/actualizaCatalogoEspecialidad"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const editaCatalogoEspecialidadDocumento = async (data: { 
  clave: string, 
  nombre: string, 
  descripcion: string, 
  id_estatus: string, 
  id_proyecto: string, 
  id_especialidad: string, 
  subEspecialidad: string, 
  id: string 
}): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.post(
      `${env.API_URL}${"/editaCatalogoEspecialidadDocumento"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const guardaCatalogoContratista = async (data: { 
  contratista: string, 
  correo_contratista: string, 
  descripcion: string, 
  rfc: string, 
  id_externo: string, 
  id_proyecto: string, 
  id_estatus: string, 
  estatus_bloqueo: string, 
  extranjero: string 
}) => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.post(
      `${env.API_URL}${"/guardaCatalogoContratista"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}

export const actualizaCatalogoContratistaHttp = async (data: { 
  contratista: string, 
  correo_contratista: string, 
  descripcion: string, 
  rfc: string, 
  id_externo: string, 
  id_proyecto: string, 
  id_estatus: string, 
  estatus_bloqueo: string, 
  extranjero: string, 
  id: number 
}) => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.post(
      `${env.API_URL}${"/actualizaCatalogoContratista"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}

export const actualizaCatalogosGenericos = async (data: { 
  clave: string, 
  nombre: string, 
  descripcion: string, 
  id_estatus: string, 
  BD: string, 
  id: string 
}): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.post(
      `${env.API_URL}${"/actualizaCatalogosGenericos"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const cambiaEstatusCatalogosGenericos = async (data: { 
  id_estatus: string, 
  BD: string, 
  id: string 
}): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.post(
      `${env.API_URL}${"/cambiaEstatusCatalogosGenericos"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const saveCatalogosEspecialidad = async (data: { 
  clave: string, 
  nombre: string, 
  id_estatus: string, 
  id_proyecto: string, 
  especialidad: string 
}): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.post(
      `${env.API_URL}${"/guardaCatalogoEspecialidad"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const guardaCatalogoEspecialidadDocumento = async (data: {
  clave: string,
  nombre: string,
  descripcion: string,
  id_estatus: string,
  id_proyecto: string,
  id_especialidad: string,
  subEspecialidad: string
}): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.post(
      `${env.API_URL}${"/guardaCatalogoEspecialidadDocumento"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};


export const guardaCatalogoEquipoMaquinaria = async (data: {
  nombre: string,
  unidad: string,
  precio: string,
  id_proyecto: string,
  id_tipo: string,
  id_estatus: string
}): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.post(
      `${env.API_URL}${"/guardaCatalogoEquipoMaquinaria"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const editaCatalogoEquipoMaquinaria = async (data: {
  nombre: string,
  unidad: string,
  precio: string,
  id_proyecto: string,
  id_tipo: string,
  id_estatus: string,
  id: string
}): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.post(
      `${env.API_URL}${"/actualizaCatalogoEquipoMaquinaria"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};


export const guardaCatalogoObras = async (data: {
  obra: string,
  descripcion: string,
  fecha_inicio: string,
  fecha_fin: string,
  fecha_registro: string,
  id_estatus: string,
  latitud: string,
  longitud: string,
  limite_contratos: string
}): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.post(
      `${env.API_URL}${"/guardaCatalogoObras"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const actualizaCatalogoObras = async (data: {
  obra: string,
  descripcion: string,
  fecha_inicio: string,
  fecha_fin: string,
  fecha_registro: string,
  id_estatus: string,
  latitud: string,
  longitud: string,
  id: string,
  limite_contratos: string
}): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.post(
      `${env.API_URL}${"/actualizaCatalogoObras"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const guardaCatalogoPEPHttp = async (data: {
  pep: string,
  descripcion: string,
  cotizacion: string,
  presupuesto: string,
  cuenta: string,
  orden: string,
  imputable: string,
  id_proyecto: string
}): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.post(
      `${env.API_URL}${"/guardaCatalogoPEP"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const actualizaCatalogoPEPHttp = async (data: {
  pep: string,
  descripcion: string,
  cotizacion: string,
  presupuesto: string,
  cuenta: string,
  orden: string,
  imputable: string,
  id_proyecto: string,
  id: string
}): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.post(
      `${env.API_URL}${"/actualizaCatalogoPEP"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const guardaCatalogoTipoConceptoHttp = async (data: {
  nombre: string,
  id_estatus: string
}): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.post(
      `${env.API_URL}${"/guardaCatalogoTipoConcepto"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const actualizaCatalogoTipoConceptoHttp = async (data: {
  nombre: string,
  id_estatus: string,
  id: string
}): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.post(
      `${env.API_URL}${"/actualizaCatalogoTipoConcepto"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const guardaCatalogoMonedaHttp = async (data: {
  nombre: string,
  id_estatus: string
}): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.post(
      `${env.API_URL}${"/guardaCatalogoMoneda"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const actualizaCatalogoMonedaHttp = async (data: {
  nombre: string,
  id_estatus: string,
  id: string
}): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.post(
      `${env.API_URL}${"/actualizaCatalogoMoneda"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const guardaCatalogoTipoAvanceHttp = async (data: {
  nombre: string,
  id_estatus: string
}): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.post(
      `${env.API_URL}${"/guardaCatalogoTipoAvance"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const actualizaCatalogoTipoAvanceHttp = async (data: {
  nombre: string,
  id_estatus: string,
  id: string
}): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.post(
      `${env.API_URL}${"/actualizaCatalogoTipoAvance"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};


export const getCatalogoContratistas = async (): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.get(
      `${env.API_URL}${"/getCatalogoContratistas"}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};


export const getCatalogoEquipoMaquinaria = async (): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.get(
      `${env.API_URL}${"/getCatalogoEquipoMaquinaria"}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const getCatalogoObras = async (): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.get(
      `${env.API_URL}${"/getCatalogoObras"}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};


export const getCatalogoTipoValorHTTP = async (): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.get(
      `${env.API_URL}${"/getCatalogoTipoValor"}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};


export const getCatalogoContratistasPorObraHTTP = async (id_obra:any): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.get(
      `${env.API_URL}${"/getCatalogoContratistasPorObra"}?id_obra=${id_obra}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};


export const getCatalogoPEPSContratoHTTP = async (id_contrato:any): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getCatalogoPEPSContrato"}?id_contrato=${id_contrato}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};


export const getCatalogoPEP = async (): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.get(
      `${env.API_URL}${"/getCatalogoPEP"}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const getCatalogoTipoConcepto = async (): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.get(
      `${env.API_URL}${"/getCatalogoTipoConcepto"}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const getCatalogoMoneda = async (): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.get(
      `${env.API_URL}${"/getCatalogoMoneda"}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const getCatalogoTipoAvance = async (): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.get(
      `${env.API_URL}${"/getCatalogoTipoAvance"}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const getCatalogoTipoUsuario = async (): Promise<any> => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.get(
      `${env.API_URL}${"/getTipoUsuario"}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const guardaCatalogoPerfilClienteHTTP = async (data: { 
  clave: string, 
  nombre: string, 
  descripcion: string, 
  id_estatus: string, 
  id_tipo: string, 
  BD: string 
}) => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.post(
      `${env.API_URL}${"/guardaCatalogoPerfilCliente"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}

export const actualizaCatalogoPerfilClienteHttp = async (data: { 
  clave: string, 
  nombre: string, 
  descripcion: string, 
  id_estatus: string, 
  id_tipo: string, 
  BD: string, 
  id: string 
}) => {
  try {
    const response: GeneralHttpResponseCatalogo = await axios.post(
      `${env.API_URL}${"/actualizaCatalogoPerfilCliente"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}