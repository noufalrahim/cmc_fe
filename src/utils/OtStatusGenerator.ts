import { StatusValues, Status } from "@/pages/Surgeon/AddPatient/types";

export const OtStatusGenerator = (status: StatusValues): "scheduled" | "on_going" | "completed" | "unknown" => {
    if (Object.values(Status.Scheduled).includes(status as "ot_scheduled" | "anesthesia_ready" | "anesthesia_not_ready")) return "scheduled";
    if (Object.values(Status.Ongoing).includes(status as "anesthesia_signed_in" | "surgeon_signed_in" | "surgeon_signed_out" | "anesthesia_signed_out" | "recovery_sign_out")) return "on_going";
    if (Object.values(Status.Completed).includes(status as "shifted_to_ward")) return "completed";
    return "unknown"; 
};
