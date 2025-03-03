import { backendUrl } from "@/constants";
import { StatusValues } from "@/pages/Surgeon/AddPatient/types";
import axios from "axios";

export const getPatientsByDeptAndStatus = async (token: string, status: StatusValues, deptId: string) => {
    try {
        const response = await axios.post(`${backendUrl}/patients/department/status?statusQuery=${status}`, 
        {
            deptId: deptId,
        },    
        {
            headers: {
                'x-auth-token': token,
            }
        });

        console.log("Res", response);

        const responseData = response.data;

        console.log(responseData);

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