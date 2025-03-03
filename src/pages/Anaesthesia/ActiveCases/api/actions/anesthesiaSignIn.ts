import { postTimeline } from "@/pages/Anaesthesia/PacQueue/api/postTimeline";
import { Status } from "@/pages/Surgeon/AddPatient/types";
import { ActionGenerator } from "@/utils/ActionGenerator";

export const AnesthesiaSignIn = async (token: string | null, patientId: string, fetchScheduledPatients: () => void, by: string) => {
    if (!token || !patientId) {
        alert("Invalid token or patient Id");
        return;
    };

    try {

        const timelineResponseData = await postTimeline(token, {
            patientId: patientId,
            status: Status.Ongoing.AnesthesiaSignedIn,
            action: ActionGenerator(Status.Ongoing.AnesthesiaSignedIn),
            by: by,
            details: 'Anesthesia signed in',
        });

        if (timelineResponseData.success) {
            alert("Success with timeline");
            fetchScheduledPatients();
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