import { TheatreType } from "@/pages/Nurse/Theaters/types";

export enum Sex {
    Male = 'male',
    Female = 'female'
}

export const Status = {
    Pending: {
        PacPending: 'pac_pending',
        PacCleared: 'pac_cleared',
        PacFollowUp: 'pac_follow_up',
        PacRejected: 'pac_rejected',
    },
    Scheduled: {
        OtScheduled: 'ot_scheduled',
        AnesthesiaReady: 'anesthesia_ready',
        AnesthesiaNotReady: 'anesthesia_not_ready'
    },
    Ongoing: {
        AnesthesiaSignedIn: 'anesthesia_signed_in',
        SurgeonSignedIn: 'surgeon_signed_in',
        SurgeonSignedOut: 'surgeon_signed_out',
        AnesthesiaSignedOut: 'anesthesia_signed_out',
        RecoverySignOut: 'recovery_sign_out',
    },
    Completed: {
        ShiftedToWard: 'shifted_to_ward',
    },
    Other: {
        Unknown: 'unknown',
    }
} as const;

export type StatusValues =
    | typeof Status.Pending[keyof typeof Status.Pending]
    | typeof Status.Scheduled[keyof typeof Status.Scheduled]
    | typeof Status.Ongoing[keyof typeof Status.Ongoing]
    | typeof Status.Completed[keyof typeof Status.Completed]
    | typeof Status.Other[keyof typeof Status.Other];

export interface PacDetails {
    asaGrade: string;
    remarks: string;
}

export interface OtSchedule {
    // otNumber: string;
    // date: Date;
    // startTime: Date;
    priority: string;
    remarks: string;
    scheduledOn: string;
}

export interface TimelineEntry {
    id?: string;
    patientId?: string;
    action: string;
    status: StatusValues;
    by: UserType | string;
    timestamp?: Date;
    details: string;
}

export interface PatientType {
    id?: string;
    patientName: string;
    age: number;
    sex: Sex;
    ipNumber: string;
    dateOfAdmission: Date;
    departmentName: string;
    departmentId?: string;
    unit: string;
    preoperativeDiagnosis: string;
    procedurePlanned: string;
    surgeryDuration: number;
    comorbidities: string;
    remarks: string;
    submittedBy: string;
    submittedAt?: Date;
    pacDetails?: PacDetails | null;
    otSchedule?: OtSchedule | null;
    otDetails?: TheatreType | null;
    timelines?: TimelineEntry[] | null;
    latestTimeline: TimelineEntry;
}

export interface UserType {
    username: string;
    name: string;
    token: string;
    id: string;
    role?: "surgeon" | "anesthesia" | "nurse" | "admin";
    department?: {
        id: string;
        role?: "surgeon" | "anesthesia" | "nurse" | "admin";
        departmentName: string;
    };
}