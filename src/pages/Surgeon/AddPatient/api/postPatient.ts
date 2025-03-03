import axios from "axios";
import { PatientType } from "../types";
import { backendUrl } from "@/constants";

export const postPatient = async (data: PatientType, token: string) => {
    try {
        const response = await axios.post(`${backendUrl}/patients/patient`, data, {
            headers: {
                'x-auth-token': token,
            } 
        });

        const responseData = response.data;

        return {
            success: true, 
            data: responseData,
            message: 'Patients data entered successfully'
        };
    }
    catch (e) {
        console.log("An error occured", e);
        return {
            success: false,
            data: null,
            message: "An error occured."
        };
    }
};

export const getPatients = async (token: string) => {
    try {
        const response = await axios.get(`${backendUrl}/patients`, {
            headers: {
                'x-auth-token': token,
            } 
        });

        const responseData = response.data;

        return {
            success: true, 
            data: responseData,
            message: 'Patients data fetched successfully'
        };

    }
    catch (e) {
        console.log("An error occured", e);
        return {
            success: false,
            data: null,
            message: "An error occured."
        };
    }
};