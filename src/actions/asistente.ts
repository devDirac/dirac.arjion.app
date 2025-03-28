import axios from 'axios';
import env from "react-dotenv";


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