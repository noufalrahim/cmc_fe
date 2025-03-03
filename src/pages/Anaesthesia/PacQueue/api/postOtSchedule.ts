import { backendUrl } from "@/constants";
import axios from "axios";
import { OtScheduleType } from "../types";

export const postOtSchedule = async (token: string, otSchedule: OtScheduleType) => {
    try {
        const response = await axios.post(`${backendUrl}/otSchedules/otSchedule`, otSchedule, {
            headers: {
                'x-auth-token': token,
            }
        });

        const responseData = response.data;

        return {
            success: true,
            data: responseData,
            message: 'OT Schedule posted successfully'
        };
    }
    catch (e) {
        return {
            success: false,
            data: null,
            message: `An error occured while posting OT Schedule ${e}`
        };
    }
};