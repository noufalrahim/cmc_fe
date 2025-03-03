import { Status, StatusValues } from "@/pages/Surgeon/AddPatient/types";

interface ChecklistActions {
    anesthesiaSignInOnClick: () => void;
    anesthesiaSignOutOnClick: () => void;
    surgerySignInOnclick: () => void;
    surgerySignOutOnClick: () => void;
    recoverySignOutOnClick: () => void;
    shiftedToWardOnClick: () => void;
};

export const ChecklistItemGenerator = (
    status: StatusValues,
    actions: ChecklistActions,
    role: "surgeon" | "anesthesia" | "nurse"
) => {
    const checklist = [
        {
            id: "anesthesia_sign_in",
            label: "Anesthesia Sign In",
            isCompleted: [
                Status.Ongoing.AnesthesiaSignedIn,
                Status.Ongoing.SurgeonSignedIn,
                Status.Ongoing.SurgeonSignedOut,
                Status.Ongoing.AnesthesiaSignedOut,
                Status.Ongoing.RecoverySignOut,
                Status.Completed.ShiftedToWard,
            ].includes(status as "anesthesia_signed_in" | "surgeon_signed_in" | "surgeon_signed_out" | "anesthesia_signed_out" | "recovery_sign_out" | "shifted_to_ward"),
            onClick:
                status === Status.Scheduled.OtScheduled && role === "anesthesia"
                    ? actions.anesthesiaSignInOnClick
                    : () => { },
            showButton: status === Status.Scheduled.OtScheduled && role === "anesthesia",
        },
        {
            id: "surgeon_sign_in",
            label: "Surgeon Sign In",
            isCompleted: [
                Status.Ongoing.SurgeonSignedIn,
                Status.Ongoing.SurgeonSignedOut,
                Status.Ongoing.AnesthesiaSignedOut,
                Status.Ongoing.RecoverySignOut,
                Status.Completed.ShiftedToWard,
            ].includes(status as "surgeon_signed_in" | "surgeon_signed_out" | "anesthesia_signed_out" | "recovery_sign_out" | "shifted_to_ward"),
            onClick:
                status === Status.Ongoing.AnesthesiaSignedIn && role === "surgeon"
                    ? actions.surgerySignInOnclick
                    : () => { },
            showButton: status === Status.Ongoing.AnesthesiaSignedIn && role === "surgeon",
        },
        {
            id: "surgeon_sign_out",
            label: "Surgeon Sign Out",
            isCompleted: [
                Status.Ongoing.SurgeonSignedOut,
                Status.Ongoing.AnesthesiaSignedOut,
                Status.Ongoing.RecoverySignOut,
                Status.Completed.ShiftedToWard,
            ].includes(status as "surgeon_signed_out" | "anesthesia_signed_out" | "recovery_sign_out" | "shifted_to_ward"),
            onClick:
                status === Status.Ongoing.SurgeonSignedIn && role === "surgeon"
                    ? actions.surgerySignOutOnClick
                    : () => { },
            showButton: status === Status.Ongoing.SurgeonSignedIn && role === "surgeon",
        },
        {
            id: "anesthesia_sign_out",
            label: "Anesthesia Sign Out",
            isCompleted: [
                Status.Ongoing.AnesthesiaSignedOut,
                Status.Ongoing.RecoverySignOut,
                Status.Completed.ShiftedToWard,
            ].includes(status as "anesthesia_signed_out" | "recovery_sign_out" | "shifted_to_ward"),
            onClick:
                status === Status.Ongoing.SurgeonSignedOut && role === "anesthesia"
                    ? actions.anesthesiaSignOutOnClick
                    : () => { },
            showButton: status === Status.Ongoing.SurgeonSignedOut && role === "anesthesia",
        },
        {
            id: "recovery_sign_out",
            label: "Recovery Sign Out",
            isCompleted: [
                Status.Ongoing.RecoverySignOut,
                Status.Completed.ShiftedToWard,
            ].includes(status as "recovery_sign_out" | "shifted_to_ward"),
            onClick:
                status === Status.Ongoing.AnesthesiaSignedOut && role === "anesthesia"
                    ? actions.recoverySignOutOnClick
                    : () => { },
            showButton: status === Status.Ongoing.AnesthesiaSignedOut && role === "anesthesia",
        },
        {
            id: "shifted_to_ward",
            label: "Shifted to Ward",
            isCompleted: status === Status.Completed.ShiftedToWard as StatusValues,
            onClick:
                status === Status.Ongoing.RecoverySignOut && role === "nurse"
                    ? actions.shiftedToWardOnClick
                    : () => { },
            showButton: status === Status.Ongoing.RecoverySignOut && role === "nurse",
        },
    ];

    return checklist;
};
