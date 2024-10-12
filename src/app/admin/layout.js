
"use client"

import React, { useEffect, useState } from 'react'

import useLocalStorage from '@/helpers/useLocalStorage.js';
import LMSsidebar from '@/component/ui/sidebar/LMSsidebar'


export default function Layout({ children }) {
  



    const [data, setData] = useLocalStorage('e-learning-user', '');
    const [userData, setUserData] = useState(null);


    useEffect(() => {
        // This code will only run on the client side
        const storedData = localStorage.getItem('e-learning-user');

        //  setld(storedData);
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setUserData(parsedData);
          
        }

    }, []);

    useEffect(() => {
        // This will run whenever userData changes
        if (userData) {
       
        }
    }, [userData]);

    return (
        <>
      <LMSsidebar>
        {children}
      </LMSsidebar>
        </>
    )
}
