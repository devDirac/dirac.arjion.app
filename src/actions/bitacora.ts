import axios from 'axios';
import env from "react-dotenv";


export const getBitacoraPorUsuarioSesionHttp = async (): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getBitacoraPorUsuarioSesion"}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};


