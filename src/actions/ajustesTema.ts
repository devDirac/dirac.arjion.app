import axios from 'axios';
import env from "react-dotenv";

export const setColorMenuLateralHTTP = async (data: any) => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/setColorMenuLateral"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}

export const setTipoMenuLateralHTTP = async (data: any) => {
    try {
      const response: any = await axios.post(
        `${env.API_URL}${"/setTipoMenuLateral"}`, data
      );
      return response?.data || [];
    } catch (error) {
      const promise = new Promise((_, reject) => reject(error));
      return promise;
    }
}


export const setCabeceraFijaHTTP = async (data: any) => {
    try {
      const response: any = await axios.post(
        `${env.API_URL}${"/setCabeceraFija"}`, data
      );
      return response?.data || [];
    } catch (error) {
      const promise = new Promise((_, reject) => reject(error));
      return promise;
    }
}

export const setMenuLateralMiniHTTP = async (data: any) => {
    try {
      const response: any = await axios.post(
        `${env.API_URL}${"/setMenuLateralMini"}`, data
      );
      return response?.data || [];
    } catch (error) {
      const promise = new Promise((_, reject) => reject(error));
      return promise;
    }
}

export const setTemaClaroOscuroHTTP = async (data: any) => {
    try {
      const response: any = await axios.post(
        `${env.API_URL}${"/setTemaClaroOscuro"}`, data
      );
      return response?.data || [];
    } catch (error) {
      const promise = new Promise((_, reject) => reject(error));
      return promise;
    }
}


export const setIdiomaHTTP = async (data: any) => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/setIdioma"}`, data
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
}

