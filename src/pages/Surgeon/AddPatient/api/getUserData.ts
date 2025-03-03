import { backendUrl } from "@/constants";
import axios from "axios";

export const getUserData = async ({ username, token }: {
    username:string,
    token: string,
}) => {
    try {
        const response = await axios.post(`${backendUrl}/users/user`, {
            username: username
        }, {
            headers: {
                'x-auth-token': token,
            }
        });

        const responseData = response.data;

        return {
            success: true, 
            data: responseData,
            message: 'User data fetched successfully'
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
}