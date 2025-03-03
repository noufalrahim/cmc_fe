import React from 'react'
import { Spinner } from '../ui/spinner'

export default function Loader() {
    return (
        <div className='items-center justify-center flex w-full'>
            <Spinner size="lg" className="bg-primary-main" />
        </div>
    )
}
