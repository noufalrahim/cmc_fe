import { Clock } from 'lucide-react'
import { PrimaryButton, SecondaryButton } from '../Button'
import React, { useState } from 'react';
import { SurgerySignIn } from '@/pages/Anaesthesia/ActiveCases/api/actions/surgerySignIn';
import { Status, StatusValues, UserType } from '@/pages/Surgeon/AddPatient/types';
import { Badge } from '../ui/badge';
import { statusMap } from '@/utils/badgeColorMap';
import { SurgerySignOut } from '@/pages/Anaesthesia/ActiveCases/api/actions/surgerySignOut';
import { getUserData } from '@/pages/Surgeon/AddPatient/api/getUserData';

interface ActiveCaseCardProps {
  patientName: string;
  procedurePlanned: string;
  patientId: string;
  fetchPatientsData: () => void;
  status: StatusValues;
};

export default function ActiveCaseCard({
  patientName,
  procedurePlanned,
  patientId,
  fetchPatientsData,
  status
}: ActiveCaseCardProps) {

  const [loading, setLoading] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useState<UserType>();
  
  const token = localStorage.getItem('token');

    const fetchData = async () => {
      setLoading(true);
      const username = localStorage.getItem('username');
      if (!token || !username) {
        return;
      }
      const respData = await getUserData({
        token,
        username
      });
      if (!respData.success) {
        alert("An error occured - 8");
      }
      else {
        setLoggedInUser(respData.data);
      }
      setLoading(false);
    };


  const handleClick = async () => {
    setLoading(true);
    if (status === Status.Ongoing.AnesthesiaSignedIn) {
      if (loggedInUser?.id) {
        await SurgerySignIn(token, patientId, fetchPatientsData, loggedInUser?.id);
      }
      else{
        alert('failed logging - 12');
        return;
      }
    }
    else {
      if (loggedInUser?.id) {
        await SurgerySignOut(token, patientId, fetchPatientsData, loggedInUser?.id);
      }
      else{
        alert('failed logging - 13');
        return;
      }
    }
    setLoading(false);
  };

    
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='bg-white w-full flex flex-col p-5 rounded-lg gap-5 border-light-100 border-2 cursor-pointer'>
      <div className='flex flex-row justify-between items-start'>
        <div className='gap-2 flex flex-col'>
          <div>
            <p>{patientName}</p>
            <p className='text-primary-main'>{procedurePlanned}</p>
          </div>
          <div className='flex flex-row items-center gap-1'>
            <Clock size={15} />
            <p className='text-primary-main'>11:00 AM</p>
          </div>
        </div>
        <div>
          <Badge className={`${statusMap[status]?.color} py-[3px]`}>
            {statusMap[status]?.label ?? "Unknown"}
          </Badge>
        </div>
      </div>
      <div className='flex flex-row w-full gap-5'>
        <SecondaryButton label={status === Status.Ongoing.AnesthesiaSignedIn ? 'Sign In Surgery' : 'Sign Out Surgery'} loading={loading} onClick={handleClick} />
        <PrimaryButton label='Open Case' />
      </div>
    </div>
  )
}
