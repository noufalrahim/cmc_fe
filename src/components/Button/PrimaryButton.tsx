import { Button } from '../ui/button'
import { cn } from '@/utils/cn'
import { Spinner } from '../ui/spinner';

interface PrimaryButtonProps {
    label: string,
    className?: string,
    onClick?: () => void;
    loading?: boolean;
    startIcon?: React.ReactNode;
}

export default function PrimaryButton({
    label,
    className,
    onClick,
    loading,
    startIcon
}: PrimaryButtonProps) {
    return (
        <Button variant={'default'} className={cn('w-full bg-primary-main hover:bg-primary-main/80', className)} onClick={onClick}>
            {
                loading ? (
                    <div className='items-center flex flex-row gap-2'>
                        <Spinner size="sm" className="bg-white" />
                        <p>Loading</p>
                    </div>
                ) : (
                    <div className='flex items-center justify-center flex-row gap-2'>
                        {startIcon && startIcon}
                        {label}
                    </div>
                )
            }
        </Button>
    )
}
