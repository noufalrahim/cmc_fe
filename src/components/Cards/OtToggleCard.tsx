import { Fan } from "lucide-react";
import { Badge } from '../ui/badge';
import { cn } from '@/utils/cn';
import { Switch } from "@/components/ui/switch"
import { TheatreType } from "@/pages/Nurse/Theaters/types";

export default function OtToggleCard({
    theatreData,
    handleChange,
}: {
    theatreData: TheatreType
    handleChange: (event: boolean, theatreData: Partial<TheatreType>) => void;
}) {

    return (
        <div className='border-light-100 border-2 flex flex-row items-start justify-between p-5 rounded-xl bg-white cursor-pointer'>
            <div className="flex flex-col gap-5 items-start justify-center">
                <div className="flex gap-4 flex-col">
                    <div className='flex flex-row gap-3 items-center justify-center'>
                        <Fan size={24} />
                        <p className='font-semibold text-xl'>{theatreData.theatreName}</p>
                    </div>
                    <Badge className={cn('',
                        theatreData.isAvailable ? 'bg-green-600 hover:bg-green-600/90' : 'bg-red-600 hover:bg-red-600/90'
                    )}>{
                            theatreData.isAvailable ? 'Available' : 'Not Available'
                        }
                    </Badge>
                </div>
                <p className="text-light-200">{theatreData.scrubNurse ? 'Scrub Nurse: ' + theatreData.scrubNurse : 'No Scrub Nurse'}</p>
            </div>
            <div className="flex items-center space-x-2">
                <Switch
                    checked={theatreData.isAvailable}
                    className="data-[state=checked]:bg-primary-main data-[state=unchecked]:bg-gray-500"
                    onCheckedChange={(event) => handleChange(event, theatreData)}
                />
            </div>
        </div>
    )
}
