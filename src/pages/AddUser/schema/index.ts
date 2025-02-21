import { z } from "zod";

export const formSchema = z.object({
    patientName: z.string().min(1, "Patient Name is required"),
    age: z.number().int().positive(),
    sex: z.enum(["male", "female"]),
    ipNumber: z.string().min(1, "IP Number is required"),
    dateOfAdmission: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
    departmentName: z.string().min(1, "Department Name is required"),
    unit: z.string().min(1, "Unit name is required"),
    preoperativeDiagnosis: z.string().min(1, "Preoperative Diagnosis is required"),
    procedurePlanned: z.string().min(1, "Procedure Planned is required"),
    surgeryDuration: z.number().positive().max(24, "Surgery duration must be within 24 hours"),
    comorbidities: z.string().min(1, "Comorbidities are required"),
    remarks: z.string().min(1, "Remarks are required")
});
