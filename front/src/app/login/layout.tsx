import React, { ReactNode } from 'react'
import { Yeon_Sung } from "next/font/google";

const yeonsung = Yeon_Sung({ weight: ['400'], preload:false, display: 'swap'});

const layout = ({ children }: { children: ReactNode }) => {
    return (
            <div className={yeonsung.className}>
                {children}
            </div>
    )
}

export default layout
