'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from '../todolist/todolist.module.css'
import { useRouter } from 'next/navigation'

const Footer = () => {

    const router = useRouter();

    return (
        <div className='w-full h-12 flex  bg-white justify-between items-center overflow-hidden fixed bottom-0'>
            <div onClick={() => router.push('/todolist')} className='w-2/5 flex justify-center items-center'><Image src={'/home.png'} alt={'home'} width={30} height={30} /></div>
            <Link href={'/todolist/add'} className={styles.plusBtn}><Image src={'/plus2.png'} alt={'plus.png'} width={30} height={30} /></Link>
            <div className='w-2/5 flex justify-center items-center'><Image src={'/config.png'} alt={'config'} width={30} height={30} /></div>
        </div>
    )
}

export default Footer
