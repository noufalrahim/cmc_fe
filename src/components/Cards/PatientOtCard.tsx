import { DotIcon } from 'lucide-react'
import { Badge } from '../ui/badge'
import { otActiveMap } from '@/utils/badgeColorMap';

interface PatientOtCardProps {
    otName: string,
    patientName: string,
    procedurePlanned: string,
    startedTime: string,
    otActive: 'scheduled' | 'on_going' | 'completed' | 'unknown';
    onClick: () => void,
};

export default function PatientOtCard(
    {
        otName,
        patientName,
        procedurePlanned,
        otActive,
        onClick,
        startedTime
    }: PatientOtCardProps
) {

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
                <Badge className={`${otActiveMap[otActive]?.color} py-[3px]`}>
                    {otActiveMap[otActive]?.label ?? "Unknown"}
                </Badge>
            </div>
            <p className='text-light-200'>Started: {startedTime}</p>
        </div>
    )
};
