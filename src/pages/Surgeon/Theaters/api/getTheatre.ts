import { backendUrl } from "@/constants";
import axios from "axios";

export const getTheatres = async (token: string) => {
    try {
        const response = await axios.get(`${backendUrl}/theatres/available`, {
            headers: {
                'x-auth-token': token,
            }
        })

        const responseData = response.data;

        return {
            success: true,
            data: responseData,
            message: 'Theatres data fetched successfully'
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
