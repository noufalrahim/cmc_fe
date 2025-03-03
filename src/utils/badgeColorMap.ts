import { Status } from "@/pages/Surgeon/AddPatient/types";

export const statusMap: Record<
    | typeof Status.Pending[keyof typeof Status.Pending]
    | typeof Status.Scheduled[keyof typeof Status.Scheduled]
    | typeof Status.Ongoing[keyof typeof Status.Ongoing]
    | typeof Status.Completed[keyof typeof Status.Completed]
    | typeof Status.Other[keyof typeof Status.Other],
    { label: string; color: string, dotColor: string }
> = {
    // Pending
    [Status.Pending.PacPending]: { label: "PAC Pending", color: "bg-orange-500 hover:bg-orange-600", dotColor: 'bg-orange-500' },
    [Status.Pending.PacCleared]: { label: "PAC Cleared", color: "bg-green-500 hover:bg-green-600", dotColor: 'bg-orange-500' },
    [Status.Pending.PacFollowUp]: { label: "PAC Follow Up", color: "bg-purple-500 hover:bg-purple-600", dotColor: 'bg-orange-500' },
    [Status.Pending.PacRejected]: { label: "PAC Rejected", color: "bg-red-500 hover:bg-red-600", dotColor: 'bg-orange-500' },

    // Scheduled
    [Status.Scheduled.OtScheduled]: { label: "OT Scheduled", color: "bg-blue-500 hover:bg-blue-600", dotColor: 'bg-blue-500' },
    [Status.Scheduled.AnesthesiaReady]: { label: "Anesthesia Ready", color: "bg-teal-500 hover:bg-teal-600", dotColor: 'bg-blue-500' },
    [Status.Scheduled.AnesthesiaNotReady]: { label: "Anesthesia Not Ready", color: "bg-yellow-500 hover:bg-yellow-600", dotColor: 'bg-blue-500' },

    // Ongoing
    [Status.Ongoing.AnesthesiaSignedIn]: { label: "Anesthesia Signed In", color: "bg-indigo-500 hover:bg-indigo-600", dotColor: 'bg-indigo-500' },
    [Status.Ongoing.SurgeonSignedIn]: { label: "Surgeon Signed In", color: "bg-green-500 hover:bg-green-600", dotColor: 'bg-indigo-500' },
    [Status.Ongoing.SurgeonSignedOut]: { label: "Surgeon Signed Out", color: "bg-pink-500 hover:bg-pink-600", dotColor: 'bg-indigo-500' },
    [Status.Ongoing.AnesthesiaSignedOut]: { label: "Anesthesia Signed Out", color: "bg-purple-500 hover:bg-purple-600", dotColor: 'bg-indigo-500' },
    [Status.Ongoing.RecoverySignOut]: { label: "Recovery Signed Out", color: "bg-blue-500 hover:bg-blue-600", dotColor: 'bg-indigo-500' },

    // Completed
    [Status.Completed.ShiftedToWard]: { label: "Shifted to Ward", color: "bg-green-700 hover:bg-green-800", dotColor: 'bg-green-700' },

    // Other
    [Status.Other.Unknown]: { label: "Unknown", color: "bg-black hover:bg-gray-800", dotColor: "bg-black" },
};


export const otActiveMap = {
    scheduled: { label: "OT Scheduled", color: "bg-blue-500 hover:bg-blue-600", dotColor: 'bg-blue-500' },
    on_going: { label: "In Progress", color: "bg-amber-500 hover:bg-amber-600" },
    completed: { label: "Completed", color: "bg-green-500 hover:bg-green-600" },
    unknown: { label: 'Unknown', color: 'bg-red-500' },
};