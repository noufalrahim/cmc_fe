import { postTimeline } from "@/pages/Anaesthesia/PacQueue/api/postTimeline";
import { Status } from "@/pages/Surgeon/AddPatient/types";
import { ActionGenerator } from "@/utils/ActionGenerator";

export const SurgerySignIn = async (token: string | null, patientId: string, fetchPatientsData: () => void, by: string) => {
    if (!token || !patientId) {
        alert("Invalid token or patient Id");
        return;
    };

    try {

        const timelineResponseData = await postTimeline(token, {
            patientId: patientId,
            action: ActionGenerator(Status.Ongoing.SurgeonSignedIn),
            status: Status.Ongoing.SurgeonSignedIn,
            by: by,
            details: 'Surgeon signed in',
        });

        if (timelineResponseData.success) {
            fetchPatientsData();
            alert("Success");
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