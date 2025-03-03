import { RecentCasesCard, StatusCard } from '@/components/Cards';
import { Header } from '@/components/Header';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PatientType } from '../AddPatient/types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPatients } from '../AddPatient/api/postPatient';


export default function CaseListPage() {
  const [patientsData, setPatientsData] = useState<PatientType[]>([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');


  const fetchPatientsData = async () => {

    if (!token) {
      return;
    }

    const respData = await getPatients(token);

    if (respData.success) {
      setPatientsData(respData.data);
    }
    else {
      alert("An error occured - 4");
    }
  };

  React.useEffect(() => {
    fetchPatientsData();
  }, []);

  return (
    <div className='flex flex-grow flex-col w-full py-5 gap-5'>
      <div className='flex flex-row gap-5 w-full'>
        <StatusCard />
        <StatusCard />
      </div>
      <div className='flex flex-col gap-3'>
        <Header title='Cases'>
          <Select>
            <SelectTrigger className="w-[150px] border-primary-main text-primary-main border">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
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
}

