import { DotIcon } from 'lucide-react'
import { Badge } from '../ui/badge'
import { statusMap } from '@/utils/badgeColorMap';
import { PrimaryButton } from '../Button';
import { StatusValues } from '@/pages/Surgeon/AddPatient/types';
import { StatusDotIndicator } from '../StatusDotIndicator';

interface PacCardProps {
    patientName: string,
    sex: string,
    age: number,
    ipNumber: string,
    procedurePlanned: string,
    status: StatusValues,
    onClick: () => void,
    showButton?: boolean
};

export default function PacCard(
    {
        patientName,
        sex,
        age,
        ipNumber,
        procedurePlanned,
        status,
        onClick,
        showButton = true,
    }: PacCardProps
) {

    return (
        <div className='bg-white w-full flex flex-col p-5 rounded-lg gap-5 border-light-100 border-2 relative cursor-pointer' onClick={onClick}>
            <div className="absolute top-1 right-1">
                <StatusDotIndicator color={statusMap[status]?.dotColor} />
            </div>
            <div className='flex flex-row justify-between items-start'>
                <div className='flex items-start flex-col'>
                    <p className='font-semibold'>{patientName}</p>
                    <div className='items-center flex justify-center'>
                        <p className='text-primary-main'>
                            {age}/{sex}
                        </p>
                        <DotIcon />
                        <p className='text-primary-main'>
                            {ipNumber}
                        </p>
                    </div>
                </div>
                <Badge className={`${statusMap[status]?.color} py-[3px]`}>
                    {statusMap[status]?.label ?? "Unknown"}
                </Badge>
            </div>
            <p className='text-light-200'>{procedurePlanned}</p>
            {
                showButton && <PrimaryButton label='Start PAC Assessment' onClick={onClick} />
            }
        </div>
    )
};
