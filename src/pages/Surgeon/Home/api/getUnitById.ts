import { backendUrl } from "@/constants";
import axios from "axios";

export const getUnitById = async ({ token, id }: { token: string, id: string }) => {
    try {
        const response = await axios.post(`${backendUrl}/units/unitById`, {
            id: id
        }, {
            headers: {
                'x-auth-token': token,
            }
        })

        const responseData = response.data;

        return {
            success: true, 
            data: responseData,
            message: 'Units data fetched successfully'
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