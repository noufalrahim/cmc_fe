import { getOtScheduleByPatientId } from "@/pages/Anaesthesia/ActiveCases/api/getOtScheduleByPatientId";
import { getTheatreById } from "@/pages/Anaesthesia/ActiveCases/api/getTheatreById";
import { getTimelineByPatientId } from "@/pages/Anaesthesia/ActiveCases/api/getTimelineByPatientId";
import { PatientType } from "@/pages/Surgeon/AddPatient/types";

export const formatPatientData = async (patientData: PatientType[], token: string) => {
    console.log("Data: ", patientData);
    const patientDetailsData = [];
    for(let i = 0; i<patientData.length; i++){
        const currentPatient = patientData[i];
        if(!currentPatient || !currentPatient.id){
            return;
        }

        const timelines = await getTimelineByPatientId(token, currentPatient.id);
        const otSchedule = await getOtScheduleByPatientId(token, currentPatient.id);
        const otDetails = await getTheatreById(token, otSchedule.data.otId);

        if(!timelines.success || !otSchedule.success || !otDetails.success){
            return;
        }

        patientDetailsData.push({
            ...currentPatient,
            timelines: timelines.data,
            otSchedule: otSchedule.data,
            otDetails: otDetails.data,
        });
    };

    return patientDetailsData;
};