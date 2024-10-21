import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import HeaderTab from '@/app/components/HeaderTab'
import React from 'react'

const page = () => {
    return (
        <div className='w-full flex flex-col justify-center'>
            <Header />
            <HeaderTab props={{
                main: 'border-b-2 text-gray-300 text-sm',
                todo: 'border-b-2 text-gray-300 text-sm',
                complete: 'border-2 border-b-0 font-bold'
            }} />

            <Footer />
        </div>
    )
}

export default page
