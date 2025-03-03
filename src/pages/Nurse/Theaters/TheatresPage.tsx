import { OtToggleCard } from '@/components/Cards'
import { Header } from '@/components/Header'
import { useEffect, useState, useCallback } from 'react'
import { getTheatres } from './api/getTheatre';
import { DialogModal } from '@/components/DialogModal';
import { TheatreType } from './types';
import { editTheatre } from './api/editTheatre';
import InputComponent from '@/components/Inputs/Input';

export default function TheatresPage() {
  const [theatresData, setTheatresData] = useState<TheatreType[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [eventAndData, setEventAndData] = useState<{ event: boolean; data: Partial<TheatreType> } | null>(null);
  const token = localStorage.getItem('token');

  const fetchData = useCallback(async () => {
    if (!token) return;

    try {
      const respData = await getTheatres(token);
      if (respData.success) {
        setTheatresData(respData.data);
      } else {
        alert("An error occurred while fetching data.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An unexpected error occurred.");
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = async (event: boolean, theatreData: Partial<TheatreType>) => {
    let newEventAndData = { event, data: theatreData };
    if(!event) {
      newEventAndData = {event, data: {
        ...theatreData,
        scrubNurse: null
      }}
      setEventAndData(newEventAndData);
      await handleOnConfirm(newEventAndData);
    }
    else {
      setEventAndData(newEventAndData);
      setOpen(true);

    }
  };

  const handleOnConfirm = async (data = eventAndData) => {
    if (!token || !data) {
      alert("No token or invalid data.");
      return;
    }
    
    setOpen(false);

    try {
      const respData = await editTheatre(token, data.data, data.event);
      if (respData.success) {
        fetchData();
      } else {
        alert("An error occurred while updating.");
      }
    } catch (error) {
      console.error("Edit error:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div className='flex flex-grow flex-col w-full py-5 gap-5'>
      <Header title='Operation Theaters' />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {theatresData.map((theatre) => (
          <OtToggleCard handleChange={handleChange} theatreData={theatre} key={theatre.id} />
        ))}
      </div>
      <DialogModal 
        open={open} 
        setOpen={setOpen} 
        title='Add SCRUB NURSE' 
        description='Enter the name of SCRUB NURSE' 
        onConfirm={() => handleOnConfirm()}
      >
        <InputComponent 
          placeholder="SCRUB NURSE" 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            setEventAndData(prev => prev ? { ...prev, data: { ...prev.data, scrubNurse: e.target.value } } : prev)
          } 
        />
      </DialogModal>
    </div>
  );
}
