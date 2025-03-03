import { z } from "zod";

export const formSchema = z.object({
    patientName: z.string().min(1, "Patient Name is required"),
    age: z.preprocess((val) => Number(val), z.number().min(0, "Invalid age")),
    sex: z.enum(["male", "female"]),
    ipNumber: z.string().min(1, "IP Number is required"),
    dateOfAdmission: z.date(),
    departmentName: z.string().min(1, "Department Name is required"),
    unit: z.string().min(1, "Unit name is required"),
    preoperativeDiagnosis: z.string().min(1, "Preoperative Diagnosis is required"),
    procedurePlanned: z.string().min(1, "Procedure Planned is required"),
    surgeryDuration:z.preprocess((val) => Number(val), z.number().min(0, "Invalid surgery duration")),
    comorbidities: z.string().min(1, "Comorbidities are required"),
    remarks: z.string().min(1, "Remarks are required")
});
