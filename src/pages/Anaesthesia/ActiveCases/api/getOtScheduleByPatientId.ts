import { backendUrl } from "@/constants";
import axios from "axios";

export const getOtScheduleByPatientId = async (token: string, patientId: string) => {
    try {

        const response = await axios.post(`${backendUrl}/otSchedules/otScheduleById`, {
            patientId: patientId
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