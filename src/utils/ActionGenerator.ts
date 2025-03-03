import { Status } from "@/pages/Surgeon/AddPatient/types";

export const ActionGenerator = (status: string) => {
    if (status === Status.Pending.PacCleared) {
        return "PAC Cleared";
    }
    else if (status === Status.Pending.PacFollowUp) {
        return "PAC Follow Up Required"
    }
    else if (status === Status.Pending.PacRejected) {
        return "PAC Rejected";
    }
    else if (status === Status.Scheduled.OtScheduled) {
        return "OT Scheduled";
    }
    else if (status === Status.Ongoing.AnesthesiaSignedIn) {
        return "Anesthesia Signed In";
    }
    else if (status === Status.Ongoing.SurgeonSignedIn) {
        return "Surgeon Signed In";
    }
    else if (status === Status.Ongoing.SurgeonSignedOut) {
        return "Surgeon Signed Out";
    }
    else if(status === Status.Ongoing.AnesthesiaSignedOut) {
        return "Anesthesia Signed Out"
    }
    else if(status === Status.Ongoing.RecoverySignOut) {
        return "Recovery Signed Out";
    }
    else if(status === Status.Completed.ShiftedToWard) {
        return "Shifted To Ward";
    }
    else {
        return "Unknown";
    }
};