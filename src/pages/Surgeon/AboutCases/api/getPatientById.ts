import { backendUrl } from "@/constants";
import axios from "axios";

export const getPatientById = async ({ token, id }: { token: string, id: string }) => {
    try {
        const response = await axios.post(`${backendUrl}/patients/patientById`, {
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
            message: 'Patient data fetched successfully'
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