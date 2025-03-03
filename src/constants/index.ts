/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
export const backendUrl = import.meta.env.VITE_BACKEND_API;
import { Status, StatusValues } from "@/pages/Surgeon/AddPatient/types";
import { FanIcon, History, Home, HomeIcon, ListCheck, UserPlus } from "lucide-react";

export type NavItemsType = {
    title: string,
    url: string,
    icon: React.ElementType,
};

export type BottomNavItemsType = {
    id: string,
    icon: React.ElementType,
    url: string,
    label: string
};

export enum Url {
    surgeonHome = '/',
    surgeonAddUser = '/add-user',
    surgeonCaselist = '/caselist',
    surgeonAllCases = '/all-case',
    surgeonTheatre = '/theatre',
    anesthesiaHome = '/',
    anesthesiaPacQueue = '/pac-queue',
    anesthesiaActiveCases = '/active-cases',
    anesthesiaAllCases = '/all-case',
    anesthesiaTheatre = '/theatre',
    nurseHome = '/',
    nurseTheatre = '/theatre',
    nurseActiveCases = '/active-cases',
    nurseAllCases = '/all-case',
    nursesAboutCase = '/cases/:id',
}

export const surgeonNavItems: NavItemsType[] = [
    {
        title: "Home",
        url: Url.surgeonHome,
        icon: Home,
    },
    {
        title: "Add User",
        url: Url.surgeonAddUser,
        icon: UserPlus,
    },
    {
        title: "Case List",
        url: Url.surgeonCaselist,
        icon: ListCheck,
    },
    {
        title: 'All Cases',
        url: Url.nurseAllCases,
        icon: ListCheck,
    },
    {
        title: "Theatre",
        url: Url.surgeonTheatre,
        icon: FanIcon,
    }
];

export const anesthesiaNavItems: NavItemsType[] = [
    {
        title: "Home",
        url: Url.anesthesiaHome,
        icon: Home,
    },
    {
        title: "PAC Queue",
        url: Url.anesthesiaPacQueue,
        icon: History,
    },
    {
        title: "Active Cases",
        url: Url.anesthesiaActiveCases,
        icon: ListCheck,
    },
    {
        title: 'All Cases',
        url: Url.nurseAllCases,
        icon: ListCheck,
    },
    {
        title: "Theatre",
        url: Url.anesthesiaTheatre,
        icon: FanIcon,
    }
];

export const nurseNavItems: NavItemsType[] = [
    {
        title: 'Home',
        url: Url.nurseHome,
        icon: Home,
    },
    {
        title: "Active Cases",
        url: Url.nurseActiveCases,
        icon: ListCheck,
    },
    {
        title: 'All Cases',
        url: Url.nurseAllCases,
        icon: ListCheck,
    },
    {
        title: 'Theatre',
        url: Url.nurseTheatre,
        icon: FanIcon
    }
];

export const surgeonBottomNavItems: BottomNavItemsType[] = [
    {
        id: 'home',
        icon: HomeIcon,
        label: 'Home',
        url: Url.surgeonHome
    },
    {
        id: 'addUser',
        icon: UserPlus,
        label: 'Add User',
        url: Url.surgeonAddUser
    },
    {
        id: 'caselist',
        icon: ListCheck,
        label: 'Case List',
        url: Url.surgeonCaselist
    },
    {
        id: 'all_case',
        label: 'All Cases',
        url: Url.nurseAllCases,
        icon: ListCheck,
    },
    {
        id: 'theater',
        icon: FanIcon,
        label: 'Theatre',
        url: Url.surgeonTheatre,
    }
];

export const anesthesiaBottomNavItems: BottomNavItemsType[] = [
    {
        id: 'home',
        label: "Home",
        url: Url.anesthesiaHome,
        icon: Home,
    },
    {
        id: 'pac_queue',
        label: "PAC Queue",
        url: Url.anesthesiaPacQueue,
        icon: History,
    },
    {
        id: 'active_cases',
        label: "Active Cases",
        url: Url.anesthesiaActiveCases,
        icon: ListCheck,
    },
    {
        id: 'all_case',
        label: 'All Cases',
        url: Url.nurseAllCases,
        icon: ListCheck,
    },
    {
        id: 'theatre',
        label: "Theatre",
        url: Url.anesthesiaTheatre,
        icon: FanIcon,
    }
];

export const nurseBottomNavItems: BottomNavItemsType[] = [
    {
        id: 'home',
        label: 'Home',
        url: Url.nurseHome,
        icon: Home
    },
    {
        id: 'active_cases',
        label: "Active Cases",
        url: Url.nurseActiveCases,
        icon: ListCheck,
    },
    {
        id: 'all_case',
        label: 'All Cases',
        url: Url.nurseAllCases,
        icon: ListCheck,
    },
    {
        id: 'theatre',
        label: 'Theatre',
        url: Url.nurseTheatre,
        icon: FanIcon
    }
];

export const filterItems: {
    id: StatusValues | 'all',
    value: StatusValues | 'all',
    label: string,
}[] = [
    {
        id: 'all',
        value: 'all',
        label: 'All',
    },
    {
        id: Status.Pending.PacPending,
        value: Status.Pending.PacPending,
        label: 'PAC Pending',
    },
    {
        id: Status.Pending.PacFollowUp,
        value: Status.Pending.PacFollowUp,
        label: 'PAC Follow Up'
    },
    {
        id: Status.Pending.PacCleared,
        value: Status.Pending.PacCleared,
        label: 'PAC Cleared',
    },
    {
        id: Status.Pending.PacRejected,
        value: Status.Pending.PacRejected,
        label: 'PAC Rejected',
    },
    {
        id: Status.Scheduled.OtScheduled,
        value: Status.Scheduled.OtScheduled,
        label: 'OT Scheduled',
    },
    {
        id: Status.Ongoing.AnesthesiaSignedIn,
        value: Status.Ongoing.AnesthesiaSignedIn,
        label: 'Anesthesia Signed In',
    },
    {
        id: Status.Ongoing.SurgeonSignedIn,
        value: Status.Ongoing.SurgeonSignedIn,
        label: 'Surgeon Signed In',
    },
    {
        id: Status.Ongoing.SurgeonSignedOut,
        value: Status.Ongoing.SurgeonSignedOut,
        label: 'Surgeon Signed Out',
    },
    {
        id: Status.Ongoing.AnesthesiaSignedOut,
        value: Status.Ongoing.AnesthesiaSignedOut,
        label: 'Anesthesia Signed Out',
    },
    {
        id: Status.Ongoing.RecoverySignOut,
        value: Status.Ongoing.RecoverySignOut,
        label: 'Recovery Signed Out',
    },
    {
        id: Status.Completed.ShiftedToWard,
        value: Status.Completed.ShiftedToWard,
        label: 'Shifted To Ward',
    },
    
];