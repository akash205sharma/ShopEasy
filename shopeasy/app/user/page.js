"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import NotLoggedInPage from '@/components/NotLoggedInPage';

const Page = () => {
  const { data, session } = useSession();
  return (
    <div className='flex justify-center items-center h-[80vh] w-[80vw] '>
    </div>
  )
}

export default Page
