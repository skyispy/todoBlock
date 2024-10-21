'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

const HeaderTab = ({props}: {props: {
    main: string,
    todo: string,
    complete: string
}}) => {

    const router = useRouter();
    
    return (
        <div className='w-full h-8 flex'>
            <div onClick={() => router.push('/todolist')} className={`w-1/3 flex justify-center items-center border-sky-300 ${props.main}`}>Main</div>
            <div onClick={() => router.push('/todolist/todo')} className={`w-1/3 flex justify-center items-center border-sky-300 ${props.todo}`}>할 일</div>
            <div onClick={() => router.push('/todolist/complete')} className={`w-1/3 flex justify-center items-center border-sky-300 ${props.complete}`}>완료 한 일</div>
        </div>
    )
}

export default HeaderTab
