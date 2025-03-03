/* eslint-disable react-hooks/exhaustive-deps */
import PacCard from "@/components/Cards/PacCard";
import { Header } from "@/components/Header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { filterItems } from "@/constants";
import { getPatientByStatus } from "@/pages/Anaesthesia/PacQueue/api/getPatientByStatus";
import { getOtTheatres } from "@/pages/Anaesthesia/PacQueue/api/getTheatres";
import { PatientType, Status, StatusValues } from "@/pages/Surgeon/AddPatient/types";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { TheatreType } from "../Theaters/types";

export default function AllCases() {
    const [patientsData, setPatientsData] = useState<PatientType[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<StatusValues | 'all'>('all');
    const [otData, setOtData] = useState<TheatreType[]>([]);
    const [selectedOT, setSelectedOT] = useState<string>('all');
    const [timePeriod, setTimePeriod] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const otCases: StatusValues[] = [
        Status.Scheduled.OtScheduled,
        Status.Ongoing.AnesthesiaSignedIn,
        Status.Ongoing.AnesthesiaSignedOut,
        Status.Ongoing.SurgeonSignedIn,
        Status.Ongoing.SurgeonSignedOut,
        Status.Ongoing.RecoverySignOut,
        Status.Completed.ShiftedToWard,
    ];

    const fetchPatientsData = useCallback(async () => {
        if (!token) return;
        const respData = await getPatientByStatus(token, selectedStatus, searchQuery);
        if (respData.success) {
            setPatientsData(respData.data);
        } else {
            console.error("Failed to fetch patient data");
        }
    }, [token, selectedStatus, searchQuery]);

    const fetchOTData = useCallback(async () => {
        if (!token) return;
        const respData = await getOtTheatres(token);
        if (respData.success) {
            setOtData([{ id: 'all', theatreName: 'All', isAvailable: true }, ...respData.data]);
        } else {
            console.error("Failed to fetch OT data");
        }
    }, [token]);

    useEffect(() => {
        fetchPatientsData();
    }, [fetchPatientsData]);

    useEffect(() => {
        if (selectedStatus !== 'all' && otCases.includes(selectedStatus)) {
            fetchOTData();
        } 
        else {
            if(!otCases.includes(selectedStatus as StatusValues)){
                setSelectedOT('all');
            }
            setOtData([]);
        }
    }, [selectedStatus, fetchOTData]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchPatientsData();
        }, 300);
        return () => clearTimeout(delayDebounce);
    }, [searchQuery, fetchPatientsData]);

    const filteredPatients = selectedOT === 'all'
        ? patientsData
        : patientsData.filter((item) => item.otDetails?.id === selectedOT);

    return (
        <div className="flex-grow flex flex-col gap-3">
            <Header title="Cases" search={{
                value: searchQuery,
                setValue: setSearchQuery,
            }}>
                <div className="flex flex-row gap-2">
                    {selectedStatus === Status.Completed.ShiftedToWard && (
                        <Select onValueChange={setTimePeriod} value={timePeriod}>
                            <SelectTrigger className="w-[250px] border-primary-main text-primary-main border">
                                <SelectValue placeholder="All Cases" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="24hrs">Last 24 hrs</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                    {otData.length > 0 && (
                        <Select onValueChange={setSelectedOT} value={selectedOT}>
                            <SelectTrigger className="w-[250px] border-primary-main text-primary-main border">
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                {otData.map((item) => (
                                    <SelectItem key={item.id} value={item.id!}>
                                        {item.theatreName}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                    <Select onValueChange={(value) => setSelectedStatus(value as StatusValues)} value={selectedStatus}>
                        <SelectTrigger className="w-[250px] border-primary-main text-primary-main border">
                            <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                            {filterItems.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </Header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredPatients.map((patient) => (
                    <PacCard
                        key={patient.id}
                        patientName={patient.patientName}
                        sex={patient.sex === 'male' ? 'M' : 'F'}
                        age={patient.age}
                        ipNumber={patient.ipNumber}
                        procedurePlanned={patient.procedurePlanned}
                        status={patient.latestTimeline.status}
                        onClick={() => navigate(`/cases/${patient.id}`)}
                        showButton={false}
                    />
                ))}
            </div>
        </div>
    );
}
