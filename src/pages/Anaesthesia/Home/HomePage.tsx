/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { PatientOtCard, StatusCard } from '@/components/Cards';
import { Header } from '@/components/Header';
import { BellIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { PatientType, Status, StatusValues } from '@/pages/Surgeon/AddPatient/types';
import { getPatientFullDetailsByStatus } from '../ActiveCases/api/getPatientFullDetailsByStatus';
import { formatPatientData } from '@/utils/FormatPatientData';
import { formatDateTime } from '@/utils/FormatDateTime';
import { OtStatusGenerator } from '@/utils/OtStatusGenerator';

export interface PatientDetailsType extends PatientType {
  timelines: any;
  otSchedule: any;
  otDetails: {
    isAvailable: boolean;
    theatreName: string;
  };
}

export default function HomePage() {
  const [scheduledPatients, setScheduledPatients] = useState<PatientDetailsType[]>([]);
  const token = localStorage.getItem('token');

  const fetchScheduledPatients = async () => {
    if (!token) return;

    try {
      const statusesList: StatusValues[] = [
        Status.Scheduled.OtScheduled,
        Status.Ongoing.AnesthesiaSignedIn,
        Status.Ongoing.AnesthesiaSignedOut,
        Status.Ongoing.SurgeonSignedIn,
      ];

      const responses = await Promise.all(
        statusesList.map((status) => getPatientFullDetailsByStatus(token, status))
      );

      const formattedData = await Promise.all(
        responses
          .filter((resp) => resp.success && resp.data.length > 0)
          .map((resp) => formatPatientData(resp.data, token))
      );

      console.log(formattedData);
      setScheduledPatients(formattedData.flat().filter((patient): patient is PatientDetailsType => patient !== undefined) as PatientDetailsType[]);
    } catch (error) {
      console.error("Error fetching scheduled patients:", error);
      alert("An error occurred while fetching scheduled patients.");
    }
  };

  useEffect(() => {
    fetchScheduledPatients();
  }, []);

  return (
    <div className="flex-grow flex flex-col gap-5">
      <div className="flex flex-col w-full gap-3">
        <Header title="Dashboard">
          <BellIcon />
        </Header>
        <div className="flex flex-row gap-2">
          <StatusCard />
          <StatusCard />
          <StatusCard />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Header title="Active OTs" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {scheduledPatients.map((details, index) => (
            <PatientOtCard
              key={index}
              otName={details.otDetails?.theatreName || "N/A"}
              patientName={details.patientName}
              procedurePlanned={details.procedurePlanned}
              startedTime={details.otSchedule?.scheduledOn ? formatDateTime(details.otSchedule.scheduledOn) : "N/A"}
              otActive={OtStatusGenerator(details.latestTimeline.status)}
              onClick={() => { }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
