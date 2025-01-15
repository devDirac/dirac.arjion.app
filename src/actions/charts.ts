import axios from 'axios';
import env from "react-dotenv";

export const guardaGrafica = async (data: any): Promise<any> => {
  return axios.post(
    `${env.API_URL}/guardaGrafica`, data
  );
};

export const eliminaGraficaHttp = async (data: any): Promise<any> => {
  try {
    const response = await axios.post(
      `${env.API_URL}/deleteGrafica`, data
    );
    return response?.data || {};
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const getChartsDinamicas = async (): Promise<any> => {
  try {
    const response = await axios.get(
      `${env.API_URL}/getCharts`
    );
    return response?.data || {};
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const getDataChartsDinamicas = async (data: any): Promise<any> => {
  try {
    const response = await axios.post(
      `${env.API_URL}/getReportesData`, data
    );
    return response?.data || {};
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};