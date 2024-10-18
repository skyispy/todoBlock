'use client'

import React, { useEffect, useRef, useState } from 'react'
import BackDiv from '../components/BackDiv'
import Line from '../components/Line'
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { userInputAtom, urlAtom, userAtom } from '../state/Atom';
import axios from 'axios';

const page = () => {

    const [url, setUrl] = useAtom(urlAtom);
    const [userInput, setUserInput] = useAtom(userInputAtom);
    const [smsConfirm, setSMSConfirm] = useState('');
    const [Confirm, setConfirm] = useState(false);

    setUrl(false);

    const phoneInput = useRef<any>(null);
    const SMSConfirmInput = useRef<any>(null);
    const router = useRouter();

    const toFindPw = () => {
        router.push('/findpw')
    }

    const toFindId = () => {
        router.push('/findid')

    }

    // 인증요청 버튼
    const reqPhone = async () => {
        const phoneValue = phoneInput.current.value;

        try {
            const response = await axios.post('http://localhost:4000/auth/SMSAuthentication', { number: phoneValue })
            // response에 랜덤함수값
            // if () {
            console.log(response.data)
            setSMSConfirm(response.data)
            // }
        } catch (error) {
            console.error('에러 발생', error)
            alert('휴대폰 번호를 다시 확인해주세요.')
        }
    }

    // 인증확인 버튼
    const checkNum = async () => {
        const SMSConfirmValue = SMSConfirmInput.current.value;
        const phoneValue = phoneInput.current.value;

        console.log(phoneValue)

        if (smsConfirm == SMSConfirmValue && SMSConfirmValue != '') {
            try {
                const response = await axios.post('http://localhost:4000/auth/finduid', {phoneNumber:phoneValue})
                console.log(response)
                alert('인증이 완료되었습니다.')
                setConfirm(true);
            } catch (error) {

            }
        } else {
            alert('인증번호가 잘못되었습니다.')
        }
    }

    // 아이디 찾기 버튼  // 고쳐야함
    const findBtn = async () => {
        const phoneValue = phoneInput.current.value;

        try {
            const response = await axios.post('http://localhost:4000/users/findingpassword', { phoneNumber: phoneValue })
            if (Confirm) {
                setUserInput({
                    uid: response.data.uid,
                    uphone: phoneValue,
                })
                router.push('findid/userid')
            } else {
                alert('휴대폰 인증을 해주세요.')
                console.log('오류 발생')
            }
        } catch (error) {
            console.error('에러 발생', error)
        }
    }


    return (
        <div className='flex flex-col gap-5'>
            <BackDiv text='아이디 / 비밀번호 찾기' />
            <div className='flex flex-col gap-2'>
                <div className='flex text-xl'>
                    <div className='w-1/2 flex flex-col items-center text-purple-900 hover:cursor-pointer' onClick={toFindId}>
                        <p>아이디 찾기</p>
                        <Line color='bg-purple-900' />
                    </div>
                    <div className='w-1/2 flex flex-col items-center text-gray-400 hover:cursor-pointer' onClick={toFindPw}>
                        <p>비밀번호 찾기</p>
                        <Line color='bg-gray-400' />
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-4 px-10'>
                <div className='flex gap-1'>
                    <input type='text' ref={phoneInput} placeholder='휴대전화번호 입력(`-`제외)' className='w-3/4 h-10 border-b-[1px] pl-1 focus:outline-none'></input>
                    <button className='w-1/4 h-10 border-[1px] border-purple-900/80 rounded-full text-sm font-bold text-purple-900' onClick={reqPhone}>인증번호 전송</button>
                </div>
                <div className='flex gap-1'>
                    <input type='text' placeholder='인증번호 입력' className='w-3/4 h-10 border-b-[1px] pl-1 focus:outline-none' ref={SMSConfirmInput}></input>
                    <button className='w-1/4 h-10 border-[1px] border-purple-900/80 rounded-full text-sm font-bold text-purple-900' onClick={checkNum}>확인</button>
                </div>
                <button className='w-full h-10 rounded-full bg-purple-900/80 text-white' onClick={findBtn}>아이디 찾기</button>
            </div>
            {/* <Findid /> */}
        </div>
    )
}

export default page
