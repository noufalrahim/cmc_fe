import { DotIcon } from 'lucide-react';
import { Badge } from '../ui/badge';
import React, { useState } from 'react';
import { getUnitById } from '@/pages/Surgeon/Home/api/getUnitById';
import { statusMap } from '@/utils/badgeColorMap';
import { StatusValues } from '@/pages/Surgeon/AddPatient/types';
import { StatusDotIndicator } from '../StatusDotIndicator';

interface CasesType {
    patientName: string;
    unitId: string;
    submittedAt: Date;
    status: StatusValues;
    preoperativeDiagnosis: string;
    onClick: () => void;
};

export default function RecentCasesCard({
    patientName,
    preoperativeDiagnosis,
    unitId,
    submittedAt,
    status,
    onClick,
}: CasesType) {
    
    const [unitData, setUnitData] = useState<{ unitName: string; id: string }>();

    const token = localStorage.getItem('token');

    const fetchUnitData = async () => {
        if (!token) return;
        const respData = await getUnitById({ token, id: unitId });
        if (respData.success) {
            setUnitData(respData.data);
        } else {
            alert("An error occurred - 5");
        }
    };

    React.useEffect(() => {
        fetchUnitData();
    }, []);

    return (
        <div 
            className='bg-white w-full flex flex-col p-5 rounded-lg gap-5 border-light-100 border-2 relative cursor-pointer'
            onClick={onClick}
        >
            {/* Status Indicator in Top Right */}
            <div className="absolute top-1 right-1">
                <StatusDotIndicator color={statusMap[status]?.dotColor}/>
            </div>

            <div className='flex flex-row justify-between items-start'>
                <div>
                    <p className='font-semibold'>{patientName}</p>
                    <div className='items-center flex justify-start'>
                        <p className='text-primary-main'>{preoperativeDiagnosis}</p>
                        <DotIcon />
                        <p className='text-primary-main'>{unitData?.unitName}</p>
                    </div>
                </div>
                <Badge className={`${statusMap[status]?.color} py-[3px]`}>
                    {statusMap[status]?.label ?? "Unknown"}
                </Badge>
            </div>
            <p className='text-light-200'>Submitted: {new Date(submittedAt).toDateString()}</p>
        </div>
    );
}
