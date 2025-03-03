
import { backendUrl } from '@/constants';
import axios from 'axios';

type LoginType = {
    username: string,
    password: string,
    role: string
};

export type ResponseBodyType = {
    username: string;
    token: string;
    name: string;
    departmentName: string
}

export type ResponseType = {
    success: boolean,
    data: ResponseBodyType,
    message: string,
};

export const login = async ({ username, password, role }: LoginType) => {
    try {
        const response = await axios.post(`${backendUrl}/auth/login`, {
            username,
            password,
            role
        });

        const data = response.data;
        return {
            success: true,
            data: data,
            message: 'Successfully Logged In'
        };
    }
    catch (e) {
        return {
            success: false,
            data: null,
            message: 'An error occured while logging in. Please try again later'
        };
    }
};