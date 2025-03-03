import { backendUrl } from "@/constants";
import axios from "axios";
import { TheatreType } from "../types";

export const editTheatre = async (token: string, theatreData: Partial<TheatreType>, event: boolean) => {
    console.log(theatreData);
    try {
        const response = await axios.put(`${backendUrl}/theatres/theatre`, {
            id: theatreData.id,
            isAvailable: event,
            scrubNurse: theatreData.scrubNurse,
        }, {
            headers: {
                'x-auth-token': token,
            }
        });

        const responseData = response.data;

        return {
            success: true,
            data: responseData,
            message: 'Theatre Edited Successfully'
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
