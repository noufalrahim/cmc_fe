import { backendUrl } from "@/constants";
import axios from "axios";

export const getTheatreById = async (token: string, id: string) => {
    try {

        const response = await axios.post(`${backendUrl}/theatres/theatreId`, {
            theatreId: id
        }, {
            headers: {
                'x-auth-token': token,
            }
        });

        const responseData = response.data;

        return {
            success: true,
            data: responseData,
            message: 'PAC Pending Patients data fetched successfully'
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