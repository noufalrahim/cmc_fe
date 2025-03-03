import { backendUrl } from "@/constants";
import { TimelineEntry } from "@/pages/Surgeon/AddPatient/types";
import axios from "axios";

export const postTimeline = async (token: string, timeline: TimelineEntry) => {
    try {
        const response = await axios.post(`${backendUrl}/timelines/timeline`, timeline, {
            headers: {
                'x-auth-token': token,
            }
        });

        const responseData = response.data;

        return {
            success: true,
            data: responseData,
            message: 'Timeline posted successfully'
        };
    }
    catch (e) {
        console.log(e);
        return {
            success: false,
            data: null,
            message: "An error occured while posting timeline"
        };
    }
};