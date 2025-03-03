import { postTimeline } from "@/pages/Anaesthesia/PacQueue/api/postTimeline";
import { Status } from "@/pages/Surgeon/AddPatient/types";
import { ActionGenerator } from "@/utils/ActionGenerator";

export const ShiftedToWard = async (token: string | null, patientId: string, fetchPatientsData: () => void, by: string) => {
    if (!token || !patientId) {
        alert("Invalid token or patient Id");
        return;
    };

    try {
        const timelineResponseData = await postTimeline(token, {
            patientId: patientId,
            action: ActionGenerator(Status.Completed.ShiftedToWard),
            status: Status.Completed.ShiftedToWard,
            by: by,
            details: 'Patient shifted to ward',
        });

        if (timelineResponseData.success) {
            alert("Success");
            fetchPatientsData();
        }
        else {
            alert("Not Success");
        }
    }
    catch (e) {
        console.log('An error occured', e);
        alert("An error occured");
    }
};