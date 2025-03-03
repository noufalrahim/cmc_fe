import { Fan } from "lucide-react";
import { Badge } from '../ui/badge';
import { cn } from '@/utils/cn';

export default function OtCard({
  theatreName,
  isAvailable,
}: {
  isAvailable: boolean,
  theatreName: string
}) {
  return (
    <div className='border-light-100 border-2 flex flex-row items-center justify-between p-5 rounded-xl bg-white cursor-pointer'>
      <div className='flex flex-row gap-3 items-center justify-center'>
        <Fan size={24} />
        <p className='font-semibold text-xl'>{theatreName}</p>
      </div>
      <Badge className={cn('',
        isAvailable ? 'bg-green-600 hover:bg-green-600/90' : 'bg-red-600 hover:bg-red-600/90'
      )}>{
        isAvailable ? 'Available' : 'Not Available'
      }</Badge>
    </div>
  )
}
