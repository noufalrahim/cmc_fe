import React from 'react';

interface CaseInfoCardProps {
    data: {
        department: string;
        unit: string;
        diagnosis: string;
        procedure: string;
        surgeryDuration: number;
        comorbidities: string;
    },
};

export default function CaseInfoCard({
    data,
}:CaseInfoCardProps) {

    const headerMap = [
        {
            item: 'department',
            label: 'Department',
        },
        {
            item: 'unit',
            label: 'Unit',
        },
        {
            item: 'diagnosis',
            label: 'Diagnosis',
        },
        {
            item: 'procedure',
            label: 'Procedure',
        },
        {
            item: 'surgeryDuration',
            label: 'Estimated Duration',
        },
        {
            item: 'comorbidities',
            label: 'Comorbidities',
        },
    ];

    return (
        <div className='bg-white w-full flex flex-col p-5 rounded-lg gap-3 border-light-100 border-2'>
            {
                headerMap.map((header, index) => (
                    <div key={index} className=''>
                        <p className='text-md'>{header.label}</p>
                        <p className='text-primary-main text-lg'>{data[header.item as keyof typeof data]}</p>
                    </div>
                ))
            }
        </div>
    )
}
