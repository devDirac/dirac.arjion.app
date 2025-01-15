import axios from 'axios';
import env from "react-dotenv";

export const fileManagerHTTP = async (espacio: any, path: string) => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/file-manager"}?espacio=${espacio}&path=${path}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}

export const setCarpetaHTTP = async (data: any) => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/setCarpeta"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}

export const getRutasEspacioHTTP = async (espacio: any) => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getRutasEspacio"}?espacio=${espacio}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}


export const asignaCarpetaHTTP = async (data: any) => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/asignaCarpeta"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}
