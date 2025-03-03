/* eslint-disable react-hooks/exhaustive-deps */
import { PrimaryButton } from '@/components/Button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { otUpdateForm } from './schema'
import { PatientType, Status, TimelineEntry, UserType } from '@/pages/Surgeon/AddPatient/types'
import { ActionGenerator } from '@/utils/ActionGenerator'
import { getUserData } from '@/pages/Surgeon/AddPatient/api/getUserData'
import { postTimeline } from '../api/postTimeline'
import { getTheatres } from '@/pages/Surgeon/Theaters/api/getTheatre'
import { postOtSchedule } from '../api/postOtSchedule'
import { TheatreType } from '@/pages/Nurse/Theaters/types'

export default function OtScheduleForm({ patientData, fetchPatients }: { patientData: PatientType | null | undefined, fetchPatients: () => void }) {

    const [loading, setLoading] = useState<boolean>(false);
    const [loggedInUser, setLoggedInUser] = useState<UserType>();
    const [theatres, setTheatres] = useState<TheatreType[]>([]);

    const form = useForm<z.infer<typeof otUpdateForm>>({
        resolver: zodResolver(otUpdateForm),
        defaultValues: {
            remarks: "",
        },
    });

    const token = localStorage.getItem('token');

    async function onSubmit(values: z.infer<typeof otUpdateForm>) {
        if (!patientData || !token || !loggedInUser) {
            alert("An error occured - 7");
            return;
        }

        const timelineData: TimelineEntry = {
            action: ActionGenerator(Status.Scheduled.OtScheduled),
            patientId: patientData.id,
            status: Status.Scheduled.OtScheduled,
            details: values.remarks,
            by: loggedInUser.id,
        };

        const otScheduleData = {
            patientId: patientData.id!,
            otId: values.otNumber,
            priority: values.priority,
            remarks: values.remarks,
            // scheduledOn: new Date(),
        };

        const otScheduleRespData = await postOtSchedule(token, otScheduleData);

        if (otScheduleRespData.success) {
            const respData = await postTimeline(token, timelineData);
            if (respData) {
                alert("Success");
                fetchPatients();
            }
            else {
                alert('An error occured - 9');
            }
        }
        else {
            alert('An error occured - 8');
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

        const theatresResp = await getTheatres(token);
        console.log(theatresResp);

        if (!respData.success || !theatresResp.success) {
            alert("An error occured - 8");
        }
        else {
            setLoggedInUser(respData.data);
            setTheatres(theatresResp.data);
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
                    name="otNumber"
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className='border-primary-main text-primary-main border min-h-14'>
                                        <SelectValue placeholder="Operation Theatre" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        theatres && theatres?.length > 0 && theatres.map((theatre, index) => (
                                            <SelectItem key={index} value={theatre.id!}>{theatre.theatreName}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className='border-primary-main text-primary-main border min-h-14'>
                                        <SelectValue placeholder="Priority" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value={'normal'}>Normal</SelectItem>
                                    <SelectItem value={'urgent'}>Urgent</SelectItem>
                                    <SelectItem value={'emergency'}>Emergency</SelectItem>
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
                <PrimaryButton label='Submit' className='w-full' loading={loading} />
            </form>
        </Form>
    )
}
