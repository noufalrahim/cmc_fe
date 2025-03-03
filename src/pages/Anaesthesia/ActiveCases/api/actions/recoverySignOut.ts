import { postTimeline } from "@/pages/Anaesthesia/PacQueue/api/postTimeline";
import { Status } from "@/pages/Surgeon/AddPatient/types";
import { ActionGenerator } from "@/utils/ActionGenerator";

export const RecoverySignOut = async (token: string | null, patientId: string, fetchPatientsData: () => void, by:string) => {
    if (!token || !patientId) {
        alert("Invalid token or patient Id");
        return;
    };

    try {

        const timelineResponseData = await postTimeline(token, {
            patientId: patientId,
            action: ActionGenerator(Status.Ongoing.RecoverySignOut),
            status:Status.Ongoing.RecoverySignOut,
            by: by,
            details: 'Recovery signed out',
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