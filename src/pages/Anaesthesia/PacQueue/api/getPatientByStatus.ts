import { backendUrl } from "@/constants";
import { StatusValues } from "@/pages/Surgeon/AddPatient/types";
import axios from "axios";

export const getPatientByStatus = async (token: string, status: StatusValues | 'all', searchQuery: string = '') => {
    try {

        const response = await axios.get(`${backendUrl}/patients/status?statusQuery=${status != 'all' ? status : ''}&searchQuery=${searchQuery}`, {
            headers: {
                'x-auth-token': token,
            }
        }); 

        console.log("data", response.data)

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