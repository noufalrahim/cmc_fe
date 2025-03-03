/* eslint-disable react-hooks/exhaustive-deps */
import { Header } from '@/components/Header';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { formSchema } from './schema';
import { Button } from '@/components/ui/button';
import InputComponent from '@/components/Inputs/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/utils/cn';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { PrimaryButton } from '@/components/Button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { getUserData } from './api/getUserData';
import React from 'react';
import { getUnits } from './api/getUnits';
import { PatientType, Sex, Status, UserType } from './types';
import { postPatient } from './api/postPatient';

export default function AddUserPage() {

  const [userData, setUserData] = useState<UserType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [unitsData, setUnitsData] = useState<{
    unitName: string,
    id: string
  }[]>([]);

  const token = localStorage.getItem('token');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departmentName: userData?.department?.departmentName,
    },
  });

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

    const unitsResp = await getUnits({
      token,
    });

    if (respData.success && unitsResp.success) {
      setUserData(respData.data);
      setUnitsData(unitsResp.data);
    }
    else {
      alert("An error occured");
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    if (userData) {
      form.reset({ departmentName: userData.department?.departmentName });
    }
  }, [userData, form]);



  async function onSubmit(values: z.infer<typeof formSchema>) {

    if (userData === undefined || !token) {
      alert("An error occured - 2");
      return;
    }

    const patientData: PatientType = {
      ...values,
      sex: values.sex === 'male' ? Sex.Male : Sex.Female,
      submittedBy: userData.username,
      // submittedAt: new Date(),
      dateOfAdmission: new Date(values.dateOfAdmission),
      departmentId: userData.department?.id,
      // pacDetails: null,
      // otSchedule: null,
      timelines: [
        {
          action: "Case Submitted",
          status: Status.Pending.PacPending,
          by: userData.id,
          details: "New case submitted for PAC clearance"
        }
      ],
    };

    const patientRespData = await postPatient(patientData, token);

    if (patientRespData.success) {
      alert('Patient entered successfully');
    }
    else {
      alert('An error occured - 3');
    }

  };

  return (
    <div className='flex flex-grow flex-col w-full py-5 gap-5 md:p-5 lg:p-5 xl:p-5 2xl:p-5 justify-center items-start'>
      <Header
        title='Schedule New Case'
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full flex justify-center flex-col items-center">
          <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-4 w-full'>
            <div className='flex flex-col gap-3 w-full md:py-10 lg:py-10 xl:py-10 2xl:py-10'>
              <FormField
                control={form.control}
                name="patientName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputComponent placeholder="Patient Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex flex-row gap-5'>
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem className='w-1/2'>
                      <FormControl>
                        <InputComponent placeholder="Age" {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sex"
                  render={({ field }) => (
                    <FormItem className='w-1/2'>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className='border-primary-main text-primary-main border min-h-14'>
                            <SelectValue placeholder="Sex" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="ipNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputComponent placeholder="IP Number*" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfAdmission"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal w-full border-primary-main border min-h-14 bg-secondary-main",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Date of Admission</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex flex-col gap-3 w-full'>
              <p className=''>Department</p>
              <FormField
                control={form.control}
                name="departmentName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputComponent placeholder="Department Name" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className='border-primary-main text-primary-main border min-h-14'>
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {unitsData?.map((unit) => (
                          <SelectItem key={unit.id} value={unit.id}>
                            {unit.unitName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preoperativeDiagnosis"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputComponent placeholder="Preoperative Diagnosis*" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="procedurePlanned"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputComponent placeholder="Procedure Planned*" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="surgeryDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputComponent placeholder="Approx. Surgery Duration (hours)*" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comorbidities"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Comorbidities"
                        className="resize-none min-h-32 border border-primary-main"
                        {...field}
                      />
                    </FormControl>
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
            </div>
          </div>
          <PrimaryButton label='Submit Case' className='md:w-1/3 lg:w-1/3 xl:w-1/3 2xl:w-1/3' loading={loading} />
        </form>
      </Form>
    </div>
  )
}
