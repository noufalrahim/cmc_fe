import React from 'react'
import { Header } from '../Header'
import { Timeline } from '../Timeline'
import { TimelineEntry } from '@/pages/Surgeon/AddPatient/types'

export default function TimelineCard({timelines}: {
  timelines: TimelineEntry[]
}) {

  return (
    <div className='flex flex-col gap-3'>
        <Header title='Timeline'/>
        <Timeline timelines={timelines}/>
    </div>
  )
}
