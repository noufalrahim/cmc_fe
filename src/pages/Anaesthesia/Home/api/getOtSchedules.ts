import { backendUrl } from "@/constants";
import axios from "axios";

export const getOtSchedules = async (token: string) => {
    try {

        const response = await axios.get(`${backendUrl}/otSchedules`,{
            headers: {
                'x-auth-token': token,
            }
        });

        const responseData = response.data;

        return {
            success: true,
            data: responseData,
            message: 'OT Schedules data fetched successfully'
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