import { statusMap } from '@/utils/badgeColorMap';
import { Badge } from '../ui/badge';
import { StatusValues } from '@/pages/Surgeon/AddPatient/types';

interface PatientInfoCardProps {
    ipNumber?: string;
    patientName?: string;
    age?: number;
    sex?: 'male' | 'female';
    status?: StatusValues,
};

export default function PatientInfoCard(
    {
        ipNumber,
        patientName,
        age,
        sex,
        status
    }: PatientInfoCardProps
) {
    return (
        <div className='bg-white w-full flex flex-col p-5 rounded-lg gap-5 border-light-100 border-2 cursor-pointer'>
            <div className='flex flex-col justify-center items-start'>
                <div className='flex items-center justify-between w-full'>
                    <p className='font-semibold text-primary-main text-md'>
                        {ipNumber}
                    </p>
                    <Badge className={`${statusMap[status ?? 'unknown']?.color} py-[3px]`}>
                        {statusMap[status ?? 'unknown']?.label ?? "Unknown"}
                    </Badge>
                </div>
                <p className='text-2xl font-semibold'>
                    {patientName}
                </p>
            </div>
            <div className='w-full flex justify-center items-center'>
                <div className='w-1/2 justify-start'>
                    <p>Age</p>
                    <p className='text-primary-main text-xl'>
                        {age}
                    </p>
                </div>
                <div className='w-1/2 justify-start'>
                    <p>Sex</p>
                    <p className='text-primary-main text-xl'>
                        {sex === 'male' ? 'Male' : 'Female'}
                    </p>
                </div>
            </div>
        </div>
    )
}
