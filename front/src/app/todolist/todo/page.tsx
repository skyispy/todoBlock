'use client'

import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import HeaderTab from '@/app/components/HeaderTab'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [todolist, setTodolist] = useState<[{ content: string, dateArr: string[], difficulty: string }] | []>([]);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    // 할 일 리스트 가져오기
    const getTodoList = useQuery({
        queryKey: ['todolist'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:4000/schedule/view', {
                withCredentials: true
            });
            return await response.data;
        }
    })

    // 로딩
    useEffect(() => {
        const data = async () => {
            try {
                // console.log(getTodoList.data);
                setIsLoading(true);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        data();
    }, [])

    // 할 일 리스트 뿌려주기
    useEffect(() => {
        if (getTodoList.isFetched && (document.getElementById('todoBoxes') as HTMLDivElement)) {
            setTodolist(getTodoList.data);
        }
    }, [getTodoList.data, isLoading]) // 데이터 가져왔을 때 + 추가에서 취소 눌렀을 때

    // 로딩 될 때
    if (isLoading) {
        return <div>로딩중</div>
    }


    return (
        <div className='w-full flex flex-col justify-center'>
            <Header />
            <HeaderTab props={{
                main: 'border-b-2 text-gray-300 text-sm',
                todo: 'border-2 border-b-0 font-bold',
                complete: 'border-b-2 text-gray-300 text-sm'
            }} />
            <div className='w-full flex flex-col px-6 gap-2'>
                <div className='text-bold text-2xl pt-2'>오늘의 할일</div>
                <div id='todoBoxes' className='w-full flex flex-col gap-2'>
                    {todolist.map((data, index) => {
                        console.log(data)
                        return (
                            <li key={index} className='w-full h-12 border-black border-[1px] rounded-md'>하이</li>
                        )
                    }
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default page
