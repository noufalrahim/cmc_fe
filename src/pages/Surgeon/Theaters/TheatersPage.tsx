/* eslint-disable react-hooks/exhaustive-deps */
import { OtCard } from '@/components/Cards'
import { Header } from '@/components/Header'
import React, { useState } from 'react'
import { getTheatres } from './api/getTheatre';

export default function TheatersPage() {

  const [theatresData, setTheatresData] = useState<{
    theatreName: string,
    isAvailable: boolean
  }[]>([]);

  const token = localStorage.getItem('token');

  const fetchData = async () => {
    if (!token) {
      return;
    }

    const respData = await getTheatres(token);

    if (respData.success) {
      setTheatresData(respData.data);
    }
    else {
      alert("An error occured - 4");
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='flex flex-grow flex-col w-full py-5 gap-5'>
      <Header title='Operation Theaters' />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {
          theatresData.map((theatre, index) => (
            <OtCard key={index} theatreName={theatre.theatreName} isAvailable={theatre.isAvailable} />
          ))
        }
      </div>
    </div>
  )
}
