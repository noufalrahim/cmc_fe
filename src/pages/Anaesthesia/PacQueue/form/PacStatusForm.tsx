/* eslint-disable react-hooks/exhaustive-deps */
import { PrimaryButton } from '@/components/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { pacPendingUpdateFormSchema } from './schema'
import { PatientType, Status, TimelineEntry, UserType } from '@/pages/Surgeon/AddPatient/types'
import { ActionGenerator } from '@/utils/ActionGenerator'
import { getUserData } from '@/pages/Surgeon/AddPatient/api/getUserData'
import { postTimeline } from '../api/postTimeline'

export default function PacStatusForm({patientData, fetchPatients}: {patientData: PatientType | null | undefined, fetchPatients: () => void}) {

    const [loading, setLoading] = useState<boolean>(false);
    const [loggedInUser, setLoggedInUser] = useState<UserType>();

    const form = useForm<z.infer<typeof pacPendingUpdateFormSchema>>({
        resolver: zodResolver(pacPendingUpdateFormSchema),
        defaultValues: {
            status: Status.Pending.PacCleared,
            remarks: "",
        },
    });

    const token = localStorage.getItem('token');

    async function onSubmit(values: z.infer<typeof pacPendingUpdateFormSchema>) {
        if (!patientData || !token || !loggedInUser) {
            alert("An error occured - 7");
            return;
        }

        const timelineData: TimelineEntry = {
            action: ActionGenerator(values.status),
            status: values.status,
            patientId: patientData.id,
            details: values.remarks,
            by: loggedInUser.id,
        };

        console.log(timelineData);

        const respData = await postTimeline(token, timelineData);
        
        if(respData.success) {
            alert("Success");
            fetchPatients();
        }
        else{
            alert('An error occured - 9');
        }
       
    };


      const fetchData = async () => {
        setLoading(true);
        const username = localStorage.getItem('username');
    
        if (!token || !username) {
          return;
        }
    
        const respData = await getUserData({
          token,
          username
        });
    
        if (respData.success) {
          setLoggedInUser(respData.data);
        }
        else {
          alert("An error occured - 8");
        }
        setLoading(false);
      };
    
      React.useEffect(() => {
        fetchData();
      }, []);


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full flex flex-col">
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormLabel>Mark as (Status)</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className='border-primary-main text-primary-main border min-h-14'>
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value={Status.Pending.PacCleared}>Cleared</SelectItem>
                                    <SelectItem value={Status.Pending.PacFollowUp}>Follow Up Required</SelectItem>
                                    <SelectItem value={Status.Pending.PacRejected}>Not Fit</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="remarks"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    placeholder="Remarks"
                                    className="resize-none min-h-32  border border-primary-main"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <PrimaryButton label='Submit Assessment' className='w-full' loading={loading} />
            </form>
        </Form>
    )
}
