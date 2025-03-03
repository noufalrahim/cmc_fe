import { Button } from '../ui/button'
import { cn } from '@/utils/cn'
import { Spinner } from '../ui/spinner';

interface SecondaryButtonProps {
    label: string,
    className?: string,
    onClick?: () => void;
    loading?: boolean;
    startIcon?: React.ReactNode;
}

export default function SecondaryButton({
    label,
    className,
    onClick,
    loading,
    startIcon
}: SecondaryButtonProps) {
    return (
        <Button variant={'outline'} className={cn('w-full text-primary-main border-primary-main hover:bg-primary-main/10 hover:text-primary-main', className)} onClick={onClick}>
            {
                loading ? (
                    <div className='items-center flex flex-row gap-2'>
                        <Spinner size="sm" className="bg-primary-main" />
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
