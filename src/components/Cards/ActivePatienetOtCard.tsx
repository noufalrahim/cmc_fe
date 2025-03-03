import { DotIcon } from 'lucide-react'
import { Badge } from '../ui/badge'
import { otActiveMap } from '@/utils/badgeColorMap';
import { Checklist } from '../Checklist';
import { StatusValues, UserType } from '@/pages/Surgeon/AddPatient/types';
import { AnesthesiaSignIn } from '@/pages/Anaesthesia/ActiveCases/api/actions/anesthesiaSignIn';
import { AnesthesiaSignOut } from '@/pages/Anaesthesia/ActiveCases/api/actions/anesthesiaSignOut';
import React, { useState } from 'react';
import { RecoverySignOut } from '@/pages/Anaesthesia/ActiveCases/api/actions/recoverySignOut';
import { ShiftedToWard } from '@/pages/Anaesthesia/ActiveCases/api/actions/shiftedToWard';
import { getUserData } from '@/pages/Surgeon/AddPatient/api/getUserData';

interface ActivePatienetOtCardProps {
  id: string,
  otName: string,
  patientName: string,
  procedurePlanned: string,
  startedTime: string,
  otStatus: 'scheduled' | 'on_going' | 'completed' | 'unknown';
  onClick: () => void,
  role: "anesthesia" | "surgeon" | "nurse"
  status: StatusValues,
  token: string | null,
  fetchScheduledPatients: () => void,
};

export default function ActivePatienetOtCard(
  {
    id,
    otName,
    patientName,
    procedurePlanned,
    status,
    otStatus,
    onClick,
    startedTime,
    role,
    token,
    fetchScheduledPatients,
  }: ActivePatienetOtCardProps
) {

  const [loading, setLoading] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useState<UserType>();

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

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleAnesthesiaSignIn = async () => {
    setLoading(true);
    if (loggedInUser?.id) {
      await AnesthesiaSignIn(token, id, fetchScheduledPatients, loggedInUser.id);
    } else {
      alert("Logged in user data is missing.");
    }
    setLoading(false);
  };

  const handleAnesthesiaSignOut = async () => {
    setLoading(true);
    if (loggedInUser?.id) {
      await AnesthesiaSignOut(token, id, fetchScheduledPatients, loggedInUser.id);
    } else {
      alert("Logged in user data is missing.");
    }
    setLoading(false);
  };

  const handleRecoverySignOut = async () => {
    setLoading(true);
    if (loggedInUser?.id) {
      await RecoverySignOut(token, id, fetchScheduledPatients, loggedInUser?.id);
    }
    else {
      alert("Logged in user data is missing.");
    }
    setLoading(false);
  };

  const handleShiftedToWard = async () => {
    setLoading(true);
    if(loggedInUser?.id){
      await ShiftedToWard(token, id, fetchScheduledPatients, loggedInUser?.id);
    }
    else{
      alert("Logged in user data is missing.");
    }
    setLoading(false);
  };

  const actions = {
    anesthesiaSignInOnClick: handleAnesthesiaSignIn,
    anesthesiaSignOutOnClick: handleAnesthesiaSignOut,
    surgerySignInOnclick: () => { },
    surgerySignOutOnClick: () => { },
    recoverySignOutOnClick: handleRecoverySignOut,
    shiftedToWardOnClick: handleShiftedToWard,
  };



  return (
    <div className='bg-white w-full flex flex-col p-5 rounded-lg gap-5 border-light-100 border-2 cursor-pointer' onClick={onClick}>
      <div className='flex flex-row justify-between items-start'>
        <div>
          <p className='font-semibold'>{otName}</p>
          <div className='items-center flex justify-center'>
            <p className='text-primary-main'>
              {patientName}
            </p>
            <DotIcon />
            <p className='text-primary-main'>
              {procedurePlanned}
            </p>
          </div>
        </div>
        <Badge className={`${otActiveMap[otStatus]?.color} py-[3px]`}>
          {otActiveMap[otStatus]?.label ?? "Unknown"}
        </Badge>
      </div>
      <div className='flex w-full items-center justify-center flex-row'>
        <div className='w-1/2 flex flex-col items-left'>
          <p className='text-light-200 text-md'>Scheduled On</p>
          <p className='text-lg'>{startedTime}</p>
        </div>
        <div className='w-1/2 flex flex-col items-left'>
          <p className='text-light-200 text-md'>Team</p>
          <p className='text-lg'>Dr. Smith</p>
        </div>
      </div>
      <Checklist status={status} role={role as "anesthesia" | "surgeon"} actions={actions} loading={loading} />
    </div>
  )
};
