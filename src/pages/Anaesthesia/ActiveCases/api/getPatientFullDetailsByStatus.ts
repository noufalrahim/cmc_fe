import { backendUrl } from "@/constants";
import { StatusValues } from "@/pages/Surgeon/AddPatient/types";
import axios from "axios";

export const getPatientFullDetailsByStatus = async (token: string, status: StatusValues) => {
    try {

        const response = await axios.get(`${backendUrl}/patients/status?statusQuery=${status}`, {
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