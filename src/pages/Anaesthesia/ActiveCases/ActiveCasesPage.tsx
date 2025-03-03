/* eslint-disable react-hooks/exhaustive-deps */
import { ActivePatienetOtCard } from '@/components/Cards'
import { Header } from '@/components/Header'
import { Status, StatusValues, UserType } from '@/pages/Surgeon/AddPatient/types';
import React, { useState } from 'react';
import { getPatientFullDetailsByStatus } from './api/getPatientFullDetailsByStatus';
import { formatPatientData } from '@/utils/FormatPatientData';
import { formatDateTime } from '@/utils/FormatDateTime';
import { getUserData } from '@/pages/Surgeon/AddPatient/api/getUserData';
import { OtStatusGenerator } from '@/utils/OtStatusGenerator';
import { PatientDetailsType } from '../Home/HomePage';

export default function ActiveCasesPage() {
    const [scheduledPatients, setScheduledPatients] = useState<PatientDetailsType[]>([]);
    const [loggedInUser, setLoggedInUser] = useState<UserType>();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    const fetchScheduledPatients = async () => {
        if (!token) return;

        try {
            const statusesList: StatusValues[] = [
                Status.Scheduled.OtScheduled,
                Status.Ongoing.AnesthesiaSignedIn,
                Status.Ongoing.AnesthesiaSignedOut,
                Status.Ongoing.SurgeonSignedOut,
                Status.Ongoing.SurgeonSignedIn,
                Status.Ongoing.RecoverySignOut,
                Status.Completed.ShiftedToWard,
            ];

            const responses = await Promise.all(
                statusesList.map((status) => getPatientFullDetailsByStatus(token, status))
            );

            const formattedData = await Promise.all(
                responses
                    .filter((resp) => resp.success && resp.data.length > 0)
                    .map((resp) => formatPatientData(resp.data, token))
            );
            setScheduledPatients(formattedData.flat().filter((patient): patient is PatientDetailsType => patient !== undefined) as PatientDetailsType[]);
        } catch (error) {
            console.error("Error fetching scheduled patients:", error);
            alert("An error occurred while fetching scheduled patients.");
        }
    };

    const fetchUserData = async () => {
        if (!token || !username) {
            alert("An error occured - 9");
            return;
        }
        const userRespData = await getUserData({ username, token });
        if (userRespData.success) {
            setLoggedInUser(userRespData.data);
        }
        else {
            alert("An error occured - 9");
            return;
        }
    };

    React.useEffect(() => {
        fetchScheduledPatients();
        fetchUserData();
    }, []);

    console.log(scheduledPatients);

    return (
        <div className="flex-grow flex flex-col gap-3">
            <Header title="Active Cases" />
            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4'>
                {
                    scheduledPatients.map((data, index) => (
                        <ActivePatienetOtCard
                            key={index}
                            id={data.id!}
                            otName={data.otDetails.theatreName}
                            patientName={data.patientName}
                            procedurePlanned={data.procedurePlanned}
                            startedTime={formatDateTime(data.otSchedule!.scheduledOn)}
                            status={data.latestTimeline!.status}
                            otStatus={OtStatusGenerator(data.latestTimeline!.status)}
                            onClick={() => { }}
                            role={loggedInUser?.role as "anesthesia" | "surgeon" | "nurse"}
                            token={token}
                            fetchScheduledPatients={fetchScheduledPatients}
                        />
                    ))
                }
            </div>
        </div>
    )
}
