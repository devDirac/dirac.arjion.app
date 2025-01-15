import axios from 'axios';
import env from "react-dotenv";


export const getEstructuraDeVistasJson = async (): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getEstructuraDeVistasJson"}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}

export const getDinamicDashboard = async (data: any): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/vozToSQL"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}

export const getDinamicBusqueda = async (palabra: string): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/search"}?palabra=${palabra} `,
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const compareImagesHTTP = async (data: any): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/compareImages"}`, data, { headers: { "Content-Type": "multipart/form-data", } }
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}


export const setPreguntaCorrectaHTTP = async (data: any): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/setPreguntaCorrecta"}`, data, 
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}

export const AsistenteVirtualHTTP = async (data: any): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/chat"}`, data, 
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}


export const buscarDocumentosHTTP = async (data: any): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/buscarDocumentos"}`, data, 
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}


export const prediccionConceptosHTTP = async (data: any): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/prediccion_conceptos"}`, data, 
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}


