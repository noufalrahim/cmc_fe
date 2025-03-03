import { Status } from "@/pages/Surgeon/AddPatient/types";
import { z } from "zod";

export const pacPendingUpdateFormSchema = z.object({
    status: z.enum([Status.Pending.PacCleared, Status.Pending.PacFollowUp, Status.Pending.PacRejected]),
    // dateOfAdmission: z.date(),
    remarks: z.string().min(1, "Remarks are required")
});

export const otUpdateForm = z.object({
    otNumber: z.string().min(1, "OT Number is required"),
    // scheduledTime: z.date(),
    priority: z.string().min(1, "Priority is required"),
    remarks: z.string().min(1, "Remarks are required")
});