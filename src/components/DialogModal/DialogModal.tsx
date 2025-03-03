import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from '../ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { PrimaryButton } from '../Button';

interface DialogModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string | undefined;
    children: React.ReactNode;
    onConfirm?: () => void;
    description?: string
};

export default function DialogModal({
    open,
    setOpen,
    title,
    onConfirm,
    children,
    description
}: DialogModalProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className='w-[90%] rounded-lg'>
                <DialogHeader className='flex items-start'>
                    <DialogTitle className='font-bold text-xl'>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
                {
                    onConfirm && <DialogFooter className="sm:justify-end gap-2 flex">
                        <PrimaryButton label='Confirm' onClick={onConfirm} />
                    </DialogFooter>
                }
            </DialogContent>
        </Dialog>
    )
}
