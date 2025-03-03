import { backendUrl } from "@/constants";
import { PatientType } from "@/pages/Surgeon/AddPatient/types";
import axios from "axios";

export const editPatient = async (token: string, editedPatient: Partial<PatientType>) => {
    try {
        
        const response = await axios.put(`${backendUrl}/patients/patient`, editedPatient,{
            headers: {
                'x-auth-token': token,
            }
        })

        const responseData = response.data;

        return {
            success: true, 
            data: responseData,
            message: ''
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