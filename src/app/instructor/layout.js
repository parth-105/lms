
"use client"

import React, { useEffect, useState } from 'react'

import LMSsidebar from '@/component/ui/sidebar/LMSsidebar'



export default function Layout({ children }) {
  
    return (
        <>
            <LMSsidebar>
        {children}
      </LMSsidebar>
           
        </>
    )
}
