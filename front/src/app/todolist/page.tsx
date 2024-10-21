'use client'

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './todolist.module.css';
import Image from 'next/image';
import Header from '../components/Header';
import HeaderTab from '../components/HeaderTab';
import Footer from '../components/Footer';

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

  // const getLogout = useQuery({
  //   queryKey: ['logout'],
  //   queryFn: async () => {
  //     const response = await axios.get('http://localhost:4000/auth/logout', {
  //       withCredentials: true
  //     });
  //     console.log(response)
  //     return response;
  //   }
  // })

  // const logoutHandler = () => {
  //   console.log(getLogout);
  // }


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
    <>
      <div className='w-full flex flex-col justify-center'>
        <Header />
        <HeaderTab props={{
          main: 'border-2 border-b-0 font-bold',
          todo: 'border-b-2 text-gray-300 text-sm',
          complete: 'border-b-2 text-gray-300 text-sm'
        }} />
        <div className={`w-full ${styles.boxHeight}`}></div>
        {/* <div className='w-full '>
          <div className='flex justify-between'>
            <span className='pl-2'>해야 할 일</span>
            <span className='pr-5'>V</span>
          </div>
          <div className='w-full'>
            <div id='todoBoxes' className='w-full pl-6'>
              {todolist.map((data, index) => {
                console.log(data)
                return (
                  <li key={index}>하이</li>
                )
              }
              )}
            </div>
          </div>
        </div>
        <div className='w-full'>
          <div className='flex justify-between'>
            <span className='pl-2'>완료된 일</span>
            <span className='pr-5'>V</span>
          </div>
        </div> */}
        {/* <div className='w-11/12 fixed bottom-10 flex justify-between px-3'> */}
        {/* <div className='bg-white w-14 h-14 border border-blue-300 rounded-full flex justify-center items-center text-3xl text-blue-500'></div> */}
        {/* <Link href={'/todolist/add'} className='bg-white w-14 h-14 border border-blue-300 rounded-full flex justify-center items-center text-3xl text-blue-500'>
            <span className='pb-1'>+</span>
          </Link> */}
        {/* </div> */}
        <Footer />
      </div>
    </>
  )
}

export default page