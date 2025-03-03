import { backendUrl } from "@/constants";
import axios from "axios";

export const getOtTheatres = async (token: string) => {
    try {
        
        const response = await axios.get(`${backendUrl}/theatres`, {
            headers: {
                'x-auth-token': token,
            }
        });

        const responseData = response.data;

        return {
            success: true,
            data: responseData,
            message: 'Theatres fetched Successfully'
        };
    }
    catch (e) {
        console.log('An error occured', e);
        return {
            success: false,
            data: null,
            message: "An error occured."
        };
    }
};