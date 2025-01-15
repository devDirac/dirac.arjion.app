import axios from 'axios';
import env from "react-dotenv";

export const guardaUrlVisitadaHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/guardaUrlVisitada"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

