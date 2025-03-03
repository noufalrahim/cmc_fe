/* eslint-disable react-hooks/exhaustive-deps */
import PacCard from '@/components/Cards/PacCard'
import { Header } from '@/components/Header'
import { PatientType, Status, StatusValues } from '@/pages/Surgeon/AddPatient/types';
import React, { useState } from 'react';
import { getPatientByStatus } from './api/getPatientByStatus';
import { DialogModal } from '@/components/DialogModal';
import PacStatusForm from './form/PacStatusForm';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import OtScheduleForm from './form/OtScheduleForm';

export default function PacQueuePage() {
    const [patientsData, setPatientsData] = useState<PatientType[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [selectedPatient, setSelectedPatient] = useState<PatientType | null>();
    const [selectedStatus, setSelectedStatus] = useState<StatusValues>(Status.Pending.PacPending);
    const [titleAndDescription, setTitleAndDescription] = useState<{
        title: string,
        description: string,
    }>()

    const token = localStorage.getItem('token');


    const fetchPacPatientsData = async () => {
        if (!token) {
            return;
        }
        const respData = await getPatientByStatus(token, selectedStatus);

        if (respData.success) {
            setPatientsData(respData.data);
        }
        else {
            alert("An error occured - 4");
        }
    };

    const handleOpen = (patient: PatientType) => {
        setSelectedPatient(patient);
        setOpen(true);
    };

    React.useEffect(() => {
        if (selectedStatus === Status.Pending.PacPending) {
            setTitleAndDescription({
                title: 'PAC Assessment',
                description: `Patient: ${selectedPatient?.patientName}`
            });
        } else if (selectedStatus === Status.Pending.PacCleared) {
            setTitleAndDescription({
                title: 'Schedule OTs',
                description: `Patient: ${selectedPatient?.patientName}`
            });
        }
        fetchPacPatientsData();
    }, [selectedStatus, selectedPatient]);

    const renderComponent = (selectedStatus: StatusValues) => {
        switch (selectedStatus) {
            case Status.Pending.PacPending:
                return <PacStatusForm patientData={selectedPatient} fetchPatients={fetchPacPatientsData} />;
            case Status.Pending.PacFollowUp:
                return <h1>Pacfollowup</h1>;
            case Status.Pending.PacCleared:
                return <OtScheduleForm patientData={selectedPatient} fetchPatients={fetchPacPatientsData} />
            default:
                break;
        }
    };

    console.log(patientsData);

    return (
        <div className="flex-grow flex flex-col gap-3">
            <Header title="Cases">
                <Select onValueChange={(value) => setSelectedStatus(value as StatusValues)} value={selectedStatus}>
                    <SelectTrigger className="w-[250px] border-primary-main text-primary-main border">
                        <SelectValue placeholder="PAC Pending" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={Status.Pending.PacPending}>PAC Pending</SelectItem>
                        <SelectItem value={Status.Pending.PacFollowUp}>PAC Follow Up</SelectItem>
                        <SelectItem value={Status.Pending.PacCleared}>PAC Cleared</SelectItem>
                        <SelectItem value={Status.Pending.PacRejected}>PAC Rejected</SelectItem>
                    </SelectContent>
                </Select>
            </Header>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {
                    patientsData.map((patient, index) => (
                        <PacCard
                            key={index}
                            patientName={patient.patientName}
                            sex={patient.sex === 'male' ? 'M' : 'F'}
                            age={patient.age}
                            ipNumber={patient.ipNumber}
                            procedurePlanned={patient.procedurePlanned}
                            status={patient.latestTimeline!.status}
                            onClick={() => handleOpen(patient)}
                        />
                    ))
                }
            </div>
            <DialogModal open={open} setOpen={setOpen} title={titleAndDescription?.title} description={titleAndDescription?.description}>
                {renderComponent(selectedStatus)}
            </DialogModal>
        </div>
    )
}
