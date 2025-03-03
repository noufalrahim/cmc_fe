import { PatientInfoCard, TimelineCard } from '@/components/Cards'
import CaseInfoCard from '@/components/Cards/CaseInfoCard'
import { ChevronLeft, Edit } from 'lucide-react'
import React, { useState } from 'react'
import { PatientType } from '../AddPatient/types';
import { getPatientById } from './api/getPatientById';
import { useNavigate, useParams } from 'react-router-dom';
import { getUnitById } from '../Home/api/getUnitById';
import { Loader } from '@/components/Loader';
import { PrimaryButton } from '@/components/Button';

interface PatientTypeWithDepartment extends PatientType {
  department: {
    departmentName: string;
  }
}

export default function AboutCases() {

  const [patientData, setPatientData] = useState<PatientTypeWithDepartment>();
  const [unitData, setUnitData] = useState<{
    unitName: string;
    id: string;
  }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const { id } = useParams();
  const token = localStorage.getItem('token');


  const fetchPatientData = async () => {
    setIsLoading(true);
    if (!id || !token) {
      return;
    }
    const respData = await getPatientById({ token, id });

    if (respData.success) {
      setPatientData(respData.data);
      console.log(respData.data);
      const unitRespData = await getUnitById({ token, id: respData.data.unit });
      if (unitRespData.success) {
        setUnitData(unitRespData.data);
      }
      else {
        alert("An error occured - 6");
        return;
      }
    }
    else {
      alert("An error occured - 5");
      return;
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchPatientData();
  }, []);

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <div className="flex-grow flex flex-col gap-5 my-5">
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-start w-full gap-2 my-3'>
          <ChevronLeft size={24} onClick={() => {
            navigate('/');
          }} />
          <p className='text-xl'>Case Details</p>
        </div>
        <PrimaryButton label='Edit' startIcon={<Edit />} className='w-24' />
      </div>
      <PatientInfoCard
        ipNumber={patientData?.ipNumber}
        patientName={patientData?.patientName}
        age={patientData?.age}
        sex={patientData?.sex}
        status={patientData?.timelines![patientData?.timelines!.length - 1].status}
      />
      <CaseInfoCard
        data={{
          department: patientData?.department?.departmentName ?? '',
          unit: unitData?.unitName ?? '',
          diagnosis: patientData?.procedurePlanned ?? '',
          procedure: patientData?.procedurePlanned ?? '',
          surgeryDuration: patientData?.surgeryDuration ?? 0,
          comorbidities: patientData?.comorbidities ?? '',
        }}
      />
      {
        patientData?.timelines && patientData.timelines.length > 0 && <TimelineCard timelines={patientData?.timelines} />
      }
    </div>
  )
}
