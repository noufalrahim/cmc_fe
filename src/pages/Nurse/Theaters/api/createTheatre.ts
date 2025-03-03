import { backendUrl } from "@/constants";
import axios from "axios";

export const postPatient = async ({
    theatreName,
    isAvailable
}: {
    theatreName: string,
    isAvailable: boolean,
}, token: string) => {
    try {
        const response = await axios.post(`${backendUrl}/theatres/theatre`, {
            theatreName: theatreName,
            isAvailable: isAvailable
        }, {
            headers: {
                'x-auth-token': token,
            }
        });

        const responseData = response.data;

        return {
            success: true,
            data: responseData,
            message: 'Theatre data entered successfully'
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