/* eslint-disable react-hooks/exhaustive-deps */

import { SecondaryButton } from '@/components/Button';
import { ActiveCaseCard, RecentCasesCard } from '@/components/Cards';
import { Header } from '@/components/Header';
import { BellIcon, FilterIcon } from 'lucide-react';
import React, { useState } from 'react';
import { PatientType, Status, StatusValues, UserType } from '../AddPatient/types';
import { getPatients } from '../AddPatient/api/postPatient';
import { useNavigate } from 'react-router-dom';
import { formatPatientData } from '@/utils/FormatPatientData';
import { PatientDetailsType } from '@/pages/Anaesthesia/Home/HomePage';
import { getPatientsByDeptAndStatus } from './api/getPatientsByDeptAndStatus';
import { getUserData } from '../AddPatient/api/getUserData';

export default function HomePage() {

  const [patientsData, setPatientsData] = useState<PatientType[]>([]);
  const [signedInPatientsData, setSignedInPatientsData] = useState<PatientType[]>([]);

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');


  const fetchPatientsData = async () => {
    if (!token) return;

    try {
      const statusesList: StatusValues[] = [
        Status.Ongoing.AnesthesiaSignedIn,
        Status.Ongoing.SurgeonSignedIn,
      ];

      if (!username || !token) {
        return;
      }

      const userQueryResponse = await getUserData({ username, token });

      if (userQueryResponse.success) {
        const respData = await getPatients(token);
        const userData: UserType = userQueryResponse.data;
        const responses = await Promise.all(
          statusesList.map((status) => getPatientsByDeptAndStatus(token, status, userData.department!.id))
        );

        console.log(responses);

        if (!respData.success || !responses) {
          alert("An error occured - 10");
        }
        else {
          const formattedData = await Promise.all(
            responses
              .filter((resp) => resp.success && resp.data.length > 0)
              .map((resp) => formatPatientData(resp.data, token))
          );
          setPatientsData(respData.data);
          setSignedInPatientsData(formattedData.flat().filter((patient): patient is PatientDetailsType => patient !== undefined) as PatientDetailsType[]);
        }
      }


    } catch (error) {
      console.error("Error fetching scheduled patients:", error);
      alert("An error occurred while fetching scheduled patients.");
    }
  };

  React.useEffect(() => {
    fetchPatientsData();
  }, []);

  console.log(patientsData)


  return (
    <div className="flex-grow flex flex-col gap-5">
      <div className="flex flex-col w-full gap-3">
        <Header title="Active Case">
          <BellIcon />
        </Header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {
            signedInPatientsData.map((patient, index) => (
              <ActiveCaseCard
                key={index}
                patientName={patient.patientName}
                procedurePlanned={patient.procedurePlanned}
                patientId={patient.id!}
                fetchPatientsData={fetchPatientsData}
                status={patient.latestTimeline!.status}
              />
            ))
          }
        </div>
      </div>

      <div className="flex flex-col w-full gap-2">
        <Header title="Recent Cases">
          <SecondaryButton label="Filter" startIcon={<FilterIcon />} />
        </Header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {
            patientsData.map((patient, index) => (
              <RecentCasesCard
                key={index}
                patientName={patient.patientName}
                preoperativeDiagnosis={patient.preoperativeDiagnosis}
                unitId={patient.unit}
                submittedAt={patient.submittedAt!}
                status={patient.latestTimeline!.status}
                onClick={() => navigate(`/cases/${patient.id}`)}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
};


